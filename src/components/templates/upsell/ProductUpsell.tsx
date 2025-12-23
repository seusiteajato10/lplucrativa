import { Gift, ArrowRight, Clock, CheckCircle, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface ProductUpsellProps {
  config?: UpsellPageConfig;
  styles?: TemplateStyles;
  onAccept?: () => void;
  onDecline?: () => void;
}

const ProductUpsell = ({
  config,
  styles,
  onAccept,
  onDecline,
}: ProductUpsellProps) => {
  const primaryColor = styles?.primaryColor || "#8B5CF6";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 shadow-2xl overflow-hidden" style={{ borderColor: primaryColor }}>
        {/* Urgency Banner */}
        <div 
          className="py-3 px-6 text-center text-white font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <Gift className="w-5 h-5" />
          <span>OFERTA EXCLUSIVA - APENAS PARA VOCÊ</span>
          <Gift className="w-5 h-5" />
        </div>
        
        <CardContent className="p-8">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-6">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Esta oferta expira em 15:00 minutos</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {config?.title || "Espere! Você Ganhou um Desconto Especial!"}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8">
            {config?.subtitle || "Adicione este produto complementar ao seu pedido com 40% OFF"}
          </p>

          {/* Product Card */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {config?.productImage ? (
                <img 
                  src={config.productImage} 
                  alt={config.productName}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ) : (
                <div 
                  className="w-40 h-40 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <ShoppingBag className="w-16 h-16" style={{ color: primaryColor }} />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {config?.productName || "Kit Completo Premium"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {config?.description || "O complemento perfeito para maximizar seus resultados."}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-2xl text-muted-foreground line-through">
                    {config?.originalPrice || "R$ 297"}
                  </span>
                  <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                    {config?.discountPrice || config?.price || "R$ 177"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {(config?.benefits || [
              "Acesso imediato",
              "Suporte prioritário",
              "Atualizações gratuitas",
              "Garantia estendida"
            ]).map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full text-lg py-6 text-white font-bold"
              style={{ backgroundColor: primaryColor }}
              onClick={onAccept}
            >
              {config?.ctaAcceptText || "SIM! QUERO APROVEITAR ESTA OFERTA"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={onDecline}
            >
              <X className="w-4 h-4 mr-2" />
              {config?.ctaDeclineText || "Não, obrigado. Quero continuar sem o desconto."}
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Compra 100% segura • Garantia de 30 dias
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductUpsell;
