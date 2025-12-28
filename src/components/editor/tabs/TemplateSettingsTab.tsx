import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const isProductSalesPage = projectNiche === 'produto' && projectType !== 'lead_only';

  return (
    <div className="space-y-6">
      
      {/* SEÇÃO: FUNIL CONECTADO */}
      {isCapturePage && (
        <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
          <h3 className="font-bold text-lg">🔄 Funil Conectado</h3>
          
          <div className="flex items-center justify-between">
            <div>
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
                    {/* Lista de projetos será carregada dinamicamente */}
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
                <p className="text-xs text-gray-500">
                  Tempo antes de redirecionar para a página de vendas
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* SEÇÃO: CONFIGURAÇÕES DE CAPTURA */}
      {isCapturePage && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">📝 Configurações da Página de Captura</h3>
          
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

          <div className="space-y-2">
            <Label>URL da Imagem (E-book/Produto)</Label>
            <Input
              value={templateData.leadCapture?.ebookCoverUrl || ''}
              onChange={(e) =>
                onUpdate({
                  leadCapture: {
                    ...templateData.leadCapture,
                    ebookCoverUrl: e.target.value
                  }
                })
              }
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label>URL do Vídeo (opcional)</Label>
            <Input
              value={templateData.leadCapture?.videoUrl || ''}
              onChange={(e) =>
                onUpdate({
                  leadCapture: {
                    ...templateData.leadCapture,
                    videoUrl: e.target.value
                  }
                })
              }
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      )}

      {/* SEÇÃO: CONFIGURAÇÕES DE VENDAS */}
      {isProductSalesPage && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">💰 Configurações de Vendas</h3>
          
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
            <Label>Preço Original (De:)</Label>
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

          <div className="space-y-2">
            <Label>Garantia</Label>
            <Input
              value={templateData.garantia || 'Garantia de 12 meses'}
              onChange={(e) =>
                onUpdate({
                  garantia: e.target.value
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Estoque Disponível</Label>
            <Input
              type="number"
              value={templateData.estoque || 47}
              onChange={(e) =>
                onUpdate({
                  estoque: parseInt(e.target.value)
                })
              }
            />
          </div>
        </div>
      )}

      {/* RODAPÉ */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-bold text-lg">🔗 Rodapé</h3>
        
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
          <Label>Email de Contato</Label>
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

        <div className="space-y-2">
          <Label>WhatsApp</Label>
          <Input
            value={templateData.footer?.phone || ''}
            onChange={(e) =>
              onUpdate({
                footer: {
                  ...templateData.footer,
                  phone: e.target.value
                }
              })
            }
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>
    </div>
  );
}
