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
  project_type: ProjectType; // Novo campo
  connected_page_id: string | null; // Novo campo
  funnel_position: FunnelPosition | null; // Novo campo
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

// Template ID mapping based on niche
export const getTemplateId = (niche: ProjectNiche): string => {
  const templates: Record<ProjectNiche, string> = {
    product: 'product_default',
    service: 'service_basic',
    event: 'event_basic',
    course: 'course_basic',
  };
  return templates[niche];
};

// Listagem de templates disponíveis por nicho
export const getTemplateOptionsForNiche = (niche: ProjectNiche) => {
  switch (niche) {
    case 'product':
      return [
        { value: 'product_default', label: 'Padrão' },
        { value: 'product_modern', label: 'Moderno' },
        { value: 'product_classic', label: 'Clássico' },
        { value: 'product_vsl', label: 'VSL (Vídeo de Vendas)' },
      ];
    case 'service':
      return [{ value: 'service_basic', label: 'Página de Serviço Padrão' }];
    case 'event':
      return [{ value: 'event_basic', label: 'Página de Evento Padrão' }];
    case 'course':
      return [{ value: 'course_basic', label: 'Página de Curso Padrão' }];
    default:
      return [];
  }
};