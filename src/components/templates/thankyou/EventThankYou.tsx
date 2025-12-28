import { Button } from "@/components/ui/button";
import { Check, Calendar, Download, Video, Bell } from "lucide-react";

export default function EventThankYou({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <Check className="w-16 h-16 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Inscricao Confirmada! Nos Vemos La
            </h1>
            <p className="text-xl text-purple-100">
              Seu ingresso para o evento foi garantido
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-purple-900 mb-3">Detalhes do Evento</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Evento:</strong> {data?.eventName || "Workshop Exclusivo"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Data:</strong> {data?.eventDate || "15 de Janeiro, 2025"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Horario:</strong> {data?.eventTime || "19h00 - 22h00"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Local:</strong> {data?.eventLocation || "Online (Zoom)"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-purple-900 mb-3">Seu Ingresso</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Tipo:</strong> {data?.ticketType || "VIP"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Numero:</strong> #{data?.ticketNumber || "12345"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Status:</strong> <span className="text-green-600 font-bold">Confirmado</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Adicionar ao Calendario</h3>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Google Calendar
                </Button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Download className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Baixar Ingresso</h3>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Baixar PDF
                </Button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Bell className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Lembretes</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Ativado por e-mail
                </p>
              </div>

            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                Prepare-se Para o Evento:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Acesse o link do evento</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      O link de acesso sera enviado 1 hora antes do inicio
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-2 border-purple-300"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Ver Instrucoes de Acesso
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Baixe os materiais</h3>
                    <p className="text-gray-600 text-sm">
                      Material de apoio ja esta disponivel para download
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Participe do grupo</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Entre no grupo exclusivo de participantes
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-2 border-green-300"
                    >
                      Entrar no WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg"
              >
                ACESSAR AREA DO PARTICIPANTE
              </Button>

              <Button 
                variant="outline"
                className="w-full h-14 text-lg font-bold border-2 rounded-xl"
              >
                COMPARTILHAR COM AMIGOS
              </Button>
            </div>

            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>Duvidas? Fale conosco: <a href="mailto:eventos@email.com" className="text-purple-600 hover:underline">eventos@email.com</a></p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
