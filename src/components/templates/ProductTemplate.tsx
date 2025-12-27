import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Truck, Shield, Package, CreditCard, MapPin } from "lucide-react";
import { useState } from "react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const templateData = data || {};
  
  const productName = projectName || "Fone de Ouvido Bluetooth Premium";
  const productDescription = "Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas e som de alta fidelidade. Ideal para trabalho, estudo e entretenimento.";
  const productPrice = parseFloat(templateData.price) || 197;
  const productOriginalPrice = parseFloat(templateData.originalPrice) || 297;
  const productStock = templateData.stock || 47;
  const productImages = Array.isArray(templateData.images) && templateData.images.length > 0 
    ? templateData.images 
    : [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
        "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800"
      ];
  
  const discount = productOriginalPrice && productPrice
    ? Math.round(((productOriginalPrice - productPrice) / productOriginalPrice) * 100)
    : 0;

  const specifications = {
    "Marca": "Premium Audio",
    "Modelo": "BT-2024",
    "Conectividade": "Bluetooth 5.0",
    "Autonomia da Bateria": "Até 30 horas",
    "Tempo de Recarga": "2 horas",
    "Peso": "250g",
    "Garantia": "12 meses",
    "Material": "Plástico ABS + Almofadas em Couro",
    "Cores Disponíveis": "Preto, Branco, Azul"
  };

  const features = [
    "Cancelamento ativo de ruído (ANC)",
    "Bateria de longa duração - até 30 horas",
    "Conexão Bluetooth 5.0 ultra estável",
    "Almofadas macias em couro sintético",
    "Microfone HD embutido para chamadas",
    "Design dobrável com estojo rígido incluído"
  ];

  const reviews = [
    { name: "Carlos M.", city: "São Paulo - SP", rating: 5, comment: "Som excelente! Chegou em 2 dias. Super recomendo.", verified: true },
    { name: "Ana P.", city: "Rio de Janeiro - RJ", rating: 5, comment: "Qualidade surpreendente pelo preço. Vale cada centavo!", verified: true },
    { name: "João S.", city: "Belo Horizonte - MG", rating: 4, comment: "Muito bom! Confortável para usar o dia todo.", verified: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {discount > 0 && (
        <div className="bg-red-600 text-white py-3 text-center font-bold">
          <span className="text-sm md:text-base">
            OFERTA: {discount}% OFF - Últimas {productStock} unidades - Frete Grátis Brasil
          </span>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
        
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            
            <div>
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={productImages[selectedImage]} 
                  alt={productName}
                  className="w-full aspect-square object-cover"
                />
              </div>
              
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full aspect-square object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                {productName}
              </h1>

              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-sm text-gray-500">(324 avaliações)</span>
                <Badge className="bg-green-100 text-green-700 text-xs">Produto verificado</Badge>
              </div>

              <div className="mb-6">
                {productOriginalPrice > 0 && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-gray-500 line-through">
                      R$ {productOriginalPrice.toFixed(2)}
                    </span>
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white px-2 py-1">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                )}
                
                <p className="text-4xl md:text-5xl font-black text-green-600 mb-2">
                  R$ {productPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  em até <strong>12x de R$ {(productPrice / 12).toFixed(2)}</strong> sem juros
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Frete Grátis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-5 h-5 text-green-600" />
                  <span>Entrega rápida</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Compra segura</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span>Parcele sem juros</span>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-orange-800 font-semibold text-sm">
                  Atenção: Apenas {productStock} unidades disponíveis em estoque
                </p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 rounded-lg mb-3">
                COMPRAR AGORA
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Calcular frete para sua região</span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {productDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Características do Produto
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Especificações Técnicas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Avaliações de Clientes Verificados
          </h2>
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.city}</p>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star} 
                        className={star <= review.rating ? 'w-4 h-4 fill-yellow-400 text-yellow-400' : 'w-4 h-4 text-gray-300'} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
                {review.verified && (
                  <Badge className="bg-green-100 text-green-700 text-xs mt-2">Compra verificada</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
