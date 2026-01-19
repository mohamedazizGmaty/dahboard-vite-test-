import { Hero } from "@/components/Hero"
import { SolutionVideo } from "@/components/SolutionVideo"
import { PainSection } from "@/components/PainSection"
import { Features } from "@/components/Features"
import { WhyStrollUP } from "@/components/WhyStrollUP"
import { Pricing } from "@/components/Pricing"
import { LeadForm } from "@/components/LeadForm"
import { CallToAction } from "@/components/CallToAction"
import { SocialProof } from "@/components/SocialProof"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <SolutionVideo />
      <PainSection />
      <Features />
      <WhyStrollUP />
      <SocialProof />
      <Pricing />
      <LeadForm />
      <CallToAction />
    </div>
  )
}

