import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import { useHomepageContent } from "@/hooks/useHomepageContent"; // Import the new hook
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: homepageContent, isLoading, error } = useHomepageContent();

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
          <HeroSection heroContent={homepageContent?.hero} />
          <BenefitsSection featuresContent={homepageContent?.features} />
          <PricingSection /> {/* PricingSection already uses useSubscription */}
        </main>
        <Footer contactContent={homepageContent?.contact} />
      </div>
    </>
  );
};

export default Index;