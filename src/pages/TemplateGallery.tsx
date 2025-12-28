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
  Users,
  Zap,
} from "lucide-react";

type TemplateCategory = "captura" | "vendas";

type TemplateCard = {
  id: string;
  name: string;
  category: TemplateCategory;
  tag: string;
  description: string;
  bestFor: string;
  gradient: string;
  icon: React.ReactNode;
};

const templates: TemplateCard[] = [
  // CAPTURA - GRADIENTES PERFEITOS
  {
    id: "capture_ebook",
    name: "Captura E-book",
    category: "captura",
    tag: "Lista / Isca Digital",
    description: "Página clean para oferecer e-book gratuito em troca do e-mail.",
    bestFor: "Construir lista de e-mails.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    icon: <BookOpen className="w-16 h-16" />,
  },
  {
    id: "capture_vsl",
    name: "Captura VSL",
    category: "captura",
    tag: "Vídeo / Aula",
    description: "Landing com player de vídeo + formulário otimizado para eventos.",
    bestFor: "Webinars e masterclasses.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: <PlayCircle className="w-16 h-16" />,
  },
  {
    id: "capture_quiz",
    name: "Captura Quiz",
    category: "captura",
    tag: "Interativo",
    description: "Quiz gamificado que qualifica leads automaticamente.",
    bestFor: "Segmentação avançada.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: <HelpCircle className="w-16 h-16" />,
  },
  {
    id: "capture_discount",
    name: "Captura Desconto",
    category: "captura",
    tag: "Cupom",
    description: "Página rápida com contador + cupom exclusivo para e-commerce.",
    bestFor: "Promoções relâmpago.",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    icon: <Ticket className="w-16 h-16" />,
  },
  // VENDAS - GRADIENTES PREMIUM
  {
    id: "product_vsl",
    name: "Produto VSL",
    category: "vendas",
    tag: "Vídeo de Vendas",
    description: "Página com VSL longa + prova social + FAQ completa.",
    bestFor: "Infoprodutos de ticket alto.",
    gradient: "from-purple-600 via-pink-500 to-rose-500",
    icon: <PlayCircle className="w-16 h-16" />,
  },
  {
    id: "product_modern",
    name: "Produto Moderno",
    category: "vendas",
    tag: "Design Clean",
    description: "Layout minimalista com cards de benefícios + checkout direto.",
    bestFor: "SaaS e serviços premium.",
    gradient: "from-slate-400 via-blue-500 to-indigo-500",
    icon: <LayoutTemplate className="w-16 h-16" />,
  },
  {
    id: "product_classic",
    name: "Produto Clássico",
    category: "vendas",
    tag: "Carta Longa",
    description: "Estrutura clássica com storytelling + objeções + garantia.",
    bestFor: "Lançamentos quentes.",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: <BookOpen className="w-16 h-16" />,
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
        <title>Galeria de Templates Profissionais</title>
        <meta name="description" content="Templates otimizados para conversão máxima. Veja todos antes de escolher." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* HEADER PREMIUM */}
          <div className="text-center pb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-3xl mb-8 shadow-2xl">
              <LayoutTemplate className="w-8 h-8" />
              <span className="text-2xl font-black text-white">+50 Templates Inclusos</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight">
              Templates que 
              <span className="block">Convertem de Verdade</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Escolha o layout perfeito para seu funil. Todos otimizados para máxima conversão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 px-12 py-6 rounded-3xl font-black text-xl text-white shadow-2xl hover:shadow-primary/50 transition-all duration-500">
                <Zap className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Começar Grátis
              </Link>
              <Link to="/templates" className="px-12 py-6 border-3 border-primary text-primary font-bold text-xl rounded-3xl hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-primary/25">
                Ver Todos
              </Link>
            </div>
          </div>

          {/* CATEGORIAS */}
          {(["captura", "vendas"] as TemplateCategory[]).map((category) => (
            <section key={category}>
              <div className="flex items-center gap-6 mb-16">
                <div className={`w-20 h-20 rounded-2xl ${category === "captura" ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-emerald-500 to-teal-500"} flex items-center justify-center shadow-2xl`}>
                  {category === "captura" ? (
                    <MousePointer2 className="w-10 h-10 text-white" />
                  ) : (
                    <ShoppingCart className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                    {category === "captura" ? "Páginas de Captura" : "Páginas de Vendas"}
                  </h2>
                  <p className="text-xl text-gray-600 mt-2">Modelos testados com taxa de conversão comprovada.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {groupedByCategory[category].map((tpl, index) => (
                  <Link
                    key={tpl.id}
                    to={`/templates/${tpl.id}`}
                    className="group relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 h-full shadow-2xl"
                  >
                    {/* MOCKUP PROFISSIONAL COM GRADIENTE */}
                    <div className={`h-56 relative overflow-hidden ${tpl.gradient} group-hover:opacity-90 transition-opacity`}>
                      <div className="absolute inset-0 bg-gradient-to-br opacity-90" />
                      <div className="absolute inset-2 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        {React.cloneElement(tpl.icon as React.ReactElement, {
                          className: "w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                        })}
                      </div>
                      
                      {/* MACAQUINHO DO CELLPHONE */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-black/20 to-transparent rounded-3xl shadow-2xl -skew-x-12 transform translate-x-8 translate-y-12 group-hover:translate-x-12 group-hover:-skew-x-6 transition-all duration-700" />
                      
                      {/* REFLEXO */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-black text-gray-900 leading-tight">{tpl.name}</h3>
                        <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 font-bold px-4 py-2">
                          {tpl.tag}
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{tpl.description}</p>
                      <div className="flex items-center gap-2 text-xs bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-4 py-2 rounded-full font-semibold backdrop-blur-sm">
                        <Users className="w-4 h-4" />
                        Ideal para: {tpl.bestFor}
                      </div>
                    </div>

                    {/* CTA ANIMADO */}
                    <div className="px-8 pb-8">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 text-white font-bold shadow-xl hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/30">
                        <PlayCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        Ver Preview Completo
                      </Button>
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
