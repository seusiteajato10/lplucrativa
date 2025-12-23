import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeadsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-12 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Users className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Nenhum lead capturado ainda
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Seus leads aparecerão aqui assim que alguém preencher um formulário em suas landing pages.
        Crie sua primeira página para começar a capturar leads!
      </p>
      <Button onClick={() => navigate("/dashboard/projetos")} className="gap-2">
        <Plus className="w-4 h-4" />
        Criar Landing Page
      </Button>
    </div>
  );
};

export default LeadsEmptyState;
