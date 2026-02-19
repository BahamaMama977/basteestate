'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { ValuePropositionSection } from '@/components/sections/ValuePropositionSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { TechnologySection } from '@/components/sections/TechnologySection'
import { BusinessModelSection } from '@/components/sections/BusinessModelSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <TechnologySection />
        <BusinessModelSection />
        <TeamSection />
        <RoadmapSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
