import React, { useState } from "react";

type ProductLandingProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

export default function ProductLandingUltimate({
  data,
  projectName,
}: ProductLandingProps) {
  const templateData = { ...data, styles: data.styles || {} };

  const images =
    templateData.productImages?.length > 0
      ? templateData.productImages
      : [
          templateData.heroImageUrl ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
        ];

  const price = Number(templateData.price) || 0;
  const originalPrice = Number(templateData.originalPrice) || 0;

  const [activeImage, setActiveImage] = useState(0);

  const handleCheckout = () => {
    const checkoutUrl = templateData.checkoutUrl || "#";
    if (checkoutUrl !== "#") {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col text-neutral-900"
      style={{ fontFamily: templateData.styles.fontFamily || "system-ui, sans-serif" }}
    >
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* IMAGENS */}
          <div>
            <div className="aspect-square rounded-3xl bg-neutral-50 border overflow-hidden">
              <img
                src={images[activeImage]}
                className="w-full h-full object-contain"
                alt="Produto"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl border-2 transition-all ${
                      activeImage === i
                        ? "border-black"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt="Miniatura"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COPY */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              {templateData.headline || projectName}
            </h1>

            <p className="text-lg text-neutral-700 mb-6">
              {templateData.subheadline ||
                "O produto físico premium que resolve um problema real, com qualidade superior e garantia total."}
            </p>

            {/* PROVA SOCIAL */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold">
                {templateData.ratingText || "4.9 • Mais de 4.000 clientes satisfeitos"}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ml-2 bg-green-100 text-green-700`}>
                {templateData.badgeText || "Bestseller"}
              </span>
            </div>

            {/* OFERTA */}
            <div className="bg-neutral-50 rounded-3xl p-6 border mb-8">
              {originalPrice > price && (
                <div className="text-neutral-400 line-through text-lg">
                  De R$ {originalPrice.toFixed(2)}
                </div>
              )}
              <div className="text-4xl font-black mb-1" style={{ color: templateData.styles.primaryColor || "#059669" }}>
                R$ {price.toFixed(2)}
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {templateData.installmentsText || `ou 12x de <strong>R$ ${(price / 12).toFixed(2)}</strong> sem juros`}
              </p>

              <button
                onClick={handleCheckout}
                className="w-full h-16 text-lg font-black rounded-2xl bg-green-600 hover:bg-green-700 transition-all shadow-lg"
                style={{ color: "white", border: "none" }}
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.6 10H18v-10L16 13m0 0l-1.6 10" />
                </svg>
                {templateData.ctaButtonText || "COMPRAR AGORA"}
              </button>

              <p className="text-xs text-center text-neutral-500 mt-3">
                {templateData.microcopy || "Compra segura • Garantia • Envio rápido"}
              </p>
            </div>

            {/* TRUST */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {templateData.trust1 || "Frete grátis"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {templateData.trust2 || "Pagamento protegido"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {templateData.trust3 || "Resultado imediato"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {templateData.trust4 || "Garantia total"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="bg-neutral-50 py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-neutral-800">
          <h2 className="text-3xl font-black text-center">
            {templateData.storyTitle || "A história por trás deste produto"}
          </h2>
          <p>{templateData.story1 || "Tudo começou quando percebemos que as soluções disponíveis no mercado eram caras, ineficientes ou simplesmente não funcionavam como prometido."}</p>
          <p>{templateData.story2 || "Após meses de testes, erros e melhorias, nasceu um produto simples, eficiente e durável — feito para quem exige resultado de verdade."}</p>
          <p>{templateData.story3 || "Hoje, milhares de pessoas utilizam este produto diariamente e relatam melhorias reais desde os primeiros dias de uso."}</p>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">{templateData.forWhoTitle || "Este produto é para você se:"}</h3>
            <ul className="space-y-3">
              <li>✔ {templateData.forWho1 || "Quer uma solução prática e eficaz"}</li>
              <li>✔ {templateData.forWho2 || "Valoriza qualidade e durabilidade"}</li>
              <li>✔ {templateData.forWho3 || "Não quer perder tempo com promessas vazias"}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">{templateData.notForTitle || "Não é para você se:"}</h3>
            <ul className="space-y-3 text-neutral-500">
              <li>✖ {templateData.notFor1 || "Procura o mais barato do mercado"}</li>
              <li>✖ {templateData.notFor2 || "Não pretende usar o produto corretamente"}</li>
              <li>✖ {templateData.notFor3 || "Não valoriza qualidade"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black mb-8 text-center">
            {templateData.faqTitle || "Perguntas Frequentes"}
          </h3>
          {[
            {
              q: templateData.faq1q || "Em quanto tempo recebo?",
              a: templateData.faq1a || "O envio é imediato após a confirmação do pagamento.",
            },
            {
              q: templateData.faq2q || "Tem garantia?",
              a: templateData.faq2a || "Sim. Garantia de 30 dias ou seu dinheiro de volta.",
            },
            {
              q: templateData.faq3q || "O pagamento é seguro?",
              a: templateData.faq3a || "Totalmente. Utilizamos plataformas de pagamento confiáveis.",
            },
          ].map((item, i) => (
            <div key={i} className="border-b py-4">
              <div className="flex justify-between items-center font-semibold">
                {item.q}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-neutral-600 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY CTA MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center md:hidden z-50 shadow-lg">
        <div>
          <div className="text-xs text-neutral-500">{templateData.stickyPriceLabel || "Por apenas"}</div>
          <div className="font-black text-lg">R$ {price.toFixed(2)}</div>
        </div>
        <button 
          onClick={handleCheckout} 
          className="h-12 px-6 font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all"
        >
          {templateData.stickyCta || "Comprar agora"}
        </button>
      </div>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {templateData.brandName || projectName}. {templateData.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 flex-wrap">
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
}
