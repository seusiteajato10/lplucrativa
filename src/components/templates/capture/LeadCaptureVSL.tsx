import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LeadCaptureVSL({ data }: any) {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", { email });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            🔴 AO VIVO AGORA
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            {data?.headline || "Descubra o Metodo Secreto que Esta Mudando Vidas"}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {data?.subheadline || "Assista este video ate o final para ter acesso a uma oferta exclusiva"}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-red-600 hover:bg-red-700 rounded-full w-24 h-24 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-200"
              >
                <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
              </button>
            </div>

            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              GRAVACAO EXCLUSIVA
            </div>

            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-mono">
              38:42
            </div>

            {data?.videoUrl && (
              <video 
                src={data.videoUrl}
                className="w-full h-full object-cover"
                controls
                poster={data?.posterUrl}
              />
            )}
          </div>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-purple-500">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-black mb-3">
                Liberado! Assista Agora
              </h2>
              <p className="text-lg text-gray-300">
                Digite seu e-mail para liberar o acesso completo ao video
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-300 mb-4 text-center uppercase tracking-wide font-semibold">
                Ao assistir voce vai descobrir:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-xl">►</span>
                  <span className="text-gray-200">O erro numero 1 que impede seu sucesso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-xl">►</span>
                  <span className="text-gray-200">A estrategia exata usada por profissionais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-xl">►</span>
                  <span className="text-gray-200">Como aplicar isso em menos de 24 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-xl">►</span>
                  <span className="text-gray-200">BONUS: Material complementar em PDF</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg bg-white text-gray-900 border-2 border-white focus:border-yellow-400"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  LIBERAR ACESSO COMPLETO AGORA
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <span>100% Seguro</span>
              </div>
              <span>•</span>
              <span>Sem spam</span>
              <span>•</span>
              <span>Cancele quando quiser</span>
            </div>

          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="text-4xl font-black text-yellow-400 mb-2">15.847</div>
            <div className="text-gray-400 text-sm">Pessoas ja assistiram</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="text-4xl font-black text-yellow-400 mb-2">4.9/5</div>
            <div className="text-gray-400 text-sm">Avaliacao media</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="text-4xl font-black text-yellow-400 mb-2">92%</div>
            <div className="text-gray-400 text-sm">Taxa de satisfacao</div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Este video sera removido em breve. Assista enquanto esta disponivel.</p>
        </div>

      </div>
    </div>
  );
}
