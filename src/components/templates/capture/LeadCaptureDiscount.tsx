import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LeadCaptureDiscount({ data }: any) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", { name, email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-yellow-400 text-center py-3 px-4">
            <p className="text-black font-bold text-sm uppercase tracking-wider">
              OFERTA EXCLUSIVA - APENAS HOJE
            </p>
          </div>

          <div className="p-8 md:p-12 text-center">
            
            <div className="mb-6">
              <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-4xl font-black mb-4">
                50% OFF
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {data?.headline || "Transforme Sua Vida em 30 Dias"}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {data?.subheadline || "Descubra o metodo secreto usado por mais de 10.000 pessoas para alcancar resultados extraordinarios"}
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-4 uppercase tracking-wide font-semibold">
                Preencha abaixo e ganhe:
              </p>
              
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">Acesso ao Ebook Exclusivo (Valor: R$ 97)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">Bonus: Video-aulas Praticas (Valor: R$ 197)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">Cupom de 50% OFF no Programa Completo</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 text-lg border-2 border-gray-300 focus:border-purple-500"
                  required
                />
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg border-2 border-gray-300 focus:border-purple-500"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  QUERO MINHA OFERTA AGORA
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span>Seus dados estao 100% seguros conosco</span>
            </div>

          </div>
        </div>

        <p className="text-center text-white text-sm mt-6">
          Mais de 10.000 pessoas ja aproveitaram esta oferta
        </p>

      </div>
    </div>
  );
}
