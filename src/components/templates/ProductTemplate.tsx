import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductTemplateProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplate({ data, projectName }: ProductTemplateProps) {
  const templateData = data?.templateData || {};
  const [selectedImage, setSelectedImage] = useState(0);
  
  const defaultImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800";
  const defaultFeatures = [
    "Material premium de alta qualidade",
    "Design moderno e elegante",
    "Durabilidade comprovada",
    "Garantia de 12 meses",
    "Envio rápido e seguro"
  ];
  
  const defaultReviews = {
    rating: 4.8,
    count: 1243,
    comments: [
      { name: "João Silva", rating: 5, comment: "Produto excelente! Superou minhas expectativas.", date: "15/12/2024" },
      { name: "Maria Santos", rating: 5, comment: "Qualidade impecável, chegou rápido. Recomendo!", date: "10/12/2024" },
      { name: "Pedro Costa", rating: 4, comment: "Muito bom! Apenas o prazo poderia ser menor.", date: "05/12/2024" }
    ]
  };
  
  const product = {
    name: templateData.headline || projectName || "Produto Premium",
    description: templateData.description || "Descrição detalhada do produto com todos os benefícios e características únicas que fazem dele a melhor escolha para você.",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    images: (Array.isArray(templateData.images) && templateData.images.length > 0) ? templateData.images : [defaultImage],
    features: (Array.isArray(templateData.features) && templateData.features.length > 0) ? templateData.features : defaultFeatures,
    specs: templateData.specs || {
      "Dimensões": "30cm x 20cm x 10cm",
      "Peso": "500g",
      "Material": "Alumínio premium",
      "Cor": "Preto fosco"
    },
    reviews: templateData.reviews || defaultReviews,
    shipping: templateData.shipping || "Frete Grátis para todo o Brasil",
    ctaText: templateData.ctaText || "COMPRAR AGORA",
    stock: templateData.stock || 47
  };
  
  const discount = (product.originalPrice && product.price)
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {discount > 0 && (
        <div className="bg-gradient-to-r from-red-500
