import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type CourseTemplateProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const CourseTemplate: React.FC<CourseTemplateProps> = ({
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
        offer_type: "course",
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

  const primaryColor = styles.primaryColor || "#10b981";

  return (
    <div
      className="min-h-screen bg-neutral-50 text-neutral-900"
      style={{ fontFamily: styles.fontFamily || "system-ui, sans-serif" }}
    >
      {/* HERO */}
      <section className="bg-neutral-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 text-xs tracking-widest uppercase bg-emerald-500 text-white px-4 py-1 rounded-full">
              {data.badge || "Curso Online"}
            </span>

            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
              style={{ color: primaryColor }}
            >
              {headline || "Aprenda a dominar uma habilidade lucrativa do zero"}
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              {subheadline ||
                "Um método prático, passo a passo, para você sair da teoria e aplicar com confiança, mesmo começando agora."}
            </p>

            <ul className="space-y-4">
              {[
                data.feature1 || "Método validado e direto ao ponto",
                data.feature2 || "Conteúdo prático, sem enrolação",
                data.feature3 || "Acesso imediato e vitalício",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM */}
          <div className="bg-white text-neutral-900 rounded-3xl shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <h2 className="text-2xl font-bold">
                {data.formTitle || "Acesso imediato ao conteúdo"}
              </h2>
            </div>

            <p className="text-neutral-600 mb-6">
              {data.formSubtitle || "Preencha seus dados abaixo para liberar o acesso agora."}
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
                  : ctaButtonText || "Quero garantir meu acesso"
                }
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {data.privacyText || "Seus dados estão 100% seguros"}
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO DE CONFIANÇA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            {data.trustHeadline || "Este curso é para você que:"}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              data.trustFeature1 || "Quer aprender de forma prática",
              data.trustFeature2 || "Não quer perder tempo com teoria inútil",
              data.trustFeature3 || "Busca resultado real e aplicável",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-neutral-50 border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={data.privacyUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseTemplate;
