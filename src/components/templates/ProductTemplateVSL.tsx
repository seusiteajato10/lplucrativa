import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface ProductTemplateVSLProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const ProductTemplateVSL = ({ data, projectName, projectId, userId, slug }: ProductTemplateVSLProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  
  // Merge data with defaults
  const templateData: TemplateData = { ...defaultTemplateData, ...data } as TemplateData;

  const {
    headline,
    subheadline,
    ctaButtonText,
    videoUrl,
    productBenefits,
    originalPrice,
    guaranteeText,
    styles,
  } = templateData;

  // Preço atual (usando cta ou simulando do original)
  const price = 197.00; // Valor base se não houver no templateData
  
  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const cleanOriginalPrice = originalPrice ? parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.')) : 0;
  const discount = cleanOriginalPrice > price
    ? Math.round(((cleanOriginalPrice - price) / cleanOriginalPrice) * 100)
    : 30;

  const benefits = productBenefits && productBenefits.length > 0 
    ? productBenefits 
    : [
        "Acesso imediato e vitalício ao conteúdo completo",
        "Suporte prioritário 24/7 via WhatsApp",
        "Certificado de conclusão reconhecido",
        "Bônus exclusivos inclusos",
        "Atualizações gratuitas para sempre"
      ];

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" style={{ fontFamily: styles.fontFamily }}>
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDB2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        
        <div className="text-center mb-6">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base px-8 py-3 shadow-2xl animate-bounce">
            <Zap className="w-5 h-5 inline mr-2" />
            OFERTA RELÂMPAGO - {discount}% OFF
          </Badge>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {subheadline}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white ml-2 font-semibold">4.9/5 - Baseado em resultados reais</span>
          </div>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <Card className="bg-red-600/90 border-red-400 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Clock className="w-8 h-8 text-yellow-300" />
                <p className="text-white text-xl font-bold">OFERTA TERMINA EM:</p>
                <div className="flex gap-3">
                  <div className="bg-black/50 px-4 py-2 rounded-lg text-center">
                    <span className="text-3xl font-black text-yellow-300 block">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <p className="text-[10px] text-white">HORAS</p>
                  </div>
                  <div className="bg-black/50 px-4 py-2 rounded-lg text-center">
                    <span className="text-3xl font-black text-yellow-300 block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <p className="text-[10px] text-white">MIN</p>
                  </div>
                  <div className="bg-black/50 px-4 py-2 rounded-lg text-center">
                    <span className="text-3xl font-black text-yellow-300 block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <p className="text-[10px] text-white">SEG</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {videoUrl && (
          <Card className="mb-12 bg-black/60 border-purple-500/50 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?autoplay=0&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-12 bg-white/10 border-purple-400/30 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              O que você vai receber
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-100 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none shadow-2xl max-w-2xl mx-auto">
          <CardContent className="p-10 text-center">
            {originalPrice && (
              <div className="mb-4">
                <p className="text-gray-200 text-xl mb-1">De {originalPrice} por apenas:</p>
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-7xl md:text-8xl font-black text-white mb-3 drop-shadow-2xl">
                R$ {price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-xl text-gray-200">À vista no PIX ou Cartão</p>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl py-6 px-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105"
              onClick={() => window.location.href = '#'}
            >
              {ctaButtonText || '🚀 QUERO APROVEITAR AGORA'}
            </button>

            {guaranteeText && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-yellow-300" />
                <p className="text-yellow-300 font-bold">{guaranteeText}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center opacity-80">
          <p className="text-red-400 font-black mb-2 uppercase tracking-widest">
            ⚠️ Atenção: Vagas Limitadas
          </p>
          <p className="text-white text-sm">
            🔒 Pagamento 100% Seguro | 📱 Acesso Imediato
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateVSL;