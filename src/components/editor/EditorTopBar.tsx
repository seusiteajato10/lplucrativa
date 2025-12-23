import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Monitor, Smartphone, History, Loader2, Undo2, Redo2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorTopBarProps {
  projectName: string;
  isSaving: boolean;
  lastSavedAt: Date | null;
  previewMode: 'desktop' | 'mobile';
  canUndo: boolean;
  canRedo: boolean;
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
  onSave: () => void;
  onPublish: () => void;
  onOpenHistory: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

const EditorTopBar = ({
  projectName,
  isSaving,
  lastSavedAt,
  previewMode,
  canUndo,
  canRedo,
  onPreviewModeChange,
  onSave,
  onPublish,
  onOpenHistory,
  onUndo,
  onRedo,
}: EditorTopBarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/projetos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-foreground">{projectName}</h1>
          <p className="text-xs text-muted-foreground">
            {isSaving ? (
              <span className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Salvando...
              </span>
            ) : lastSavedAt ? (
              `Salvo às ${formatTime(lastSavedAt)}`
            ) : (
              'Não salvo'
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center border border-border rounded-lg p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <Undo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Desfazer (Ctrl+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refazer (Ctrl+Shift+Z)</TooltipContent>
          </Tooltip>
        </div>

        {/* Preview toggle */}
        <div className="flex items-center border border-border rounded-lg p-1">
          <Button
            variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => onPreviewModeChange('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => onPreviewModeChange('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onOpenHistory}>
          <History className="w-4 h-4 mr-1" />
          Versões
        </Button>

        <Button variant="outline" size="sm" onClick={onSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-1" />
          Salvar
        </Button>

        <Button variant="accent" size="sm" onClick={onPublish} disabled={isSaving}>
          <Upload className="w-4 h-4 mr-1" />
          Publicar
        </Button>
      </div>
    </header>
  );
};

export default EditorTopBar;
