import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Users } from "lucide-react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const templateData = data || {};
  
  const productName = templateData.headline || projectName || "Transforme Sua Rotina em 30 Dias";
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
    { name: "Maria Silva", role: "Empresária", text: "Melhor investimento que já fiz! Resultados em 15 dias." },
    { name: "João Santos", role: "Profissional Liberal", text: "Superou todas as minhas expectativas. Recomendo!" },
    { name: "Ana Costa", role: "Estudante", text: "Mudou completamente minha forma de trabalhar. Top!" }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {discount > 0 ? (
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-4 text-center font-bold">
          <span className="text-base md:text-lg">
            🔥 OFERTA RELÂMPAGO: {discount}% OFF • Apenas {productStock} vagas restantes • Termina em breve!
          </span>
        </div>
      ) : null}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        {/* HERO SECTION - Imagem/Vídeo ACIMA */}
        <div className="mb-8">
          
          <Badge className="bg-green-500 text-white px-4 py-2 mb-4 text-sm">
            ✓ Mais de 10.000 clientes satisfeitos
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            {productName}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-6">
            {productDescription}
          </p>

          {/* Avaliações */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-base font-bold text-gray-900">4.9/5</span>
            <span className="text-sm text-gray-600">(2.847 avaliações)</span>
          </div>

          {/* IMAGEM/VÍDEO */}
          {productVideo ? (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video mb-8">
              <iframe
                src={productVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <Card className="overflow-hidden shadow-2xl mb-8">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
                  alt={productName}
                  className="w-full aspect-video object-cover"
                />
              </CardContent>
            </Card>
          )}

          {/* CARD DE PREÇO E CTA */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              {productOriginalPrice > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl text-gray-500 line-through">
                    De R$ {productOriginalPrice.toFixed(2)}
                  </span>
                  {discount > 0 ? (
                    <Badge className="bg-red-500 text-white px-3 py-1 text-base">
                      -{discount}%
                    </Badge>
                  ) : null}
                </div>
              ) : null}
              
              <div className="mb-4">
                <p className="text-gray-700 text-lg mb-1">Por apenas:</p>
                <p className="text-5xl md:text-6xl font-black text-green-600 mb-2">
                  R$ {productPrice.toFixed(2)}
                </p>
                <p className="text-gray-700 text-base">
                  ou <strong className="text-green-600">12x de R$ {(productPrice / 12).toFixed(2)}</strong> sem juros
                </p>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-xl py-6 rounded-xl shadow-xl mb-4">
                🛒 {productCtaText}
              </Button>

              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <Shield className="w-4 h-4 mb-1 text-green-600" />
                  <span>Compra Segura</span>
                </div>
                <div className="flex flex-col items-center">
                  <Check className="w-4 h-4 mb-1 text-green-600" />
                  <span>Garantia 30 dias</span>
                </div>
                <div className="flex flex-col items-center">
                  <Check className="w-4 h-4 mb-1 text-green-600" />
                  <span>Acesso Imediato</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-red-600 font-bold mt-4">
            ⚠️ Apenas {productStock} vagas disponíveis hoje!
          </p>
        </div>

        {/* PROVA SOCIAL */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-8">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* BENEFÍCIOS */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-8">
            O Que Você Vai Receber
          </h2>
          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-base font-semibold text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GARANTIA */}
        <Card className="mb-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-3">
              Garantia Incondicional de 30 Dias
            </h2>
            <p className="text-lg">
              Se você não ficar 100% satisfeito, devolvemos TODO o seu dinheiro. Sem perguntas, sem burocracia. Você não tem nada a perder!
            </p>
          </CardContent>
        </Card>

        {/* CTA FINAL */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <CardContent className="p-10 text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Junte-se a +10.000 Pessoas que já Transformaram suas Vidas
            </h2>
            <p className="text-xl mb-6">
              Apenas {productStock} vagas restantes hoje!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black text-2xl py-8 px-12 rounded-2xl shadow-2xl mb-4">
              🚀 GARANTIR MINHA VAGA AGORA
            </Button>
            <p className="text-sm">
              ✓ Acesso imediato • ✓ Garantia de 30 dias • ✓ Suporte especializado
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
