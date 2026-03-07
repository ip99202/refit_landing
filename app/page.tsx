import HeroSection from "@/components/HeroSection";
import EmpathySection from "@/components/EmpathySection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FormSection from "@/components/FormSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-md">
        <HeroSection />
        <EmpathySection />
        <SolutionSection />
        <HowItWorksSection />
        <FormSection />
      </main>
    </div>
  );
}
