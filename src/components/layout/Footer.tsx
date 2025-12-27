import { Link } from "react-router-dom";
import { 
  Rocket, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck,
  Youtube
} from "lucide-react";
import { TemplateData } from "@/types/templateData";

interface FooterProps {
  contactContent?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  // Adicionando suporte para os dados do template
  templateData?: TemplateData;
}

const Footer = ({ contactContent, templateData }: FooterProps) => {
  // Configurações do rodapé (prioriza o que vem do editor de template)
  const config = templateData?.footer || {};
  
  const companyName = config.companyName || "LP Lucrativa";
  const companyDescription = config.companyDescription || contactContent?.address || "Sua loja de produtos premium";
  const email = config.email || contactContent?.email || "contato@exemplo.com";
  const phone = config.phone || contactContent?.phone || "(11) 99999-9999";
  const workingHours = config.workingHours || "Seg a Sex: 09h às 18h";
  
  const social = {
    instagram: config.socialInstagram || "#",
    facebook: config.socialFacebook || "#",
    twitter: config.socialTwitter || "#",
    youtube: config.socialYoutube || "#",
  };

  const links = {
    about: config.linkAbout || "#",
    privacy: config.linkPrivacy || "/privacidade",
    terms: config.linkTerms || "/termos",
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-left">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {config.companyLogo ? (
                <img src={config.companyLogo} alt={companyName} className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 gradient-hero rounded flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-xl font-bold text-white">{companyName}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {companyDescription}
            </p>
            <p className="text-xs text-gray-500">Copyright © {new Date().getFullYear()} - Todos os direitos reservados.</p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={links.about} className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Como Comprar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div>
            <h4 className="text-white font-bold mb-6">Atendimento</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Central de Suporte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rastreamento de Pedido</a></li>
              <li><a href={links.privacy} className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-3 text-green-500 font-medium">
                <MessageCircle size={16} />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} />
                <span>{workingHours}</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              {config.socialInstagram && (
                <a href={social.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all">
                  <Instagram size={16} />
                </a>
              )}
              {config.socialFacebook && (
                <a href={social.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all">
                  <Facebook size={16} />
                </a>
              )}
              {config.socialTwitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all">
                  <Twitter size={16} />
                </a>
              )}
              {config.socialYoutube && (
                <a href={social.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all">
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-800 w-full mb-8"></div>

        {/* Sub-footer: Pagamentos e Segurança */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Formas de Pagamento</span>
            <div className="flex gap-3">
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-white">VISA</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-white">MASTERCARD</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-white">PIX</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-white">BOLETO</div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Segurança</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs border border-gray-700 px-3 py-2 rounded">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Site Seguro SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-black py-4">
        <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">
          Todos os direitos reservados © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;