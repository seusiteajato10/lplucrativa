import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { toast } from 'sonner';

interface UseProjectEditorProps {
  projectId: string;
}

const MAX_HISTORY_SIZE = 50;

export const useProjectEditor = ({ projectId }: UseProjectEditorProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  
  const historyRef = useRef<TemplateData[]>([]);
  const historyIndexRef = useRef(-1);
  const hasChangesRef = useRef(false);
  const isSavingRef = useRef(false);
  
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const fetchProject = useCallback(async () => {
    if (!projectId) return;

    try {
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

      setProject(data as Project);
      const savedData = (data.template_data || {}) as Partial<TemplateData>;
      const mergedData = { ...defaultTemplateData, ...savedData, niche: data.niche };
      
      setTemplateData(mergedData);
      historyRef.current = [mergedData];
      historyIndexRef.current = 0;
      updateUndoRedoStates();
    } catch (err) {
      console.error('Error fetching project:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const updateUndoRedoStates = () => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  };

  const saveNow = useCallback(async () => {
    if (!project || isSavingRef.current || !hasChangesRef.current) return;

    try {
      isSavingRef.current = true;
      setIsSaving(true);
      
      const { error } = await supabase
        .from('projects')
        .update({ 
          template_data: templateData as unknown as Record<string, unknown>
        })
        .eq('id', project.id);

      if (error) throw error;

      hasChangesRef.current = false;
      setLastSavedAt(new Date());
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + err.message);
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [project, templateData]);

  const updateTemplateData = useCallback((updates: Partial<TemplateData>) => {
    setTemplateData(prev => {
      const newData = { ...prev, ...updates };
      
      // Update history outside of the setter to avoid loop
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      newHistory.push(newData);
      if (newHistory.length > MAX_HISTORY_SIZE) newHistory.shift();
      
      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;
      
      hasChangesRef.current = true;
      updateUndoRedoStates();
      return newData;
    });
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const prevData = historyRef.current[historyIndexRef.current];
      setTemplateData(prevData);
      hasChangesRef.current = true;
      updateUndoRedoStates();
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const nextData = historyRef.current[historyIndexRef.current];
      setTemplateData(nextData);
      hasChangesRef.current = true;
      updateUndoRedoStates();
    }
  }, []);

  const publish = useCallback(async () => {
    hasChangesRef.current = true;
    await saveNow();
    toast.success('Projeto publicado com sucesso!');
  }, [saveNow]);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChangesRef.current) saveNow();
    }, 30000);
    return () => clearInterval(interval);
  }, [saveNow]);

  return { project, templateData, isLoading, isSaving, lastSavedAt, canUndo, canRedo, updateTemplateData, saveNow, publish, undo, redo };
};