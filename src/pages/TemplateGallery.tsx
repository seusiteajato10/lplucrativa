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
  ExternalLink, 
  Pencil,
  Filter
} from 'lucide-react';
import { nicheLabels, ProjectNiche } from '@/types/project';

// Metadados enriquecidos para os templates (estilo Wix)
const TEMPLATE_METADATA = [
  {
    id: 'product_default',
    name: 'Eletrônicos & Tech',
    niche: 'product',
    bomPara: 'E-commerces, startups de hardware e revendedores de gadgets.',
    description: 'Um layout limpo e tecnológico focado em destacar as especificações técnicas e a inovação do seu produto físico. Ideal para conversões rápidas.',
    image: 'https://images.unsplash.com/photo-1526733158133-7403a782e25d?w=800&q=80',
  },
  {
    id: 'product_modern',
    name: 'Boutique de Moda',
    niche: 'product',
    bomPara: 'Marcas de vestuário premium, designers de joias e lojas de acessórios.',
    description: 'Estética minimalista com tipografia elegante. Este template prioriza o visual da sua marca e cria uma experiência de compra luxuosa.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 'product_classic',
    name: 'Livraria & Editorial',
    niche: 'product',
    bomPara: 'Autores independentes, editoras e vendedores de produtos educativos.',
    description: 'Estrutura clássica que transmite autoridade e confiança. Organize seu conteúdo de forma legível e atraente para o seu leitor.',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
  },
  {
    id: 'product_vsl',
    name: 'Suplemento Performance',
    niche: 'product',
    bomPara: 'Lançamentos de infoprodutos, saúde, fitness e bem-estar.',
    description: 'Focado em Vídeo de Vendas (VSL). Este template utiliza gatilhos mentais e prova social para maximizar a conversão de produtos de alto impacto.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  },
  {
    id: 'capture_ebook',
    name: 'Isca Digital Pro',
    niche: 'lead_only',
    bomPara: 'Consultores, estrategistas digitais e coaches B2B.',
    description: 'Perfeito para construir sua lista de e-mails. Ofereça valor real com um design que foca 100% no formulário de captura e nos benefícios.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  },
  {
    id: 'capture_vsl',
    name: 'Webinar de Sucesso',
    niche: 'lead_only',
    bomPara: 'Especialistas que realizam aulas ao vivo e workshops online.',
    description: 'Gere antecipação máxima para seu evento. Inclui cronômetro regressivo e seção de perguntas frequentes para quebrar objeções na hora.',
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80',
  },
  {
    id: 'capture_quiz',
    name: 'Diagnóstico Saudável',
    niche: 'lead_only',
    bomPara: 'Nutricionistas, psicólogos e profissionais de saúde personalizada.',
    description: 'Engajamento através da interatividade. Qualifique seus leads antes mesmo de entrar em contato através de um quiz dinâmico.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
  },
  {
    id: 'capture_discount',
    name: 'Oferta Relâmpago',
    niche: 'lead_only',
    bomPara: 'Lojas locais, serviços por assinatura e promoções de feriado.',
    description: 'Design de urgência com cores vibrantes. Use este modelo para campanhas de curto prazo que precisam de resultados imediatos.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
  },
  {
    id: 'service_basic',
    name: 'Agência Criativa',
    niche: 'service',
    bomPara: 'Freelancers, agências de marketing e estúdios de design.',
    description: 'Exiba seu portfólio e serviços com elegância. Uma estrutura profissional que destaca seus diferenciais e facilita o pedido de orçamento.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
  },
  {
    id: 'event_basic',
    name: 'Summit Tech',
    niche: 'event',
    bomPara: 'Organizadores de conferências, meetups e eventos corporativos.',
    description: 'Gerencie palestrantes, horários e ingressos em um só lugar. Design moderno feito para transmitir a escala do seu evento.',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800&q=80',
  },
  {
    id: 'course_basic',
    name: 'Masterclass Elite',
    niche: 'course',
    bomPara: 'Professores online, mentores e criadores de cursos em vídeo.',
    description: 'Estrutura otimizada para vender conhecimento. Inclui seções para módulos, depoimentos de alunos e currículo do instrutor.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  }
];

const ITEMS_PER_PAGE = 8;

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Categorias baseadas nos nichos + Landing Pages
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'product', label: 'Negócios & Lojas' },
    { id: 'service', label: 'Serviços' },
    { id: 'lead_only', label: 'Landing Pages' },
    { id: 'event', label: 'Eventos' },
    { id: 'course', label: 'Educação' },
  ];

  // Filtro e Busca
  const filteredTemplates = useMemo(() => {
    return TEMPLATE_METADATA.filter(tpl => {
      const matchesCategory = activeCategory === 'all' || tpl.niche === activeCategory;
      const matchesSearch = tpl.name.toLowerCase().includes(search.toLowerCase()) || 
                           tpl.bomPara.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  // Paginação
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      <Helmet>
        <title>Escolha seu template favorito | Galeria LP Lucrativa</title>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-white pt-24 pb-12 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
            Escolha seu template favorito
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto mt-12 border-t pt-8">
            {/* Categorias */}
            <div className="flex flex-wrap justify-center md:justify-start gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Busca */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar por nome ou uso..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-11 border-slate-200 rounded-lg focus-visible:ring-primary/20 transition-all bg-slate-50/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Templates */}
      <main className="flex-1 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {paginatedTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {paginatedTemplates.map((template) => (
                <div key={template.id} className="group flex flex-col h-full bg-transparent">
                  {/* Miniatura */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200 mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <Button 
                        variant="default" 
                        className="bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg shadow-xl"
                        asChild
                      >
                        <Link to={`/templates?templateId=${template.id}`}>
                          Ver Template
                        </Link>
                      </Button>
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-xl"
                        asChild
                      >
                        <Link to={`/dashboard/projetos?criar=true&template=${template.id}`}>
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="flex-1 text-left px-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      {template.name}
                    </h3>
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Bom para:</span>
                      <p className="text-sm text-slate-700 leading-tight font-medium">
                        {template.bomPara}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {template.description}
                    </p>
                    
                    {/* Action Link Secundário */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <button 
                        onClick={() => navigate(`/templates?templateId=${template.id}`)}
                        className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider"
                      >
                        Detalhes do layout
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Nenhum template encontrado</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                Tente ajustar seus filtros ou termos de busca para encontrar o que procura.
              </p>
              <Button 
                variant="outline" 
                className="mt-8 rounded-full"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
              >
                Limpar todos os filtros
              </Button>
            </div>
          )}

          {/* Paginação Estilo Wix */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-20 pt-8 border-t border-slate-200">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="rounded-full h-10 w-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-full text-sm font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-slate-900 text-white shadow-lg scale-110'
                        : 'text-slate-600 hover:bg-slate-200'
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
                onClick={() => setCurrentPage(p => p + 1)}
                className="rounded-full h-10 w-10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Minimalista Galeria */}
      <footer className="bg-white py-12 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-500 font-medium">
            Não encontrou o que procurava? <Link to="/dashboard/projetos?criar=true" className="text-primary hover:underline">Comece um projeto do zero</Link> e use nosso editor drag-and-drop.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateGallery;