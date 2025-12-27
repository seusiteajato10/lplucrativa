import { PlayCircle, ShieldCheck, Users } from "lucide-react";
import { LeadForm } from "@/components/leads/LeadForm";
import { TemplateData, defaultTemplateData } from "@/types/templateData";

interface LeadCaptureVSLProps {
  data: any;
  projectId: string;
  userId: string;
  projectName: string;
}

const LeadCaptureVSL = ({ data, projectId, userId, projectName }: LeadCaptureVSLProps) => {
  const templateData: TemplateData = { ...defaultTemplateData, ...data };
  const config = templateData.leadCapture;

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: templateData.styles.fontFamily }}>
      <header className="py-6 text-center">
        <span className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
          <PlayCircle className="w-4 h-4" /> Assista ao vídeo exclusivo
        </span>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-lg">
            {config.headline}
          </h1>

          {/* Video Player */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
            <iframe
              src={config.videoUrl.replace('watch?v=', 'embed/')}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Capture Area */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-8">{config.formText}</h2>
            
            <LeadForm 
              projectId={projectId}
              userId={userId}
              ctaText={config.ctaText}
              redirectConfig={templateData.redirectAfterCapture}
              fields={['name', 'email']}
              horizontal={true}
              className="max-w-3xl mx-auto"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                <ShieldCheck className="w-5 h-5 text-primary" /> Sem Spam
              </div>
              <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                <ShieldCheck className="w-5 h-5 text-primary" /> Conteúdo Premium
              </div>
              <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                <ShieldCheck className="w-5 h-5 text-primary" /> Cancele a qualquer momento
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 text-white/40">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">
              Junte-se a <span className="text-white font-bold">{config.subscribersCount.toLocaleString()}</span> pessoas que já receberam
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadCaptureVSL;