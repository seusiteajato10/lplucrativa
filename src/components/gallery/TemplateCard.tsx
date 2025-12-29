import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface TemplateCardProps {
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  onPreview: () => void;
}

const TemplateCard = ({ name, description, thumbnail, category, onPreview }: TemplateCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={thumbnail} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            onClick={onPreview}
            className="bg-white text-black hover:bg-slate-100 font-bold px-6 rounded-xl shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Demo
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 text-left">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;