import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { PackageTiersSection } from "@/components/home/PackageTiersSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SpecialToursSection } from "@/components/home/SpecialToursSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { QuoteModal } from "@/components/QuoteModal";

const Index = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onGetQuote={() => setIsQuoteModalOpen(true)} />
      <main>
        <HeroSection onGetQuote={() => setIsQuoteModalOpen(true)} />
        <PackageTiersSection onGetQuote={() => setIsQuoteModalOpen(true)} />
        <PackagesSection />
        <DestinationsSection />
        <FeaturesSection />
        <SpecialToursSection />
        <TestimonialsSection />
        <CTASection onGetQuote={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
};

export default Index;
