import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2 } from 'lucide-react';
import { getTemplateOptionsForNiche } from '@/types/project';

interface ProductConfigTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const ProductConfigTab = ({ templateData, onUpdate }: ProductConfigTabProps) => {
  const templateOptions = getTemplateOptionsForNiche('product');

  const handleAddBenefit = () => {
    const newBenefits = [...(templateData.productBenefits || []), ''];
    onUpdate({ productBenefits: newBenefits });
  };

  const handleUpdateBenefit = (index: number, value: string) => {
    const newBenefits = [...(templateData.productBenefits || [])];
    newBenefits[index] = value;
    onUpdate({ productBenefits: newBenefits });
  };

  const handleRemoveBenefit = (index: number) => {
    const newBenefits = (templateData.productBenefits || []).filter((_, i) => i !== index);
    onUpdate({ productBenefits: newBenefits });
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-2">
        <Label htmlFor="template-select">Template do Produto</Label>
        <Select
          value={templateData.template_id}
          onValueChange={(value) => onUpdate({ template_id: value })}
        >
          <SelectTrigger id="template-select">
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

      {/* Video URL (conditionally rendered for VSL) */}
      {templateData.template_id === 'product_vsl' && (
        <div className="space-y-2">
          <Label htmlFor="video-url">URL do Vídeo (VSL)</Label>
          <Input
            id="video-url"
            value={templateData.videoUrl}
            onChange={(e) => onUpdate({ videoUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="text-sm text-muted-foreground">
            Cole o link do YouTube ou Vimeo para o seu vídeo de vendas.
          </p>
        </div>
      )}

      {/* CTA Button Text */}
      <div className="space-y-2">
        <Label htmlFor="cta-button-text">Texto do Botão CTA</Label>
        <Input
          id="cta-button-text"
          value={templateData.ctaButtonText}
          onChange={(e) => onUpdate({ ctaButtonText: e.target.value })}
          placeholder="Quero Comprar Agora!"
        />
      </div>

      {/* Original Price */}
      <div className="space-y-2">
        <Label htmlFor="original-price">Preço Original (para mostrar desconto)</Label>
        <Input
          id="original-price"
          value={templateData.originalPrice || ''}
          onChange={(e) => onUpdate({ originalPrice: e.target.value })}
          placeholder="R$ 297,00"
        />
        <p className="text-sm text-muted-foreground">
          Ex: "R$ 297,00" para exibir um preço riscado.
        </p>
      </div>

      {/* Guarantee Text */}
      <div className="space-y-2">
        <Label htmlFor="guarantee-text">Texto da Garantia</Label>
        <Textarea
          id="guarantee-text"
          value={templateData.guaranteeText}
          onChange={(e) => onUpdate({ guaranteeText: e.target.value })}
          placeholder="Você tem 7 dias para testar..."
          rows={3}
        />
      </div>

      {/* Product Benefits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Benefícios do Produto</Label>
          <Button variant="outline" size="sm" onClick={handleAddBenefit}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {(templateData.productBenefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={benefit}
                onChange={(e) => handleUpdateBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
              />
              <Button variant="ghost" size="icon" onClick={() => handleRemoveBenefit(index)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {(!templateData.productBenefits || templateData.productBenefits.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-2">
              Nenhum benefício adicionado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductConfigTab;