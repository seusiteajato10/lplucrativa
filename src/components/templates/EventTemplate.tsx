import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Ticket
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface EventTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const EventTemplate = ({ data, projectName, projectId, userId, slug }: EventTemplateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    eventDate,
    eventTime,
    eventLocation,
    eventIsOnline,
    speakersTitle,
    speakers,
    scheduleTitle,
    schedule,
    ticketsTitle,
    pricingTiers,
    logoUrl,
    heroImageUrl,
    formFields,
    styles,
  } = templateData;

  const checkout = templateData.integrations?.checkout || { enabled: true, type: 'external' as const };

  // Countdown timer
  useEffect(() => {
    if (!eventDate) return;
    
    const targetDate = new Date(eventDate);
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

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

      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
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
        <div className="container mx-auto px-4 py-20 relative text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {eventIsOnline ? "Evento 100% Online" : "Evento Presencial"}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            {headline}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-3xl mx-auto">
            {subheadline}
          </p>

          {heroText && (
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              {heroText}
            </p>
          )}

          {/* Event Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {eventDate && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>{new Date(eventDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
            )}
            {eventTime && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>{eventTime}</span>
              </div>
            )}
            {eventLocation && !eventIsOnline && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>{eventLocation}</span>
              </div>
            )}
          </div>

          {/* Countdown */}
          {eventDate && (
            <div className="flex justify-center gap-4 mb-10">
              {[
                { value: countdown.days, label: 'Dias' },
                { value: countdown.hours, label: 'Horas' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Seg' },
              ].map((item) => (
                <div key={item.label} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px]">
                  <div className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-xs uppercase opacity-80">{item.label}</div>
                </div>
              ))}
            </div>
          )}

          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100 shadow-lg"
            style={{ color: styles.primaryColor }}
            onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Ticket className="w-5 h-5 mr-2" />
            {checkout.buttonText || ctaButtonText}
          </Button>
        </div>
      </section>

      {/* What You'll Learn Section */}
      {benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {benefitsTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Conteúdo exclusivo preparado por especialistas do mercado
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={benefit.id} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${styles.primaryColor}15` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: styles.primaryColor }}>{index + 1}</span>
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

      {/* Speakers Section */}
      {speakers.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {speakersTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  {speaker.photo ? (
                    <img 
                      src={speaker.photo} 
                      alt={speaker.name} 
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                      style={{ backgroundColor: styles.primaryColor }}
                    >
                      {speaker.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-semibold text-[#1F2937] text-lg">{speaker.name}</h3>
                  <p className="text-sm" style={{ color: styles.primaryColor }}>{speaker.role}</p>
                  <p className="text-gray-500 text-sm">{speaker.company}</p>
                  {speaker.bio && (
                    <p className="text-gray-600 text-sm mt-3">{speaker.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schedule Section */}
      {schedule.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
              {scheduleTitle}
            </h2>
            
            <div className="max-w-3xl mx-auto">
              {schedule.map((item, index) => (
                <div key={item.id} className="flex gap-4 pb-8 relative">
                  {/* Timeline line */}
                  {index < schedule.length - 1 && (
                    <div 
                      className="absolute left-[47px] top-10 bottom-0 w-0.5"
                      style={{ backgroundColor: `${styles.primaryColor}30` }}
                    />
                  )}
                  
                  {/* Time */}
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-semibold" style={{ color: styles.primaryColor }}>{item.time}</span>
                  </div>
                  
                  {/* Dot */}
                  <div 
                    className="flex-shrink-0 w-4 h-4 rounded-full mt-1"
                    style={{ backgroundColor: styles.primaryColor }}
                  />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1F2937]">{item.title}</h3>
                    {item.speaker && (
                      <p className="text-sm" style={{ color: styles.primaryColor }}>{item.speaker}</p>
                    )}
                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    )}
                  </div>
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

      {/* Tickets/Pricing Section */}
      {pricingTiers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4">
              {ticketsTitle}
            </h2>
            <p className="text-center text-red-500 font-medium mb-12">
              ⚠️ Vagas limitadas! Garanta a sua agora.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`rounded-2xl p-6 ${tier.isPopular ? 'ring-2 shadow-xl scale-105' : 'border border-gray-200'}`}
                  style={tier.isPopular ? { borderColor: styles.primaryColor } : {}}
                >
                  {tier.isPopular && (
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                      style={{ backgroundColor: styles.primaryColor }}
                    >
                      Mais Vendido
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
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <Users className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: styles.primaryColor }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full text-white"
                    style={{ backgroundColor: styles.primaryColor }}
                    onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
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
                Garanta Sua Vaga
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Preencha seus dados para garantir sua participação
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

      {/* Final CTA Section */}
      <section 
        className="py-20 text-white"
        style={{ backgroundColor: styles.primaryColor }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vagas Limitadas!
          </h2>
          <p className="opacity-90 mb-8 max-w-xl mx-auto">
            Não perca a oportunidade de participar deste evento único. Garanta sua vaga agora!
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-white hover:bg-gray-100"
            style={{ color: styles.primaryColor }}
            onClick={() => checkout.url ? window.location.href = checkout.url : document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Ticket className="w-5 h-5 mr-2" />
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
          <p>© {new Date().getFullYear()} {projectName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventTemplate;
