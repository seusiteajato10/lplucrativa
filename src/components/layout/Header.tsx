import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Rocket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            LP <span className="text-gradient">Lucrativa</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('beneficios')} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Benefícios
          </button>
          <button onClick={() => scrollToSection('precos')} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Preços
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button variant="accent" asChild>
            <Link to="/signup">Começar grátis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;