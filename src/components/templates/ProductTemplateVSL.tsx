import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductTemplateVSLProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    videoUrl?: string;
    benefits?: string[];
    ctaText?: string;
    garantia?: string;
  };
}

export function ProductTemplateVSL({ product }: ProductTemplateVSLProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  
  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const defaultBenefits = [
    "Acesso imediato e vitalício ao conteúdo completo",
    "Suporte prioritário 24/7 via WhatsApp",
    "Certificado de conclusão reconhecido",
    "Bônus exclusivos no valor de R$ 497",
    "Atualizações gratuitas para sempre"
  ];

  const benefits = product.benefits && product.benefits.length > 0 
    ? product.benefits 
    : defaultBenefits;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDB2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        
        {/* Badge topo animado */}
        <div className="text-center mb-6 animate-fade-in">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base px-8 py-3 shadow-2xl animate-bounce-slow hover:scale-110 transition-transform duration-300">
            <Zap className="w-5 h-5 inline mr-2" />
            OFERTA RELÂMPAGO - {discount}% OFF
          </Badge>
        </div>

        {/* Headline Principal com animação */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight drop-shadow-2xl">
            {product.name}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {product.description}
          </p>
          
          {/* Avaliação com estrelas */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-star-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
            <span className="text-white ml-2 font-semibold">4.9/5 - 2.847 avaliações</span>
          </div>
        </div>

        {/* Contador Regressivo */}
        <div className="mb-8">
          <Card className="bg-red-600/90 border-red-400 backdrop-blur-sm shadow-2xl animate-pulse-subtle">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Clock className="w-8 h-8 text-yellow-300 animate-spin-slow" />
                <p className="text-white text-xl font-bold">OFERTA TERMINA EM:</p>
                <div className="flex gap-3">
                  <div className="bg-black/50 px-4 py-2 rounded-lg">
                    <span className="text-3xl font-black text-yellow-300">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <p className="text-xs text-white">HORAS</p>
                  </div>
                  <div className="bg-black/50 px-4 py-2 rounded-lg">
                    <span className="text-3xl font-black text-yellow-300">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <p className="text-xs text-white">MIN</p>
                  </div>
                  <div className="bg-black/50 px-4 py-2 rounded-lg">
                    <span className="text-3xl font-black text-yellow-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <p className="text-xs text-white">SEG</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Player de Vídeo com shadow melhorado */}
        {product.videoUrl && (
          <Card className="mb-12 bg-black/60 border-purple-500/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 animate-fade-in">
            <CardContent className="p-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-black group">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={product.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={product.videoUrl}
                    controls
                    className="w-full h-full"
                  >
                    Seu navegador não suporta vídeo.
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none group-hover:from-black/30 transition-all duration-300"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefícios com animação */}
        <Card className="mb-12 bg-white/10 border-purple-400/30 backdrop-blur-xl shadow-2xl hover:shadow-purple-400/50 transition-all duration-500 animate-slide-right">
          <CardContent className="p-8">
            <h2 className="text-4xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-yellow-400" />
              O que você vai receber
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-7 h-7 text-green-400 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-gray-100 text-lg font-medium leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preço e CTA com animações intensas */}
        <Card className="mb-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none shadow-2xl hover:shadow-pink-500/80 transition-all duration-500 animate-scale-in">
          <CardContent className="p-10 text-center">
            {product.originalPrice && (
              <div className="mb-6 animate-fade-in">
                <p className="text-gray-200 text-2xl mb-3 font-semibold">De:</p>
                <p className="text-5xl text-white/80 line-through font-bold">
                  R$ {product.originalPrice.toFixed(2)}
                </p>
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-yellow-300 text-3xl font-black mb-4 animate-pulse">
                Por apenas 12x de:
              </p>
              <p className="text-7xl md:text-8xl font-black text-white mb-3 drop-shadow-2xl animate-bounce-slow">
                R$ {(product.price / 12).toFixed(2)}
              </p>
              <p className="text-2xl text-gray-200 mb-4">
                ou R$ {product.price.toFixed(2)} à vista
              </p>
              {discount > 0 && (
                <Badge className="bg-yellow-400 text-black text-2xl px-6 py-3 font-black animate-pulse">
                  ECONOMIZE {discount}%
                </Badge>
              )}
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl md:text-3xl py-8 px-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 animate-pulse-glow">
              {product.ctaText || '🚀 SIM! QUERO TRANSFORMAR MINHA VIDA AGORA'}
            </button>

            {product.garantia && (
              <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in">
                <Shield className="w-8 h-8 text-yellow-300" />
                <p className="text-yellow-300 text-xl font-bold">
                  {product.garantia}
                </p>
              </div>
            )}
            
            <p className="mt-6 text-gray-200 text-sm">
              🔒 Pagamento 100% Seguro | 📱 Acesso Imediato
            </p>
          </CardContent>
        </Card>

        {/* Urgência final */}
        <div className="text-center animate-pulse">
          <p className="text-red-400 text-2xl md:text-3xl font-black mb-3">
            ⚠️ ATENÇÃO: VAGAS LIMITADAS
          </p>
          <p className="text-white text-lg">
            Apenas <span className="text-yellow-300 font-bold">7 vagas</span> restantes com esse desconto!
          </p>
        </div>
      </div>

      {/* CSS para animações customizadas */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.8); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        
        @keyframes star-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-slide-right { animation: slide-right 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .animate-star-pulse { animation: star-pulse 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
