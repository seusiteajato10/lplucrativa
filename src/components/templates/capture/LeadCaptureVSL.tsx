import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LeadCaptureVSLProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const LeadCaptureVSL: React.FC<LeadCaptureVSLProps> = ({
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
      // opcional: redirecionar para a VSL de vendas
      // window.location.href = `/p/${slug}?step=sales`;
    } catch (err) {
      console.error("Erro inesperado ao salvar lead:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const videoUrl = data.videoUrl || data.vslUrl;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-6xl bg-card rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-8">
        {/* Coluna esquerda: VSL */}
        <div className="space-y-4">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {data.badge || "AULA GRATUITA • VAGAS LIMITADAS"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            {data.headline || projectName}
          </h1>

          <p className="text-muted-foreground">
            {data.subheadline ||
              "Assista à apresentação completa e descubra como aplicar essa estratégia ainda hoje."}
          </p>

          <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="w-full h-full"
                title={data.videoTitle || "VSL"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Vídeo da VSL não configurado.
              </div>
            )}
          </div>
        </div>

        {/* Coluna direita: formulário */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {data.formTitle || "Inscreva‑se para assistir:"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.formSubtitle ||
                "Informe seus dados para liberar o acesso imediato à aula completa."}
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
                : data.buttonLabel || "QUERO LIBERAR MEU ACESSO"}
            </Button>
          </form>

          <p className="mt-2 text-xs text-muted-foreground">
            {data.privacyText ||
              "Sem spam. Você pode sair da lista quando quiser. Seus dados estão protegidos."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureVSL;
