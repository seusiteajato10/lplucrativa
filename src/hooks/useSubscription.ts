import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SubscriptionPlan {
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
}

export interface SubscriptionLimits {
  has_subscription: boolean;
  plan?: string;
  plan_slug?: string;
  limits?: {
    max_projects: number | null;
    max_page_views: number | null;
  };
  usage?: {
    projects_count: number;
    page_views_count: number;
    leads_captured_count: number;
  };
  can_create_project?: boolean;
  features?: string[];
  checkout_types?: string[];
  webhook_integration?: boolean;
  remove_branding?: boolean;
  error?: string;
}

export interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  trial_ends_at: string | null;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan?: SubscriptionPlan;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar planos disponíveis
  const fetchPlans = useCallback(async () => {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true });

    if (error) {
      console.error('Error fetching plans:', error);
      return;
    }

    setPlans(data?.map(plan => ({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features as string),
    })) || []);
  }, []);

  // Buscar assinatura do usuário
  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setLimits({ has_subscription: false });
      setLoading(false);
      return;
    }

    try {
      // Buscar assinatura ativa
      const { data: subData, error: subError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (subError) {
        console.error('Error fetching subscription:', subError);
        setError(subError.message);
        setLoading(false);
        return;
      }

      if (subData) {
        setSubscription({
          ...subData,
          plan: subData.plan ? {
            ...subData.plan,
            features: Array.isArray(subData.plan.features) 
              ? subData.plan.features 
              : JSON.parse(subData.plan.features as string),
          } : undefined,
        });
      } else {
        setSubscription(null);
      }

      // Buscar limites via RPC
      const { data: limitsData, error: limitsError } = await supabase
        .rpc('check_user_limits', { p_user_id: user.id });

      if (limitsError) {
        console.error('Error checking limits:', limitsError);
        setLimits({ has_subscription: false });
      } else {
        setLimits(limitsData as SubscriptionLimits);
      }
    } catch (err) {
      console.error('Error in fetchSubscription:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Verificar se pode criar projeto
  const canCreateProject = useCallback((): boolean => {
    if (!limits) return false;
    return limits.can_create_project ?? false;
  }, [limits]);

  // Verificar se tem feature específica
  const hasFeature = useCallback((feature: string): boolean => {
    if (!limits?.features) return false;
    return limits.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase())
    );
  }, [limits]);

  // Verificar tipo de checkout permitido
  const canUseCheckoutType = useCallback((type: 'external' | 'embedded' | 'post_lead'): boolean => {
    if (!limits?.checkout_types) return type === 'external'; // fallback
    return (limits.checkout_types as string[]).includes(type);
  }, [limits]);

  // Verificar se pode usar webhooks
  const canUseWebhooks = useCallback((): boolean => {
    return limits?.webhook_integration ?? false;
  }, [limits]);

  // Verificar se pode remover branding
  const canRemoveBranding = useCallback((): boolean => {
    return limits?.remove_branding ?? false;
  }, [limits]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    limits,
    plans,
    loading,
    error,
    canCreateProject,
    hasFeature,
    canUseCheckoutType,
    canUseWebhooks,
    canRemoveBranding,
    refetch: fetchSubscription,
  };
}
