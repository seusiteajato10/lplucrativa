import React from "react";

type EventUpsellProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const EventUpsell: React.FC<EventUpsellProps> = ({
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
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 px-8 text-center">
              <div className="inline-block bg-white text-orange-600 px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                {data.badge || "UPGRADE EXCLUSIVO"}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
                {data.headline || "Aproveite: Ingresso VIP Com 60% OFF"}
              </h1>
              <p className="text-xl text-orange-100 mb-2">
                {data.subheadline || "Acesso total + benefícios exclusivos por tempo limitado"}
              </p>
            </div>

            <div className="p-8 md:p-12">
              {/* Ticket Comparison */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6">
                    {data.compareTitle || "Compare os Ingressos:"}
                  </h2>

                  {/* Basic Ticket */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-bold text-gray-700 mb-2">
                        {data.basicTitle || "✓ Ingresso Básico (Seu Atual)"}
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {data.basicFeature1 || "Acesso ao evento online"}</li>
                        <li>• {data.basicFeature2 || "Material em PDF"}</li>
                      </ul>
                    </div>

                    {/* VIP Ticket */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-400">
                      <p className="font-bold text-orange-600 mb-2 flex items-center">
                        <span className="text-2xl mr-2">🎁</span>
                        {data.vipTitle || "Ingresso VIP (UPGRADE)"}
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature1 || "Acesso ao evento online + gravação"}
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature2 || "Material completo + bônus (R$ 497)"}
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature3 || "Certificado de participação"}
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature4 || "Sessão Q&A privada com especialistas"}
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature5 || "Grupo VIP no WhatsApp"}
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {data.vipFeature6 || "Networking exclusivo"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex flex-col justify-center">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">{data.vipNormalLabel || "Valor Normal do VIP"}</p>
                    <p className="text-3xl text-gray-400 line-through mb-3">R$ {data.vipNormalPrice || "997"}</p>
                    <p className="text-sm text-gray-600 mb-2">{data.vipSpecialLabel || "Apenas para você AGORA:"}</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-gray-600">+ R$</span>
                      <span className="text-6xl font-extrabold text-orange-600">{data.upsellPrice || "397"}</span>
                    </div>
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full inline-block text-sm font-bold">
                      {data.savingsText || "Economia de R$ 600"}
                    </div>
                  </div>

                  <button 
                    onClick={handleAcceptUpsell}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl shadow-lg mb-4 transition-all"
                  >
                    {data.ctaText || "SIM! FAZER UPGRADE PARA VIP"}
                  </button>

                  <button 
                    onClick={handleDecline}
                    className="w-full text-gray-500 hover:text-gray-700 text-sm underline mb-4 transition-colors"
                  >
                    {data.declineText || "Não, continuar com ingresso básico"}
                  </button>

                  {/* Countdown and Social Proof */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{data.timerText || "Oferta expira em 15 minutos"}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="text-xl">👥</span>
                      <span>{data.socialProof1 || "234 upgrades hoje"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xl">📹</span>
                      <span>{data.socialProof2 || "Vagas limitadas"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency Alert */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 text-center">
                <p className="text-yellow-800 font-bold text-lg">
                  {data.urgencyText || "⚡ ATENÇÃO: Esta é a ÚNICA oportunidade de fazer upgrade com este desconto!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white/20 backdrop-blur border-t border-white/30 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2">
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

export default EventUpsell;
