-- Corrigir o warning 'Function Search Path Mutable' adicionando SET search_path = public
CREATE OR REPLACE FUNCTION public.save_project_version()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.project_versions (project_id, version_number, template_data)
  VALUES (
    NEW.id,
    (SELECT COALESCE(MAX(version_number), 0) + 1 FROM public.project_versions WHERE project_id = NEW.id),
    NEW.template_data
  );
  RETURN NEW;
END;
$function$;