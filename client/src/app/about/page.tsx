import Header from "@/app/components/header"
import AboutHero from "@/app/components/about/about-hero"
import WhyFrameboard from "@/app/components/about/why-frameboard"
import TransformSection from "@/app/components/about/transform-section"
import MissionSection from "@/app/components/about/mission-section"
import AboutCTA from "@/app/components/about/about-cta"

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Header />
      <AboutHero />
      <WhyFrameboard />
      <TransformSection />
      <MissionSection />
      <AboutCTA />
    </main>
  )
}
