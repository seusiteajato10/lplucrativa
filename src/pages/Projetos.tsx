import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Pencil, Eye, Users, Settings, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useProjects } from "@/contexts/ProjectsContext";
import { nicheLabels, statusLabels, ProjectStatus } from "@/types/project";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { ProductConfigModal } from "@/components/projects/ProductConfigModal"; // Import ProductConfigModal
import { toast } from "sonner";
import { getProjectPublicPath } from "@/lib/routes";

const Projetos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projects, deleteProject, isLoading } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [configModalOpen, setConfigModalOpen] = useState(false); // State for config modal
  const [selectedProjectIdForConfig, setSelectedProjectIdForConfig] = useState<string | null>(null); // State for project to configure

  // Check URL param for auto-opening create modal
  useEffect(() => {
    if (searchParams.get("criar") === "true") {
      setCreateModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleDelete = async () => {
    if (deleteConfirmId) {
      setIsDeleting(true);
      const { error } = await deleteProject(deleteConfirmId);
      setIsDeleting(false);
      
      if (error) {
        toast.error("Erro ao excluir projeto: " + error.message);
      } else {
        toast.success("Projeto excluído com sucesso!");
      }
      setDeleteConfirmId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEditClick = (projectId: string) => {
    navigate(`/dashboard/projetos/${projectId}/editar`);
  };

  const handleLeadsClick = (projectId: string) => {
    navigate(`/dashboard/leads?projeto=${projectId}`);
  };

  const handleConfigClick = (project: typeof projects[0]) => {
    // Only allow config for 'product' niche for now
    if (project.niche === 'product') {
      setSelectedProjectIdForConfig(project.id);
      setConfigModalOpen(true);
    } else {
      toast.info("Configurações avançadas em breve!", { description: "Esta funcionalidade está disponível apenas para projetos de Produto no momento." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Meus Projetos - LP Lucrativa</title>
        <meta name="description" content="Gerencie suas landing pages e projetos." />
      </Helmet>

      <DashboardLayout>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Meus Projetos
          </h1>
          <Button variant="accent" className="gap-2" onClick={() => setCreateModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Criar Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus | "all")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="paused">Pausados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-card rounded-xl border border-border p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {projects.length === 0
                ? "Você ainda não tem projetos. Crie seu primeiro projeto!"
                : "Nenhum projeto encontrado com os filtros selecionados."}
            </p>
            {projects.length === 0 && (
              <Button variant="accent" onClick={() => setCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Projeto
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Project Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                      <Badge
                        variant={project.status === "active" ? "default" : "secondary"}
                        className={project.status === "active" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {statusLabels[project.status]}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span className="font-mono">{getProjectPublicPath(project.slug)}</span>
                      </span>
                      <span>Nicho: {nicheLabels[project.niche]}</span>
                      <span>Criado em: {formatDate(project.created_at)}</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.leads_count || 0} leads
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1.5"
                      onClick={() => handleEditClick(project.id)}
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="hidden sm:inline">Editar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" asChild>
                      <Link to={getProjectPublicPath(project.slug)} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1.5"
                      onClick={() => handleLeadsClick(project.id)}
                    >
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Leads</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1.5"
                      onClick={() => handleConfigClick(project)} // Pass the whole project object
                    >
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Config</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteConfirmId(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Excluir</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal open={createModalOpen} onOpenChange={setCreateModalOpen} />

        {/* Product Config Modal */}
        <ProductConfigModal
          projectId={selectedProjectIdForConfig}
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. O projeto e todos os dados associados serão removidos permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </>
  );
};

export default Projetos;