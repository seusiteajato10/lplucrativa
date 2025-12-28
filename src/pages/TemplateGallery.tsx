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
            Clique em "Ver Demo" para ver o template completo funcionando
          </p>
        </section>

        {/* TEMPLATES - CAPTURA */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6 flex items-center gap-4">
              <span className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                1
              </span>
              Captura de Leads
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* ProductTemplate */}
              <div className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl mb-6 overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="h-full bg-gradient-to-b from-white via-blue-50 to-indigo-100 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">🚀 ProductTemplate</h3>
                      <p className="text-slate-600 text-sm">Página de captura simples e eficaz</p>
                    </div>
                    <div className="text-center py-4 bg-white/50 rounded-xl">
                      <div className="text-4xl font-bold text-indigo-600">R$197</div>
                      <div className="text-sm text-slate-500">por mês</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-slate-900">Captura Produto</h4>
                  <p className="text-slate-600 text-sm">Formulário clean + depoimentos + CTA forte</p>
                  <a href="#/dashboard/projetos?criar=true&template=ProductTemplate" target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all group-hover:-translate-x-2 block">
                    Ver Demo Completa →
                  </a>
                </div>
              </div>

              {/* ProductTemplateVSL */}
              <div className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-64 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl mb-6 overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="h-full bg-gradient-to-b from-white via-purple-50 to-pink-100 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">🎥 ProductTemplateVSL</h3>
                      <p className="text-slate-600 text-sm">Vídeo persuasivo + captura</p>
                    </div>
                    <div className="text-center py-4 bg-white/50 rounded-xl">
                      <div className="text-4xl font-bold text-purple-600">ASSISTA</div>
                      <div className="text-sm text-slate-500">Vídeo agora</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-slate-900">Captura VSL</h4>
                  <p className="text-slate-600 text-sm">Player de vídeo + formulário otimizado</p>
                  <a href="#/dashboard/projetos?criar=true&template=ProductTemplateVSL" target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all group-hover:-translate-x-2 block">
                    Ver Demo Completa →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* TEMPLATES - VENDAS */}
          <div className="mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6 flex items-center gap-4">
              <span className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                2
              </span>
              Páginas de Vendas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* UpsellPage */}
              <div className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-64 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl mb-6 overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="h-full p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">💰 UpsellPage</h3>
                      <p className="text-slate-600 text-sm">Oferta irresistível pós-venda</p>
                    </div>
                    <div className="text-center py-4 bg-white rounded-xl shadow-md">
                      <div className="text-4xl font-bold text-emerald-600">+R$97</div>
                      <div className="text-sm text-slate-500">só agora</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-slate-900">Upsell Automático</h4>
                  <p className="text-slate-600 text-sm">Aumenta ticket médio automaticamente</p>
                  <a href="#/dashboard/projetos?criar=true&template=UpsellPage" target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all group-hover:-translate-x-2 block">
                    Ver Demo Completa →
                  </a>
                </div>
              </div>

              {/* DownsellPage */}
              <div className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 h-full">
                <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl mb-6 overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="h-full p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">🔥 DownsellPage</h3>
                      <p className="text-slate-600 text-sm">Recupera vendas perdidas</p>
                    </div>
                    <div className="text-center py-4 bg-white rounded-xl shadow-md">
                      <div className="text-4xl font-bold text-orange-600">APENAS R$47</div>
                      <div className="text-sm text-slate-500">última chance</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-slate-900">Downsell Desconto</h4>
                  <p className="text-slate-600 text-sm">Oferta de recuperação de carrinho</p>
                  <a href="#/dashboard/projetos?criar=true&template=DownsellPage" target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all group-hover:-translate-x-2 block">
                    Ver Demo Completa →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="text-center py-24">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Gostou dos templates?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Comece agora mesmo criando sua primeira landing page</p>
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
