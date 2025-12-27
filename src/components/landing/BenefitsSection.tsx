import { Layout, MousePointerClick, Mail, Globe } from "lucide-react";
import { useHomepageContent } from "@/hooks/useHomepageContent"; // Import useHomepageContent

interface BenefitsSectionProps {
  featuresContent?: {
    title?: string;
    items?: { title: string; description: string }[];
  };
}

const defaultBenefits = [
  {
    icon: Layout,
    title: "Templates Prontos",
    description: "Modelos otimizados para Produtos, Serviços, Eventos e Cursos. Basta escolher e personalizar.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MousePointerClick,
    title: "Editor Super Simples",
    description: "Interface visual intuitiva que qualquer pessoa consegue usar. Arraste, solte e publique.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Mail,
    title: "Captura de Leads",
    description: "Integração com e-mail marketing e CRM para você não perder nenhuma oportunidade de venda.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Domínio Personalizado",
    description: "Use nosso domínio gratuito ou conecte seu próprio domínio para uma identidade profissional.",
    color: "bg-accent/10 text-accent",
  },
];

const BenefitsSection = ({ featuresContent }: BenefitsSectionProps) => {
  // Fallback to default values if dynamic content is not provided
  const title = featuresContent?.title || "Tudo que você precisa para vender mais";
  const items = featuresContent?.items && featuresContent.items.length > 0 ? featuresContent.items : defaultBenefits.map(benefit => ({
    title: benefit.title,
    description: benefit.description
  }));

  return (
    <section id="beneficios" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title.split(' ').map((word, i) => (
              word === 'mais' ? <span key={i} className="text-gradient">mais</span> : <span key={i}>{word} </span>
            ))}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para criar, publicar e otimizar suas landing pages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((benefit, index) => {
            const defaultBenefit = defaultBenefits[index] || defaultBenefits[0];
            const IconComponent = defaultBenefit.icon;
            
            return (
              <div
                key={benefit.title}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl ${defaultBenefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;