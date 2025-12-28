import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutTemplate, 
  MousePointer2, 
  ShoppingCart, 
  Shield, 
  Zap, 
  ArrowRight 
} from "react-icons/lu";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* HERO - COM BOTÃO TEMPLATES (PASSO 4) */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
            Crie Landing Pages
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text">
              que Convertem
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Templates profissionais, editor visual drag-and-drop e integração completa com WhatsApp, Hotmart e Stripe.
          </p>
          {/* HERO CTAs - PASSO 4 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link 
              to="/signup"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              Começar Grátis
              <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/templates/galeria" 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary bg-transparent rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg shadow-xl hover:shadow-primary/25"
            >
              <LayoutTemplate className="w-5 h-5" />
              Ver Templates
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO TEMPLATES */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Templates Profissionais Inclusos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            Escolha entre dezenas de layouts otimizados para conversão. Veja todos antes de decidir.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link to="/templates/galeria" className="group">
              <div className="h-64 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-transparent group-hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <MousePointer2 className="w-20 h-20 text-blue-500/80 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Páginas de Captura</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Colete leads com conversão comprovada</p>
                <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full font-semibold group-hover:bg-blue-500/30 transition-colors">
                  Ver Modelos →
                </span>
              </div>
            </Link>
            
            <Link to="/templates/galeria" className="group">
              <div className="h-64 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-transparent group-hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
                <ShoppingCart className="w-20 h-20 text-emerald-500/80 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Páginas de Vendas</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Estruturas testadas para vender mais</p>
                <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full font-semibold group-hover:bg-emerald-500/30 transition-colors">
                  Ver Modelos →
                </span>
              </div>
            </Link>
            
            <Link to="/templates/galeria" className="group">
              <div className="h-64 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-transparent group-hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                <LayoutTemplate className="w-20 h-20 text-orange-500/80 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Mais Modelos</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Upsell, thank you, funis completos</p>
                <span className="text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full font-semibold group-hover:bg-orange-500/30 transition-colors">
                  Ver Todos →
                </span>
              </div>
            </Link>
          </div>
          
          <Link 
            to="/templates/galeria" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-gray-900/25 transition-all duration-300"
          >
            <LayoutTemplate className="w-6 h-6" />
            Explorar Galeria Completa
            <span className="ml-2 text-sm font-normal opacity-90">(Sem compromisso)</span>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-gradient-to-t from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Pronto para converter mais?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Milhares de empreendedores já usam nossa plataforma.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all">
              Começar Grátis
            </Link>
            <Link to="/templates/galeria" className="border-2 border-white text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white hover:text-gray-900 transition-all shadow-xl hover:shadow-white/50">
              Ver Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
