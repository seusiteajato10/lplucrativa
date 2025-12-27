import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Shield, Star, ChevronDown, ChevronUp, PlayCircle, Package, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TemplateData, defaultTemplateData } from '@/types/templateData';

interface ProductTemplateVSLProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const ProductTemplateVSL = ({ data, projectName, projectId, userId, slug }: ProductTemplateVSLProps) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    testimonialsTitle,
    testimonials,
    faqTitle,
    faqs,
    guaranteeTitle,
    guaranteeText,
    guaranteeDays,
    productSpecs,
    productImages,
    logoUrl,
    heroImageUrl, // Can be used as video thumbnail
    videoUrl,
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

    toast.success("Inscrição realizada com sucesso!");
    setFormData({ fullName: "", email: "", whatsapp: "", cpf: "", company: "", role: "" });

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

      {/* HERO SECTION - Video First */}
      <section 
        className="relative overflow-hidden py-12 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${styles.primaryColor}, ${styles.secondaryColor})`,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {headline}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              {subheadline}
            </p>

            {/* Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video mb-8">
              {videoUrl ? (
                videoUrl.includes("youtube") ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : videoUrl.includes("vimeo") ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <PlayCircle className="w-20 h-20 text-white/50" />
                  </div>
                )
              ) : heroImageUrl ? (
                <img 
                  src={heroImageUrl} 
                  alt={headline} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <PlayCircle className="w-20 h-20 text-white/50" />
                </div>
              )}
            </div>

            <p className="text-lg opacity-80 mb-8">
              {heroText}
            </p>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: styles.primaryColor }}
              onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {checkout.buttonText || ctaButtonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Capture Form - Prominent after video */}
      {projectId && userId && (
        <section id="lead-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-[#F9FAFB] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-2">
                Garanta o Seu Agora!
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Preencha seus dados para finalizar a compra
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
                  {isSubmitting ? "Enviando..." : ctaButtonText}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* BENEFÍCIOS */}
      {benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {benefitsTitle}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex flex-col items-center text-center p-6 bg-[#F9FAFB] rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${styles.primaryColor}15` }}
                  >
                    <Check className="w-7 h-7" style={{ color: styles.primaryColor }} />
                  </div>
                  <p className="font-medium text-[#1F2937]">{benefit.text}</p>
                  {benefit.description && (
                    <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O QUE VOCÊ VAI RECEBER / Product Specs */}
      {(productSpecs && productSpecs.length > 0) && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              O Que Você Vai Receber
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Tudo que você precisa para ter sucesso
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {productSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: `${styles.primaryColor}20` }}
                  >
                    <Check className="w-4 h-4" style={{ color: styles.primaryColor }} />
                  </div>
                  <span className="font-medium text-[#1F2937]">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GARANTIA */}
      <section 
        className="py-20 bg-white"
        style={{ backgroundColor: `${styles.primaryColor}10` }}
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: styles.primaryColor }}
          >
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">{guaranteeTitle}</h2>
          <p className="text-lg text-gray-600">
            {guaranteeText}
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {testimonialsTitle}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Histórias reais de quem já transformou resultados
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {faqTitle}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-[#F9FAFB] rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#1F2937]">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === faq.id && (
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

      {/* CTA FINAL */}
      <section 
        className="py-20 text-white"
        style={{ backgroundColor: styles.primaryColor }}
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto Para Transformar Seus Resultados?
          </h2>
          <p className="opacity-90 mb-8 max-w-xl mx-auto">
            Junte-se a mais de 1.000 pessoas que já estão alcançando seus objetivos
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100"
            style={{ color: styles.primaryColor }}
            onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {checkout.buttonText || ctaButtonText}
          </Button>
          <p className="text-sm text-white/80 mt-4">
            ✓ Acesso imediato • ✓ Garantia de {guaranteeDays} dias • ✓ Pagamento seguro
          </p>
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

export default ProductTemplateVSL;