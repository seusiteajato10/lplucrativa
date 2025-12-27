import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TemplateData } from '@/types/templateData';
import { Plus, Trash2, Layout } from 'lucide-react';

interface LeadCaptureTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const LeadCaptureTab = ({ templateData, onUpdate }: LeadCaptureTabProps) => {
  const updateLeadCapture = (updates: Partial<TemplateData['leadCapture']>) => {
    onUpdate({
      leadCapture: {
        ...(templateData.leadCapture || {}),
        ...updates
      }
    });
  };

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
    <div className="space-y-6">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
        <Layout className="w-4 h-4" /> Configurações da Página de Captura
      </h3>
      <div className="space-y-2">
        <Label htmlFor="lc-headline">Título Principal</Label>
        <Input id="lc-headline" value={templateData.leadCapture.headline || ''} onChange={(e) => updateLeadCapture({ headline: e.target.value })} placeholder="Baixe Agora o Guia Completo" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-subheadline">Subtítulo</Label>
        <Textarea id="lc-subheadline" value={templateData.leadCapture.subheadline || ''} onChange={(e) => updateLeadCapture({ subheadline: e.target.value })} placeholder="Aprenda as técnicas exclusivas..." rows={2} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-ctaText">Texto do Botão CTA</Label>
        <Input id="lc-ctaText" value={templateData.leadCapture.ctaText || ''} onChange={(e) => updateLeadCapture({ ctaText: e.target.value })} placeholder="QUERO RECEBER AGORA" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-formTitle">Título do Formulário</Label>
        <Input id="lc-formTitle" value={templateData.leadCapture.formTitle || ''} onChange={(e) => updateLeadCapture({ formTitle: e.target.value })} placeholder="Preencha para receber grátis" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-formText">Texto do Formulário</Label>
        <Textarea id="lc-formText" value={templateData.leadCapture.formText || ''} onChange={(e) => updateLeadCapture({ formText: e.target.value })} placeholder="Gostou? Receba mais conteúdo exclusivo" rows={2} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-privacyText">Texto de Privacidade</Label>
        <Input id="lc-privacyText" value={templateData.leadCapture.privacyText || ''} onChange={(e) => updateLeadCapture({ privacyText: e.target.value })} placeholder="🔒 Seus dados estão 100% seguros" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-termsText">Texto de Termos</Label>
        <Input id="lc-termsText" value={templateData.leadCapture.termsText || ''} onChange={(e) => updateLeadCapture({ termsText: e.target.value })} placeholder="Válido apenas para novos clientes" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-ebookCoverUrl">URL da Capa do E-book</Label>
        <Input id="lc-ebookCoverUrl" value={templateData.leadCapture.ebookCoverUrl || ''} onChange={(e) => updateLeadCapture({ ebookCoverUrl: e.target.value })} placeholder="https://images.unsplash.com/..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-videoUrl">URL do Vídeo (VSL de Captura)</Label>
        <Input id="lc-videoUrl" value={templateData.leadCapture.videoUrl || ''} onChange={(e) => updateLeadCapture({ videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lc-subscribersCount">Contador de Assinantes</Label>
          <Input id="lc-subscribersCount" type="number" value={templateData.leadCapture.subscribersCount || 0} onChange={(e) => updateLeadCapture({ subscribersCount: parseInt(e.target.value) || 0 })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lc-discountPercent">Percentual de Desconto</Label>
          <Input id="lc-discountPercent" type="number" value={templateData.leadCapture.discountPercent || 0} onChange={(e) => updateLeadCapture({ discountPercent: parseInt(e.target.value) || 0 })} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lc-quizTitle">Título do Quiz</Label>
        <Input id="lc-quizTitle" value={templateData.leadCapture.quizTitle || ''} onChange={(e) => updateLeadCapture({ quizTitle: e.target.value })} placeholder="Descubra Qual Solução é Ideal Para Você" />
      </div>

      {/* Benefits for Lead Capture */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Benefícios da Captura</Label>
          <Button variant="outline" size="sm" onClick={addLeadCaptureBenefit}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {(templateData.leadCapture.benefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={benefit}
                onChange={(e) => updateLeadCaptureBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
              />
              <Button variant="ghost" size="icon" onClick={() => removeLeadCaptureBenefit(index)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {(!templateData.leadCapture.benefits || templateData.leadCapture.benefits.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-2">
              Nenhum benefício adicionado.
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Para editar as perguntas do Quiz, você precisará de um editor mais avançado.
      </p>
    </div>
  );
};

export default LeadCaptureTab;