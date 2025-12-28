import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateData } from "@/types/templateData";
import { useProjects } from "@/contexts/ProjectsContext";

interface TemplateSettingsTabProps {
  templateData: TemplateData;
  onUpdate: (data: Partial<TemplateData>) => void;
  projectType?: string;
  projectNiche?: string;
  projectId?: string;
}

export default function TemplateSettingsTab({ 
  templateData, 
  onUpdate,
  projectType,
  projectNiche,
  projectId
}: TemplateSettingsTabProps) {
  
  const { projects } = useProjects();
  
  const isCapturePage = projectType === 'lead_only' || projectType === 'full_funnel';
  const isProductSalesPage = projectNiche === 'product' && projectType !== 'lead_only';
  
  const salesPageProjects = projects.filter(p => 
    p.id !== projectId && 
    (p.project_type === 'sales_only' || p.funnel_position === 'sales')
  );

  return (
    <div className="space-y-4">
      
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
                  Redirecione o lead para sua página de vendas imediatamente após a captura
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
                      {salesPageProjects.length > 0 ? (
                        salesPageProjects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="sem-projetos" disabled>
                          Nenhuma página de vendas disponível
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Escolha para qual página o lead será redirecionado após preencher o formulário
                  </p>
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
                          delay: parseInt(e.target.value) || 3,
                          enabled: true
                        }
                      })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Tempo de espera antes de redirecionar (0 = imediato)
                  </p>
                </div>
              </>
            )}
            
          </CardContent>
        </Card>
      )}

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
              {isCapturePage ? (
                <>
                  <SelectItem value="capture_ebook">E-book / Material Gratuito</SelectItem>
                  <SelectItem value="capture_vsl">Vídeo + Captura (VSL)</SelectItem>
                  <SelectItem value="capture_quiz">Quiz Interativo</SelectItem>
                  <SelectItem value="capture_discount">Cupom de Desconto</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="padrao">Padrão</SelectItem>
                  <SelectItem value="moderno">Moderno</SelectItem>
                  <SelectItem value="classico">Clássico</SelectItem>
                  <SelectItem value="vsl">VSL (Video Sales Letter)</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

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
                placeholder="Ex: Ganhe 10% OFF na Primeira Compra"
              />
            </div>

            <div className="space-y-2">
              <Label>Subtítulo / Descrição</Label>
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
                placeholder="Cadastre-se agora e receba um cupom exclusivo por email"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Texto do Botão CTA</Label>
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
                placeholder="QUERO RECEBER"
              />
            </div>

            <div className="space-y-2">
              <Label>URL da Imagem (E-book/Produto)</Label>
              <Input
                type="url"
                value={templateData.leadCapture?.ebookCoverUrl || ''}
                onChange={(e) =>
                  onUpdate({
                    leadCapture: {
                      ...templateData.leadCapture,
                      ebookCoverUrl: e.target.value
                    }
                  })
                }
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>URL do Vídeo (YouTube/Vimeo - opcional)</Label>
              <Input
                type="url"
                value={templateData.leadCapture?.videoUrl || ''}
                onChange={(e) =>
                  onUpdate({
                    leadCapture: {
                      ...templateData.leadCapture,
                      videoUrl: e.target.value
                    }
                  })
                }
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

          </CardContent>
        </Card>
      )}

      {isProductSalesPage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💰 Configurações de Vendas do Produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço Atual (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={templateData.price || 0}
                  onChange={(e) =>
                    onUpdate({
                      price: parseFloat(e.target.value) || 0
                    })
                  }
                  placeholder="197.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Preço Original (De:)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={templateData.originalPrice || 0}
                  onChange={(e) =>
                    onUpdate({
                      originalPrice: parseFloat(e.target.value) || 0
                    })
                  }
                  placeholder="297.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Garantia</Label>
              <Input
                value={templateData.garantia || ''}
                onChange={(e) =>
                  onUpdate({
                    garantia: e.target.value
                  })
                }
                placeholder="Ex: 12 meses de garantia"
              />
            </div>

            <div className="space-y-2">
              <Label>Estoque Disponível</Label>
              <Input
                type="number"
                min="0"
                value={templateData.estoque || 0}
                onChange={(e) =>
                  onUpdate({
                    estoque: parseInt(e.target.value) || 0
                  })
                }
                placeholder="47"
              />
            </div>

          </CardContent>
        </Card>
      )}

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
              placeholder="Minha Empresa LTDA"
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
              placeholder="contato@minhaempresa.com"
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

        </CardContent>
      </Card>

    </div>
  );
}
