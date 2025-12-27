import { useState } from "react";
import { Star, ShoppingCart, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import Footer from "@/components/layout/Footer";

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
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img src={images[selectedImg]} className="w-full h-full object-contain" alt="Produto" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)} className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImg === i ? 'border-primary' : 'border-transparent opacity-70'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{templateData.headline || projectName}</h1>
              <p className="text-lg text-gray-600 mb-8">{templateData.subheadline}</p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <div className="flex items-baseline gap-3 mb-1">
                  {originalPrice > price && <span className="text-xl text-gray-400 line-through">R$ {originalPrice.toFixed(2)}</span>}
                  <span className="text-4xl font-black text-gray-900" style={{ color: templateData.styles.primaryColor }}>R$ {price.toFixed(2)}</span>
                </div>
                <Button className="w-full h-16 text-lg font-bold rounded-xl mt-6" style={{ backgroundColor: templateData.styles.primaryColor }}>
                  <ShoppingCart size={20} className="mr-2" /> {templateData.ctaButtonText || "ADICIONAR AO CARRINHO"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer templateData={templateData} />
    </div>
  );
}