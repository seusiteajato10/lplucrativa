"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { X, LayoutTemplate } from 'lucide-react';

// IMPORTAÇÃO DOS COMPONENTES REAIS
import LeadCaptureDiscount from "@/components/templates/capture/LeadCaptureDiscount";
import LeadCaptureEbook from "@/components/templates/capture/LeadCaptureEbook";
import LeadCaptureVSL from "@/components/templates/capture/LeadCaptureVSL";
import LeadCaptureQuiz from "@/components/templates/capture/LeadCaptureQuiz";

import ProductTemplate from "@/components/templates/ProductTemplate";
import ProductTemplateVSL from "@/components/templates/ProductTemplateVSL";
import ProductTemplateModern from "@/components/templates/ProductTemplateModern";
import ProductTemplateClassic from "@/components/templates/ProductTemplateClassic";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import EventTemplate from "@/components/templates/EventTemplate";
import CourseTemplate from "@/components/templates/CourseTemplate";

import ProductUpsell from "@/components/templates/upsell/ProductUpsell";
import ServiceUpsell from "@/components/templates/upsell/ServiceUpsell";
import EventUpsell from "@/components/templates/upsell/EventUpsell";
import CourseUpsell from "@/components/templates/upsell/CourseUpsell";

import GenericDownsell from "@/components/templates/downsell/GenericDownsell";

import ProductThankYou from "@/components/templates/thankyou/ProductThankYou";
import ServiceThankYou from "@/components/templates/thankyou/ServiceThankYou";
import EventThankYou from "@/components/templates/thankyou/EventThankYou";
import CourseThankYou from "@/components/templates/thankyou/CourseThankYou";

