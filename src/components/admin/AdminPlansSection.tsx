import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Users, Pencil, Globe, MapPin } from 'lucide-react';
import { useAdminPlans, AdminPlan } from '@/hooks/useAdminData';
import { AdminPlanEditModal } from './AdminPlanEditModal';

export function AdminPlansSection() {
  const { data: plans, isLoading, error } = useAdminPlans();
  const [selectedPlan, setSelectedPlan] = useState<AdminPlan | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditPlan = (plan: AdminPlan) => {
    setSelectedPlan(plan);
    setEditModalOpen(true);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Erro ao carregar planos: {error.message}
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Planos Disponíveis</CardTitle>
          <CardDescription>Gerencie os planos de assinatura da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : plans?.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map((plan: AdminPlan) => (
                <Card key={plan.id} className={`relative ${!plan.is_active ? 'opacity-60' : ''}`}>
                  {!plan.is_active && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Inativo
                    </Badge>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1">
                          <Users className="h-3 w-3" />
                          {plan.subscribers_count}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleEditPlan(plan)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{plan.slug}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold">{formatCurrency(plan.price_monthly)}</p>
                      <p className="text-xs text-muted-foreground">
                        por mês
                        {plan.price_yearly && ` • ${formatCurrency(plan.price_yearly)}/ano`}
                      </p>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Projetos</span>
                        <span className="font-medium">
                          {plan.max_projects ?? 'Ilimitado'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Page Views</span>
                        <span className="font-medium">
                          {plan.max_page_views ? `${(plan.max_page_views / 1000)}k` : 'Ilimitado'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm border-t pt-3">
                      <FeatureItem enabled={plan.custom_domain} label="Domínio personalizado" icon={<Globe className="h-3 w-3" />} fallbackIcon={<MapPin className="h-3 w-3" />} fallbackLabel="Subdomínio incluído" />
                      <FeatureItem enabled={plan.webhook_integration} label="Webhooks" />
                      <FeatureItem enabled={plan.remove_branding} label="Remover marca" />
                      <FeatureItem enabled={plan.priority_support} label="Suporte prioritário" />
                    </div>

                    {plan.checkout_types?.length > 0 && (
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        <span className="font-medium">Checkouts: </span>
                        {plan.checkout_types.join(', ')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum plano cadastrado
            </div>
          )}
        </CardContent>
      </Card>

      <AdminPlanEditModal
        plan={selectedPlan}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </>
  );
}

function FeatureItem({ enabled, label, icon, fallbackIcon, fallbackLabel }: { enabled: boolean; label: string; icon?: React.ReactNode; fallbackIcon?: React.ReactNode; fallbackLabel?: string }) {
  return (
    <div className="flex items-center gap-2">
      {enabled ? (
        <>
          {icon || <Check className="h-3 w-3 text-green-500" />}
          <span className="text-foreground">{label}</span>
        </>
      ) : (
        <>
          {fallbackIcon || <X className="h-3 w-3 text-muted-foreground" />}
          <span className="text-muted-foreground">{fallbackLabel || label}</span>
        </>
      )}
    </div>
  );
}