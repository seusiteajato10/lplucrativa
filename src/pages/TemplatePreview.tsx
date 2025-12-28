import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import ProductTemplate from "@/components/templates/ProductTemplate";
import ProductTemplateVSL from "@/components/templates/ProductTemplateVSL";
import ProductTemplateModern from "@/components/templates/ProductTemplateModern";
import ProductTemplateClassic from "@/components/templates/ProductTemplateClassic";

import LeadCaptureEbook from "@/components/templates/capture/LeadCaptureEbook";
import LeadCaptureVSL from "@/components/templates/capture/LeadCaptureVSL";
import LeadCaptureQuiz from "@/components/templates/capture/LeadCaptureQuiz";
import LeadCaptureDiscount from "@/components/templates/capture/LeadCaptureDiscount";

type TemplateCard = {
  id: string;
  name: string;
  category: string;
  description: string;
};

const templates: TemplateCard[] = [
  {
    id: "capture_ebook",
    name: "Captura E-book",
    category: "Captura de Leads",
    description:
      "Página de captura com oferta de e-book gratuito. Ideal para construir lista de e-mails.",
  },
  {
    id: "capture_vsl",
    name: "Captura VSL",
    category: "Captura de Leads",
    description:
      "Captura com vídeo de vendas (VSL). Perfeita para aulas gratuitas e webinars.",
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "Captura de Leads",
    description:
      "Quiz interativo que qualifica leads e entrega resultado personalizado.",
  },
  {
    id: "capture_discount",
    name: "Captura Desconto",
    category: "Captura de Leads",
    description:
      "Oferta de cupom exclusivo com prazo limitado para gerar urgência.",
  },
  {
    id: "product_vsl",
    name: "Produto VSL",
    category: "Página de Vendas",
    description:
      "Landing page focada em vídeo de vendas com copy persuasiva e CTA forte.",
  },
  {
    id: "product_modern",
    name: "Produto Moderno",
    category: "Página de Vendas",
    description:
      "Design clean e minimalista, ideal para produtos digitais e SaaS.",
  },
  {
    id: "product_classic",
    name: "Produto Clássico",
    category: "Página de Vendas",
    description:
      "Carta de vendas longa, com estrutura testada para infoprodutos.",
  },
];

const TemplatePreview: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const templateId = searchParams.get("templateId") || "";
  const previewMode = (searchParams.get("mode") as "desktop" | "mobile") || "desktop";

  const demoData: Record<string, any> = {
    headline: "Transforme Seus Resultados em 30 Dias",
    subheadline:
      "A estratégia comprovada que já ajudou milhares de pessoas a alcançarem resultados reais e duradouros.",
    benefit1: "✓ Método validado com casos reais de sucesso.",
    benefit2: "✓ Passo a passo simples para aplicar ainda hoje.",
    benefit3: "✓ Suporte e garantia para você testar sem risco.",
    buttonLabel: "QUERO COMEÇAR AGORA",
    ctaButtonText: "GARANTIR MINHA VAGA",
    ebook_cover_text: "E-BOOK\nGuia Completo",
    badge: "OFERTA ESPECIAL • VAGAS LIMITADAS",
    discountBadge: "DESCONTO EXCLUSIVO",
    discountValue: "30% OFF",
    deadlineText: "Válido somente para os cadastrados de hoje.",
    formTitle: "Preencha para receber acesso imediato:",
    formSubtitle: "Enviaremos tudo diretamente no seu e-mail.",
    privacyText: "Seus dados estão protegidos. Sem spam.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    price: "197",
    originalPrice: "497",
    questions: [
      {
        id: "q1",
        question: "Qual é o seu nível de experiência com este tema?",
        options: [
          { label: "Iniciante - estou começando agora", value: "iniciante" },
          { label: "Intermediário - já tenho alguma base", value: "intermediario" },
          { label: "Avançado - quero me especializar", value: "avancado" },
        ],
      },
      {
        id: "q2",
        question: "Qual é o seu principal objetivo nos próximos 30 dias?",
        options: [
          { label: "Captar mais leads qualificados", value: "leads" },
          { label: "Aumentar minhas vendas diretas", value: "vendas" },
          { label: "Organizar minha estratégia completa", value: "estrategia" },
        ],
      },
    ],
  };

  const commonProps = {
    data: demoData,
    projectName: "Nome do Produto (Preview)",
    projectId: "preview-id",
    userId: "preview-user",
    slug: "preview-slug",
  };

  const renderTemplate = () => {
    if (!templateId) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <p className="text-muted-foreground text-sm text-center">
            Selecione um template na lista para visualizar o preview.
          </p>
        </div>
      );
    }

    if (templateId.startsWith("capture_")) {
      switch (templateId) {
        case "capture_ebook":
          return <LeadCaptureEbook {...commonProps} />;
        case "capture_vsl":
          return <LeadCaptureVSL {...commonProps} />;
        case "capture_quiz":
          return <LeadCaptureQuiz {...commonProps} />;
        case "capture_discount":
          return <LeadCaptureDiscount {...commonProps} />;
        default:
          return <LeadCaptureEbook {...commonProps} />;
      }
    }

    switch (templateId) {
      case "product_vsl":
        return (
          <ProductTemplateVSL
            data={demoData}
            projectName="Produto VSL (Preview)"
          />
        );
      case "product_modern":
        return (
          <ProductTemplateModern
            data={demoData}
            projectName="Produto Moderno (Preview)"
          />
        );
      case "product_classic":
        return (
          <ProductTemplateClassic
            data={demoData}
            projectName="Produto Clássico (Preview)"
          />
        );
      default:
        return (
          <ProductTemplate
            data={demoData}
            projectName="Produto Padrão (Preview)"
          />
        );
    }
  };

  const handleSelectTemplate = (id: string) => {
    setSearchParams({ templateId: id, mode: previewMode });
  };

  const handleModeChange = (mode: "desktop" | "mobile") => {
    const params: Record<string, string> = {};
    if (templateId) params.templateId = templateId;
    params.mode = mode;
    setSearchParams(params);
  };

  return (
    <>
      <Helmet>
        <title>Preview de Templates</title>
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card/60 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/dashboard/projetos">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Galeria de Templates
                </p>
                <h1 className="text-lg font-semibold">
                  Visualize o modelo antes de criar seu projeto
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={previewMode === "desktop" ? "default" : "outline"}
                onClick={() => handleModeChange("desktop")}
              >
                Desktop
              </Button>
              <Button
                size="sm"
                variant={previewMode === "mobile" ? "default" : "outline"}
                onClick={() => handleModeChange("mobile")}
              >
                Mobile
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-4 gap-4">
          <aside className="w-80 border border-border rounded-lg bg-card p-3 flex flex-col">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Escolha um template
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`w-full text-left border rounded-md p-3 text-sm transition-colors ${
                    templateId === tpl.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/60"
                  }`}
                >
                  <p className="text-[11px] text-primary font-semibold uppercase tracking-wide mb-1">
                    {tpl.category}
                  </p>
                  <p className="font-medium mb-1">{tpl.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {tpl.description}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 border border-border rounded-lg bg-card overflow-hidden flex items-center justify-center">
            <div
              className={`bg-white shadow-2xl transition-all duration-300 origin-top ${
                previewMode === "mobile"
                  ? "w-[375px] min-h-[667px] rounded-[32px] border-[8px] border-slate-900"
                  : "w-full max-w-5xl rounded-lg"
              }`}
            >
              <div
                className={
                  previewMode === "mobile"
                    ? "h-[650px] overflow-y-auto"
                    : "min-h-[500px]"
                }
              >
                {renderTemplate()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
