import React from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* HEADER */}
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Galeria de 
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Templates Profissionais
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed">
            Veja como ficam seus templates prontos para conversão
          </p>
        </section>

        {/* TEMPLATES - CAPTURA */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-12 flex items-center gap-4 justify-center">
              <span className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                1
              </span>
              <span>Captura de Leads</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* ProductTemplate - MOCKUP VISUAL */}
              <div className="group bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl mb-6 overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/80 to-indigo-100/50"></div>
                  <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 drop-shadow-lg">🚀 ProductTemplate</h3>
                      <p className="text-slate-700 font-semibold text-lg mb-6">Página de Captura Simples</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>Formulário otimizado
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>Depoimentos reais
                        </div>
                      </div>
                    </div>
                    <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border">
                      <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1">R$197</div>
                      <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">por mês</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-black text-2xl text-slate-900 mb-3">Captura Produto</h4>
                  <p className="text-slate-600 mb-6">Formulário clean + depoimentos + CTA irresistível</p>
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group-hover:scale-105">
                    ✅ Template Pronto
                  </div>
                </div>
              </div>

              {/* ProductTemplateVSL - MOCKUP VISUAL */}
              <div className="group bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-72 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl mb-6 overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/80 to-pink-100/50"></div>
                  <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 drop-shadow-lg">🎥 ProductTemplateVSL</h3>
                      <p className="text-slate-700 font-semibold text-lg mb-6">Vídeo Persuasivo + Captura</p>
                      <div className="w-full h-32 bg-black/20 rounded-xl flex items-center justify-center mb-4">
                        <div className="text-white text-2xl font-bold">▶️ PLAYER DE VÍDEO</div>
                      </div>
                    </div>
                    <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border">
                      <div className="text-3xl font-black text-purple-600 mb-1">ASSISTA AGORA</div>
                      <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Vídeo completo</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-black text-2xl text-slate-900 mb-3">Captura VSL</h4>
                  <p className="text-slate-600 mb-6">Player de vídeo + formulário otimizado para conversão</p>
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group-hover:scale-105">
                    ✅ Template Pronto
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="text-center py-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Pronto para começar?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Escolha seu template favorito e crie sua landing page agora</p>
            <a href="#/dashboard/projetos?criar=true" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              Criar Minha Landing Page →
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
