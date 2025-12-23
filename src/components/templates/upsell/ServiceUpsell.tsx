import { Star, ArrowRight, Clock, CheckCircle, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface ServiceUpsellProps {
  config?: UpsellPageConfig;
  styles?: TemplateStyles;
  onAccept?: () => void;
  onDecline?: () => void;
}

const ServiceUpsell = ({
  config,
  styles,
  onAccept,
  onDecline,
}: ServiceUpsellProps) => {
  const primaryColor = styles?.primaryColor || "#3B82F6";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 shadow-2xl overflow-hidden" style={{ borderColor: primaryColor }}>
        {/* Urgency Banner */}
        <div 
          className="py-3 px-6 text-center text-white font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <Star className="w-5 h-5" />
          <span>UPGRADE EXCLUSIVO - VAGAS LIMITADAS</span>
          <Star className="w-5 h-5" />
        </div>
        
        <CardContent className="p-8">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-6">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Apenas 3 vagas restantes para hoje!</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {config?.title || "Quer Atendimento VIP?"}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8">
            {config?.subtitle || "Pule a fila e receba atendimento prioritário com consultor sênior"}
          </p>

          {/* Service Card */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Briefcase className="w-12 h-12" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {config?.productName || "Consultoria VIP"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {config?.description || "Atendimento em até 2 horas com nosso melhor especialista."}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-2xl text-muted-foreground line-through">
                    {config?.originalPrice || "R$ 497"}
                  </span>
                  <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                    {config?.discountPrice || config?.price || "R$ 297"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {(config?.benefits || [
              "Atendimento em até 2h",
              "Consultor sênior dedicado",
              "Relatório personalizado",
              "Suporte prioritário 30 dias"
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
              {config?.ctaAcceptText || "SIM! QUERO ATENDIMENTO VIP"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={onDecline}
            >
              <X className="w-4 h-4 mr-2" />
              {config?.ctaDeclineText || "Não, prefiro aguardar na fila normal."}
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Satisfação garantida ou seu dinheiro de volta
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceUpsell;
