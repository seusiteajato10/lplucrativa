import { Tag, ArrowRight, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DownsellPageConfig, TemplateStyles } from "@/types/templateData";

interface GenericDownsellProps {
  config?: DownsellPageConfig;
  styles?: TemplateStyles;
  onAccept?: () => void;
  onDecline?: () => void;
}

const GenericDownsell = ({ config, styles, onAccept, onDecline }: GenericDownsellProps) => {
  const primaryColor = styles?.primaryColor || "#6366F1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
            <Tag className="w-8 h-8" style={{ color: primaryColor }} />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {config?.title || "Última Chance!"}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {config?.subtitle || "Que tal uma opção mais acessível?"}
          </p>

          <div className="bg-muted/50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{config?.productName || "Versão Essencial"}</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>{config?.price || "R$ 97"}</p>
            <div className="space-y-2">
              {(config?.benefits || ["Acesso ao conteúdo principal", "Suporte por email"]).map((b, i) => (
                <div key={i} className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full text-white mb-3" style={{ backgroundColor: primaryColor }} onClick={onAccept}>
            {config?.ctaAcceptText || "Quero Esta Oferta"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={onDecline}>
            <X className="w-4 h-4 mr-2" /> {config?.ctaDeclineText || "Não, obrigado"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericDownsell;
