import { Button } from "@/components/ui/button";
import { Check, Calendar, Mail, Phone, Clock } from "lucide-react";

export default function ServiceThankYou({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <Check className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Solicitacao Recebida Com Sucesso!
            </h1>
            <p className="text-xl text-blue-100">
              Em breve entraremos em contato para agendar
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Recebemos Sua Solicitacao</h3>
                  <p className="text-green-700 text-sm">
                    Protocolo: <strong>#{data?.protocolId || "SRV-2024-001"}</strong>
                    <br />
                    Nossa equipe entrara em contato em ate <strong>24 horas</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Seus Dados
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <strong>Nome:</strong> {data?.name || "Cliente"}
                  </p>
                  <p className="text-gray-600">
                    <strong>E-mail:</strong> {data?.email || "cliente@email.com"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Telefone:</strong> {data?.phone || "(11) 99999-9999"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Servico Solicitado
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <strong>Servico:</strong> {data?.serviceName || "Consultoria Premium"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Data:</strong> {data?.date || "A combinar"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong> <span className="text-green-600 font-bold">Aguardando Contato</span>
                  </p>
                </div>
              </div>

            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                O Que Acontece Agora:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Analise da Solicitacao</h3>
                    <p className="text-gray-600 text-sm">
                      Nossa equipe vai analisar seu pedido e preparar uma proposta personalizada
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Contato Inicial</h3>
                    <p className="text-gray-600 text-sm">
                      Entraremos em contato por e-mail ou telefone em ate 24 horas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Agendamento</h3>
                    <p className="text-gray-600 text-sm">
                      Vamos agendar uma data e horario conveniente para voce
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Inicio do Servico</h3>
                    <p className="text-gray-600 text-sm">
                      Comecaremos o trabalho conforme combinado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Urgencia?</h3>
                  <p className="text-yellow-800 text-sm mb-3">
                    Se seu caso e urgente, entre em contato direto conosco:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="outline"
                      className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar Agora
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-green-600 text-green-700 hover:bg-green-50"
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Enviamos uma copia desta confirmacao para seu e-mail
              </p>
              <Button 
                variant="outline"
                className="border-2 rounded-xl"
              >
                Voltar para a Pagina Inicial
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
