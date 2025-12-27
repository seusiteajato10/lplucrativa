import React from 'react';

interface ProductTemplateVSLProps {
  title?: string;
  description?: string;
}

const ProductTemplateVSL: React.FC<ProductTemplateVSLProps> = ({ 
  title = "Título Padrão", 
  description = "Descrição padrão" 
}) => {
  return (
    <div className="product-template">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-primary">
            {title}
          </h1>
          <p className="description">
            {description}
          </p>
        </div>
        
        <div className="video-container">
          {/* Seu conteúdo de vídeo aqui */}
        </div>
        
        <div className="cta-section">
          <button className="btn-primary">
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateVSL;
