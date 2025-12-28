import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [selectedPreview, setSelectedPreview] = useState(null);

  const templates = [
    {
      category: "Páginas de Captura",
      name: "ProductTemplate",
      description: "Página simples de captura com formulário",
      preview: "https://via.placeholder.com/900x600/4F46E5/FFFFFF?text=ProductTemplate\nCaptura+Simples"
    },
    {
      category: "Páginas de Captura",
      name: "ProductTemplateVSL",
      description: "Página VSL com vídeo player",
      preview: "https://via.placeholder.com/900x600/EF4444/FFFFFF?text=ProductTemplateVSL\nVSL+%2B+Captura"
    },
    {
      category: "Páginas de Venda",
      name: "ThankYouPage",
      description: "Página de agradecimento pós-venda",
      preview: "https://via.placeholder.com/900x600/8B5CF6/FFFFFF?text=ThankYouPage\nPágina+Obrigado"
    },
    {
      category: "Upsell",
      name: "UpsellPage",
      description: "Página upsell automático",
      preview: "https://via.placeholder.com/900x600/10B981/FFFFFF?text=UpsellPage\nOferta+Extra"
    },
    {
      category: "Downsell",
      name: "DownsellPage",
      description: "Página downsell com desconto",
      preview: "https://via.placeholder.com/900x600/F59E0B/FFFFFF?text=DownsellPage\nÚltima+Chance"
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
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          {["Páginas de Captura", "Páginas de Venda", "Upsell", "Downsell"].map((category) => {
            const categoryTemplates = templates.filter(t => t.category === category);
            if (!categoryTemplates.length) return null;

            return (
              <div key={category} className="mb-24">
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
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                      onClick={() => setSelectedPreview(template.preview)}
                    >
                      <div className="h-64 overflow-hidden bg-slate-50">
                        <img 
                          src={template.preview} 
                          alt={template.name}
                          className
