import React, { useState } from "react";

type ProductTemplateModernProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const ProductTemplateModern: React.FC<ProductTemplateModernProps> = ({ data, projectName }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const templateData = { ...data, styles: data.styles || {} };
  const images = templateData.productImages?.length > 0 ? templateData.productImages : [templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"];
  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const primaryColor = templateData.styles.primaryColor || "#059669";
  const handleBuy = () => { const checkoutUrl = templateData.checkoutUrl || "#"; if (checkoutUrl !== "#") window.location.href = checkoutUrl; };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: templateData.styles.fontFamily || "system-ui, sans-serif" }}>
      <main className="flex-1">
        {discount > 0 && (<div className="bg-black text-white text-center text-sm py-3 font-semibold">{templateData.topBarText || `⚡ ${discount}% OFF hoje • Frete Grátis para todo o Brasil`}</div>)}
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border"><img src={images[selectedImg]} alt={templateData.headline || projectName} className="w-full h-full object-contain" /></div>
              {images.length > 1 && (<div className="grid grid-cols-4 gap-3">{images.map((img: string, i: number) => (<button key={i} onClick={() => setSelectedImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImg === i ? "border-black shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}><img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" /></button>))}</div>)}
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{templateData.headline || projectName}</h1>
              {templateData.subheadline && (<p className="text-lg text-gray-600 mb-6">{templateData.subheadline}</p>)}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex">{[1,2,3,4,5].map(i=>(<svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>))}</div>
                <span className="text-sm text-gray-700 font-semibold">{templateData.ratingText || "4.9/5 • Mais de 3.000 clientes satisfeitos"}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ml-2 ${templateData.badgeClass || "bg-green-100 text-green-700"}`}>{templateData.badgeText || "Mais vendido"}</span>
              </div>
              <div className="bg-gray-50 rounded-3xl p-6 border mb-8">
                {originalPrice > price && (<div className="text-gray-400 line-through text-lg mb-1">De R$ {originalPrice.toFixed(2)}</div>)}
                <div className="text-4xl font-black mb-1" style={{color:primaryColor}}>R$ {price.toFixed(2)}</div>
                <p className="text-gray-600 text-sm">{templateData.installmentsText || `ou 12x de R$ ${(price/12).toFixed(2)} sem juros`}</p>
                <button onClick={handleBuy} className="w-full h-16 text-lg font-black rounded-2xl mt-6 hover:opacity-90 transition-all shadow-lg hover:shadow-xl" style={{backgroundColor:primaryColor,color:"white",border:"none"}}><svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.6 10H18v-10L16 13m0 0l-1.6 10"/></svg>{templateData.ctaButtonText||"COMPRAR AGORA"}</button>
                <p className="text-xs text-gray-500 text-center mt-3">{templateData.microcopy || "Compra segura • Garantia de satisfação • Entrega rápida"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-10">
                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>{templateData.benefit1||"Resultado imediato"}</div>
                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>{templateData.benefit2||"Frete grátis"}</div>
                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>{templateData.benefit3||"Pagamento protegido"}</div>
                <div className="flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>{templateData.benefit4||"Garantia oficial"}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-neutral-200 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <p className="text-sm text-neutral-600">© {new Date().getFullYear()} {templateData.brandName || projectName}. {templateData.footerNote || "Todos os direitos reservados."}</p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <a href={templateData.privacyUrl||"#"} className="hover:text-neutral-900 transition-colors">Política de Privacidade</a><span>•</span>
            <a href={templateData.termsUrl||"#"} className="hover:text-neutral-900 transition-colors">Termos de Uso</a><span>•</span>
            <a href={templateData.contactUrl||"#"} className="hover:text-neutral-900 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductTemplateModern;
