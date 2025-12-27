import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Search, Pencil, Eye, Users, Settings, Trash2, ExternalLink, Loader2, ArrowRight, Repeat, TrendingUp } from "lucide-react";
import { useProjects } from "@/contexts/ProjectsContext";
import { nicheLabels, statusLabels, ProjectStatus, Project } from "@/types/project";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
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

  // Lógica para agrupar projetos em funis
  const funnelGroups = useMemo(() => {
    const groups: any[] = [];
    const processedIds = new Set();

    filteredProjects.forEach(project => {
      if (processedIds.has(project.id)) return;

      // Se for uma página conectada (lead ou sales)
      if (project.connected_page_id) {
        const connected = filteredProjects.find(p => p.id === project.connected_page_id);
        if (connected) {
          const leadPage = project.funnel_position === 'lead' ? project : connected;
          const salesPage = project.funnel_position === 'sales' ? project : connected;
          
          groups.push({
            type: 'funnel',
            leadPage,
            salesPage,
            name: leadPage.name.replace(' (Captura)', ''),
            id: leadPage.id + salesPage.id
          });
          
          processedIds.add(leadPage.id);
          processedIds.add(salesPage.id);
        } else {
          // Página orfã ou conexão não carregada no filtro
          groups.push({ type: 'single', project });
          processedIds.add(project.id);
        }
      } else {
        groups.push({ type: 'single', project });
        processedIds.add(project.id);
      }
    });

    return groups;
  }, [filteredProjects]);

  const handleDelete = async () => {
    if (deleteConfirmId) {
      setIsDeleting(true);
      const { error } = await deleteProject(deleteConfirmId);
      setIsDeleting(false);
      if (error) toast.error("Erro ao excluir: " + error.message);
      else toast.success("Excluído com sucesso!");
      setDeleteConfirmId(null);
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 hover:bg-muted/50 transition-colors rounded-lg border border-border/50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">{project.name}</h4>
          <Badge variant="outline" className="text-[10px] h-4">{project.status}</Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {project.leads_count || 0} leads</span>
          <span className="flex items-center gap-1 font-mono">{getProjectPublicPath(project.slug)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/projetos/${project.id}/editar`)}><Pencil className="w-4 h-4" /></Button>
        <Button variant="ghost" size="sm" asChild><Link to={getProjectPublicPath(project.slug)} target="_blank"><Eye className="w-4 h-4" /></Link></Button>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteConfirmId(project.id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet><title>Meus Projetos - LP Lucrativa</title></Helmet>
      <DashboardLayout>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">Meus Projetos e Funis</h1>
          <Button variant="accent" className="gap-2" onClick={() => setCreateModalOpen(true)}>
            <Plus className="w-5 h-5" /> Criar Novo Projeto
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="paused">Pausados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="space-y-6">
            {funnelGroups.map((group) => (
              group.type === 'funnel' ? (
                <Card key={group.id} className="border-primary/20 bg-primary/5 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-primary/10 px-6 py-3 border-b border-primary/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Repeat className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-primary">Funil: {group.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-primary">
                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Conversão Funil: 2.2%</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="relative pl-8">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                        
                        <div className="relative mb-6">
                          <div className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">1</div>
                          <ProjectCard project={group.leadPage} />
                        </div>

                        <div className="flex justify-center my-2"><ArrowRight className="w-4 h-4 text-primary/30 rotate-90" /></div>

                        <div className="relative">
                          <div className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">2</div>
                          <ProjectCard project={group.salesPage} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div key={group.project.id} className="bg-card border border-border rounded-xl">
                  <ProjectCard project={group.project} />
                </div>
              )
            ))}
          </div>
        )}

        <CreateProjectModal open={createModalOpen} onOpenChange={setCreateModalOpen} />

        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Excluir projeto?</AlertDialogTitle><AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive">Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </>
  );
};

export default Projetos;