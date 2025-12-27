import { useState } from "react";
import { LeadForm } from "@/components/leads/LeadForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface LeadCaptureQuizProps {
  data: any;
  projectId: string;
  userId: string;
}

const LeadCaptureQuiz = ({ data, projectId, userId }: LeadCaptureQuizProps) => {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const config = templateData.leadCapture;
  const [step, setStep] = useState(0); // 0: Intro, 1..n: Questions, n+1: Form
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalSteps = config.questions.length + 2; // Intro + Questions + Form
  const progress = (step / (totalSteps - 1)) * 100;

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4" style={{ fontFamily: templateData.styles.fontFamily }}>
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-indigo-100">
        
        {/* Progress Bar (only during questions) */}
        {step > 0 && step <= config.questions.length && (
          <div className="p-6 pb-0">
            <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        <div className="p-8 md:p-12">
          
          {/* STEP 0: Intro */}
          {step === 0 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">{config.quizTitle}</h1>
              <p className="text-slate-600 text-lg">{config.subheadline}</p>
              <Button size="xl" className="w-full h-16 text-lg font-bold rounded-2xl shadow-lg" onClick={nextStep}>
                COMEÇAR QUIZ AGORA
              </Button>
            </div>
          )}

          {/* STEPS 1..N: Questions */}
          {step > 0 && step <= config.questions.length && (
            <div className="space-y-8 animate-slide-in">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">
                {config.questions[step-1].question}
              </h2>
              <div className="grid gap-4">
                {config.questions[step-1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAnswers({ ...answers, [step-1]: i });
                      nextStep();
                    }}
                    className="flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group"
                  >
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                    <span className="text-lg font-bold text-slate-700">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FINAL STEP: Form */}
          {step > config.questions.length && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                {config.resultHeadline}
              </h2>
              <p className="text-slate-600">
                Digite seu email para receber sua recomendação personalizada baseada nas suas respostas.
              </p>
              
              <LeadForm 
                projectId={projectId}
                userId={userId}
                ctaText="VER MEU RESULTADO"
                redirectConfig={templateData.redirectAfterCapture}
                fields={['name', 'email']}
                className="bg-slate-50 p-6 rounded-3xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureQuiz;