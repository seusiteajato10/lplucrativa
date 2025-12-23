import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TemplateData, CheckoutConfig, LeadDestinationConfig, TrackingConfig, IntegrationsConfig } from '@/types/templateData';
import { Separator } from '@/components/ui/separator';

interface IntegrationsTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const IntegrationsTab = ({ templateData, onUpdate }: IntegrationsTabProps) => {
  const integrations = templateData.integrations || {
    checkout: { enabled: true, type: 'external' as const, url: '', buttonText: 'Comprar Agora' },
    leadDestination: { type: 'email' as const, email: '', crm: { provider: '' as const, apiKey: '', listId: '', webhookUrl: '' } },
    tracking: { ga4Id: '', facebookPixelId: '', gtmId: '', tiktokPixelId: '' },
  };

  const updateCheckout = (updates: Partial<CheckoutConfig>) => {
    onUpdate({ 
      integrations: { 
        ...integrations, 
        checkout: { ...integrations.checkout, ...updates } 
      } 
    });
  };

  const updateLeadDestination = (updates: Partial<LeadDestinationConfig>) => {
    onUpdate({ 
      integrations: { 
        ...integrations, 
        leadDestination: { ...integrations.leadDestination, ...updates } 
      } 
    });
  };

  const updateLeadDestinationCrm = (updates: Partial<LeadDestinationConfig['crm']>) => {
    onUpdate({
      integrations: {
        ...integrations,
        leadDestination: {
          ...integrations.leadDestination,
          crm: { ...integrations.leadDestination.crm, ...updates },
        },
      },
    });
  };

  const updateTracking = (updates: Partial<TrackingConfig>) => {
    onUpdate({ 
      integrations: { 
        ...integrations, 
        tracking: { ...integrations.tracking, ...updates } 
      } 
    });
  };

  const checkoutPlatforms = [
    { value: 'kiwify', label: 'Kiwify' },
    { value: 'eduzz', label: 'Eduzz' },
    { value: 'monetizze', label: 'Monetizze' },
    { value: 'braip', label: 'Braip' },
    { value: 'perfectpay', label: 'PerfectPay' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'other', label: 'Outro' },
  ];

  const crmProviders = [
    { value: 'rdstation', label: 'RD Station' },
    { value: 'activecampaign', label: 'ActiveCampaign' },
    { value: 'mailchimp', label: 'MailChimp' },
    { value: 'mailerlite', label: 'MailerLite' },
    { value: 'webhook', label: 'Webhook Customizado' },
  ];

  const checkoutTypes = [
    { value: 'external', label: 'Externo (redirect)', description: 'Redireciona para URL de checkout externa' },
    { value: 'embedded', label: 'Integrado (embed)', description: 'Modal/embed com código de pagamento' },
    { value: 'after_lead', label: 'Após captura de lead', description: 'Captura lead primeiro, checkout na página de obrigado' },
  ];

