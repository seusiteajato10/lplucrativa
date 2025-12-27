import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/contexts/ProjectsContext";
import { useSubscription } from "@/hooks/useSubscription";
import { ProjectNiche, nicheLabels, getTemplateOptionsForNiche, ProjectType } from "@/types/project";
import { toast } from "sonner";
import { getProjectPublicPath } from "@/lib/routes";
import { AlertTriangle, Crown, MousePointer2, ShoppingCart, Repeat, BookOpen, PlayCircle, HelpCircle, Ticket } from "lucide-react";

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
  const [niche, setNiche] = useState<ProjectNiche>("product");
  const [projectType, setProjectType] = useState<ProjectType>("sales_only");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const canCreate = canCreateProject();

  // Atualiza as opções de template quando o tipo de projeto ou nicho muda
  useEffect(() => {
    const options = getTemplateOptionsForNiche(niche, projectType);
    if (options.length > 0) {
      setSelectedTemplateId(options[0].value);
    }
  }, [niche, projectType]);

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
    if (!selectedTemplateId) newErrors.template = "Selecione um template";
    if (!slug.trim()) newErrors.slug = "Slug é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreate) {
      toast.error("Você atingiu seu limite de projetos no plano atual.");
      return;
    }
    if (!validate()) return;

    setIsLoading(true);
    const { error, project } = await addProject({
      name: name.trim(),
      slug: slug.trim(),
      niche: niche,
      project_type: projectType,
      template_id: selectedTemplateId,
    });
    setIsLoading(false);

    if (error) {
      toast.error("Erro ao criar projeto: " + error.message);
      return;
    }

    toast.success("Projeto criado com sucesso!");
    if (project) navigate(`/dashboard/projetos/${project.id}/editar`);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setNiche("product");
    setProjectType("sales_only");
    setSelectedTemplateId("");
    setSlug("");
    setErrors({});
    onOpenChange(false);
  };

  const isCapture = projectType === 'lead_only' || projectType === 'full_funnel';
  const captureTemplates = getTemplateOptionsForNiche('product', 'lead_only');

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>Escolha o tipo de página que deseja criar hoje.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* 1. Escolha do Tipo */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">O que você deseja criar?</Label>
            <RadioGroup 
              value={projectType} 
              onValueChange={(v) => setProjectType(v as ProjectType)}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <div className="relative">
                <RadioGroupItem value="lead_only" id="type-lead" className="peer sr-only" />
                <Label
                  htmlFor="type-lead"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all h-24"
                >
                  <MousePointer2 className="mb-2 h-5 w-5" />
                  <span className="text-[11px] font-bold text-center">Página de Captura</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="sales_only" id="type-sales" className="peer sr-only" />
                <Label
                  htmlFor="type-sales"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all h-24"
                >
                  <ShoppingCart className="mb-2 h-5 w-5" />
                  <span className="text-[11px] font-bold text-center">Página de Vendas</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="full_funnel" id="type-funnel" className="peer sr-only" />
                <Label
                  htmlFor="type-funnel"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all h-24"
                >
                  <Repeat className="mb-2 h-5 w-5" />
                  <span className="text-[11px] font-bold text-center">Funil Completo</span>
                  <Badge variant="outline" className="mt-1 text-[8px] h-3 px-1 border-primary/30 text-primary">RECOMENDADO</Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* 2. Seleção de Template (Se for Captura ou Funil) */}
          {isCapture && (
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Escolha o estilo de captura:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {captureTemplates.map((tpl) => (
                  <button
                    key={tpl.value}
                    type="button"
                    onClick={() => setSelectedTemplateId(tpl.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all gap-1 ${
                      selectedTemplateId === tpl.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-border'
                    }`}
                  >
                    {tpl.value === 'capture_ebook' && <BookOpen className="w-5 h-5 mb-1" />}
                    {tpl.value === 'capture_vsl' && <PlayCircle className="w-5 h-5 mb-1" />}
                    {tpl.value === 'capture_quiz' && <HelpCircle className="w-5 h-5 mb-1" />}
                    {tpl.value === 'capture_discount' && <Ticket className="w-5 h-5 mb-1" />}
                    <span className="text-[10px] font-medium text-center leading-tight">{tpl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Ex: E-book Fone Pro" className={errors.name ? 'border-destructive' : ''} />
            </div>
            {!isCapture && (
              <div className="space-y-2">
                <Label>Nicho do Negócio</Label>
                <Select value={niche} onValueChange={(v) => setNiche(v as ProjectNiche)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(nicheLabels).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Amigável (slug)</Label>
            <div className="flex items-center gap-1 bg-muted px-3 py-2 rounded-md">
              <span className="text-xs text-muted-foreground">lplucrativa.com/p/</span>
              <input 
                id="slug" 
                value={slug} 
                onChange={(e) => handleSlugChange(e.target.value)} 
                className="bg-transparent border-none outline-none text-xs font-mono flex-1 h-auto p-0"
                placeholder="meu-projeto"
              />
            </div>
            {errors.slug && <p className="text-[10px] text-destructive">{errors.slug}</p>}
          </div>

          {!canCreate && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-[11px]">Você atingiu seu limite. Faça upgrade para criar mais projetos.</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="accent" disabled={isLoading || !canCreate}>{isLoading ? "Criando..." : "Criar Agora"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;