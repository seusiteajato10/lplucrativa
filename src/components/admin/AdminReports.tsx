import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  useAdminUsersChart,
  useAdminLeadsChart,
  useAdminTopProjects,
  useAdminPlans,
  ChartDataPoint,
  TopProject,
} from '@/hooks/useAdminData';

export function AdminReports() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: usersChart, isLoading: loadingUsers } = useAdminUsersChart(30);
  const { data: leadsChart, isLoading: loadingLeads } = useAdminLeadsChart(30);
  const { data: topProjects, isLoading: loadingProjects } = useAdminTopProjects(10);
  const { data: plans, isLoading: loadingPlans } = useAdminPlans();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Calculate plan distribution for pie chart
  const planDistribution = plans?.map((plan) => ({
    name: plan.name,
    value: plan.subscribers_count,
    color: plan.slug === 'starter' ? '#94a3b8' : plan.slug === 'pro' ? '#3b82f6' : '#8b5cf6',
  })).filter((p) => p.value > 0) || [];

  const totalSubscribers = planDistribution.reduce((sum, p) => sum + p.value, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div>
                <CardTitle>Relatórios e Analytics</CardTitle>
                <CardDescription>Visualize métricas dos últimos 30 dias</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-8">
            {/* Charts Row */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Users Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Novos Usuários (30 dias)</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingUsers ? (
                    <Skeleton className="h-[200px] w-full" />
                  ) : usersChart?.length ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={usersChart}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={formatDate}
                          tick={{ fontSize: 10 }}
                          className="text-muted-foreground"
                        />
                        <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                        <Tooltip 
                          labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                          formatter={(value) => [value, 'Usuários']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      Sem dados disponíveis
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Plans Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Distribuição de Planos</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingPlans ? (
                    <Skeleton className="h-[200px] w-full" />
                  ) : totalSubscribers > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={planDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {planDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} assinantes`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      Nenhuma assinatura ativa
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Leads Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Leads Capturados (30 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingLeads ? (
                  <Skeleton className="h-[200px] w-full" />
                ) : leadsChart?.length ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={leadsChart}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                        tick={{ fontSize: 10 }}
                        className="text-muted-foreground"
                      />
                      <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                      <Tooltip 
                        labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                        formatter={(value) => [value, 'Leads']}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Sem dados disponíveis
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Projects Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Top 10 Projetos por Leads</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingProjects ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : topProjects?.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Dono</TableHead>
                        <TableHead>Nicho</TableHead>
                        <TableHead className="text-right">Leads</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProjects.map((project: TopProject, index: number) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{project.owner_name}</p>
                              <p className="text-xs text-muted-foreground">{project.owner_email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {project.niche}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {project.leads_count}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhum projeto com leads ainda
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
