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
  ArrowRight,
  Repeat,
} from "lucide-react";

type TemplateCategory = "captura" | "vendas" | "funil";

type TemplateCard = {
  id: string;
  name: string;
  category: TemplateCategory;
  tag: string;
  benefit: string;
  icon: React.ReactNode;
};

const templates: TemplateCard[] = [
  // CAPTURA
  {
    id: "capture_ebook",
    name: "Captura E-book",
    category: "captura",
    tag: "Lista de e-mails",
    benefit: "Coleta 3x mais leads que formulários comuns",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    id: "capture_vsl",
    name: "Captura VSL", 
    category: "captura",
    tag: "Webinars ao vivo",
    benefit: "Converte 40% dos visitantes em inscritos",
    icon: <PlayCircle className="w-8 h-8" />,
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "captura",
    tag: "Qualificação automática",
    benefit: "Segmenta leads por interesse em 90s",
    icon: <HelpCircle className="w-8 h-8" />,
  },
  {
    id: "capture_discount",
    name: "Captura Cupom",
    category: "captura",
    tag: "E-commerce",
    benefit: "Gera vendas imediatas com cupom exclusivo",
    icon: <Ticket className="w-8 h-8" />,
  },
  // VENDAS
  {
    id: "product_vsl",
    name: "Venda VSL Longa",
    category: "vendas",
    tag: "Ticket alto",
    benefit: "Estrutura comprovada para R$5k+ por venda",
    icon: <PlayCircle className="w-8 h-8" />,
  },
  {
    id: "product_modern",
    name: "Venda Moderna",
    category: "vendas",
    tag: "SaaS/Services",
    benefit: "Checkout otimizado + benefícios visuais",
    icon: <LayoutTemplate className="w-8 h-8" />,
  },
  {
    id: "product_classic",
    name: "Carta de Vendas",
    category: "vendas",
    tag: "Lançamentos",
    benefit: "Storytelling clássico que vende todo dia",
    icon: <BookOpen className="w-8 h-8" />,
  },
  // FUNIL
  {
    id: "upsell_offer",
    name: "Upsell Automático",
    category: "funil",
    tag: "Oferta extra",
    benefit: "Aumenta ticket médio em 67% pós-venda",
    icon: <ArrowRight className="w-8 h-8" />,
  },
  {
    id: "downsell_discount",
    name: "Downsell Desconto",
    category: "funil",
    tag: "Recuperação",
    benefit: "Recupera 23% dos carrinhos abandonados",
    icon: <Ticket className="w-8 h-8" />,
  },
  {
    id: "thankyou_page",
    name: "Página Obrigado",
    category: "funil",
    tag: "Pós-venda",
    benefit: "Nutre cliente + coleta feedback",
    icon: <LayoutTemplate className="w-8 h-8" />,
  },
];

const TemplateGallery: React.FC = () => {
  const groupedByCategory = {
    captura: templates.filter(t => t.category === "captura"),
    vendas: templates.filter(t => t.category === "vendas"),
    funil: templates.filter(t => t.category === "funil"),
  };

  return (
    <>
      <Helmet>
        <title>Templates que Convertem | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <LayoutTemplate className="w-4 h-4" />
              +50 templates profissionais inclusos
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Templates que 
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                realmente convertem
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Captura → Vendas → Funil completo. Otimizados para máxima conversão.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/signup"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
              >
                Começar grátis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="#captura"
                className="border-2 border-slate-200 text-slate-900 hover:border-slate-300 px-10 py-6 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all duration-300"
              >
                Ver templates
              </Link>
            </div>
          </div>
        </section>

        {/* TEMPLATES - 3 SEÇÕES */}
        <section className="px-6 pb-32 max-w-7xl mx-auto space-y-24">
          {Object.entries(groupedByCategory).map(([category, categoryTemplates]: [string, TemplateCard[]]) => (
            <div key={category} id={category}>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  {category === "captura" ? (
                    <MousePointer2 className="w-6 h-6 text-white" />
                  ) : category === "vendas" ? (
                    <ShoppingCart className="w-6 h-6 text-white" />
                  ) : (
                    <Repeat className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-slate-900 capitalize">
                    {category === "captura" ? "Captura de leads" : 
                     category === "vendas" ? "Páginas de vendas" : "Funil completo"}
                  </h2>
                  <p className="text-lg text-slate-600 mt-2">Modelos testados em campanhas reais</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryTemplates.map((tpl) => (
                  <Link
                    key={tpl.id}
                    to={`/templates/${tpl.id}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                  >
                    {/* ICON */}
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                      {React.cloneElement(tpl.icon as React.ReactElement, {
                        className: "w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors"
                      })}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl text-slate-900 leading-tight">{tpl.name}</h3>
                        <Badge variant="outline" className="text-xs px-3 py-1 border-slate-300">
                          {tpl.tag}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{tpl.benefit}</p>
                    </div>

                    {/* CTA */}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-12 mt-4 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 group-hover:translate-x-2 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Ver demo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
