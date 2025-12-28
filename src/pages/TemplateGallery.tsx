"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { nicheLabels, getTemplateOptionsForNiche, ProjectNiche } from '@/types/project';
import { Rocket, Eye, Plus, ArrowLeft } from 'lucide-react';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ProjectNiche | 'all'>('all');

  const niches = Object.entries(nicheLabels) as [ProjectNiche, string][];

  const allTemplates = niches.flatMap(([niche, label]) => 
    getTemplateOptionsForNiche(niche).map(tpl => ({
      ...tpl,
      niche,
      nicheLabel: label
    }))
  );

  const filteredTemplates = filter === 'all' 
    ? allTemplates 
    : allTemplates.filter(t => t.niche === filter);

  return (
    <div className="min-h-screen bg-secondary/10">
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>

      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard/projetos">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Galeria de Templates</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Escolha seu modelo ideal</p>
            </div>
          </div>
          <Button variant="accent" onClick={() => navigate('/dashboard/projetos?criar=true')}>
            <Plus className="w-4 h-4 mr-2" />
            Criar do Zero
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
            size="sm"
            className="rounded-full px-6"
          >
            Todos
          </Button>
          {niches.map(([key, label]) => (
            <Button 
              key={key}
              variant={filter === key ? 'default' : 'outline'} 
              onClick={() => setFilter(key)}
              size="sm"
              className="rounded-full px-6"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.value} className="overflow-hidden border-border/50 hover:shadow-medium transition-all group border-2 hover:border-primary/20">
              <div className="aspect-[4/3] bg-muted relative flex items-center justify-center overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                
                {/* Placeholder Icon */}
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 z-20">
                  <Button size="sm" variant="default" className="w-32" asChild>
                    <Link to={`/templates?templateId=${template.value}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Link>
                  </Button>
                  <Button size="sm" variant="accent" className="w-32" asChild>
                    <Link to={`/dashboard/projetos?criar=true&template=${template.value}`}>
                      <Plus className="w-4 h-4 mr-2" />
                      Usar Modelo
                    </Link>
                  </Button>
                </div>
              </div>
              
              <CardHeader className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tight h-5 px-2 bg-muted/50">
                    {template.nicheLabel}
                  </Badge>
                  <span className="text-[9px] font-mono text-muted-foreground">{template.value}</span>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">{template.label}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1 leading-relaxed">
                  {template.value.includes('vsl') 
                    ? 'Especialmente otimizado para vídeos de vendas e lançamentos de alta performance.' 
                    : 'Design versátil focado em usabilidade e conversão imediata de leads.'}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplateGallery;