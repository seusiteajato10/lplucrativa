import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function TemplateSettingsTab({ templateData, onUpdate }: any) {
  const funnel = templateData?.funnel || {};
  const [funnelEnabled, setFunnelEnabled] = useState(funnel?.enabled || false);

  useEffect(() => {
    setFunnelEnabled(templateData?.funnel?.enabled || false);
  }, [templateData]);

  const updateFunnel = (updates: any) => {
    onUpdate({
      funnel: {
        ...funnel,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <h4 className="text-sm font-medium">Funil Conectado</h4>
          <p className="text-xs text-muted-foreground mt-1">Configure o fluxo completo de vendas</p>
        </div>
        <Switch 
          checked={funnelEnabled} 
          onCheckedChange={(enabled) => {
            setFunnelEnabled(enabled);
            updateFunnel({ enabled });
          }} 
        />
      </div>

      {funnelEnabled && (
        <div className="space-y-4">
          
          {/* ATIVAR CAPTURA */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Página de Captura</Label>
              <p className="text-xs text-muted-foreground">Capturar lead antes da venda</p>
            </div>
            <Switch 
              checked={funnel?.hasLeadCapture || false} 
              onCheckedChange={(value) => updateFunnel({ hasLeadCapture: value })}
            />
          </div>

          {/* ATIVAR UPSELL */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Página de Upsell</Label>
              <p className="text-xs text-muted-foreground">Oferta adicional após a compra</p>
            </div>
            <Switch 
              checked={funnel?.hasUpsell || false} 
              onCheckedChange={(value) => updateFunnel({ hasUpsell: value })}
            />
          </div>

          {/* ATIVAR DOWNSELL */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Página de Downsell</Label>
              <p className="text-xs text-muted-foreground">Oferta alternativa caso recuse o upsell</p>
            </div>
            <Switch 
              checked={funnel?.hasDownsell || false} 
              onCheckedChange={(value) => updateFunnel({ hasDownsell: value })}
            />
          </div>

          {/* ATIVAR THANK YOU */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Página de Obrigado</Label>
              <p className="text-xs text-muted-foreground">Página final de confirmação</p>
            </div>
            <Switch 
              checked={funnel?.hasThankYou || false} 
              onCheckedChange={(value) => updateFunnel({ hasThankYou: value })}
            />
          </div>

          <Tabs defaultValue="capture" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-5 text-xs">
              <TabsTrigger value="capture" disabled={!funnel?.hasLeadCapture}>
                Captura
              </TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
              <TabsTrigger value="upsell" disabled={!funnel?.hasUpsell}>
                Upsell
              </TabsTrigger>
              <TabsTrigger value="downsell" disabled={!funnel?.hasDownsell}>
                Downsell
              </TabsTrigger>
              <TabsTrigger value="thankyou" disabled={!funnel?.hasThankYou}>
                Obrigado
              </TabsTrigger>
            </TabsList>

            <TabsContent value="capture" className="space-y-4 mt-4">
              <h4 className="font-semibold text-sm">Página de Captura</h4>
              
              <div>
                <Label className="text-xs text-muted-foreground">Template</Label>
                <Select 
                  value={funnel?.leadCaptureTemplate || "LeadCaptureDiscount"} 
                  onValueChange={(value) => updateFunnel({ leadCaptureTemplate: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Escolha o template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LeadCaptureDiscount">Desconto Exclusivo</SelectItem>
                    <SelectItem value="LeadCaptureEbook">E-book Gratuito</SelectItem>
                    <SelectItem value="LeadCaptureQuiz">Quiz Interativo</SelectItem>
                    <SelectItem value="LeadCaptureVSL">Video + Captura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Título</Label>
                <Input 
                  value={funnel?.capture_title || ""} 
                  onChange={(e) => updateFunnel({ capture_title: e.target.value })}
                  placeholder="Ganhe 50% de Desconto Agora!"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Subtítulo</Label>
                <Input 
                  value={funnel?.capture_subtitle || ""} 
                  onChange={(e) => updateFunnel({ capture_subtitle: e.target.value })}
                  placeholder="Preencha o formulário e receba sua oferta exclusiva"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão</Label>
                <Input 
                  value={funnel?.capture_button || ""} 
                  onChange={(e) => updateFunnel({ capture_button: e.target.value })}
                  placeholder="QUERO MEU DESCONTO"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Aguardar antes de redirecionar (segundos)</Label>
                <Input 
                  type="number" 
                  min="0" 
                  max="60" 
                  value={funnel?.capture_waitTime || 3} 
                  onChange={(e) => updateFunnel({ capture_waitTime: parseInt(e.target.value) || 3 })}
                />
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4 mt-4">
              <h4 className="font-semibold text-sm">Página de Vendas</h4>
              
              <div>
                <Label className="text-xs text-muted-foreground">Template</Label>
                <Select 
                  value={funnel?.salesPageTemplate || "ProductTemplate"} 
                  onValueChange={(value) => updateFunnel({ salesPageTemplate: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Escolha o template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ProductTemplate">Produto (Padrão)</SelectItem>
                    <SelectItem value="ProductTemplateVSL">Produto (Com VSL)</SelectItem>
                    <SelectItem value="ServiceTemplate">Serviço/Consultoria</SelectItem>
                    <SelectItem value="CourseTemplate">Curso Online</SelectItem>
                    <SelectItem value="EventTemplate">Evento/Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Nome do Produto</Label>
                <Input 
                  value={funnel?.productName || ""} 
                  onChange={(e) => updateFunnel({ productName: e.target.value })}
                  placeholder="Meu Produto Incrível"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Descrição</Label>
                <Input 
                  value={funnel?.productDescription || ""} 
                  onChange={(e) => updateFunnel({ productDescription: e.target.value })}
                  placeholder="Transforme sua vida com este produto"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço Atual</Label>
                <Input 
                  value={funnel?.currentPrice || "197,00"} 
                  onChange={(e) => updateFunnel({ currentPrice: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço Original (De:)</Label>
                <Input 
                  value={funnel?.originalPrice || "497,00"} 
                  onChange={(e) => updateFunnel({ originalPrice: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Garantia</Label>
                <Input 
                  value={funnel?.warranty || "7 dias"} 
                  onChange={(e) => updateFunnel({ warranty: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão</Label>
                <Input 
                  value={funnel?.sales_button || ""} 
                  onChange={(e) => updateFunnel({ sales_button: e.target.value })}
                  placeholder="COMPRAR AGORA"
                />
              </div>
            </TabsContent>

            <TabsContent value="upsell" className="space-y-4 mt-4">
              <h4 className="font-semibold text-sm">Página de Upsell</h4>
              
              <div>
                <Label className="text-xs text-muted-foreground">Template</Label>
                <Select 
                  value={funnel?.upsellTemplate || "ProductUpsell"} 
                  onValueChange={(value) => updateFunnel({ upsellTemplate: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Escolha o template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ProductUpsell">Upsell de Produto</SelectItem>
                    <SelectItem value="ServiceUpsell">Upsell de Serviço</SelectItem>
                    <SelectItem value="EventUpsell">Upsell de Evento</SelectItem>
                    <SelectItem value="CourseUpsell">Upsell de Curso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Título da Oferta</Label>
                <Input 
                  value={funnel?.upsell_title || ""} 
                  onChange={(e) => updateFunnel({ upsell_title: e.target.value })}
                  placeholder="Espere! Temos Uma Oferta Especial"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Nome do Produto Upsell</Label>
                <Input 
                  value={funnel?.upsell_productName || ""} 
                  onChange={(e) => updateFunnel({ upsell_productName: e.target.value })}
                  placeholder="Produto Premium"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço do Upsell</Label>
                <Input 
                  value={funnel?.upsell_price || "247,00"} 
                  onChange={(e) => updateFunnel({ upsell_price: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço Original Upsell</Label>
                <Input 
                  value={funnel?.upsell_originalPrice || "497,00"} 
                  onChange={(e) => updateFunnel({ upsell_originalPrice: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão Aceitar</Label>
                <Input 
                  value={funnel?.upsell_acceptButton || ""} 
                  onChange={(e) => updateFunnel({ upsell_acceptButton: e.target.value })}
                  placeholder="SIM! QUERO APROVEITAR"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão Recusar</Label>
                <Input 
                  value={funnel?.upsell_declineButton || ""} 
                  onChange={(e) => updateFunnel({ upsell_declineButton: e.target.value })}
                  placeholder="Não, obrigado"
                />
              </div>
            </TabsContent>

            <TabsContent value="downsell" className="space-y-4 mt-4">
              <h4 className="font-semibold text-sm">Página de Downsell</h4>
              
              <div>
                <Label className="text-xs text-muted-foreground">Título</Label>
                <Input 
                  value={funnel?.downsell_title || ""} 
                  onChange={(e) => updateFunnel({ downsell_title: e.target.value })}
                  placeholder="Espere! Temos Uma Proposta Melhor"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Subtítulo</Label>
                <Input 
                  value={funnel?.downsell_subtitle || ""} 
                  onChange={(e) => updateFunnel({ downsell_subtitle: e.target.value })}
                  placeholder="Que tal começar com uma versão mais acessível?"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço do Downsell</Label>
                <Input 
                  value={funnel?.downsell_price || "97,00"} 
                  onChange={(e) => updateFunnel({ downsell_price: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Preço Original (mostrar desconto)</Label>
                <Input 
                  value={funnel?.downsell_originalPrice || "197,00"} 
                  onChange={(e) => updateFunnel({ downsell_originalPrice: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão</Label>
                <Input 
                  value={funnel?.downsell_button || ""} 
                  onChange={(e) => updateFunnel({ downsell_button: e.target.value })}
                  placeholder="SIM! ACEITO ESTA OFERTA"
                />
              </div>
            </TabsContent>

            <TabsContent value="thankyou" className="space-y-4 mt-4">
              <h4 className="font-semibold text-sm">Página de Obrigado</h4>
              
              <div>
                <Label className="text-xs text-muted-foreground">Template</Label>
                <Select 
                  value={funnel?.thankyouTemplate || "ProductThankYou"} 
                  onValueChange={(value) => updateFunnel({ thankyouTemplate: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Escolha o template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ProductThankYou">Obrigado - Produto</SelectItem>
                    <SelectItem value="ServiceThankYou">Obrigado - Serviço</SelectItem>
                    <SelectItem value="EventThankYou">Obrigado - Evento</SelectItem>
                    <SelectItem value="CourseThankYou">Obrigado - Curso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Título</Label>
                <Input 
                  value={funnel?.thankyou_title || ""} 
                  onChange={(e) => updateFunnel({ thankyou_title: e.target.value })}
                  placeholder="Parabéns! Sua Compra Foi Confirmada"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Mensagem</Label>
                <Input 
                  value={funnel?.thankyou_message || ""} 
                  onChange={(e) => updateFunnel({ thankyou_message: e.target.value })}
                  placeholder="Enviamos um e-mail com todas as informações"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Texto do Botão Principal</Label>
                <Input 
                  value={funnel?.thankyou_button || ""} 
                  onChange={(e) => updateFunnel({ thankyou_button: e.target.value })}
                  placeholder="ACESSAR ÁREA DE MEMBROS"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <div className="space-y-3 pt-3 border-t">
        <h4 className="text-sm font-medium">Rodapé (Global)</h4>
        <div>
          <Label className="text-xs text-muted-foreground">Nome da Empresa</Label>
          <Input 
            value={funnel?.companyName || ""} 
            onChange={(e) => updateFunnel({ companyName: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Email de Contato</Label>
          <Input 
            type="email" 
            value={funnel?.contactEmail || ""} 
            onChange={(e) => updateFunnel({ contactEmail: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">WhatsApp</Label>
          <Input 
            type="tel" 
            value={funnel?.whatsapp || ""} 
            onChange={(e) => updateFunnel({ whatsapp: e.target.value })}
          />
        </div>
      </div>

    </div>
  );
}
