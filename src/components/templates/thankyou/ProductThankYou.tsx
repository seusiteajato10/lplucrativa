import React from "react";

type ProductThankYouProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ProductThankYou: React.FC<ProductThankYouProps> = ({
  data,
  projectName,
}) => {
  const handleAccessMemberArea = () => {
    const memberAreaUrl = data.memberAreaUrl || data.accessUrl || "#";
    if (memberAreaUrl !== "#") {
      window.open(memberAreaUrl, "_blank");
    }
  };

  const handleDownloadMaterials = () => {
    const materialsUrl = data.materialsUrl || data.downloadUrl || "#";
    if (materialsUrl !== "#") {
      window.open(materialsUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header - Confirmation */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {data.headline || "Parabéns! Sua Compra Foi Confirmada"}
            </h1>
            <p className="text-xl text-green-100">
              Pedido #{data.orderId || "12345"} processado com sucesso
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Email Confirmation */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Enviamos um e-mail de confirmação</h3>
                  <p className="text-blue-700 text-sm">
                    Verifique sua caixa de entrada em <strong>{data.email || "seu@email.com"}</strong>
                    <br />
                    (Se não encontrar, verifique a pasta de spam)
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Pedido Confirmado</h3>
                <p className="text-sm text-gray-600">Seu pagamento foi aprovado</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Acesso Liberado</h3>
                <p className="text-sm text-gray-600">Já pode acessar o produto</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Suporte Disponível</h3>
                <p className="text-sm text-gray-600">Estamos aqui para ajudar</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                Próximos Passos:
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Verifique seu e-mail</h3>
                    <p className="text-gray-600 text-sm">
                      Enviamos todas as informações de acesso e login
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Acesse a área de membros</h3>
                    <p className="text-gray-600 text-sm">
                      Clique no botão abaixo para acessar agora mesmo
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Comece agora</h3>
                    <p className="text-gray-600 text-sm">
                      Aproveite todo o conteúdo disponível
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="space-y-4">
              <button 
                onClick={handleAccessMemberArea}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg transition-all"
              >
                ACESSAR ÁREA DE MEMBROS AGORA
              </button>

              <button 
                onClick={handleDownloadMaterials}
                className="w-full h-14 text-lg font-bold border-2 border-input bg-white hover:bg-gray-50 rounded-xl transition-colors"
              >
                BAIXAR MATERIAIS COMPLEMENTARES
              </button>
            </div>

            {/* Support Information */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm mb-4">
                Precisa de ajuda? Entre em contato conosco
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <a href={`mailto:${data.supportEmail || "suporte@email.com"}`} className="text-blue-600 hover:underline">
                  {data.supportEmail || "suporte@email.com"}
                </a>
                <a href={data.whatsappUrl || "https://wa.me/5511999999999"} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                  WhatsApp
                </a>
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

export default ProductThankYou;
