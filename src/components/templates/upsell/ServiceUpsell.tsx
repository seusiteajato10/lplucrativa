import React from "react";

type ServiceUpsellProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ServiceUpsell: React.FC<ServiceUpsellProps> = ({
  data,
  projectName,
}) => {
  const handleAccept = () => {
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-800">
        
        {/* HEADER */}
        <div className="px-8 py-10 text-center border-b border-neutral-800">
          <span className="inline-block mb-4 text-xs tracking-widest uppercase bg-emerald-600 text-white px-4 py-1 rounded-full">
            {data.badge || "Upgrade Opcional Recomendado"}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            {data.headline1 || "Tenha acompanhamento próximo"}
            <br className="hidden md:block" />
            {data.headline2 || "para acelerar seus resultados"}
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto">
            {data.subheadline || "Clientes que ativam este plano resolvem problemas mais rápido, evitam erros comuns e avançam com mais segurança."}
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="grid md:grid-cols-2 gap-10 px-8 py-12">
          {/* BENEFÍCIOS */}
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {data.benefitsTitle || "O que muda ao ativar o plano avançado:"}
            </h2>

            <ul className="space-y-4">
              {[
                data.benefit1 || "Prioridade total no suporte (menos espera, respostas diretas)",
                data.benefit2 || "Sessão mensal estratégica para destravar gargalos",
                data.benefit3 || "Acesso direto a um especialista dedicado",
                data.benefit4 || "Análise personalizada do seu cenário",
                data.benefit5 || "Orientações práticas, sem respostas genéricas",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-200">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-400">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {data.guaranteeText || "Sem contrato longo • Cancele quando quiser"}
            </div>
          </div>

          {/* DECISÃO */}
          <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col justify-between">
            <div className="text-center mb-6">
              <p className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
                {data.priceLabel || "Investimento adicional"}
              </p>

              <div className="flex justify-center items-end gap-3 mb-2">
                <span className="text-lg text-neutral-500 line-through">
                  R$ {data.originalPrice || "297"}
                </span>
                <span className="text-5xl font-extrabold text-white">
                  R$ {data.upsellPrice || "97"}
                </span>
              </div>

              <p className="text-sm text-neutral-400">
                {data.priceNote || "por mês • valor exclusivo nesta etapa"}
              </p>
            </div>

            <button
              onClick={handleAccept}
              className="h-16 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-all mb-4 w-full"
            >
              {data.ctaText || "Sim, quero acompanhamento prioritário"}
            </button>

            <button
              onClick={handleDecline}
              className="text-sm text-neutral-400 hover:text-neutral-200 underline w-full text-center"
            >
              {data.declineText || "Não, seguir sem o plano avançado"}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {data.timerText || "Oferta disponível apenas agora"}
            </div>
          </div>
        </div>

        {/* RISCO ZERO */}
        <div className="bg-neutral-900 px-8 py-6 text-center border-t border-neutral-800">
          <p className="text-sm text-neutral-400">
            {data.riskFreeText || "Se não perceber valor nos primeiros 30 dias, você pode cancelar sem qualquer penalidade."}
          </p>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-neutral-900/50 backdrop-blur border-t border-neutral-800 py-6 px-4 mt-8">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={data.privacyUrl || "#"} className="hover:text-neutral-200 transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-neutral-200 transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-neutral-200 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceUpsell;
