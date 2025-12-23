import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { TemplateData, LgpdConfig } from '@/types/templateData';

interface LgpdTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const LgpdTab = ({ templateData, onUpdate }: LgpdTabProps) => {
  const updateLgpd = (updates: Partial<LgpdConfig>) => {
    onUpdate({ lgpd: { ...templateData.lgpd, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Banner de Cookies</Label>
          <p className="text-xs text-muted-foreground">
            Exibir banner de consentimento de cookies
          </p>
        </div>
        <Switch
          checked={templateData.lgpd.showCookieBanner}
          onCheckedChange={checked => updateLgpd({ showCookieBanner: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="termsOfUse">Termos de Uso</Label>
        <Textarea
          id="termsOfUse"
          value={templateData.lgpd.termsOfUse}
          onChange={e => updateLgpd({ termsOfUse: e.target.value })}
          placeholder="Insira seus termos de uso..."
          rows={6}
        />
        <p className="text-xs text-muted-foreground">
          Este texto será exibido na página /termos
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="privacyPolicy">Política de Privacidade</Label>
        <Textarea
          id="privacyPolicy"
          value={templateData.lgpd.privacyPolicy}
          onChange={e => updateLgpd({ privacyPolicy: e.target.value })}
          placeholder="Insira sua política de privacidade..."
          rows={6}
        />
        <p className="text-xs text-muted-foreground">
          Este texto será exibido na página /privacidade
        </p>
      </div>
    </div>
  );
};

export default LgpdTab;
