import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface MinimalistTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function MinimalistTemplate({ data, projectName }: MinimalistTemplateProps) {
  const templateData = data || {};
  
  const product = {
    name: projectName || "Produto Premium",
    description: "Simplicidade e elegância em cada detalhe",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    heroImageUrl: templateData.heroImageUrl || "",
    features: templateData.productBenefits || [
      "Design minimalista",
      "Qualidade superior",
      "Entrega rápida"
    ]
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 34;

  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Layout centrado e limpo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>

        {/* Imagem principal */}
        <div className="mb-12">
          <div className="aspect-square max-w-xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
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
        </div>

        {/* Preço */}
        <div className="text-center mb-8">
          {product.originalPrice > 0 && (
            <div className="text-lg text-gray-400 line-through mb-2">
              R$ {product.originalPrice.toFixed(2)}
            </div>
          )}
          <div className="text-6xl font-light text-gray-900 mb-2">
            R$ {product.price.toFixed(2)}
          </div>
          {discount > 0 && (
            <div className="text-sm text-gray-600">
              Economize {discount}%
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mb-12">
          <Button className="w-full max-w-md mx-auto block bg-black hover:bg-gray-800 text-white font-medium text-lg py-6 rounded-none">
            Comprar
          </Button>
        </div>

        {/* Features minimalistas */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {product.features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <Check className="w-6 h-6 text-gray-900 mb-3" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info adicional */}
        <div className="text-center mt-12 text-sm text-gray-500 space-y-1">
          <p>Entrega gratuita</p>
          <p>Garantia de 12 meses</p>
          <p>Pagamento 100% seguro</p>
        </div>

      </div>
    </div>
  );
}
