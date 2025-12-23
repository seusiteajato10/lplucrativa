-- Função para admin buscar métricas globais
CREATE OR REPLACE FUNCTION public.get_admin_metrics()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total_users integer;
  v_active_subscriptions integer;
  v_total_projects integer;
  v_total_leads integer;
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  -- Contar usuários
  SELECT COUNT(*) INTO v_total_users FROM public.users;
  
  -- Contar assinaturas ativas
  SELECT COUNT(*) INTO v_active_subscriptions 
  FROM public.user_subscriptions 
  WHERE status = 'active';
  
  -- Contar projetos
  SELECT COUNT(*) INTO v_total_projects FROM public.projects;
  
  -- Contar leads
  SELECT COUNT(*) INTO v_total_leads FROM public.leads_captured;

  RETURN jsonb_build_object(
    'total_users', v_total_users,
    'active_subscriptions', v_active_subscriptions,
    'total_projects', v_total_projects,
    'total_leads', v_total_leads
  );
END;
$$;

-- Função para admin buscar lista de usuários com detalhes
CREATE OR REPLACE FUNCTION public.get_admin_users(
  p_search text DEFAULT '',
  p_plan_filter text DEFAULT '',
  p_status_filter text DEFAULT '',
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_users jsonb;
  v_total integer;
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  -- Buscar total de usuários (para paginação)
  SELECT COUNT(*) INTO v_total
  FROM public.users u
  WHERE (p_search = '' OR u.full_name ILIKE '%' || p_search || '%' OR u.email ILIKE '%' || p_search || '%');

  -- Buscar usuários com detalhes
  SELECT COALESCE(jsonb_agg(user_data), '[]'::jsonb) INTO v_users
  FROM (
    SELECT jsonb_build_object(
      'id', u.id,
      'email', u.email,
      'full_name', u.full_name,
      'plan', u.plan,
      'created_at', u.created_at,
      'subscription', (
        SELECT jsonb_build_object(
          'id', us.id,
          'status', us.status,
          'current_period_end', us.current_period_end,
          'plan_name', sp.name,
          'plan_slug', sp.slug
        )
        FROM public.user_subscriptions us
        LEFT JOIN public.subscription_plans sp ON sp.id = us.plan_id
        WHERE us.user_id = u.id
        ORDER BY us.created_at DESC
        LIMIT 1
      ),
      'projects_count', (
        SELECT COUNT(*) FROM public.projects p WHERE p.user_id = u.id
      ),
      'leads_count', (
        SELECT COUNT(*) FROM public.leads_captured lc WHERE lc.user_id = u.id
      )
    ) AS user_data
    FROM public.users u
    WHERE (p_search = '' OR u.full_name ILIKE '%' || p_search || '%' OR u.email ILIKE '%' || p_search || '%')
      AND (p_plan_filter = '' OR u.plan = p_plan_filter)
    ORDER BY u.created_at DESC
    LIMIT p_limit
    OFFSET p_offset
  ) sub;

  RETURN jsonb_build_object(
    'users', v_users,
    'total', v_total,
    'limit', p_limit,
    'offset', p_offset
  );
END;
$$;

-- Função para admin buscar detalhes de um usuário específico
CREATE OR REPLACE FUNCTION public.get_admin_user_details(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  SELECT jsonb_build_object(
    'user', (
      SELECT jsonb_build_object(
        'id', u.id,
        'email', u.email,
        'full_name', u.full_name,
        'plan', u.plan,
        'plan_limits', u.plan_limits,
        'created_at', u.created_at
      )
      FROM public.users u WHERE u.id = p_user_id
    ),
    'subscription', (
      SELECT jsonb_build_object(
        'id', us.id,
        'status', us.status,
        'current_period_start', us.current_period_start,
        'current_period_end', us.current_period_end,
        'cancel_at_period_end', us.cancel_at_period_end,
        'stripe_customer_id', us.stripe_customer_id,
        'stripe_subscription_id', us.stripe_subscription_id,
        'plan', (
          SELECT jsonb_build_object(
            'id', sp.id,
            'name', sp.name,
            'slug', sp.slug,
            'price_monthly', sp.price_monthly
          )
          FROM public.subscription_plans sp WHERE sp.id = us.plan_id
        )
      )
      FROM public.user_subscriptions us WHERE us.user_id = p_user_id
      ORDER BY us.created_at DESC LIMIT 1
    ),
    'projects', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'slug', p.slug,
        'niche', p.niche,
        'status', p.status,
        'created_at', p.created_at,
        'leads_count', (SELECT COUNT(*) FROM public.leads_captured lc WHERE lc.project_id = p.id)
      )), '[]'::jsonb)
      FROM public.projects p WHERE p.user_id = p_user_id
    ),
    'usage', (
      SELECT jsonb_build_object(
        'projects_count', COALESCE(su.projects_count, 0),
        'page_views_count', COALESCE(su.page_views_count, 0),
        'leads_captured_count', COALESCE(su.leads_captured_count, 0)
      )
      FROM public.subscription_usage su 
      WHERE su.user_id = p_user_id
        AND su.period_start <= NOW() AND su.period_end >= NOW()
      LIMIT 1
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Função para admin buscar todos os planos (incluindo inativos)
CREATE OR REPLACE FUNCTION public.get_admin_plans()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'id', sp.id,
      'name', sp.name,
      'slug', sp.slug,
      'price_monthly', sp.price_monthly,
      'price_yearly', sp.price_yearly,
      'max_projects', sp.max_projects,
      'max_page_views', sp.max_page_views,
      'features', sp.features,
      'checkout_types', sp.checkout_types,
      'webhook_integration', sp.webhook_integration,
      'custom_domain', sp.custom_domain,
      'remove_branding', sp.remove_branding,
      'priority_support', sp.priority_support,
      'is_active', sp.is_active,
      'subscribers_count', (
        SELECT COUNT(*) FROM public.user_subscriptions us 
        WHERE us.plan_id = sp.id AND us.status = 'active'
      )
    ) ORDER BY sp.price_monthly ASC), '[]'::jsonb)
    FROM public.subscription_plans sp
  );
