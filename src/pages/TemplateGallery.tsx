"use client";

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  Pencil,
  Filter,
  LayoutTemplate
} from 'lucide-react';

// Mapeamento dos templates REAIS do sistema
const SYSTEM_TEMPLATES = [
  // --- CAPTURA ---
  { id: 'capture_ebook', name: 'E-book / Isca Digital', category: 'capture', bomPara: 'Gerar leads qualificados entregando valor imediato.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800' },
  { id: 'capture_vsl', name: 'Vídeo (VSL) + Captura', category: 'capture', bomPara: 'Lançamentos e convites para aulas ao vivo.', image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800' },
  { id: 'capture_quiz', name: 'Quiz Interativo', category: 'capture', bomPara: 'Segmentação de público e alta taxa de engajamento.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800' },
  { id: 'capture_discount', name: 'Cupom de Desconto', category: 'capture', bomPara: 'E-commerces e negócios locais em campanhas de oferta.', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' },

  // --- VENDAS ---
  { id: 'product_default', name: 'Venda Padrão (Físico)', category: 'sales', bomPara: 'Produtos de consumo com foco em benefícios e preço.', image: 'https://images.unsplash.com/photo-1526733158133-7403a782e25d?w=800' },
  { id: 'product_modern', name: 'Venda Moderno', category: 'sales', bomPara: 'Marcas de luxo ou produtos premium minimalistas.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  { id: 'product_classic', name: 'Venda Clássico', category: 'sales', bomPara: 'Estruturas de carta de venda tradicionais.', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800' },
  { id: 'product_vsl', name: 'VSL (Vídeo de Vendas)', category: 'sales', bomPara: 'Infoprodutos e cursos com foco em persuasão por vídeo.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800' },
  { id: 'service_basic', name: 'Serviço Profissional', category: 'sales', bomPara: 'Consultorias, mentorias e serviços liberais.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800' },
  { id: 'event_basic', name: 'Evento / Workshop', category: 'sales', bomPara: 'Venda de ingressos para eventos online ou presenciais.', image: 'https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800' },
  { id: 'course_basic', name: 'Curso Online', category: 'sales', bomPara: 'Venda de treinamentos e áreas de membros.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800' },

  // --- UPSELL ---
  { id: 'ProductUpsell', name: 'Upsell de Produto', category: 'upsell', bomPara: 'Oferecer um segundo item após a compra inicial.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' },
  
  // --- DOWNSELL ---
  { id: 'GenericDownsell', name: 'Downsell Genérico', category: 'downsell', bomPara: 'Recuperar vendas oferecendo uma opção mais barata.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800' },

  // --- OBRIGADO ---
  { id: 'ProductThankYou', name: 'Obrigado - E-commerce', category: 'thankyou', bomPara: 'Confirmação de pedido e instruções de rastreio.', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800' },
  { id: 'ServiceThankYou', name: 'Obrigado - Agendamento', category: 'thankyou', bomPara: 'Confirmação de consultoria e próximos passos.', image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?w=800' },
];

const ITEMS_PER_PAGE = 12;

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'capture', label: 'Páginas de Captura' },
    { id: 'sales', label: 'Páginas de Vendas' },
    { id: 'upsell', label: 'Upsell' },
    { id: 'downsell', label: 'Downsell' },
    { id: 'thankyou', label: 'Páginas de Obrigado' },
  ];

  const filteredTemplates = useMemo(() => {
    return SYSTEM_TEMPLATES.filter(tpl => {
      const matchesCategory = activeCategory === 'all' || tpl.category === activeCategory;
      const matchesSearch = tpl.name.toLowerCase().includes(search.toLowerCase()) || 
                           tpl.bomPara.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
      <Helmet>
        <title>Escolha seu template favorito | LP Lucrativa</title>
      </Helmet>

      {/* Topo com Título e Busca */}
      <section className="pt-20 pb-10 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Escolha seu template favorito
          </h1>
          <p className="text-lg text-slate-500 font-medium">Explore nossa coleção de layouts profissionais e comece hoje mesmo.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 border-y py-8">
          {/* Menu de Categorias */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1 overflow-x-auto pb-2 scrollbar-hide max-w-full md:max-w-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por nome ou uso..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-12 h-12 border-slate-200 rounded-xl focus-visible:ring-slate-200 transition-all bg-slate-50 text-base"
            />
          </div>
        </div>
      </section>

      {/* Grade de Templates */}
      <main className="flex-1 py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {paginatedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {paginatedTemplates.map((template) => (
              <div key={template.id} className="group flex flex-col h-full bg-transparent">
                {/* Miniatura com Hover */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay interativo (Estilo Wix) */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                    <Button 
                      className="bg-white text-slate-900 hover:bg-slate-100 font-black px-10 py-6 rounded-xl shadow-2xl transition-transform hover:scale-105"
                      onClick={() => navigate(`/templates?templateId=${template.id}`)}
                    >
                      VER DEMO
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-6 rounded-xl transition-all"
                      onClick={() => navigate(`/dashboard/projetos?criar=true&template=${template.id}`)}
                    >
                      EDITAR TEMPLATE
                    </Button>
                  </div>
                </div>

                {/* Informações do Card */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    {template.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] block mb-2">Bom para:</span>
                    <p className="text-sm text-slate-800 leading-snug font-bold">
                      {template.bomPara}
                    </p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {template.name} possui um design otimizado para conversão imediata. {template.bomPara.split('.')[0]}. Clique em "Editar" para começar a personalizar este modelo agora mesmo.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <LayoutTemplate className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-800">Nenhum template encontrado</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-4 text-lg">
              Tente ajustar sua busca ou categoria para encontrar o modelo ideal.
            </p>
            <Button 
              variant="outline" 
              className="mt-10 px-10 py-6 rounded-2xl border-2 font-bold"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Paginação Estilo Wix */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-24 pb-20 border-t border-slate-100 pt-12">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-12 h-12 rounded-full text-base font-black transition-all ${
                    currentPage === i + 1
                      ? 'bg-slate-900 text-white shadow-2xl scale-110'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(p => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </main>

      {/* Footer Galeria */}
      <footer className="bg-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-white text-3xl font-black mb-6">Não encontrou o que procurava?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Você também pode começar um projeto do zero e usar nosso editor drag-and-drop para criar exatamente o que imaginou.
          </p>
          <Button 
            className="bg-white text-slate-900 hover:bg-slate-100 font-black px-12 py-8 rounded-2xl text-xl"
            onClick={() => navigate('/dashboard/projetos?criar=true')}
          >
            CRIAR DO ZERO AGORA
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default TemplateGallery;