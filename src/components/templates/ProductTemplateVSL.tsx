import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const templateData = data || {};
  
  const product = {
    name: projectName || "Fone de Ouvido Bluetooth Premium",
    description: "Tecnologia de cancelamento de ruído ativo e bateria de 30 horas",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    videoUrl: templateData.videoUrl || "",
    ctaText: "COMPRAR AGORA",
    garantia: "Garantia do fabricante de 12 meses",
    estoque: templateData.estoque || 47
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <div className="text-center mb-6">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base px-8 py-3 shadow-2xl">
            ⚡ OFERTA RELÂMPAGO - {discount}% OFF
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
            <span className="text-yellow-400 text-2xl">★★★★★</span>
            <span className="text-white ml-2 font-semibold">4.8/5 - 324 avaliações</span>
          </div>
        </div>

        {product.videoUrl && (
          <Card className="mb-12 bg-black/60 border-purple-500/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-black">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={product.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : product.videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={product.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
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

        <Card className="mb-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none shadow-2xl">
          <CardContent className="p-10 text-center">
            {product.originalPrice > 0 && (
              <div className="mb-6">
                <p className="text-gray-200 text-2xl mb-3 font-semibold">De:</p>
                <p className="text-5xl text-white/80 line-through font-bold">
                  R$ {product.originalPrice.toFixed(2)}
                </p>
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-yellow-300 text-3xl font-black mb-4">
                Por apenas:
              </p>
              <p className="text-7xl md:text-8xl font-black text-white mb-3 drop-shadow-2xl">
                R$ {product.price.toFixed(2)}
              </p>
              
              {discount > 0 && (
                <Badge className="bg-yellow-400 text-black text-2xl px-6 py-3 font-black mt-4">
                  ECONOMIZE {discount}%
                </Badge>
              )}
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl md:text-3xl py-8 px-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
              🛒 {product.ctaText}
            </Button>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-yellow-300 text-2xl">🛡️</span>
              <p className="text-yellow-300 text-xl font-bold">
                {product.garantia}
              </p>
            </div>
            
            <p className="mt-6 text-gray-200 text-sm">
              🔒 Pagamento 100% Seguro | 🚚 Frete Grátis
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-red-400 text-2xl md:text-3xl font-black mb-3">
            ⚠️ ATENÇÃO: ESTOQUE LIMITADO
          </p>
          <p className="text-white text-lg">
            Apenas <span className="text-yellow-300 font-bold">{product.estoque} unidades</span> restantes com esse desconto!
          </p>
        </div>
      </div>
    </div>
  );
}
