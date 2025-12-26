import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { useHomepageContent } from "@/hooks/useHomepageContent"; // Import useHomepageContent

interface FooterProps {
  contactContent?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const Footer = ({ contactContent }: FooterProps) => {
  // Fallback to default values if dynamic content is not provided
  const email = contactContent?.email || "contato@lplucrativa.com.br";
  const phone = contactContent?.phone || "(XX) XXXX-XXXX";
  const address = contactContent?.address || "Rua Exemplo, 123 - Cidade, Estado";

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                LP <span className="text-gradient">Lucrativa</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Crie landing pages de alta conversão em minutos, sem precisar de conhecimentos técnicos. 
              A ferramenta perfeita para empreendedores e marketeiros.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beneficios" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#precos" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Preços
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LP Lucrativa. Todos os direitos reservados.
          </p>
          <div className="text-muted-foreground text-xs mt-2">
            <p>Email: {email}</p>
            <p>Telefone: {phone}</p>
            <p>Endereço: {address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;