import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface IntegrationSetting {
  key: string;
  value: string;
  is_encrypted: boolean;
}

export function AdminIntegrations() {
  const [stripeSecretKey, setStripeSecretKey] = useState('');
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState('');
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stripeConfigured, setStripeConfigured] = useState(false);

  useState(() => {
    loadSettings();
  });

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from('integration_settings')
        .select('key, value, is_encrypted');

      if (error) throw error;

      const settings = data as IntegrationSetting[] || [];
      
      settings.forEach((setting) => {
        switch (setting.key) {
          case 'stripe_secret_key':
            setStripeSecretKey(setting.value || '');
            break;
          case 'stripe_webhook_secret':
            setStripeWebhookSecret(setting.value || '');
            break;
          case 'stripe_publishable_key':
            setStripePublishableKey(setting.value || '');
            break;
        }
      });

      setStripeConfigured(settings.some(s => s.key === 'stripe_secret_key' && s.value));
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveSetting(key: string, value: string, isEncrypted: boolean = true) {
    const { data: existing } = await supabase
      .from('integration_settings')
      .select('id')
      .eq('key', key)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('integration_settings')
        .update({ value, is_encrypted: isEncrypted, updated_at: new Date().toISOString() })
        .eq('key', key);
      
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('integration_settings')
        .insert({ key, value, is_encrypted: isEncrypted });
      
      if (error) throw error;
    }
  }

  async function handleSaveStripeSettings() {
    setSaving(true);
    try {
      await saveSetting('stripe_secret_key', stripeSecretKey, true);
      await saveSetting('stripe_webhook_secret', stripeWebhookSecret, true);
      await saveSetting('stripe_publishable_key', stripePublishableKey, false);
      
      setStripeConfigured(!!stripeSecretKey);
      toast.success('Configurações do Stripe salvas com sucesso!');
    } catch (error) {
      console.error('Error saving Stripe settings:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Stripe
            </CardTitle>
            <CardDescription>
              Configure suas credenciais do Stripe para processar pagamentos
            </CardDescription>
          </div>
          <Badge variant={stripeConfigured ? "default" : "secondary"} className="gap-1">
            {stripeConfigured ? (
              <>
                <CheckCircle className="h-3 w-3" />
                Configurado
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Não configurado
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">Carregando...</div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="stripe-publishable">Publishable Key</Label>
              <Input
                id="stripe-publishable"
                placeholder="pk_live_... ou pk_test_..."
                value={stripePublishableKey}
                onChange={(e) => setStripePublishableKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Chave pública usada no frontend. Começa com pk_
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-secret">Secret Key</Label>
              <div className="relative">
                <Input
                  id="stripe-secret"
                  type={showSecretKey ? 'text' : 'password'}
                  placeholder="sk_live_... ou sk_test_..."
                  value={stripeSecretKey}
                  onChange={(e) => setStripeSecretKey(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Chave secreta usada no backend. Começa com sk_
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-webhook">Webhook Secret</Label>
              <div className="relative">
                <Input
                  id="stripe-webhook"
                  type={showWebhookSecret ? 'text' : 'password'}
                  placeholder="whsec_..."
                  value={stripeWebhookSecret}
                  onChange={(e) => setStripeWebhookSecret(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                >
                  {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Secret do webhook para validar eventos do Stripe
              </p>
            </div>

            <div className="pt-4 border-t">
              <Button onClick={handleSaveStripeSettings} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
