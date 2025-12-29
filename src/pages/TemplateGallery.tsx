"use client";

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  LayoutTemplate,
  MousePointer2,
  ShoppingCart,
  ArrowUpCircle,
  ArrowDownCircle,
  CheckCircle2
} from 'lucide-react';

// IDs REAIS conforme definidos em src/components/editor/EditorPreview.tsx
const SYSTEM_TEMPLATES = [
  // --- PÁGINAS DE CAPTURA ---
  { id: 'capture_ebook', name: 'E-book / Isca Digital', category: 'capture', bomPara: 'Profissionais que desejam entregar um material rico em troca do contato.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800' },
  { id: 'capture_vsl', name: 'Vídeo (VSL) + Captura', category: 'capture', bomPara: 'Lançamentos onde o vídeo é o principal motor de convencimento.', image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800' },
  { id: 'capture_quiz', name: 'Quiz Interativo', category: 'capture', bomPara: 'Alta conversão através de perguntas que segmentam o público.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800' },
  { id: 'capture_discount', name: 'Cupom de Desconto', category: 'capture', bomPara: 'Negócios locais e e-commerces oferecendo vantagens imediatas.', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' },

  // --- PÁGINAS DE VENDAS ---
  { id: 'product_default', name: 'Venda Padrão (Físico)', category: 'sales', bomPara: 'Produtos de consumo com foco em benefícios e vitrine.', image: 'https://images.unsplash.com/photo-1526733158133-7403a782e25d?w=800' },
  { id: 'product_modern', name: 'Venda Moderno', category: 'sales', bomPara: 'Marcas minimalistas e produtos de design premium.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  { id: 'product_classic', name: 'Venda Clássico', category: 'sales', bomPara: 'Estruturas de venda tradicionais focadas em autoridade.', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800' },
  { id: 'product_vsl', name: 'VSL (Vídeo de Vendas)', category: 'sales', bomPara: 'Infoprodutos de alto ticket com narrativa em vídeo.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800' },
  { id: 'service_basic', name: 'Serviço Profissional', category: 'sales', bomPara: 'Consultores, médicos e advogados que vendem agenda.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800' },
  { id: 'event_basic', name: 'Evento / Workshop', category: 'sales', bomPara: 'Ingressos e inscrições para eventos com cronogramas.', image: 'https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800' },
  { id: 'course_basic', name: 'Curso Online', category: 'sales', bomPara: 'Venda de treinamentos estruturados em módulos.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800' },

  // --- UPSELL ---
  { id: 'ProductUpsell', name: 'Upsell de Produto', category: 'upsell', bomPara: 'Aumentar o ticket médio oferecendo um segundo item.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' },
  { id: 'ServiceUpsell', name: 'Upsell de Serviço', category: 'upsell', bomPara: 'Oferecer acompanhamento ou mentoria pós-serviço.', image: 'https://images.unsplash.com/photo-1454165833767-027ffea70288?w=800' },
  { id: 'EventUpsell', name: 'Upsell de Evento', category: 'upsell', bomPara: 'Upgrade para área VIP ou acesso a gravações.', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800' },
  { id: 'CourseUpsell', name: 'Upsell de Curso', category: 'upsell', bomPara: 'Acesso vitalício ou bônus extras de treinamento.', image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?w=800' },
  
  // --- DOWNSELL ---
  { id: 'GenericDownsell', name: 'Downsell Estratégico', category: 'downsell', bomPara: 'Recuperar vendas oferecendo uma opção mais acessível.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800' },

  // --- OBRIGADO ---
  { id: 'ProductThankYou', name: 'Obrigado - Produto', category: 'thankyou', bomPara: 'Confirmar pedidos físicos com informações de entrega.', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800' },
  { id: 'ServiceThankYou', name: 'Obrigado - Serviço', category: 'thankyou', bomPara: 'Confirmação de agendamentos e próximos passos.', image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?w=800' },
  { id: 'EventThankYou', name: 'Obrigado - Inscrição', category: 'thankyou', bomPara: 'Acesso ao ingresso e instruções do evento.', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800' },
  { id: 'CourseThankYou', name: 'Obrigado - Boas Vindas', category: 'thankyou', bomPara: 'Liberação de acesso imediato à área de alunos.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800' },
];

const ITEMS_PER_PAGE = 12;

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', label: 'Todos', icon: LayoutTemplate },
    { id: 'capture', label: 'Páginas de Captura', icon: MousePointer2 },
    { id: 'sales', label: 'Páginas de Vendas', icon: ShoppingCart },
    { id: 'upsell', label: 'Upsell', icon: ArrowUpCircle },
    { id: 'downsell', label: 'Downsell', icon: ArrowDownCircle },
    { id: 'thankyou', label: 'Páginas de Obrigado', icon: CheckCircle2 },
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
        <title>Escolha seu template favorito | Galeria Real</title>
      </Helmet>

      {/* Topo Wix Style */}
      <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Escolha seu template favorito
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Explore nossos modelos profissionais prontos para uso. Encontre o layout ideal para sua estratégia de vendas.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 border-y border-slate-100 py-10">
          {/* Menu de Categorias */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xl scale-105'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <Input
              placeholder="O que você precisa hoje?"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-14 h-14 border-slate-200 rounded-2xl focus-visible:ring-slate-900/10 transition-all bg-slate-50 text-base font-medium shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Grade de Templates Reais */}
      <main className="flex-1 py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {paginatedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {paginatedTemplates.map((template) => (
              <div key={template.id} className="group flex flex-col h-full bg-transparent">
                {/* Miniatura com Hover Premium */}
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 mb-8 transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:-translate-y-3">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay interativo com Botão Único (DEMO) */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                    <Button 
                      className="bg-white text-slate-900 hover:bg-slate-100 font-black px-12 py-8 rounded-2xl shadow-2xl transition-transform hover:scale-105 text-lg"
                      onClick={() => navigate(`/templates/${template.id}`)}
                    >
                      VER DEMO
                    </Button>
                  </div>
                </div>

                {/* Informações Reais do Template */}
                <div className="flex-1 text-left px-2">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors mb-3 leading-tight">
                    {template.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[3px] block mb-2">Ideal para:</span>
                    <p className="text-base text-slate-800 leading-snug font-bold">
                      {template.bomPara}
                    </p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Modelo real e funcional disponível para sua estratégia. {template.name} foi desenhado para maximizar a conversão nesta etapa do seu funil de vendas.
                  </p>
                  <button 
                    onClick={() => navigate(`/templates/${template.id}`)}
                    className="text-sm font-black text-slate-900 flex items-center gap-2 hover:gap-4 transition-all group/link"
                  >
                    VISUALIZAR DETALHES
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50 rounded-[50px] border-2 border-dashed border-slate-200">
            <LayoutTemplate className="w-24 h-24 text-slate-200 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-slate-800">Nenhum modelo encontrado</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-4 text-xl font-medium">
              Não encontramos o template "{search}" nesta categoria.
            </p>
            <Button 
              variant="outline" 
              className="mt-12 px-12 py-8 rounded-2xl border-2 font-black text-lg hover:bg-white transition-all"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
            >
              LIMPAR TODOS OS FILTROS
            </Button>
          </div>
        )}

        {/* Paginação Estilo Wix (Numérica) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-32 pb-20">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-full w-14 h-14 border border-slate-100"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            
            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-14 h-14 rounded-full text-lg font-black transition-all ${
                    currentPage === i + 1
                      ? 'bg-slate-900 text-white shadow-2xl scale-110'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
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
              className="rounded-full w-14 h-14 border border-slate-100"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        )}
      </main>

      {/* Footer Galeria Estilo Wix */}
      <footer className="bg-slate-900 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-5xl font-black mb-8 leading-tight">
            Descubra o potencial completo das nossas páginas reais.
          </h2>
          <p className="text-slate-400 text-xl mb-16 leading-relaxed">
            Cada template acima é um componente real que você pode visualizar em ação antes de começar seu projeto oficial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              className="bg-white text-slate-900 hover:bg-slate-100 font-black px-16 py-10 rounded-3xl text-2xl shadow-2xl w-full sm:w-auto"
              onClick={() => window.open('/signup', '_blank')}
            >
              CRIAR MINHA CONTA AGORA
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TemplateGallery;