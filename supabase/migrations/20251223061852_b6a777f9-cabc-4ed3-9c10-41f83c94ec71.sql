-- Tabela de planos de assinatura
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  max_projects INTEGER,
  max_page_views INTEGER,
  features JSONB NOT NULL,
  checkout_types TEXT[] NOT NULL,
  webhook_integration BOOLEAN DEFAULT false,
  custom_domain BOOLEAN DEFAULT false,
  remove_branding BOOLEAN DEFAULT false,
  priority_support BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de assinaturas dos usuários
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);

-- Tabela de uso de assinatura
CREATE TABLE public.subscription_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  projects_count INTEGER DEFAULT 0,
  page_views_count INTEGER DEFAULT 0,
  leads_captured_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscription_usage_user ON subscription_usage(user_id);

-- Tabela de webhooks (Enterprise)
CREATE TABLE public.user_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhooks_user ON user_webhooks(user_id);

-- Logs de webhook
CREATE TABLE public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES user_webhooks(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_webhook ON webhook_logs(webhook_id);
CREATE INDEX idx_webhook_logs_created ON webhook_logs(created_at DESC);

-- RLS Policies
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Planos são públicos para leitura
CREATE POLICY "Plans are viewable by all" ON subscription_plans
  FOR SELECT USING (is_active = true);

-- Usuários veem suas próprias assinaturas
CREATE POLICY "Users view own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários veem seu próprio uso
CREATE POLICY "Users view own usage" ON subscription_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários gerenciam seus webhooks
CREATE POLICY "Users manage own webhooks" ON user_webhooks
  FOR ALL USING (auth.uid() = user_id);

-- Usuários veem logs dos seus webhooks
CREATE POLICY "Users view own webhook logs" ON webhook_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_webhooks 
      WHERE user_webhooks.id = webhook_logs.webhook_id 
      AND user_webhooks.user_id = auth.uid()
    )
  );

-- Inserir planos padrão
INSERT INTO public.subscription_plans (name, slug, price_monthly, price_yearly, max_projects, max_page_views, features, checkout_types, webhook_integration, custom_domain, remove_branding, priority_support)
VALUES
  ('Básico', 'basic', 47.00, 470.00, 3, 10000,
   '["4 templates profissionais", "Captura de leads ilimitada", "Editor visual", "Checkout externo", "Domínio personalizado", "Suporte por email"]'::jsonb,
   ARRAY['external'], false, true, false, false),
  
  ('Pro', 'pro', 97.00, 970.00, 15, 50000,
   '["Tudo do Básico", "Projetos ilimitados*", "3 tipos de checkout", "Páginas de Upsell/Downsell", "A/B Testing", "Remover marca LP Lucrativa", "Analytics avançado", "Suporte prioritário"]'::jsonb,
   ARRAY['external', 'embedded', 'post_lead'], false, true, true, true),
  
  ('Enterprise', 'enterprise', 297.00, 2970.00, NULL, NULL,
   '["Tudo do Pro", "Projetos ilimitados", "Page views ilimitadas", "Integração via Webhooks", "API de automação", "Gerente de conta dedicado", "Onboarding personalizado", "White-label completo"]'::jsonb,
   ARRAY['external', 'embedded', 'post_lead'], true, true, true, true);

-- Função para verificar limites do usuário
CREATE OR REPLACE FUNCTION public.check_user_limits(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_subscription RECORD;
  v_plan RECORD;
  v_usage RECORD;
BEGIN
  SELECT * INTO v_subscription
  FROM user_subscriptions
  WHERE user_id = p_user_id AND status = 'active'
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'No active subscription', 'has_subscription', false);
  END IF;

  SELECT * INTO v_plan FROM subscription_plans WHERE id = v_subscription.plan_id;

  SELECT * INTO v_usage
  FROM subscription_usage
  WHERE user_id = p_user_id
    AND period_start <= NOW()
    AND period_end >= NOW()
  LIMIT 1;

  RETURN jsonb_build_object(
    'has_subscription', true,
    'plan', v_plan.name,
    'plan_slug', v_plan.slug,
    'limits', jsonb_build_object(
      'max_projects', v_plan.max_projects,
      'max_page_views', v_plan.max_page_views
    ),
    'usage', jsonb_build_object(
      'projects_count', COALESCE(v_usage.projects_count, 0),
      'page_views_count', COALESCE(v_usage.page_views_count, 0),
      'leads_captured_count', COALESCE(v_usage.leads_captured_count, 0)
    ),
    'can_create_project', (v_plan.max_projects IS NULL OR COALESCE(v_usage.projects_count, 0) < v_plan.max_projects),
    'features', v_plan.features,
    'checkout_types', to_jsonb(v_plan.checkout_types),
    'webhook_integration', v_plan.webhook_integration,
    'remove_branding', v_plan.remove_branding
  );
END;
$$;

-- Função para atualizar contador de uso
CREATE OR REPLACE FUNCTION public.update_usage_counter(
  p_user_id UUID,
  p_counter_type TEXT,
  p_increment INTEGER DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_counter_type = 'projects' THEN
    UPDATE subscription_usage
    SET projects_count = projects_count + p_increment, updated_at = NOW()
    WHERE user_id = p_user_id
      AND period_start <= NOW()
      AND period_end >= NOW();
  ELSIF p_counter_type = 'page_views' THEN
    UPDATE subscription_usage
    SET page_views_count = page_views_count + p_increment, updated_at = NOW()
    WHERE user_id = p_user_id
      AND period_start <= NOW()
      AND period_end >= NOW();
  ELSIF p_counter_type = 'leads' THEN
    UPDATE subscription_usage
    SET leads_captured_count = leads_captured_count + p_increment, updated_at = NOW()
    WHERE user_id = p_user_id
      AND period_start <= NOW()
      AND period_end >= NOW();
  END IF;
END;
$$;