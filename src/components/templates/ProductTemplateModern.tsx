import { useState } from "react";
import { Star, ShoppingCart, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import ProductFooter from "@/components/layout/ProductFooter";

interface ProductTemplateModernProps {
  data?: any;
  projectName?: string;
}

export default function ProductTemplateModern({ data, projectName }: ProductTemplateModernProps) {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const [selectedImg, setSelectedImg] = useState(0);

  const images = templateData.productImages?.length 
    ? templateData.productImages 
    : [templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"];

  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: templateData.styles.fontFamily }}>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Coluna Esquerda: Imagens */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                <img src={images[selectedImg]} className="w-full h-full object-contain" alt="Produto" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImg(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-primary' : 'border-transparent opacity-70'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </div>
            </div>

            {/* Coluna Direita: Informações */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium text-gray-500">(128 avaliações)</span>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {templateData.headline || projectName}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {templateData.subheadline}
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <div className="flex items-baseline gap-3 mb-1">
                  {originalPrice > price && (
                    <span className="text-xl text-gray-400 line-through">R$ {originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-4xl font-black text-gray-900" style={{ color: templateData.styles.primaryColor }}>
                    R$ {price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Em até 12x de R$ {(price/12).toFixed(2)} sem juros</p>
                
                <Button 
                  className="w-full h-16 text-lg font-bold rounded-xl shadow-lg hover:opacity-90 transition-all gap-2"
                  style={{ backgroundColor: templateData.styles.primaryColor }}
                >
                  <ShoppingCart size={20} />
                  {templateData.ctaButtonText || "ADICIONAR AO CARRINHO"}
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                {templateData.productBenefits?.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                      <Zap size={12} fill="currentColor" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Truck size={18} className="text-gray-400" /> Frete grátis em todo o Brasil
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={18} className="text-gray-400" /> Garantia de {templateData.guaranteeDays} dias
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ProductFooter />
    </div>
  );
}