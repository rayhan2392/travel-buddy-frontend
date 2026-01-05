import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorksSection } from "@/components/modules/home/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/modules/home/WhyChooseUsSection";
import { PopularDestinationsSection } from "@/components/modules/home/PopularDestinationsSection";
import { TestimonialsSection } from "@/components/modules/home/TestimonialsSection";
import { StatsSection } from "@/components/modules/home/StatsSection";
import { CTASection } from "@/components/modules/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Find Your Perfect Travel Companion & Plan Adventures",
  description: "Join the world's leading travel companion platform. Connect with 10,000+ verified travelers, discover amazing destinations, and plan unforgettable adventures together. Start your journey today!",
  keywords: [
    "travel buddy finder",
    "travel companion",
    "find travel partner",
    "adventure travel",
    "travel community",
    "group travel",
    "travel planning",
    "backpacking buddy",
    "travel matching",
    "solo travel"
  ],
  openGraph: {
    title: "Travel Buddy - Find Your Perfect Travel Companion",
    description: "Connect with like-minded travelers worldwide. Plan adventures, share experiences, and explore 85+ countries together.",
    type: "website",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

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
      <Footer />
    </div>
  );
}
