import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TemplateData, Benefit, Testimonial } from '@/types/templateData';
import { Plus, Trash2 } from 'lucide-react';

interface ContentTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const ContentTab = ({ templateData, onUpdate }: ContentTabProps) => {
  const addBenefit = () => {
    const newBenefit: Benefit = { id: crypto.randomUUID(), text: '' };
    onUpdate({ benefits: [...templateData.benefits, newBenefit] });
  };

  const updateBenefit = (id: string, text: string) => {
    onUpdate({
      benefits: templateData.benefits.map(b => (b.id === id ? { ...b, text } : b)),
    });
  };

  const removeBenefit = (id: string) => {
    onUpdate({ benefits: templateData.benefits.filter(b => b.id !== id) });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      text: '',
    };
    onUpdate({ testimonials: [...templateData.testimonials, newTestimonial] });
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    onUpdate({
      testimonials: templateData.testimonials.map(t =>
        t.id === id ? { ...t, ...updates } : t
      ),
    });
  };

  const removeTestimonial = (id: string) => {
    onUpdate({ testimonials: templateData.testimonials.filter(t => t.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Main Content */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Conteúdo Principal</h3>
        
        <div className="space-y-2">
          <Label htmlFor="headline">Título Principal</Label>
          <Input
            id="headline"
            value={templateData.headline}
            onChange={e => onUpdate({ headline: e.target.value })}
            placeholder="Ex: Transforme sua vida hoje"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheadline">Subtítulo</Label>
          <Input
            id="subheadline"
            value={templateData.subheadline}
            onChange={e => onUpdate({ subheadline: e.target.value })}
            placeholder="Ex: Descubra como alcançar seus objetivos"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ctaButtonText">Texto do Botão CTA</Label>
          <Input
            id="ctaButtonText"
            value={templateData.ctaButtonText}
            onChange={e => onUpdate({ ctaButtonText: e.target.value })}
            placeholder="Ex: Quero Começar Agora"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroText">Texto do Hero</Label>
          <Textarea
            id="heroText"
            value={templateData.heroText}
            onChange={e => onUpdate({ heroText: e.target.value })}
            placeholder="Descrição da seção hero"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutText">Sobre</Label>
          <Textarea
            id="aboutText"
            value={templateData.aboutText}
            onChange={e => onUpdate({ aboutText: e.target.value })}
            placeholder="Texto sobre você ou sua empresa"
            rows={3}
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">Benefícios</h3>
          <Button variant="outline" size="sm" onClick={addBenefit}>
            <Plus className="w-3 h-3 mr-1" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-2">
          {templateData.benefits.map((benefit, index) => (
            <div key={benefit.id} className="flex items-center gap-2">
              <Input
                value={benefit.text}
                onChange={e => updateBenefit(benefit.id, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-destructive hover:text-destructive"
                onClick={() => removeBenefit(benefit.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">Depoimentos</h3>
          <Button variant="outline" size="sm" onClick={addTestimonial}>
            <Plus className="w-3 h-3 mr-1" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-4">
          {templateData.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="p-3 border border-border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Depoimento {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => removeTestimonial(testimonial.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Input
                value={testimonial.name}
                onChange={e => updateTestimonial(testimonial.id, { name: e.target.value })}
                placeholder="Nome"
              />
              <Input
                value={testimonial.role}
                onChange={e => updateTestimonial(testimonial.id, { role: e.target.value })}
                placeholder="Cargo/Profissão"
              />
              <Textarea
                value={testimonial.text}
                onChange={e => updateTestimonial(testimonial.id, { text: e.target.value })}
                placeholder="Depoimento"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
