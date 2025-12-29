import React, { Suspense } from 'react';
import { X, Layout, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockPreviewData } from '@/lib/template-registry';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any | null;
}

const PreviewModal = ({ isOpen, onClose, template }: PreviewModalProps) => {
  const navigate = useNavigate();

  if (!isOpen || !template) return null;

  const TemplateComponent = template.component;

  const handleUseTemplate = () => {
    navigate(`/dashboard/projetos?criar=true&template=${template.id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background animate-in fade-in zoom-in duration-300">
      {/* Header do Modal */}
      <header className="h-16 border-b border-border bg-card px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-foreground leading-none">{template.name}</h2>
            <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Visualizando em tempo real com dados de exemplo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="accent" 
            onClick={handleUseTemplate}
            className="font-bold shadow-glow"
          >
            <MousePointer2 className="w-4 h-4 mr-2" />
            Usar este Template
          </Button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Fechar preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Área de Preview */}
      <main className="flex-1 overflow-auto bg-slate-50">
        <Suspense fallback={
          <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-muted-foreground">Carregando preview ao vivo...</p>
          </div>
        }>
          <div className="min-h-full w-full shadow-2xl bg-white origin-top">
            <TemplateComponent {...mockPreviewData} />
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default PreviewModal;