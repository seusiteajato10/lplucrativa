import { TemplateData } from '@/types/templateData';
import { ProjectNiche } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditorPreviewProps {
  templateData: TemplateData;
  niche: ProjectNiche;
  previewMode: 'desktop' | 'mobile';
}

const EditorPreview = ({ templateData, niche, previewMode }: EditorPreviewProps) => {
  const styles = templateData.styles;

  return (
    <div className="flex-1 bg-secondary/30 overflow-auto p-6 flex justify-center">
      <div
        className={`bg-white shadow-xl transition-all duration-300 overflow-auto ${
          previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-5xl'
        }`}
        style={{ fontFamily: styles.fontFamily }}
      >
        {/* Header */}
        {templateData.logoUrl && (
          <header className="p-4 flex justify-center border-b">
            <img src={templateData.logoUrl} alt="Logo" className="h-12 object-contain" />
          </header>
        )}

        {/* Hero Section */}
        <section
          className="relative py-16 px-6 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${styles.primaryColor}, ${styles.secondaryColor})`,
          }}
        >
          {templateData.heroImageUrl && !templateData.useImageInsteadOfVideo && templateData.videoUrl ? null : 
            templateData.heroImageUrl && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${templateData.heroImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )
          }
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{templateData.headline}</h1>
            <p className="text-lg opacity-90 mb-6">{templateData.subheadline}</p>
            <p className="mb-8 opacity-80">{templateData.heroText}</p>
            <Button
              size="lg"
              className="bg-white hover:bg-white/90"
              style={{ color: styles.primaryColor }}
            >
              {templateData.ctaButtonText}
            </Button>
          </div>
        </section>

        {/* Video Section */}
        {templateData.videoUrl && !templateData.useImageInsteadOfVideo && (
          <section className="py-12 px-6 bg-gray-50">
            <div className="max-w-3xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
              {templateData.videoUrl.includes('youtube') && (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(templateData.videoUrl)}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
              {templateData.videoUrl.includes('vimeo') && (
                <iframe
                  src={`https://player.vimeo.com/video/${extractVimeoId(templateData.videoUrl)}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {templateData.benefits.length > 0 && (
          <section className="py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: styles.primaryColor }}>
              {templateData.benefitsTitle}
            </h2>
            <div className={`grid gap-6 max-w-3xl mx-auto ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
              {templateData.benefits.map(benefit => (
                <div
                  key={benefit.id}
                  className="p-4 rounded-lg border text-center"
                  style={{ borderColor: `${styles.primaryColor}30` }}
                >
                  <p className="text-gray-700">{benefit.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {templateData.testimonials.length > 0 && (
          <section className="py-12 px-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: styles.primaryColor }}>
              {templateData.testimonialsTitle}
            </h2>
            <div className={`grid gap-6 max-w-4xl mx-auto ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {templateData.testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lead Capture Form */}
        <section className="py-12 px-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center mb-6" style={{ color: styles.primaryColor }}>
              Cadastre-se agora
            </h2>
            <div className="space-y-3">
              {templateData.formFields.fullName && (
                <Input placeholder="Nome completo" />
              )}
              {templateData.formFields.email && (
                <Input placeholder="E-mail" type="email" />
              )}
              {templateData.formFields.whatsapp && (
                <Input placeholder="WhatsApp" />
              )}
              {templateData.formFields.cpf && (
                <Input placeholder="CPF" />
              )}
              {templateData.formFields.company && (
                <Input placeholder="Empresa" />
              )}
              {templateData.formFields.role && (
                <Input placeholder="Cargo/Função" />
              )}
              <Button
                className="w-full text-white"
                style={{ backgroundColor: styles.primaryColor }}
              >
                {templateData.ctaButtonText}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-6 bg-gray-100 text-center text-sm text-gray-600">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:underline">Termos de Uso</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </div>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? match[1] : '';
};

const extractVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : '';
};

export default EditorPreview;
