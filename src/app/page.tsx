import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorksSection } from "@/components/modules/home/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/modules/home/WhyChooseUsSection";
import { PopularDestinationsSection } from "@/components/modules/home/PopularDestinationsSection";
import { TestimonialsSection } from "@/components/modules/home/TestimonialsSection";
import { StatsSection } from "@/components/modules/home/StatsSection";
import { CTASection } from "@/components/modules/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PopularDestinationsSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
