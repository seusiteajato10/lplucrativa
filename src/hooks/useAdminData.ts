import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface AdminMetrics {
  total_users: number;
  active_subscriptions: number;
  total_projects: number;
  total_leads: number;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  plan: string | null;
  created_at: string;
  subscription: {
    id: string;
    status: string;
    current_period_end: string;
    plan_name: string;
    plan_slug: string;
  } | null;
  projects_count: number;
  leads_count: number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  limit: number;
  offset: number;
}

export interface AdminPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number | null;
  max_projects: number | null;
  max_page_views: number | null;
  features: string[];
  checkout_types: string[];
  webhook_integration: boolean;
  custom_domain: boolean;
  remove_branding: boolean;
  priority_support: boolean;
  is_active: boolean;
  subscribers_count: number;
}

export interface AdminUserDetails {
  user: {
    id: string;
    email: string;
    full_name: string;
    plan: string;
    plan_limits: Record<string, number>;
    created_at: string;
  };
  subscription: {
    id: string;
    status: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    plan: {
      id: string;
      name: string;
      slug: string;
      price_monthly: number;
    };
  } | null;
  projects: {
    id: string;
    name: string;
    slug: string;
    niche: string;
    status: string;
    created_at: string;
    leads_count: number;
  }[];
  usage: {
    projects_count: number;
    page_views_count: number;
    leads_captured_count: number;
  } | null;
}

export interface ChartDataPoint {
  date: string;
  count: number;
}

export interface TopProject {
  id: string;
  name: string;
  slug: string;
  niche: string;
  owner_name: string;
  owner_email: string;
  leads_count: number;
}

// Hook for admin metrics
export function useAdminMetrics() {
  return useQuery({
    queryKey: ['adminMetrics'],
    queryFn: async (): Promise<AdminMetrics> => {
      const { data, error } = await supabase.rpc('get_admin_metrics');
      if (error) throw error;
      return data as AdminMetrics;
    },
    staleTime: 30000, // 30 seconds
  });
}

// Hook for admin users list
export function useAdminUsers(search = '', planFilter = '', statusFilter = '', limit = 50, offset = 0) {
  return useQuery({
    queryKey: ['adminUsers', search, planFilter, statusFilter, limit, offset],
    queryFn: async (): Promise<AdminUsersResponse> => {
      const { data, error } = await supabase.rpc('get_admin_users', {
        p_search: search,
        p_plan_filter: planFilter,
        p_status_filter: statusFilter,
        p_limit: limit,
        p_offset: offset,
      });
      if (error) throw error;
      return data as AdminUsersResponse;
    },
    staleTime: 10000,
  });
}

// Hook for user details
export function useAdminUserDetails(userId: string | null) {
  return useQuery({
    queryKey: ['adminUserDetails', userId],
    queryFn: async (): Promise<AdminUserDetails> => {
      if (!userId) throw new Error('User ID required');
      const { data, error } = await supabase.rpc('get_admin_user_details', {
        p_user_id: userId,
      });
      if (error) throw error;
      return data as AdminUserDetails;
    },
    enabled: !!userId,
    staleTime: 10000,
  });
}

// Hook for plans
export function useAdminPlans() {
  return useQuery({
    queryKey: ['adminPlans'],
    queryFn: async (): Promise<AdminPlan[]> => {
      const { data, error } = await supabase.rpc('get_admin_plans');
      if (error) throw error;
      return data as AdminPlan[];
    },
    staleTime: 60000,
  });
}

// Hook for users chart
export function useAdminUsersChart(days = 30) {
  return useQuery({
    queryKey: ['adminUsersChart', days],
    queryFn: async (): Promise<ChartDataPoint[]> => {
      const { data, error } = await supabase.rpc('get_admin_users_chart', {
        p_days: days,
      });
      if (error) throw error;
      return data as ChartDataPoint[];
    },
    staleTime: 60000,
  });
}

// Hook for leads chart
export function useAdminLeadsChart(days = 30) {
  return useQuery({
    queryKey: ['adminLeadsChart', days],
    queryFn: async (): Promise<ChartDataPoint[]> => {
      const { data, error } = await supabase.rpc('get_admin_leads_chart', {
        p_days: days,
      });
      if (error) throw error;
      return data as ChartDataPoint[];
    },
    staleTime: 60000,
  });
}

// Hook for top projects
export function useAdminTopProjects(limit = 10) {
  return useQuery({
    queryKey: ['adminTopProjects', limit],
    queryFn: async (): Promise<TopProject[]> => {
      const { data, error } = await supabase.rpc('get_admin_top_projects', {
        p_limit: limit,
      });
      if (error) throw error;
      return data as TopProject[];
    },
    staleTime: 60000,
  });
}

// Mutation for updating user
export function useAdminUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, plan }: { userId: string; plan?: string }) => {
      const { data, error } = await supabase.rpc('admin_update_user', {
        p_user_id: userId,
        p_plan: plan || null,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminUserDetails'] });
      queryClient.invalidateQueries({ queryKey: ['adminMetrics'] });
    },
  });
}
