import Header from "@/app/components/header"
import PricingHero from "@/app/components/pricing/pricing-hero"
import PricingPlans from "@/app/components/pricing/pricing-plans"
import FeatureComparison from "@/app/components/pricing/feature-comparison"
import FAQSection from "@/app/components/pricing/faq-section"
import PricingCTA from "@/app/components/pricing/pricing-cta"

export default function PricingPage() {
  return (
    <main className="bg-white">
      <Header />
      <PricingHero />
      <PricingPlans />
      <FeatureComparison />
      <FAQSection />
      <PricingCTA />
    </main>
  )
}
