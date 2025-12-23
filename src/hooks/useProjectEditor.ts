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
  
  // Undo/Redo history
  const [history, setHistory] = useState<TemplateData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);
  
  // Use refs to always have latest values in callbacks
  const templateDataRef = useRef<TemplateData>(templateData);
  const projectRef = useRef<Project | null>(project);
  const isSavingRef = useRef(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Keep refs in sync
  useEffect(() => {
    templateDataRef.current = templateData;
  }, [templateData]);

  useEffect(() => {
    projectRef.current = project;
  }, [project]);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        toast.error('Erro ao carregar projeto');
        setIsLoading(false);
        return;
      }

      if (!data) {
        toast.error('Projeto não encontrado');
        setIsLoading(false);
        return;
      }

      setProject(data as Project);
      
      // Merge saved template_data with defaults
      const savedData = (data.template_data || {}) as Partial<TemplateData>;
      const mergedData = { ...defaultTemplateData, ...savedData };
      setTemplateData(mergedData);
      templateDataRef.current = mergedData;
      
      // Initialize history with the loaded data
      setHistory([mergedData]);
      setHistoryIndex(0);
      
      setIsLoading(false);
    };

    fetchProject();
  }, [projectId]);

  const saveNow = useCallback(async () => {
    const currentProject = projectRef.current;
    const currentTemplateData = templateDataRef.current;
    
    if (!currentProject || isSavingRef.current) return;

    isSavingRef.current = true;
    setIsSaving(true);
    
    const { error } = await supabase
      .from('projects')
      .update({ 
        template_data: currentTemplateData as unknown as Record<string, unknown>
      })
      .eq('id', currentProject.id);

    isSavingRef.current = false;
    setIsSaving(false);

    if (error) {
      console.error('Error saving:', error);
      toast.error('Erro ao salvar alterações');
      return;
    }

    hasChangesRef.current = false;
    setLastSavedAt(new Date());
  }, []);

  // Auto-save every 30 seconds if there are changes
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
      
      // Add to history if not from undo/redo
      if (!isUndoRedoRef.current) {
        setHistory(prevHistory => {
          // Remove any future states if we're in the middle of history
          const newHistory = prevHistory.slice(0, historyIndex + 1);
          // Add new state
          newHistory.push(newData);
          // Limit history size
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
    
    // Reset flag after state update
    setTimeout(() => {
      isUndoRedoRef.current = false;
    }, 0);
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
    
    // Reset flag after state update
    setTimeout(() => {
      isUndoRedoRef.current = false;
    }, 0);
  }, [canRedo, history, historyIndex]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      }
      // Also support Ctrl+Y for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const publish = useCallback(async () => {
    const currentProject = projectRef.current;
    const currentTemplateData = templateDataRef.current;
    
    if (!currentProject) return;

    isSavingRef.current = true;
    setIsSaving(true);

    const { error } = await supabase
      .from('projects')
      .update({
        template_data: currentTemplateData as unknown as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentProject.id);

    isSavingRef.current = false;
    setIsSaving(false);

    if (error) {
      console.error('Error publishing:', error);
      toast.error('Erro ao publicar');
      return;
    }

    hasChangesRef.current = false;
    setLastSavedAt(new Date());
    toast.success('Projeto publicado com sucesso!');
  }, []);

  return {
    project,
    templateData,
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
  };
};
