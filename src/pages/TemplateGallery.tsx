import React from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const templates = [
    {
      category: "Páginas de Captura",
      name: "ProductTemplate",
      description: "Página simples de captura com formulário",
      preview: "https://via.placeholder.com/1200x700/4F46E5/FFFFFF?text=ProductTemplate\nCaptura+Simples"
    },
    {
      category: "Páginas de Captura",
      name: "ProductTemplateVSL", 
      description: "Página VSL com vídeo player",
      preview: "https://via.placeholder.com/1200x700/EF4444/FFFFFF?text=ProductTemplateVSL\nVSL+%2B+Captura"
    },
    {
      category: "Páginas de Venda",
      name: "ThankYouPage",
      description: "Página de agradecimento pós-venda",
      preview: "https://via.placeholder.com/1200x700/8B5CF6/FFFFFF?text=ThankYouPage\nObrigado"
    },
    {
      category: "Upsell",
      name: "UpsellPage",
      description: "Página upsell automático",
      preview: "https://via.placeholder.com/1200x700/10B981/FFFFFF?text=UpsellPage\nOferta+Extra"
    },
    {
      category: "Downsell",
      name: "DownsellPage",
      description: "Página downsell com desconto",
      preview: "https://via.placeholder.com/1200x700/F59E0B/FFFFFF?text=DownsellPage\nÚltima+Chance"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* HEADER WIX STYLE */}
        <section className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Escolha seu template
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-16">
              Templates profissionais para landing pages de alta conversão
            </p>
          </div>
        </section>

        {/* GALERIA WIX STYLE */}
        <section className="px-4 pb-24 max-w-7xl mx-auto space-y-20">
          {["Páginas de Captura", "Páginas de Venda", "Upsell", "Downsell"].map((category) => {
            const categoryTemplates = templates.filter(t => t.category === category);
            if (categoryTemplates.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TL</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 capitalize">{category}</h2>
                    <p className="text-lg text-slate-600 mt-2">Templates otimizados para conversão</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryTemplates.map((template) => (
                    <div 
                      key={template.name}
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                      onClick={() => setSelectedImage(template.preview)}
                    >
                      {/* THUMBNAIL */}
                      <div className="h-64 overflow-hidden bg-slate-50">
                        <img 
                          src={template.preview} 
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* INFO */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-xl text-slate-900">{template.name}</h3>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            Novo
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">{template.description}</p>
                        
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-center hover:from-indigo-700 hover:to-purple-700 transition-all group-hover:shadow-lg">
                            Ver Demo
                          </div>
                          <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4
