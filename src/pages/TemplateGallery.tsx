"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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

  const commonProps = {
    data: {},
    projectName: "Projeto Demo Preview",
    projectId: "preview",
    userId: "preview",
    slug: "preview",
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
            Nossa Biblioteca de Templates
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Modelos profissionais validados para cada etapa do seu funil. Clique para ver a demonstração.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        
        {/* 1. PÁGINAS DE VENDAS */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full" />
            Páginas de Vendas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('CourseTemplate')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <div className="text-2xl font-bold">Curso Online</div>
                  <div className="text-lg">Treinamento Completo</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Curso Online</h3>
              <p className="text-slate-600">Página otimizada para venda de infoprodutos e mentorias gravadas.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('EventTemplate')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <div className="text-2xl font-bold">Evento</div>
                  <div className="text-lg">Workshop / Palestra</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Evento</h3>
              <p className="text-slate-600">Capture inscrições para seu evento presencial ou webinar online.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('ProductTemplate')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🛍️</div>
                  <div className="text-2xl font-bold">Produto Padrão</div>
                  <div className="text-lg">Loja Virtual</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Produto Padrão</h3>
              <p className="text-slate-600">Design limpo focado na conversão de produtos físicos com checkout.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('ProductTemplateClassic')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📜</div>
                  <div className="text-2xl font-bold">Venda Clássico</div>
                  <div className="text-lg">Direct Response</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Venda Clássico</h3>
              <p className="text-slate-600">Layout tradicional de carta de vendas focado em persuasão direta.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('ProductTemplateModern')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <div className="text-2xl font-bold">Venda Moderno</div>
                  <div className="text-lg">Visual Premium</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Venda Moderno</h3>
              <p className="text-slate-600">Estética minimalista para marcas que buscam percepção de alto valor.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('ProductTemplateVSL')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎥</div>
                  <div className="text-2xl font-bold">Venda VSL</div>
                  <div className="text-lg">Vídeo de Vendas</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Venda VSL</h3>
              <p className="text-slate-600">Foco total na autoridade e persuasão através de um vídeo de vendas.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-blue-500 h-full" onClick={() => setSelectedTemplate('ServiceTemplate')} >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <div className="text-2xl font-bold">Serviço</div>
                  <div className="text-lg">Consultoria / Mentor</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Serviço</h3>
              <p className="text-slate-600">Exponha sua expertise profissional e atraia clientes qualificados.</p>
            </div>
          </div>
        </section>

        {/* 2. PÁGINAS DE CAPTURA */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded-full" />
            Páginas de Captura
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-pink-500 h-full" onClick={() => setSelectedTemplate('LeadCaptureDiscount')} >
              <div className="h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏷️</div>
                  <div className="text-2xl font-bold">Captura Cupom</div>
                  <div className="text-lg">Desconto Exclusivo</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Captura Cupom</h3>
              <p className="text-slate-600">Isca irresistível para construção rápida de lista de contatos.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-pink-500 h-full" onClick={() => setSelectedTemplate('LeadCaptureEbook')} >
              <div className="h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <div className="text-2xl font-bold">Isca Digital</div>
                  <div className="text-lg">E-book Grátis</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Isca Digital</h3>
              <p className="text-slate-600">Entregue valor imediato e capture leads qualificados para seu funil.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-pink-500 h-full" onClick={() => setSelectedTemplate('LeadCaptureQuiz')} >
              <div className="h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">❓</div>
                  <div className="text-2xl font-bold">Captura Quiz</div>
                  <div className="text-lg">Diagnóstico</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Captura Quiz</h3>
              <p className="text-slate-600">Alta interatividade e segmentação automática de leads por perfil.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-pink-500 h-full" onClick={() => setSelectedTemplate('LeadCaptureVSL')} >
              <div className="h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎬</div>
                  <div className="text-2xl font-bold">Captura VSL</div>
                  <div className="text-lg">Vídeo Grátis</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Captura VSL</h3>
              <p className="text-slate-600">Use o poder do vídeo para converter visitantes curiosos em leads.</p>
            </div>
          </div>
        </section>

        {/* 3. PÁGINA DE DOWNSELL */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-orange-500 rounded-full" />
            Página de Downsell
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-amber-500 h-full" onClick={() => setSelectedTemplate('GenericDownsell')} >
              <div className="h-64 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📉</div>
                  <div className="text-2xl font-bold">Downsell</div>
                  <div className="text-lg">Recuperação</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Downsell</h3>
              <p className="text-slate-600">Oferta alternativa para não perder o cliente que recusou o upsell.</p>
            </div>
          </div>
        </section>

        {/* 4. PÁGINAS DE OBRIGADO */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-green-500 rounded-full" />
            Páginas de Obrigado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-green-500 h-full" onClick={() => setSelectedTemplate('CourseThankYou')} >
              <div className="h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <div className="text-2xl font-bold">Sucesso Curso</div>
                  <div className="text-lg">Inscrição Confirmada</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso Curso</h3>
              <p className="text-slate-600">Página final com instruções claras de acesso à área de membros.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-green-500 h-full" onClick={() => setSelectedTemplate('EventThankYou')} >
              <div className="h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎟️</div>
                  <div className="text-2xl font-bold">Sucesso Evento</div>
                  <div className="text-lg">Vaga Garantida</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso Evento</h3>
              <p className="text-slate-600">Confirmação e detalhes importantes para os participantes do evento.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-green-500 h-full" onClick={() => setSelectedTemplate('ProductThankYou')} >
              <div className="h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <div className="text-2xl font-bold">Sucesso Compra</div>
                  <div className="text-lg">Pedido Recebido</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso Compra</h3>
              <p className="text-slate-600">Agradecimento e resumo do pedido para compras de produtos físicos.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-green-500 h-full" onClick={() => setSelectedTemplate('ServiceThankYou')} >
              <div className="h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <div className="text-2xl font-bold">Sucesso Serviço</div>
                  <div className="text-lg">Agendamento</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso Serviço</h3>
              <p className="text-slate-600">Próximos passos para o início do atendimento ou consultoria.</p>
            </div>
          </div>
        </section>

        {/* 5. PÁGINAS DE UPSELL */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full" />
            Páginas de Upsell
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-purple-500 h-full" onClick={() => setSelectedTemplate('CourseUpsell')} >
              <div className="h-64 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <div className="text-2xl font-bold">Upgrade Curso</div>
                  <div className="text-lg">Mentorias Extras</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upgrade Curso</h3>
              <p className="text-slate-600">Aumente o ticket médio oferecendo módulos bônus e mentorias.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-purple-500 h-full" onClick={() => setSelectedTemplate('EventUpsell')} >
              <div className="h-64 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">⭐</div>
                  <div className="text-2xl font-bold">Upgrade VIP</div>
                  <div className="text-lg">Experiência Total</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upgrade VIP</h3>
              <p className="text-slate-600">Ofereça acessos exclusivos e bônus premium para participantes.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-purple-500 h-full" onClick={() => setSelectedTemplate('ProductUpsell')} >
              <div className="h-64 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">➕</div>
                  <div className="text-2xl font-bold">Combo Produto</div>
                  <div className="text-lg">Itens Adicionais</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Combo Produto</h3>
              <p className="text-slate-600">Sugira produtos complementares que potencializam o resultado final.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer border-4 border-white hover:border-purple-500 h-full" onClick={() => setSelectedTemplate('ServiceUpsell')} >
              <div className="h-64 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <div className="text-2xl font-bold">Upgrade Service</div>
                  <div className="text-lg">Suporte Premium</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upgrade Service</h3>
              <p className="text-slate-600">Ofereça acompanhamento dedicado e aceleração de resultados.</p>
            </div>
          </div>
        </section>

      </main>

      {/* SISTEMA DE PREVIEW (MODAL) - SOMENTE LEITURA */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-100 animate-in fade-in duration-300">
          {/* BARRA SUPERIOR DO PREVIEW */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <LayoutTemplate className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">Visualizando: {selectedTemplate} (Modo Demo)</span>
            </div>
            <button 
              onClick={() => setSelectedTemplate(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-slate-900" />
            </button>
          </div>

          {/* ÁREA DE RENDERIZAÇÃO REAL - WRAPPER SOMENTE LEITURA */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center items-start">
            <div className="w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl my-8 relative pointer-events-none select-none">
              
              {selectedTemplate === 'CourseTemplate' && <CourseTemplate {...commonProps} />}
              {selectedTemplate === 'EventTemplate' && <EventTemplate {...commonProps} />}
              {selectedTemplate === 'ProductTemplate' && <ProductTemplate {...commonProps} />}
              {selectedTemplate === 'ProductTemplateClassic' && <ProductTemplateClassic {...commonProps} />}
              {selectedTemplate === 'ProductTemplateModern' && <ProductTemplateModern {...commonProps} />}
              {selectedTemplate === 'ProductTemplateVSL' && <ProductTemplateVSL {...commonProps} />}
              {selectedTemplate === 'ServiceTemplate' && <ServiceTemplate {...commonProps} />}
              
              {selectedTemplate === 'LeadCaptureDiscount' && <LeadCaptureDiscount {...commonProps} />}
              {selectedTemplate === 'LeadCaptureEbook' && <LeadCaptureEbook {...commonProps} />}
              {selectedTemplate === 'LeadCaptureQuiz' && <LeadCaptureQuiz {...commonProps} />}
              {selectedTemplate === 'LeadCaptureVSL' && <LeadCaptureVSL {...commonProps} />}

              {selectedTemplate === 'GenericDownsell' && <GenericDownsell {...commonProps} />}

              {selectedTemplate === 'CourseThankYou' && <CourseThankYou {...commonProps} />}
              {selectedTemplate === 'EventThankYou' && <EventThankYou {...commonProps} />}
              {selectedTemplate === 'ProductThankYou' && <ProductThankYou {...commonProps} />}
              {selectedTemplate === 'ServiceThankYou' && <ServiceThankYou {...commonProps} />}

              {selectedTemplate === 'CourseUpsell' && <CourseUpsell {...commonProps} />}
              {selectedTemplate === 'EventUpsell' && <EventUpsell {...commonProps} />}
              {selectedTemplate === 'ProductUpsell' && <ProductUpsell {...commonProps} />}
              {selectedTemplate === 'ServiceUpsell' && <ServiceUpsell {...commonProps} />}

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