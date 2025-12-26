import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, CreditCard, FolderOpen, Settings, ExternalLink } from 'lucide-react';
import { useAdminUserDetails, useAdminUpdateUser } from '@/hooks/useAdminData';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdminUserModalProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const subscriptionStatusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" | "accent"; className?: string }> = {
  active: { label: "Ativo", variant: "accent" },
  trialing: { label: "Trial", variant: "outline", className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" },
  canceled: { label: "Cancelado", variant: "destructive" },
  past_due: { label: "Vencido", variant: "destructive" },
  // Add other statuses if needed
  default: { label: "Sem assinatura", variant: "secondary" },
};

export function AdminUserModal({ userId, open, onOpenChange }: AdminUserModalProps) {
  const { data, isLoading, error, refetch } = useAdminUserDetails(userId);
  const updateUser = useAdminUpdateUser();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedSubscriptionStatus, setSelectedSubscriptionStatus] = useState<string>('');

  useEffect(() => {
    if (data?.user?.plan) {
      setSelectedPlan(data.user.plan);
    }
    if (data?.subscription?.status) {
      setSelectedSubscriptionStatus(data.subscription.status);
    } else {
      setSelectedSubscriptionStatus('default'); // Or an appropriate default for no subscription
    }
  }, [data]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleChangePlan = async () => {
    if (!userId || !selectedPlan) return;

    try {
      await updateUser.mutateAsync({ userId, plan: selectedPlan });
      toast.success('Plano do usuário atualizado com sucesso!');
      refetch(); // Refetch user details to show updated plan
    } catch (err) {
      toast.error('Erro ao atualizar plano');
      console.error(err);
    }
  };

  const handleChangeSubscriptionStatus = async () => {
    if (!userId || !selectedSubscriptionStatus) return;

    try {
      await updateUser.mutateAsync({ userId, subscriptionStatus: selectedSubscriptionStatus });
      toast.success('Status da assinatura atualizado com sucesso!');
      refetch(); // Refetch user details to show updated status
    } catch (err) {
      toast.error('Erro ao atualizar status da assinatura');
      console.error(err);
    }
  };

  const getStatusBadge = (status: string | undefined | null) => {
    const config = status ? subscriptionStatusConfig[status] || subscriptionStatusConfig.default : subscriptionStatusConfig.default;
    return (
      <Badge variant={config.variant} className={cn(config.className)}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Usuário</DialogTitle>
          <DialogDescription>
            {data?.user?.email || 'Carregando...'}
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="py-8 text-center text-destructive">
            Erro ao carregar dados: {error.message}
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : data ? (
          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info" className="gap-2">
                <User className="h-4 w-4" />
                Informações
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Assinatura
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Projetos
              </TabsTrigger>
              <TabsTrigger value="actions" className="gap-2">
                <Settings className="h-4 w-4" />
                Ações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="Nome completo" value={data.user?.full_name} />
                  <InfoItem label="Email" value={data.user?.email} />
                  <InfoItem label="Plano atual" value={data.user?.plan || 'Starter'} />
                  <InfoItem label="Data de cadastro" value={formatDate(data.user?.created_at)} />
                </CardContent>
              </Card>

              {data.usage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Uso no Período</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-3">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{data.usage.projects_count}</p>
                      <p className="text-sm text-muted-foreground">Projetos</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{data.usage.page_views_count.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{data.usage.leads_captured_count}</p>
                      <p className="text-sm text-muted-foreground">Leads Capturados</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="subscription" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalhes da Assinatura</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.subscription ? (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Status:</span>
                          {getStatusBadge(data.subscription.status)}
                        </div>
                        <InfoItem 
                          label="Plano" 
                          value={`${data.subscription.plan?.name} - ${formatCurrency(data.subscription.plan?.price_monthly || 0)}/mês`} 
                        />
                        <InfoItem label="Início do período" value={formatDate(data.subscription.current_period_start)} />
                        <InfoItem label="Próxima cobrança" value={formatDate(data.subscription.current_period_end)} />
                        {data.subscription.stripe_customer_id && (
                          <InfoItem label="Stripe Customer ID" value={data.subscription.stripe_customer_id} />
                        )}
                        {data.subscription.stripe_subscription_id && (
                          <InfoItem label="Stripe Subscription ID" value={data.subscription.stripe_subscription_id} />
                        )}
                      </div>
                      {data.subscription.cancel_at_period_end && (
                        <Badge variant="destructive">
                          Cancelamento agendado para o fim do período
                        </Badge>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground">Usuário não possui assinatura ativa.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Projetos do Usuário</CardTitle>
                  <CardDescription>{data.projects?.length || 0} projetos criados</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.projects?.length ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Nicho</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Leads</TableHead>
                          <TableHead>Criado em</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell className="capitalize">{project.niche}</TableCell>
                            <TableCell>
                              <Badge variant={project.status === 'active' ? 'accent' : 'secondary'}>
                                {project.status === 'active' ? 'Ativo' : 'Pausado'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">{project.leads_count}</TableCell>
                            <TableCell>{formatDate(project.created_at)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/lp/${project.slug}`, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum projeto criado
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações Administrativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Selecionar plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                        <SelectItem value="agency">Agency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleChangePlan} 
                      disabled={!selectedPlan || updateUser.isPending}
                    >
                      {updateUser.isPending ? 'Atualizando...' : 'Alterar Plano'}
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Select value={selectedSubscriptionStatus} onValueChange={setSelectedSubscriptionStatus}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Status da assinatura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="trialing">Trial</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="past_due">Vencido</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleChangeSubscriptionStatus} 
                      disabled={!selectedSubscriptionStatus || updateUser.isPending}
                    >
                      {updateUser.isPending ? 'Atualizando...' : 'Alterar Status Assinatura'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  );
}