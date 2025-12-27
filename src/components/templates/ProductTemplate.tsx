import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Shield, Star, ChevronDown, Package } from 'lucide-react';
import { TemplateData, defaultTemplateData } from '@/types/templateData';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface ProductTemplateProps {
  data: Record<string, unknown>;
  projectName: string;
  projectId?: string;
  userId?: string;
  slug?: string;
}

function ProductTemplate({ data, projectName, projectId, userId, slug }: ProductTemplateProps) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
  });

  const templateData: TemplateData = { ...defaultTemplateData, ...data } as TemplateData;
  const { styles, formFields, ctaButtonText, headline, subheadline, videoUrl, useImageInsteadOfVideo, heroImageUrl } = templateData;
  const checkout = templateData.integrations?.checkout || { enabled: true, type: 'external' as const };

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
    if (error) { toast.error("Erro ao enviar."); return; }
    if (slug && templateData.thankYouPage.enabled) {
      navigate(`/p/${slug}/obrigado`);
    } else if (checkout.url) {
      window.location.href = checkout.url;
    }
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: styles.fontFamily }}>
      <header className="py-6 px-4 border-b text-center">
        <h1 className="text-2xl font-bold" style={{ color: styles.primaryColor }}>{projectName}</h1>
      </header>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">{headline}</h2>
          <p className="text-xl text-muted-foreground">{subheadline}</p>
        </div>
        
        {/* Lead Form Simple */}
        <div className="bg-card p-8 rounded-2xl border shadow-xl max-w-md mx-auto" id="lead-form">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Nome" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
            <Input type="email" placeholder="E-mail" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <Button type="submit" className="w-full py-6 text-lg" style={{ backgroundColor: styles.primaryColor }} disabled={isSubmitting}>
              {ctaButtonText}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProductTemplate;