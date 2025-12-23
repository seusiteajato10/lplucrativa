import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ShoppingBag, 
  Check, 
  Star, 
  Shield, 
  Truck, 
  CreditCard,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface ProductTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const ProductTemplate = ({ data, projectName, projectId, userId, slug }: ProductTemplateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showEmbeddedCheckout, setShowEmbeddedCheckout] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    cpf: "",
    company: "",
    role: "",
  });

  // Merge data with defaults
  const templateData: TemplateData = { ...defaultTemplateData, ...data } as TemplateData;

  const {
    headline,
    subheadline,
    ctaButtonText,
    heroText,
    benefitsTitle,
    benefits,
    testimonialsTitle,
    testimonials,
    faqTitle,
    faqs,
    guaranteeTitle,
    guaranteeText,
    guaranteeDays,
    logoUrl,
    heroImageUrl,
    formFields,
    styles,
  } = templateData;

  const checkout = templateData.integrations?.checkout || { enabled: true, type: 'external' as const };
  const checkoutType = checkout.type || 'external';

  const handleCTAClick = () => {
    switch (checkoutType) {
      case 'external':
        if (checkout.url) {
          window.location.href = checkout.url;
        }
        break;
      case 'embedded':
        setShowEmbeddedCheckout(true);
        break;
      case 'post_lead':
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        if (checkout.url) {
          window.location.href = checkout.url;
        } else {
          document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !userId) return;

    setIsSubmitting(true);
    
    const leadData: Record<string, string> = {};
    if (formFields.fullName && formData.fullName) leadData.fullName = formData.fullName;
    if (formFields.email && formData.email) leadData.email = formData.email;
    if (formFields.whatsapp && formData.whatsapp) leadData.whatsapp = formData.whatsapp;
    if (formFields.cpf && formData.cpf) leadData.cpf = formData.cpf;
    if (formFields.company && formData.company) leadData.company = formData.company;
    if (formFields.role && formData.role) leadData.role = formData.role;

    const { error } = await supabase.from("leads_captured").insert({
      project_id: projectId,
      user_id: userId,
      data: leadData,
      source_url: window.location.href,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      return;
    }

    toast.success("Cadastro realizado com sucesso!");
    setFormData({ fullName: "", email: "", whatsapp: "", cpf: "", company: "", role: "" });

    // Navigate to thank you page
    if (slug && templateData.thankYouPage.enabled) {
      const params = new URLSearchParams();
      if (formData.fullName) params.set('name', formData.fullName);
      if (formData.email) params.set('email', formData.email);
      navigate(`/p/${slug}/obrigado?${params.toString()}`);
    } else if (checkout.url) {
      window.location.href = checkout.url;
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#F9FAFB]"
      style={{ fontFamily: styles.fontFamily }}
    >
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto flex justify-center">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-12 object-contain" />
          ) : (
            <span className="text-xl font-bold" style={{ color: styles.primaryColor }}>{projectName}</span>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: styles.primaryColor }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${styles.primaryColor}15`, color: styles.primaryColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-medium">Produto Exclusivo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight">
                {headline}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                {subheadline}
              </p>

              {heroText && (
                <p className="text-base text-gray-500 mb-8">
                  {heroText}
                </p>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>Garantia {guaranteeDays} dias</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>Pagamento Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>Frete Grátis</span>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={handleCTAClick}
                className="text-lg px-10 py-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: styles.primaryColor }}
              >
                {checkout.buttonText || ctaButtonText}
              </Button>

              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600 text-sm">5.0 (127 avaliações)</span>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex justify-center">
              {heroImageUrl ? (
                <img 
                  src={heroImageUrl} 
                  alt={headline} 
                  className="max-w-full h-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div 
                  className="w-full aspect-square max-w-md rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${styles.primaryColor}10` }}
                >
                  <ShoppingBag className="w-24 h-24" style={{ color: styles.primaryColor }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {benefitsTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Veja por que milhares de clientes escolheram nosso produto
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.id} 
                  className="bg-[#F9FAFB] rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${styles.primaryColor}15` }}
                  >
                    <Check className="w-6 h-6" style={{ color: styles.primaryColor }} />
                  </div>
                  <h3 className="font-semibold text-[#1F2937] mb-2">{benefit.text}</h3>
                  {benefit.description && (
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it Works Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
            Como Funciona
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Faça seu pedido", desc: "Escolha o produto e finalize a compra" },
              { step: 2, title: "Receba em casa", desc: "Enviamos para qualquer lugar do Brasil" },
              { step: 3, title: "Transforme sua vida", desc: "Aproveite todos os benefícios" },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center text-center flex-1">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4"
                  style={{ backgroundColor: styles.primaryColor }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#1F2937] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2">
                    {/* Arrow would go here */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {testimonialsTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#F9FAFB] rounded-2xl p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.photo ? (
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: styles.primaryColor }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[#1F2937]">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}{testimonial.city && ` • ${testimonial.city}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guarantee Section */}
      <section 
        className="py-16"
        style={{ backgroundColor: `${styles.primaryColor}10` }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: styles.primaryColor }}
            >
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-4">
              {guaranteeTitle}
            </h2>
            <p className="text-gray-600">
              {guaranteeText}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {faqTitle}
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-[#1F2937]">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Form */}
      {projectId && userId && (
        <section id="lead-form" className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-2">
                Cadastre-se Agora
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Garanta o seu com condições especiais
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.fullName && (
                  <Input
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="h-12"
                  />
                )}
                {formFields.email && (
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                )}
                {formFields.whatsapp && (
                  <Input
                    placeholder="WhatsApp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="h-12"
                  />
                )}
                {formFields.cpf && (
                  <Input
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="h-12"
                  />
                )}
                {formFields.company && (
                  <Input
                    placeholder="Empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-12"
                  />
                )}
                {formFields.role && (
                  <Input
                    placeholder="Cargo/Função"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="h-12"
                  />
                )}
                <Button
                  type="submit"
                  className="w-full h-12 text-white text-lg font-medium"
                  style={{ backgroundColor: styles.primaryColor }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section 
        className="py-20 text-white"
        style={{ backgroundColor: styles.primaryColor }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não Perca Essa Oportunidade!
          </h2>
          <p className="opacity-90 mb-8 max-w-xl mx-auto">
            Estoque limitado. Garanta o seu {projectName} agora mesmo com frete grátis.
          </p>
          <Button 
            size="lg" 
            onClick={handleCTAClick}
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100 transition-colors"
            style={{ color: styles.primaryColor }}
          >
            {checkout.buttonText || ctaButtonText}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 mb-4">
            <a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <div className="flex justify-center gap-3 mb-4">
            <CreditCard className="w-8 h-8" />
          </div>
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Embedded Checkout Modal */}
      <Dialog open={showEmbeddedCheckout} onOpenChange={setShowEmbeddedCheckout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Finalizar Compra</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {checkout.code ? (
              <div 
                dangerouslySetInnerHTML={{ __html: checkout.code }} 
                className="checkout-embed"
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Código de checkout não configurado</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductTemplate;
