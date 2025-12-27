import { Star, ShieldCheck, CreditCard, Lock, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import ProductFooter from "@/components/layout/ProductFooter";

interface ProductTemplateClassicProps {
  data?: any;
  projectName?: string;
}

export default function ProductTemplateClassic({ data, projectName }: ProductTemplateClassicProps) {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: templateData.styles.fontFamily }}>
      <main className="flex-1 pb-20">
        {/* Banner de Oferta */}
        <div className="bg-black text-white py-2 text-center text-xs font-bold uppercase tracking-widest">
          Promoção Exclusiva: Frete Grátis e Parcelamento em 12x
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-10">
          <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2">
              
              {/* Imagem Principal */}
              <div className="p-4 md:p-10 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-gray-100">
                <img 
                  src={templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"} 
                  className="max-w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  alt="Produto"
                />
              </div>

              {/* Informações de Venda */}
              <div className="p-6 md:p-10 flex flex-col text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">Lançamento 2024</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-gray-900 font-bold text-sm">4.9/5.0</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{templateData.headline || projectName}</h1>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {originalPrice > price && (
                      <span className="text-gray-400 line-through text-lg">R$ {originalPrice.toFixed(2)}</span>
                    )}
                    {discount > 0 && <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-bold rounded">-{discount}% OFF</span>}
                  </div>
                  <div className="text-4xl font-black text-green-600 mt-1">R$ {price.toFixed(2)}</div>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <CreditCard size={14} /> ou 12x de R$ {(price/12).toFixed(2)}
                  </p>
                </div>

                <Button 
                  className="w-full py-8 text-xl font-black rounded-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all mb-4"
                  style={{ backgroundColor: templateData.styles.primaryColor }}
                >
                  {templateData.ctaButtonText || "COMPRAR AGORA"}
                </Button>

                <div className="space-y-3 mb-8">
                  {templateData.productBenefits?.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <ShieldCheck size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto">
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded text-center">
                    <Lock size={16} className="mb-1 text-gray-400" />
                    <span className="text-[10px] font-bold uppercase text-gray-400">Seguro</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded text-center">
                    <Award size={16} className="mb-1 text-gray-400" />
                    <span className="text-[10px] font-bold uppercase text-gray-400">Original</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded text-center">
                    <Package size={16} className="mb-1 text-gray-400" />
                    <span className="text-[10px] font-bold uppercase text-gray-400">Rápido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-sm flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <ShieldCheck size={40} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{templateData.guaranteeTitle || "Compra Garantida"}</h3>
              <p className="text-sm text-gray-600">{templateData.guaranteeText}</p>
            </div>
          </div>
        </div>
      </main>
      <ProductFooter />
    </div>
  );
}

const Lock = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);