import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Shield, Star, ChevronDown, ChevronUp, Package, Zap, TrendingUp } from 'lucide-react';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProductTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

function ProductTemplate({ data, projectName, projectId, userId, slug }: ProductTemplateProps) {
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
    productBenefits, // New: dynamic product benefits
    originalPrice,   // New: dynamic original price
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

      {/* CTA FIXO NO TOPO */}
      <div className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm z-50 py-3 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="text-primary-foreground font-semibold text-sm md:text-base">
            🔥 Oferta por tempo limitado!
          </span>
          <Button variant="secondary" size="sm"
            onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {checkout.buttonText || ctaButtonText}
          </Button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ⚡ Mais de 1.000 alunos satisfeitos
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                {headline}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {subheadline}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {productBenefits && productBenefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: styles.primaryColor }}
                  onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {checkout.buttonText || ctaButtonText}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Ver Demonstração
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 baseado em 847 avaliações
                </span>
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {videoUrl && !useImageInsteadOfVideo ? (
                  <div className="aspect-video bg-black">
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
                ) : productImages && productImages.length > 0 ? (
                  <img
                    src={productImages[0]}
                    alt="Produto"
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <img
                    src={heroImageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"}
                    alt="Produto"
                    className="w-full h-auto object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {originalPrice && (
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg rotate-12">
                  {`De ${originalPrice}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      {benefits.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O QUE VOCÊ VAI RECEBER */}
      {(productSpecs && productSpecs.length > 0) && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              O Que Você Vai Receber
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Tudo que você precisa para ter sucesso
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {productSpecs.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GARANTIA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Shield className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">{guaranteeTitle}</h2>
          <p className="text-lg text-muted-foreground">
            {guaranteeText}
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              {testimonialsTitle}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Histórias reais de quem já transformou resultados
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              {faqTitle}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-card rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4 text-muted-foreground">
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
            <div className="max-w-md mx-auto bg-[#F9FAFB] rounded-2xl p-8">
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
}

export default ProductTemplate;