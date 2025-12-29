import React from "react";

type ProductTemplateClassicProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ProductTemplateClassic: React.FC<ProductTemplateClassicProps> = ({
  data,
  projectName,
}) => {
  const templateData = { ...data, styles: data.styles || {} };

  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const primaryColor = templateData.styles.primaryColor || "#059669";

  const handleBuy = () => {
    const checkoutUrl = templateData.checkoutUrl || "#";
    if (checkoutUrl !== "#") {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div
      className="min-h-screen bg-neutral-50 flex flex-col"
      style={{ fontFamily: templateData.styles.fontFamily || "system-ui, sans-serif" }}
    >
      <main className="flex-1">
        {/* BARRA DE URGÊNCIA */}
        {discount > 0 && (
          <div className="bg-red-600 text-white text-sm md:text-base py-3 text-center font-semibold">
            {templateData.topBarText || `🔥 ${discount}% OFF por tempo limitado • Frete Grátis para todo o Brasil`}
          </div>
        )}

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              {/* IMAGEM */}
              <div className="flex items-center justify-center">
                <img
                  src={
                    templateData.heroImageUrl ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"
                  }
                  alt={templateData.headline || projectName}
                  className="w-full max-w-md object-contain"
                />
              </div>

              {/* COPY */}
              <div className="flex flex-col text-left">
                {/* TÍTULO */}
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  {templateData.headline || projectName}
                </h1>

                {/* SUBHEADLINE */}
                {templateData.subheadline && (
                  <p className="text-gray-600 text-lg mb-4">
                    {templateData.subheadline}
                  </p>
                )}

                {/* PROVA SOCIAL */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {templateData.ratingText || "4.9/5 • +3.200 clientes satisfeitos"}
                  </span>
                </div>

                {/* PREÇO */}
                <div className="mb-6">
                  {originalPrice > price && (
                    <div className="text-gray-500 line-through text-lg">
                      De R$ {originalPrice.toFixed(2)}
                    </div>
                  )}
                  <div
                    className="text-4xl md:text-5xl font-black mb-1"
                    style={{ color: primaryColor }}
                  >
                    R$ {price.toFixed(2)}
                  </div>
                  <p className="text-gray-600">
                    {templateData.installmentsText || `ou 12x de <strong>R$ ${(price / 12).toFixed(2)}</strong> sem juros`}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={handleBuy}
                  className="w-full py-8 text-xl font-black rounded-lg mb-4 hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                  style={{ 
                    backgroundColor: primaryColor,
                    color: "white",
                    border: "none"
                  }}
                >
                  {templateData.ctaButtonText || "COMPRAR AGORA"}
                </button>

                {/* SEGURANÇA */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {templateData.securityText1 || "Pagamento seguro"}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {templateData.shippingText || "Frete grátis"}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {templateData.paymentText || "Até 12x sem juros"}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15.072l3.385 1.808c.596.318 1.307.1 1.517-.596.39-1.133-.5-2.096-1.648-2.354l-3.34-.94a2 2 0 00-1.992 0l-3.208.956c-1.146.342-2.042 1.222-1.652 2.354.21.696.921 1.014 1.517.596L12 15.072z" />
                    </svg>
                    {templateData.guaranteeText || "Garantia oficial"}
                  </div>
                </div>

                {/* BENEFÍCIOS */}
                <div className="space-y-3 border-t pt-6">
                  {[
                    templateData.productBenefit1 || "Alta durabilidade e qualidade premium",
                    templateData.productBenefit2 || "Design funcional para uso diário",
                    templateData.productBenefit3 || "Resultados rápidos e perceptíveis",
                    templateData.productBenefit4 || "Compatível com todos os perfis",
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTIA */}
        {templateData.guaranteeText && (
          <section className="max-w-4xl mx-auto px-4 pb-16">
            <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center shadow-sm">
              <svg className="w-12 h-12 mx-auto text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">
                {templateData.guaranteeTitle || "Garantia Total"}
              </h2>
              <p className="text-gray-600">
                {templateData.guaranteeText}
              </p>
            </div>
          </section>
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {templateData.brandName || projectName}. {templateData.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={templateData.privacyUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={templateData.termsUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={templateData.contactUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductTemplateClassic;
