import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TemplateData } from '@/types/templateData';

interface VideoTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const VideoTab = ({ templateData, onUpdate }: VideoTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL do Vídeo</Label>
        <Input
          id="videoUrl"
          value={templateData.videoUrl}
          onChange={e => onUpdate({ videoUrl: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-muted-foreground">
          Suporta YouTube e Vimeo
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="useImageInsteadOfVideo"
          checked={templateData.useImageInsteadOfVideo}
          onCheckedChange={checked =>
            onUpdate({ useImageInsteadOfVideo: checked as boolean })
          }
        />
        <Label htmlFor="useImageInsteadOfVideo" className="text-sm">
          Usar imagem ao invés de vídeo
        </Label>
      </div>

      {templateData.videoUrl && !templateData.useImageInsteadOfVideo && (
        <div className="mt-4">
          <Label className="text-xs text-muted-foreground mb-2 block">Preview do vídeo:</Label>
          <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
            {templateData.videoUrl.includes('youtube') && (
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(templateData.videoUrl)}`}
                className="w-full h-full"
                allowFullScreen
              />
            )}
            {templateData.videoUrl.includes('vimeo') && (
              <iframe
                src={`https://player.vimeo.com/video/${extractVimeoId(templateData.videoUrl)}`}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? match[1] : '';
};

const extractVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : '';
};

export default VideoTab;
