import { Button } from "@/components/ui/button";
import { Check, BookOpen, PlayCircle, Award, Users } from "lucide-react";

export default function CourseThankYou({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <Check className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Bem-Vindo ao Curso! Vamos Comecar
            </h1>
            <p className="text-xl text-indigo-100">
              Seu acesso foi liberado com sucesso
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Acesso Liberado</h3>
                  <p className="text-green-700 text-sm">
                    Enviamos um e-mail com seu login e senha para <strong>{data?.email || "seu@email.com"}</strong>
                    <br />
                    Ja pode comecar a assistir as aulas agora mesmo!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">
                  {data?.modulesCount || "12"}
                </div>
                <p className="text-sm text-gray-600">Modulos</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">
                  {data?.videosCount || "87"}
                </div>
                <p className="text-sm text-gray-600">Video-aulas</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">
                  {data?.hoursCount || "24h"}
                </div>
                <p className="text-sm text-gray-600">De Conteudo</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">
                  {data?.studentsCount || "1.2k"}
                </div>
                <p className="text-sm text-gray-600">Alunos</p>
              </div>

            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                Comece Sua Jornada:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Faca login na plataforma</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Use o e-mail e senha que enviamos para voce
                    </p>
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Acessar Plataforma Agora
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Assista a aula de boas-vindas</h3>
                    <p className="text-gray-600 text-sm">
                      Entenda como funciona o curso e como aproveitar ao maximo
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Baixe os materiais de apoio</h3>
                    <p className="text-gray-600 text-sm">
                      PDFs, planilhas e recursos extras estao disponiveis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Entre na comunidade</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Conecte-se com outros alunos e tire duvidas
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-2 border-green-300"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Entrar no Grupo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border-2 border-blue-200">
                <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Material Completo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  PDFs, planilhas e templates
                </p>
                <Button variant="outline" size="sm">
                  Baixar Tudo
                </Button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border-2 border-purple-200">
                <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Certificado</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete e receba
                </p>
                <Button variant="outline" size="sm">
                  Ver Requisitos
                </Button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-200">
                <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Suporte</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tire suas duvidas
                </p>
                <Button variant="outline" size="sm">
                  Falar Conosco
                </Button>
              </div>

            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-center mb-8">
              <h3 className="font-bold text-yellow-900 mb-2">Dica de Ouro</h3>
              <p className="text-yellow-800 text-sm">
                Alunos que assistem as primeiras 3 aulas nas primeiras 24 horas tem <strong>3x mais chances</strong> de concluir o curso!
              </p>
            </div>

            <Button 
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl shadow-lg"
            >
              COMECAR AGORA
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
}
