import React, { useState } from 'react';
import { TemplateData } from '@/types/templateData';
import { ProjectNiche } from '@/types/project';
import ProductTemplate from '@/components/templates/ProductTemplate';
import ServiceTemplate from '@/components/templates/ServiceTemplate';
import EventTemplate from '@/components/templates/EventTemplate';
import CourseTemplate from '@/components/templates/CourseTemplate';
import ProductTemplateVSL from '@/components/templates/ProductTemplateVSL';
import ProductTemplateModern from '@/components/templates/ProductTemplateModern';
import ProductTemplateClassic from '@/components/templates/ProductTemplateClassic';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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

type FunnelStep = 'capture' | 'sales' | 'upsell' | 'downsell' | 'thankyou';

const EditorPreview = ({ templateData, niche, templateId, previewMode, projectName, projectId, userId }: EditorPreviewProps) => {
  
  const [currentFunnelStep, setCurrentFunnelStep] = useState<FunnelStep>('sales');
  
  const renderTemplate = () => {
    const dataWithContext = { ...templateData, template_id: templateId };
    const commonProps = { 
      data: dataWithContext, 
      projectName, 
      projectId: projectId || "preview", 
      userId: userId || "preview" 
    };

    // Se o funil está ativado, renderiza baseado na etapa selecionada
    if (templateData?.funnel?.enabled) {
      const funnel = templateData.funnel;
      
      // ETAPA: CAPTURA
      if (currentFunnelStep === 'capture' && funnel.hasLeadCapture && funnel.leadCaptureTemplate) {
        switch (funnel.leadCaptureTemplate) {
          case 'LeadCaptureDiscount':
            return <LeadCaptureDiscount {...commonProps} />;
          case 'LeadCaptureEbook':
            return <LeadCaptureEbook {...commonProps} />;
          case 'LeadCaptureQuiz':
            return <LeadCaptureQuiz {...commonProps} />;
          case 'LeadCaptureVSL':
            return <LeadCaptureVSL {...commonProps} />;
          default:
            return <LeadCaptureDiscount {...commonProps} />;
        }
      }

      // ETAPA: VENDAS
      if (currentFunnelStep === 'sales' && funnel.salesPageTemplate) {
        switch (funnel.salesPageTemplate) {
          case 'ProductTemplate':
            return <ProductTemplate {...commonProps} />;
          case 'ProductTemplateVSL':
            return <ProductTemplateVSL {...commonProps} />;
          case 'ServiceTemplate':
            return <ServiceTemplate {...commonProps} />;
          case 'CourseTemplate':
            return <CourseTemplate {...commonProps} />;
          case 'EventTemplate':
            return <EventTemplate {...commonProps} />;
          default:
            return <ProductTemplate {...commonProps} />;
        }
      }

      // ETAPA: UPSELL
      if (currentFunnelStep === 'upsell' && funnel.hasUpsell && funnel.upsellTemplate) {
        return <ProductUpsell {...commonProps} />;
      }

      // ETAPA: DOWNSELL
      if (currentFunnelStep === 'downsell' && funnel.hasDownsell) {
        return <GenericDownsell {...commonProps} />;
      }

      // ETAPA: THANK YOU
      if (currentFunnelStep === 'thankyou' && funnel.hasThankYou && funnel.thankyouTemplate) {
        switch (funnel.thankyouTemplate) {
          case 'ProductThankYou':
            return <ProductThankYou {...commonProps} />;
          case 'ServiceThankYou':
            return <ServiceThankYou {...commonProps} />;
          case 'EventThankYou':
            return <EventThankYou {...commonProps} />;
          case 'CourseThankYou':
            return <CourseThankYou {...commonProps} />;
          default:
            return <ProductThankYou {...commonProps} />;
        }
      }

      // Se nenhuma etapa foi configurada, mostra mensagem
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Configure as etapas do funil</h3>
            <p className="text-muted-foreground">
              Selecione os templates nas abas ao lado para visualizar cada etapa
            </p>
          </div>
        </div>
      );
    }

    // Lógica de templates de CAPTURA (modo antigo - por templateId)
    if (templateId.startsWith('capture_')) {
      switch (templateId) {
        case 'capture_ebook': 
          return <LeadCaptureEbook {...commonProps} />;
        case 'capture_vsl': 
          return <LeadCaptureVSL {...commonProps} />;
        case 'capture_quiz': 
          return <LeadCaptureQuiz {...commonProps} />;
        case 'capture_discount': 
          return <LeadCaptureDiscount {...commonProps} />;
        default:
          return <LeadCaptureDiscount {...commonProps} />;
      }
    }

    // Lógica de templates de PRODUTO (modo antigo)
    if (niche === 'product') {
      switch (templateId) {
        case 'product_vsl': 
          return <ProductTemplateVSL {...commonProps} />;
        case 'product_modern': 
          return <ProductTemplateModern {...commonProps} />;
        case 'product_classic': 
          return <ProductTemplateClassic {...commonProps} />;
        default: 
          return <ProductTemplate {...commonProps} />;
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

  const getFunnelSteps = () => {
    if (!templateData?.funnel?.enabled) return [];
    
    const funnel = templateData.funnel;
    const steps: Array<{ key: FunnelStep; label: string; active: boolean }> = [];
    
    if (funnel.hasLeadCapture) {
      steps.push({ key: 'capture', label: 'Captura', active: true });
    }
    
    // Vendas sempre está ativo
    steps.push({ key: 'sales', label: 'Vendas', active: true });
    
    if (funnel.hasUpsell) {
      steps.push({ key: 'upsell', label: 'Upsell', active: true });
    }
    if (funnel.hasDownsell) {
      steps.push({ key: 'downsell', label: 'Downsell', active: true });
    }
    if (funnel.hasThankYou) {
      steps.push({ key: 'thankyou', label: 'Obrigado', active: true });
    }
    
    return steps;
  };

  const funnelSteps = getFunnelSteps();

  return (
    <div className="flex-1 bg-secondary/30 overflow-hidden flex flex-col">
      <div className="bg-background/50 border-b border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <div className="flex justify-between items-center mb-2">
          <span>Modo Visualização: {previewMode}</span>
          <span className="text-primary font-bold">Edição em Tempo Real</span>
        </div>
        
        {templateData?.funnel?.enabled && funnelSteps.length > 0 && (
          <div className="flex items-center gap-2 py-2 border-t border-border/50">
            <span className="text-[9px] font-semibold mr-2">FLUXO DO FUNIL:</span>
            {funnelSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                <Button
                  size="sm"
                  variant={currentFunnelStep === step.key ? 'default' : 'outline'}
                  onClick={() => setCurrentFunnelStep(step.key)}
                  className="h-7 text-[10px] px-3"
                >
                  {step.label}
                </Button>
                {index < funnelSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
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
