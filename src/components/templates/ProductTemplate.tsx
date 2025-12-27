import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Truck, Shield, Package, CreditCard, MapPin } from "lucide-react";
import { useState } from "react";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import Footer from "@/components/layout/Footer";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  
  const name = templateData.headline || projectName || "Produto Sem Nome";
  const description = templateData.heroText || templateData.aboutText || "Sem descrição definida.";
  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;
  const stock = templateData.stock || 47;
  
  const images = templateData.productImages && templateData.productImages.length > 0 
    ? templateData.productImages 
    : [templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"];
  
  const discount = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: templateData.styles.fontFamily }}>
      <main className="flex-1">
        {discount > 0 && (
          <div className="bg-red-600 text-white py-3 text-center font-bold">
            <span className="text-sm md:text-base">
              OFERTA: {discount}% OFF - Últimas {stock} unidades - Frete Grátis Brasil
            </span>
          </div>
        )}

        <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6 text-left">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img src={images[selectedImage]} alt={name} className="w-full aspect-square object-contain" />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                      <button key={idx} onClick={() => setSelectedImage(idx)} className={`rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-primary' : 'border-gray-200'}`}>
                        <img src={img} alt={`Preview ${idx}`} className="w-full aspect-square object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">{name}</h1>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-sm font-semibold">4.8</span>
                  <Badge className="bg-green-100 text-green-700 text-xs">Produto verificado</Badge>
                </div>
                <div className="mb-6">
                  {originalPrice > price && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg text-gray-500 line-through">R$ {originalPrice.toFixed(2)}</span>
                      <Badge className="bg-red-500 text-white">-{discount}%</Badge>
                    </div>
                  )}
                  <p className="text-4xl md:text-5xl font-black text-green-600 mb-2" style={{ color: templateData.styles.primaryColor }}>
                    R$ {price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">em até <strong>12x de R$ {(price / 12).toFixed(2)}</strong> sem juros</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2 text-sm"><Truck className="w-5 h-5 text-green-600" /> <span>Frete Grátis</span></div>
                  <div className="flex items-center gap-2 text-sm"><Shield className="w-5 h-5 text-green-600" /> <span>Compra segura</span></div>
                </div>
                <Button className="w-full text-white font-bold text-xl py-8 rounded-lg mb-3 hover:opacity-90 transition-opacity" style={{ backgroundColor: templateData.styles.primaryColor }}>
                  {templateData.ctaButtonText || "COMPRAR AGORA"}
                </Button>
                <p className="text-gray-700 text-sm leading-relaxed mt-6">{description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-2 border-dashed border-gray-200 mb-10">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold mb-2">{templateData.guaranteeTitle || "Garantia"}</h2>
            <p className="text-gray-600 max-w-lg mx-auto">{templateData.guaranteeText}</p>
          </div>
        </div>
      </main>
      <Footer templateData={templateData} />
    </div>
  );
}