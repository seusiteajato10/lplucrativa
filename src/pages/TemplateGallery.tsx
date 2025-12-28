import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MousePointer2,
  ShoppingCart,
  Repeat,
  ArrowRight,
} from "lucide-react";

const TemplateGallery: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Seus Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Seus Templates
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Prontos para usar
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
              Templates que já existem no seu projeto
            </p>
          </div>
        </section>

        <section className="px-6 pb-32 max-w-7xl mx-auto space-y-24">
          {/* CAPTURA */}
          <div>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <MousePointer2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900">Captura de Leads</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/dashboard" className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-4">ProductTemplate</h3>
                <p className="text-slate-600 mb-6 flex-1">Página de captura existente</p>
                <Button className="w-full mt-auto">Abrir Template</Button>
              </Link>
              <Link to="/dashboard" className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-4">ProductTemplateVSL</h3>
                <p className="text-slate-600 mb-6 flex-1">Página VSL existente</p>
                <Button className="w-full mt-auto">Abrir Template</Button>
              </Link>
            </div>
          </div>

          {/* VENDAS */}
          <div>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900">Páginas de Vendas</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/dashboard" className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-4">UpsellPage</h3>
                <p className="text-slate-600 mb-6 flex-1">Página upsell existente</p>
                <Button className="w-full mt-auto">Abrir Template</Button>
              </Link>
              <Link to="/dashboard" className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-4">DownsellPage</h3>
                <p className="text-slate-600 mb-6 flex-1">Página downsell existente</p>
                <Button className="w-full mt-auto">Abrir Template</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TemplateGallery;
