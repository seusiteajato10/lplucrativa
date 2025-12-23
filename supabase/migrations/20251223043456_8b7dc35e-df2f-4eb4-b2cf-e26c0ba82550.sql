-- Permitir que visitantes (anon) consigam visualizar projetos públicos ativos
-- Isso viabiliza /p/:slug sem exigir login

CREATE POLICY "Public can view active projects"
ON public.projects
FOR SELECT
TO anon
USING (COALESCE(status, 'active') = 'active');