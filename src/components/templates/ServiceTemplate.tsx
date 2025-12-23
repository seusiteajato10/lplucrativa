import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  Check, 
  MessageCircle, 
  Users, 
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface ServiceTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const ServiceTemplate = ({ data, projectName, projectId, userId, slug }: ServiceTemplateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
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
    aboutText,
    benefitsTitle,
    benefits,
    targetAudienceTitle,
    targetAudience,
    processTitle,
    processSteps,
    testimonialsTitle,
    testimonials,
    caseStudies,
    pricingTitle,
    pricingTiers,
    faqTitle,
    faqs,
    logoUrl,
    heroImageUrl,
    videoUrl,
    useImageInsteadOfVideo,
    formFields,
    styles,
  } = templateData;

  const checkout = templateData.integrations?.checkout || { enabled: true, type: 'external' as const };

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    return match ? match[1] : "";
  };

  const extractVimeoId = (url: string): string => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : "";
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

    toast.success("Mensagem enviada com sucesso!");
    setFormData({ fullName: "", email: "", whatsapp: "", cpf: "", company: "", role: "" });

    if (slug && templateData.thankYouPage.enabled) {
      const params = new URLSearchParams();
      if (formData.fullName) params.set('name', formData.fullName);
      if (formData.email) params.set('email', formData.email);
      navigate(`/p/${slug}/obrigado?${params.toString()}`);
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
      <section 
        className="relative overflow-hidden py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, ${styles.primaryColor}, ${styles.secondaryColor})`,
        }}
      >
        {heroImageUrl && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">Serviços Profissionais</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {headline}
              </h1>
              
              <p className="text-xl opacity-90 mb-4">
                {subheadline}
              </p>

              {heroText && (
                <p className="text-lg opacity-80 mb-8">
                  {heroText}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-white hover:bg-gray-100"
                  style={{ color: styles.primaryColor }}
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {ctaButtonText}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </Button>
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2 mt-8 text-white/80">
                <Users className="w-5 h-5" />
                <span>Confiado por mais de 500 empresas</span>
              </div>
            </div>

            {/* Video or Image */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              {videoUrl && !useImageInsteadOfVideo ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  {videoUrl.includes("youtube") && (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                  {videoUrl.includes("vimeo") && (
                    <iframe
                      src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : heroImageUrl ? (
                <img 
                  src={heroImageUrl} 
                  alt={headline} 
                  className="aspect-video object-cover rounded-xl"
                />
              ) : (
                <div className="aspect-video bg-white/20 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-16 h-16 text-white/50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      {targetAudience.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {targetAudienceTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Nossos serviços são ideais para quem busca resultados de verdade
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {targetAudience.map((item) => (
                <div 
                  key={item.id} 
                  className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${styles.primaryColor}15` }}
                  >
                    <Users className="w-7 h-7" style={{ color: styles.primaryColor }} />
                  </div>
                  <h3 className="font-semibold text-[#1F2937] mb-2">{item.text}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {processTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Um processo simples e eficiente para alcançar seus objetivos
            </p>
            
            <div className="flex flex-col md:flex-row items-start justify-center gap-4 max-w-5xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex-1 relative">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4"
                      style={{ backgroundColor: styles.primaryColor }}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-[#1F2937] mb-2">{step.text}</h3>
                    {step.description && (
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    )}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {aboutText && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
                Sobre Nós
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {aboutText}
              </p>
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" style={{ color: styles.primaryColor }} />
                  <p className="font-bold text-2xl text-[#1F2937]">10+</p>
                  <p className="text-gray-600 text-sm">Anos de experiência</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2" style={{ color: styles.primaryColor }} />
                  <p className="font-bold text-2xl text-[#1F2937]">500+</p>
                  <p className="text-gray-600 text-sm">Clientes atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits/Services Section */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {benefitsTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Oferecemos soluções completas para atender às suas necessidades
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.id} 
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
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

      {/* Case Studies Section */}
      {caseStudies.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              Casos de Sucesso
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-[#F9FAFB] rounded-2xl p-6">
                  {caseStudy.clientLogo && (
                    <img src={caseStudy.clientLogo} alt={caseStudy.clientName} className="h-8 mb-4" />
                  )}
                  <h3 className="font-semibold text-[#1F2937] mb-2">{caseStudy.clientName}</h3>
                  <p className="text-gray-600 text-sm mb-2"><strong>Desafio:</strong> {caseStudy.challenge}</p>
                  <p className="text-gray-600 text-sm mb-2"><strong>Solução:</strong> {caseStudy.solution}</p>
                  <p className="font-semibold" style={{ color: styles.primaryColor }}>{caseStudy.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {testimonialsTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm">
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
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {pricingTiers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {pricingTitle}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`rounded-2xl p-6 ${tier.isPopular ? 'ring-2 shadow-xl' : 'border border-gray-200'}`}
                  style={tier.isPopular ? { borderColor: styles.primaryColor } : {}}
                >
                  {tier.isPopular && (
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                      style={{ backgroundColor: styles.primaryColor }}
                    >
                      Mais Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#1F2937] mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    {tier.originalPrice && (
                      <span className="text-gray-400 line-through text-sm mr-2">{tier.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold" style={{ color: styles.primaryColor }}>{tier.price}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                        <Check className="w-4 h-4" style={{ color: styles.primaryColor }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full text-white"
                    style={{ backgroundColor: styles.primaryColor }}
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {faqTitle}
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
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
        <section id="lead-form" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-2">
                Agendar Sua Consultoria Gratuita
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Preencha o formulário e entraremos em contato em até 24 horas
              </p>
              <div className="bg-[#F9FAFB] rounded-2xl p-8">
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
                    {isSubmitting ? "Enviando..." : ctaButtonText}
                  </Button>
                </form>
              </div>
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
            Pronto Para Transformar Seu Negócio?
          </h2>
          <p className="opacity-90 mb-8 max-w-xl mx-auto">
            Entre em contato agora e descubra como podemos ajudar você a alcançar seus objetivos.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100"
            style={{ color: styles.primaryColor }}
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {ctaButtonText}
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
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServiceTemplate;
