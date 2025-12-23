import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Configuracoes = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, isLoading: authLoading } = useAuth();
  const { subscription, limits, loading: subscriptionLoading } = useSubscription();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  // Initialize form with profile data
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast({
        title: "Erro",
        description: "O nome não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await updateProfile({ full_name: fullName.trim() });
    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar o perfil. Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    }
  };

  const isLoading = authLoading || subscriptionLoading;

  // Get plan details
  const planName = limits?.plan || subscription?.plan?.name || profile?.plan || "Starter";
  const planPrice = subscription?.plan?.price_monthly 
    ? `R$ ${subscription.plan.price_monthly}/mês`
    : null;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Configurações | LP Lucrativa</title>
        <meta name="description" content="Gerencie suas configurações de conta na LP Lucrativa." />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações de conta.</p>
        </div>

        <div className="grid gap-6">
          {/* Perfil */}
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Seu nome" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user?.email || ""} 
                      disabled 
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      O email não pode ser alterado.
                    </p>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar alterações
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure como você deseja receber notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">Receba atualizações sobre seus projetos por email.</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novidades e promoções</Label>
                  <p className="text-sm text-muted-foreground">Fique por dentro das novidades da LP Lucrativa.</p>
                </div>
                <Switch 
                  checked={promotionalEmails}
                  onCheckedChange={setPromotionalEmails}
                />
              </div>
            </CardContent>
          </Card>

          {/* Plano */}
          <Card>
            <CardHeader>
              <CardTitle>Seu Plano</CardTitle>
              <CardDescription>Gerencie sua assinatura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-28" />
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Plano {planName}</p>
                    {planPrice && (
                      <p className="text-sm text-muted-foreground">{planPrice}</p>
                    )}
                    {limits?.usage && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {limits.usage.projects_count} projeto(s) • {limits.usage.leads_captured_count} lead(s) este mês
                      </p>
                    )}
                  </div>
                  <Button variant="outline" onClick={() => navigate('/pricing')}>
                    Fazer upgrade
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Configuracoes;
