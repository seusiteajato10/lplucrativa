import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import Footer from "@/components/layout/Footer";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  
  const product = {
    name: projectName || "Smartwatch Pro X1",
    description: templateData.subheadline || "A solução que você buscava",
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
            {templateData.headline || product.name}
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex text-2xl text-yellow-400">★★★★★</div>
            <span className="text-white font-bold text-lg">4.9/5</span>
          </div>

          {product.videoUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-black/50 p-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={product.videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl mb-10 text-center">
            {product.originalPrice > 0 && (
              <p className="text-white/90 line-through text-2xl mb-2">R$ {product.originalPrice.toFixed(2)}</p>
            )}
            <p className="text-6xl md:text-8xl font-black text-white mb-6">R$ {product.price.toFixed(2)}</p>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-2xl py-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
              {templateData.ctaButtonText || "QUERO GARANTIR AGORA"}
            </Button>
          </div>
        </div>
      </main>
      <Footer templateData={templateData} />
    </div>
  );
}