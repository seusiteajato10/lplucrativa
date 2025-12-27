import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Truck, Shield, CreditCard } from "lucide-react";

interface ModernTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ModernTemplate({ data, projectName }: ModernTemplateProps) {
  const templateData = data || {};
  
  const product = {
    name: projectName || "Produto Premium",
    description: "Design moderno e funcionalidade excepcional",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    heroImageUrl: templateData.heroImageUrl || "",
    productImages: templateData.productImages || [],
    features: templateData.productBenefits || [
      "Alta qualidade garantida",
      "Design exclusivo",
      "Durabilidade superior"
    ]
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 34;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header com badge de desconto */}
      <div className="bg-black text-white py-3 text-center">
        <span className="font-bold text-sm uppercase tracking-wider">
          ⚡ Oferta Especial: {discount}% OFF
        </span>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* Grid 2 colunas - Imagem + Informações */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Coluna 1: Imagem */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              {product.heroImageUrl ? (
                <img 
                  src={product.heroImageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Imagem do Produto
                </div>
              )}
            </div>
            
            {/* Badge de desconto flutuante */}
            {discount > 0 && (
              <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-black">-{discount}%</div>
                  <div className="text-xs">OFF</div>
                </div>
              </div>
            )}
          </div>

          {/* Coluna 2: Informações */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {product.description}
            </p>

            {/* Avaliações */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">4.8/5</span>
              <span className="text-gray-500 text-sm">(324 avaliações)</span>
            </div>

            {/* Preço */}
            <div className="mb-8">
              {product.originalPrice > 0 && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-400 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500 text-white">
                    Economize R$ {(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </div>
              )}
              <div className="text-5xl font-black text-gray-900">
                R$ {product.price.toFixed(2)}
              </div>
              <p className="text-gray-600 mt-2">ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros</p>
            </div>

            {/* CTA */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-7 rounded-xl mb-6 shadow-lg">
              Comprar Agora
            </Button>

            {/* Garantias */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <Truck className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-gray-700 font-semibold">Frete Grátis</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-gray-700 font-semibold">Garantia 12m</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-gray-700 font-semibold">Pag. Seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Por que escolher este produto?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
