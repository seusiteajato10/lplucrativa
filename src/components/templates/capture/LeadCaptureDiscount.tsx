import { Gift, X, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/leads/LeadForm";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface LeadCaptureDiscountProps {
  data: any;
  projectId: string;
  userId: string;
}

const LeadCaptureDiscount = ({ data, projectId, userId }: LeadCaptureDiscountProps) => {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const config = templateData.leadCapture;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6" style={{ fontFamily: templateData.styles.fontFamily }}>
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden relative border-4 border-white">
        
        {/* Close Button UI Decorator */}
        <button className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Top Header Section */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-10 text-white text-center relative overflow-hidden">
          <Sparkles className="absolute top-4 left-4 w-6 h-6 opacity-30 animate-pulse" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 scale-125">
              <Gift className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">
              GANHE {config.discountPercent}% OFF
            </h1>
            <p className="text-white/90 font-medium uppercase tracking-widest text-xs">
              {config.subheadline}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10 text-center">
          <p className="text-slate-600 mb-8 font-medium">
            Cadastre seu email abaixo e receba seu cupom de boas-vindas agora mesmo.
          </p>

          <LeadForm 
            projectId={projectId}
            userId={userId}
            ctaText={config.ctaText}
            redirectConfig={templateData.redirectAfterCapture}
            fields={['email']}
            className="space-y-4"
          />

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {config.termsText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureDiscount;