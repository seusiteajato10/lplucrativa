import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const templateData = data?.templateData || {};
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = {
    name: templateData.headline || projectName || "Produto Premium",
    description: templateData.description || "Descrição detalhada do produto com todos os benefícios e características únicas que fazem dele a melhor escolha para você.",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    images: Array.isArray(templateData.images) && templateData.images.length > 0 
      ? templateData.images 
      : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    features: Array.isArray(templateData.features) && templateData.features.length > 0
      ? templateData.features
      : [
          "Material premium de alta qualidade",
          "Design moderno e elegante",
          "Durabilidade comprovada",
          "Garantia de 12 meses",
          "Envio rápido e seguro"
        ],
    specs: templateData.specs || {
      "Dimensões": "30cm x 20cm x 10cm",
      "Peso": "500g",
      "Material": "Alumínio premium",
      "Cor": "Preto fosco"
    },
    reviews: templateData.reviews || {
      rating: 4.8,
      count: 1243,
      comments: [
        { name: "João Silva", rating: 5, comment: "Produto excelente! Superou minhas expectativas.", date: "15/12/2024" },
        { name: "Maria Santos", rating: 5, comment: "Qualidade impecável, chegou rápido. Recomendo!", date: "10/12/2024" },
        { name: "Pedro Costa", rating: 4, comment: "Muito bom! Apenas o prazo poderia ser menor.", date: "05/12/2024" }
      ]
    },
    shipping: templateData.shipping || "Frete Grátis para todo o Brasil",
    ctaText: templateData.ctaText || "COMPRAR AGORA",
    stock: templateData.stock || 47
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header com Badge de Desconto */}
      {discount > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 text-center font-bold">
          🔥 PROMOÇÃO RELÂMPAGO: {discount}% OFF - Apenas {product.stock} unidades restantes!
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Seção Principal: Imagem + Compra */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Galeria de Imagens */}
          <div>
            <Card className="mb-4 overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === idx ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Card de Compra */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Avaliações */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span className="text-gray-700 font-semibold">{product.reviews.rating}/5</span>
              <span className="text-gray-500">({product.reviews.count} avaliações)</span>
            </div>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl mb-6">
              <CardContent className="p-6">
                {product.originalPrice > 0 && (
                  <div className="mb-3">
                    <span className="text-gray-500 text-xl line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <Badge className="ml-3 bg-red-500 text-white px-3 py-1 text-base">
                      -{discount}%
                    </Badge>
                  </div>
                )}
                
                <div className="mb-4">
                  <p className="text-gray-700 text-lg mb-1">Por apenas:</p>
                  <p className="text-5xl md:text-6xl font-black text-green-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 mt-2">
                    ou <strong>12x de R$ {(product.price / 12).toFixed(2)}</strong> sem juros
                  </p>
                </div>

                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    🚚 {product.shipping}
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-xl py-7 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 mb-3">
                  🛒 {product.ctaText}
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>🔒 Compra 100% Segura</span>
                  <span>|</span>
                  <span>✓ Entrega Garantida</span>
                </div>
              </CardContent>
            </Card>

            {/* Selos de Confiança */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🛡️ Garantia de 30 dias</Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">⚡ Envio em 24h</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">✓ Produto Original</Badge>
            </div>
          </div>
        </div>

        {/* Características do Produto */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              ✨ Características do Produto
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-green-500 text-2xl flex-shrink-0">✓</span>
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Especificações Técnicas */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              📋 Especificações Técnicas
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Avaliações de Clientes */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              ⭐ O que nossos clientes dizem
            </h2>
            <div className="space-y-4">
              {product.reviews.comments.map((review: any, idx: number) => (
                <div key={idx} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <span className="text-yellow-500 text-lg">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
          <CardContent className="p-10 text-center">
            <h2 className="text-4xl font-black mb-4">
              Pronto para adquirir o seu?
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Aproveite nossa oferta especial antes que acabe!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black text-2xl py-8 px-12 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
              🛒 COMPRAR AGORA COM DESCONTO
            </Button>
            <p className="mt-6 text-sm text-blue-200">
              Apenas {product.stock} unidades disponíveis
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
