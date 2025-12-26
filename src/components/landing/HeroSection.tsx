import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { useHomepageContent } from "@/hooks/useHomepageContent"; // Import useHomepageContent

interface HeroSectionProps {
  heroContent?: {
    title?: string;
    subtitle?: string;
    primaryButton?: string;
    secondaryButton?: string;
  };
}

const HeroSection = ({ heroContent }: HeroSectionProps) => {
  // Fallback to default values if dynamic content is not provided
  const title = heroContent?.title || "Crie Landing Pages que Convertem em Minutos";
  const subtitle = heroContent?.subtitle || "Sem precisar de programação ou design. Templates prontos, editor visual intuitivo e tudo que você precisa para capturar leads e vender mais.";
  const primaryButtonText = heroContent?.primaryButton || "Começar agora grátis";
  const secondaryButtonText = heroContent?.secondaryButton || "Ver planos";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>A maneira mais fácil de criar landing pages</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {title.split(' ').map((word, i) => (
              word === 'Convertem' ? <span key={i} className="text-gradient">Convertem</span> : <span key={i}>{word} </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="accent" size="xl" asChild>
              <Link to="/signup" className="group">
                {primaryButtonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#precos">{secondaryButtonText}</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-foreground">
                <Zap className="w-5 h-5 text-accent" />
                5min
              </div>
              <p className="text-sm text-muted-foreground mt-1">Para criar sua LP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-foreground">
                <Target className="w-5 h-5 text-primary" />
                +50
              </div>
              <p className="text-sm text-muted-foreground mt-1">Templates prontos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">
                97%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Taxa de satisfação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;