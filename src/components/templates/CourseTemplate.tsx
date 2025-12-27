import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface CourseTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

const CourseTemplate = ({ data, projectName, projectId, userId, slug }: CourseTemplateProps) => {
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
    <div className="min-h-screen bg-indigo-50 py-20 text-center" style={{ fontFamily: styles.fontFamily }}>
      <div className="container mx-auto px-4">
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

export default CourseTemplate;