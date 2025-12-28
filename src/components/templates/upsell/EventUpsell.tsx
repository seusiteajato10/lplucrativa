import { Button } from "@/components/ui/button";
import { Check, Clock, Users, Video, Gift } from "lucide-react";

export default function EventUpsell({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 px-8 text-center">
            <div className="inline-block bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
              UPGRADE EXCLUSIVO
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Aproveite: Ingresso VIP Com 60% OFF
            </h1>
            <p className="text-xl text-orange-100">
              Acesso total + beneficios exclusivos por tempo limitado
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6">
                  Compare os Ingressos:
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-bold text-gray-700 mb-2">✓ Ingresso Basico (Seu Atual)</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Acesso ao evento online</li>
                      <li>• Material em PDF</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-400">
                    <p className="font-bold text-orange-600 mb-2 flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Ingresso VIP (UPGRADE)
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Acesso ao evento online + gravacao
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Material completo + bonus (R$ 497)
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Certificado de participacao
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Sessao Q&A privada com especialistas
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Grupo VIP no WhatsApp
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Networking exclusivo
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Valor Normal do VIP</p>
                  <p className="text-3xl text-gray-400 line-through mb-3">R$ 997</p>
                  <p className="text-sm text-gray-600 mb-2">Apenas para voce AGORA:</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-gray-600">+ R$</span>
                    <span className="text-6xl font-black text-orange-600">397</span>
                  </div>
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full inline-block text-sm font-bold">
                    Economia de R$ 600
                  </div>
                </div>

                <Button 
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl shadow-lg mb-4"
                >
                  SIM! FAZER UPGRADE PARA VIP
                </Button>

                <button className="w-full text-gray-500 hover:text-gray-700 text-sm underline mb-4">
                  Nao, continuar com ingresso basico
                </button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Oferta expira em 15 minutos</span>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>234 upgrades hoje</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>Vagas limitadas</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <p className="text-yellow-800 font-bold text-lg">
                ⚡ ATENCAO: Esta e a UNICA oportunidade de fazer upgrade com este desconto!
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
