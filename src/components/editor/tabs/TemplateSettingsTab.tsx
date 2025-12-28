import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function TemplateSettingsTab({ templateData, onUpdate, projectType, projectNiche, projectId }: any) {
  const [funnelEnabled, setFunnelEnabled] = useState(templateData?.funnelEnabled || false);
  const [selectedDestination, setSelectedDestination] = useState(templateData?.selectedDestination || "");
  const [waitTime, setWaitTime] = useState(templateData?.waitTime || 3);

  useEffect(() => {
    setFunnelEnabled(templateData?.funnelEnabled || false);
    setSelectedDestination(templateData?.selectedDestination || "");
    setWaitTime(templateData?.waitTime || 3);
  }, [templateData]);

  const handleFunnelToggle = (enabled: boolean) => {
    setFunnelEnabled(enabled);
    onUpdate({ funnelEnabled: enabled });
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    onUpdate({ selectedDestination: value });
  };

  const handleWaitTimeChange = (e: any) => {
    const value = parseInt(e.target.value) || 3;
    setWaitTime(value);
    onUpdate({ waitTime: value });
  };

  return (
    <div className="space-y-6">
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Template da Pagina</h4>
        <div>
          <Label className="text-xs text-muted-foreground">Escolha o Template</Label>
          <Select defaultValue="standard">
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Padrao</SelectItem>
              <SelectItem value="vsl">VSL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">Funil Conectado</h4>
            <p className="text-xs text-muted-foreground mt-1">Redirecione a lead para sua pagina de vendas apos a captura.</p>
          </div>
          <Switch checked={funnelEnabled} onCheckedChange={handleFunnelToggle} />
        </div>

        {funnelEnabled && (
          <div className="space-y-3 pl-4 border-l-2 border-primary/20">
            <div>
              <Label className="text-xs text-muted-foreground">Pagina de Vendas (Destino)</Label>
              <Select value={selectedDestination} onValueChange={handleDestinationChange}>
                <SelectTrigger><SelectValue placeholder="Selecione o projeto" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={projectId || "current"}>Produto XX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Aguardar (segundos)</Label>
              <Input type="number" min="0" max="60" value={waitTime} onChange={handleWaitTimeChange} placeholder="3" />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-3 border-t">
        <h4 className="text-sm font-medium">Configuracoes de Vendas</h4>
        <div>
          <Label className="text-xs text-muted-foreground">Preco Atual</Label>
          <Input type="text" value={templateData?.currentPrice || "197,00"} onChange={(e) => onUpdate({ currentPrice: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Preco Original</Label>
          <Input type="text" value={templateData?.originalPrice || "497,00"} onChange={(e) => onUpdate({ originalPrice: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Garantia</Label>
          <Input type="text" value={templateData?.warranty || "7 dias"} onChange={(e) => onUpdate({ warranty: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Estoque Disponivel</Label>
          <Input type="number" value={templateData?.stock || "50"} onChange={(e) => onUpdate({ stock: e.target.value })} />
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t">
        <h4 className="text-sm font-medium">Rodape</h4>
        <div>
          <Label className="text-xs text-muted-foreground">Nome da Empresa</Label>
          <Input type="text" value={templateData?.companyName || ""} onChange={(e) => onUpdate({ companyName: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Email de Contato</Label>
          <Input type="email" value={templateData?.contactEmail || ""} onChange={(e) => onUpdate({ contactEmail: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">WhatsApp</Label>
          <Input type="tel" value={templateData?.whatsapp || ""} onChange={(e) => onUpdate({ whatsapp: e.target.value })} />
        </div>
      </div>

    </div>
  );
}
