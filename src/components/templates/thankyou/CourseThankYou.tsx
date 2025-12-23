import { CheckCircle, PlayCircle, ArrowRight, Star, Clock, BookOpen, Award, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThankYouPageConfig, UpsellPageConfig, TemplateStyles } from "@/types/templateData";

interface CourseThankYouProps {
  config?: ThankYouPageConfig;
  upsellConfig?: UpsellPageConfig;
  styles?: TemplateStyles;
  leadName?: string;
  leadEmail?: string;
  courseName?: string;
  onUpsellClick?: () => void;
  showCheckoutButton?: boolean;
  checkoutButtonText?: string;
  onCheckoutClick?: () => void;
}

const CourseThankYou = ({
  config,
  upsellConfig,
  styles,
  leadName,
  leadEmail,
  courseName,
  onUpsellClick,
  showCheckoutButton,
  checkoutButtonText,
  onCheckoutClick,
}: CourseThankYouProps) => {
  const primaryColor = styles?.primaryColor || "#10B981";
  const secondaryColor = styles?.secondaryColor || "#34D399";

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
            <Award className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {config?.title || "Matrícula Confirmada!"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {config?.subtitle || "Parabéns! Você acaba de dar o primeiro passo para transformar sua carreira."}
          </p>
          {leadName && (
            <p className="text-lg text-muted-foreground mt-4">
              Bem-vindo ao curso, <span className="font-semibold text-foreground">{leadName}</span>!
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
                  Finalize sua matrícula agora!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Clique no botão abaixo para garantir seu acesso ao curso completo.
                </p>
                <Button 
                  size="lg" 
                  className="text-white text-lg px-8 py-6"
                  style={{ backgroundColor: primaryColor }}
                  onClick={onCheckoutClick}
                >
                  {checkoutButtonText || "Matricular Agora"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Course Access Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <PlayCircle className="w-6 h-6" style={{ color: primaryColor }} />
                Acesse Seu Curso
              </h2>
              
              {courseName && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">Curso:</p>
                  <p className="font-semibold text-foreground">{courseName}</p>
                </div>
              )}

              {!showCheckoutButton && (
                <Button 
                  size="lg" 
                  className="w-full text-white mb-6"
                  style={{ backgroundColor: primaryColor }}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  ACESSAR ÁREA DE MEMBROS
                </Button>
              )}
              
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Como Começar</h3>
                <div className="space-y-3">
                  {(config?.nextSteps || [
                    "Acesse a área de membros com seu email",
                    "Assista à aula de boas-vindas",
                    "Baixe os materiais de apoio",
                    "Entre no grupo exclusivo de alunos"
                  ]).map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upsell - Complete Package */}
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
                OFERTA ESPECIAL PARA NOVOS ALUNOS
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Oferta válida apenas agora!</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {upsellConfig.title || "Complete sua formação!"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {upsellConfig.description || "Adicione o curso avançado e acelere seus resultados com desconto exclusivo de boas-vindas."}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {(upsellConfig.benefits || [
                    "Módulos avançados",
                    "Mentorias ao vivo",
                    "Certificado premium",
                    "Acesso vitalício"
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
                    R$ {upsellConfig.price || "497"}
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
                    <BookOpen className="w-5 h-5 mr-2" />
                    ADICIONAR À MINHA MATRÍCULA
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground"
                  >
                    Começar com o básico
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Info */}
          <div className="text-center text-muted-foreground">
            <p>Seus dados de acesso foram enviados por email</p>
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

export default CourseThankYou;
