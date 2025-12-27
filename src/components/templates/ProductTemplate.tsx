import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Zap } from "lucide-react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

const defaultTemplateData = {
  headline: "",
  subheadline: "",
  price: "0",
  originalPrice: "",
  features: [],
  benefits: [],
  testimonials: [],
  ctaText: "Comprar Agora",
  garantia: "Garantia de 30 dias"
};

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const templateData = { ...defaultTemplateData, ...(data?.templateData || {}) };
  
  const {
    headline,
    subheadline,
    price,
    originalPrice,
    features = [],
    benefits = [],
    testimonials = [],
    ctaText,
    garantia
  } = templateData;

  const productPrice = parseFloat(price) || 0;
  const productOriginalPrice = originalPrice ? parseFloat(originalPrice) : null;
  const discount = productOriginalPrice 
    ? Math.round(((productOriginalPrice - productPrice) / productOriginalPrice) * 100)
    : 0;

  const displayFeatures = features.length > 0 ? features : [
    "Acesso vitalício ao produto",
    "Suporte prioritário",
    "Atualizações gratuitas",
    "Garantia de satisfação"
  ];

  const displayBenefits = benefits.length > 0 ? benefits : [
    "Economize tempo e dinheiro",
    "Resultados comprovados",
    "Fácil de usar"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          {discount > 0 && (
            <Badge className="mb-4 bg-red-500 text-white px-4 py-2 text-lg">
              {discount}% OFF - Oferta Limitada!
            </Badge>
          )}
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {headline || projectName || "Seu Produto Incrível"}
          </h1>
          
          {subheadline && (
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        {/* Preço */}
        <Card className="mb-12 border-2 border-blue-500 shadow-xl">
          <CardContent className="p-8 text-center">
            {productOriginalPrice && (
              <div className="mb-4">
                <p className="text-gray-500 text-xl line-through">
                  De R$ {productOriginalPrice.toFixed(2)}
                </p>
              </div>
            )}
            
            <div className="mb-6">
              <p className="text-blue-600 text-2xl font-semibold mb-2">Por apenas:</p>
              <p className="text-6xl font-black text-gray-900">
                R$ {productPrice.toFixed(2)}
              </p>
              <p className="text-gray-600 mt-2">
                ou 12x de R$ {(productPrice / 12).toFixed(2)}
              </p>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 rounded-lg font-bold shadow-lg">
              {ctaText}
            </Button>

            {garantia && (
              <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
                <Shield className="w-5 h-5" />
                <p className="font-semibold">{garantia}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Características */}
        {displayFeatures.length > 0 && (
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Zap className="w-8 h-8 text-yellow-500" />
                O que você vai receber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {displayFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefícios */}
        {displayBenefits.length > 0 && (
          <Card className="mb-12 bg-blue-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl">Por que escolher este produto?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayBenefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Depoimentos */}
        {testimonials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              O que nossos clientes dizem
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
          <CardContent className="p-10 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Junte-se a milhares de clientes satisfeitos!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-xl py-6 px-12 rounded-lg font-bold shadow-lg">
              {ctaText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
