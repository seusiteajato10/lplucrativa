import React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TemplatePreview = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId") || "capture_ebook";

  const templates = {
    capture_ebook: {
      title: "Captura E-book - Ebook Gratuito",
      hero: "Descubra os 5 Segredos do Marketing Digital",
      subtitle: "Baixe agora o guia completo GRATUITO",
      formTitle: "Cadastre-se para receber",
      cta: "Quero o E-book Grátis",
    },
    capture_vsl: {
      title: "Captura VSL - Aula ao Vivo",
      hero: "Aula Exclusiva: Multiplique suas Vendas",
      subtitle: "Inscreva-se AGORA - Vagas Limitadas",
      formTitle: "Reserve sua vaga gratuita",
      cta: "Quero Assistir Agora",
    },
    // ... outros templates
  };

  const template = templates[templateId as keyof typeof templates] || templates.capture_ebook;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Helmet>
        <title>{template.title} | Preview</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" size="sm" className="hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à galeria
          </Button>
          <div className="ml-auto">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Usar este template
            </Button>
          </div>
        </div>

        {/* PREVIEW REAL */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
          <div className="p-12 text-center">
            <h1 className="text-5xl font-black text-slate-900 mb-6">{template.hero}</h1>
            <p className="text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">{template.subtitle}</p>
            
            <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-6">{template.formTitle}</h3>
              <div className="space-y-4 mb-8">
                <input className="w-full p-4 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500" 
                       placeholder="Digite seu melhor e-mail" />
                <input className="w-full p-4 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500" 
                       placeholder="Nome completo" />
              </div>
              <Button className="w-full bg-white text-indigo-600 font-bold py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                {template.cta}
              </Button>
              <p className="text-xs text-white/80 mt-4 text-center">
                ✅ Acesso imediato | Sem spam | Cancelar quando quiser
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
