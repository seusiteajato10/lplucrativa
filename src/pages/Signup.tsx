import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({ title: "Termos obrigatórios", description: "Você precisa aceitar os termos de uso.", variant: "destructive" });
      return;
    }
    
    if (formData.password.length < 8) {
      toast({ title: "Senha muito curta", description: "A senha deve ter no mínimo 8 caracteres.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    const { error, requiresEmailConfirmation } = await signUp(formData.email, formData.password, formData.name);
    
    if (error) {
      // Handle rate limit error with friendly message
      const errorMessage = error.message || '';
      if (errorMessage.toLowerCase().includes('security purposes')) {
        toast({ 
          title: "Aguarde um momento", 
          description: "Por segurança, aguarde alguns segundos antes de tentar novamente.", 
          variant: "destructive" 
        });
      } else {
        toast({ title: "Erro no cadastro", description: errorMessage, variant: "destructive" });
      }
      setIsLoading(false);
      return;
    }
    
    if (requiresEmailConfirmation) {
      toast({ 
        title: "Verifique seu email", 
        description: "Enviamos um link de confirmação para seu email. Clique nele e depois faça login." 
      });
      navigate("/login");
    } else {
      toast({ title: "Conta criada com sucesso!", description: "Bem-vindo à LP Lucrativa." });
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Helmet><title>Criar Conta - LP Lucrativa</title></Helmet>
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="w-full max-w-md relative">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shadow-glow"><Rocket className="w-6 h-6 text-primary-foreground" /></div>
            <span className="text-2xl font-bold text-foreground">LP <span className="text-gradient">Lucrativa</span></span>
          </Link>
          <div className="bg-card rounded-2xl shadow-medium border border-border p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Crie sua conta grátis</h1>
              <p className="text-muted-foreground">Comece a criar landing pages que convertem</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={8} className="h-12 pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(c) => setAcceptTerms(c as boolean)} className="mt-1" />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  Eu aceito os <Link to="/termos" className="text-primary hover:underline">termos de uso</Link> e a <Link to="/privacidade" className="text-primary hover:underline">política de privacidade</Link>
                </label>
              </div>
              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar conta grátis"}
              </Button>
            </form>
            <p className="text-center text-muted-foreground text-sm mt-6">
              Já tem uma conta? <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
