import { Rocket, ArrowRight, Clock, CheckCircle, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface CourseUpsellProps {
  config?: UpsellPageConfig;
  styles?: TemplateStyles;
  onAccept?: () => void;
  onDecline?: () => void;
}

const CourseUpsell = ({
  config,
  styles,
  onAccept,
  onDecline,
}: CourseUpsellProps) => {
  const primaryColor = styles?.primaryColor || "#10B981";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 shadow-2xl overflow-hidden" style={{ borderColor: primaryColor }}>
        {/* Urgency Banner */}
        <div 
          className="py-3 px-6 text-center text-white font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <Rocket className="w-5 h-5" />
          <span>OFERTA EXCLUSIVA PARA NOVOS ALUNOS</span>
          <Rocket className="w-5 h-5" />
        </div>
        
        <CardContent className="p-8">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-6">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Esta oferta expira em 10:00 minutos</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {config?.title || "Complete Sua Formação!"}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8">
            {config?.subtitle || "Adicione o módulo avançado e acelere seus resultados em 3x"}
          </p>

          {/* Course Card */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div 
                className="w-32 h-32 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                }}
              >
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  MÓDULO AVANÇADO
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {config?.productName || "Formação Completa Premium"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {config?.description || "Domine todas as técnicas avançadas e acelere sua carreira."}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-2xl text-muted-foreground line-through">
                    {config?.originalPrice || "R$ 997"}
                  </span>
                  <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                    {config?.discountPrice || config?.price || "R$ 597"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {(config?.benefits || [
              "+15 módulos avançados",
              "Mentorias ao vivo semanais",
              "Certificado reconhecido",
              "Acesso vitalício",
              "Comunidade exclusiva",
              "Suporte prioritário"
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
              {config?.ctaAcceptText || "SIM! QUERO COMPLETAR MINHA FORMAÇÃO"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={onDecline}
            >
              <X className="w-4 h-4 mr-2" />
              {config?.ctaDeclineText || "Não, quero começar só com o básico."}
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Garantia de 30 dias • Acesso imediato após confirmação
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseUpsell;
