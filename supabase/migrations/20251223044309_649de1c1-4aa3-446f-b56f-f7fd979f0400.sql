-- Criar bucket para imagens dos projetos
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso ao bucket project-images

-- Qualquer pessoa pode visualizar imagens (bucket público)
CREATE POLICY "Public can view project images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Usuários autenticados podem fazer upload em sua própria pasta
CREATE POLICY "Users can upload their own project images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Usuários podem atualizar suas próprias imagens
CREATE POLICY "Users can update their own project images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Usuários podem deletar suas próprias imagens
CREATE POLICY "Users can delete their own project images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Adicionar política para permitir inserção de leads de visitantes anônimos
CREATE POLICY "Anyone can insert leads"
ON public.leads_captured
FOR INSERT
TO anon, authenticated
WITH CHECK (true);