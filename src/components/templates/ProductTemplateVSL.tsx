import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const templateData = data?.templateData || {};
  
  const product = {
    name: templateData.headline || projectName || "Seu Produto Incrível",
    description: templateData.subheadline || "Transforme sua vida em 30 dias",
    price: parseFloat(templateData.price) || 297,
    originalPrice: parseFloat(templateData.originalPrice) || 497,
  };
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <div className="text-center mb-6">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base px-8 py-3">
            OFERTA RELÂMPAGO - {discount}% OFF
          </Badge>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
            {product.description}
          </p>
        </div>

        <Card className="mb-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none">
          <CardContent className="p-10 text-center">
            {product.originalPrice && (
              <div className="mb-6">
                <p className="text-gray-200 text-2xl mb-3">De:</p>
                <p className="text-5xl text-white/80 line-through font-bold">
                  R$ {product.originalPrice.toFixed(2)}
                </p>
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-yellow-300 text-3xl font-black mb-4">
                Por apenas:
              </p>
              <p className="text-7xl font-black text-white mb-3">
                R$ {product.price.toFixed(2)}
              </p>
              {discount > 0 && (
                <Badge className="bg-yellow-400 text-black text
