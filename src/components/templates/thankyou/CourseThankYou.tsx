import React from "react";

type CourseThankYouProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const CourseThankYou: React.FC<CourseThankYouProps> = ({
  data,
  projectName,
}) => {
  const handleAccessPlatform = () => {
    const platformUrl = data.platformUrl || data.accessUrl || "#";
    if (platformUrl !== "#") {
      window.open(platformUrl, "_blank");
    }
  };

  const handleJoinCommunity = () => {
    const communityUrl = data.communityUrl || data.groupUrl || "#";
    if (communityUrl !== "#") {
      window.open(communityUrl, "_blank");
    }
  };

  const handleDownloadMaterials = () => {
    const materialsUrl = data.materialsUrl || "#";
    if (materialsUrl !== "#") {
      window.open(materialsUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <svg className="w-16 h-16 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {data.headline || "Parabéns, Sua Inscrição Foi Confirmada!"}
            </h1>
            <p className="text-xl text-indigo-100">
              {data.subheadline || "Seu acesso ao curso foi liberado com sucesso. Agora, é só aproveitar!"}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Access Confirmation */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Acesso Liberado!</h3>
                  <p className="text-green-700 text-sm">
                    Enviamos um e-mail para <strong>{data.email || "seu@email.com"}</strong> com seus dados de login.
                    Agora você pode acessar a plataforma e começar a aprender!
                  </p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  {data.modulesCount || "12"}
                </div>
                <p className="text-sm text-gray-600">Módulos</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  {data.videosCount || "87"}
                </div>
                <p className="text-sm text-gray-600">Videoaulas</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  {data.hoursCount || "24h"}
                </div>
                <p className="text-sm text-gray-600">De Conteúdo</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  {data.studentsCount || "1.2k"}
                </div>
                <p className="text-sm text-gray-600">Alunos Inscritos</p>
              </div>
            </div>

            {/* Getting Started Steps */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
                Como Começar Sua Jornada:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Faça login na plataforma</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Use o e-mail e a senha que enviamos para você.
                    </p>
                    <button 
                      onClick={handleAccessPlatform}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Acessar Plataforma Agora
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Assista à Aula de Boas-vindas</h3>
                    <p className="text-gray-600 text-sm">
                      Entenda como o curso funciona e como aproveitar ao máximo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Baixe os Materiais de Apoio</h3>
                    <p className="text-gray-600 text-sm">
                      PDFs, planilhas e recursos extras estão disponíveis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Entre na Comunidade</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Conecte-se com outros alunos e tire suas dúvidas.
                    </p>
                    <button 
                      onClick={handleJoinCommunity}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-green-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Entrar no Grupo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border-2 border-blue-200">
                <svg className="w-10 h-10 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Material Completo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  PDFs, planilhas e templates
                </p>
                <button 
                  onClick={handleDownloadMaterials}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-blue-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                >
                  Baixar Tudo
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border-2 border-purple-200">
                <svg className="w-10 h-10 text-purple-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Certificado</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete e receba seu certificado
                </p>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-purple-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors">
                  Ver Detalhes
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-200">
                <svg className="w-10 h-10 text-green-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Suporte Dedicado</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tire suas dúvidas com o time
                </p>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-green-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors">
                  Falar com Suporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href={data.privacyUrl || "#"} className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-foreground transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseThankYou;
