import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface ProductTemplateVSLProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

export default function ProductTemplateVSL({ data, projectName, projectId, userId, slug }: ProductTemplateVSLProps) {
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

  const price = 197.00; // Valor base simulado
  
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
    <div className="min-h-screen bg-slate-900 text-slate-50 relative overflow-hidden" style={{ fontFamily: styles.fontFamily }}>
      {/* Círculos de brilho de fundo */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        
        {/* Banner Urgência */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 font-black text-sm md:text-base px-6 py-2 rounded-full shadow-xl animate-bounce">
            <Zap className="w-4 h-4 inline mr-2" />
            OFERTA ESPECIAL: {discount}% DE DESCONTO LIBERADO
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            {subheadline}
          </p>
          
          <div className="flex items-center justify-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-medium ml-2">Altíssima taxa de satisfação</span>
          </div>
        </div>

        {/* Timer Box */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="bg-red-600/20 border border-red-500/50 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-center gap-6">
              <div className="hidden sm:block">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold block">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase opacity-60">Horas</p>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase opacity-60">Minutos</p>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold block text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase opacity-60">Segundos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        {videoUrl && (
          <div className="mb-16 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-black">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?rel=0&modestbranding=1`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Tudo o que está incluso no seu acesso:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <p className="font-medium text-slate-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-1 border border-slate-700 shadow-2xl">
          <div className="bg-slate-900 rounded-[2.2rem] p-8 md:p-12 text-center">
            {originalPrice && (
              <p className="text-slate-500 text-lg line-through mb-2">
                De {originalPrice}
              </p>
            )}
            <p className="text-slate-300 font-medium mb-4">Por apenas 12x de:</p>
            <h3 className="text-6xl md:text-7xl font-black text-white mb-4">
              R$ {(price / 12).toFixed(2).replace('.', ',')}
            </h3>
            <p className="text-slate-400 mb-10">ou R$ {price.toFixed(2).replace('.', ',')} à vista</p>

            <button className="w-full bg-green-500 hover:bg-green-400 text-slate-950 font-black text-xl py-6 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-[1.02] active:scale-95 mb-6">
              {ctaButtonText || 'QUERO ME INSCREVER AGORA'}
            </button>

            {guaranteeText && (
              <div className="flex items-center justify-center gap-2 text-yellow-400/90 text-sm font-bold">
                <Shield className="w-5 h-5" />
                <span>{guaranteeText}</span>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center gap-4 opacity-50 grayscale">
              {/* Simulação de ícones de pagamento */}
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-slate-500 text-sm">
          <p className="mb-2">🔒 Sua compra é 100% segura e processada com criptografia.</p>
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}