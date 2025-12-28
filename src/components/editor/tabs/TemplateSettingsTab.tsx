import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateData } from "@/types/templateData";

interface TemplateSettingsTabProps {
  templateData: TemplateData;
  onUpdate: (data: Partial<TemplateData>) => void;
  projectType?: string;
  projectNiche?: string;
}

export default function TemplateSettingsTab({ 
  templateData, 
  onUpdate,
  projectType,
  projectNiche 
}: TemplateSettingsTabProps) {
  
  const isCapturePage = projectType === 'lead_only' || projectType === 'full_funnel';
  // Correção: 'produto' deve ser 'product' conforme o tipo ProjectNiche
  const isProductSalesPage = projectNiche === 'product' && projectType !== 'lead_only';

  return (
    <div className="space-y-4">
      
      {/* CARD: FUNIL CONECTADO */}
      {isCapturePage && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🔄 Funil Conectado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-semibold">Redirecionar após captura</Label>
                <p className="text-sm text-gray-600">
                  Enviar o lead para página de vendas automaticamente
                </p>
              </div>
              <Switch 
                checked={templateData.redirectAfterCapture?.enabled || false}
                onCheckedChange={(checked) => 
                  onUpdate({
                    redirectAfterCapture: {
                      ...templateData.redirectAfterCapture,
                      enabled: checked
                    }
                  })
                }
              />
            </div>

            {templateData.redirectAfterCapture?.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Página de Vendas (Destino)</Label>
                  <Select
                    value={templateData.redirectAfterCapture?.targetPageId || ''}
                    onValueChange={(value) =>
                      onUpdate({
                        redirectAfterCapture: {
                          ...templateData.redirectAfterCapture,
                          targetPageId: value,
                          enabled: true
                        }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha a página de vendas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produto-exemplo">Produto XX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Aguardar (segundos)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={templateData.redirectAfterCapture?.delay || 3}
                    onChange={(e) =>
                      onUpdate({
                        redirectAfterCapture: {
                          ...templateData.redirectAfterCapture,
                          delay: parseInt(e.target.value),
                          enabled: true
                        }
                      })
                    }
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* CARD: TEMPLATE DA PÁGINA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📄 Template da Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label>Escolha o Template</Label>
          <Select
            value={templateData.templateId || 'padrao'}
            onValueChange={(value) => onUpdate({ templateId: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="padrao">Padrão</SelectItem>
              <SelectItem value="moderno">Moderno</SelectItem>
              <SelectItem value="classico">Clássico</SelectItem>
              <SelectItem value="vsl">VSL</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* CARD: CONFIGURAÇÕES DE CAPTURA */}
      {isCapturePage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📝 Configurações da Página de Captura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título da Isca</Label>
              <Input
                value={templateData.leadCapture?.headline || ''}
                onChange={(e) =>
                  onUpdate({
                    leadCapture: {
                      ...templateData.leadCapture,
                      headline: e.target.value
                    }
                  })
                }
                placeholder="Ex: Ganhe 10% OFF Agora"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={templateData.leadCapture?.subheadline || ''}
                onChange={(e) =>
                  onUpdate({
                    leadCapture: {
                      ...templateData.leadCapture,
                      subheadline: e.target.value
                    }
                  })
                }
                placeholder="Cadastre-se e receba benefícios exclusivos"
              />
            </div>

            <div className="space-y-2">
              <Label>Texto do Botão</Label>
              <Input
                value={templateData.leadCapture?.ctaText || 'QUERO RECEBER'}
                onChange={(e) =>
                  onUpdate({
                    leadCapture: {
                      ...templateData.leadCapture,
                      ctaText: e.target.value
                    }
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* CARD: CONFIGURAÇÕES DE VENDAS */}
      {isProductSalesPage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💰 Configurações de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Preço Atual</Label>
              <Input
                type="number"
                value={templateData.price || 0}
                onChange={(e) =>
                  onUpdate({
                    price: parseFloat(e.target.value)
                  })
                }
                placeholder="197.00"
              />
            </div>

            <div className="space-y-2">
              <Label>Preço Original</Label>
              <Input
                type="number"
                value={templateData.originalPrice || 0}
                onChange={(e) =>
                  onUpdate({
                    originalPrice: parseFloat(e.target.value)
                  })
                }
                placeholder="297.00"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* CARD: RODAPÉ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔗 Rodapé</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome da Empresa</Label>
            <Input
              value={templateData.footer?.companyName || ''}
              onChange={(e) =>
                onUpdate({
                  footer: {
                    ...templateData.footer,
                    companyName: e.target.value
                  }
                })
              }
              placeholder="Minha Empresa"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={templateData.footer?.email || ''}
              onChange={(e) =>
                onUpdate({
                  footer: {
                    ...templateData.footer,
                    email: e.target.value
                  }
                })
              }
              placeholder="contato@exemplo.com"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}