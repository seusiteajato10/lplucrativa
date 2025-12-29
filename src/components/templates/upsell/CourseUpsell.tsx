import React from "react";

type CourseUpsellProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const CourseUpsell: React.FC<CourseUpsellProps> = ({
  data,
  projectName,
}) => {
  const handleAcceptUpsell = () => {
    const upsellUrl = data.upsellUrl || data.checkoutUrl || "#";
    if (upsellUrl !== "#") {
      window.location.href = upsellUrl;
    }
  };

  const handleDecline = () => {
    const declineUrl = data.declineUrl || "/thank-you";
    window.location.href = declineUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
              {data.badge || "UPGRADE PARA VERSÃO COMPLETA"}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {data.headline || "Desbloqueie o Curso Completo Agora"}
            </h1>
            <p className="text-2xl text-purple-200 mb-2">
              {data.subheadline || "+ 50 Módulos Extras por Apenas"} <span className="text-yellow-400 font-black">{data.discount || "70% OFF"}</span>
            </p>
            <p className="text-lg text-purple-300">
              {data.urgencyText || "Esta oferta só aparece uma vez e expira em 10 minutos"}
            </p>
          </div>

          {/* Offer Section */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Pricing Block */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-2xl p-6 text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl line-through opacity-60">R$ {data.originalPrice || "1.997"}</span>
                  <span className="text-6xl font-black">R$ {data.upsellPrice || "597"}</span>
                </div>
                <p className="font-bold">{data.paymentText || "Pagamento único • Acesso vitalício"}</p>
              </div>

              <button 
                onClick={handleAcceptUpsell}
                className="w-full h-16 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-2xl mb-4 transition-all"
              >
                <svg className="w-6 h-6 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {data.ctaText || "ACESSAR CURSO COMPLETO AGORA"}
              </button>

              <button 
                onClick={handleDecline}
                className="w-full text-gray-400 hover:text-white text-sm underline mb-6 transition-colors"
              >
                {data.declineText || "Não, continuar apenas com módulos básicos"}
              </button>

              {/* Timer */}
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-center">
                <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">{data.timerText || "Oferta expira em 10:00 minutos"}</span>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-7 h-7 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l3 3a2 2 0 010 2.828l-6.586 6.586a2 2 0 01-2.828 0l-3-3a2 2 0 010-2.828L7 7z" />
                </svg>
                {data.benefitsTitle || "O Que Você Ganha no Upgrade:"}
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: "📚",
                    title: data.upgradeModule1 || "+50 Módulos Avançados",
                    desc: data.upgradeDesc1 || "Conteúdo premium que não está na versão básica"
                  },
                  {
                    icon: "🎥",
                    title: data.upgradeModule2 || "+40 Horas de Video-aulas",
                    desc: data.upgradeDesc2 || "Aulas práticas e detalhadas passo a passo"
                  },
                  {
                    icon: "🎖️",
                    title: data.upgradeModule3 || "Certificado de Conclusão",
                    desc: data.upgradeDesc3 || "Reconhecido no mercado"
                  },
                  {
                    icon: "💼",
                    title: data.upgradeModule4 || "Projetos Práticos",
                    desc: data.upgradeDesc4 || "10+ projetos reais para seu portfólio"
                  },
                  {
                    icon: "🛡️️",
                    title: data.upgradeModule5 || "Suporte Prioritário",
                    desc: data.upgradeDesc5 || "Tire dúvidas direto com instrutores"
                  },
                  {
                    icon: "🔄",
                    title: data.upgradeModule6 || "Atualizações Vitalícias",
                    desc: data.upgradeDesc6 || "Receba todo conteúdo novo grátis"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-4 flex items-start space-x-4 hover:bg-white/10 transition-all">
                    <div className="text-2xl mt-1 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bonus */}
              <div className="bg-yellow-500/20 border border-yellow-400 rounded-xl p-4 mt-6">
                <p className="font-bold text-yellow-300 text-center">
                  {data.bonusText || "🎁 BÔNUS: Grupo VIP + Mentorias Mensais (Valor: R$ 497)"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white/10 backdrop-blur border-t border-white/20 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/70">
            <a href={data.privacyUrl || "#"} className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseUpsell;
