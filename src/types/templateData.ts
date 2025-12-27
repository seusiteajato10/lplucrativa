// Template Data Types for Visual Editor

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  photo?: string;
  city?: string;
}

export interface Benefit {
  id: string;
  text: string;
  icon?: string;
  description?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  bio?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: number;
  duration: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  clientLogo?: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FormFieldConfig {
  fullName: boolean;
  email: boolean;
  whatsapp: boolean;
  cpf: boolean;
  company: boolean;
  role: boolean;
}

export type CheckoutType = 'external' | 'embedded' | 'post_lead';

export interface CheckoutConfig {
  enabled: boolean;
  type: CheckoutType;
  platform?: 'kiwify' | 'eduzz' | 'monetizze' | 'braip' | 'perfectpay' | 'stripe' | 'paypal' | 'hotmart' | 'other' | '';
  url?: string;
  code?: string;
  buttonText?: string;
}

export interface IntegrationsConfig {
  checkout: CheckoutConfig;
  leadDestination: LeadDestinationConfig;
  tracking: TrackingConfig;
}

export interface LeadDestinationConfig {
  type: 'email' | 'crm';
  email: string;
  crm: {
    provider: 'rdstation' | 'activecampaign' | 'mailchimp' | 'mailerlite' | 'webhook' | '';
    apiKey: string;
    listId: string;
    webhookUrl: string;
  };
}

export interface TrackingConfig {
  ga4Id: string;
  facebookPixelId: string;
  gtmId: string;
  tiktokPixelId: string;
}

export interface LgpdConfig {
  showCookieBanner: boolean;
  termsOfUse: string;
  privacyPolicy: string;
}

export interface StylesConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: 'Inter' | 'Montserrat' | 'Poppins';
}

export type TemplateStyles = StylesConfig;

export interface ThankYouPageConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  message: string;
  ctaText: string;
  redirectUrl: string;
  nextSteps?: string[];
}

export interface UpsellPageConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  description?: string;
  productName: string;
  productImage?: string;
  originalPrice: string;
  discountPrice: string;
  price?: string;
  discount?: number;
  benefits: string[];
  ctaAcceptText: string;
  ctaDeclineText: string;
}

export interface DownsellPageConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  productName: string;
  price: string;
  benefits: string[];
  ctaAcceptText: string;
  ctaDeclineText: string;
}

export interface FooterConfig {
  companyName?: string;
  companyDescription?: string;
  companyLogo?: string;
  email?: string;
  phone?: string;
  workingHours?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  linkAbout?: string;
  linkPrivacy?: string;
  linkTerms?: string;
}

export interface TemplateData {
  // Content
  headline: string;
  subheadline: string;
  ctaButtonText: string;
  heroText: string;
  aboutText: string;
  benefitsTitle: string;
  benefits: Benefit[];
  testimonialsTitle: string;
  testimonials: Testimonial[];
  faqTitle: string;
  faqs: FAQ[];
  
  // Product specific
  price: string;
  originalPrice: string;
  guaranteeTitle: string;
  guaranteeText: string;
  guaranteeDays: number;
  productSpecs?: Record<string, string>;
  productImages?: string[];
  productBenefits?: string[];
  stock?: number;
  
  // Service specific
  targetAudienceTitle: string;
  targetAudience: Benefit[];
  processTitle: string;
  processSteps: Benefit[];
  caseStudies: CaseStudy[];
  pricingTitle: string;
  pricingTiers: PricingTier[];
  
  // Event specific
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventIsOnline: boolean;
  speakersTitle: string;
  speakers: Speaker[];
  scheduleTitle: string;
  schedule: ScheduleItem[];
  ticketsTitle: string;
  
  // Course specific
  instructorName: string;
  instructorPhoto?: string;
  instructorBio: string;
  instructorCredentials?: string[];
  modulesTitle: string;
  modules: CourseModule[];
  bonusTitle: string;
  bonuses: Benefit[];
  
  // Images
  logoUrl: string;
  heroImageUrl: string;
  
  // Video
  videoUrl: string;
  useImageInsteadOfVideo: boolean;
  
  // Styles
  styles: StylesConfig;
  
  // Form config
  formFields: FormFieldConfig;
  
  // Integrations
  integrations: IntegrationsConfig;
  
  // LGPD
  lgpd: LgpdConfig;
  
  // Extra pages
  thankYouPage: ThankYouPageConfig;
  upsellPage: UpsellPageConfig;
  downsellPage: DownsellPageConfig;

  // New Footer field
  footer?: FooterConfig;
}

