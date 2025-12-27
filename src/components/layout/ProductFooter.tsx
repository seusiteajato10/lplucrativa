import { Instagram, Facebook, Twitter, Mail, MessageCircle, Clock, ShieldCheck, CreditCard } from "lucide-react";

const ProductFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">L</div>
              <span className="text-xl font-bold text-white">Loja Premium</span>
            </div>
            <p className="text-sm leading-relaxed">
              Sua loja de produtos premium com curadoria exclusiva e entrega garantida em todo o território nacional.
            </p>
            <p className="text-xs text-gray-500">Copyright © {new Date().getFullYear()} - Todos os direitos reservados.</p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Como Comprar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div>
            <h4 className="text-white font-bold mb-6">Atendimento</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Central de Suporte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rastreamento de Pedido</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span>contato@exemplo.com</span>
              </div>
              <div className="flex items-center gap-3 text-green-500 font-medium">
                <MessageCircle size={16} />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} />
                <span>Seg a Sex: 09h às 18h</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Twitter size={16} />
              </a>
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
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold">VISA</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold">MASTERCARD</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold">PIX</div>
              <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold">BOLETO</div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Segurança</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs border border-gray-700 px-3 py-2 rounded">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Site Seguro SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs border border-gray-700 px-3 py-2 rounded">
                <Lock size={16} className="text-blue-500" />
                <span>Google Safe Browsing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Faixa Final */}
      <div className="bg-black py-4">
        <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">
          Sua Loja de Produtos Premium - Todos os direitos reservados © 2025
        </p>
      </div>
    </footer>
  );
};

const Lock = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default ProductFooter;