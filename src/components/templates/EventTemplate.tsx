import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface EventTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const EventTemplate = ({ data, projectName, projectId, userId, slug }: EventTemplateProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  const templateData: TemplateData = { ...defaultTemplateData, ...data } as TemplateData;
  const { styles, headline, subheadline, ctaButtonText } = templateData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !userId) return;
    const { error } = await supabase.from("leads_captured").insert({
      project_id: projectId,
      user_id: userId,
      data: formData,
    });
    if (!error) navigate(`/p/${slug}/obrigado`);
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 text-center" style={{ fontFamily: styles.fontFamily }}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-black mb-6">{headline}</h1>
        <p className="text-xl opacity-80 mb-12">{subheadline}</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input className="bg-white/10 text-white" placeholder="Nome" onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          <Input className="bg-white/10 text-white" type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <Button type="submit" className="w-full py-6" style={{ backgroundColor: styles.primaryColor }}>{ctaButtonText}</Button>
        </form>
      </div>
    </div>
  );
};

export default EventTemplate;