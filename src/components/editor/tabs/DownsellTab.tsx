import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2 } from 'lucide-react';

interface DownsellTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const DownsellTab = ({ templateData, onUpdate }: DownsellTabProps) => {
  const config = templateData.downsellPage;

  const updateConfig = (updates: Partial<typeof config>) => {
    onUpdate({
      downsellPage: { ...config, ...updates }
    });
  };

  const addBenefit = () => {
    const benefits = config.benefits || [];
    updateConfig({ benefits: [...benefits, 'Novo benefício'] });
  };

  const updateBenefit = (index: number, value: string) => {
    const benefits = [...(config.benefits || [])];
    benefits[index] = value;
    updateConfig({ benefits });
  };

  const removeBenefit = (index: number) => {
    const benefits = (config.benefits || []).filter((_, i) => i !== index);
    updateConfig({ benefits });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Página de Downsell</CardTitle>
            <Switch
              checked={config.enabled}
              onCheckedChange={(enabled) => updateConfig({ enabled })}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">Título</Label>
            <Input
              value={config.title}
              onChange={(e) => updateConfig({ title: e.target.value })}
              placeholder="Última Chance!"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Subtítulo</Label>
            <Input
              value={config.subtitle}
              onChange={(e) => updateConfig({ subtitle: e.target.value })}
              placeholder="Que tal uma opção mais acessível?"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Nome do Produto</Label>
            <Input
              value={config.productName}
              onChange={(e) => updateConfig({ productName: e.target.value })}
              placeholder="Versão Básica"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Preço</Label>
            <Input
              value={config.price}
              onChange={(e) => updateConfig({ price: e.target.value })}
              placeholder="R$ 97"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-xs">Botão Aceitar</Label>
              <Input
                value={config.ctaAcceptText}
                onChange={(e) => updateConfig({ ctaAcceptText: e.target.value })}
                placeholder="Quero Esta Oferta!"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Botão Recusar</Label>
              <Input
                value={config.ctaDeclineText}
                onChange={(e) => updateConfig({ ctaDeclineText: e.target.value })}
                placeholder="Não, obrigado"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Benefícios</CardTitle>
            <Button size="sm" variant="outline" onClick={addBenefit}>
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {(config.benefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
              />
              <Button size="icon" variant="ghost" onClick={() => removeBenefit(index)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {(!config.benefits || config.benefits.length === 0) && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Nenhum benefício adicionado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DownsellTab;
