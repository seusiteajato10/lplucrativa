import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';

interface ProductSalesTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const ProductSalesTab = ({ templateData, onUpdate }: ProductSalesTabProps) => {
  const addProductBenefit = () => {
    const benefits = templateData.productBenefits || [];
    onUpdate({ productBenefits: [...benefits, 'Novo benefício do produto'] });
  };

  const updateProductBenefit = (index: number, value: string) => {
    const benefits = [...(templateData.productBenefits || [])];
    benefits[index] = value;
    onUpdate({ productBenefits: benefits });
  };

  const removeProductBenefit = (index: number) => {
    const benefits = (templateData.productBenefits || []).filter((_, i) => i !== index);
    onUpdate({ productBenefits: benefits });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
        <ShoppingCart className="w-4 h-4" /> Configurações de Vendas do Produto
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço de Venda (R$)</Label>
          <Input id="price" value={templateData.price || ''} onChange={(e) => onUpdate({ price: e.target.value })} placeholder="197.00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="original-price">Preço Original (R$)</Label>
          <Input id="original-price" value={templateData.originalPrice || ''} onChange={(e) => onUpdate({ originalPrice: e.target.value })} placeholder="297.00" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guarantee-text">Texto da Garantia</Label>
        <Textarea id="guarantee-text" value={templateData.guaranteeText} onChange={(e) => onUpdate({ guaranteeText: e.target.value })} rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Estoque Disponível</Label>
        <Input id="stock" type="number" value={templateData.stock || ''} onChange={(e) => onUpdate({ stock: parseInt(e.target.value) || 0 })} placeholder="47" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Benefícios do Produto</Label>
          <Button variant="outline" size="sm" onClick={addProductBenefit}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {(templateData.productBenefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={benefit}
                onChange={(e) => updateProductBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
              />
              <Button variant="ghost" size="icon" onClick={() => removeProductBenefit(index)}>
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

export default ProductSalesTab;