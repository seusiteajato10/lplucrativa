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
              Apr
