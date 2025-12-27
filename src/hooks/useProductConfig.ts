import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { ProjectNiche } from '@/types/project';

interface ProductConfig {
  template_id: string;
  videoUrl: string;
  productBenefits: string[];
  ctaButtonText: string;
  guaranteeText: string;
  originalPrice: string;
}

export function useProductConfig(projectId: string | null) {
  const queryClient = useQueryClient();
  const [config, setConfig] = useState<ProductConfig>({
    template_id: 'product_default',
    videoUrl: '',
    productBenefits: [],
    ctaButtonText: defaultTemplateData.ctaButtonText,
    guaranteeText: defaultTemplateData.guaranteeText,
    originalPrice: defaultTemplateData.originalPrice || '',
  });

  // Fetch project data
  const { data: project, isLoading: isLoadingProject, error: projectError } = useQuery({
    queryKey: ['projectConfig', projectId],
    queryFn: async () => {
      if (!projectId) return null;
      const { data, error } = await supabase
        .from('projects')
        .select('template_id, template_data, niche')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });

  // Sincroniza o formulário sempre que o projeto carregado mudar
  useEffect(() => {
    if (project) {
      const templateData = { ...defaultTemplateData, ...(project.template_data as Partial<TemplateData>) };
      setConfig({
        template_id: project.template_id || 'product_default',
        videoUrl: templateData.videoUrl || '',
        productBenefits: templateData.productBenefits || [],
        ctaButtonText: templateData.ctaButtonText || defaultTemplateData.ctaButtonText,
        guaranteeText: templateData.guaranteeText || defaultTemplateData.guaranteeText,
        originalPrice: templateData.originalPrice || defaultTemplateData.originalPrice || '',
      });
    }
  }, [project, projectId]);

  const updateConfig = useCallback((updates: Partial<ProductConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveConfigMutation = useMutation({
    mutationFn: async (newConfig: ProductConfig) => {
      if (!projectId) throw new Error("ID do projeto não encontrado.");

      const currentTemplateData = { ...defaultTemplateData, ...(project?.template_data as Partial<TemplateData>) };
      const updatedTemplateData: Partial<TemplateData> = {
        ...currentTemplateData,
        videoUrl: newConfig.videoUrl,
        productBenefits: newConfig.productBenefits,
        ctaButtonText: newConfig.ctaButtonText,
        guaranteeText: newConfig.guaranteeText,
        originalPrice: newConfig.originalPrice,
      };

      const { error } = await supabase
        .from('projects')
        .update({
          template_id: newConfig.template_id,
          template_data: updatedTemplateData as unknown as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Configurações salvas com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['projectConfig', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err: any) => {
      toast.error('Erro ao salvar: ' + err.message);
    },
  });

  return {
    config,
    updateConfig,
    saveConfig: saveConfigMutation.mutateAsync,
    isSaving: saveConfigMutation.isPending,
    isLoading: isLoadingProject,
    error: projectError,
    projectNiche: project?.niche as ProjectNiche | undefined,
  };
}