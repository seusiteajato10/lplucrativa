import { Button } from "@/components/ui/button";
import { Check, AlertCircle, DollarSign } from "lucide-react";

export default function GenericDownsell({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              Espere! Temos Uma Proposta Melhor
            </h1>
            <p className="text-xl text-blue-100">
              Que tal comecar com uma versao mais acessivel?
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8 text-center">
              <p className="text-yellow-800 font-bold text-lg">
                Entendemos que o investimento pode ser alto. Por isso, preparamos uma oferta especial!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              <div className="bg-gray-50 rounded-2xl p-6 opacity-60">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">Oferta Anterior</p>
                  <p className="text-4xl font-black text-gray-600 line-through">R$ {data?.originalPrice || "497"}</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Produto/Servico Completo</li>
                  <li>Todos os Bonus</li>
                  <li>Suporte Premium</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-500">
                <div className="text-center mb-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                    OFERTA ESPECIAL
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <span className="text-5xl font-black text-blue-600">R$ {data?.downsellPrice || "197"}</span>
                  </div>
                  <p className="text-sm text-gray-600">70% mais barato</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Versao Essencial do Produto</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Conteudo Principal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Suporte Basico</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Garantia de 30 Dias</span>
                  </li>
                </ul>
              </div>

            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg"
              >
                SIM! ACEITO ESTA OFERTA ESPECIAL
              </Button>

              <button className="w-full text-gray-500 hover:text-gray-700 text-sm underline">
                Nao, quero pensar melhor
              </button>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <p className="text-center text-gray-700">
                <strong className="text-blue-600">Importante:</strong> Esta e sua ultima chance de garantir um desconto. 
                Apos sair desta pagina, esta oferta nao estara mais disponivel.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
