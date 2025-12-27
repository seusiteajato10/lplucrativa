// Database types
export type ProjectNiche = 'product' | 'service' | 'event' | 'course';
export type ProjectStatus = 'active' | 'paused';
export type UserPlan = 'starter' | 'pro' | 'agency';

// Novos tipos de projeto
export type ProjectType = 'lead_only' | 'sales_only' | 'full_funnel';
export type FunnelPosition = 'lead' | 'sales';

export interface PlanLimits {
  projects: number;
  leads_per_month: number;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  plan: UserPlan;
  plan_limits: PlanLimits;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  niche: ProjectNiche;
  project_type: ProjectType;
  connected_page_id: string | null;
  funnel_position: FunnelPosition | null;
  custom_domain: string | null;
  status: ProjectStatus;
  template_id: string;
  template_data: Record<string, unknown>;
  integrations: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  leads_count?: number;
}

export const nicheLabels: Record<ProjectNiche, string> = {
  product: "Produto Físico",
  service: "Serviço",
  event: "Evento",
  course: "Curso Online",
};

export const projectTypeLabels: Record<ProjectType, string> = {
  lead_only: "Página de Captura",
  sales_only: "Página de Vendas",
  full_funnel: "Funil Completo (Captura + Vendas)",
};

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Ativo",
  paused: "Pausado",
};

export const getTemplateId = (niche: ProjectNiche, projectType?: ProjectType): string => {
  if (projectType === 'lead_only' || projectType === 'full_funnel') {
    // Default capture template
    return 'capture_ebook'; 
  }

  const templates: Record<ProjectNiche, string> = {
    product: 'product_default',
    service: 'service_basic',
    event: 'event_basic',
    course: 'course_basic',
  };
  return templates[niche];
};

export const getTemplateOptionsForNiche = (niche: ProjectNiche, projectType?: ProjectType) => {
  // Se for página de captura, retornamos os templates de captura independentemente do nicho
  if (projectType === 'lead_only' || projectType === 'full_funnel') {
    return [
      { value: 'capture_ebook', label: 'E-book / Isca Digital' },
      { value: 'capture_vsl', label: 'Vídeo (VSL) + Captura' },
      { value: 'capture_quiz', label: 'Quiz Interativo' },
      { value: 'capture_discount', label: 'Cupom de Desconto' },
    ];
  }

  switch (niche) {
    case 'product':
      return [
        { value: 'product_default', label: 'Venda Padrão' },
        { value: 'product_modern', label: 'Venda Moderno' },
        { value: 'product_classic', label: 'Venda Clássico' },
        { value: 'product_vsl', label: 'VSL (Vídeo de Vendas)' },
      ];
    case 'service': return [{ value: 'service_basic', label: 'Página de Serviço Padrão' }];
    case 'event': return [{ value: 'event_basic', label: 'Página de Evento Padrão' }];
    case 'course': return [{ value: 'course_basic', label: 'Página de Curso Padrão' }];
    default: return [];
  }
};