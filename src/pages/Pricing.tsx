import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Building2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const planIcons: Record<string, React.ReactNode> = {
  basic: <Zap className="h-6 w-6" />,
  pro: <Rocket className="h-6 w-6" />,
  enterprise: <Building2 className="h-6 w-6" />,
};

const planColors: Record<string, string> = {
  basic: 'border-border',
  pro: 'border-primary ring-2 ring-primary/20',
  enterprise: 'border-accent',
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { plans, subscription, loading } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = (planSlug: string) => {
    if (!user) {
      navigate('/signup?plan=' + planSlug);
      return;
    }
    // TODO: Integrar com Stripe/checkout
    console.log('Subscribe to:', planSlug);
  };

  const formatPrice = (monthly: number, yearly: number | null) => {
    if (isYearly && yearly) {
      return (yearly / 12).toFixed(0);
    }
    return monthly.toFixed(0);
  };

  const getDiscount = (monthly: number, yearly: number | null) => {
    if (!yearly) return 0;
    const yearlyMonthly = yearly / 12;
    return Math.round((1 - yearlyMonthly / monthly) * 100);
  };

  return (
    <>
      <Helmet>
        <title>Planos e Preços | LP Lucrativa</title>
        <meta name="description" content="Escolha o plano ideal para criar landing pages de alta conversão. Comece grátis ou escolha Pro para recursos avançados." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">
              Planos & Preços
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Escolha o plano ideal para{' '}
              <span className="text-gradient">seu negócio</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comece a criar landing pages de alta conversão hoje mesmo.
              Cancele quando quiser.
            </p>

            {/* Toggle Mensal/Anual */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Mensal
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Anual
              </span>
              {isYearly && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Economize até 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Plans Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const isCurrentPlan = subscription?.plan?.slug === plan.slug;
                const isPro = plan.slug === 'pro';
                const discount = getDiscount(plan.price_monthly, plan.price_yearly);

                return (
                  <Card
                    key={plan.id}
                    className={`relative flex flex-col transition-all duration-300 hover:shadow-medium ${planColors[plan.slug] || ''} ${isPro ? 'scale-105 shadow-glow' : ''}`}
                  >
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="gradient-hero text-primary-foreground">
                          Mais Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-2">
                      <div className={`mx-auto mb-3 p-3 rounded-xl ${isPro ? 'gradient-hero text-primary-foreground' : 'bg-secondary'}`}>
                        {planIcons[plan.slug]}
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.slug === 'basic' && 'Para quem está começando'}
                        {plan.slug === 'pro' && 'Para negócios em crescimento'}
                        {plan.slug === 'enterprise' && 'Para grandes operações'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      {/* Preço */}
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <span className="text-5xl font-bold">
                            {formatPrice(plan.price_monthly, plan.price_yearly)}
                          </span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                        {isYearly && discount > 0 && (
                          <p className="text-sm text-accent mt-1">
                            Economia de {discount}% no plano anual
                          </p>
                        )}
                        {isYearly && plan.price_yearly && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Cobrado R$ {plan.price_yearly.toFixed(0)}/ano
                          </p>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Limites */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-2 text-center text-sm">
                          <div>
                            <p className="font-semibold">
                              {plan.max_projects ?? '∞'}
                            </p>
                            <p className="text-muted-foreground text-xs">Projetos</p>
                          </div>
                          <div>
                            <p className="font-semibold">
                              {plan.max_page_views ? `${(plan.max_page_views / 1000).toFixed(0)}k` : '∞'}
                            </p>
                            <p className="text-muted-foreground text-xs">Views/mês</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className={`w-full ${isPro ? 'gradient-hero hover:opacity-90' : ''}`}
                        variant={isPro ? 'default' : 'outline'}
                        size="lg"
                        disabled={isCurrentPlan}
                        onClick={() => handleSubscribe(plan.slug)}
                      >
                        {isCurrentPlan ? 'Plano Atual' : 'Começar Agora'}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

          {/* FAQ ou Garantia */}
          <div className="text-center mt-16 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              ✅ Garantia de 7 dias • 🔒 Pagamento seguro • 📞 Suporte humanizado
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
