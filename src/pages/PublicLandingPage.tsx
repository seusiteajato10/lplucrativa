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
import ProductTemplateVSL from "@/components/templates/ProductTemplateVSL"; // Importação corrigida

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
  
  // Determine which template to use based on niche and template_id
  let TemplateComponent;
  if (project?.niche === 'product') {
    switch (project.template_id) {
      case 'product_vsl':
        TemplateComponent = ProductTemplateVSL;
        break;
      case 'product_modern':
        // TODO: Implement ProductTemplateModern
        TemplateComponent = ProductTemplate; // Fallback for now
        break;
      case 'product_minimal':
        // TODO: Implement ProductTemplateMinimal
        TemplateComponent = ProductTemplate; // Fallback for now
        break;
      case 'product_default':
      default:
        TemplateComponent = ProductTemplate;
        break;
    }
  } else {
    // Existing niche-based selection for other types
    const nicheComponents: Record<ProjectNiche, React.ComponentType<any>> = {
      product: ProductTemplate, // Should not be reached if product niche is handled above
      service: ServiceTemplate,
      event: EventTemplate,
      course: CourseTemplate,
    };
    TemplateComponent = nicheComponents[project?.niche || 'product'] || ProductTemplate;
  }

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