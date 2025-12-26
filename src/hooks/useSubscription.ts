import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query'; // Import useQuery and useQueryClient

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
  const queryClient = useQueryClient(); // Initialize queryClient

  // 1. Plans Query
  const { data: plansData = [], isLoading: isLoadingPlans, error: plansQueryError } = useQuery<SubscriptionPlan[]>({
    queryKey: ['subscriptionPlans'], // Unique key for plans
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) {
        console.error('Error fetching plans:', error);
        throw error; // Throw error for React Query to catch
      }

      return data?.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features as string),
      })) || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // 2. User Subscription and Limits Query
  const {
    data: userSubscriptionData,
    isLoading: isLoadingUserSubscription,
    error: userSubscriptionError,
    refetch: refetchUserSubscriptionQuery, // Renamed to avoid conflict with combined refetch
  } = useQuery<{ subscription: UserSubscription | null; limits: SubscriptionLimits | null }>({
    queryKey: ['userSubscription', user?.id],
    queryFn: async () => {
      if (!user?.id) return { subscription: null, limits: { has_subscription: false } };

      let currentSubscription: UserSubscription | null = null;
      let currentLimits: SubscriptionLimits | null = { has_subscription: false };

      // Fetch active subscription
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
        throw subError;
      }

      if (subData) {
        currentSubscription = {
          ...subData,
          plan: subData.plan ? {
            ...subData.plan,
            features: Array.isArray(subData.plan.features)
              ? subData.plan.features
              : JSON.parse(subData.plan.features as string),
          } : undefined,
        };
      }

      // Fetch limits via RPC
      const { data: limitsData, error: limitsError } = await supabase
        .rpc('check_user_limits', { p_user_id: user.id });

      if (limitsError) {
        console.error('Error checking limits:', limitsError);
        // Don't throw, just set default limits
      } else {
        currentLimits = limitsData as SubscriptionLimits;
      }

      return { subscription: currentSubscription, limits: currentLimits };
    },
    enabled: !!user?.id, // Only run if user is logged in
    staleTime: 10 * 1000, // Cache for 10 seconds
  });

  // Combine loading and error states
  const loading = isLoadingPlans || isLoadingUserSubscription;
  const error = plansQueryError || userSubscriptionError;

  // Expose a combined refetch function that invalidates relevant queries
  const refetch = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['subscriptionPlans'] }),
      queryClient.invalidateQueries({ queryKey: ['userSubscription', user?.id] }),
    ]);
  }, [queryClient, user?.id]);

  // Memoized selectors for derived states
  const canCreateProject = useCallback((): boolean => {
    if (!userSubscriptionData?.limits) return false;
    return userSubscriptionData.limits.can_create_project ?? false;
  }, [userSubscriptionData?.limits]);

  const hasFeature = useCallback((feature: string): boolean => {
    if (!userSubscriptionData?.limits?.features) return false;
    return userSubscriptionData.limits.features.some(f =>
      f.toLowerCase().includes(feature.toLowerCase())
    );
  }, [userSubscriptionData?.limits?.features]);

  const canUseCheckoutType = useCallback((type: 'external' | 'embedded' | 'post_lead'): boolean => {
    if (!userSubscriptionData?.limits?.checkout_types) return type === 'external';
    return (userSubscriptionData.limits.checkout_types as string[]).includes(type);
  }, [userSubscriptionData?.limits?.checkout_types]);

  const canUseWebhooks = useCallback((): boolean => {
    return userSubscriptionData?.limits?.webhook_integration ?? false;
  }, [userSubscriptionData?.limits?.webhook_integration]);

  const canRemoveBranding = useCallback((): boolean => {
    return userSubscriptionData?.limits?.remove_branding ?? false;
  }, [userSubscriptionData?.limits?.remove_branding]);

  return {
    subscription: userSubscriptionData?.subscription || null,
    limits: userSubscriptionData?.limits || null,
    plans: plansData,
    loading,
    error,
    canCreateProject,
    hasFeature,
    canUseCheckoutType,
    canUseWebhooks,
    canRemoveBranding,
    refetch,
  };
}