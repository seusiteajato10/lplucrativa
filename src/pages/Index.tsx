import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";

const Index = () => {
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
          <HeroSection />
          <BenefitsSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
