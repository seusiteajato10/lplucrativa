import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2, Globe, MessageCircle, Mail, Instagram, Facebook, Twitter, Youtube, Info, Shield, Scale } from 'lucide-react';
import { getTemplateOptionsForNiche } from '@/types/project';
import { Separator } from '@/components/ui/separator';

interface ProductConfigTabProps {
  templateData: TemplateData & { template_id?: string };
  onUpdate: (updates: Partial<TemplateData & { template_id?: string }>) => void;
}

const ProductConfigTab = ({ templateData, onUpdate }: ProductConfigTabProps) => {
  const templateOptions = getTemplateOptionsForNiche('product');

  const updateFooter = (updates: any) => {
    onUpdate({
      footer: {
        ...(templateData.footer || {}),
        ...updates
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Template e Preço */}
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

        <div className="space-y-2">
          <Label htmlFor="guarantee-text">Texto da Garantia</Label>
          <Textarea id="guarantee-text" value={templateData.guaranteeText} onChange={(e) => onUpdate({ guaranteeText: e.target.value })} rows={3} />
        </div>
      </div>

      <Separator />

      {/* Seção Rodapé */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
            <Info className="w-4 h-4" /> Rodapé da Página
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Empresa</Label>
              <Input 
                value={templateData.footer?.companyName || ''} 
                onChange={(e) => updateFooter({ companyName: e.target.value })}
                placeholder="Ex: Minha Loja Premium"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição Curta</Label>
              <Textarea 
                value={templateData.footer?.companyDescription || ''} 
                onChange={(e) => updateFooter({ companyDescription: e.target.value })}
                placeholder="Ex: Sua loja de produtos premium..."
                maxLength={100}
                rows={2}
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Mail className="w-3 h-3" /> Contato
          </h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-[10px]">Email</Label>
              <Input 
                value={templateData.footer?.email || ''} 
                onChange={(e) => updateFooter({ email: e.target.value })}
                placeholder="email@empresa.com"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Telefone / WhatsApp</Label>
              <Input 
                value={templateData.footer?.phone || ''} 
                onChange={(e) => updateFooter({ phone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Horário de Atendimento</Label>
              <Input 
                value={templateData.footer?.workingHours || ''} 
                onChange={(e) => updateFooter({ workingHours: e.target.value })}
                placeholder="Seg a Sex: 09h às 18h"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Globe className="w-3 h-3" /> Redes Sociais
          </h4>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 border rounded bg-muted">
                <Instagram className="w-4 h-4" />
              </div>
              <Input 
                value={templateData.footer?.socialInstagram || ''} 
                onChange={(e) => updateFooter({ socialInstagram: e.target.value })}
                placeholder="URL Instagram"
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 border rounded bg-muted">
                <Facebook className="w-4 h-4" />
              </div>
              <Input 
                value={templateData.footer?.socialFacebook || ''} 
                onChange={(e) => updateFooter({ socialFacebook: e.target.value })}
                placeholder="URL Facebook"
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 border rounded bg-muted">
                <Youtube className="w-4 h-4" />
              </div>
              <Input 
                value={templateData.footer?.socialYoutube || ''} 
                onChange={(e) => updateFooter({ socialYoutube: e.target.value })}
                placeholder="URL YouTube"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Scale className="w-3 h-3" /> Links Institucionais
          </h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-[10px]">Link "Sobre Nós"</Label>
              <Input 
                value={templateData.footer?.linkAbout || ''} 
                onChange={(e) => updateFooter({ linkAbout: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Link "Privacidade"</Label>
              <Input 
                value={templateData.footer?.linkPrivacy || ''} 
                onChange={(e) => updateFooter({ linkPrivacy: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigTab;