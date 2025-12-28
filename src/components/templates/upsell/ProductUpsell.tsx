import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

export default function ProductUpsell({ data }: any) {
  const handleAccept = () => {
    console.log("Upsell aceito");
  };

  const handleDecline = () => {
    console.log("Upsell recusado");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8 px-8 text-center">
            <div className="inline-block bg-white text-green-600 px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
              OFERTA ESPECIAL - SO AGORA
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Espere! Temos Uma Oferta Exclusiva Para Voce
            </h1>
            <p className="text-xl text-green-100">
              Aproveite esta oferta por apenas <strong>50% DO VALOR</strong> antes de continuar
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              <div>
                <div className="bg-gray-100 rounded-2xl p-6 h-64 flex items-center justify-center mb-4">
                  <div className="text-6xl">📦</div>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3">
                  {data?.productName || "Produto Premium"}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {data?.description || "Complemente sua compra com este produto premium que vai potencializar seus resultados"}
                </p>
              </div>

              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-4 uppercase tracking-wide font-semibold">
                    O que voce vai ganhar:
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-800">Acesso imediato ao produto completo</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-800">Bonus exclusivos (Valor R$ 297)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-800">Suporte prioritario por 30 dias</span>
                    </li>
                    <li className="flex items-start">
