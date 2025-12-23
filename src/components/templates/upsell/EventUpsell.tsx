import { Crown, ArrowRight, Clock, CheckCircle, X, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface EventUpsellProps {
  config?: UpsellPageConfig;
  styles?: TemplateStyles;
  onAccept?: () => void;
  onDecline?: () => void;
}

const EventUpsell = ({
  config,
  styles,
  onAccept,
  onDecline,
}: EventUpsellProps) => {
  const primaryColor = styles?.primaryColor || "#F59E0B";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 shadow-2xl overflow-hidden" style={{ borderColor: primaryColor }}>
        {/* Urgency Banner */}
        <div 
          className="py-3 px-6 text-center text-white font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <Crown className="w-5 h-5" />
          <span>UPGRADE VIP EXCLUSIVO</span>
          <Crown className="w-5 h-5" />
        </div>
        
        <CardContent className="p-8">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-6">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Apenas 5 ingressos VIP restantes!</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {config?.title || "Quer a Experiência Completa?"}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8">
            {config?.subtitle || "Faça upgrade para VIP e tenha acesso exclusivo aos palestrantes"}
          </p>

          {/* VIP Card */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div 
                className="w-32 h-32 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                }}
              >
                <Ticket className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  INGRESSO VIP
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {config?.productName || "Acesso VIP Completo"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {config?.description || "A experiência definitiva com benefícios exclusivos."}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-2xl text-muted-foreground line-through">
                    {config?.originalPrice || "R$ 597"}
                  </span>
                  <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                    {config?.discountPrice || config?.price || "R$ 397"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {(config?.benefits || [
              "Lugar na primeira fila",
              "Meet & greet exclusivo",
              "Jantar com palestrantes",
              "Certificado VIP numerado",
              "Acesso à gravação HD",
              "Grupo VIP no WhatsApp"
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
              {config?.ctaAcceptText || "SIM! QUERO SER VIP"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={onDecline}
            >
              <X className="w-4 h-4 mr-2" />
              {config?.ctaDeclineText || "Não, prefiro o ingresso comum."}
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Compra segura • Reembolso integral se o evento for cancelado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventUpsell;
