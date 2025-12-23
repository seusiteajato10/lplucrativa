import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { TemplateData, CheckoutConfig } from "@/types/templateData";
import { Loader2 } from "lucide-react";
import ProductThankYou from "@/components/templates/thankyou/ProductThankYou";
import ServiceThankYou from "@/components/templates/thankyou/ServiceThankYou";
import EventThankYou from "@/components/templates/thankyou/EventThankYou";
import CourseThankYou from "@/components/templates/thankyou/CourseThankYou";

const ThankYouPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const leadName = searchParams.get("name") || undefined;
  const leadEmail = searchParams.get("email") || undefined;

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) { setIsLoading(false); return; }
      const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (data) setProject(data as Project);
      setIsLoading(false);
    };
    fetchProject();
  }, [slug]);

  const handleUpsellClick = () => {
    navigate(`/p/${slug}/upsell`);
  };

  const handleCheckoutClick = () => {
    const templateData = project?.template_data as unknown as TemplateData | null;
    const checkout = templateData?.integrations?.checkout;
    if (checkout?.url) {
      window.location.href = checkout.url;
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center"><p>Página não encontrada</p></div>;

  const templateData = project.template_data as unknown as TemplateData | null;
  const config = templateData?.thankYouPage;
  const upsellConfig = templateData?.upsellPage;
  const checkout = templateData?.integrations?.checkout;
  const styles = templateData?.styles;
  
  // Determine if we should show checkout button (for post_lead type)
  const showCheckoutButton = checkout?.type === 'post_lead' && !!checkout?.url;

  const components: Record<string, React.ComponentType<any>> = {
    product: ProductThankYou,
    service: ServiceThankYou,
    event: EventThankYou,
    course: CourseThankYou,
  };

  const Component = components[project.niche] || ProductThankYou;

  return (
    <>
      <Helmet><title>{config?.title || "Obrigado!"}</title></Helmet>
      <Component 
        config={config} 
        upsellConfig={upsellConfig} 
        styles={styles} 
        leadName={leadName} 
        leadEmail={leadEmail}
        onUpsellClick={handleUpsellClick}
        showCheckoutButton={showCheckoutButton}
        checkoutButtonText={checkout?.buttonText || "Comprar Agora"}
        onCheckoutClick={handleCheckoutClick}
      />
    </>
  );
};

export default ThankYouPage;
