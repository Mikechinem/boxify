import HeroSection from "@/components/boxify/HeroSection";
import ProblemAgitation from "@/components/boxify/ProblemAgitation";
import CostOfInaction from "@/components/boxify/CostOfInaction";
import UniqueSolution from "@/components/boxify/UniqueSolution";
import HowItWorks from "@/components/boxify/HowItWorks";
import BenefitCards from "@/components/boxify/BenefitCards";
import OfferStack from "@/components/boxify/OfferStack";
import ProofTrust from "@/components/boxify/ProofTrust";
import ObjectionHandling from "@/components/boxify/ObjectionHandling";
import FAQSection from "@/components/boxify/FAQSection";
import FinalCTA from "@/components/boxify/FinalCTA";
import StickyMobileCTA from "@/components/boxify/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <ProblemAgitation />
      <CostOfInaction />
      <UniqueSolution />
      <HowItWorks />
      <BenefitCards />
      <OfferStack />
      <ProofTrust />
      <ObjectionHandling />
      <FAQSection />
      <FinalCTA />
      <StickyMobileCTA />
    </main>
  );
}