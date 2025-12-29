import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Metadados para a Galeria
export const templateMeta = {
  id: 'capture_discount',
  name: 'Captura com Cupom',
  description: 'Página de alta conversão com oferta de desconto e cronômetro de urgência.',
  thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
  category: 'captura'
};

type LeadCaptureDiscountProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

// ... (Restante do código original do componente permanece igual)
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const InlineCheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none">
    <path d="M16.25 5.5l-7.187 8.75L3.75 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InlineShieldIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9.5 12.2l1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InlineBoltIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

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
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [company, setCompany] = useState("");

  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 150);
    return () => window.clearTimeout(t);
  }, []);

  const cfg = useMemo(() => {
    const discountValue = data?.discountValue || "30% OFF";
    const badgeTop = data?.discountBadge || "CONDIÇÃO EXCLUSIVA PARA INSCRITOS";
    const headline = data?.headline || `Garanta ${discountValue} em ${projectName} (cupom no e‑mail)`;
    const subheadline = data?.subheadline || "Cadastre-se em 20 segundos e receba o cupom agora. Sem pegadinhas: você decide quando usar.";
    const deadlineText = data?.deadlineText || "Disponível hoje para novos inscritos (enquanto durar a condição).";
    const primaryCta = data?.buttonLabel || "QUERO RECEBER MEU CUPOM";
    const formTitle = data?.formTitle || "Receber cupom";
    const formSubtitle = data?.formSubtitle || "Enviamos o código e as instruções diretamente para seu e‑mail.";
    const trustLine = data?.trustLine || "Seus dados estão seguros. Nada de spam — você pode sair quando quiser.";
    const proofTitle = data?.proofTitle || "Por que vale a pena se cadastrar?";
    const benefits = [
      data?.benefit1 || "Cupom exclusivo desta página (não aparece em outro lugar).",
      data?.benefit2 || "Aplicação simples: receba o código e use quando fizer sentido para você.",
      data?.benefit3 || "Acesso antecipado a condições e bônus (quando existirem).",
    ];
    const testimonialTitle = data?.testimonialTitle || "O que as pessoas dizem";
    const testimonials = Array.isArray(data?.testimonials) && data.testimonials.length > 0
      ? data.testimonials
      : [
          { name: "Cliente verificado", role: "Compra com desconto", quote: "Foi rápido, chegou o cupom na hora e consegui fechar com uma condição melhor." },
          { name: "Cliente verificado", role: "Cupom no e‑mail", quote: "Página objetiva. Preenchi e já recebi o código com instruções bem claras." },
        ];
    const faqTitle = data?.faqTitle || "Dúvidas rápidas";
    const faqs = Array.isArray(data?.faqs) && data.faqs.length > 0
      ? data.faqs
      : [
          { q: "Quanto tempo demora para chegar o cupom?", a: "Normalmente chega em poucos minutos. Se não achar, verifique Spam/Promoções." },
          { q: "Preciso colocar WhatsApp?", a: "Não. É opcional. Serve apenas se você quiser receber um lembrete ou suporte rápido." },
          { q: "Posso cancelar o recebimento?", a: "Sim. Você pode pedir remoção a qualquer momento." },
        ];
    const brandName = data?.brandName || projectName;
    const logoUrl = data?.logoUrl || "";
    const heroImageUrl = data?.heroImageUrl || "";
    const ctaSecondaryLabel = data?.ctaSecondaryLabel || "Ir para a página de vendas";
    const ctaSecondaryHref = data?.ctaSecondaryHref || `/p/${slug}?step=sales`;

    return {
      discountValue, badgeTop, headline, subheadline, deadlineText, primaryCta,
      formTitle, formSubtitle, trustLine, proofTitle, benefits, testimonialTitle,
      testimonials, faqTitle, faqs, brandName, logoUrl, heroImageUrl,
      ctaSecondaryLabel, ctaSecondaryHref,
      privacyText: data?.privacyText || "Ao enviar, você concorda em receber o cupom e comunicações relacionadas à oferta. Sem spam.",
    };
  }, [data, projectName, slug]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error("Preencha os campos obrigatórios corretamente.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        project_id: projectId,
        user_id: userId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.replace(/\D/g, "") || null,
        source_slug: slug,
        offer_type: "discount",
      });
      if (error) throw error;
      setIsSuccess(true);
      toast.success("Cupom enviado!");
    } catch (err) {
      toast.error("Erro ao salvar cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="h-[420px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        <header className="flex items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-3">
            {cfg.logoUrl ? (
              <img src={cfg.logoUrl} alt={cfg.brandName} className="h-8 w-auto" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <InlineBoltIcon className="h-5 w-5" />
              </div>
            )}
            <div className="leading-tight text-left">
              <div className="text-sm font-semibold">{cfg.brandName}</div>
              <div className="text-xs text-muted-foreground">Cupom exclusivo</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <InlineShieldIcon className="h-4 w-4 text-primary" />
            <span>{cfg.trustLine}</span>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-12 md:gap-10 text-left">
          <section className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold">
              <span className="text-primary">{cfg.badgeTop}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{cfg.deadlineText}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{cfg.headline}</h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{cfg.subheadline}</p>

            <div className="mt-6 rounded-2xl border bg-card p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{cfg.proofTitle}</div>
                </div>
                <div className="shrink-0 rounded-xl bg-primary/10 px-3 py-2 text-center">
                  <div className="text-[11px] font-semibold text-primary">SEU DESCONTO</div>
                  <div className="text-lg font-bold">{cfg.discountValue}</div>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {cfg.benefits.map((b: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <InlineCheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="md:col-span-5">
            <div className="sticky top-6">
              <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold">{cfg.formTitle}</h2>
                    <p className="text-sm text-muted-foreground">{cfg.formSubtitle}</p>
                    <div className="space-y-2">
                      <input
                        ref={firstFieldRef}
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      />
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-bold h-12 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? "Enviando..." : cfg.primaryCta}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <InlineCheckIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Cupom enviado!</h3>
                    <p className="text-sm text-muted-foreground">Verifique seu e‑mail agora mesmo.</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default LeadCaptureDiscount;