import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, CheckCircle, ChevronRight } from "lucide-react";

const TemplatePreview = () => {
  const { templateId = "capture_ebook" } = useParams();
  const navigate = useNavigate();

  const templates = {
    capture_ebook: {
      title: "Captura E-book - Ebook Gratuito",
      hero: "Descubra os 5 Segredos do Marketing Digital",
      subtitle: "Baixe agora o guia completo GRATUITO que ja ajudou +10k empreendedores",
      formTitle: "Cadastre-se para receber",
      cta: "Quero o E-book Gratis",
      color: "from-indigo-500 to-purple-500",
      icon: "Livro",
      type: "form",
    },
    capture_vsl: {
      title: "Captura VSL - Aula ao Vivo",
      hero: "Aula Exclusiva: Multiplique suas Vendas em 30 Dias",
      subtitle: "Inscreva-se AGORA - Vagas Limitadas (so 500 disponiveis)",
      formTitle: "Reserve sua vaga gratuita",
      cta: "Quero Assistir Agora",
      color: "from-blue-500 to-cyan-500",
      icon: "Video",
      type: "form",
    },
    capture_quiz: {
      title: "Captura Quiz - Diagnostico Personalizado",
      hero: "Descubra seu Perfil de Conversao em 60 Segundos",
      subtitle: "Responda 5 perguntas e receba seu relatorio GRATUITO",
      color: "from-orange-500 to-red-500",
      icon: "Quiz",
      type: "quiz",
      questions: [
        "Qual seu maior desafio hoje?",
        "Quantas leads voce captura por dia?",
        "Qual seu ticket medio atual?",
        "Voce usa automacao de e-mails?",
        "Qual seu objetivo principal este mes?",
      ],
    },
    capture_discount: {
      title: "Captura Cupom - Oferta Relâmpago",
      hero: "70% OFF por TEMPO LIMITADO",
      subtitle: "Cupom exclusivo valido por 24h - Digite seu e-mail",
      formTitle: "Garanta seu desconto",
      cta: "Quero Meu Cupom 70% OFF",
      color: "from-emerald-500 to-green-500",
      icon: "Cupom",
      type: "form",
    },
    product_vsl: {
      title: "Venda VSL - Produto Premium",
      hero: "O Curso que Transformou Minha Vida Financeira",
      subtitle: "R$497 -> Apenas 12x de R$47 | Garantia de 7 dias",
      formTitle: "Garantir minha vaga",
      cta: "Quero Comprar Agora",
      color: "from-purple-600 to-pink-500",
      icon: "Video",
      type: "form",
    },
    product_modern: {
      title: "Venda Moderna - SaaS Premium",
      hero: "Automatize suas Vendas em 5 Minutos",
      subtitle: "Plano Anual | Cancelamento quando quiser | Resultados imediatos",
      formTitle: "Comecar teste gratis",
      cta: "Ativar Plano Anual",
      color: "from-slate-500 to-blue-500",
      icon: "SaaS",
      type: "form",
    },
    product_classic: {
      title: "Carta de Vendas - Lancamento Quente",
      hero: "Como Faturei R$1,2M em 90 Dias (Sem Sorte)",
      subtitle: "Metodo passo a passo revelado | 97% de satisfacao",
      formTitle: "Acessar metodo completo",
      cta: "Quero o Metodo Completo",
      color: "from-amber-500 to-orange-500",
      icon: "Livro",
      type: "form",
    },
    upsell_offer: {
      title: "Upsell Automatico - Oferta Extra",
      hero: "Bonus Exclusivo: +R$3k/mes Garantidos",
      subtitle: "Apenas R$97 (valor real R$497) | Aceita?",
      formTitle: "Adicionar bonus ao carrinho",
      cta: "Sim, Quero o Bonus!",
      color: "from-green-500 to-emerald-500",
      icon: "Upsell",
      type: "form",
    },
    downsell_discount: {
      title: "Downsell - Recuperacao de Venda",
      hero: "Nao Pode Ir Embora! 50% OFF Final",
      subtitle: "Ultima chance: curso completo por R$197 (era R$497)",
      formTitle: "Confirmar compra com desconto",
      cta: "Sim, Aceito 50% OFF",
      color: "from-yellow-500 to-orange-500",
      icon: "Downsell",
      type: "form",
    },
    thankyou_page: {
      title: "Pagina Obrigado - Pos-Venda",
      hero: "Compra Confirmada!",
      subtitle: "Acesso liberado em 3 minutos | Verifique seu e-mail",
      formTitle: "O que achou da compra?",
      cta: "Deixar Feedback",
      color: "from-emerald-500 to-teal-500",
      icon: "Confirmado",
      type: "form",
    },
  };

  const template = templates[templateId as keyof typeof templates] || templates.capture_ebook;

  return (
    <>
      <Helmet>
        <title>{template.title} | Preview Completo</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-12">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar a galeria
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
                onClick={() => window.open('/dashboard/projetos?template=' + templateId, '_blank')}
              >
                Usar este template
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 max-w-2xl mx-auto">
            <div className={`bg-gradient-to-r ${template.color} text-white p-12 text-center relative overflow-hidden`}>
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold">
                {template.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{template.hero}</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">{template.subtitle}</p>
            </div>

            {template.type === "quiz" ? (
              <div className="p-12">
                <div className="space-y-6 max-w-lg mx-auto">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">Responda as 5 perguntas:</h3>
                  
                  {template.questions.map((question, index) => (
                    <div key={index} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 hover:border-orange-300 transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">{question}</h4>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <label className="flex items-center p-3 bg-white rounded-xl border border-slate-200 hover:border-orange-400 cursor-pointer hover:shadow-md transition-all">
                          <input type="radio" className="mr-3 w-4 h-4 text-orange-500" />
                          <span>Opcao A</span>
                        </label>
                        <label className="flex items-center p-3 bg-white rounded-xl border border-slate-200 hover:border-orange-400 cursor-pointer hover:shadow-md transition-all">
                          <input type="radio" className="mr-3 w-4 h-4 text-orange-500" />
                          <span>Opcao B</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-6 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 mt-8">
                    <ChevronRight className="w-6 h-6 mr-3" />
                    Ver Meu Diagnostico Completo
                  </Button>
                </div>
              </div>
            ) : (
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
                    {template.cta}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
