import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const openPreview = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const templates = [
    {
      name: "ProductTemplate",
      category: "Páginas de Captura",
      thumb: "https://via.placeholder.com/400x250/1e40af/ffffff?text=ProductTemplate",
      preview: "https://via.placeholder.com/1200x800/1e40af/ffffff?text=PRODUCT+TEMPLATE%0A%0AP%C3%A1gina+de+Captura%0ASimples+e+Eficaz%0A%0A%E2%9C%94+Formul%C3%A1rio%0A%E2%9C%94+Depoimentos%0A%E2%9C%94+Pre%C3%A7o+R$197",
      description: "Página simples de captura"
    },
    {
      name: "ProductTemplateVSL", 
      category: "Páginas de Captura",
      thumb: "https://via.placeholder.com/400x250/dc2626/ffffff?text=VSL+Template",
      preview: "https://via.placeholder.com/1200x800/dc2626/ffffff?text=VSL+TEMPLATE%0A%0AV%C3%ADdeo+Persuasivo%0A%2B+Captura%0A%0A%E2%9C%94+Player+de+V%C3%ADdeo%0A%E2%9C%94+Formul%C3%A1rio%0A%E2%9C%94+Alta+Convers%C3%A3o",
      description: "Página VSL com vídeo"
    },
    {
      name: "ThankYouPage",
      category: "Páginas de Venda", 
      thumb: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=Obrigado",
      preview: "https://via.placeholder.com/1200x800/7c3aed/ffffff?text=THANK+YOU+PAGE%0A%0AP%C3%A1gina+de+Obrigado%0AP%C3%B3s-Compra%0A%0A%E2%9C%94+Confirma%C3%A7%C3%A3o%0A%E2%9C%94+Pr%C3%B3ximos+Passos%0A%E2%9C%94+Upsell",
      description: "Página de agradecimento"
    },
    {
      name: "UpsellPage",
      category: "Upsell",
      thumb: "https://via.placeholder.com/400x250/059669/ffffff?text=Upsell",
      preview: "https://via.placeholder.com/1200x800/059669/ffffff?text=UPSELL+PAGE%0A%0AOferta+Irresist%C3%ADvel%0A%2BR$97+S%C3%B3+Agora%0A%0A%E2%9C%94+Aumenta+Ticket%0A%E2%9C%94+Autom%C3%A1tico%0A%E2%9C%94+67%25+Convers%C3%A3o",
      description: "Página upsell automático"
    },
    {
      name: "DownsellPage",
      category: "Downsell",
      thumb: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Downsell",
      preview: "https://via.placeholder.com/1200x800/f59e0b/ffffff?text=DOWNSELL+PAGE%0A%0A%C3%9Altima+Chance%0AR$47+Desconto%0A%0A%E2%9C%94+Recupera+Carrinho%0A%E2%9C%94+Convers%C3%A3o+Final%0A%E2%9C%94+Alta+Taxa",
      description: "Página de recuperação"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Header */}
        <section className="pt-24 pb-20 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            Galeria de Templates
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
            Clique para ver preview completo do template
          </p>
        </section>

        {/* Grid */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.name}
                className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 hover:border-blue-300 transition-all duration-500 cursor-pointer h-full"
                onClick={() => openPreview(template.preview)}
              >
                <div className="h-64 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all">
                  <img
                    src={template.thumb}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900">{template.name}</h3>
                  <p className="text-slate-600 text-lg">{template.category}</p>
                  <p className="text-slate-500 text-sm">{template.description}</p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all group-hover:scale-105">
                    Ver Preview →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {showPreview && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setShowPreview(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all z-10"
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl mx-auto block p-8"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateGallery;
