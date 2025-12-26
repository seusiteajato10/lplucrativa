import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

interface HomepageSection {
  id: string;
  section: string;
  content: any;
  updated_at: string;
}

export function HomepageContentEditor() {
  const queryClient = useQueryClient(); // Initialize queryClient
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState<any>({});
  const [featuresContent, setFeaturesContent] = useState<any>({ items: [] });
  const [ctaContent, setCtaContent] = useState<any>({});
  const [contactContent, setContactContent] = useState<any>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*');

      if (error) throw error;

      data?.forEach((section: HomepageSection) => {
        switch (section.section) {
          case 'hero':
            setHeroContent(section.content);
            break;
          case 'features':
            setFeaturesContent(section.content);
            break;
          case 'cta':
            setCtaContent(section.content);
            break;
          case 'contact':
            setContactContent(section.content);
            break;
        }
      });
    } catch (error: any) {
      toast.error("Erro ao carregar conteúdo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (sectionName: string, content: any) => {
    setSaving(sectionName);
    try {
      const { data: existingSection } = await supabase
        .from('homepage_content')
        .select('id')
        .eq('section', sectionName)
        .maybeSingle();

      if (existingSection) {
        const { error } = await supabase
          .from('homepage_content')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('section', sectionName);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('homepage_content')
          .insert({ section: sectionName, content, updated_at: new Date().toISOString() });
        if (error) throw error;
      }
      toast.success("Conteúdo salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['homepageContent'] }); // Invalidate the cache
    } catch (error: any) {
      toast.error("Erro ao salvar: " + error.message);
    } finally {
      setSaving(null);
    }
  };

  const addFeatureItem = () => {
    setFeaturesContent((prev: any) => ({
      ...prev,
      items: [...(prev.items || []), { title: '', description: '' }],
    }));
  };

  const updateFeatureItem = (index: number, field: 'title' | 'description', value: string) => {
    setFeaturesContent((prev: any) => {
      const newItems = [...(prev.items || [])];
      if (newItems[index]) {
        newItems[index][field] = value;
      }
      return { ...prev, items: newItems };
    });
  };

  const removeFeatureItem = (index: number) => {
    setFeaturesContent((prev: any) => {
      const newItems = (prev.items || []).filter((_: any, i: number) => i !== index);
      return { ...prev, items: newItems };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SEÇÃO HERO */}
      <Card>
        <CardHeader>
          <CardTitle>Seção Hero (Topo da Página)</CardTitle>
          <CardDescription>Edite o conteúdo principal da homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Título Principal</Label>
            <Input
              id="hero-title"
              value={heroContent.title || ''}
              onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Subtítulo</Label>
            <Textarea
              id="hero-subtitle"
              value={heroContent.subtitle || ''}
              onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero-primary-btn">Botão Principal</Label>
              <Input
                id="hero-primary-btn"
                value={heroContent.primaryButton || ''}
                onChange={(e) => setHeroContent({ ...heroContent, primaryButton: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hero-secondary-btn">Botão Secundário</Label>
              <Input
                id="hero-secondary-btn"
                value={heroContent.secondaryButton || ''}
                onChange={(e) => setHeroContent({ ...heroContent, secondaryButton: e.target.value })}
              />
            </div>
          </div>
          <Button 
            onClick={() => saveSection('hero', heroContent)}
            disabled={saving === 'hero'}
          >
            {saving === 'hero' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Hero
          </Button>
        </CardContent>
      </Card>

      {/* SEÇÃO FEATURES */}
      <Card>
        <CardHeader>
          <CardTitle>Seção de Recursos</CardTitle>
          <CardDescription>Edite os recursos/benefícios exibidos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="features-title">Título da Seção</Label>
            <Input
              id="features-title"
              value={featuresContent.title || ''}
              onChange={(e) => setFeaturesContent({ ...featuresContent, title: e.target.value })}
            />
          </div>
          
          {(featuresContent.items || []).map((item: any, index: number) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Recurso {index + 1}</Label>
                  <Button variant="ghost" size="icon" onClick={() => removeFeatureItem(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div>
                  <Label>Título</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => updateFeatureItem(index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => updateFeatureItem(index, 'description', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addFeatureItem}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Recurso
          </Button>
          
          <Button 
            onClick={() => saveSection('features', featuresContent)}
            disabled={saving === 'features'}
          >
            {saving === 'features' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Recursos
          </Button>
        </CardContent>
      </Card>

      {/* SEÇÃO CTA */}
      <Card>
        <CardHeader>
          <CardTitle>Seção CTA (Chamada para Ação)</CardTitle>
          <CardDescription>Edite a seção de conversão final</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cta-title">Título</Label>
            <Input
              id="cta-title"
              value={ctaContent.title || ''}
              onChange={(e) => setCtaContent({ ...ctaContent, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="cta-subtitle">Subtítulo</Label>
            <Textarea
              id="cta-subtitle"
              value={ctaContent.subtitle || ''}
              onChange={(e) => setCtaContent({ ...ctaContent, subtitle: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="cta-button">Texto do Botão</Label>
            <Input
              id="cta-button"
              value={ctaContent.buttonText || ''}
              onChange={(e) => setCtaContent({ ...ctaContent, buttonText: e.target.value })}
            />
          </div>
          <Button 
            onClick={() => saveSection('cta', ctaContent)}
            disabled={saving === 'cta'}
          >
            {saving === 'cta' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar CTA
          </Button>
        </CardContent>
      </Card>

      {/* SEÇÃO CONTATO */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
          <CardDescription>Edite os dados de contato exibidos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={contactContent.email || ''}
              onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contact-phone">Telefone</Label>
            <Input
              id="contact-phone"
              value={contactContent.phone || ''}
              onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contact-address">Endereço</Label>
            <Input
              id="contact-address"
              value={contactContent.address || ''}
              onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
            />
          </div>
          <Button 
            onClick={() => saveSection('contact', contactContent)}
            disabled={saving === 'contact'}
          >
            {saving === 'contact' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Contato
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}