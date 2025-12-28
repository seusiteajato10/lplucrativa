import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const templates = [
    { name: "ProductTemplate", category: "Captura", color: "#4F46E5", text: "Captura Simples" },
    { name: "ProductTemplateVSL", category: "Captura", color: "#EF4444", text: "VSL + Captura" },
    { name: "ThankYouPage", category: "Venda", color: "#8B5CF6", text: "Página Obrigado" },
    { name: "UpsellPage", category: "Upsell", color: "#10B981", text: "Oferta Extra" },
    { name: "DownsellPage", category: "Downsell", color: "#F59E0B", text: "Última Chance" }
  ];

  const openPreview = (image: string) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  return (
    <>
      <Helmet>
        <title>Galeria de Templates</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center py-24">
            <h1 className="text-6xl font-black text-slate-900 mb-6">Galeria de Templates</h1>
            <p className="text-2xl text-slate-600">Clique para ver preview</p>
          </div>

          {/* TEMPLATES */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div 
                key={template.name}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border-4 border-white hover:border-indigo-300 h-full"
                onClick={() => openPreview(`https://via.placeholder.com/1000x600/${template.color.slice(1)}/FFFFFF?text=${template.name}%0A${template.text}`)}
              >
                <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:scale-105 transition-all duration-500">
                  <img 
                    src={`https://via.placeholder.com/400x250/${template.color.slice(1)}/FFFFFF?text=${template.name}`} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-600">{template.category}</p>
              </div>
            ))}
          </div>

          {/* MODAL */}
          {showPreview && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
              onClick={() => setShowPreview(false)}
            >
              <div 
                className="max-w-4xl w-full max-h-[90vh] mx-auto rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-6 right-6 z-10 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all"
                >
                  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img src={previewImage} alt="Preview" className="w-full h-auto max-h-[90vh] object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateGallery;
