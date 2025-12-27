import { Star, ShieldCheck, CreditCard, Lock, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateData, defaultTemplateData } from "@/types/templateData";
import Footer from "@/components/layout/Footer";

interface ProductTemplateClassicProps {
  data?: any;
  projectName?: string;
}

export default function ProductTemplateClassic({ data, projectName }: ProductTemplateClassicProps) {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const price = parseFloat(templateData.price) || 0;
  const originalPrice = parseFloat(templateData.originalPrice) || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: templateData.styles.fontFamily }}>
      <main className="flex-1 pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-10">
          <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2">
              <div className="p-4 md:p-10 flex items-center justify-center bg-white border-r border-gray-100">
                <img src={templateData.heroImageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"} className="max-w-full h-auto" alt="Produto" />
              </div>
              <div className="p-6 md:p-10 flex flex-col text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{templateData.headline || projectName}</h1>
                <div className="text-4xl font-black text-green-600 mb-6">R$ {price.toFixed(2)}</div>
                <Button className="w-full py-8 text-xl font-black rounded-sm mb-8" style={{ backgroundColor: templateData.styles.primaryColor }}>
                  {templateData.ctaButtonText || "COMPRAR AGORA"}
                </Button>
                <div className="space-y-3">
                  {templateData.productBenefits?.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <ShieldCheck size={16} className="text-green-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}