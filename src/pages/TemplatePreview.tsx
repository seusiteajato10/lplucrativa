"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Play, Monitor, Smartphone, Layout } from 'lucide-react';
import { nicheLabels, getTemplateOptionsForNiche, ProjectNiche } from '@/types/project';
import EditorPreview from '@/components/editor/EditorPreview';
import { defaultTemplateData } from '@/types/templateData';

const TemplatePreview = () => {
  const navigate = useNavigate();
  const [selectedNiche, setSelectedNiche] = useState<ProjectNiche>('product');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('product_default');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const templates = getTemplateOptionsForNiche(selectedNiche);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Preview de Templates | LP Lucrativa</title>
      </Helmet>

      {/* Header */}
      <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg leading-none">Galeria de Templates</h1>
            <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Visualize e escolha seu modelo</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-muted p-1 rounded-lg border border-border">
            <Button 
              variant={previewMode === 'desktop' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-8 w-10 p-0"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button 
              variant={previewMode === 'mobile' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-8 w-10 p-0"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="accent" size="sm" onClick={() => navigate('/dashboard/projetos?criar=true')}>
            <Layout className="w-4 h-4 mr-2" />
            Usar Template
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border bg-muted/20 overflow-y-auto p-6 hidden lg:block">
          <div className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Categorias</label>
              <div className="grid gap-2">
                {(Object.entries(nicheLabels) as [ProjectNiche, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedNiche(key);
                      const firstTpl = getTemplateOptionsForNiche(key)[0];
                      if (firstTpl) setSelectedTemplate(firstTpl.value);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      selectedNiche === key 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                        : 'border-transparent hover:bg-secondary text-muted-foreground'
                    }`}
                  >
                    {label}
                    {selectedNiche === key && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Variações do Template</label>
              <div className="grid gap-3">
                {templates.map((tpl) => (
                  <button
                    key={tpl.value}
                    onClick={() => setSelectedTemplate(tpl.value)}
                    className={`group relative overflow-hidden rounded-xl border-2 transition-all p-4 text-left ${
                      selectedTemplate === tpl.value
                        ? 'border-primary bg-background shadow-md ring-4 ring-primary/5'
                        : 'border-border bg-background hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${selectedTemplate === tpl.value ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        <Play className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${selectedTemplate === tpl.value ? 'text-primary' : 'text-foreground'}`}>{tpl.label}</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-mono mt-0.5">{tpl.value}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-secondary/10 overflow-hidden flex flex-col">
          <EditorPreview
            templateData={defaultTemplateData}
            niche={selectedNiche}
            templateId={selectedTemplate}
            previewMode={previewMode}
            projectName={templates.find(t => t.value === selectedTemplate)?.label || "Preview"}
          />
        </main>
      </div>
    </div>
  );
};

export default TemplatePreview;