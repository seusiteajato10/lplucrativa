import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutTemplate,
  MousePointer2,
  ShoppingCart,
  BookOpen,
  PlayCircle,
  HelpCircle,
  Ticket,
} from "lucide-react";

type TemplateCategory = "captura" | "vendas";

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
    description: "Página de captura focada em e-book gratuito em troca do e-mail.",
    bestFor: "Construir lista de e-mails.",
  },
  {
    id: "capture_vsl",
    name: "Captura VSL",
    category: "captura",
    tag: "Vídeo / Aula",
    description: "Landing com vídeo e formulário simples para eventos online.",
    bestFor: "Webinars e masterclasses.",
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "captura",
    tag: "Interativo",
    description: "Quiz que qualifica leads por perfil ou interesse.",
    bestFor: "Segmentação avançada.",
  },
  {
    id: "capture_discount",
    name: "Captura Desconto",
    category: "captura",
    tag: "Cupom",
    description: "Página oferecendo cupom em troca do cadastro.",
    bestFor: "E-commerce e promoções.",
  },
  // VENDAS
  {
    id: "product_vsl",
    name: "Produto VSL",
    category: "vendas",
    tag: "Vídeo de Vendas",
    description: "Página centrada em vídeo com prova social e FAQ.",
    bestFor: "Infoprodutos e cursos.",
  },
  {
    id: "product_modern",
    name: "Produto Moderno",
    category: "vendas",
    tag: "Design Clean",
    description: "Layout minimalista focado em benefícios.",
    bestFor: "SaaS e serviços premium.",
  },
  {
    id: "product_classic",
    name: "Produto Clássico",
    category: "vendas",
    tag: "Carta Longa",
    description: "Estrutura tradicional com storytelling extenso.",
    bestFor: "Lançamentos de ticket alto.",
  },
];

const TemplateGallery: React.FC = () => {
  const groupedByCategory: Record<TemplateCategory, TemplateCard[]> = {
    captura: templates.filter(t => t.category === "captura"),
    vendas: templates.filter(t => t.category === "vendas"),
  };

  return (
    <>
      <Helmet>
        <title>Galeria de Templates - Veja Todos os Modelos</title>
        <meta name="description" content="Escolha entre templates profissionais de captura e vendas. Visualize antes de criar seu projeto." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-6">
              Templates Profissionais
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Escolha o layout perfeito para seu negócio. Todos os templates são responsivos e otimizados para conversão.
            </p>
            <Link to="/auth/signup" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary/25 transition-all">
              <LayoutTemplate className="w-5 h-5" />
              Começar Agora Grátis
            </Link>
          </div>

          {/* Categorias */}
          {(["captura", "vendas"] as TemplateCategory[]).map((category) => (
            <section key={category} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  {category === "captura" ? (
                    <MousePointer2 className="w-6 h-6 text-primary" />
                  ) : (
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{category === "captura" ? "Páginas de Captura" : "Páginas de Vendas"}</h2>
                  <p className="text-lg text-muted-foreground">Modelos testados para máximo resultado.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupedByCategory[category].map((tpl) => (
                  <Link
                    key={tpl.id}
                    to={`/template-preview?templateId=${tpl.id}`}
                    className="group block bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
                  >
                    {/* Thumbnail */}
                    <div className="h-48 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {tpl.id === "capture_ebook" && <BookOpen className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "capture_vsl" && <PlayCircle className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "capture_quiz" && <HelpCircle className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "capture_discount" && <Ticket className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "product_vsl" && <PlayCircle className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "product_modern" && <LayoutTemplate className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                      {tpl.id === "product_classic" && <BookOpen className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform" />}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg leading-tight">{tpl.name}</h3>
                        <Badge variant="outline" className="text-xs px-2 py-1">{tpl.tag}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tpl.description}</p>
                      <p className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-full font-medium">
                        Ideal para: {tpl.bestFor}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="px-6 pb-6">
                      <Button className="w-full group-hover:bg-primary/95 transition-colors">Ver Preview Completo</Button>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateGallery;
