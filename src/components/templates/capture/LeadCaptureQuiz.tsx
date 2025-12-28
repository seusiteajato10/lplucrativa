import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LeadCaptureQuiz({ data }: any) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const questions = [
    {
      id: 1,
      question: data?.question1 || "Qual e seu maior desafio atualmente?",
      options: [
        "Falta de tempo",
        "Falta de conhecimento",
        "Falta de motivacao",
        "Falta de recursos"
      ]
    },
    {
      id: 2,
      question: data?.question2 || "Qual resultado voce mais deseja alcancar?",
      options: [
        "Aumentar minha renda",
        "Ter mais tempo livre",
        "Desenvolver novas habilidades",
        "Conquistar independencia"
      ]
    },
    {
      id: 3,
      question: data?.question3 || "Em quanto tempo deseja ver resultados?",
      options: [
        "Ate 30 dias",
        "Ate 90 dias",
        "Ate 6 meses",
        "Ate 1 ano"
      ]
    }
  ];

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (questionId < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quiz completo:", { answers, name, email });
  };

  const progressPercent = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-sm font-bold">QUIZ PERSONALIZADO</span>
              <span className="text-white text-sm font-bold">{step}/4</span>
            </div>
            <div className="bg-white/30 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-8 md:p-12">
            
            {step <= 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Pergunta {step} de 3
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    {questions[step - 1].question}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {questions[step - 1].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(questions[step - 1].id, option)}
                      className="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-teal-500 group-hover:bg-teal-500 flex items-center justify-center mr-4 transition-all duration-200">
                          <span className="text-gray-400 group-hover:text-white font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="text-lg text-gray-700 group-hover:text-gray-900 font-medium">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-block bg-green-100 rounded-full p-3 mb-4">
                    <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-3">
                    Perfeito! Estamos preparando seu resultado...
                  </h2>
                  <p className="text-lg text-gray-600">
                    Baseado nas suas respostas, criamos um plano personalizado para voce
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-4 text-center uppercase tracking-wide font-semibold">
                    Receba seu resultado personalizado:
                  </p>
                  
                  <ul className="text-left space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-3 text-xl">✓</span>
                      <span className="text-gray-800">Analise detalhada do seu perfil</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-3 text-xl">✓</span>
                      <span className="text-gray-800">Plano de acao personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-3 text-xl">✓</span>
                      <span className="text-gray-800">Bonus: Guia exclusivo em PDF</span>
                    </li>
                  </ul>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 text-lg border-2 border-gray-300 focus:border-teal-500"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-lg border-2 border-gray-300 focus:border-teal-500"
                      required
                    />
                    <Button 
                      type="submit"
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      VER MEU RESULTADO AGORA
                    </Button>
                  </form>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Seus dados estao protegidos. Sem spam.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
