import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen, Users, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectsContext";

const Dashboard = () => {
  const { projects, totalLeads } = useProjects();

  const stats = [
    {
      label: "Total de Projetos",
      value: projects.length.toString(),
      icon: FolderOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Leads este mês",
      value: totalLeads.toString(),
      icon: Users,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Plano Atual",
      value: "Starter",
      subtitle: "R$ 47/mês",
      icon: CreditCard,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - LP Lucrativa</title>
        <meta name="description" content="Gerencie suas landing pages e acompanhe suas métricas." />
      </Helmet>

      <DashboardLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo à LP Lucrativa. Aqui você gerencia suas landing pages e leads.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6 border border-border shadow-soft"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
              )}
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Create Project CTA */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Pronto para criar sua próxima landing page?
              </h2>
              <p className="text-muted-foreground">
                Escolha um template e personalize em minutos. Sem necessidade de conhecimento técnico.
              </p>
            </div>
            <Button variant="accent" size="lg" className="gap-2 shrink-0" asChild>
              <Link to="/dashboard/projetos?criar=true">
                <Plus className="w-5 h-5" />
                Criar Novo Projeto
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
