import React, { useState } from "react";
import Footer from "@/components/layout/Footer";

type ProductTemplateProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  data,
  projectName,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const templateData = { ...data, styles: data.styles || {} };
  const name = templateData.headline || projectName || "Produto Premium";
  const description =
    templateData.aboutText ||
    "Um produto desenvolvido para entregar mais eficiência, conforto e resultado no seu dia a dia.";

  const price = Number(templateData.price) || 0;
  const originalPrice = Number(templateData.originalPrice) || 0;
  const stock = templateData.stock || 32;

  const images =
    templateData.productImages?.length > 0
      ? templateData.productImages
      : [templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"];

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
      className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col"
      style={{ fontFamily: templateData.styles.fontFamily || "system-ui, sans-serif" }}
    >
      {/* TOP BAR */}
      {discount > 0 && (
        <div className="bg-neutral-900 text-white text-center py-3 text-sm font-semibold">
          {discount}% OFF • {templateData.topBarText1 || "Frete grátis"} • {templateData.topBarText2 || `Últimas ${stock} unidades disponíveis`}
        </div>
      )}

      {/* HERO */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-start">
          {/* IMAGENS */}
          <div>
            <div className="bg-white rounded-2xl border shadow-sm mb-4 overflow-hidden">
              <img
                src={images?.[selectedImage] || "/placeholder-product.jpg"}
                alt={name}
                className="w-full aspect-square object-contain p-4"
              />
            </div>

            {images && images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl border-2 transition-all ${
                      selectedImage === i
                        ? "border-neutral-900 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${i}`}
                      className="aspect-square object-cover w-full h-full rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              {name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold">{templateData.rating || "4.9"}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700`}>
                {templateData.badgeText || "Mais vendido"}
              </span>
            </div>

            {/* BENEFÍCIOS */}
            <ul className="space-y-3 mb-6">
              {[
                templateData.benefit1 || "Design funcional e alta durabilidade",
                templateData.benefit2 || "Resultados perceptíveis desde o primeiro uso",
                templateData.benefit3 || "Compatível com a maioria dos perfis",
                templateData.benefit4 || "Desenvolvido para uso diário",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* PREÇO */}
            <div className="mb-6">
              {originalPrice > price && (
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg line-through text-neutral-400">
                    R$ {originalPrice.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    -{discount}%
                  </span>
                </div>
              )}

              <p
                className="text-5xl font-black mb-1"
                style={{ color: primaryColor }}
              >
                R$ {price.toFixed(2)}
              </p>

              <p className="text-sm text-neutral-600">
                {templateData.installmentsText || `ou 12x de R$ ${(price / 12).toFixed(2)} sem juros`}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleBuy}
              className="w-full h-16 text-lg font-bold rounded-xl shadow-lg mb-4 transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ 
                backgroundColor: primaryColor,
                color: "white",
                border: "none"
              }}
            >
              {templateData.ctaButtonText || "Comprar agora"}
            </button>

            {/* MICRO PROVAS */}
            <div className="grid grid-cols-3 gap-4 text-sm text-neutral-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {templateData.shippingText || "Frete grátis"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {templateData.securityText || "Compra segura"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {templateData.paymentText || "Parcele sem juros"}
              </div>
            </div>

            <p className="text-neutral-700 text-sm mt-8 leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* GARANTIA */}
        <section className="bg-white border-t py-12 px-4 text-center">
          <svg className="w-12 h-12 mx-auto text-emerald-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">
            {templateData.guaranteeTitle || "Garantia Total de Satisfação"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {templateData.guaranteeText || "Experimente o produto por até 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."}
          </p>
        </section>
      </main>

      {/* RODAPÉ */}
      <Footer templateData={templateData} />
    </div>
  );
};

export default ProductTemplate;