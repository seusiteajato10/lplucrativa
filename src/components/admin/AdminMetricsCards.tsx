import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, CreditCard, Layout, Target } from 'lucide-react';
import { useAdminMetrics } from '@/hooks/useAdminData';

export function AdminMetricsCards() {
  const { data: metrics, isLoading, error } = useAdminMetrics();

  if (error) {
    return (
      <div className="text-center py-4 text-destructive">
        Erro ao carregar métricas: {error.message}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total de Usuários',
      value: metrics?.total_users ?? 0,
      subtitle: 'Cadastrados no sistema',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Assinaturas Ativas',
      value: metrics?.active_subscriptions ?? 0,
      subtitle: 'Pagando atualmente',
      icon: CreditCard,
      color: 'text-green-500',
    },
    {
      title: 'Projetos Criados',
      value: metrics?.total_projects ?? 0,
      subtitle: 'Landing pages ativas',
      icon: Layout,
      color: 'text-purple-500',
    },
    {
      title: 'Leads Capturados',
      value: metrics?.total_leads ?? 0,
      subtitle: 'Convertidos nas LPs',
      icon: Target,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-20 mb-1" />
                <Skeleton className="h-4 w-28" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{card.value.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
