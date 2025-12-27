import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Gift, Shield, Clock, Users, TrendingUp, Zap } from 'lucide-react';

interface ProductTemplateVSLProps {
  projectData?: {
    title?: string;
    description?: string;
    buttonText?: string;
    primaryColor?: string;
    videoUrl?: string;
  };
}

function ProductTemplateVSL({ projectData = {} }: ProductTemplateVSLProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const title = projectData?.title || 'Descubra o Método que Já Transformou Mais de 5.000 Vidas';
  const description = projectData?.description || 'Assista o vídeo abaixo e descubra como pessoas comuns estão alcançando resultados extraordinários em apenas 30 dias';
  const buttonText = projectData?.buttonText || 'QUERO ACESSO AGORA';
  const primaryColor = projectData?.primaryColor || '#ff6b35';
  const videoUrl = projectData?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  const bonuses = [
    { icon: Gift, title: 'Bônus #1', description: 'Módulo Acelerador de Resultados', value: 'R$ 497' },
    { icon: Zap, title: 'Bônus #2', description: 'Planilhas e Templates Prontos', value: 'R$ 297' },
    { icon: Users, title: 'Bônus #3', description: 'Acesso à Comunidade VIP', value: 'R$ 197' },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Empreendedora Digital',
      text: 'Em apenas 15 dias já recuperei o investimento! Os resultados são reais e o método funciona.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    {
      name: 'João Pedro',
      role: 'Consultor',
      text: 'Melhor decisão que tomei este ano. Conteúdo direto ao ponto e suporte excepcional!',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    },
    {
      name: 'Ana Costa',
      role: 'Coach',
      text: 'Superou todas as minhas expectativas. Já indiquei para todos os meus amigos!',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* COUNTDOWN FIXO NO TOPO */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-2xl" style={{ backgroundColor: primaryColor }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-sm md:text-base">⚠️ OFERTA EXPIRA EM:</span>
            </div>
            <div className="flex gap-3">
              <div className="bg-black/30 px-3 py-2 rounded-lg min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">HORAS</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-black/30 px-3 py-2 rounded-lg min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">MIN</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-black/30 px-3 py-2 rounded-lg min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">SEG</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Prova Social */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-6 py-3 rounded-full mb-6">
              <Users className="w-5 h-5" />
              <span className="font-semibold">✨ Mais de 5.247 pessoas já estão dentro!</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Estrelas e avaliação */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 font-semibold">4.9/5 • 1.847 avaliações</span>
            </div>
          </div>

          {/* VÍDEO PRINCIPAL */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: primaryColor }}>
            <div className="aspect-video bg-slate-800">
              <iframe
                src={videoUrl}
                title="Video de vendas"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse shadow-lg">
              🔴 AO VIVO
            </div>
          </div>

          {/* CTA PRINCIPAL */}
          <div className="text-center space-y-6">
            <Button
              size="lg"
              className="w-full sm:w-auto text-xl md:text-2xl px-12 py-8 font-black uppercase shadow-2xl hover:scale-105 transition-transform duration-300 animate-pulse"
              style={{ backgroundColor: primaryColor }}
            >
              {buttonText}
            </Button>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 flex-wrap">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-400" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-400" />
                <span>Garantia de 7 Dias</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-400" />
                <span>Compra 100% Segura</span>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-slate-400 line-through text-lg mb-2">De R$ 997,00</div>
              <div className="text-slate-400 mb-2">Por apenas</div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-slate-400 text-2xl">R$</span>
                <span className="text-6xl font-black" style={{ color: primaryColor }}>197</span>
              </div>
              <div className="text-slate-400 text-sm">ou 12x de R$ 19,70</div>
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS EXCLUSIVOS */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-6 py-3 rounded-full mb-6 font-bold">
              🎁 BÔNUS EXCLUSIVOS
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Você Também Vai Receber
            </h2>
            <p className="text-xl text-slate-300">
              Mais de <span className="font-bold" style={{ color: primaryColor }}>R$ 991</span> em bônus sem custo adicional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl border border-slate-600 hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                  <bonus.icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg mb-2">{bonus.title}</div>
                  <div className="text-slate-300 mb-3">{bonus.description}</div>
                  <div className="text-green-400 font-bold">Valor: {bonus.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-2 border-green-500 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Garantia Incondicional de 7 Dias
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Você tem <span className="font-bold text-green-400">7 dias completos</span> para testar todo o conteúdo. 
              Se não gostar por qualquer motivo, devolvemos <span className="font-bold text-green-400">100% do seu dinheiro</span>. 
              Sem perguntas, sem burocracia. É simples assim!
            </p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Veja o Que Nossos Alunos Dizem
            </h2>
            <p className="text-xl text-slate-300">
              Resultados reais de pessoas reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-700 p-6 rounded-xl border border-slate-600"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Última Chance de Garantir Sua Vaga!
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Não perca essa oportunidade. Mais de <span className="font-bold" style={{ color: primaryColor }}>100 pessoas</span> entraram nas últimas 24 horas.
          </p>

          <Button
            size="lg"
            className="w-full sm:w-auto text-xl md:text-2xl px-12 py-8 font-black uppercase shadow-2xl hover:scale-105 transition-transform duration-300 mb-6"
            style={{ backgroundColor: primaryColor }}
          >
            🔥 {buttonText} 🔥
          </Button>

          <div className="flex items-center justify-center gap-4 text-sm text-slate-400 flex-wrap">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <span>Acesso Vitalício</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <span>Suporte Prioritário</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <span>Certificado</span>
            </div>
          </div>

          <div className="mt-12 text-slate-500 text-xs">
            <p>© 2025 Todos os direitos reservados • Pagamento 100% Seguro</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ProductTemplateVSL;
