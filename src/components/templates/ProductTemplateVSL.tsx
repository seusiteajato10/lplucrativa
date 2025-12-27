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
                    allowFullScreen
                  />
                ) : (
                  <video src={product.videoUrl} controls className="w-full h-full">
                    Seu navegador não suporta vídeo.
                  </video>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-12 bg-white/10 border-purple-400/30 backdrop-blur-xl shadow-2xl hover:shadow-purple-400/50 transition-all duration-500">
          <CardContent className="p-8">
            <h2 className="text-4xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-yellow-400" />
              O que você vai receber
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {product.benefits.map((benefit: string, index: number) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <CheckCircle2 className="w-7 h-7 text-green-400 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-gray-100 text-lg font-medium leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none shadow-2xl hover:shadow-pink-500/80 transition-all duration-500">
          <CardContent className="p-10 text-center">
            {product.originalPrice && (
              <div className="mb-6">
                <p className="text-gray-200 text-2xl mb-3 font-semibold">De:</p>
                <p className="text-5xl text-white/80 line-through font-bold">
                  R$ {product.originalPrice.toFixed(2)}
                </p>
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-yellow-300 text-3xl font-black mb-4">
                Por apenas 12x de:
              </p>
              <p className="text-7xl md:text-8xl font-black text-white mb-3 drop-shadow-2xl">
                R$ {(product.price / 12).toFixed(2)}
              </p>
              <p className="text-2xl text-gray-200 mb-4">
                ou R$ {product.price.toFixed(2)} à vista
              </p>
              {discount > 0 && (
                <Badge className="bg-yellow-400 text-black text-2xl px-6 py-3 font-black">
                  ECONOMIZE {discount}%
                </Badge>
              )}
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl md:text-3xl py-8 px-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50">
              🚀 {product.ctaText}
            </Button>

            {product.garantia && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Shield className="w-8 h-8 text-yellow-300" />
                <p className="text-yellow-300 text-xl font-bold">
                  🛡️ {product.garantia}
                </p>
              </div>
            )}
            
            <p className="mt-6 text-gray-200 text-sm">
              🔒 Pagamento 100% Seguro | 📱 Acesso Imediato
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-red-400 text-2xl md:text-3xl font-black mb-3">
            ⚠️ ATENÇÃO: VAGAS LIMITADAS
          </p>
          <p className="text-white text-lg">
            Apenas <span className="text-yellow-300 font-bold">7 vagas</span> restantes com esse desconto!
          </p>
        </div>
      </div>
    </div>
  );
}