export const defaultTemplateData: TemplateData = {
  headline: 'Produto Incrível',
  subheadline: 'A solução perfeita para quem busca resultados reais e duradouros',
  ctaButtonText: 'Quero Começar Agora',
  heroText: 'Milhares de pessoas já transformaram suas vidas. Você pode ser o próximo.',
  aboutText: 'Somos especialistas em ajudar pessoas a alcançarem seus objetivos com metodologia comprovada.',
  benefitsTitle: 'Por que escolher nossa solução?',
  benefits: [
    { id: '1', text: 'Resultados comprovados', description: 'Metodologia testada e aprovada por milhares de clientes' },
    { id: '2', text: 'Suporte especializado', description: 'Time de especialistas prontos para ajudar você' },
    { id: '3', text: 'Garantia de satisfação', description: 'Seu dinheiro de volta se não ficar satisfeito' },
  ],
  testimonialsTitle: 'O que nossos clientes dizem',
  testimonials: [
    { id: '1', name: 'Maria Silva', role: 'Empresária', text: 'Resultado incrível! Superou todas as minhas expectativas.', city: 'São Paulo, SP' },
    { id: '2', name: 'João Santos', role: 'Gerente de Marketing', text: 'Recomendo para todos que querem resultados reais.', city: 'Rio de Janeiro, RJ' },
  ],
  faqTitle: 'Perguntas Frequentes',
  faqs: [
    { id: '1', question: 'Como funciona a garantia?', answer: 'Oferecemos garantia de 30 dias. Se não estiver satisfeito, devolvemos 100% do seu investimento.' },
    { id: '2', question: 'Qual é o prazo de entrega?', answer: 'O prazo varia de 3 a 7 dias úteis dependendo da sua região.' },
    { id: '3', question: 'Posso parcelar o pagamento?', answer: 'Sim! Aceitamos parcelamento em até 12x no cartão de crédito.' },
  ],
  
  // Product specific
  price: '197.00',
  originalPrice: '297.00',
  guaranteeTitle: 'Garantia de 30 Dias',
  guaranteeText: 'Experimente sem risco. Se não ficar satisfeito, devolvemos 100% do seu investimento. Sem perguntas.',
  guaranteeDays: 30,
  stock: 47,
  productSpecs: {
    "Marca": "Premium Audio",
    "Modelo": "BT-2024",
    "Garantia": "12 meses"
  },
  productImages: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800"
  ],
  productBenefits: [
    'Cancelamento ativo de ruído (ANC)',
    'Bateria de longa duração - até 30 horas',
    'Conexão Bluetooth 5.0 ultra estável',
  ],
  
  targetAudienceTitle: 'Para Quem é Este Serviço',
  targetAudience: [],
  processTitle: 'Como Funciona',
  processSteps: [],
  caseStudies: [],
  pricingTitle: 'Nossos Planos',
  pricingTiers: [],
  eventDate: '',
  eventTime: '',
  eventLocation: '',
  eventIsOnline: true,
  speakersTitle: 'Palestrantes',
  speakers: [],
  scheduleTitle: 'Programação',
  schedule: [],
  ticketsTitle: 'Ingressos',
  instructorName: '',
  instructorBio: '',
  modulesTitle: 'Conteúdo do Curso',
  modules: [],
  bonusTitle: 'Bônus Exclusivos',
  bonuses: [],
  logoUrl: '',
  heroImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  videoUrl: '',
  useImageInsteadOfVideo: true,
  styles: { primaryColor: '#6366f1', secondaryColor: '#8b5cf6', fontFamily: 'Inter' },
  formFields: { fullName: true, email: true, whatsapp: false, cpf: false, company: false, role: false },
  integrations: {
    checkout: { enabled: true, type: 'external', platform: '', url: '', buttonText: 'Comprar Agora' },
    leadDestination: { type: 'email', email: '', crm: { provider: '', apiKey: '', listId: '', webhookUrl: '' } },
    tracking: { ga4Id: '', facebookPixelId: '', gtmId: '', tiktokPixelId: '' },
  },
  lgpd: { showCookieBanner: true, termsOfUse: '', privacyPolicy: '' },
  thankYouPage: { enabled: true, title: 'Obrigado!', message: '', ctaText: 'Continuar', redirectUrl: '' },
  upsellPage: { enabled: false, title: '', subtitle: '', productName: '', originalPrice: '', discountPrice: '', benefits: [], ctaAcceptText: '', ctaDeclineText: '' },
  downsellPage: { enabled: false, title: '', subtitle: '', productName: '', price: '', benefits: [], ctaAcceptText: '', ctaDeclineText: '' },
  
  // Default footer data
  footer: {
    companyName: 'Minha Empresa',
    companyDescription: 'Sua loja de produtos premium com entrega garantida.',
    email: 'contato@exemplo.com',
    phone: '(11) 99999-9999',
    workingHours: 'Seg a Sex: 09h às 18h',
    socialInstagram: '',
    socialFacebook: '',
    socialTwitter: '',
    socialYoutube: '',
    linkAbout: '#',
    linkPrivacy: '#',
    linkTerms: '#',
  }
};