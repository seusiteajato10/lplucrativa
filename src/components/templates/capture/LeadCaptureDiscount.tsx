import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LeadCaptureDiscountProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const LeadCaptureDiscount: React.FC<LeadCaptureDiscountProps> = ({
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
      toast.error("Preencha Nome e E‑mail para garantir o desconto.");
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
        offer_type: "discount",
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível registrar seu desconto. Tente novamente.");
        return;
      }

      toast.success("Desconto garantido! Verifique seu e‑mail para os detalhes.");
      // opcional: redirecionar direto para página de vendas com cupom aplicado
      // window.location.href = `/p/${slug}?step=sales`;
    } catch (err) {
      console.error("Erro inesperado ao salvar lead:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const discountBadge = data.discountBadge || "DESCONTO ESPECIAL POR TEMPO LIMITADO";
  const discountValue = data.discountValue || "30% OFF";
  const deadlineText =
    data.deadlineText || "Válido somente para os cadastrados de hoje.";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-8">
        {/* Coluna esquerda: oferta de desconto */}
        <div className="space-y-4">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-500">
            {discountBadge}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            {data.headline || `Garanta ${discountValue} em ${projectName}`}
          </h1>

          <p className="text-muted-foreground">
            {data.subheadline ||
              "Cadastre‑se para receber seu cupom exclusivo e aproveitar a condição mais vantajosa antes que acabe."}
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              {data.benefit1 ||
                "Cupom válido apenas para inscritos nesta página, não disponível em nenhum outro lugar."}
            </li>
            <li>
              {data.benefit2 ||
                "Use o desconto imediatamente ou guarde para quando estiver pronto para comprar."}
            </li>
            <li>
              {data.benefit3 ||
                "Avisaremos no seu e‑mail e, se quiser, também no WhatsApp antes do cupom expirar."}
            </li>
          </ul>

          <p className="text-sm font-medium text-red-500">{deadlineText}</p>
        </div>

        {/* Coluna direita: formulário */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {data.formTitle || "Preencha para receber seu cupom:"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.formSubtitle ||
                "Enviaremos o código de desconto diretamente para o seu e‑mail."}
            </p>
          </div>

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
                : data.buttonLabel || "QUERO GARANTIR MEU DESCONTO"}
            </Button>
          </form>

          <p className="mt-2 text-xs text-muted-foreground">
            {data.privacyText ||
              "Nada de spam. Utilizaremos seus dados apenas para enviar o cupom e comunicações relacionadas à oferta."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureDiscount;