const TemplateGallery = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Props padrão para o Preview Real
  const commonProps = {
    data: {},
    projectName: "Projeto Demo",
    projectId: "demo-id",
    userId: "demo-user",
    slug: "demo",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>

      {/* HEADER DA GALERIA */}
      <section className="bg-white pt-24 pb-12 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Escolha seu template favorito
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Explore nossa biblioteca de modelos reais. Clique para visualizar a demonstração ao vivo.
          </p>
        </div>
      </section>

      {/* GRID DE TEMPLATES */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CATEGORIA: CAPTURA */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-emerald-500 h-full" onClick={() => setSelectedTemplate('capture_discount')}>
            <div className="h-64 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🏷️</div>
                <div className="text-2xl font-bold">Captura com Cupom</div>
                <div className="text-lg">Alta Conversão</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Cupom de Desconto</h3>
            <p className="text-slate-600">Ideal para atrair clientes com ofertas imediatas e gatilhos de urgência.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-emerald-500 h-full" onClick={() => setSelectedTemplate('capture_ebook')}>
            <div className="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <div className="text-2xl font-bold">E-book / Isca</div>
                <div className="text-lg">Lead Magnet</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Isca Digital</h3>
            <p className="text-slate-600">Perfeito para entregar materiais ricos em troca do contato do lead.</p>
          </div>

          {/* CATEGORIA: VENDAS */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('product_default')}>
            <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🛍️</div>
                <div className="text-2xl font-bold">Produto Físico</div>
                <div className="text-lg">Venda Direta</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Venda Padrão</h3>
            <p className="text-slate-600">Página completa com prova social, benefícios e checkout integrado.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-pink-500 h-full" onClick={() => setSelectedTemplate('product_vsl')}>
            <div className="h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🎥</div>
                <div className="text-2xl font-bold">VSL / Vídeo</div>
                <div className="text-lg">Persuasão Máxima</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Página com VSL</h3>
            <p className="text-slate-600">Focada em converter através de uma narrativa de vídeo poderosa.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-slate-800 h-full" onClick={() => setSelectedTemplate('service_basic')}>
            <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <div className="text-2xl font-bold">Serviço / Consultoria</div>
                <div className="text-lg">Profissional</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Página de Serviço</h3>
            <p className="text-slate-600">Exponha sua expertise e agende clientes com facilidade.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-orange-500 h-full" onClick={() => setSelectedTemplate('course_basic')}>
            <div className="h-64 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🎓</div>
                <div className="text-2xl font-bold">Curso Online</div>
                <div className="text-lg">Infoprodutos</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Treinamento</h3>
            <p className="text-slate-600">Estrutura ideal para vender cursos, mentorias e workshops gravados.</p>
          </div>

          {/* CATEGORIA: UPSELL / DOWNSELL */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-amber-500 h-full" onClick={() => setSelectedTemplate('ProductUpsell')}>
            <div className="h-64 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <div className="text-2xl font-bold">Upsell de Produto</div>
                <div className="text-lg">Aumentar Ticket</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Oferta Especial</h3>
            <p className="text-slate-600">Aparece logo após a compra para oferecer um upgrade exclusivo.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-red-500 h-full" onClick={() => setSelectedTemplate('GenericDownsell')}>
            <div className="h-64 bg-gradient-to-br from-red-500 to-rose-700 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">📉</div>
                <div className="text-2xl font-bold">Downsell</div>
                <div className="text-lg">Recuperar Venda</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Opção Acessível</h3>
            <p className="text-slate-600">Oferta alternativa para não perder o cliente que recusou o upsell.</p>
          </div>

          {/* CATEGORIA: OBRIGADO */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-green-500 h-full" onClick={() => setSelectedTemplate('ProductThankYou')}>
            <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <div className="text-2xl font-bold">Página de Obrigado</div>
                <div className="text-lg">Confirmação</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso de Compra</h3>
            <p className="text-slate-600">Página final do funil com instruções de acesso e agradecimento.</p>
          </div>

        </div>
      </main>

      {/* SISTEMA DE PREVIEW (MODAL) - CORRIGIDO PARA EXIBIR COMPLETO */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-100 animate-in fade-in duration-300">
          {/* BARRA SUPERIOR DO PREVIEW */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <LayoutTemplate className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">Visualizando Template: {selectedTemplate}</span>
            </div>
            <button 
              onClick={() => setSelectedTemplate(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-slate-900" />
            </button>
          </div>

          {/* ÁREA DE RENDERIZAÇÃO REAL - CENTRALIZADA E COM SCROLL CORRETO */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center items-start">
            <div className="w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl my-8 relative overflow-visible">
              
              {/* RENDERS CONDICIONAIS DOS TEMPLATES REAIS */}
              {selectedTemplate === 'capture_discount' && <LeadCaptureDiscount {...commonProps} />}
              {selectedTemplate === 'capture_ebook' && <LeadCaptureEbook {...commonProps} />}
              {selectedTemplate === 'capture_vsl' && <LeadCaptureVSL {...commonProps} />}
              {selectedTemplate === 'capture_quiz' && <LeadCaptureQuiz {...commonProps} />}

              {selectedTemplate === 'product_default' && <ProductTemplate {...commonProps} />}
              {selectedTemplate === 'product_vsl' && <ProductTemplateVSL {...commonProps} />}
              {selectedTemplate === 'product_modern' && <ProductTemplateModern {...commonProps} />}
              {selectedTemplate === 'product_classic' && <ProductTemplateClassic {...commonProps} />}
              {selectedTemplate === 'service_basic' && <ServiceTemplate {...commonProps} />}
              {selectedTemplate === 'event_basic' && <EventTemplate {...commonProps} />}
              {selectedTemplate === 'course_basic' && <CourseTemplate {...commonProps} />}

              {selectedTemplate === 'ProductUpsell' && <ProductUpsell {...commonProps} />}
              {selectedTemplate === 'ServiceUpsell' && <ServiceUpsell {...commonProps} />}
              {selectedTemplate === 'EventUpsell' && <EventUpsell {...commonProps} />}
              {selectedTemplate === 'CourseUpsell' && <CourseUpsell {...commonProps} />}

              {selectedTemplate === 'GenericDownsell' && <GenericDownsell {...commonProps} />}

              {selectedTemplate === 'ProductThankYou' && <ProductThankYou {...commonProps} />}
              {selectedTemplate === 'ServiceThankYou' && <ServiceThankYou {...commonProps} />}
              {selectedTemplate === 'EventThankYou' && <EventThankYou {...commonProps} />}
              {selectedTemplate === 'CourseThankYou' && <CourseThankYou {...commonProps} />}

            </div>
          </div>
        </div>
      )}

      {/* FOOTER DA GALERIA */}
      <footer className="bg-slate-900 py-20 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl font-black mb-6">Pronto para criar sua página?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Cada modelo acima foi testado para garantir a melhor conversão para o seu negócio.
          </p>
          <button 
            className="bg-white text-slate-900 hover:bg-slate-100 font-black px-12 py-8 rounded-2xl text-xl shadow-2xl transition-all"
            onClick={() => window.open('/signup', '_blank')}
          >
            CRIAR CONTA GRÁTIS
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TemplateGallery;