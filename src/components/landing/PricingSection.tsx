import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription"; // Import the hook
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state

const PricingSection = () => {
  const { plans, loading, error } = useSubscription(); // Use the hook to get plans

  if (loading) {
    return (
      <section id="precos" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos simples,{" "}
              <span className="text-gradient">preços justos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Cancele quando quiser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative bg-card rounded-2xl p-8 border border-border animate-fade-in-up">
                <div className="text-center mb-8">
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto mb-4" />
                  <Skeleton className="h-10 w-24 mx-auto" />
                </div>
                <ul className="space-y-4 mb-8">
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="precos" className="py-24">
        <div className="container mx-auto px-4 text-center text-destructive">
          <p>Erro ao carregar planos: {error.message}</p>
        </div>
      </section>
    );
  }

  // Sort plans to ensure 'Pro' is in the middle if it exists
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.slug === 'pro') return 1;
    if (b.slug === 'pro') return -1;
    return a.price_monthly - b.price_monthly;
  });

  return (
    <section id="precos" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planos simples,{" "}
            <span className="text-gradient">preços justos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio. Cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sortedPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-medium animate-fade-in-up ${
                plan.slug === 'pro'
                  ? "border-primary shadow-glow scale-105"
                  : "border-border hover:border-primary/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.slug === 'pro' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 gradient-hero text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    Mais popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {/* You might want to add a description field to your plan schema */}
                  {plan.slug === 'starter' && 'Perfeito para começar'}
                  {plan.slug === 'pro' && 'O mais escolhido'}
                  {plan.slug === 'agency' && 'Para agências e times'}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-muted-foreground text-lg">R$</span>
                  <span className="text-5xl font-extrabold text-foreground">
                    {plan.price_monthly.toFixed(0)}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.slug === 'pro' ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.slug === 'pro' ? 'accent' : 'outline'}
                size="lg"
                className="w-full"
                asChild
              >
                <Link to="/signup">Escolher {plan.name}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          Todos os planos incluem 7 dias de teste grátis. Sem compromisso.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;