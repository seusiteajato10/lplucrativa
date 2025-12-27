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
  
  const product = {
    name: templateData.headline || projectName || "Produto Premium",
    description: templateData.description || "Descrição completa do produto",
    price: parseFloat(templateData.price) || 197,
    originalPrice: parseFloat(templateData.originalPrice) || 297,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    ctaText: templateData.ctaText || "COMPRAR AGORA",
    stock: templateData.stock || 47
  };
  
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {discount > 0 && (
