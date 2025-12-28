import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Project, nicheLabels, ProjectNiche } from "@/types/project";
import { Loader2 } from "lucide-react";

// Páginas de vendas
import ProductTemplate from "@/components/templates/ProductTemplate";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import EventTemplate from "@/components/templates/EventTemplate";
import CourseTemplate from "@/components/templates/CourseTemplate";
import ProductTemplateVSL from "@/components/templates/ProductTemplateVSL";
import ProductTemplateModern from "@/components/templates/ProductTemplateModern";
import ProductTemplateClassic from "@/components/templates/ProductTemplateClassic";

// CAPTURA
import LeadCaptureEbook from "@/components/templates/capture/LeadCaptureEbook";
import LeadCaptureVSL from "@/components/templates/capture/LeadCaptureVSL";
import LeadCaptureQuiz from "@/components/templates/capture/LeadCaptureQuiz";
import LeadCaptureDiscount from "@/components/templates/capture/LeadCaptureDiscount";

// UPSELL / DOWNSELL / THANK YOU (caso já existam)
import ProductUpsell from "@/components/templates/upsell/ProductUpsell";
import GenericDownsell from "@/components/templates/downsell/GenericDownsell";
import ProductThankYou from "@/components/templates/thankyou/ProductThankYou";
import ServiceThankYou from "@/components/templates/thankyou/ServiceThankYou";
import EventThankYou from "@/components/templates/thankyou/EventThankYou";
import CourseThankYou from "@/components/templates/thankyou/CourseThankYou";

type FunnelStep = "capture" | "sales" | "upsell" | "downsell" | "thankyou";

const PublicLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentFunnelStep, setCurrentFunnelStep] = useState<FunnelStep>("sales");

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error || !data) {
          setNotFound(true);
        } else {
          const projectData = data as Project;
          setProject(projectData);

          // Se o funil estiver ativo e tiver captura, começamos pela captura
          const funnel = (projectData.template_data as any)?.funnel;
          if (funnel?.enabled && funnel?.hasLeadCapture) {
            setCurrentFunnelStep("capture");
          } else {
            setCurrentFunnelStep("sales");
          }
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
        <Helmet>
          <title>Página não encontrada</title>
        </Helmet>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground">
          Esta página não existe ou foi removida.
        </p>
      </div>
    );
  }

  const templateData = (project.template_data as Record<string, unknown>) || {};
  const templateId = project.template_id;

  const renderTemplate = () => {
    const dataWithContext = {
      ...(templateData as any),
      template_id: templateId,
    };

    const commonProps = {
      data: dataWithContext,
      projectName: project.name,
      projectId: project.id,
      userId: project.user_id,
      slug: project.slug,
    };

    const funnel = (templateData as any)?.funnel;

    // 1) Se funil estiver habilitado, usamos a MESMA lógica do EditorPreview
    if (funnel?.enabled) {
      // CAPTURA
      if (
        currentFunnelStep === "capture" &&
        funnel.hasLeadCapture &&
        funnel.leadCaptureTemplate
      ) {
        switch (funnel.leadCaptureTemplate) {
          case "LeadCaptureDiscount":
            return <LeadCaptureDiscount {...commonProps} />;
          case "LeadCaptureEbook":
            return <LeadCaptureEbook {...commonProps} />;
          case "LeadCaptureQuiz":
            return <LeadCaptureQuiz {...commonProps} />;
          case "LeadCaptureVSL":
            return <LeadCaptureVSL {...commonProps} />;
          default:
            return <LeadCaptureDiscount {...commonProps} />;
        }
      }

      // VENDAS
      if (currentFunnelStep === "sales" && funnel.salesPageTemplate) {
        switch (funnel.salesPageTemplate) {
          case "ProductTemplate":
            return <ProductTemplate {...commonProps} />;
          case "ProductTemplateVSL":
            return <ProductTemplateVSL {...commonProps} />;
          case "ServiceTemplate":
            return <ServiceTemplate {...commonProps} />;
          case "CourseTemplate":
            return <CourseTemplate {...commonProps} />;
          case "EventTemplate":
            return <EventTemplate {...commonProps} />;
          default:
            return <ProductTemplate {...commonProps} />;
        }
      }

      // UPSELL
      if (
        currentFunnelStep === "upsell" &&
        funnel.hasUpsell &&
        funnel.upsellTemplate
      ) {
        return <ProductUpsell {...commonProps} />;
      }

      // DOWNSELL
      if (currentFunnelStep === "downsell" && funnel.hasDownsell) {
        return <GenericDownsell {...commonProps} />;
      }

      // THANK YOU
      if (
        currentFunnelStep === "thankyou" &&
        funnel.hasThankYou &&
        funnel.thankyouTemplate
      ) {
        switch (funnel.thankyouTemplate) {
          case "ProductThankYou":
            return <ProductThankYou {...commonProps} />;
          case "ServiceThankYou":
            return <ServiceThankYou {...commonProps} />;
          case "EventThankYou":
            return <EventThankYou {...commonProps} />;
          case "CourseThankYou":
            return <CourseThankYou {...commonProps} />;
          default:
            return <ProductThankYou {...commonProps} />;
        }
      }
    }

    // 2) Se NÃO tiver funil, mantém a lógica antiga de templates de CAPTURA isolados
    if (templateId?.startsWith("capture_")) {
      switch (templateId) {
        case "capture_ebook":
          return <LeadCaptureEbook {...commonProps} />;
        case "capture_vsl":
          return <LeadCaptureVSL {...commonProps} />;
        case "capture_quiz":
          return <LeadCaptureQuiz {...commonProps} />;
        case "capture_discount":
          return <LeadCaptureDiscount {...commonProps} />;
      }
    }

    // 3) Lógica de templates de PRODUTO
    if (project.niche === "product") {
      switch (templateId) {
        case "product_vsl":
          return (
            <ProductTemplateVSL
              data={templateData}
              projectName={project.name}
            />
          );
        case "product_modern":
          return (
            <ProductTemplateModern
              data={templateData}
              projectName={project.name}
            />
          );
        case "product_classic":
          return (
            <ProductTemplateClassic
              data={templateData}
              projectName={project.name}
            />
          );
        default:
          return (
            <ProductTemplate
              data={templateData}
              projectName={project.name}
            />
          );
      }
    }

    // 4) Outros Nichos
    const nicheComponents: Record<string, React.ComponentType<any>> = {
      service: ServiceTemplate,
      event: EventTemplate,
      course: CourseTemplate,
    };

    const SelectedComponent = nicheComponents[project.niche] || ProductTemplate;

    return <SelectedComponent {...commonProps} />;
  };

  return (
    <>
      <Helmet>
        <title>{project.name}</title>
        <meta
          name="description"
          content={`${
            nicheLabels[project.niche as ProjectNiche] || "Projeto"
          } - ${project.name}`}
        />
      </Helmet>
      {renderTemplate()}
    </>
  );
};

export default PublicLandingPage;
