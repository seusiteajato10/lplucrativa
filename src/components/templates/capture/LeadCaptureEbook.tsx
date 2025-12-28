import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LeadCaptureEbook({ data }: any) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", { email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            
            <div className="flex flex-col justify-center">
              
              <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 w-fit">
                100% GRATUITO
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {data?.headline || "Guia Completo: Como Dominar [Tema] em 7 Dias"}
              </h1>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {data?.subheadline || "Descubra o passo a passo completo usado por especialistas para obter resultados rapidos e duradouros"}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">52 paginas</strong> de conteudo exclusivo e pratico
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Modelos prontos</strong> para aplicar imediatamente
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Bonus exclusivo:</strong> Checklist de implementacao
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Digite seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  BAIXAR EBOOK GRATIS
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                Sem spam. Cancele quando quiser. Seus dados estao seguros.
              </p>

            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
                    <div className="text-6xl font-black mb-4">E-BOOK</div>
                    <div className="text-xl font-bold mb-2">{data?.headline?.substring(0, 30) || "Guia Completo"}</div>
                    <div className="text-sm opacity-90">Por Especialistas</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Ja foram baixados <strong className="text-gray-900">12.483 exemplares</strong> deste ebook
          </p>
        </div>

      </div>
    </div>
  );
}
