import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProjects } from "@/contexts/ProjectsContext";
import { useSubscription } from "@/hooks/useSubscription";
import { ProjectNiche, nicheLabels, getTemplateOptionsForNiche, ProjectType } from "@/types/project";
import { toast } from "sonner";
import { getProjectPublicPath } from "@/lib/routes";
import { AlertTriangle, Crown, MousePointer2, ShoppingCart, Repeat } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const CreateProjectModal = ({ open, onOpenChange }: CreateProjectModalProps) => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { limits, loading: subscriptionLoading, canCreateProject } = useSubscription();
  const [name, setName] = useState("");
  const [niche, setNiche] = useState<ProjectNiche | "">("");
  const [projectType, setProjectType] = useState<ProjectType>("sales_only");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const canCreate = canCreateProject();
  const currentProjects = limits?.usage?.projects_count || 0;
  const maxProjects = limits?.limits?.max_projects;
  const planName = limits?.plan || "Nenhum";

  useEffect(() => {
    if (niche) {
      const options = getTemplateOptionsForNiche(niche as ProjectNiche);
      if (options.length > 0) {
        setSelectedTemplateId(options[0].value);
      }
    }
  }, [niche]);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleSlugChange = (value: string) => {
    const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(cleanSlug);
  };

  const validate = (): boolean => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!niche) newErrors.niche = "Selecione um nicho";
    if (!selectedTemplateId) newErrors.template = "Selecione um template";
    if (!slug.trim()) newErrors.slug = "Slug é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreate) {
      toast.error("Limite de projetos atingido.");
      return;
    }
    if (!validate()) return;

    setIsLoading(true);
    const { error, project } = await addProject({
      name: name.trim(),
      slug: slug.trim(),
      niche: niche as ProjectNiche,
      project_type: projectType,
      template_id: selectedTemplateId,
    });
    setIsLoading(false);

    if (error) {
      toast.error("Erro: " + error.message);
      return;
    }

    toast.success("Projeto criado!");
    if (project) navigate(`/dashboard/projetos/${project.id}/editar`);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setNiche("");
    setProjectType("sales_only");
    setSelectedTemplateId("");
    setSlug("");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>Escolha o tipo de página que deseja criar hoje.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Projeto */}
          <div className="space-y-3">
            <Label>O que você deseja criar?</Label>
            <RadioGroup 
              value={projectType} 
              onValueChange={(v) => setProjectType(v as ProjectType)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="lead_only" id="type-lead" className="peer sr-only" />
                <Label
                  htmlFor="type-lead"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <MousePointer2 className="mb-3 h-6 w-6" />
                  <span className="text-xs font-bold text-center">Página de Captura</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="sales_only" id="type-sales" className="peer sr-only" />
                <Label
                  htmlFor="type-sales"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <ShoppingCart className="mb-3 h-6 w-6" />
                  <span className="text-xs font-bold text-center">Página de Vendas</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="full_funnel" id="type-funnel" className="peer sr-only" />
                <Label
                  htmlFor="type-funnel"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Repeat className="mb-3 h-6 w-6" />
                  <span className="text-xs font-bold text-center">Funil Completo</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Ex: Produto X" />
            </div>
            <div className="space-y-2">
              <Label>Nicho</Label>
              <Select value={niche} onValueChange={(v) => setNiche(v as ProjectNiche)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {Object.entries(nicheLabels).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL (slug)</Label>
            <Input id="slug" value={slug} onChange={(e) => handleSlugChange(e.target.value)} placeholder="meu-produto" />
            {slug && <p className="text-[10px] text-muted-foreground">Link: {getProjectPublicPath(slug)}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="accent" disabled={isLoading}>{isLoading ? "Criando..." : "Criar Agora"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;