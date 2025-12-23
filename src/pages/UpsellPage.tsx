import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { TemplateData } from "@/types/templateData";
import { Loader2 } from "lucide-react";
import ProductUpsell from "@/components/templates/upsell/ProductUpsell";
import ServiceUpsell from "@/components/templates/upsell/ServiceUpsell";
import EventUpsell from "@/components/templates/upsell/EventUpsell";
import CourseUpsell from "@/components/templates/upsell/CourseUpsell";

const UpsellPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) { setIsLoading(false); return; }
      const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (data) setProject(data as Project);
      setIsLoading(false);
    };
    fetchProject();
  }, [slug]);

  const handleAccept = () => {
    // TODO: Process upsell acceptance
    navigate(`/p/${slug}/obrigado`);
  };

  const handleDecline = () => {
    navigate(`/p/${slug}/downsell`);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center"><p>Página não encontrada</p></div>;

  const templateData = project.template_data as unknown as TemplateData | null;
  const config = templateData?.upsellPage;
  const styles = templateData?.styles;

  const components: Record<string, React.ComponentType<any>> = {
    product: ProductUpsell,
    service: ServiceUpsell,
    event: EventUpsell,
    course: CourseUpsell,
  };

  const Component = components[project.niche] || ProductUpsell;

  return (
    <>
      <Helmet><title>{config?.title || "Oferta Especial"}</title></Helmet>
      <Component config={config} styles={styles} onAccept={handleAccept} onDecline={handleDecline} />
    </>
  );
};

export default UpsellPage;
