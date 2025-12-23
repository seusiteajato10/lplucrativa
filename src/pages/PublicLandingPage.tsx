import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project, nicheLabels } from "@/types/project";
import { Loader2 } from "lucide-react";
import ProductTemplate from "@/components/templates/ProductTemplate";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import EventTemplate from "@/components/templates/EventTemplate";
import CourseTemplate from "@/components/templates/CourseTemplate";

const PublicLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) { setNotFound(true); setIsLoading(false); return; }
      
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      
      if (error || !data) { setNotFound(true); setIsLoading(false); return; }
      
      setProject(data as Project);
      setIsLoading(false);
    };
    fetchProject();
  }, [slug]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  
  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Helmet><title>Página não encontrada</title></Helmet>
      <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
      <p className="text-muted-foreground">Esta página não existe.</p>
    </div>
  );

  const templateData = project?.template_data as Record<string, unknown> || {};
  
  const templateComponents = {
    product: ProductTemplate,
    service: ServiceTemplate,
    event: EventTemplate,
    course: CourseTemplate,
  };
  
  const TemplateComponent = templateComponents[project?.niche as keyof typeof templateComponents] || ServiceTemplate;

  return (
    <>
      <Helmet>
        <title>{project?.name || 'Landing Page'}</title>
        <meta name="description" content={`${nicheLabels[project?.niche || 'product']} - ${project?.name}`} />
      </Helmet>
      <TemplateComponent 
        data={templateData} 
        projectName={project?.name || ''} 
        projectId={project?.id}
        userId={project?.user_id}
        slug={slug}
      />
    </>
  );
};

export default PublicLandingPage;
