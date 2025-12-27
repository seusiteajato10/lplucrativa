import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2 } from 'lucide-react';
import { getTemplateOptionsForNiche } from '@/types/project';

interface ProductConfigTabProps {
  templateData: TemplateData & { template_id?: string };
  onUpdate: (updates: Partial<TemplateData & { template_id?: string }>) => void;
}

const ProductConfigTab = ({ templateData, onUpdate }: ProductConfigTabProps) => {
  const templateOptions = getTemplateOptionsForNiche('product');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="template-select">Template do Produto</Label>
        <Select
          value={templateData.template_id}
          onValueChange={(value) => onUpdate({ template_id: value })}
        >
          <SelectTrigger id="template-select" className="w-full">
            <SelectValue placeholder="Selecione um template" />
          </SelectTrigger>
          <SelectContent>
            {templateOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço de Venda (R$)</Label>
          <Input 
            id="price" 
            value={templateData.price || ''} 
            onChange={(e) => onUpdate({ price: e.target.value })} 
            placeholder="197.00" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="original-price">Preço Original (R$)</Label>
          <Input 
            id="original-price" 
            value={templateData.originalPrice || ''} 
            onChange={(e) => onUpdate({ originalPrice: e.target.value })} 
            placeholder="297.00" 
          />
        </div>
      </div>

      {templateData.template_id === 'product_vsl' && (
        <div className="space-y-2">
          <Label htmlFor="video-url">URL do Vídeo (VSL)</Label>
          <Input id="video-url" value={templateData.videoUrl} onChange={(e) => onUpdate({ videoUrl: e.target.value })} placeholder="https://youtube.com/..." />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="cta-button-text">Texto do Botão CTA</Label>
        <Input id="cta-button-text" value={templateData.ctaButtonText} onChange={(e) => onUpdate({ ctaButtonText: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guarantee-text">Texto da Garantia</Label>
        <Textarea id="guarantee-text" value={templateData.guaranteeText} onChange={(e) => onUpdate({ guaranteeText: e.target.value })} rows={3} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Benefícios</Label>
          <Button variant="outline" size="sm" onClick={() => onUpdate({ productBenefits: [...(templateData.productBenefits || []), ''] })}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {(templateData.productBenefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input value={benefit} onChange={(e) => {
                const newBenefits = [...(templateData.productBenefits || [])];
                newBenefits[index] = e.target.value;
                onUpdate({ productBenefits: newBenefits });
              }} />
              <Button variant="ghost" size="icon" onClick={() => {
                const newBenefits = (templateData.productBenefits || []).filter((_, i) => i !== index);
                onUpdate({ productBenefits: newBenefits });
              }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductConfigTab;