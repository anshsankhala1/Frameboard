import Header from "@/app/components/header"
import Hero from "@/app/components/hero"
import ProblemSection from "@/app/components/problem-section"
import BenefitsSection from "@/app/components/benefits-section"

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* Header with absolute positioning over video */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Full-screen video hero */}
      <Hero />

      {/* Content sections below - smooth transition */}
      <div className="relative bg-white">
        <ProblemSection />
        <BenefitsSection />
      </div>
    </main>
  )
}