import { CheckCircle, Calendar, ArrowRight, Star, Clock, MapPin, Ticket, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThankYouPageConfig, UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface EventThankYouProps {
  config?: ThankYouPageConfig;
  upsellConfig?: UpsellPageConfig;
  styles?: TemplateStyles;
  leadName?: string;
  leadEmail?: string;
  eventDate?: string;
  eventLocation?: string;
  onUpsellClick?: () => void;
  showCheckoutButton?: boolean;
  checkoutButtonText?: string;
  onCheckoutClick?: () => void;
}

const EventThankYou = ({
  config,
  upsellConfig,
  styles,
  leadName,
  leadEmail,
  eventDate,
  eventLocation,
  onUpsellClick,
  showCheckoutButton,
  checkoutButtonText,
  onCheckoutClick,
}: EventThankYouProps) => {
  const primaryColor = styles?.primaryColor || "#F59E0B";
  const secondaryColor = styles?.secondaryColor || "#FBBF24";

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
            <Ticket className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {config?.title || "Inscrição Confirmada!"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {config?.subtitle || "Você está inscrito! Mal podemos esperar para te ver no evento."}
          </p>
          {leadName && (
            <p className="text-lg text-muted-foreground mt-4">
              Nos vemos lá, <span className="font-semibold text-foreground">{leadName}</span>!
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
                  Garanta seu ingresso agora!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Clique no botão abaixo para garantir sua vaga no evento.
                </p>
                <Button 
                  size="lg" 
                  className="text-white text-lg px-8 py-6"
                  style={{ backgroundColor: primaryColor }}
                  onClick={onCheckoutClick}
                >
                  {checkoutButtonText || "Comprar Ingresso"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Event Details Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" style={{ color: primaryColor }} />
                Detalhes do Evento
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold text-foreground">Data e Hora</p>
                    <p className="text-muted-foreground">{eventDate || "A confirmar"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold text-foreground">Local</p>
                    <p className="text-muted-foreground">{eventLocation || "Online"}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Próximos Passos</h3>
                <div className="space-y-3">
                  {(config?.nextSteps || [
                    "Adicione ao seu calendário",
                    "Verifique seu email para o ingresso",
                    "Prepare suas perguntas para o Q&A"
                  ]).map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5" style={{ color: primaryColor }} />
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upsell - VIP Upgrade */}
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
                UPGRADE VIP EXCLUSIVO
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Apenas 10 vagas VIP restantes!</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {upsellConfig.title || "Quer uma experiência exclusiva?"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {upsellConfig.description || "Acesso VIP com benefícios exclusivos e networking com palestrantes."}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {(upsellConfig.benefits || [
                    "Lugar na primeira fila",
                    "Meet & greet com palestrantes",
                    "Certificado especial",
                    "Acesso à gravação"
                  ]).map((benefit, i) => (
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
                    R$ {upsellConfig.price || "297"}
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
                    FAZER UPGRADE VIP
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground"
                  >
                    Manter ingresso atual
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email confirmation */}
          <div className="text-center text-muted-foreground">
            <p>Seu ingresso foi enviado por email</p>
            {leadEmail && (
              <p className="text-sm mt-2">
                Verifique: <span className="font-medium">{leadEmail}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventThankYou;
