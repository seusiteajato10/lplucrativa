import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProjects } from "@/contexts/ProjectsContext";
import { useSubscription } from "@/hooks/useSubscription";
import { ProjectNiche, nicheLabels, getTemplateOptionsForNiche } from "@/types/project"; // Import getTemplateOptionsForNiche
import { toast } from "sonner";
import { getProjectPublicPath } from "@/lib/routes";
import { AlertTriangle, Crown } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
};

const CreateProjectModal = ({ open, onOpenChange }: CreateProjectModalProps) => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { limits, loading: subscriptionLoading, canCreateProject } = useSubscription();
  const [name, setName] = useState("");
  const [niche, setNiche] = useState<ProjectNiche | "">("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(""); // New state for template selection
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; niche?: string; slug?: string; template?: string }>({});

  const canCreate = canCreateProject();
  const currentProjects = limits?.usage?.projects_count || 0;
  const maxProjects = limits?.limits?.max_projects;
  const planName = limits?.plan || "Nenhum";

  // Update available templates when niche changes
  useEffect(() => {
    if (niche) {
      const options = getTemplateOptionsForNiche(niche as ProjectNiche);
      if (options.length > 0) {
        setSelectedTemplateId(options[0].value); // Select the first template by default
      } else {
        setSelectedTemplateId("");
      }
    } else {
      setSelectedTemplateId("");
    }
  }, [niche]);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleSlugChange = (value: string) => {
    // Only allow valid slug characters
    const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(cleanSlug);
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; niche?: string; slug?: string; template?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Nome do projeto é obrigatório";
    }

    if (!niche) {
      newErrors.niche = "Selecione um nicho";
    }

    if (!selectedTemplateId) {
      newErrors.template = "Selecione um template";
    }

    if (!slug.trim()) {
      newErrors.slug = "Slug é obrigatório";
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = "Slug deve conter apenas letras, números e hífens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCreate) {
      toast.error("Você atingiu o limite de projetos do seu plano.");
      return;
    }

    if (!validate()) return;

    setIsLoading(true);
    
    const { error } = await addProject({
      name: name.trim(),
      slug: slug.trim(),
      niche: niche as ProjectNiche,
      template_id: selectedTemplateId, // Pass the selected template ID
    });

    setIsLoading(false);

    if (error) {
      toast.error("Erro ao criar projeto: " + error.message);
      return;
    }

    toast.success("Projeto criado com sucesso!");
    handleClose();
  };

  const handleUpgrade = () => {
    handleClose();
    navigate("/pricing");
  };

  const handleClose = () => {
    setName("");
    setNiche("");
    setSelectedTemplateId("");
    setSlug("");
    setErrors({});
    onOpenChange(false);
  };

  const templateOptions = niche ? getTemplateOptionsForNiche(niche as ProjectNiche) : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar sua nova landing page.
          </DialogDescription>
        </DialogHeader>

        {/* Limite de projetos alcançado */}
        {!subscriptionLoading && !canCreate && (
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-700">
              <strong>Limite atingido!</strong> Você já tem {currentProjects} de {maxProjects || "∞"} projetos do plano {planName}.
              <Button 
                variant="link" 
                className="p-0 h-auto ml-1 text-amber-700 underline"
                onClick={handleUpgrade}
              >
                <Crown className="w-3 h-3 mr-1" />
                Fazer upgrade
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Info do plano atual */}
        {!subscriptionLoading && canCreate && maxProjects && (
          <p className="text-sm text-muted-foreground">
            Projetos: {currentProjects} de {maxProjects} ({planName})
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              placeholder="Ex: Curso de Violão Online"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              disabled={!canCreate}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Niche */}
          <div className="space-y-2">
            <Label>Nicho *</Label>
            <Select value={niche} onValueChange={(value) => setNiche(value as ProjectNiche)} disabled={!canCreate}>
              <SelectTrigger className={errors.niche ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione o nicho" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(nicheLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.niche && <p className="text-sm text-destructive">{errors.niche}</p>}
          </div>

          {/* Template Selection */}
          {niche && templateOptions.length > 0 && (
            <div className="space-y-2">
              <Label>Template *</Label>
              <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId} disabled={!canCreate}>
                <SelectTrigger className={errors.template ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.template && <p className="text-sm text-destructive">{errors.template}</p>}
            </div>
          )}

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL amigável (slug) *</Label>
            <Input
              id="slug"
              placeholder="curso-de-violao"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className={errors.slug ? "border-destructive" : ""}
              disabled={!canCreate}
            />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
            {slug && (
              <p className="text-sm text-muted-foreground">
                URL: <span className="font-mono text-foreground">{getProjectPublicPath(slug)}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            {canCreate ? (
              <Button type="submit" variant="accent" disabled={isLoading || subscriptionLoading}>
                {isLoading ? "Criando..." : "Criar Projeto"}
              </Button>
            ) : (
              <Button type="button" onClick={handleUpgrade}>
                <Crown className="w-4 h-4 mr-2" />
                Ver Planos
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;