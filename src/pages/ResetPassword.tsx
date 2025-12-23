import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ResetPassword = () => {
  const { toast } = useToast();
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await resetPassword(email);
    
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    toast({ title: "Email enviado!", description: "Verifique sua caixa de entrada." });
    setEmailSent(true);
    setIsLoading(false);
  };

  return (
    <>
      <Helmet><title>Recuperar Senha - LP Lucrativa</title></Helmet>
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
            {!emailSent ? (
              <>
                <div className="text-center mb-8"><h1 className="text-2xl font-bold text-foreground mb-2">Esqueceu sua senha?</h1><p className="text-muted-foreground">Digite seu email para redefinir sua senha</p></div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" /></div>
                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>{isLoading ? "Enviando..." : "Enviar link de recuperação"}</Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"><Mail className="w-8 h-8 text-accent" /></div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Verifique seu email</h1>
                <p className="text-muted-foreground mb-6">Enviamos um link para <span className="font-medium text-foreground">{email}</span></p>
                <p className="text-sm text-muted-foreground mb-6">Não recebeu? <button onClick={() => setEmailSent(false)} className="text-primary hover:underline">Tente novamente</button></p>
              </div>
            )}
            <Link to="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-6"><ArrowLeft className="w-4 h-4" />Voltar para o login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
