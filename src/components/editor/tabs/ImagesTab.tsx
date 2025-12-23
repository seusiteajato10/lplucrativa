import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TemplateData } from '@/types/templateData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Loader2, X } from 'lucide-react';

interface ImagesTabProps {
  templateData: TemplateData;
  projectId: string;
  userId: string;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const ImagesTab = ({ templateData, projectId, userId, onUpdate }: ImagesTabProps) => {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  const uploadImage = async (
    file: File,
    type: 'logo' | 'hero',
    setUploading: (v: boolean) => void
  ) => {
    if (!file) return;

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      toast.error('Formato inválido. Use PNG, JPG ou WebP.');
      return;
    }

    // Validate size
    const maxSize = type === 'logo' ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`Arquivo muito grande. Máximo: ${type === 'logo' ? '2MB' : '5MB'}`);
      return;
    }

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${projectId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      toast.error('Erro ao fazer upload');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    if (type === 'logo') {
      onUpdate({ logoUrl: publicUrl });
    } else {
      onUpdate({ heroImageUrl: publicUrl });
    }

    setUploading(false);
    toast.success('Imagem enviada com sucesso!');
  };

  const removeImage = (type: 'logo' | 'hero') => {
    if (type === 'logo') {
      onUpdate({ logoUrl: '' });
    } else {
      onUpdate({ heroImageUrl: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="space-y-3">
        <Label>Logo (máx. 2MB)</Label>
        {templateData.logoUrl ? (
          <div className="relative">
            <img
              src={templateData.logoUrl}
              alt="Logo"
              className="w-full h-24 object-contain bg-secondary rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => removeImage('logo')}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'logo', setUploadingLogo);
              }}
              disabled={uploadingLogo}
            />
            {uploadingLogo ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Clique para enviar</span>
              </>
            )}
          </label>
        )}
      </div>

      {/* Hero Image */}
      <div className="space-y-3">
        <Label>Imagem Principal / Hero (máx. 5MB)</Label>
        {templateData.heroImageUrl ? (
          <div className="relative">
            <img
              src={templateData.heroImageUrl}
              alt="Hero"
              className="w-full h-40 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => removeImage('hero')}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'hero', setUploadingHero);
              }}
              disabled={uploadingHero}
            />
            {uploadingHero ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Clique para enviar</span>
              </>
            )}
          </label>
        )}
      </div>
    </div>
  );
};

export default ImagesTab;
