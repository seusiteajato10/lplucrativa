import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
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

  const price = 197.00;
  
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
  
  const benefits = productBenefits && productBenefits.length > 0 
    ? productBenefits 
    : ["Acesso imediato", "Suporte 24/7", "Certificado incluso"];

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 py-12 px-4" style={{ fontFamily: styles.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Badge className="bg-yellow-500 text-black mb-6">OFERTA ESPECIAL</Badge>
        <h1 className="text-3xl md:text-6xl font-black mb-6 leading-tight">{headline}</h1>
        <p className="text-xl text-slate-300 mb-10">{subheadline}</p>

        <div className="bg-red-600/20 border border-red-500 rounded-xl p-4 mb-10 inline-block">
          <p className="text-sm font-bold uppercase tracking-widest mb-2 text-red-400">A oferta termina em:</p>
          <p className="text-3xl font-mono">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </p>
        </div>

        {videoUrl && (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-12 border-4 border-slate-800">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?rel=0`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-12 text-left">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <CheckCircle2 className="text-green-400 shrink-0" />
              <span className="text-slate-200">{b}</span>
            </div>
          ))}
        </div>

        <Card className="bg-slate-800 border-slate-700 p-8 shadow-2xl">
          <CardContent className="space-y-6 p-0">
            {originalPrice && <p className="text-slate-500 line-through text-xl">De {originalPrice}</p>}
            <p className="text-5xl md:text-7xl font-black text-white">R$ {price.toFixed(2).replace('.', ',')}</p>
            <Button 
              size="lg" 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-8 text-xl md:text-2xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-[1.02]"
            >
              {ctaButtonText || 'QUERO ME INSCREVER AGORA'}
            </Button>
            {guaranteeText && (
              <p className="text-sm text-slate-400 flex items-center justify-center gap-2 italic">
                <Shield className="w-4 h-4 text-yellow-500" /> {guaranteeText}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateVSL;