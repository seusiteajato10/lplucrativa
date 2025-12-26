import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { AdminPlan } from '@/hooks/useAdminData';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface AdminPlanEditModalProps {
  plan: AdminPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPlanEditModal({ plan, open, onOpenChange }: AdminPlanEditModalProps) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price_monthly: 0,
    price_yearly: 0,
    max_projects: null as number | null,
    max_page_views: null as number | null,
    webhook_integration: false,
    custom_domain: false, // This will be controlled by domainType
    remove_branding: false,
    priority_support: false,
    is_active: true,
  });
  const [domainType, setDomainType] = useState<'subdomain' | 'custom_domain'>('subdomain');
  const [featuresText, setFeaturesText] = useState('');
  const [errors, setErrors] = useState<{ features?: string }>({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price_monthly: plan.price_monthly,
        price_yearly: plan.price_yearly || 0,
        max_projects: plan.max_projects,
        max_page_views: plan.max_page_views,
        webhook_integration: plan.webhook_integration,
        custom_domain: plan.custom_domain,
        remove_branding: plan.remove_branding,
        priority_support: plan.priority_support,
        is_active: plan.is_active,
      });
      setDomainType(plan.custom_domain ? 'custom_domain' : 'subdomain');
      setFeaturesText(plan.features.join('\n'));
      setErrors({});
    }
  }, [plan]);

  const validate = () => {
    const newErrors: { features?: string } = {};
    const parsedFeatures = featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0);

    if (parsedFeatures.length === 0) {
      newErrors.features = 'Pelo menos um recurso é obrigatório.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!plan || !validate()) return;
    
    setSaving(true);
    try {
      const parsedFeatures = featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0);

      const { error } = await supabase
        .from('subscription_plans')
        .update({
          name: formData.name,
          price_monthly: formData.price_monthly,
          price_yearly: formData.price_yearly || null,
          max_projects: formData.max_projects,
          max_page_views: formData.max_page_views,
          webhook_integration: formData.webhook_integration,
          custom_domain: domainType === 'custom_domain', // Update based on radio button
          remove_branding: formData.remove_branding,
          priority_support: formData.priority_support,
          is_active: formData.is_active,
          features: parsedFeatures as unknown as AdminPlan['features'], // Cast to Json type
        })
        .eq('id', plan.id);

      if (error) throw error;

      toast.success('Plano atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['adminPlans'] }); // Invalidate for the admin table
      queryClient.invalidateQueries({ queryKey: ['subscriptionPlans'] }); // Invalidate for the Pricing page
      queryClient.invalidateQueries({ queryKey: ['userSubscription'] }); // Invalidate for Dashboard/Configuracoes pages
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Erro ao atualizar plano: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar Plano: {plan?.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Plano</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (somente leitura)</Label>
            <Input id="slug" value={plan?.slug || ''} readOnly className="bg-muted" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_monthly">Preço Mensal (R$)</Label>
              <Input
                id="price_monthly"
                type="number"
                step="0.01"
                value={formData.price_monthly}
                onChange={(e) => setFormData({ ...formData, price_monthly: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_yearly">Preço Anual (R$)</Label>
              <Input
                id="price_yearly"
                type="number"
                step="0.01"
                value={formData.price_yearly}
                onChange={(e) => setFormData({ ...formData, price_yearly: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_projects">Max Projetos</Label>
              <Input
                id="max_projects"
                type="number"
                placeholder="Ilimitado"
                value={formData.max_projects ?? ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  max_projects: e.target.value ? parseInt(e.target.value) : null 
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_page_views">Max Page Views</Label>
              <Input
                id="max_page_views"
                type="number"
                placeholder="Ilimitado"
                value={formData.max_page_views ?? ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  max_page_views: e.target.value ? parseInt(e.target.value) : null 
                })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <Label>Tipo de Domínio</Label>
              <RadioGroup
                value={domainType}
                onValueChange={(value: 'subdomain' | 'custom_domain') => setDomainType(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subdomain" id="domain-subdomain" />
                  <Label htmlFor="domain-subdomain">Subdomínio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom_domain" id="domain-custom" />
                  <Label htmlFor="domain-custom">Domínio personalizado</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="webhook">Webhooks</Label>
              <Switch
                id="webhook"
                checked={formData.webhook_integration}
                onCheckedChange={(checked) => setFormData({ ...formData, webhook_integration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="branding">Remover Marca</Label>
              <Switch
                id="branding"
                checked={formData.remove_branding}
                onCheckedChange={(checked) => setFormData({ ...formData, remove_branding: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="support">Suporte Prioritário</Label>
              <Switch
                id="support"
                checked={formData.priority_support}
                onCheckedChange={(checked) => setFormData({ ...formData, priority_support: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Plano Ativo</Label>
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="features">Recursos Incluídos (um por linha)</Label>
            <Textarea
              id="features"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Digite cada recurso em uma nova linha"
              rows={6}
              className={errors.features ? "border-destructive" : ""}
            />
            {errors.features && <p className="text-sm text-destructive">{errors.features}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}