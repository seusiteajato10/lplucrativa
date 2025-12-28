import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MousePointer2,
  ShoppingCart,
  BookOpen,
  PlayCircle,
  HelpCircle,
  Ticket,
  LayoutTemplate,
} from "lucide-react";

type TemplateCategory = "captura" | "vendas";

type TemplateCard = {
  id: string;
  name: string;
  category: TemplateCategory;
  tag: string;
  description: string;
  bestFor: string;
  image: string;
};

const templates: TemplateCard[] = [
  {
    id: "capture_ebook",
    name: "Captura E-book",
    category: "captura",
    tag: "Lista / Isca Digital",
    description: "Página de captura focada em e-book gratuito em troca do e-mail.",
    bestFor: "Construir lista de e-mails.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  },
  {
    id: "capture_vsl",
    name: "Captura VSL",
    category: "captura",
    tag: "Vídeo / Aula",
    description: "Landing com vídeo e formulário simples para eventos online.",
    bestFor: "Webinars e masterclasses.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "captura",
    tag: "Interativo",
    description: "Quiz que qualifica leads por perfil ou interesse.",
    bestFor: "Segmentação avançada.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
  },
  {
    id: "capture_discount",
    name: "Captura Desconto",
    category: "captura",
    tag: "Cupom",
    description: "Página oferecendo cupom em troca do cadastro.",
    bestFor: "E-commerce e promoções.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    id: "product_vsl",
    name: "Produto VSL",
    category: "vendas",
    tag: "Vídeo de Vendas",
    description: "Página centrada em vídeo com prova social e FAQ.",
    bestFor: "Infoprodutos e cursos.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: "product_modern",
    name: "Produto Moderno",
    category: "vendas",
    tag: "Design Clean",
    description: "Layout minimalista focado em benefícios.",
    bestFor: "SaaS e serviços premium.",
    image: "https://images.unsplash.com/photo-1551676925-579b9726a763?w=800&h=600&fit=crop",
  },
  {
    id: "product_classic",
    name: "Produto Clássico",
    category: "vendas",
    tag: "Carta Longa",
    description: "Estrutura tradicional com storytelling extenso.",
    bestFor: "Lançamentos de ticket alto.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
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
            <Link to="/signup" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary/25 transition-all">
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
                    to={`/templates/${tpl.id}`}
                    className="group block bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
                  >
                    {/* IMAGEM REAL COM OVERLAY */}
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={tpl.image} 
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge className="bg-white/95 backdrop-blur-sm text-black font-bold text-xs px-3 py-1 shadow-lg">
                          Preview Completo
                        </Badge>
                      </div>
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
