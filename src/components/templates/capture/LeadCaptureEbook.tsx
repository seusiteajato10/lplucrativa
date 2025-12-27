import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/leads/LeadForm";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface LeadCaptureEbookProps {
  data: any;
  projectId: string;
  userId: string;
  projectName: string;
}

const LeadCaptureEbook = ({ data, projectId, userId, projectName }: LeadCaptureEbookProps) => {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const config = templateData.leadCapture;
  const styles = templateData.styles;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" style={{ fontFamily: styles.fontFamily }}>
      {/* Top Banner */}
      <div className="bg-primary/5 py-4 text-center border-b border-primary/10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
          Material Gratuito Exclusivo
        </span>
      </div>

      <main className="flex-1 flex items-center py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Content */}
            <div className="text-left space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                {config.headline}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {config.subheadline}
              </p>
              
              <ul className="space-y-4">
                {config.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <img 
                  src={config.ebookCoverUrl} 
                  alt="Ebook Mockup" 
                  className="w-full max-w-sm rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-slate-100">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{config.formTitle}</h3>
                  <p className="text-slate-500 text-sm">Garantimos que você não receberá SPAM.</p>
                </div>

                <LeadForm 
                  projectId={projectId}
                  userId={userId}
                  ctaText={config.ctaText}
                  redirectConfig={templateData.redirectAfterCapture}
                  fields={['name', 'email', 'phone']} // Adicionado 'phone' conforme requisito
                />

                <p className="text-center mt-6 text-xs text-slate-400">
                  {config.privacyText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} {templateData.footer?.companyName || projectName} • Política de Privacidade
        </p>
      </footer>
    </div>
  );
};

export default LeadCaptureEbook;