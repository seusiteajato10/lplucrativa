// Database types
export type ProjectNiche = 'product' | 'service' | 'event' | 'course';
export type ProjectStatus = 'active' | 'paused';
export type UserPlan = 'starter' | 'pro' | 'agency';

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

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Ativo",
  paused: "Pausado",
};

export const planLabels: Record<UserPlan, string> = {
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
};

// Template ID mapping based on niche
export const getTemplateId = (niche: ProjectNiche): string => {
  const templates: Record<ProjectNiche, string> = {
    product: 'product_basic',
    service: 'service_basic',
    event: 'event_basic',
    course: 'course_basic',
  };
  return templates[niche];
};

// Niche display options for forms
export const nicheOptions = [
  { value: 'product' as ProjectNiche, label: 'Produto Físico' },
  { value: 'service' as ProjectNiche, label: 'Serviço' },
  { value: 'event' as ProjectNiche, label: 'Evento' },
  { value: 'course' as ProjectNiche, label: 'Curso Online' },
];
