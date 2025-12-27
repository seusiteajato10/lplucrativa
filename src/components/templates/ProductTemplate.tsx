import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const templateData = data?.templateData || {};
  
  const product = {
    name: templateData.headline || projectName || "Produto Premium",
    description: templateData.description || "Descrição completa do produto",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    ctaText: templateData.ctaText || "COMPRAR AGORA",
    stock: templateData.stock || 47
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {discount > 0 ? (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 text-center font-bold">
          🔥 PROMOÇÃO: {discount}% OFF
        </div>
      ) : null}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          <div>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span className="text-gray-700 font-semibold">4.8/5</span>
            </div>

            <p className="text-gray-700 text-lg mb-6">
              {product.description}
            </p>

            <Card className="bg-blue-50 border-blue-200 shadow-xl mb-6">
              <CardContent className="p-6">
                {product.originalPrice > 0 ? (
                  <div className="mb-3">
                    <span className="text-gray-500 text-xl line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    {discount > 0 ? (
                      <Badge className="ml-3 bg-red-500 text-white px-3 py-1">
                        -{discount}%
                      </Badge>
                    ) : null}
                  </div>
                ) : null}
                
                <div className="mb-4">
                  <p className="text-gray-700 text-lg mb-1">Por apenas:</p>
                  <p className="text-5xl font-black text-green-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl py-6 rounded-xl shadow-xl mb-3">
                  🛒 {product.ctaText}
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>🔒 Compra Segura</span>
                  <span>|</span>
                  <span>✓ Entrega Garantida</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
          <CardContent className="p-10 text-center">
            <h2 className="text-4xl font-black mb-4">
              Pronto para comprar?
            </h2>
            <p className="text-xl mb-6">
              Apenas {product.stock} unidades disponíveis!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black text-2xl py-8 px-12 rounded-xl shadow-2xl">
              🛒 COMPRAR AGORA
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
