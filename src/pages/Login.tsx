import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(formData.email, formData.password);

    if (error) {
      toast({ title: "Erro no login", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    toast({ title: "Login realizado!", description: "Bem-vindo de volta à LP Lucrativa." });
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Entrar - LP Lucrativa</title>
        <meta name="description" content="Acesse sua conta na LP Lucrativa." />
      </Helmet>
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="w-full max-w-md relative">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shadow-glow">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">LP <span className="text-gradient">Lucrativa</span></span>
          </Link>
          <div className="bg-card rounded-2xl shadow-medium border border-border p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Bem-vindo de volta</h1>
              <p className="text-muted-foreground">Entre na sua conta para continuar</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-12" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/reset-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="h-12 pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>{isLoading ? "Entrando..." : "Entrar"}</Button>
            </form>
            <p className="text-center text-muted-foreground text-sm mt-6">Não tem uma conta? <Link to="/signup" className="text-primary font-medium hover:underline">Criar conta grátis</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
