import { CheckCircle, Package, ArrowRight, Gift, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThankYouPageConfig, UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface ProductThankYouProps {
  config?: ThankYouPageConfig;
  upsellConfig?: UpsellPageConfig;
  styles?: TemplateStyles;
  leadName?: string;
  leadEmail?: string;
  onUpsellClick?: () => void;
  showCheckoutButton?: boolean;
  checkoutButtonText?: string;
  onCheckoutClick?: () => void;
}

const ProductThankYou = ({
  config,
  upsellConfig,
  styles,
  leadName,
  leadEmail,
  onUpsellClick,
  showCheckoutButton,
  checkoutButtonText,
  onCheckoutClick,
}: ProductThankYouProps) => {
  const primaryColor = styles?.primaryColor || "#8B5CF6";
  const secondaryColor = styles?.secondaryColor || "#A78BFA";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Success Header */}
      <div 
        className="py-16 text-center"
        style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}10)` }}
      >
        <div className="container mx-auto px-4">
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {config?.title || "Parabéns! Compra Confirmada!"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {config?.subtitle || "Seu pedido foi processado com sucesso. Você receberá um email com os detalhes."}
          </p>
          {leadName && (
            <p className="text-lg text-muted-foreground mt-4">
              Olá, <span className="font-semibold text-foreground">{leadName}</span>!
            </p>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Checkout Button (for after_lead type) */}
          {showCheckoutButton && (
            <Card 
              className="border-2 shadow-xl"
              style={{ borderColor: primaryColor }}
            >
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4" style={{ color: primaryColor }} />
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Finalize sua compra agora!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Clique no botão abaixo para garantir seu produto com condições especiais.
                </p>
                <Button 
                  size="lg" 
                  className="text-white text-lg px-8 py-6"
                  style={{ backgroundColor: primaryColor }}
                  onClick={onCheckoutClick}
                >
                  {checkoutButtonText || "Comprar Agora"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* What happens next */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Package className="w-6 h-6" style={{ color: primaryColor }} />
                Próximos Passos
              </h2>
              <div className="space-y-4">
                {(config?.nextSteps || [
                  "Verifique seu email para os detalhes do pedido",
                  "Acompanhe o status da entrega pelo link enviado",
                  "Entre em contato caso tenha dúvidas"
                ]).map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upsell Offer */}
          {upsellConfig?.enabled && !showCheckoutButton && (
            <Card 
              className="border-2 shadow-xl overflow-hidden"
              style={{ borderColor: primaryColor }}
            >
              <div 
                className="py-3 px-6 text-center text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                <Gift className="w-5 h-5 inline-block mr-2" />
                OFERTA EXCLUSIVA - APENAS AGORA
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Oferta expira em 15 minutos!</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {upsellConfig.title || "Aproveite e leve também!"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {upsellConfig.description || "Complemento perfeito para sua compra com desconto exclusivo."}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  {upsellConfig.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      R$ {upsellConfig.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                    R$ {upsellConfig.price || "97"}
                  </span>
                  {upsellConfig.discount && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      -{upsellConfig.discount}%
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 text-white"
                    style={{ backgroundColor: primaryColor }}
                    onClick={onUpsellClick}
                  >
                    SIM, QUERO APROVEITAR!
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground"
                  >
                    Não, obrigado
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Support Info */}
          <div className="text-center text-muted-foreground">
            <p>Dúvidas? Entre em contato conosco</p>
            {leadEmail && (
              <p className="text-sm mt-2">
                Enviamos os detalhes para: <span className="font-medium">{leadEmail}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductThankYou;
