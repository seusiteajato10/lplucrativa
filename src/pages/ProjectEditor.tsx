import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjectEditor } from '@/hooks/useProjectEditor';
import EditorTopBar from '@/components/editor/EditorTopBar';
import EditorSidebar from '@/components/editor/EditorSidebar';
import EditorPreview from '@/components/editor/EditorPreview';
import VersionHistoryModal from '@/components/editor/VersionHistoryModal';
import { TemplateData, defaultTemplateData } from '@/types/templateData';

const ProjectEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [historyOpen, setHistoryOpen] = useState(false);

  const {
    project,
    templateData,
    templateId, // Agora usamos o ID que muda em tempo real
    isLoading,
    isSaving,
    lastSavedAt,
    canUndo,
    canRedo,
    updateTemplateData,
    saveNow,
    publish,
    undo,
    redo,
  } = useProjectEditor({ projectId: id || '' });

  if (!authLoading && !user) return <Navigate to="/login" replace />;

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) return <Navigate to="/dashboard/projetos" replace />;

  const handleRestoreVersion = (restoredData: Record<string, unknown>) => {
    const merged = { ...defaultTemplateData, ...restoredData } as TemplateData;
    updateTemplateData(merged);
  };

  return (
    <>
      <Helmet><title>Editar {project.name}</title></Helmet>
      <div className="h-screen flex flex-col bg-background">
        <EditorTopBar
          projectName={project.name}
          isSaving={isSaving}
          lastSavedAt={lastSavedAt}
          previewMode={previewMode}
          canUndo={canUndo}
          canRedo={canRedo}
          onPreviewModeChange={setPreviewMode}
          onSave={saveNow}
          onPublish={publish}
          onOpenHistory={() => setHistoryOpen(true)}
          onUndo={undo}
          onRedo={redo}
        />
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar
            templateData={{ ...templateData, niche: project.niche, template_id: templateId }}
            projectId={project.id}
            userId={user?.id || ''}
            onUpdate={updateTemplateData}
          />
          <EditorPreview
            templateData={templateData}
            niche={project.niche}
            templateId={templateId} // Preview agora reflete a troca instantaneamente
            previewMode={previewMode}
            projectName={project.name}
          />
        </div>
      </div>
      <VersionHistoryModal open={historyOpen} onOpenChange={setHistoryOpen} projectId={project.id} onRestore={handleRestoreVersion} />
    </>
  );
};

export default ProjectEditor;