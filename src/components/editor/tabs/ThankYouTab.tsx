import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2 } from 'lucide-react';

interface ThankYouTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const ThankYouTab = ({ templateData, onUpdate }: ThankYouTabProps) => {
  const config = templateData.thankYouPage;

  const updateConfig = (updates: Partial<typeof config>) => {
    onUpdate({
      thankYouPage: { ...config, ...updates }
    });
  };

  const addStep = () => {
    const steps = config.nextSteps || [];
    updateConfig({ nextSteps: [...steps, 'Novo passo'] });
  };

  const updateStep = (index: number, value: string) => {
    const steps = [...(config.nextSteps || [])];
    steps[index] = value;
    updateConfig({ nextSteps: steps });
  };

  const removeStep = (index: number) => {
    const steps = (config.nextSteps || []).filter((_, i) => i !== index);
    updateConfig({ nextSteps: steps });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Página de Obrigado</CardTitle>
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
              placeholder="Pedido Confirmado!"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Subtítulo</Label>
            <Input
              value={config.subtitle || ''}
              onChange={(e) => updateConfig({ subtitle: e.target.value })}
              placeholder="Você receberá um email em breve"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Mensagem</Label>
            <Textarea
              value={config.message}
              onChange={(e) => updateConfig({ message: e.target.value })}
              placeholder="Obrigado por confiar em nós..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Texto do Botão</Label>
            <Input
              value={config.ctaText}
              onChange={(e) => updateConfig({ ctaText: e.target.value })}
              placeholder="Continuar"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">URL de Redirecionamento (opcional)</Label>
            <Input
              value={config.redirectUrl}
              onChange={(e) => updateConfig({ redirectUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Próximos Passos</CardTitle>
            <Button size="sm" variant="outline" onClick={addStep}>
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {(config.nextSteps || []).map((step, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={step}
                onChange={(e) => updateStep(index, e.target.value)}
                placeholder={`Passo ${index + 1}`}
              />
              <Button size="icon" variant="ghost" onClick={() => removeStep(index)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {(!config.nextSteps || config.nextSteps.length === 0) && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Nenhum passo adicionado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouTab;
