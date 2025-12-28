import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutTemplate,
  MousePointer2,
  ShoppingCart,
  Repeat,
  BookOpen,
  PlayCircle,
  HelpCircle,
  Ticket,
} from "lucide-react";

type TemplateCategory = "captura" | "vendas" | "funil" | "outros";

type TemplateCard = {
  id: string;
  name: string;
  category: TemplateCategory;
  tag: string;
  description: string;
  bestFor: string;
};

const templates: TemplateCard[] = [
  // CAPTURA
  {
    id: "capture_ebook",
    name: "Captura E-book",
    category: "captura",
    tag: "Lista / Isca Digital",
    description:
      "Página de captura focada em oferecer um e-book ou material gratuito em troca do e-mail.",
    bestFor: "Construir audiência e nutrir leads.",
  },
  {
    id: "capture_vsl",
    name: "Captura VSL",
    category: "captura",
    tag: "Aula / Masterclass",
    description:
      "Landing page com vídeo (VSL) e formulário simples, ideal para aulas e eventos ao vivo.",
    bestFor: "Webinars, aulas gravadas e eventos online.",
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "captura",
    tag: "Engajamento",
    description:
      "Quiz interativo que qualifica o lead antes da oferta principal.",
    bestFor: "Segmentar leads por perfil ou interesse.",
  },
  {
    id: "capture_discount",
    name: "Captura Desconto",
    category: "captura",
    tag: "Cupom / Oferta Relâmpago",
    description:
      "Página simples oferecendo um cupom de desconto em troca do cadastro.",
    bestFor: "Lojas, lançamentos rápidos e promoções.",
  },

  // VENDAS
  {
    id: "product_vsl",
    name: "Produto VSL",
    category: "vendas",
    tag: "Vídeo de Vendas",
    description:
      "Página de vendas centrada em vídeo, com seção de prova social e FAQ.",
    bestFor: "Infoprodutos, mentorias, cursos online.",
  },
  {
    id: "product_modern",
    name: "Produto Moderno",
    category: "vendas",
    tag: "Layout Clean",
    description:
      "Design moderno e minimalista com foco em benefícios e seções curtas.",
    bestFor: "SaaS, serviços e produtos digitais premium.",
  },
  {
    id: "product_classic",
    name: "Produto Clássico",
    category: "vendas",
    tag: "Carta Longa",
    description:
      "Estrutura tradicional de carta de vendas, com bastante texto e storytelling.",
    bestFor: "Lançamentos, funis diretos, ofertas de ticket alto.",
  },

  // FUNIL / OUTROS (caso queira evoluir depois)
];

const categoryLabels: Record<TemplateCategory, string> = {
  captura: "Páginas de Captura",
  vendas: "Páginas de Vendas",
  funil: "Etapas de Funil",
  outros: "Outros Modelos",
};

const categoryIcons: Record<TemplateCategory, React.ReactNode> = {
  captura: <MousePointer2 className="w-4 h-4" />,
  vendas: <ShoppingCart className="w-4 h-4" />,
  funil: <Repeat className="w-4 h-4" />,
  outros: <LayoutTemplate className="w-4 h-4" />,
};

const TemplateGallery: React.FC = () => {
  const groupedByCategory: Record<TemplateCategory, TemplateCard[]> = {
    captura: [],
    vendas: [],
    funil: [],
    outros: [],
  };

  templates.forEach((tpl) => {
    groupedByCategory[tpl.category].push(tpl);
  });

  return (
    <>
      <Helmet>
        <title>Galeria de Templates</title>
      </Helmet>
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Cabeçalho */}
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-1">
                Biblioteca de Modelos
              </p>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Escolha o template perfeito
                <LayoutTemplate className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                Visualize todos os modelos antes de criar o projeto. Clique em
                &quot;Ver em tela cheia&quot; para abrir o preview com conteúdo
                de exemplo.
              </p>
            </div>
            <Link to="/dashboard/projetos">
              <Button variant="outline" size="sm">
                Voltar para projetos
              </Button>
            </Link>
          </header>

          {/* Seções por categoria */}
          {(["captura", "vendas"] as TemplateCategory[]).map((category) =>
            groupedByCategory[category].length === 0 ? null : (
              <section key={category} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {categoryIcons[category]}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {categoryLabels[category]}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Modelos pensados especificamente para este objetivo.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {groupedByCategory[category].map((tpl) => (
                    <div
                      key={tpl.id}
                      className="border border-border rounded-xl bg-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                    >
                      {/* área simulando miniatura */}
                      <div className="h-40 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center">
                        {tpl.id === "capture_ebook" && (
                          <BookOpen className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "capture_vsl" && (
                          <PlayCircle className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "capture_quiz" && (
                          <HelpCircle className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "capture_discount" && (
                          <Ticket className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "product_vsl" && (
                          <PlayCircle className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "product_modern" && (
                          <LayoutTemplate className="w-10 h-10 text-primary/60" />
                        )}
                        {tpl.id === "product_classic" && (
                          <BookOpen className="w-10 h-10 text-primary/60" />
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold">{tpl.name}</h3>
                          <Badge variant="outline" className="text-[10px]">
                            {tpl.tag}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {tpl.description}
                        </p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                          Ideal para: {tpl.bestFor}
                        </p>
                      </div>

                      <div className="p-4 pt-0">
                        <Link
                          to={`/template-preview?templateId=${tpl.id}`}
                          target="_blank"
                        >
                          <Button className="w-full" size="sm" variant="outline">
                            Ver em tela cheia
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateGallery;
