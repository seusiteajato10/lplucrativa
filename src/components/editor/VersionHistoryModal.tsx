import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectVersion {
  id: string;
  version_number: number;
  template_data: Record<string, unknown>;
  created_at: string;
}

interface VersionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  onRestore: (templateData: Record<string, unknown>) => void;
}

const VersionHistoryModal = ({
  open,
  onOpenChange,
  projectId,
  onRestore,
}: VersionHistoryModalProps) => {
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchVersions();
    }
  }, [open, projectId]);

  const fetchVersions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('project_versions')
      .select('*')
      .eq('project_id', projectId)
      .order('version_number', { ascending: false })
      .limit(20);

    setIsLoading(false);

    if (error) {
      console.error('Error fetching versions:', error);
      toast.error('Erro ao carregar versões');
      return;
    }

    setVersions(data as ProjectVersion[]);
  };

  const handleRestore = async (version: ProjectVersion) => {
    setRestoringId(version.id);
    onRestore(version.template_data);
    setRestoringId(null);
    onOpenChange(false);
    toast.success(`Versão ${version.version_number} restaurada!`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Histórico de Versões</DialogTitle>
          <DialogDescription>
            Restaure uma versão anterior do seu projeto.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : versions.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            Nenhuma versão anterior encontrada.
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-2">
              {versions.map(version => (
                <div
                  key={version.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">Versão {version.version_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(version.created_at)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(version)}
                    disabled={restoringId === version.id}
                  >
                    {restoringId === version.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Restaurar
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VersionHistoryModal;
