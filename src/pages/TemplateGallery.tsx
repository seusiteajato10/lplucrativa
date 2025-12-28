import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery: React.FC = () => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const templates = [
    {
      category: "Páginas de Captura",
      name: "ProductTemplate",
      description: "Página simples de captura com formulário",
      preview: "https://via.placeholder.com/1200x700/4F46E5/FFFFFF?text=ProductTemplate%0ACaptura+Simples"
    },
    {
      category: "Páginas de Captura",
      name: "ProductTemplateVSL",
      description: "Página VSL com vídeo player",
      preview: "https://via.placeholder.com/1200x700/EF4444/FFFFFF?text=ProductTemplateVSL%0AVSL+%2B+Captura"
    },
    {
      category: "Páginas de Venda",
      name: "ThankYouPage",
      description: "Página de agradecimento pós-venda",
      preview: "https://via.placeholder.com/1200x700/8B5CF6/FFFFFF?text=ThankYouPage%0APágina+Obrigado"
    },
    {
      category: "Upsell",
      name: "UpsellPage",
      description: "Página upsell automático",
      preview: "https://via.placeholder.com/1200x700/10B981/FFFFFF?text=UpsellPage%0AOferta+Extra"
    },
    {
      category: "Downsell",
      name: "DownsellPage",
      description: "Página downsell com desconto",
      preview: "https://via.placeholder.com/1200x700/F59E0B/FFFFFF?text=DownsellPage%0AÚltima+Chance"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* HEADER */}
        <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Escolha seu 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                template perfeito
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Templates profissionais para landing pages de alta conversão
            </p>
          </div>
        </section>

        {/* GALERIA */}
        <section className="px-6 pb-24 max-w-7xl mx-auto space-y-24">
          {["Páginas de Captura", "Páginas de Venda", "Upsell", "Downsell"].map((category) => {
            const categoryTemplates = templates.filter(t => t.category === category);
            if (categoryTemplates.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TL</span>
                  </div>
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryTemplates.map((template) => (
                    <div 
                      key={template.name}
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full"
                      onClick={() => setSelectedPreview(template.preview)}
                    >
                      <div className="h-64 overflow-hidden bg-slate-50">
                        <img 
                          src={template.preview} 
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-xl text-slate-900">{template.name}</h3>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            Novo
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">{template.description}</p>
                        
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-center hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer group-hover:shadow-lg">
                            Ver Preview
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* MODAL PREVIEW */}
        {selectedPreview && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedPreview(null)}
          >
            <div className="max-w-5xl w-full max-h-[90vh] mx-auto" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-8 right-8 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all text-slate-600 hover:text-slate-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={selectedPreview} 
                alt="Template Preview"
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Pronto para começar?</h2>
          <a 
            href="#/dashboard/projetos?criar=true"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            Criar Minha Landing Page →
          </a>
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
  