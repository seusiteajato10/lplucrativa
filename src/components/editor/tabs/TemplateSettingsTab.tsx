import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TemplateData, RedirectAfterCaptureConfig } from '@/types/templateData';
import { Info, Repeat, BookOpen, PlayCircle, HelpCircle, Ticket } from 'lucide-react';
import { getTemplateOptionsForNiche, ProjectType, ProjectNiche } from '@/types/project'; // Importar ProjectNiche
import { Separator } from '@/components/ui/separator';
import { useProjects } from '@/contexts/ProjectsContext';

interface TemplateSettingsTabProps {
  templateData: TemplateData; // templateData já contém template_id, niche e project_type
  onUpdate: (updates: Partial<TemplateData & { template_id?: string }>) => void;
}

const TemplateSettingsTab = ({ templateData, onUpdate }: TemplateSettingsTabProps) => {
  const { projects } = useProjects();
  const currentNiche = templateData.niche || 'product';
  const currentProjectType = templateData.project_type || 'sales_only';
  const templateOptions = getTemplateOptionsForNiche(currentNiche as ProjectNiche, currentProjectType as ProjectType);

  // Filtrar apenas páginas de vendas do usuário para o select de redirecionamento
  const salesPages = projects.filter(p => p.project_type === 'sales_only' || p.funnel_position === 'sales');

  const updateFooter = (updates: any) => {
    onUpdate({
      footer: {
        ...(templateData.footer || {}),
        ...updates
      }
    });
  };

  const updateRedirect = (updates: Partial<RedirectAfterCaptureConfig>) => {
    onUpdate({
      redirectAfterCapture: {
        ...(templateData.redirectAfterCapture || { enabled: false, targetPageId: '', delay: 3 }),
        ...updates
      }
    });
  };

  const updateLeadCapture = (updates: Partial<TemplateData['leadCapture']>) => {
    onUpdate({
      leadCapture: {
        ...(templateData.leadCapture || {}),
        ...updates
      }
    });
  };

  const isCapturePage = currentProjectType === 'lead_only' || currentProjectType === 'full_funnel';
  const isProductSalesPage = currentNiche === 'product' && currentProjectType === 'sales_only';

  const addLeadCaptureBenefit = () => {
    const benefits = templateData.leadCapture.benefits || [];
    updateLeadCapture({ benefits: [...benefits, 'Novo benefício'] });
  };

  const updateLeadCaptureBenefit = (index: number, value: string) => {
    const benefits = [...(templateData.leadCapture.benefits || [])];
    benefits[index] = value;
    updateLeadCapture({ benefits });
  };

  const removeLeadCaptureBenefit = (index: number) => {
    const benefits = (templateData.leadCapture.benefits || []).filter((_, i) => i !== index);
    updateLeadCapture({ benefits });
  };

  return (
    <div className="space-y-8">
      {/* Redirecionamento de Funil (Somente se for Lead Page) */}
      {isCapturePage && (
        <div className="space-y-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Repeat className="w-4 h-4 text-primary" /> Funil Conectado
            </h3>
            <Switch 
              checked={templateData.redirectAfterCapture?.enabled} 
              onCheckedChange={(checked) => updateRedirect({ enabled: checked })}
            />
          </div>
          
          <p className="text-[11px] text-muted-foreground">
            Redirecione o lead para sua página de vendas imediatamente após a captura.
          </p>

          {templateData.redirectAfterCapture?.enabled && (
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <Label className="text-[10px]">Página de Vendas (Destino)</Label>
                <Select 
                  value={templateData.redirectAfterCapture?.targetPageId} 
                  onValueChange={(v) => updateRedirect({ targetPageId: v })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Selecione a página" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesPages.map(page => (
                      <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Aguardar (segundos)</Label>
                <Input 
                  type="number" 
                  className="h-8 text-xs" 
                  value={templateData.redirectAfterCapture?.delay || 3} 
                  onChange={(e) => updateRedirect({ delay: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Template Selection */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template-select">Template da Página</Label>
          {isCapturePage ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {templateOptions.map((tpl) => (
                <button
                  key={tpl.value}
                  type="button"
                  onClick={() => onUpdate({ template_id: tpl.value })}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all gap-1 ${
                    templateData.template_id === tpl.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-border'
                  }`}
                >
                  {tpl.value === 'capture_ebook' && <BookOpen className="w-5 h-5 mb-1" />}
                  {tpl.value === 'capture_vsl' && <PlayCircle className="w-5 h-5 mb-1" />}
                  {tpl.value === 'capture_quiz' && <HelpCircle className="w-5 h-5 mb-1" />}
                  {tpl.value === 'capture_discount' && <Ticket className="w-5 h-5 mb-1" />}
                  <span className="text-[10px] font-medium text-center leading-tight">{tpl.label}</span>
                </button>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <Separator />

      {/* Rodapé (Mantido conforme anterior) */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
            <Info className="w-4 h-4" /> Rodapé da Página
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Empresa</Label>
              <Input value={templateData.footer?.companyName || ''} onChange={(e) => updateFooter({ companyName: e.target.value })} placeholder="Ex: Minha Loja" />
            </div>
            <div className="space-y-2">
              <Label>Descrição Curta</Label>
              <Textarea value={templateData.footer?.companyDescription || ''} onChange={(e) => updateFooter({ companyDescription: e.target.value })} placeholder="Ex: Sua loja..." maxLength={100} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email de Contato</Label>
                <Input type="email" value={templateData.footer?.email || ''} onChange={(e) => updateFooter({ email: e.target.value })} placeholder="contato@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label>Telefone de Contato</Label>
                <Input value={templateData.footer?.phone || ''} onChange={(e) => updateFooter({ phone: e.target.value })} placeholder="(XX) XXXX-XXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Horário de Funcionamento</Label>
              <Input value={templateData.footer?.workingHours || ''} onChange={(e) => updateFooter({ workingHours: e.target.value })} placeholder="Seg a Sex: 09h às 18h" />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input value={templateData.footer?.socialInstagram || ''} onChange={(e) => updateFooter({ socialInstagram: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input value={templateData.footer?.socialFacebook || ''} onChange={(e) => updateFooter({ socialFacebook: e.target.value })} placeholder="https://facebook.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input value={templateData.footer?.socialTwitter || ''} onChange={(e) => updateFooter({ socialTwitter: e.target.value })} placeholder="https://twitter.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Youtube URL</Label>
              <Input value={templateData.footer?.socialYoutube || ''} onChange={(e) => updateFooter({ socialYoutube: e.target.value })} placeholder="https://youtube.com/..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSettingsTab;