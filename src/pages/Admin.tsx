import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AdminMetricsCards } from '@/components/admin/AdminMetricsCards';
import { AdminUsersTable } from '@/components/admin/AdminUsersTable';
import { AdminPlansSection } from '@/components/admin/AdminPlansSection';
import { AdminUserModal } from '@/components/admin/AdminUserModal';
import { AdminReports } from '@/components/admin/AdminReports';
import { AdminIntegrations } from '@/components/admin/AdminIntegrations';
import { HomepageContentEditor } from '@/components/admin/HomepageContentEditor'; // Import the new component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, CreditCard, Settings, Home } from 'lucide-react'; // Import Home icon

export default function Admin() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setUserModalOpen(true);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Admin | Painel Administrativo</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie usuários, planos e configurações do sistema</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Integrações
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="homepage-content" className="gap-2"> {/* New Tab Trigger */}
              <Home className="h-4 w-4" />
              Conteúdo da Home
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Métricas */}
            <AdminMetricsCards />

            {/* Tabela de Usuários */}
            <AdminUsersTable onViewUser={handleViewUser} />

            {/* Planos */}
            <AdminPlansSection />

            {/* Relatórios */}
            <AdminReports />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <AdminIntegrations />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Gerenciamento de Planos */}
            <AdminPlansSection />
          </TabsContent>

          <TabsContent value="homepage-content" className="space-y-6"> {/* New Tab Content */}
            <HomepageContentEditor />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de detalhes do usuário */}
      <AdminUserModal
        userId={selectedUserId}
        open={userModalOpen}
        onOpenChange={setUserModalOpen}
      />
    </DashboardLayout>
  );
}