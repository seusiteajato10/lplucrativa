import React from 'react';
import { TemplateData } from '@/types/templateData';
import { ProjectNiche } from '@/types/project';
import ProductTemplate from '@/components/templates/ProductTemplate';
import ServiceTemplate from '@/components/templates/ServiceTemplate';
import EventTemplate from '@/components/templates/EventTemplate';
import CourseTemplate from '@/components/templates/CourseTemplate';
import ProductTemplateVSL from '@/components/templates/ProductTemplateVSL';
import ProductTemplateModern from '@/components/templates/ProductTemplateModern';
import ProductTemplateClassic from '@/components/templates/ProductTemplateClassic';

// Capture Templates
import LeadCaptureEbook from '@/components/templates/capture/LeadCaptureEbook';
import LeadCaptureVSL from '@/components/templates/capture/LeadCaptureVSL';
import LeadCaptureQuiz from '@/components/templates/capture/LeadCaptureQuiz';
import LeadCaptureDiscount from '@/components/templates/capture/LeadCaptureDiscount';

// Upsell Templates
import ProductUpsell from '@/components/templates/upsell/ProductUpsell';

// Downsell Templates
import GenericDownsell from '@/components/templates/downsell/GenericDownsell';

// Thank You Templates
import ProductThankYou from '@/components/templates/thankyou/ProductThankYou';
import ServiceThankYou from '@/components/templates/thankyou/ServiceThankYou';
import EventThankYou from '@/components/templates/thankyou/EventThankYou';
import CourseThankYou from '@/components/templates/thankyou/CourseThankYou';

interface EditorPreviewProps {
  templateData: TemplateData;
  niche: ProjectNiche;
  templateId: string;
  previewMode: 'desktop' | 'mobile';
  projectName: string;
  projectId?: string;
  userId?: string;
}

const EditorPreview = ({ templateData, niche, templateId, previewMode, projectName, projectId, userId }: EditorPreviewProps) => {
  
  const renderTemplate = () => {
    const dataWithContext = { ...templateData, template_id: templateId };
    const commonProps = { 
      data: dataWithContext, 
      projectName, 
      projectId: projectId || "preview", 
      userId: userId || "preview" 
    };

    // Se o funil está ativado, renderiza baseado na configuração
    if (templateData?.funnel?.enabled) {
      const funnel = templateData.funnel;
      
      // Mapear templates de CAPTURA
      const captureTemplates: Record<string, React.ComponentType<any>> = {
        'LeadCaptureDiscount': LeadCaptureDiscount,
        'LeadCaptureEbook': LeadCaptureEbook,
        'LeadCaptureQuiz': LeadCaptureQuiz,
        'LeadCaptureVSL': LeadCaptureVSL,
      };

      // Mapear templates de VENDAS
      const salesTemplates: Record<string, React.ComponentType<any>> = {
        'ProductTemplate': ProductTemplate,
        'ProductTemplateVSL': ProductTemplateVSL,
        'ServiceTemplate': ServiceTemplate,
        'CourseTemplate': CourseTemplate,
        'EventTemplate': EventTemplate,
      };

      // Mapear templates de UPSELL
      const upsellTemplates: Record<string, React.ComponentType<any>> = {
        'ProductUpsell': ProductUpsell,
        'ServiceUpsell': ProductUpsell,
        'EventUpsell': ProductUpsell,
        'CourseUpsell': ProductUpsell,
      };

      // Mapear templates de THANK YOU
      const thankyouTemplates: Record<string, React.ComponentType<any>> = {
        'ProductThankYou': ProductThankYou,
        'ServiceThankYou': ServiceThankYou,
        'EventThankYou': EventThankYou,
        'CourseThankYou': CourseThankYou,
      };

      // Renderizar o template de CAPTURA (se configurado)
      if (funnel.leadCaptureTemplate && captureTemplates[funnel.leadCaptureTemplate]) {
        const CaptureComponent = captureTemplates[funnel.leadCaptureTemplate];
        return <CaptureComponent {...commonProps} />;
      }

      // Renderizar o template de VENDAS (se configurado)
      if (funnel.salesPageTemplate && salesTemplates[funnel.salesPageTemplate]) {
        const SalesComponent = salesTemplates[funnel.salesPageTemplate];
        return <SalesComponent {...commonProps} />;
      }

      // Renderizar o template de UPSELL (se configurado)
      if (funnel.upsellTemplate && upsellTemplates[funnel.upsellTemplate]) {
        const UpsellComponent = upsellTemplates[funnel.upsellTemplate];
        return <UpsellComponent {...commonProps} />;
      }

      // Renderizar o template de THANK YOU (se configurado)
      if (funnel.thankyouTemplate && thankyouTemplates[funnel.thankyouTemplate]) {
        const ThankYouComponent = thankyouTemplates[funnel.thankyouTemplate];
        return <ThankYouComponent {...commonProps} />;
      }
    }

    // Lógica de templates de CAPTURA (modo antigo)
    if (templateId.startsWith('capture_')) {
      switch (templateId) {
        case 'capture_ebook': return <LeadCaptureEbook {...commonProps} />;
        case 'capture_vsl': return <LeadCaptureVSL {...commonProps} />;
        case 'capture_quiz': return <LeadCaptureQuiz {...commonProps} />;
        case 'capture_discount': return <LeadCaptureDiscount {...commonProps} />;
      }
    }

    // Lógica de templates de PRODUTO (modo antigo)
    if (niche === 'product') {
      switch (templateId) {
        case 'product_vsl': return <ProductTemplateVSL {...commonProps} />;
        case 'product_modern': return <ProductTemplateModern {...commonProps} />;
        case 'product_classic': return <ProductTemplateClassic {...commonProps} />;
        default: return <ProductTemplate {...commonProps} />;
      }
    }

    const templates: Record<string, React.ComponentType<any>> = {
      service: ServiceTemplate,
      event: EventTemplate,
      course: CourseTemplate,
    };

    const SelectedComponent = templates[niche] || ProductTemplate;
    return <SelectedComponent {...commonProps} />;
  };

  return (
    <div className="flex-1 bg-secondary/30 overflow-hidden flex flex-col">
      <div className="bg-background/50 border-b border-border px-4 py-1 text-[10px] uppercase tracking-wider text-muted-foreground flex justify-between items-center">
        <span>Modo Visualização: {previewMode}</span>
        <span className="text-primary font-bold">Edição em Tempo Real</span>
      </div>
      
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        <div
          className={`bg-white shadow-2xl transition-all duration-300 origin-top ${
            previewMode === 'mobile' 
              ? 'w-[375px] min-h-[667px] rounded-[32px] border-[8px] border-slate-900' 
              : 'w-full max-w-6xl rounded-lg'
          }`}
        >
          <div className={`${previewMode === 'mobile' ? 'h-[650px] overflow-y-auto' : ''}`}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
