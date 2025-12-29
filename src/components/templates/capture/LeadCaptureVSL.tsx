import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim() || null,
        source_slug: slug,
        offer_type: "vsl",
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível salvar seu cadastro. Tente novamente.");
        return;
      }

      toast.success("Cadastro realizado com sucesso! Confira seu e‑mail.");
      setName("");
      setEmail("");
      setWhatsapp("");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6 md:p-10 grid md:grid-cols-2 gap-10">
        {/* Coluna esquerda: VSL */}
        <div className="space-y-4">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {data.badge || "AULA GRATUITA • VAGAS LIMITADAS"}
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {data.headline || projectName}
          </h1>

          <p className="text-muted-foreground text-lg mb-6">
            {data.subheadline ||
              "Assista à apresentação completa e descubra como aplicar essa estratégia ainda hoje."}
          </p>

          <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center shadow-lg">
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

        {/* Coluna direita: Formulário */}
        <div className="space-y-4 flex flex-col justify-start">
          <h2 className="text-2xl font-semibold mb-3">
            {data.formTitle || "Inscreva-se para assistir:"}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {data.formSubtitle ||
              "Informe seus dados para liberar o acesso imediato à aula completa."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
            <input
              type="email"
              placeholder="Digite seu melhor e‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              inputMode="email"
              className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
            <input
              type="tel"
              placeholder="WhatsApp (opcional)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              inputMode="tel"
              className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />

            <button
              type="submit"
              className="w-full h-12 inline-flex items-center justify-center rounded-lg text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : data.buttonLabel || "QUERO LIBERAR MEU ACESSO"}
            </button>
          </form>

          <p className="mt-2 text-xs text-muted-foreground text-center">
            {data.privacyText ||
              "🔒 Seus dados estão seguros. Você pode cancelar sua inscrição a qualquer momento."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureVSL;
