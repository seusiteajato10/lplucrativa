-- Adicionar contato@moadigital.com.br como admin
INSERT INTO public.admin_roles (user_id, role)
VALUES ('70bd9eb9-875e-4e52-8129-7b088f607f28', 'admin')
ON CONFLICT DO NOTHING;