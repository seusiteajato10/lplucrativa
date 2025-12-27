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
  
  // Ref para o estado de salvamento para evitar race conditions
  const isSavingRef = useRef(false);
  
  // Gerenciamento de Histórico (Undo/Redo)
  const [history, setHistory] = useState<TemplateData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasChanges, setHasChanges] = useState(false);

  // Busca inicial do projeto
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
        niche: data.niche // Garante que o nicho venha do banco
      } as TemplateData;
      
      setProject(data as Project);
      setTemplateData(mergedData);
      
      // Inicializa histórico
      setHistory([mergedData]);
      setHistoryIndex(0);
      setHasChanges(false);
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

  // Função centralizada para salvar
  const saveNow = useCallback(async () => {
    // Se já estiver salvando ou não houver projeto/mudanças, ignora
    if (!project || isSavingRef.current || !hasChanges) return;

    try {
      isSavingRef.current = true;
      setIsSaving(true);
      
      const { error } = await supabase
        .from('projects')
        .update({ 
          template_data: templateData as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);

      if (error) throw error;

      setHasChanges(false);
      setLastSavedAt(new Date());
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      toast.error('Erro ao salvar: ' + (err.message || 'Erro desconhecido'));
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [project, templateData, hasChanges]);

  // Atualização de dados do template
  const updateTemplateData = useCallback((updates: Partial<TemplateData>) => {
    setTemplateData(prev => {
      const newData = { ...prev, ...updates };
      
      // Gerencia o histórico de forma assíncrona para não travar o estado
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push(newData);
        if (newHistory.length > MAX_HISTORY_SIZE) newHistory.shift();
        return newHistory;
      });
      
      setHistoryIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        // Limita ao tamanho máximo do histórico
        return Math.min(newIndex, MAX_HISTORY_SIZE - 1);
      });

      setHasChanges(true);
      return newData;
    });
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const prevData = history[newIndex];
      setTemplateData(prevData);
      setHistoryIndex(newIndex);
      setHasChanges(true);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextData = history[newIndex];
      setTemplateData(nextData);
      setHistoryIndex(newIndex);
      setHasChanges(true);
    }
  }, [history, historyIndex]);

  const publish = useCallback(async () => {
    await saveNow();
    toast.success('Projeto publicado com sucesso!');
  }, [saveNow]);

  // Auto-save a cada 60 segundos se houver mudanças
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges && !isSavingRef.current) {
        saveNow();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [hasChanges, saveNow]);

  return { 
    project, 
    templateData, 
    isLoading, 
    isSaving, 
    lastSavedAt, 
    canUndo: historyIndex > 0, 
    canRedo: historyIndex < history.length - 1, 
    updateTemplateData, 
    saveNow, 
    publish, 
    undo, 
    redo 
  };
};