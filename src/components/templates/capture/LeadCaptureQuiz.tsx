import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Perguntas do quiz
  const questions = (data.questions || []).length ? data.questions : [
    {
      id: "q1",
      question: "Qual é o seu nível atual?",
      options: [
        { label: "Estou começando do zero", value: "iniciante", emoji: "🌱" },
        { label: "Já tenho alguma experiência", value: "intermediario", emoji: "📈" },
        { label: "Sou avançado e quero otimizar", value: "avancado", emoji: "🚀" },
      ],
    },
    {
      id: "q2",
      question: "Qual é o seu maior desafio agora?",
      options: [
        { label: "Gerar mais leads qualificados", value: "leads", emoji: "🎯" },
        { label: "Aumentar conversão em vendas", value: "vendas", emoji: "💰" },
        { label: "Organizar minha estratégia", value: "organizacao", emoji: "📊" },
      ],
    },
    {
      id: "q3",
      question: "Quanto tempo você dedica por semana?",
      options: [
        { label: "Menos de 5 horas", value: "pouco", emoji: "⏰" },
        { label: "Entre 5 e 15 horas", value: "medio", emoji: "⏳" },
        { label: "Mais de 15 horas", value: "muito", emoji: "🔥" },
      ],
    },
  ];

  const totalSteps = questions.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps - 1);
      }
    }, 300);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Preencha Nome e E‑mail para ver seu resultado.");
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
        quiz_answers: answers,
        source_slug: slug,
        offer_type: "quiz",
      });

      if (error) {
        console.error("Erro ao salvar lead:", error);
        toast.error("Não foi possível salvar. Tente novamente.");
        return;
      }

      toast.success("Resultado pronto! Confira seu e‑mail em instantes.");
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-muted-foreground mt-2">
            {currentStep < questions.length
              ? `Pergunta ${currentStep + 1} de ${questions.length}`
              : "Última etapa"}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {currentStep < questions.length ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-block px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  {data.badge || "QUIZ INTERATIVO"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {questions[currentStep].question}
                </h2>
              </div>

              <div className="space-y-3">
                {questions[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswerSelect(questions[currentStep].id, opt.value)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                      answers[questions[currentStep].id] === opt.value
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {opt.emoji && <span className="text-3xl">{opt.emoji}</span>}
                      <span className="text-base font-medium text-foreground flex-1">
                        {opt.label}
                      </span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[questions[currentStep].id] === opt.value
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300"
                      }`}>
                        {answers[questions[currentStep].id] === opt.value && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={goBack}
                  className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  ← Voltar para pergunta anterior
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl mb-2">
                  ✨
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {data.headline || "Seu resultado personalizado está pronto!"}
                </h2>
                <p className="text-muted-foreground">
                  {data.subheadline ||
                    "Informe seus dados para receber a análise completa com recomendações específicas para o seu perfil."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Nome completo</label>
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    inputMode="email"
                    className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">WhatsApp (opcional)</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    inputMode="tel"
                    className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 inline-flex items-center justify-center rounded-xl text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : data.buttonLabel || "VER MEU RESULTADO AGORA →"}
                </button>

                <p className="text-xs text-center text-muted-foreground px-4">
                  {data.privacyText ||
                    "🔒 Seus dados estão seguros. Resultado enviado por e-mail em até 2 minutos."}
                </p>
              </form>

              <button
                onClick={goBack}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                ← Revisar minhas respostas
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Gratuito</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Resultado em 2min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span>Personalizado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureQuiz;
