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

const TemplateGallery: React.FC = () => {
  const realTemplates = [
    // CAPTURA - SEUS TEMPLATES REAIS
    {
      id: "ProductTemplate",
      name: "Captura Produto",
      category: "captura",
      path: "/dashboard/projetos/new?template=ProductTemplate",
      tag: "Produto Simples",
      benefit: "Página de captura com formulário e depoimentos",
      icon: <LayoutTemplate className="w-8 h-8" />,
    },
    {
      id: "ProductTemplateVSL",
      name: "Captura VSL",
      category: "captura",
      path: "/dashboard/projetos/new?template=ProductTemplateVSL", 
      tag: "Vídeo + Formulário",
      benefit: "Estrutura VSL com vídeo player e captura",
      icon: <PlayCircle className="w-8 h-8" />,
    },
    // VENDAS - SEUS TEMPLATES REAIS
    {
      id: "UpsellPage",
      name: "Upsell Automático",
      category: "vendas",
      path: "/dashboard/projetos/new?template=UpsellPage",
      tag: "Oferta Extra",
      benefit: "Página de upsell pós-venda automática",
      icon: <ArrowRight className="w-8 h-8" />,
    },
    {
      id: "DownsellPage", 
      name: "Downsell Desconto",
      category: "vendas",
      path: "/dashboard/projetos/new?template=DownsellPage",
      tag: "Recuperação",
      benefit: "Recupera vendas perdidas com desconto",
      icon: <Ticket className="w-8 h-8" />,
    },
    // FUNIL - SEUS TEMPLATES REAIS
    {
      id: "ThankYouPage",
      name: "Página Obrigado",
      category: "funil",
      path: "/dashboard/projetos/new?template=ThankYouPage",
      tag: "Pós-venda",
      benefit: "Confirmação de compra + próximo passo",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Seus Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Seus 
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                templates reais
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Clique para criar projeto com seus templates já prontos.
            </p>
            <Link to="/dashboard/projetos?criar=true" 
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Criar Projeto Agora
            </Link>
          </div>
        </section>

        {/* SEUS TEMPLATES REAIS */}
        <section className="px-6 pb-32 max-w-7xl mx-auto space-y-24">
          {[
            { category: "captura", title: "Captura de Leads", icon: MousePointer2 },
            { category: "vendas", title: "Páginas de Vendas", icon: ShoppingCart },
            { category: "funil", title: "Funil Completo", icon: Repeat },
          ].map(({ category, title, icon: Icon }) => {
            const categoryTemplates = realTemplates.filter(t => t.category === category);
            
            return (
              <div key={category}>
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900">{title}</h2>
                    <p className="text-lg text-slate-600 mt-2">Seus templates reais otimizados</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryTemplates.map((tpl) => (
                    <Link
                      key={tpl.id}
                      to={tpl.path}
                      target="_blank"
                      className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-all">
                        {React.cloneElement(tpl.icon as React.ReactElement, {
                          className: "w-10 h-10 text-slate-600 group-hover:text-indigo-600 transition-colors"
                        })}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <h3 className="font-bold text-xl text-slate-900 leading-tight">{tpl.name}</h3>
                        <Badge variant="outline" className="text-xs px-4 py-1.5 border-slate-300 w-fit">
                          {tpl.tag}
                        </Badge>
                        <p className="text-slate-600 text-sm leading-relaxed">{tpl.benefit}</p>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 group-hover:translate-x-1 transition-all mt-auto"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          Criar com este template
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
