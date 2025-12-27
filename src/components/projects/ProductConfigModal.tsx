import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { useProductConfig } from '@/hooks/useProductConfig';
import { getTemplateOptionsForNiche } from '@/types/project';
import { toast } from 'sonner';

interface ProductConfigModalProps {
  projectId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductConfigModal({ projectId, open, onOpenChange }: ProductConfigModalProps) {
  const { config, updateConfig, saveConfig, isSaving, isLoading, projectNiche } = useProductConfig(projectId);
  const [localBenefits, setLocalBenefits] = useState<string[]>([]);

  useEffect(() => {
    if (config.productBenefits) {
      setLocalBenefits(config.productBenefits);
    }
  }, [config.productBenefits]);

  const handleAddBenefit = () => {
    setLocalBenefits(prev => [...prev, '']);
  };

  const handleUpdateBenefit = (index: number, value: string) => {
    setLocalBenefits(prev => {
      const newBenefits = [...prev];
      newBenefits[index] = value;
      return newBenefits;
    });
  };

  const handleRemoveBenefit = (index: number) => {
    setLocalBenefits(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await saveConfig({ ...config, productBenefits: localBenefits });
      onOpenChange(false);
    } catch (error) {
      // Error handled by useProductConfig hook (toast)
    }
  };

  const templateOptions = projectNiche ? getTemplateOptionsForNiche(projectNiche) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurações do Produto</DialogTitle>
          <DialogDescription>
            Personalize o template e os detalhes do seu produto.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-2">Carregando configurações...</p>
          </div>
        ) : (
          <div className="grid gap-6 py-4">
            {/* Template Selection */}
            <div className="space-y-2">
              <Label htmlFor="template-select">Template do Produto</Label>
              <Select
                value={config.template_id}
                onValueChange={(value) => updateConfig({ template_id: value })}
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
            {config.template_id === 'product_vsl' && (
              <div className="space-y-2">
                <Label htmlFor="video-url">URL do Vídeo (VSL)</Label>
                <Input
                  id="video-url"
                  value={config.videoUrl}
                  onChange={(e) => updateConfig({ videoUrl: e.target.value })}
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
                value={config.ctaButtonText}
                onChange={(e) => updateConfig({ ctaButtonText: e.target.value })}
                placeholder="Quero Comprar Agora!"
              />
            </div>

            {/* Original Price */}
            <div className="space-y-2">
              <Label htmlFor="original-price">Preço Original (para mostrar desconto)</Label>
              <Input
                id="original-price"
                value={config.originalPrice}
                onChange={(e) => updateConfig({ originalPrice: e.target.value })}
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
                value={config.guaranteeText}
                onChange={(e) => updateConfig({ guaranteeText: e.target.value })}
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
                {localBenefits.map((benefit, index) => (
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
                {localBenefits.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Nenhum benefício adicionado.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}