import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { TemplateData } from "@/types/templateData";
import { Loader2 } from "lucide-react";
import GenericDownsell from "@/components/templates/downsell/GenericDownsell";

const DownsellPage = () => {
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
    // TODO: Process downsell acceptance
    navigate(`/p/${slug}/obrigado`);
  };

  const handleDecline = () => {
    navigate(`/p/${slug}/obrigado`);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center"><p>Página não encontrada</p></div>;

  const templateData = project.template_data as unknown as TemplateData | null;
  const config = templateData?.downsellPage;
  const styles = templateData?.styles;

  return (
    <>
      <Helmet><title>{config?.title || "Última Chance"}</title></Helmet>
      <GenericDownsell config={config} styles={styles} onAccept={handleAccept} onDecline={handleDecline} />
    </>
  );
};

export default DownsellPage;
