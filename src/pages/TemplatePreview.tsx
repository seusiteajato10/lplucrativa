import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, CheckCircle } from "lucide-react";

const TemplatePreview = () => {
  const { templateId = "capture_ebook" } = useParams();
  const navigate = useNavigate();

  const templates = {
    capture_ebook: {
      title: "Captura E-book - Ebook Gratuito",
      hero: "Descubra os 5 Segredos do Marketing Digital",
      subtitle: "Baixe agora o guia completo GRATUITO que já ajudou +10k empreendedores",
      formTitle: "Cadastre-se para receber",
      cta: "Quero o E-book Grátis",
      color: "from-indigo-500 to-purple-500",
      icon: "📖",
    },
    "capture_vsl": {
      title: "Captura VSL - Aula ao Vivo",
      hero: "Aula Exclusiva: Multiplique suas Vendas em 30 Dias",
      subtitle: "Inscreva-se AGORA - Vagas Limitadas (só 500 disponíveis)",
      formTitle: "Reserve sua vaga gratuita",
      cta: "Quero Assistir Agora",
      color: "from-blue-500 to-cyan-500",
      icon: "▶️",
    },
    "capture_quiz": {
      title: "Captura Quiz - Diagnóstico Personalizado",
      hero: "Descubra seu Perfil de Conversão em 60 Segundos",
      subtitle: "Responda 5 perguntas e receba relatório personalizado GRATUITO",
      formTitle: "Receba seu diagnóstico",
      cta: "Ver Meu Resultado",
      color: "from-orange-500 to-red-500",
      icon: "❓",
    },
    "capture_discount": {
      title: "Captura Cupom - Oferta Relâmpago",
      hero: "🚨 70% OFF por TEMPO LIMITADO",
      subtitle: "Cupom exclusivo válido por 24h - Digite seu e-mail",
      formTitle: "Garanta seu desconto",
      cta: "Quero Meu Cupom 70% OFF",
      color: "from-emerald-500 to-green-500",
      icon: "🎫",
    },
    "product_vsl": {
      title: "Venda VSL - Produto Premium",
      hero: "O Curso que Transformou Minha Vida Financeira",
      subtitle: "R$497 → Apenas 12x de R$47 | Garantia de 7 dias",
      formTitle: "Garantir minha vaga",
      cta: "Quero Comprar Agora",
      color: "from-purple-600 to-pink-500",
      icon: "▶️",
    },
    "product_modern": {
      title: "Venda Moderna - SaaS Premium",
      hero: "Automatize suas Vendas em 5 Minutos",
      subtitle: "Plano Anual | Cancelamento quando quiser | Resultados imediatos",
      formTitle: "Começar teste grátis",
      cta: "Ativar Plano Anual",
      color: "from-slate-500 to-blue-500",
      icon: "⚡",
    },
    "product_classic": {
      title: "Carta de Vendas - Lançamento Quente",
      hero: "Como Faturei R$1,2M em 90 Dias (Sem Sorte)",
      subtitle: "Método passo a passo revelado | 97% de satisfação",
      formTitle: "Acessar método completo",
      cta: "Quero o Método Completo",
      color: "from-amber-500 to-orange-500",
      icon: "📘",
    },
    "upsell_offer": {
      title: "Upsell Automático - Oferta Extra",
      hero: "🎁 Bônus Exclusivo: +R$3k/mês Garantidos",
      subtitle: "Apenas R$97 (valor real R$497) | Aceita?",
      formTitle: "Adicionar bônus ao carrinho",
      cta: "Sim, Quero o Bônus!",
      color: "from-green-500 to-emerald-500",
      icon: "➡️",
    },
    "downsell_discount": {
      title: "Downsell - Recuperação de Venda",
      hero: "Não Pode Ir Embora! 50% OFF Final",
      subtitle: "Última chance: curso completo por R$197 (era R$497)",
      formTitle: "Confirmar compra com desconto",
      cta: "Sim, Aceito 50% OFF",
      color: "from-yellow-500 to-orange-500",
      icon: "💰",
    },
    "thankyou_page": {
      title: "Página Obrigado - Pós-Venda",
      hero: "✅ Compra Confirmada!",
      subtitle: "Acesso liberado em 3 minutos | Verifique seu e-mail",
      formTitle: "O que achou da compra?",
      cta: "Deixar Feedback",
      color: "from-emerald-500 to-teal-500",
      icon: "✅",
    },
  };

  const template = templates[templateId as keyof typeof templates] || templates.capture_ebook;

  return (
    <>
      <Helmet>
        <title>{template.title} | Preview Completo</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* HEADER FUNCIONAL */}
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-12">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à galeria
            </Button>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/dashboard/projetos?criar=true', '_blank')}
                className="flex items-center gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Novo projeto
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 shadow-lg hover:shadow-xl"
                onClick={() => window.open(`/dashboard/projetos?template=${templateId}`, '_blank')}
              >
                Usar este template
              </Button>
            </div>
          </div>
        </div>

        {/* PREVIEW ÚNICO POR TEMPLATE */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 max-w-2xl mx-auto">
            {/* HEADER ÚNICO */}
            <div className={`bg-gradient-to-r ${template.color} text-white p-12 text-center relative overflow-hidden`}>
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold">
                {template.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{template.hero}</h1>
              <p className="text-xl md:text-2xl mb-12 opacity-95">{template.subtitle}</p>
            </div>

            {/* FORM ULTRA-REALISTA */}
            <div className="p-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">{template.formTitle}</h3>
                
                <div className="space-y-4">
                  <input 
                    className="w-full p-5 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50 text-lg placeholder-slate-500 transition-all duration-300 shadow-sm" 
                    placeholder="Digite seu melhor e-mail" 
                  />
                  <input 
                    className="w-full p-5 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50 text-lg placeholder-slate-500 transition-all duration-300 shadow-sm" 
                    placeholder="Nome completo (opcional)" 
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-7 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
                  <Play className="w-6 h-6 mr-3" />
                  {template.cta} →
                </Button>

                <div className="flex items-center justify-center gap-3 text-xs text-slate-600 mt-6">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Acesso imediato</span>
                  <span>•</span>
                  <span>Sem spam</span>
                  <span>•</span>
                  <span>Cancelar quando quiser</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
