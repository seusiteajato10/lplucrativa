import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim() || null,
        source_slug: slug,
        offer_type: "ebook",
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
    } catch (err) {
      console.error("Erro inesperado ao salvar lead:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Lado esquerdo: texto + formulário */}
        <div className="flex-1">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
            {data.badge || "100% GRATUITO"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {data.headline || projectName}
          </h1>

          <p className="text-muted-foreground mb-6 text-lg text-center">
            {data.subheadline ||
              "Descubra estratégias que realmente funcionam para alcançar resultados duradouros."}
          </p>

          <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc pl-5">
            <li>{data.benefit1 || "Conteúdo prático e fácil de aplicar."}</li>
            <li>{data.benefit2 || "Modelos e guias prontos para você."}</li>
            <li>{data.benefit3 || "Acesso exclusivo a recursos valiosos."}</li>
          </ul>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="Digite seu melhor e‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              inputMode="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="tel"
              placeholder="WhatsApp (opcional)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              inputMode="tel"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : data.buttonLabel || "BAIXAR EBOOK GRÁTIS"}
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            {data.privacyText ||
              "Sem spam. Cancele quando quiser. Seus dados estão seguros."}
          </p>
        </div>

        {/* Lado direito: mock da capa do ebook */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xs md:max-w-sm h-64 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl shadow-xl flex items-center justify-center text-white font-bold text-xl text-center p-6">
            {data.ebook_cover_text || "E‑BOOK GRÁTIS: Como Transformar Seu Negócio!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureEbook;
