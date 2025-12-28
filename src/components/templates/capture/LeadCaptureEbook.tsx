import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LeadCaptureEbookProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const LeadCaptureEbook: React.FC<LeadCaptureEbookProps> = ({
  data,
  projectName,
  projectId,
  userId,
  slug,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Preencha Nome e E‑mail para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        project_id: projectId,
        user_id: userId,
        name,
        email,
        whatsapp,
        source_slug: slug,
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível salvar seu cadastro. Tente novamente.");
        return;
      }

      toast.success("Cadastro realizado com sucesso! Confira seu e‑mail.");
      // Se quiser, aqui dá para redirecionar para a página de vendas do funil
      // window.location.href = `/p/${slug}?step=sales`;
    } catch (err) {
      console.error("Erro inesperado ao salvar lead:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Lado esquerdo: texto + formulário */}
        <div className="flex-1">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
            {data.badge || "100% GRATUITO"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {data.headline || projectName}
          </h1>

          <p className="text-muted-foreground mb-6">
            {data.subheadline ||
              "A solução perfeita para quem busca resultados reais e duradouros."}
          </p>

          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li>{data.benefit1 || "Conteúdo direto ao ponto para aplicar hoje mesmo."}</li>
            <li>{data.benefit2 || "Modelos prontos para acelerar seus resultados."}</li>
            <li>{data.benefit3 || "Checklist exclusivo para você não esquecer nada."}</li>
          </ul>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Digite seu melhor e‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="WhatsApp (opcional)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enviando..."
                : data.buttonLabel || "BAIXAR EBOOK GRÁTIS"}
            </Button>
          </form>

          <p className="mt-3 text-xs text-muted-foreground">
            {data.privacyText ||
              "Sem spam. Cancele quando quiser. Seus dados estão seguros."}
          </p>
        </div>

        {/* Lado direito: mock da capa do ebook */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-48 md:h-64 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl shadow-xl flex items-center justify-center text-white font-bold text-xl text-center px-4">
            {data.ebook_cover_text || "E‑BOOK\nProduto Físico 2"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureEbook;
