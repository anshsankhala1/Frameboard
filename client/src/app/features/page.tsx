import Header from "@/app/components/header"
import FeaturesHero from "@/app/components/features/features-hero"
import KeyFeatures from "@/app/components/features/key-features"
import AIFeatures from "@/app/components/features/ai-features"
import CollaborationFeatures from "@/app/components/features/collaboration-features"
import WorkflowSection from "@/app/components/features/workflow-section"
import CTASection from "@/app/components/features/cta-section"

export default function FeaturesPage() {
  return (
    <main className="bg-white">
      <Header />
      <FeaturesHero />
      <KeyFeatures />
      <AIFeatures />
      <CollaborationFeatures />
      <WorkflowSection />
      <CTASection />
    </main>
  )
}
