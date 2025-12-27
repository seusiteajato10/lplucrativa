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

interface EditorPreviewProps {
  templateData: TemplateData;
  niche: ProjectNiche;
  templateId: string;
  previewMode: 'desktop' | 'mobile';
  projectName: string;
}

const EditorPreview = ({ templateData, niche, templateId, previewMode, projectName }: EditorPreviewProps) => {
  
  const renderTemplate = () => {
    const dataWithContext = { ...templateData, template_id: templateId };

    // Lógica de roteamento de templates de PRODUTO
    if (niche === 'product') {
      switch (templateId) {
        case 'product_vsl':
          return <ProductTemplateVSL data={dataWithContext} projectName={projectName} />;
        case 'product_modern':
          return <ProductTemplateModern data={dataWithContext} projectName={projectName} />;
        case 'product_classic':
          return <ProductTemplateClassic data={dataWithContext} projectName={projectName} />;
        default:
          return <ProductTemplate data={dataWithContext} projectName={projectName} />;
      }
    }

    const templates: Record<string, React.ComponentType<any>> = {
      service: ServiceTemplate,
      event: EventTemplate,
      course: CourseTemplate,
    };

    const SelectedComponent = templates[niche] || ProductTemplate;

    return <SelectedComponent data={dataWithContext} projectName={projectName} />;
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