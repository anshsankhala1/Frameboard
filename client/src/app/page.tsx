import Header from "@/app/components/header"
import Hero from "@/app/components/hero"
import ProblemSection from "@/app/components/problem-section"
import BenefitsSection from "@/app/components/benefits-section"

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <ProblemSection />
      <BenefitsSection />
    </main>
  )
}