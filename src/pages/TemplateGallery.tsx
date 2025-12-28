import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Helmet>
        <title>Galeria de Templates</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-6xl font-black text-slate-900 mb-6">Templates</h1>
            <p className="text-xl text-slate-600">Clique para preview</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* ProductTemplate */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-400 h-full" onClick={() => setShowPreview(true)}>
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <div className="text-2xl font-bold">ProductTemplate</div>
                  <div className="text-lg">Captura Simples</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">ProductTemplate</h3>
              <p className="text-slate-600">Página de captura simples</p>
            </div>

            {/* ProductTemplateVSL */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-red-400 h-full" onClick={() => setShowPreview(true)}>
              <div className="h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎥</div>
                  <div className="text-2xl font-bold">ProductTemplateVSL</div>
                  <div className="text-lg">VSL + Captura</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">ProductTemplateVSL</h3>
              <p className="text-slate-600">Vídeo persuasivo + form</p>
            </div>

            {/* ThankYouPage */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-purple-400 h-full" onClick={() => setShowPreview(true)}>
              <div className="h-64 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text
