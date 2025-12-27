import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { toast } from 'sonner';

interface UseProjectEditorProps {
  projectId: string;
}

interface UseProjectEditorReturn {
  project: Project | null;
  templateData: TemplateData;
  isLoading: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  canUndo: boolean;
  canRedo: boolean;
  updateTemplateData: (updates: Partial<TemplateData>) => void;
  saveNow: () => Promise<void>;
  publish: () => Promise<void>;
  undo: () => void;
  redo: () => void;
}

const MAX_HISTORY_SIZE = 50;

export const useProjectEditor = ({ projectId }: UseProjectEditorProps): UseProjectEditorReturn => {
  const [project, setProject] = useState<Project | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const hasChangesRef = useRef(false);
  
  const [history, setHistory] = useState<TemplateData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);
  
  const templateDataRef = useRef<TemplateData>(templateData);
  const projectRef = useRef<Project | null>(project);
  const isSavingRef = useRef(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  useEffect(() => {
    templateDataRef.current = templateData;
  }, [templateData]);

  useEffect(() => {
    projectRef.current = project;
  }, [project]);

  useEffect(() => {
    const fetchProject = async () => {
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
          setIsLoading(false);
          return;
        }

        setProject(data as Project);
        const savedData = (data.template_data || {}) as Partial<TemplateData>;
        const mergedData = { ...defaultTemplateData, ...savedData };
        setTemplateData(mergedData);
        templateDataRef.current = mergedData;
        setHistory([mergedData]);
        setHistoryIndex(0);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const saveNow = useCallback(async () => {
    const currentProject = projectRef.current;
    const currentTemplateData = templateDataRef.current;
    
    if (!currentProject || isSavingRef.current) return;

    try {
      isSavingRef.current = true;
      setIsSaving(true);
      
      const { error } = await supabase
        .from('projects')
        .update({ 
          template_data: currentTemplateData as unknown as Record<string, unknown>
        })
        .eq('id', currentProject.id);

      if (error) throw error;

      hasChangesRef.current = false;
      setLastSavedAt(new Date());
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + err.message);
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChangesRef.current && projectRef.current) {
        saveNow();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [saveNow]);

  const updateTemplateData = useCallback((updates: Partial<TemplateData>) => {
    setTemplateData(prev => {
      const newData = { ...prev, ...updates };
      templateDataRef.current = newData;
      hasChangesRef.current = true;
      
      if (!isUndoRedoRef.current) {
        setHistory(prevHistory => {
          const newHistory = prevHistory.slice(0, historyIndex + 1);
          newHistory.push(newData);
          if (newHistory.length > MAX_HISTORY_SIZE) {
            newHistory.shift();
          }
          return newHistory;
        });
        setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY_SIZE - 1));
      }
      return newData;
    });
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (!canUndo) return;
    isUndoRedoRef.current = true;
    const newIndex = historyIndex - 1;
    const previousData = history[newIndex];
    setHistoryIndex(newIndex);
    setTemplateData(previousData);
    templateDataRef.current = previousData;
    hasChangesRef.current = true;
    setTimeout(() => { isUndoRedoRef.current = false; }, 0);
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    isUndoRedoRef.current = true;
    const newIndex = historyIndex + 1;
    const nextData = history[newIndex];
    setHistoryIndex(newIndex);
    setTemplateData(nextData);
    templateDataRef.current = nextData;
    hasChangesRef.current = true;
    setTimeout(() => { isUndoRedoRef.current = false; }, 0);
  }, [canRedo, history, historyIndex]);

  const publish = useCallback(async () => {
    const currentProject = projectRef.current;
    if (!currentProject) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('projects')
        .update({
          template_data: templateDataRef.current as unknown as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentProject.id);

      if (error) throw error;
      setLastSavedAt(new Date());
      toast.success('Projeto publicado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao publicar: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { project, templateData, isLoading, isSaving, lastSavedAt, canUndo, canRedo, updateTemplateData, saveNow, publish, undo, redo };
};