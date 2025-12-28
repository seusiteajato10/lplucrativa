import { Button } from "@/components/ui/button";
import { Check, Download, Mail, Package, Clock } from "lucide-react";

export default function ProductThankYou({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <Check className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Parabens! Sua Compra Foi Confirmada
            </h1>
            <p className="text-xl text-green-100">
              Pedido #{data?.orderId || "12345"} processado com sucesso
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Enviamos um e-mail de confirmacao</h3>
                  <p className="text-blue-700 text-sm">
                    Verifique sua caixa de entrada em <strong>{data?.email || "seu@email.com"}</strong>
                    <br />
                    (Se nao encontrar, verifique a pasta de spam)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Pedido Confirmado</h3>
                <p className="text-sm text-gray-600">Seu pagamento foi aprovado</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Download className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Acesso Liberado</h3>
                <p className="text-sm text-gray-600">Ja pode acessar o produto</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Suporte Disponivel</h3>
                <p className="text-sm text-gray-600">Estamos aqui para ajudar</p>
              </div>

            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                Proximos Passos:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Verifique seu e-mail</h3>
                    <p className="text-gray-600 text-sm">
                      Enviamos todas as informacoes de acesso e login
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Acesse a area de membros</h3>
                    <p className="text-gray-600 text-sm">
                      Clique no botao abaixo para acessar agora mesmo
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Comece agora</h3>
                    <p className="text-gray-600 text-sm">
                      Aproveite todo o conteudo disponivel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg"
              >
                ACESSAR AREA DE MEMBROS AGORA
              </Button>

              <Button 
                variant="outline"
                className="w-full h-14 text-lg font-bold border-2 rounded-xl"
              >
                BAIXAR MATERIAIS COMPLEMENTARES
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm mb-4">
                Precisa de ajuda? Entre em contato conosco
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <a href="mailto:suporte@email.com" className="text-blue-600 hover:underline">
                  suporte@email.com
                </a>
                <a href="https://wa.me/5511999999999" className="text-green-600 hover:underline">
                  WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
