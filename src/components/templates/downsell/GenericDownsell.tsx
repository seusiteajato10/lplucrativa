import React from "react";

type GenericDownsellProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const GenericDownsell: React.FC<GenericDownsellProps> = ({
  data,
  projectName,
}) => {
  const handleAccept = () => {
    // Redirecionar para checkout com o preço downsell
    const checkoutUrl = data.checkoutUrl || data.downsellCheckoutUrl || "#";
    if (checkoutUrl !== "#") {
      window.location.href = checkoutUrl;
    }
  };

  const handleDecline = () => {
    // Redirecionar para página de saída ou home
    const exitUrl = data.exitUrl || "/";
    window.location.href = exitUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 px-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {data.headline || "Espere! Temos Uma Proposta Melhor"}
            </h1>
            <p className="text-xl text-blue-100">
              {data.subheadline || "Que tal começar com uma versão mais acessível?"}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">

            {/* Special Offer Message */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8 text-center">
              <p className="text-yellow-800 font-bold text-lg">
                {data.specialMessage || "Sabemos que o investimento pode ser um obstáculo. Por isso, preparamos uma oferta incrível!"}
              </p>
            </div>

            {/* Price Comparison */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              {/* Previous Offer */}
              <div className="bg-gray-50 rounded-2xl p-6 opacity-60">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">Oferta Anterior</p>
                  <p className="text-4xl font-extrabold text-gray-600 line-through">
                    R$ {data.originalPrice || "497"}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>{data.originalFeature1 || "Produto/Serviço Completo"}</li>
                  <li>{data.originalFeature2 || "Todos os Bônus"}</li>
                  <li>{data.originalFeature3 || "Suporte Premium"}</li>
                </ul>
              </div>

              {/* Special Downsell Offer */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-500">
                <div className="text-center mb-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                    {data.badge || "OFERTA ESPECIAL"}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-5xl font-extrabold text-blue-600">
                      R$ {data.downsellPrice || "197"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{data.discount || "70% de desconto"}</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{data.feature1 || "Versão Essencial do Produto"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{data.feature2 || "Conteúdo Principal"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{data.feature3 || "Suporte Básico"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{data.feature4 || "Garantia de 30 Dias"}</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <button 
                onClick={handleAccept}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg transition-all duration-200"
              >
                {data.ctaText || "SIM! ACEITO ESTA OFERTA ESPECIAL"}
              </button>

              <button 
                onClick={handleDecline}
                className="w-full text-gray-500 hover:text-gray-700 text-sm underline transition-colors"
              >
                {data.declineText || "Não, quero pensar melhor"}
              </button>
            </div>

            {/* Urgency Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <p className="text-center text-gray-700">
                <strong className="text-blue-600">Importante:</strong> {data.urgencyText || "Esta é a sua última chance de garantir este desconto exclusivo. Após sair desta página, esta oferta não estará mais disponível."}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-2">
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

export default GenericDownsell;
