import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project, nicheLabels, ProjectNiche } from "@/types/project";
import { Loader2 } from "lucide-react";
import ProductTemplate from "@/components/templates/ProductTemplate";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import EventTemplate from "@/components/templates/EventTemplate";
import CourseTemplate from "@/components/templates/CourseTemplate";
import ProductTemplateVSL from "@/components/templates/ProductTemplateVSL";

const PublicLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) { 
        setNotFound(true); 
        setIsLoading(false); 
        return; 
      }
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error || !data) { 
          setNotFound(true); 
        } else {
          setProject(data as Project);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Helmet><title>Página não encontrada</title></Helmet>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground">Esta página não existe ou foi removida.</p>
      </div>
    );
  }

  const templateData = (project.template_data as Record<string, unknown>) || {};
  
  // Seleção dinâmica do componente de template
  const renderTemplate = () => {
    if (project.niche === 'product' && project.template_id === 'product_vsl') {
      return (
        <ProductTemplateVSL 
          data={templateData} 
          projectName={project.name} 
          projectId={project.id}
          userId={project.user_id}
          slug={slug}
        />
      );
    }

    const nicheComponents: Record<string, React.ComponentType<any>> = {
      product: ProductTemplate,
      service: ServiceTemplate,
      event: EventTemplate,
      course: CourseTemplate,
    };

    const SelectedComponent = nicheComponents[project.niche] || ProductTemplate;

    return (
      <SelectedComponent 
        data={templateData} 
        projectName={project.name} 
        projectId={project.id}
        userId={project.user_id}
        slug={slug}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>{project.name}</title>
        <meta name="description" content={`${nicheLabels[project.niche as ProjectNiche] || 'Projeto'} - ${project.name}`} />
      </Helmet>
      {renderTemplate()}
    </>
  );
};

export default PublicLandingPage;