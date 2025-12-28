import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const openPreview = (image: string, name: string) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const templates = [
    { 
      name: "ProductTemplate", 
      category: "Captura", 
      thumb: "https://via.placeholder.com/400x250/2563eb/ffffff?text=🚀+ProductTemplate",
      preview: "https://via.placeholder.com/1200x700/2563eb/ffffff?text=ProductTemplate%0A%0APágina+de+Captura%0ASimples+e+Eficaz%0A%0AFormulário+Otimizado%0ADepoimentos+Reais%0ACTA+Irresistível",
      description: "Página simples de captura com formulário otimizado"
    },
    { 
      name: "ProductTemplateVSL", 
      category: "Captura", 
      thumb: "https://via.placeholder.com/400x250/dc2626/ffffff?text=🎥+VSL+Template",
      preview: "https://via.placeholder.com/1200x700/dc2626/ffffff?text=ProductTemplateVSL%0A%0AVídeo+Persuasivo%0A%2B+Captura%0A%0APlayer+de+Vídeo%0AFormulário+Otimizado%0AConversão+Máxima",
      description: "Página VSL com player de vídeo + formulário"
    },
    { 
      name: "ThankYouPage", 
      category: "Venda", 
      thumb: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=✅+ThankYou",
      preview: "https://via.placeholder.com/1200x700/7c3aed/ffffff?text=ThankYouPage%0A%0APágina+de+Obrigado%0APós-Compra%0A%0AConfirmação+de+Pagamento%0APróximos+Passos%0AUpsell+Automático",
      description: "Página de agradecimento pós-venda"
    },
    { 
      name: "UpsellPage", 
      category: "Upsell", 
      thumb: "https://via.placeholder.com/400x250/059669/ffffff?text=💎+Upsell",
      preview: "https://via.placeholder.com/1200x700/059669/ffffff?text=UpsellPage%0A%0AOferta+Irresistível%0APós-Venda%0A%0A%2BR%2497%0ASó+Agora%0AAumenta+Ticket+Médio",
      description: "Página upsell automático pós-venda"
    },
    { 
      name: "DownsellPage", 
      category: "Downsell", 
      thumb: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=🔥+Downsell",
      preview: "https://via.placeholder.com/1200x700/f59e0b/ffffff?text=DownsellPage%0A%0AÚltima+Chance%0AR%2447%0A%0ARecuperação+de+Carrinho%0ADesconto+Especial%0AConversão+Final",
      description: "Página downsell com oferta de recuperação"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* HEADER */}
        <section className="pt-32 pb-24 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Galeria de 
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2">
              Templates Profissionais
            </span>
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
            Clique nos templates para ver preview completo
          </p>
        </section>

        {/* GALERIA */}
        <section className="px-8 max-w-7xl mx-auto pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {templates.map((template) => (
              <div 
                key={template.name}
                className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 hover:border-indigo-300 transition-all duration-700 cursor-pointer h-full"
                onClick={() => openPreview(template.preview, template.name)}
              >
                {/* THUMBNAIL */}
                <div className="h-72 rounded-2xl overflow-hidden mb-8 shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src={template.thumb} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* INFO */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{template.name}</h3>
                    <p className="text-slate-600 text-lg">{template.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4">
                    <div className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-xl text-center hover:shadow-xl hover:-translate-y-1 transition-all group-hover:scale-105">
                      Ver Preview →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL PREVIEW */}
        {showPreview && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setShowPreview(false)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-auto relative mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-8 right-8 z-10 bg-white/90 hover:bg-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all w-16 h-16 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* PREVIEW IMAGE */}
              <div className="p-12 pt-32">
                <img 
                  src={previewImage} 
                  alt="Template Preview"
                  className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto block"
                />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Gostou dos templates?</h2>
          <a 
            href="#/dashboard/projetos?criar=true"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-16 py-7 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            Criar Minha Landing Page →
          </a>
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
