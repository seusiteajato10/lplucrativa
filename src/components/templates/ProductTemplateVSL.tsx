import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  
  const templateData = data?.templateData || {};
  const product = {
    name: templateData.headline || projectName || "Seu Produto Incrível",
    description: templateData.subheadline || "Transforme sua vida em 30 dias",
    price: parseFloat(templateData.price) || 297,
    originalPrice: parseFloat(templateData.originalPrice) || 497,
    videoUrl: templateData.videoUrl || "",
    benefits: templateData.benefits || [
      "Acesso imediato e vitalício ao conteúdo completo",
      "Suporte prioritário 24/7 via WhatsApp",
      "Certificado de conclusão reconhecido",
      "Bônus exclusivos no valor de R$ 497",
      "Atualizações gratuitas para sempre"
    ],
    ctaText: templateData.ctaText || "SIM! QUERO TRANSFORMAR MINHA VIDA AGORA",
    garantia: templateData.garantia || "Garantia incondicional de 30 dias"
  };
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        
        <div className="text-center mb-6">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base px-8 py-3 shadow-2xl hover:scale-110 transition-transform duration-300">
            <Zap className="w-5 h-5 inline mr-2" />
            OFERTA RELÂMPAGO - {discount}% OFF
          </Badge>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight drop-shadow-2xl">
            {product.name}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white ml-2 font-semibold">4.9/5 - 2.847 avaliações</span>
          </div>
        </div>

        <div className="mb-8">
          <Card className="bg-red-600/90 border-red-400 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Clock className="w-8 h-8 text-yellow-300" />
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

        {product.videoUrl && (
          <Card className="mb-12 bg-black/60 border-purple-500/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500">
            <CardContent className="p-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-black">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={product.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allow
