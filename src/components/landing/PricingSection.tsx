import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "47",
    description: "Perfeito para começar",
    features: [
      "3 projetos ativos",
      "1.000 leads/mês",
      "Templates básicos",
      "Subdomínio LP Lucrativa",
      "Suporte por email",
    ],
    popular: false,
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "97",
    description: "O mais escolhido",
    features: [
      "10 projetos ativos",
      "10.000 leads/mês",
      "Todos os templates",
      "Domínio personalizado",
      "Integrações avançadas",
      "Suporte prioritário",
      "Analytics detalhado",
    ],
    popular: true,
    buttonVariant: "accent" as const,
  },
  {
    name: "Agency",
    price: "147",
    description: "Para agências e times",
    features: [
      "Projetos ilimitados",
      "Leads ilimitados",
      "Todos os templates",
      "Múltiplos domínios",
      "White-label",
      "API de integração",
      "Gerente de conta",
      "Onboarding dedicado",
    ],
    popular: false,
    buttonVariant: "outline" as const,
  },
];

const PricingSection = () => {
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
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-medium animate-fade-in-up ${
                plan.popular
                  ? "border-primary shadow-glow scale-105"
                  : "border-border hover:border-primary/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
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
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-muted-foreground text-lg">R$</span>
                  <span className="text-5xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
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
