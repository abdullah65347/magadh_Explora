import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { PackageTiersSection } from "@/components/home/PackageTiersSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SpecialToursSection } from "@/components/home/SpecialToursSection";
import { DynamicPackageBuilder } from "@/components/home/DynamicPackageBuilder";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { QuoteModal } from "@/components/QuoteModal";
import { ShareJourneySection } from "@/components/home/ShareJourneySection";

const Index = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection onGetQuote={() => setIsQuoteModalOpen(true)} />
        <PackagesSection />
        <PackageTiersSection onGetQuote={() => setIsQuoteModalOpen(true)} />
        <DestinationsSection />
        <SpecialToursSection />
        <ShareJourneySection />
        <DynamicPackageBuilder />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection onGetQuote={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
};

export default Index;
