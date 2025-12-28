import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen, Users, CreditCard, LayoutTemplate } from "lucide-react";
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

        {/* Create Project CTA - ATUALIZADO COM BOTÃO TEMPLATES */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Pronto para criar sua próxima landing page?
              </h2>
              <p className="text-muted-foreground">
                Escolha um template e personalize em minutos. Sem necessidade de conhecimento técnico.
              </p>
            </div>
            
            {/* Botões lado a lado */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" className="gap-2 flex-1" asChild>
                <Link to="/dashboard/projetos?criar=true">
                  <Plus className="w-5 h-5" />
                  Criar Novo Projeto
                </Link>
              </Button>
              
              {/* NOVO: Botão Ver Templates */}
              <Link
                to="/templates/galeria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-white dark:bg-gray-800 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex-1"
              >
                <LayoutTemplate className="w-4 h-4" />
                Ver Todos os Templates
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
