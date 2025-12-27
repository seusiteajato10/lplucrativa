import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project, getTemplateId } from '@/types/project';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { toast } from 'sonner';

interface UseProjectEditorProps {
  projectId: string;
}

const MAX_HISTORY_SIZE = 50;

export const useProjectEditor = ({ projectId }: UseProjectEditorProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [templateId, setTemplateId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  
  const [history, setHistory] = useState<{data: TemplateData, tid: string}[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fetchProject = useCallback(async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Projeto não encontrado');
        return;
      }

      const dbData = (data.template_data || {}) as Partial<TemplateData>;
      const mergedData = { 
        ...defaultTemplateData, 
        ...dbData, 
        niche: data.niche,
        project_type: data.project_type, // Ensure project_type is in templateData for consistency
      } as TemplateData;
      
      setProject(data as Project);
      // Use the new getTemplateId logic here for initial templateId
      const initialTemplateId = data.template_id || getTemplateId(data.niche, data.project_type);
      setTemplateId(initialTemplateId);
      setTemplateData(mergedData);
      
      setHistory([{ data: mergedData, tid: initialTemplateId }]);
      setHistoryIndex(0);
    } catch (err: any) {
      console.error('Error fetching project:', err);
      toast.error('Erro ao carregar projeto');
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const saveNow = useCallback(async () => {
    if (!project || isSaving) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('projects')
        .update({ 
          template_data: templateData as any,
          template_id: templateId,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);

      if (error) throw error;
      setLastSavedAt(new Date());
      toast.success('Projeto salvo com sucesso!');
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      toast.error('Erro ao salvar alterações');
    } finally {
      setIsSaving(false);
    }
  }, [project, templateData, templateId, isSaving]);

  const updateTemplateData = useCallback((updates: Partial<TemplateData & { template_id?: string }>) => {
    const { template_id, ...rest } = updates;
    
    // Atualiza o templateId se presente nas atualizações
    if (template_id !== undefined) {
      setTemplateId(template_id);
    }

    // Atualiza os dados do template
    setTemplateData(prev => {
      const newData = { ...prev, ...rest };
      
      // Adiciona ao histórico de forma síncrona para evitar delays
      const newTid = template_id !== undefined ? template_id : templateId;
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push({ data: newData, tid: newTid });
        if (newHistory.length > MAX_HISTORY_SIZE) newHistory.shift();
        return newHistory;
      });
      setHistoryIndex(prevIndex => Math.min(prevIndex + 1, MAX_HISTORY_SIZE - 1));

      return newData;
    });
  }, [historyIndex, templateId]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const prevEntry = history[newIndex];
      setTemplateData(prevEntry.data);
      setTemplateId(prevEntry.tid);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextEntry = history[newIndex];
      setTemplateData(nextEntry.data);
      setTemplateId(nextEntry.tid);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  return { 
    project, 
    templateData, 
    templateId,
    isLoading, 
    isSaving, 
    lastSavedAt, 
    canUndo: historyIndex > 0, 
    canRedo: historyIndex < history.length - 1, 
    updateTemplateData, 
    saveNow, 
    publish: saveNow, 
    undo, 
    redo 
  };
};