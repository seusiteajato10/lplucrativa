import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2, Clock, Shield, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductTemplateVSLProps {
  data?: any;
  projectName?: string;
  projectId?: string;
}

export default function ProductTemplateVSL({ data, projectName }: ProductTemplateVSLProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  
  // Extrair dados do templateData
  const templateData = data?.templateData || {};
  const product = {
    name: templateData.headline || projectName || "Seu Produto Incrível",
    description: templateData.subheadline || "Transforme sua vida em 30 dias",
    price: parseFloat(templateData.price) || 297,
    originalPrice: parseFloat(templateData.originalPrice) || 497,
    videoUrl: templateData.videoUrl || "",
    benefits: templateData.benefits || [
      "Acesso imediato e vitalício ao conteúdo completo",
      "Suporte prioritário 24/7 via WhatsApp",
      "Certificado de conclusão reconhecido",
      "Bônus exclusivos no valor de R$ 497",
      "Atualizações gratuitas para sempre"
    ],
    ctaText: templateData.ctaText || "🚀 SIM! QUERO TRANSFORMAR MINHA VIDA AGORA",
    garantia: templateData.garantia || "Garantia incondicional de 30 dias"
  };
  
  // Contador
