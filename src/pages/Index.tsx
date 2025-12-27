import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import { useHomepageContent } from "@/hooks/useHomepageContent"; // Import the hook
import { Loader2 } from "lucide-react";

const Index = () => {
  // 2. USAR o hook no componente
  const { data: content, isLoading, error } = useHomepageContent();

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
        <p>Erro ao carregar conteúdo da página inicial: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>LP Lucrativa - Crie Landing Pages que Convertem</title>
        <meta
          name="description"
          content="Crie landing pages de alta conversão em minutos, sem precisar de programação. Templates prontos, editor visual e captura de leads integrada."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* 3. SUBSTITUIR textos fixos pelos dados dinâmicos */}
          <HeroSection heroContent={content?.hero} />
          <BenefitsSection featuresContent={content?.features} />
          <PricingSection />
        </main>
        <Footer contactContent={content?.contact} />
      </div>
    </>
  );
};

export default Index;