import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, TrendingUp, Users, Award } from "lucide-react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  console.log("DEBUG - Data recebida:", data);
  console.log("DEBUG - ProjectName:", projectName);
  
  const templateData = data || {};
  
  const productName = templateData.headline || projectName || "Produto Premium";
  const productDescription = templateData.description || "Transforme sua vida com este produto excepcional";
  const productPrice = parseFloat(templateData.price) || 197;
  const productOriginalPrice = parseFloat(templateData.originalPrice) || 297;
  const productVideo = templateData.videoUrl || "";
  const productCtaText = templateData.ctaText || "QUERO GARANTIR MINHA VAGA";
  const productStock = templateData.stock || 47;
  
  const discount = productOriginalPrice && productPrice
    ? Math.round(((productOriginalPrice - productPrice) / productOriginalPrice) * 100)
    : 0;

  const benefits = [
    "Resultados comprovados em até 30 dias",
    "Suporte especializado 24/7",
    "Acesso vitalício ao conteúdo",
    "Atualizações gratuitas para sempre",
    "Comunidade exclusiva de membros",
    "Bônus exclusivos (valor R$ 497)"
  ];

  const testimonials = [
    { name: "Maria Silva", role: "Empresária", text: "Melhor investimento que já fiz! Resultados em 15 dias.", rating: 5 },
    { name: "João Santos", role: "Profissional Liberal", text: "Superou todas as minhas expectativas. Recomendo!", rating: 5 },
    { name: "Ana Costa", role: "Estudante", text: "Mudou completamente minha forma de trabalhar. Top!", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Barra de Urgência */}
      {discount > 0 ? (
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-4 text-center font-bold animate-pulse">
          <div className="container mx-auto px-4">
            <span className="text-lg md:text-xl">
              🔥 OFERTA RELÂMPAGO: {discount}% OFF • Apenas {productStock} vagas restantes • Termina em breve!
            </span>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Vídeo ou Imagem */}
          <div className="order-2 lg:order-1">
            {productVideo ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  src={productVideo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Headline + CTA */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <Badge className="bg-green-500 text-white px-4 py-2 w-fit mb-4 text-sm">
              ✓ Mais de 10.000 clientes satisfeitos
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {productName}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              {productDescription}
            </p>

            {/* Avaliações */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-600">(2.847 avaliações)</span>
            </div>

            {/* Preço */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-xl mb-6">
              <CardContent className="p-6">
                {productOriginalPrice > 0 ? (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl text-gray-500 line-through">
                      De R$ {productOriginalPrice.toFixed(2)}
                    </span>
                    {discount > 0 ? (
                      <Badge className="bg-red-500 text-white px-4 py-2 text-lg">
                        -{discount}%
                      </Badge>
                    ) : null}
                  </div>
                ) : null}
                
                <div className="mb-6">
                  <p className="text-gray-700 text-xl mb-2">Por apenas:</p>
                  <p className="text-6xl md:text-7xl font-black text-green-600 mb-2">
                    R$ {productPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-700 text-lg">
                    ou <strong className="text-green-600">12x de R$ {(productPrice / 12).toFixed(2)}</strong> sem juros
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl py-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 mb-4">
                  🛒 {productCtaText}
                </Button>

                <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-600">
                  <div className="flex flex-col items-center">
                    <Shield className="w-5 h-5 mb-1 text-green-600" />
                    <span>Compra Segura</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="w-5 h-5 mb-1 text-green-600" />
                    <span>Garantia 30 dias</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-5 h-5 mb-1 text-green-600" />
                    <span>Acesso Imediato</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-red-600 font-bold animate-pulse">
              ⚠️ Apenas {productStock} vagas disponíveis hoje!
            </p>
          </div>
        </div>

        {/* PROVA SOCIAL */}
        <div className="mb-20 bg-gray-50 py-16 -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-12">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* BENEFÍCIOS */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-12">
            O Que Você Vai Receber
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GARANTIA */}
        <Card className="mb-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <Shield className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">
              Garantia Incondicional de 30 Dias
            </h2>
            <p className="text-xl leading-relaxed">
              Se você não ficar 100% satisfeito, devolvemos TODO o seu dinheiro. Sem perguntas, sem burocracia.
              Você não tem nada a perder!
            </p>
          </CardContent>
        </Card>

        {/* CTA FINAL */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <CardContent className="p-12 md:p-16 text-center">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Junte-se a +10.000 Pessoas que já Transformaram suas Vidas
            </h2>
            <p className="text-2xl mb-8">
              Apenas {productStock} vagas restantes hoje!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black text-3xl py-10 px-16 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 mb-6">
              🚀 GARANTIR MINHA VAGA AGORA
            </Button>
            <p className="text-lg">
              ✓ Acesso imediato • ✓ Garantia de 30 dias • ✓ Suporte especializado
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
