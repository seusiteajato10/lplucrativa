import React from "react";
import { Helmet } from "react-helmet-async";

const TemplateGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const templates = [
    {
      id: "captura-produto",
      category: "Páginas de Captura",
      name: "ProductTemplate",
      image: "https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=ProductTemplate+-+Captura+Produto",
      description: "Página simples de captura com formulário"
    },
    {
      id: "captura-vsl",
      category: "Páginas de Captura", 
      name: "ProductTemplateVSL",
      image: "https://via.placeholder.com/800x500/EF4444/FFFFFF?text=ProductTemplateVSL+-+Captura+VSL",
      description: "Página com vídeo + formulário de captura"
    },
    {
      id: "vendas-upsell",
      category: "Upsell",
      name: "UpsellPage",
      image: "https://via.placeholder.com/800x500/10B981/FFFFFF?text=UpsellPage+-+Upsell+Automático",
      description: "Página de upsell pós-venda"
    },
    {
      id: "vendas-downsell",
      category: "Downsell",
      name: "DownsellPage",
      image: "https://via.placeholder.com/800x500/F59E0B/FFFFFF?text=DownsellPage+-+Downsell+Desconto",
      description: "Página de recuperação de carrinho"
    },
    {
      id: "vendas-obrigado",
      category: "Páginas de Venda",
      name: "ThankYouPage", 
      image: "https://via.placeholder.com/800x500/8B5CF6/FFFFFF?text=ThankYouPage+-+Página+Obrigado",
      description: "Página de agradecimento pós-compra"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Templates | LP Lucrativa</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* HEADER */}
        <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            Galeria de Templates
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Clique em qualquer template para ver a prévia
          </p>
        </section>

        {/* CATEGORIAS */}
        <section className="px-6 pb-24 max-w-7xl mx-auto space-y-20">
          {["Páginas de Captura", "Páginas de Venda", "Upsell", "Downsell"].map((category) => (
            <div key={category}>
              <h2 className="text-4xl font-black text-slate-900 mb-12 capitalize">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates
                  .filter(t => t.category === category)
                  .map((template) => (
                    <div 
                      key={template.id}
                      className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full"
                      onClick={() => setSelectedImage(template.image)}
                    >
                      <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-6 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                        <img 
                          src={template.image} 
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-bold text-xl text-slate-900">{template.name}</h3>
                        <p className="text-slate-600 text-sm">{template.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* MODAL DE PRÉ-VIA */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full max-h-[90vh] mx-auto">
              <img 
                src={selectedImage} 
                alt="Template Preview"
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateGallery;
