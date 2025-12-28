import { Button } from "@/components/ui/button";
import { Check, Clock, Zap } from "lucide-react";

export default function ServiceUpsell({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
            UPGRADE DISPONIVEL
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Parabens! Voce Qualificou Para Nosso Plano VIP
          </h1>
          <p className="text-xl text-gray-300">
            Adicione suporte prioritario e consultoria personalizada por apenas +R$ 97/mes
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                Plano VIP Inclui:
              </h3>
              <ul className="space-y-4">
                {[
                  "Suporte prioritario 24/7",
                  "Consultoria mensal de 1 hora",
                  "Acesso a ferramentas premium",
                  "Relatorios personalizados",
                  "Atendimento via WhatsApp"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-2xl p-8 text-center mb-6">
                <p className="text-sm font-bold mb-2">DE R$ 297/MES POR APENAS</p>
                <div className="text-6xl font-black mb-2">R$ 97</div>
                <p className="text-sm">/mes durante 6 meses</p>
              </div>

              <Button 
                className="w-full h-16 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-2xl mb-4"
              >
                ADICIONAR PLANO VIP AGORA
              </Button>

              <button className="w-full text-gray-400 hover:text-white text-sm underline">
                Continuar com o plano basico
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Oferta valida apenas nesta pagina</span>
              </div>
            </div>

          </div>

          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-center">
            <p className="font-bold">
              ⚠️ Esta oferta especial nao estara disponivel depois desta pagina
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
