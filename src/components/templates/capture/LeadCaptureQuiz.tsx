import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LeadCaptureQuizProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const LeadCaptureQuiz: React.FC<LeadCaptureQuizProps> = ({
  data,
  projectName,
  projectId,
  userId,
  slug,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Perguntas padrão, caso não venham do data
  const questions =
    (data.questions as Array<{
      id: string;
      question: string;
      options: { label: string; value: string }[];
    }>) ||
    [
      {
        id: "q1",
        question: "Qual é o seu nível atual em relação a este tema?",
        options: [
          { label: "Estou começando do zero", value: "iniciante" },
          { label: "Já tenho alguma experiência", value: "intermediario" },
          { label: "Sou avançado e quero otimizar", value: "avancado" },
        ],
      },
      {
        id: "q2",
        question: "Qual é o seu objetivo principal nos próximos 30 dias?",
        options: [
          { label: "Gerar mais leads", value: "leads" },
          { label: "Aumentar as vendas", value: "vendas" },
          { label: "Organizar minha estratégia", value: "organizacao" },
        ],
      },
    ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

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
        quiz_answers: answers,
        source_slug: slug,
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível salvar seu cadastro. Tente novamente.");
        return;
      }

      toast.success("Respostas enviadas! Em instantes você recebe o resultado.");
      // Se quiser, aqui pode redirecionar para a próxima etapa do funil
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
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-8">
        {/* Coluna esquerda: copy do quiz */}
        <div className="space-y-4">
          <p className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {data.badge || "QUIZ RÁPIDO • 1 MINUTO"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            {data.headline || `Descubra em qual nível você está em ${projectName}`}
          </h1>

          <p className="text-muted-foreground">
            {data.subheadline ||
              "Responda a algumas perguntas rápidas e receba um plano personalizado para os próximos passos."}
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              {data.benefit1 ||
                "Resultados imediatos com recomendações práticas para o seu momento atual."}
            </li>
            <li>
              {data.benefit2 ||
                "Conteúdo direcionado para evitar erros comuns e acelerar seus ganhos."}
            </li>
            <li>
              {data.benefit3 ||
                "Totalmente gratuito e pode ser respondido em menos de 60 segundos."}
            </li>
          </ul>
        </div>

        {/* Coluna direita: quiz + formulário */}
        <div className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="border border-border rounded-lg p-3"
                >
                  <p className="text-sm font-medium mb-2">{q.question}</p>
                  <div className="space-y-1">
                    {q.options.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={answers[q.id] === opt.value}
                          onChange={(e) =>
                            handleAnswerChange(q.id, e.target.value)
                          }
                          className="h-4 w-4"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
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
                className="w-full mt-1"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Enviando..."
                  : data.buttonLabel || "VER MEU RESULTADO AGORA"}
              </Button>

              <p className="mt-1 text-xs text-muted-foreground">
                {data.privacyText ||
                  "Suas respostas são confidenciais. Enviaremos o resultado no seu e‑mail e, se quiser, também no WhatsApp."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureQuiz;
