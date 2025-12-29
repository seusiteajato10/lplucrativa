import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type LeadCaptureDiscountProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function sanitizePhoneBR(value: string) {
  const digits = (value || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.slice(0, 13);
}

function isValidEmail(value: string) {
  const v = (value || "").trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

const InlineCheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none">
    <path
      d="M16.25 5.5l-7.187 8.75L3.75 9.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InlineShieldIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    <path
      d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12.2l1.8 1.8 3.8-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InlineBoltIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    <path
      d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
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
    const discountValue = data.discountValue || "30% OFF";
    const badgeTop = data.discountBadge || "CONDIÇÃO EXCLUSIVA PARA INSCRITOS";
    const headline = data.headline || `Garanta ${discountValue} em ${projectName} (cupom no e‑mail)`;
    const subheadline = data.subheadline || "Cadastre-se em 20 segundos e receba o cupom agora. Sem pegadinhas: você decide quando usar.";
    const deadlineText = data.deadlineText || "Disponível hoje para novos inscritos (enquanto durar a condição).";
    const primaryCta = data.buttonLabel || "QUERO RECEBER MEU CUPOM";
    const formTitle = data.formTitle || "Receber cupom";
    const formSubtitle = data.formSubtitle || "Enviamos o código e as instruções diretamente para seu e‑mail.";
    const trustLine = data.trustLine || "Seus dados estão seguros. Nada de spam — você pode sair quando quiser.";
    const proofTitle = data.proofTitle || "Por que vale a pena se cadastrar?";
    const benefits = [
      data.benefit1 || "Cupom exclusivo desta página (não aparece em outro lugar).",
      data.benefit2 || "Aplicação simples: receba o código e use quando fizer sentido para você.",
      data.benefit3 || "Acesso antecipado a condições e bônus (quando existirem).",
    ];
    const testimonialTitle = data.testimonialTitle || "O que as pessoas dizem";
    const testimonials = Array.isArray(data.testimonials) && data.testimonials.length > 0
      ? data.testimonials
      : [
          { name: "Cliente verificado", role: "Compra com desconto", quote: "Foi rápido, chegou o cupom na hora e consegui fechar com uma condição melhor." },
          { name: "Cliente verificado", role: "Cupom no e‑mail", quote: "Página objetiva. Preenchi e já recebi o código com instruções bem claras." },
        ];
    const faqTitle = data.faqTitle || "Dúvidas rápidas";
    const faqs = Array.isArray(data.faqs) && data.faqs.length > 0
      ? data.faqs
      : [
          { q: "Quanto tempo demora para chegar o cupom?", a: "Normalmente chega em poucos minutos. Se não achar, verifique Spam/Promoções." },
          { q: "Preciso colocar WhatsApp?", a: "Não. É opcional. Serve apenas se você quiser receber um lembrete ou suporte rápido." },
          { q: "Posso cancelar o recebimento?", a: "Sim. Você pode pedir remoção a qualquer momento." },
        ];
    const brandName = data.brandName || projectName;
    const logoUrl = data.logoUrl || "";
    const heroImageUrl = data.heroImageUrl || "";
    const ctaSecondaryLabel = data.ctaSecondaryLabel || "Ir para a página de vendas";
    const ctaSecondaryHref = data.ctaSecondaryHref || `/p/${slug}?step=sales`;

    return {
      discountValue, badgeTop, headline, subheadline, deadlineText, primaryCta,
      formTitle, formSubtitle, trustLine, proofTitle, benefits, testimonialTitle,
      testimonials, faqTitle, faqs, brandName, logoUrl, heroImageUrl,
      ctaSecondaryLabel, ctaSecondaryHref,
      privacyText: data.privacyText || "Ao enviar, você concorda em receber o cupom e comunicações relacionadas à oferta. Sem spam.",
    };
  }, [data, projectName, slug]);

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!isValidEmail(email)) return false;
    return true;
  }, [name, email]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (company.trim()) {
      toast.error("Não foi possível enviar. Atualize a página e tente novamente.");
      return;
    }

    const finalName = name.trim();
    const finalEmail = email.trim().toLowerCase();
    const finalWhatsapp = sanitizePhoneBR(whatsapp);

    if (!finalName) {
      toast.error("Digite seu nome para receber o cupom.");
      firstFieldRef.current?.focus();
      return;
    }

    if (!isValidEmail(finalEmail)) {
      toast.error("Digite um e‑mail válido para receber o cupom.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        project_id: projectId,
        user_id: userId,
        name: finalName,
        email: finalEmail,
        whatsapp: finalWhatsapp || null,
        source_slug: slug,
        offer_type: "discount",
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível registrar. Tente novamente em instantes.");
        return;
      }

      setIsSuccess(true);
      toast.success("Tudo certo! Cupom enviado para seu e‑mail.");
    } catch (err) {
      console.error("Erro inesperado ao salvar lead:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
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
              <img src={cfg.logoUrl} alt={cfg.brandName} className="h-8 w-auto" loading="eager" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <InlineBoltIcon className="h-5 w-5" />
              </div>
            )}
            <div className="leading-tight">
              <div className="text-sm font-semibold">{cfg.brandName}</div>
              <div className="text-xs text-muted-foreground">Cupom exclusivo</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <InlineShieldIcon className="h-4 w-4 text-primary" />
            <span>{cfg.trustLine}</span>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-12 md:gap-10">
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
                  <div className="mt-1 text-xs text-muted-foreground">
                    Menos fricção. Mais clareza. Um único objetivo: você receber seu cupom.
                  </div>
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

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground md:hidden">
                <InlineShieldIcon className="h-4 w-4 text-primary" />
                <span>{cfg.trustLine}</span>
              </div>
            </div>

            {cfg.heroImageUrl ? (
              <div className="mt-6 overflow-hidden rounded-2xl border bg-card">
                <img src={cfg.heroImageUrl} alt="" className="h-56 w-full object-cover md:h-64" loading="lazy" />
              </div>
            ) : null}
          </section>

          <aside className="md:col-span-5">
            <div className="sticky top-6">
              <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
                {!isSuccess ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">{cfg.formTitle}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{cfg.formSubtitle}</p>
                      </div>
                      <div className="hidden sm:block rounded-xl bg-primary/10 px-3 py-2 text-center">
                        <div className="text-[11px] font-semibold text-primary">HOJE</div>
                        <div className="text-base font-bold">{cfg.discountValue}</div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                      <div className="hidden">
                        <label>
                          Company
                          <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="off" />
                        </label>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">Nome</div>
                        <input
                          ref={firstFieldRef}
                          type="text"
                          placeholder="Seu nome"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">E‑mail</div>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          inputMode="email"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <div className="text-[11px] text-muted-foreground">Enviaremos o cupom para este e‑mail.</div>
                      </div>

                      <div className="pt-1">
                        {!showWhatsapp ? (
                          <button
                            type="button"
                            onClick={() => setShowWhatsapp(true)}
                            className="text-xs font-semibold text-primary underline underline-offset-4"
                          >
                            + Adicionar WhatsApp (opcional) para lembrete
                          </button>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-medium text-muted-foreground">WhatsApp (opcional)</div>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowWhatsapp(false);
                                  setWhatsapp("");
                                }}
                                className="text-xs text-muted-foreground underline underline-offset-4"
                              >
                                remover
                              </button>
                            </div>
                            <input
                              type="tel"
                              placeholder="DDD + número (somente dígitos)"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(sanitizePhoneBR(e.target.value))}
                              autoComplete="tel"
                              inputMode="tel"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <div className="text-[11px] text-muted-foreground">
                              Usaremos apenas para lembrete ou suporte sobre o cupom.
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className={cn(
                          "mt-2 w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
                          canSubmit ? "opacity-100" : "opacity-90"
                        )}
                        disabled={isSubmitting || !canSubmit}
                      >
                        {isSubmitting ? "Enviando..." : cfg.primaryCta}
                      </button>

                      <div className="mt-2 rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <InlineShieldIcon className="h-4 w-4 text-primary" />
                          <span>{cfg.privacyText}</span>
                        </div>
                      </div>
                    </form>

                    <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
                      <div className="rounded-xl border bg-background px-2 py-2">Envio rápido</div>
                      <div className="rounded-xl border bg-background px-2 py-2">Sem spam</div>
                      <div className="rounded-xl border bg-background px-2 py-2">Dados seguros</div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-primary/10 p-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          <InlineCheckIcon className="h-6 w-6" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-primary">Cupom enviado com sucesso</div>
                          <div className="text-xs text-muted-foreground">Verifique sua caixa de entrada (e Spam/Promoções).</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Quer adiantar? Você pode ir para a página de vendas agora.
                    </div>

                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      onClick={() => { window.location.href = cfg.ctaSecondaryHref; }}
                    >
                      {cfg.ctaSecondaryLabel}
                    </button>

                    <button
                      type="button"
                      className="w-full text-xs text-muted-foreground underline underline-offset-4"
                      onClick={() => {
                        setIsSuccess(false);
                        setName("");
                        setEmail("");
                        setWhatsapp("");
                        setShowWhatsapp(false);
                        setCompany("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setTimeout(() => firstFieldRef.current?.focus(), 200);
                      }}
                    >
                      Enviar para outro e‑mail
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-2xl border bg-card p-5 md:p-6">
                <div className="text-sm font-semibold">{cfg.testimonialTitle}</div>
                <div className="mt-3 space-y-3">
                  {cfg.testimonials.slice(0, 2).map((t: any, idx: number) => (
                    <div key={idx} className="rounded-xl bg-muted/30 p-3">
                      <div className="text-sm text-foreground/90">"{t.quote}"</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {t.name}
                        {t.role ? ` • ${t.role}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>

        <section className="mt-10 md:mt-12">
          <div className="rounded-2xl border bg-card p-5 md:p-8">
            <div className="text-lg font-bold">{cfg.faqTitle}</div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {cfg.faqs.slice(0, 6).map((f: any, idx: number) => (
                <div key={idx} className="rounded-2xl bg-muted/30 p-4">
                  <div className="text-sm font-semibold">{f.q}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-10 pb-6 text-center text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {cfg.brandName}. {data.footerNote || "Todos os direitos reservados."}
          </div>
          <div className="mt-2">
            {data.footerLinksNote || "Dica: adicione links de Política de Privacidade e Termos no seu rodapé."}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LeadCaptureDiscount;

