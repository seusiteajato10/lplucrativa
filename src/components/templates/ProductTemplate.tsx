import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Shield, Star, ChevronDown, Package, Zap, TrendingUp } from 'lucide-react';

interface ProductTemplateProps {
  projectData: {
    title: string;
    description: string;
    buttonText: string;
    primaryColor: string;
  };
}

export function ProductTemplate({ projectData }: ProductTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    { icon: Zap, text: 'Acesso imediato após a compra' },
    { icon: Package, text: 'Conteúdo completo e atualizado' },
    { icon: TrendingUp, text: 'Suporte direto com o criador' },
    { icon: Shield, text: 'Garantia de 7 dias' },
  ];

  const features = [
    'Módulo 1: Fundamentos essenciais',
    'Módulo 2: Estratégias avançadas',
    'Módulo 3: Cases de sucesso',
    'Bônus exclusivos',
    'Comunidade privada',
    'Certificado de conclusão',
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Empreendedora',
      text: 'Transformou completamente meu negócio! Resultados em menos de 30 dias.',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Freelancer',
      text: 'Melhor investimento que fiz este ano. Recomendo para todos!',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Consultora',
      text: 'Conteúdo prático e direto ao ponto. Vale cada centavo!',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Como funciona o acesso?',
      answer: 'O acesso é liberado automaticamente após a confirmação do pagamento. Você receberá um email com login e senha.',
    },
    {
      question: 'Tem garantia?',
      answer: 'Sim! Você tem 7 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro.',
    },
    {
      question: 'Por quanto tempo tenho acesso?',
      answer: 'O acesso é vitalício! Você pode acessar o conteúdo quando quiser, quantas vezes quiser.',
    },
    {
      question: 'Preciso de conhecimento prévio?',
      answer: 'Não! O conteúdo foi criado para iniciantes e avançados. Você aprende do zero.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* CTA FIXO NO TOPO */}
      <div className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm z-50 py-3 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="text-primary-foreground font-semibold text-sm md:text-base">
            🔥 Oferta por tempo limitado!
          </span>
          <Button variant="secondary" size="sm">
            Comprar Agora
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
                {projectData.title || 'Transforme Seu Negócio em 30 Dias'}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {projectData.description || 'Aprenda o método completo que já ajudou milhares de pessoas a alcançarem seus objetivos.'}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Garantia de 7 dias</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Suporte incluso</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: projectData.primaryColor }}
                >
                  {projectData.buttonText || 'Quero Começar Agora'}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Ver Demonstração
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 baseado em 847 avaliações
                </span>
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
                  alt="Produto"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg rotate-12">
                50% OFF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI RECEBER */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            O Que Você Vai Receber
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Tudo que você precisa para ter sucesso
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
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

      {/* GARANTIA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Shield className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Garantia Incondicional de 7 Dias</h2>
          <p className="text-lg text-muted-foreground">
            Você tem 7 dias para testar todo o conteúdo. Se não gostar por qualquer motivo, 
            devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            O Que Dizem Nossos Alunos
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Histórias reais de quem já transformou resultados
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto Para Transformar Seus Resultados?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a mais de 1.000 pessoas que já estão alcançando seus objetivos
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all"
            style={{ backgroundColor: projectData.primaryColor }}
          >
            Garantir Minha Vaga Agora
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            ✓ Acesso imediato • ✓ Garantia de 7 dias • ✓ Pagamento seguro
          </p>
        </div>
      </section>
    </div>
  );
}