END;
$$;

-- Função para admin buscar relatório de novos usuários por dia
CREATE OR REPLACE FUNCTION public.get_admin_users_chart(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'date', d.day::date,
      'count', COALESCE(u.cnt, 0)
    ) ORDER BY d.day), '[]'::jsonb)
    FROM generate_series(
      CURRENT_DATE - (p_days || ' days')::interval,
      CURRENT_DATE,
      '1 day'::interval
    ) AS d(day)
    LEFT JOIN (
      SELECT DATE(created_at) as dt, COUNT(*) as cnt
      FROM public.users
      WHERE created_at >= CURRENT_DATE - (p_days || ' days')::interval
      GROUP BY DATE(created_at)
    ) u ON u.dt = d.day::date
  );
END;
$$;

-- Função para admin buscar leads por dia
CREATE OR REPLACE FUNCTION public.get_admin_leads_chart(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'date', d.day::date,
      'count', COALESCE(l.cnt, 0)
    ) ORDER BY d.day), '[]'::jsonb)
    FROM generate_series(
      CURRENT_DATE - (p_days || ' days')::interval,
      CURRENT_DATE,
      '1 day'::interval
    ) AS d(day)
    LEFT JOIN (
      SELECT DATE(created_at) as dt, COUNT(*) as cnt
      FROM public.leads_captured
      WHERE created_at >= CURRENT_DATE - (p_days || ' days')::interval
      GROUP BY DATE(created_at)
    ) l ON l.dt = d.day::date
  );
END;
$$;

-- Função para admin buscar top projetos por leads
CREATE OR REPLACE FUNCTION public.get_admin_top_projects(p_limit integer DEFAULT 10)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'slug', p.slug,
      'niche', p.niche,
      'owner_name', u.full_name,
      'owner_email', u.email,
      'leads_count', leads.cnt
    )), '[]'::jsonb)
    FROM (
      SELECT project_id, COUNT(*) as cnt
      FROM public.leads_captured
      GROUP BY project_id
      ORDER BY cnt DESC
      LIMIT p_limit
    ) leads
    JOIN public.projects p ON p.id = leads.project_id
    JOIN public.users u ON u.id = p.user_id
    ORDER BY leads.cnt DESC
  );
END;
$$;

-- Função para admin atualizar usuário
CREATE OR REPLACE FUNCTION public.admin_update_user(
  p_user_id uuid,
  p_plan text DEFAULT NULL,
  p_status text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: usuário não é admin';
  END IF;

  -- Atualizar plano se fornecido
  IF p_plan IS NOT NULL THEN
    UPDATE public.users SET plan = p_plan WHERE id = p_user_id;
  END IF;

  RETURN jsonb_build_object('success', true);
END;
$$;