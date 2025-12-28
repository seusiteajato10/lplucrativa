import { Button } from "@/components/ui/button";
import { Check, Clock, BookOpen, Trophy, PlayCircle } from "lucide-react";

export default function CourseUpsell({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
            UPGRADE PARA VERSAO COMPLETA
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Desbloqueie o Curso Completo Agora
          </h1>
          <p className="text-2xl text-purple-200 mb-2">
            + 50 Modulos Extras Por Apenas <span className="text-yellow-400 font-black">70% OFF</span>
          </p>
          <p className="text-lg text-purple-300">
            Esta oferta so aparece uma vez e expira em 10 minutos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-2xl p-6 text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl line-through opacity-60">R$ 1.997</span>
                <span className="text-6xl font-black">R$ 597</span>
              </div>
              <p className="font-bold">Pagamento unico • Acesso vitalicio</p>
            </div>

            <Button 
              className="w-full h-16 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-2xl mb-4"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              ACESSAR CURSO COMPLETO AGORA
            </Button>

            <button className="w-full text-gray-400 hover:text-white text-sm underline mb-6">
              Nao, continuar apenas com modulos basicos
            </button>

            <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-center">
              <Clock className="w-5 h-5 inline mr-2" />
              <span className="font-bold">Oferta expira em 10:00 minutos</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="w-7 h-7 text-yellow-400 mr-2" />
              O Que Voce Ganha no Upgrade:
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "+50 Modulos Avancados",
                  desc: "Conteudo premium que nao esta na versao basica"
                },
                {
                  icon: <PlayCircle className="w-6 h-6" />,
                  title: "+40 Horas de Video-aulas",
                  desc: "Aulas praticas e detalhadas passo a passo"
                },
                {
                  icon: <Check className="w-6 h-6" />,
                  title: "Certificado de Conclusao",
                  desc: "Reconhecido no mercado"
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Projetos Praticos",
                  desc: "10+ projetos reais para seu portfolio"
                },
                {
                  icon: <Check className="w-6 h-6" />,
                  title: "Suporte Prioritario",
                  desc: "Tire duvidas direto com instrutores"
                },
                {
                  icon: <Check className="w-6 h-6" />,
                  title: "Atualizacoes Vitalícias",
                  desc: "Receba todo conteudo novo gratis"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-4 flex items-start space-x-4 hover:bg-white/10 transition-all">
                  <div className="text-yellow-400 mt-1 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-500/20 border border-yellow-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-yellow-300 text-center">
                🎁 BONUS: Grupo VIP + Mentorias Mensais (Valor: R$ 497)
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
