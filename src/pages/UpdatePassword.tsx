import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updatePassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast({ title: "Senha muito curta", description: "A senha deve ter no mínimo 8 caracteres.", variant: "destructive" }); return; }
    if (password !== confirmPassword) { toast({ title: "Senhas não conferem", description: "As senhas digitadas são diferentes.", variant: "destructive" }); return; }
    
    setIsLoading(true);
    const { error } = await updatePassword(password);
    
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); setIsLoading(false); return; }
    
    toast({ title: "Senha atualizada!", description: "Você já pode fazer login com sua nova senha." });
    navigate("/login");
  };

  return (
    <>
      <Helmet><title>Nova Senha - LP Lucrativa</title></Helmet>
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="w-full max-w-md relative">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shadow-glow"><Rocket className="w-6 h-6 text-primary-foreground" /></div>
            <span className="text-2xl font-bold text-foreground">LP <span className="text-gradient">Lucrativa</span></span>
          </div>
          <div className="bg-card rounded-2xl shadow-medium border border-border p-8 animate-fade-in">
            <div className="text-center mb-8"><h1 className="text-2xl font-bold text-foreground mb-2">Crie uma nova senha</h1><p className="text-muted-foreground">Digite sua nova senha abaixo</p></div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="h-12 pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <div className="space-y-2"><Label htmlFor="confirmPassword">Confirmar senha</Label><Input id="confirmPassword" type="password" placeholder="Digite novamente" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="h-12" /></div>
              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar nova senha"}</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
