import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductFooter from "@/components/layout/ProductFooter";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const templateData = data || {};
  
  const product = {
    name: projectName || "Smartwatch Pro X1",
    description: "Monitoramento de saúde 24h, GPS integrado e bateria de 7 dias",
    price: parseFloat(templateData.price) || 297,
    originalPrice: parseFloat(templateData.originalPrice) || 497,
    videoUrl: templateData.videoUrl || "",
    estoque: templateData.estoque || 47
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 40;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex flex-col">
      <main className="flex-1">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-3 text-center">
          <span className="text-purple-950 font-black text-sm md:text-base uppercase tracking-wide">
            OFERTA RELÂMPAGO - {discount}% OFF
          </span>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-center mb-4 leading-tight drop-shadow-2xl">
            {product.name}
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex text-2xl">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-yellow-400">★</span>
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9/5</span>
            <span className="text-purple-200 text-sm">2.847 avaliações</span>
          </div>

          {product.videoUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-black/50 p-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-black">
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
            </div>
          )}

          <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl mb-10">
            
            {product.originalPrice > 0 && (
              <div className="text-center mb-6">
                <p className="text-pink-100 text-xl mb-2 font-semibold">De:</p>
                <p className="text-4xl md:text-5xl text-white/90 line-through font-bold">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </p>
              </div>
            )}
            
            <div className="text-center mb-8">
              <p className="text-yellow-300 text-2xl md:text-3xl font-black mb-3">
                Por apenas:
              </p>
              <p className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 drop-shadow-2xl">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              
              {discount > 0 && (
                <div className="inline-block bg-yellow-400 px-8 py-3 rounded-full shadow-xl">
                  <span className="text-purple-950 font-black text-xl uppercase">
                    ECONOMIZE {discount}%
                  </span>
                </div>
              )}
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-xl md:text-2xl lg:text-3xl py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-6">
              QUERO GARANTIR AGORA
            </Button>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">🛡️</span>
              <p className="text-yellow-300 text-lg font-bold">
                Garantia incondicional de 30 dias
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-pink-100 text-sm font-semibold">
              <span className="flex items-center gap-2">
                🔒 Pagamento 100% Seguro
              </span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-2">
                🚚 Acesso Imediato
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 md:p-8 text-center shadow-xl mb-12">
            <p className="text-purple-950 font-black text-2xl md:text-3xl mb-2">
              ⚠️ ATENÇÃO: VAGAS LIMITADAS
            </p>
            <p className="text-purple-900 font-bold text-lg">
              Apenas <span className="text-red-600">{product.estoque} vagas</span> restantes com esse desconto!
            </p>
          </div>
        </div>
      </main>
      <ProductFooter />
    </div>
  );
}