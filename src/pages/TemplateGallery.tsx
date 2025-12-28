import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);

  const templates = [
    {
      name: "ProductTemplate",
      title: "Captura Simples",
      description: "Página de captura com formulário otimizado, depoimentos e CTA irresistível"
    },
    {
      name: "ProductTemplateVSL", 
      title: "VSL + Captura",
      description: "Player de vídeo persuasivo + formulário de alta conversão"
    },
    {
      name: "ThankYouPage",
      title: "Página Obrigado",
      description: "Confirmação de compra + próximos passos + upsell automático"
    },
    {
      name: "UpsellPage",
      title: "Upsell Automático",
      description: "Oferta irresistível pós-venda que aumenta ticket médio"
    },
    {
      name: "DownsellPage",
      title: "Downsell Desconto",
      description: "Recuperação de carrinho com oferta final de conversão"
    }
  ];

  const colors = ['from-blue-500 to-blue-600', 'from-red-500 to-red-600', 'from-purple-500 to-purple-600', 'from-emerald-500 to-emerald-600', 'from-orange-500 to-orange-600'];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* HEADER */}
        <section className="pt-24 pb-20 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Galeria de 
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Templates Profissionais
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Clique nos cards para ver preview do template
          </p>
        </section>

        {/* GALERIA */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div
                key={template.name}
                className="group bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-4 hover:border-indigo-300 transition-all duration-500 cursor-pointer h-full"
                onClick={() => {
                  setActiveTemplate(index);
                  setShowPreview(true);
                }}
              >
                <div className={`h-72 rounded-2xl mb-8 overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500 bg-gradient-to-br ${colors[index]}`}>
                  <div className="h-full flex flex-col items-center justify-center text-white p-8 text-center">
                    <div className="text-5xl mb-6">🎨</div>
                    <div className="text-2xl font-black mb-4">{template.name}</div>
                    <div className="text-lg font-semibold">{template.title}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-black text-2xl text-slate-900">{template.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{template.description}</p>
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
                      Ver Preview →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL */}
        {showPreview && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
            onClick={() => setShowPreview(false)}
          >
            <div 
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative mx-auto border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER MODAL */}
              <div className="sticky top-0 bg-white/100 z-10 border-b border-slate-200 p-8 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">{templates[activeTemplate].name}</h2>
                    <p className="text-xl text-slate-600 mt-2">{templates[activeTemplate].title}</p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="bg-slate-100 hover:bg-slate-200 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="p-12">
                <div className={`w-full h-96 rounded-3xl shadow-2xl bg-gradient-to-br ${colors[activeTemplate]} flex flex-col items-center justify-center text-white p-12 text-center`}>
                  <div className="text-6xl mb-8">📱</div>
                  <div className="text-4xl font-black mb-6">{templates[activeTemplate].name}</div>
                  <div className="text-2xl font-bold mb-8 max-w-2xl leading-relaxed">
                    {templates[activeTemplate].description}
                  </div>
                  <div className="bg-white/20 backdrop-blur-xl px-12 py-6 rounded-3xl">
                    <div className="text-3xl font-black">READY TO USE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Comece agora mesmo</h2>
          <a href="#/dashboard/projetos?criar=true" className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-16 py-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all">
            Criar Landing Page →
          </a>
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
