import React, { lazy } from 'react';

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  component: React.LazyExoticComponent<any>;
}

// Busca todos os arquivos .tsx dentro da pasta de templates
const templateModules = import.meta.glob('../components/templates/**/*.tsx', { eager: true });

export const getTemplates = (): TemplateMeta[] => {
  const templates: TemplateMeta[] = [];

  for (const path in templateModules) {
    const module: any = templateModules[path];
    
    // Só registra se o componente exportar o objeto templateMeta
    if (module.templateMeta) {
      // Cria o componente lazy para performance
      const component = lazy(() => import(/* @vite-ignore */ path));
      
      templates.push({
        ...module.templateMeta,
        component
      });
    }
  }

  return templates;
};

// Dados de exemplo para o preview
export const mockPreviewData = {
  projectName: "Projeto Demo",
  projectId: "demo-id",
  userId: "demo-user",
  slug: "demo-slug",
  data: {
    headline: "Transforme seus Resultados Hoje",
    subheadline: "A estratégia definitiva que já ajudou centenas de empreendedores a escalarem seus negócios com previsibilidade.",
    discountValue: "40% OFF",
    buttonLabel: "GARANTIR MEU ACESSO AGORA",
    formTitle: "Receba seu desconto exclusivo",
    formSubtitle: "Cadastre-se e receba o código promocional no seu e-mail.",
  }
};