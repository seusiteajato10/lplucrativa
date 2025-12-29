import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type EventTemplateProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const EventTemplate: React.FC<EventTemplateProps> = ({
  data,
  projectName,
  projectId,
  userId,
  slug,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templateData = { ...data, styles: data.styles || {} };
  const { styles, headline, subheadline, ctaButtonText } = templateData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !userId || !formData.fullName.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads_captured").insert({
        project_id: projectId,
        user_id: userId,
        data: {
          ...formData,
          name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
        },
        source_slug: slug,
        offer_type: "event",
      });

      if (!error) {
        navigate(`/p/${slug}/obrigado`);
      } else {
        console.error("Erro ao salvar lead:", error);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryColor = styles.primaryColor || "#059669";

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white"
      style={{ fontFamily: styles.fontFamily || "system-ui, sans-serif" }}
    >
      {/* HERO */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* TEXTO */}
          <div>
            <span className="inline-block mb-4 text-xs tracking-widest uppercase bg-emerald-600 px-4 py-1 rounded-full">
              {data.badge || "Evento Exclusivo"}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              {headline || "Um evento para quem quer sair do comum e avançar de verdade"}
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              {subheadline ||
                "Uma experiência imersiva para aprender, se conectar e aplicar estratégias que fazem diferença na prática."}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-neutral-300 mb-10">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {data.eventDate || "Data definida"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.eventLocation || "Online ou Presencial"}
              </div>
            </div>

            <ul className="space-y-4">
              {[
                data.feature1 || "Conteúdo direto ao ponto, sem enrolação",
                data.feature2 || "Aprendizado prático e aplicável",
                data.feature3 || "Networking com pessoas do mesmo nível",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM */}
          <div className="bg-white text-neutral-900 rounded-3xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-2">
              {data.formTitle || "Garanta sua vaga agora"}
            </h2>

            <p className="text-neutral-600 mb-6">
              {data.formSubtitle || "Inscrição rápida e gratuita. As vagas são limitadas."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={data.namePlaceholder || "Seu nome"}
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder={data.emailPlaceholder || "Seu melhor e-mail"}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                inputMode="email"
                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: primaryColor,
                  color: "white",
                  border: "none"
                }}
              >
                {isSubmitting 
                  ? "Enviando..." 
                  : ctaButtonText || "Quero participar do evento"
                }
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {data.privacyText || "Seus dados estão seguros • Sem spam"}
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO DE CONTEXTO */}
      <section className="bg-neutral-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            {data.trustHeadline || "Este evento é para você que:"}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              data.trustFeature1 || "Quer aprender com quem vive o mercado",
              data.trustFeature2 || "Busca clareza e direcionamento",
              data.trustFeature3 || "Quer se conectar com pessoas certas",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:bg-neutral-700 transition-colors"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={data.privacyUrl || "#"} className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventTemplate;
