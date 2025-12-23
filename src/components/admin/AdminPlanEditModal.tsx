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
    custom_domain: false,
    remove_branding: false,
    priority_support: false,
    is_active: true,
  });

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
    }
  }, [plan]);

  const handleSave = async () => {
    if (!plan) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .update({
          name: formData.name,
          price_monthly: formData.price_monthly,
          price_yearly: formData.price_yearly || null,
          max_projects: formData.max_projects,
          max_page_views: formData.max_page_views,
          webhook_integration: formData.webhook_integration,
          custom_domain: formData.custom_domain,
          remove_branding: formData.remove_branding,
          priority_support: formData.priority_support,
          is_active: formData.is_active,
        })
        .eq('id', plan.id);

      if (error) throw error;

      toast.success('Plano atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Erro ao atualizar plano: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Plano: {plan?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="webhook">Webhooks</Label>
              <Switch
                id="webhook"
                checked={formData.webhook_integration}
                onCheckedChange={(checked) => setFormData({ ...formData, webhook_integration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="domain">Domínio Próprio</Label>
              <Switch
                id="domain"
                checked={formData.custom_domain}
                onCheckedChange={(checked) => setFormData({ ...formData, custom_domain: checked })}
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
