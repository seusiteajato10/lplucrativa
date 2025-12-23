import { CheckCircle, Calendar, ArrowRight, Star, Clock, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThankYouPageConfig, UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface ServiceThankYouProps {
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

const ServiceThankYou = ({
  config,
  upsellConfig,
  styles,
  leadName,
  leadEmail,
  onUpsellClick,
  showCheckoutButton,
  checkoutButtonText,
  onCheckoutClick,
}: ServiceThankYouProps) => {
  const primaryColor = styles?.primaryColor || "#3B82F6";
  const secondaryColor = styles?.secondaryColor || "#60A5FA";

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
            {config?.title || "Solicitação Recebida!"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {config?.subtitle || "Entraremos em contato em breve para agendar sua consulta."}
          </p>
          {leadName && (
            <p className="text-lg text-muted-foreground mt-4">
              Obrigado, <span className="font-semibold text-foreground">{leadName}</span>!
            </p>
          )}
        </div>
      </div>

      {/* Content */}
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
                  Finalize sua contratação agora!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Clique no botão abaixo para garantir seu serviço com condições especiais.
                </p>
                <Button 
                  size="lg" 
                  className="text-white text-lg px-8 py-6"
                  style={{ backgroundColor: primaryColor }}
                  onClick={onCheckoutClick}
                >
                  {checkoutButtonText || "Contratar Agora"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* What happens next */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" style={{ color: primaryColor }} />
                O Que Acontece Agora
              </h2>
              <div className="space-y-4">
                {(config?.nextSteps || [
                  "Nossa equipe analisará sua solicitação",
                  "Entraremos em contato em até 24 horas",
                  "Agendaremos uma consulta no melhor horário para você"
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

          {/* Upsell - Priority Service */}
          {upsellConfig?.enabled && !showCheckoutButton && (
            <Card 
              className="border-2 shadow-xl overflow-hidden"
              style={{ borderColor: primaryColor }}
            >
              <div 
                className="py-3 px-6 text-center text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                <Star className="w-5 h-5 inline-block mr-2" />
                ATENDIMENTO PRIORITÁRIO
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Vagas limitadas para hoje!</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {upsellConfig.title || "Quer atendimento imediato?"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {upsellConfig.description || "Pule a fila e garanta sua consulta ainda hoje com desconto especial."}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {(upsellConfig.benefits || ["Atendimento em até 2h", "Consultor sênior dedicado", "Suporte prioritário"]).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: primaryColor }} />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  {upsellConfig.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      R$ {upsellConfig.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                    R$ {upsellConfig.price || "197"}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 text-white"
                    style={{ backgroundColor: primaryColor }}
                    onClick={onUpsellClick}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    QUERO ATENDIMENTO PRIORITÁRIO
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground"
                  >
                    Não, vou aguardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          <div className="text-center text-muted-foreground">
            <p>Fique de olho no seu email e telefone</p>
            {leadEmail && (
              <p className="text-sm mt-2">
                Confirmação enviada para: <span className="font-medium">{leadEmail}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceThankYou;
