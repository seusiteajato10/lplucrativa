import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface ServiceTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const ServiceTemplate = ({ data, projectName, projectId, userId, slug }: ServiceTemplateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  const templateData: TemplateData = { ...defaultTemplateData, ...data } as TemplateData;
  const { styles, headline, subheadline, ctaButtonText } = templateData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !userId) return;
    setIsSubmitting(true);
    const { error } = await supabase.from("leads_captured").insert({
      project_id: projectId,
      user_id: userId,
      data: formData,
      source_url: window.location.href,
    });
    setIsSubmitting(false);
    if (!error) navigate(`/p/${slug}/obrigado`);
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: styles.fontFamily }}>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: styles.primaryColor }}>{headline}</h1>
        <p className="text-xl text-slate-600 mb-12">{subheadline}</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input placeholder="Nome" onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          <Input type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <Button type="submit" className="w-full py-6" style={{ backgroundColor: styles.primaryColor }}>{ctaButtonText}</Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceTemplate;