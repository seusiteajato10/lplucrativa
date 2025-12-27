import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  projectId: string;
  userId: string;
  ctaText: string;
  redirectConfig?: { enabled: boolean; targetPageId: string; delay?: number };
  fields?: Array<'name' | 'email' | 'phone'>;
  className?: string;
  horizontal?: boolean;
}

export const LeadForm = ({
  projectId,
  userId,
  ctaText,
  redirectConfig,
  fields = ['name', 'email'],
  className = "",
  horizontal = false
}: LeadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return toast.error("O email é obrigatório");

    setLoading(true);
    try {
      const { data: lead, error } = await supabase
        .from("leads_captured")
        .insert({
          project_id: projectId,
          user_id: userId,
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            source: "lead_capture_page",
          },
          source_url: window.location.href,
        })
        .select()
        .single();

      if (error) throw error;

      setSuccess(true);
      toast.success("Dados enviados com sucesso!");

      if (redirectConfig?.enabled && redirectConfig.targetPageId) {
        setTimeout(() => {
          window.location.href = `/p/${redirectConfig.targetPageId}?lead_id=${lead.id}&email=${encodeURIComponent(formData.email)}`;
        }, (redirectConfig.delay || 3) * 1000);
      }
    } catch (err: any) {
      toast.error("Erro ao enviar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success && !redirectConfig?.enabled) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-xl animate-fade-in border border-green-100">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-green-900">Tudo pronto!</h3>
        <p className="text-green-700 text-sm">Enviamos as informações para seu email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} ${horizontal ? 'flex flex-col md:flex-row gap-3' : 'space-y-4'}`}>
      {fields.includes('name') && (
        <div className="space-y-1 flex-1">
          {!horizontal && <Label className="text-xs">Nome Completo</Label>}
          <Input 
            placeholder="Seu nome" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12"
          />
        </div>
      )}
      {fields.includes('email') && (
        <div className="space-y-1 flex-1">
          {!horizontal && <Label className="text-xs">Melhor Email</Label>}
          <Input 
            type="email"
            placeholder="seu@email.com" 
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            className="h-12"
          />
        </div>
      )}
      {fields.includes('phone') && (
        <div className="space-y-1 flex-1">
          {!horizontal && <Label className="text-xs">WhatsApp</Label>}
          <Input 
            placeholder="(00) 00000-0000" 
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="h-12"
          />
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={loading || success} 
        className={`h-12 px-8 font-bold ${horizontal ? 'md:mt-0' : 'w-full'}`}
        variant="accent"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : ctaText}
      </Button>
    </form>
  );
};