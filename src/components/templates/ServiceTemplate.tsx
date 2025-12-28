import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, Star, Users, Award, Clock, Shield } from "lucide-react";

export default function ServiceTemplate({ data }: any) {
  const [email, setEmail] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contato solicitado:", { email });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-block bg-blue-500 px-4 py-1 rounded-full text-sm font-bold mb-6">
                {data?.badge || "SERVICO PREMIUM"}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                {data?.headline || "Transforme Seu Negocio com Consultoria Especializada"}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {data?.subheadline || "Solucoes personalizadas para empresas que buscam resultados reais e mensuráveis"}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Resultados Garantidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Atendimento Personalizado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Suporte Ilimitado</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="h-14 px-8 text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Agendar Consultoria Gratuita
                </Button>
                <Button 
                  variant="outline"
                  className="h-14 px-8 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-slate-900 rounded-lg"
                >
                  Ver Como Funciona
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">500+</div>
                    <div className="text-sm text-gray-300">Clientes Atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">98%</div>
                    <div className="text-sm text-gray-300">Satisfacao</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">15+</div>
                    <div className="text-sm text-gray-300">Anos Experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">24h</div>
                    <div className="text-sm text-gray-300">Tempo Resposta</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600 mb-8 uppercase tracking-wider font-semibold">
            Confiam em nosso trabalho
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-2xl font-bold text-gray-400">EMPRESA A</div>
            <div className="text-2xl font-bold text-gray-400">EMPRESA B</div>
            <div className="text-2xl font-bold text-gray-400">EMPRESA C</div>
            <div className="text-2xl font-bold text-gray-400">EMPRESA D</div>
          </div>
        </div>
      </section>

      {/* SERVICOS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              O Que Oferecemos
            </h2>
            <p className="text-xl text-gray-600">
              Solucoes completas para cada necessidade do seu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12" />,
                title: "Consultoria Estrategica",
                description: "Planejamento completo para alavancar seu negocio com estrategias comprovadas"
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: "Implementacao Pratica",
                description: "Colocamos a mao na massa e implementamos as solucoes do inicio ao fim"
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Suporte Continuo",
                description: "Acompanhamento mensal com ajustes e otimizacoes constantes"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                <div className="text-blue-500 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples e transparente em 4 etapas
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analise Inicial", description: "Diagnostico completo do seu negocio" },
              { step: "02", title: "Estrategia", description: "Planejamento personalizado de acoes" },
              { step: "03", title: "Implementacao", description: "Execucao das solucoes acordadas" },
              { step: "04", title: "Otimizacao", description: "Ajustes e melhorias continuas" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-block bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              O Que Dizem Nossos Clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Resultados incriveis em apenas 3 meses. A equipe e extremamente profissional e comprometida com nosso sucesso."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-bold text-gray-900">Cliente {i}</div>
                    <div className="text-sm text-gray-600">CEO da Empresa</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING/CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Pronto Para Transformar Seu Negocio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Agende uma consultoria gratuita de 30 minutos e descubra como podemos ajudar
          </p>

          {!showContactForm ? (
            <Button 
              onClick={() => setShowContactForm(true)}
              className="h-16 px-12 text-xl font-bold bg-white text-blue-600 hover:bg-gray-100 rounded-lg shadow-2xl"
            >
              Agendar Consultoria Gratuita
            </Button>
          ) : (
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Solicite Seu Agendamento
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  className="h-14 text-lg text-gray-900"
                  required
                />
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg text-gray-900"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Telefone com WhatsApp"
                  className="h-14 text-lg text-gray-900"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Solicitar Agendamento
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                Entraremos em contato em ate 24 horas
              </p>
            </div>
          )}

          <div className="flex justify-center items-center space-x-8 mt-12 text-blue-100">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Resposta Rapida</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Quanto tempo leva para ver resultados?",
                a: "Os primeiros resultados aparecem entre 30 e 90 dias, dependendo da complexidade do projeto."
              },
              {
                q: "Como funciona o pagamento?",
                a: "Oferecemos planos mensais e projetos fechados com valores personalizados para cada cliente."
              },
              {
                q: "Qual o investimento necessario?",
                a: "O investimento varia conforme o escopo. Agende uma consultoria gratuita para receber um orcamento."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
