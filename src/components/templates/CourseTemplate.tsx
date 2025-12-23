import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  Check, 
  PlayCircle, 
  Award, 
  Clock,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Users,
  BookOpen
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface CourseTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const CourseTemplate = ({ data, projectName, projectId, userId, slug }: CourseTemplateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
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
    instructorName,
    instructorPhoto,
    instructorBio,
    instructorCredentials,
    modulesTitle,
    modules,
    bonusTitle,
    bonuses,
    pricingTiers,
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

  // Calculate total lessons and hours
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons, 0) || 50;
  const totalHours = modules.reduce((acc, m) => parseInt(m.duration) || 0, 0) || 20;

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
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${styles.primaryColor}10, #F9FAFB, ${styles.secondaryColor}10)`,
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content */}
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${styles.primaryColor}15`, color: styles.primaryColor }}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Curso Online</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-6 leading-tight">
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

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <PlayCircle className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>+{totalLessons} aulas</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>{totalHours}h de conteúdo</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>Certificado</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" style={{ color: styles.primaryColor }} />
                  <span>+10.000 alunos</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="text-lg px-10 py-6 text-white shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: styles.primaryColor }}
                onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {checkout.buttonText || ctaButtonText}
              </Button>
            </div>

            {/* Video/Image Card */}
            <div className="bg-white rounded-3xl p-4 shadow-xl">
              {videoUrl && !useImageInsteadOfVideo ? (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden">
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
                  className="aspect-video object-cover rounded-2xl"
                />
              ) : (
                <div 
                  className="aspect-video rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${styles.primaryColor}10` }}
                >
                  <PlayCircle className="w-20 h-20" style={{ color: styles.primaryColor }} />
                </div>
              )}
              <p className="text-center text-gray-500 text-sm mt-4">
                Assista à aula demonstrativa gratuita
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      {modules.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {modulesTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Conteúdo completo e estruturado para você dominar o assunto
            </p>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {modules.map((module, index) => (
                <div key={module.id} className="bg-[#F9FAFB] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: styles.primaryColor }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium text-[#1F2937]">{module.title}</span>
                        <p className="text-sm text-gray-500">{module.lessons} aulas • {module.duration}</p>
                      </div>
                    </div>
                    {expandedModule === module.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedModule === module.id && (
                    <div className="px-6 pb-4 text-gray-600">
                      <p className="text-sm">Conteúdo detalhado do módulo em breve.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instructor Section */}
      {instructorName && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              Seu Instrutor
            </h2>
            
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
              {instructorPhoto ? (
                <img 
                  src={instructorPhoto} 
                  alt={instructorName} 
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              ) : (
                <div 
                  className="w-40 h-40 rounded-2xl flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: styles.primaryColor }}
                >
                  {instructorName.charAt(0)}
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#1F2937] mb-2">{instructorName}</h3>
                <p className="text-gray-600 mb-4">{instructorBio}</p>
                {instructorCredentials && instructorCredentials.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {instructorCredentials.map((cred, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${styles.primaryColor}15`, color: styles.primaryColor }}
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bonuses Section */}
      {bonuses.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {bonusTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Além do conteúdo principal, você ainda recebe estes bônus exclusivos
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bonuses.map((bonus) => (
                <div key={bonus.id} className="bg-[#F9FAFB] rounded-2xl p-6 relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-medium text-white"
                    style={{ backgroundColor: styles.primaryColor }}
                  >
                    BÔNUS
                  </div>
                  <BookOpen className="w-8 h-8 mb-4" style={{ color: styles.primaryColor }} />
                  <h3 className="font-semibold text-[#1F2937] mb-2">{bonus.text}</h3>
                  {bonus.description && (
                    <p className="text-gray-600 text-sm">{bonus.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What You'll Receive Section */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {benefitsTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <Check className="w-5 h-5 flex-shrink-0" style={{ color: styles.primaryColor }} />
                  <span className="text-[#1F2937]">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
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

      {/* Pricing Section */}
      {pricingTiers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              Escolha Seu Plano
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`rounded-2xl p-6 ${tier.isPopular ? 'ring-2 shadow-xl' : 'border border-gray-200'}`}
                  style={tier.isPopular ? { borderColor: styles.primaryColor, outlineColor: styles.primaryColor } : {}}
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
                    onClick={() => checkout.url && (window.location.href = checkout.url)}
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
            <div className="max-w-md mx-auto bg-[#F9FAFB] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-2">
                Inscreva-se Agora
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Comece sua transformação hoje mesmo
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

      {/* Final CTA Section */}
      <section 
        className="py-20 text-white"
        style={{ backgroundColor: styles.primaryColor }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece Sua Transformação Hoje
          </h2>
          <p className="opacity-90 mb-6 max-w-xl mx-auto">
            Junte-se a milhares de alunos que já transformaram suas vidas com este curso.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="w-5 h-5" />
            <span>Garantia de {guaranteeDays} dias</span>
            <span>•</span>
            <span>Checkout 100% seguro</span>
          </div>
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100"
            style={{ color: styles.primaryColor }}
            onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
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
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CourseTemplate;
