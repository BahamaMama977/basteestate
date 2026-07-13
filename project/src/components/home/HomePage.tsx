import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from './sections/HeroSection'
import { ProductSurfacesSection } from './sections/ProductSurfacesSection'
import { VerificationSection } from './sections/VerificationSection'
import {
  DealBenefitsSection,
  DealOverviewSection,
  PlatformFAQSection,
  PlatformFinalCTASection,
  RoleValueSection,
} from './sections/PlatformOverviewSections'

/** Главная — обзор всей платформы; подробные сценарии вынесены на ролевые страницы. */
export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProductSurfacesSection />
        <RoleValueSection />
        <DealOverviewSection />
        <VerificationSection />
        <DealBenefitsSection />
        <PlatformFAQSection />
        <PlatformFinalCTASection />
      </main>
      <Footer />
    </>
  )
}