  return (
    <div className="space-y-6">
      {/* Checkout */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Checkout</h3>

        <div className="space-y-2">
          <Label>Tipo de Checkout</Label>
          <Select
            value={integrations.checkout.type || 'external'}
            onValueChange={value => updateCheckout({ type: value as CheckoutConfig['type'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {checkoutTypes.map(t => (
                <SelectItem key={t.value} value={t.value}>
                  <div className="flex flex-col">
                    <span>{t.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {checkoutTypes.find(t => t.value === (integrations.checkout.type || 'external'))?.description}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Plataforma</Label>
          <Select
            value={integrations.checkout.platform || ''}
            onValueChange={value => updateCheckout({ platform: value as CheckoutConfig['platform'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a plataforma" />
            </SelectTrigger>
            <SelectContent>
              {checkoutPlatforms.map(p => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(integrations.checkout.type === 'external' || integrations.checkout.type === 'post_lead' || !integrations.checkout.type) && (
          <div className="space-y-2">
            <Label htmlFor="checkoutUrl">URL do Checkout</Label>
            <Input
              id="checkoutUrl"
              value={integrations.checkout.url || ''}
              onChange={e => updateCheckout({ url: e.target.value })}
              placeholder="https://pay.kiwify.com.br/..."
            />
          </div>
        )}

        {integrations.checkout.type === 'embedded' && (
          <div className="space-y-2">
            <Label htmlFor="checkoutCode">Código Embed do Checkout</Label>
            <textarea
              id="checkoutCode"
              value={integrations.checkout.code || ''}
              onChange={e => updateCheckout({ code: e.target.value })}
              placeholder="<script>...</script> ou código embed"
              className="w-full h-32 px-3 py-2 text-sm rounded-md border border-input bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Cole o código embed da Stripe, Mercado Pago ou outra plataforma
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="checkoutButtonText">Texto do Botão</Label>
          <Input
            id="checkoutButtonText"
            value={integrations.checkout.buttonText || ''}
            onChange={e => updateCheckout({ buttonText: e.target.value })}
            placeholder="Comprar Agora"
          />
        </div>
      </div>

      <Separator />

      {/* Lead Destination */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Destino dos Leads</h3>

        <RadioGroup
          value={integrations.leadDestination.type}
          onValueChange={value =>
            updateLeadDestination({ type: value as LeadDestinationConfig['type'] })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Enviar para meu e-mail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="crm" id="crm" />
            <Label htmlFor="crm">Enviar para CRM</Label>
          </div>
        </RadioGroup>

        {integrations.leadDestination.type === 'email' && (
          <div className="space-y-2">
            <Label htmlFor="notificationEmail">E-mail de Notificação</Label>
            <Input
              id="notificationEmail"
              type="email"
              value={integrations.leadDestination.email}
              onChange={e => updateLeadDestination({ email: e.target.value })}
              placeholder="seu@email.com"
            />
          </div>
        )}

        {integrations.leadDestination.type === 'crm' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Provedor CRM</Label>
              <Select
                value={integrations.leadDestination.crm.provider}
                onValueChange={value =>
                  updateLeadDestinationCrm({
                    provider: value as LeadDestinationConfig['crm']['provider'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o CRM" />
                </SelectTrigger>
                <SelectContent>
                  {crmProviders.map(p => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {integrations.leadDestination.crm.provider === 'webhook' ? (
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL do Webhook</Label>
                <Input
                  id="webhookUrl"
                  value={integrations.leadDestination.crm.webhookUrl}
                  onChange={e => updateLeadDestinationCrm({ webhookUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            ) : integrations.leadDestination.crm.provider ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={integrations.leadDestination.crm.apiKey}
                    onChange={e => updateLeadDestinationCrm({ apiKey: e.target.value })}
                    placeholder="Sua API Key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listId">ID da Lista</Label>
                  <Input
                    id="listId"
                    value={integrations.leadDestination.crm.listId}
                    onChange={e => updateLeadDestinationCrm({ listId: e.target.value })}
                    placeholder="ID da lista/segmento"
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      <Separator />

      {/* Tracking */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Rastreamento</h3>

        <div className="space-y-2">
          <Label htmlFor="ga4Id">Google Analytics 4 ID</Label>
          <Input
            id="ga4Id"
            value={integrations.tracking.ga4Id}
            onChange={e => updateTracking({ ga4Id: e.target.value })}
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
          <Input
            id="facebookPixelId"
            value={integrations.tracking.facebookPixelId}
            onChange={e => updateTracking({ facebookPixelId: e.target.value })}
            placeholder="123456789012345"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gtmId">Google Tag Manager ID</Label>
          <Input
            id="gtmId"
            value={integrations.tracking.gtmId}
            onChange={e => updateTracking({ gtmId: e.target.value })}
            placeholder="GTM-XXXXXXX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tiktokPixelId">TikTok Pixel ID</Label>
          <Input
            id="tiktokPixelId"
            value={integrations.tracking.tiktokPixelId}
            onChange={e => updateTracking({ tiktokPixelId: e.target.value })}
            placeholder="XXXXXXXXXX"
          />
        </div>
      </div>
    </div>
  );
};

export default IntegrationsTab;
