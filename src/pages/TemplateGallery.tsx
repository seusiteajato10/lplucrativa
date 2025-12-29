"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutTemplate, Filter, Rocket } from 'lucide-react';
import { getTemplates, TemplateMeta } from '@/lib/template-registry';
import TemplateCard from '@/components/gallery/TemplateCard';
import PreviewModal from '@/components/gallery/PreviewModal';

const TemplateGallery = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateMeta | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [templates, setTemplates] = useState<TemplateMeta[]>([]);

  useEffect(() => {
    // Carrega os templates registrados
    setTemplates(getTemplates());
  }, []);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'captura', label: 'Captura de Leads' },
    { id: 'vendas', label: 'Páginas de Vendas' },
    { id: 'upsell', label: 'Upsell' },
    { id: 'downsell', label: 'Downsell' },
    { id: 'thankyou', label: 'Obrigado' },
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(tpl => {
      const matchesCategory = activeCategory === 'todos' || tpl.category === activeCategory;
      const matchesSearch = tpl.name.toLowerCase().includes(search.toLowerCase()) || 
                           tpl.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, templates]);

  const openPreview = (tpl: TemplateMeta) => {
    setSelectedTemplate(tpl);
    setIsPreviewOpen(true);
    // Bloqueia o scroll do body quando o modal abre
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      <Helmet>
        <title>Escolha seu Template | LP Lucrativa</title>
      </Helmet>

      {/* Header Wix Style */}
      <section className="bg-white pt-24 pb-12 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Rocket className="w-4 h-4" />
              Templates Profissionais de Alta Conversão
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Escolha seu template favorito
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore nossa biblioteca de modelos validados para cada etapa do seu funil de vendas. 
              Clique em "Ver Demo" para visualizar o design real.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-12 bg-slate-50 p-6 rounded-[32px] border border-slate-200">
            {/* Categorias */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xl scale-105'
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Busca */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <Input
                placeholder="Qual o seu objetivo hoje?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 h-14 border-slate-200 rounded-2xl focus-visible:ring-slate-900/10 transition-all bg-white text-base font-medium shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Templates */}
      <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredTemplates.map((template) => (
              <TemplateCard 
                key={template.id}
                {...template}
                onPreview={() => openPreview(template)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <LayoutTemplate className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-800">Nenhum modelo encontrado</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 text-lg">
              Não encontramos templates para "{search}". Tente buscar por termos mais genéricos.
            </p>
          </div>
        )}
      </main>

      {/* Modal de Preview */}
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={closePreview} 
        template={selectedTemplate}
      />

      <footer className="bg-slate-900 py-20 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl font-black mb-6">Pronto para criar sua página?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Escolha um template e comece a capturar leads em menos de 10 minutos.
          </p>
          <Button 
            className="bg-white text-slate-900 hover:bg-slate-100 font-black px-12 py-8 rounded-2xl text-xl shadow-2xl"
            onClick={() => window.open('/signup', '_blank')}
          >
            CRIAR CONTA GRÁTIS
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default TemplateGallery;