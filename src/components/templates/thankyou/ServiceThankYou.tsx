import React from "react";

type ServiceThankYouProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ServiceThankYou: React.FC<ServiceThankYouProps> = ({
  data,
  projectName,
}) => {
  const handleCall = () => {
    const phone = data.phoneRaw || data.phone || "";
    if (!phone) return;
    window.location.href = `tel:${phone.replace(/\D/g, "")}`;
  };

  const handleWhatsApp = () => {
    const waLink = data.whatsappUrl || "https://wa.me/5511999999999";
    window.open(waLink, "_blank");
  };

  const handleGoHome = () => {
    const homeUrl = data.homeUrl || "/";
    window.location.href = homeUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {data.headline || "Solicitação Recebida Com Sucesso!"}
            </h1>
            <p className="text-xl text-blue-100">
              {data.subheadline || "Em breve entraremos em contato para agendar"}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Solicitação Confirmada */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Recebemos Sua Solicitação</h3>
                  <p className="text-green-700 text-sm">
                    Protocolo: <strong>#{data.protocolId || "SRV-2024-001"}</strong>
                    <br />
                    Nossa equipe entrará em contato em até <strong>{data.responseTime || "24 horas"}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Dados do Cliente e Serviço */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Seus Dados
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600"><strong>Nome:</strong> {data.name || "Cliente"}</p>
                  <p className="text-gray-600"><strong>E-mail:</strong> {data.email || "cliente@email.com"}</p>
                  <p className="text-gray-600"><strong>Telefone:</strong> {data.phone || "(11) 99999-9999"}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Serviço Solicitado
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600"><strong>Serviço:</strong> {data.serviceName || "Consultoria Premium"}</p>
                  <p className="text-gray-600"><strong>Data:</strong> {data.date || "A combinar"}</p>
                  <p className="text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-bold">Aguardando Contato</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                O Que Acontece Agora:
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Análise da Solicitação",
                    text: "Nossa equipe vai analisar seu pedido e preparar uma proposta personalizada.",
                  },
                  {
                    step: 2,
                    title: "Contato Inicial",
                    text: "Entraremos em contato por e-mail ou telefone em até 24 horas.",
                  },
                  {
                    step: 3,
                    title: "Agendamento",
                    text: "Vamos agendar uma data e horário conveniente para você.",
                  },
                  {
                    step: 4,
                    title: "Início do Serviço",
                    text: "Começaremos o trabalho conforme combinado.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contato Urgente */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Urgência?</h3>
                  <p className="text-yellow-800 text-sm mb-3">
                    Se seu caso é urgente, entre em contato direto conosco:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleCall}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-yellow-600 text-yellow-700 bg-white hover:bg-yellow-50 h-9 px-3 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h1.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.518.76a11.042 11.042 0 005.017 5.017l.76-1.518a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 19.72V21a2 2 0 01-2 2h-1C9.163 23 3 16.837 3 9V5z" />
                      </svg>
                      Ligar Agora
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 h-9 px-3 transition-colors"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmação de E-mail */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Enviamos uma cópia desta confirmação para seu e-mail
              </p>
              <button
                onClick={handleGoHome}
                className="inline-flex items-center justify-center rounded-xl text-sm font-medium border-2 border-input bg-white hover:bg-gray-50 h-10 px-5 transition-colors"
              >
                Voltar para a Página Inicial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.brandName || projectName}.{" "}
            {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a
              href={data.privacyUrl || "#"}
              className="hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </a>
            <span>•</span>
            <a
              href={data.termsUrl || "#"}
              className="hover:text-foreground transition-colors"
            >
              Termos de Uso
            </a>
            <span>•</span>
            <a
              href={data.contactUrl || "#"}
              className="hover:text-foreground transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceThankYou;
