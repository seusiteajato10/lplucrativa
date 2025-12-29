import React from "react";

type ProductUpsellProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ProductUpsell: React.FC<ProductUpsellProps> = ({
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
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-neutral-900 text-white text-center px-8 py-10">
          <span className="inline-block text-xs tracking-widest uppercase bg-emerald-500 text-white px-4 py-1 rounded-full mb-4">
            {data.badge || "Oferta Única Antes de Finalizar"}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            {data.headline || "Leve também este complemento essencial"}
            <br className="hidden md:block" />
            {data.headline2 || "por um valor exclusivo"}
          </h1>

          <p className="text-neutral-300 max-w-2xl mx-auto">
            {data.subheadline || "Essa oferta aparece apenas agora e não estará disponível depois."}
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
          {/* PRODUTO */}
          <div>
            <div className="bg-neutral-100 rounded-2xl flex items-center justify-center h-72 mb-6">
              <span className="text-7xl">{data.productEmoji || "📦"}</span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              {data.productName || "Produto Complementar Premium"}
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-6">
              {data.description ||
                "Este item foi desenvolvido para potencializar sua compra principal, entregando mais praticidade, eficiência e resultado no dia a dia."}
            </p>

            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {data.shippingText || "Envio rápido"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {data.guaranteeText || "Garantia total"}
              </div>
            </div>
          </div>

          {/* DECISÃO */}
          <div className="flex flex-col justify-between">
            {/* BENEFÍCIOS */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-6">
              <p className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-4">
                {data.benefitsTitle || "Você recebe agora:"}
              </p>

              <ul className="space-y-3">
                {[
                  data.benefit1 || "Produto complementar de alta durabilidade",
                  data.benefit2 || "Compatibilidade total com sua compra",
                  data.benefit3 || "Mais conforto, eficiência e economia",
                  data.benefit4 || "Garantia estendida sem custo adicional",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PREÇO */}
            <div className="text-center mb-6">
              <div className="flex justify-center items-end gap-4 mb-2">
                <span className="text-xl text-neutral-400 line-through">
                  R$ {data.originalPrice || "197,00"}
                </span>
                <span className="text-5xl font-extrabold text-neutral-900">
                  R$ {data.upsellPrice || "97,00"}
                </span>
              </div>

              <p className="text-sm text-neutral-500">
                {data.priceNote || "Valor exclusivo válido apenas nesta etapa"}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleAccept}
              className="h-16 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-all mb-4 w-full"
            >
              {data.ctaText || "Sim, adicionar ao meu pedido"}
            </button>

            <button
              onClick={handleDecline}
              className="text-sm text-neutral-400 hover:text-neutral-600 underline w-full text-center"
            >
              {data.declineText || "Não, seguir sem este item"}
            </button>

            {/* RISCO ZERO */}
            <p className="text-xs text-neutral-500 text-center mt-6">
              {data.guaranteeText || "Compra protegida • Garantia de satisfação ou seu dinheiro de volta"}
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4 mt-8">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={data.privacyUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-neutral-900 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductUpsell;
