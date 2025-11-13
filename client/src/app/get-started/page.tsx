import Header from "@/app/components/header"
import GetStartedHero from "@/app/components/get-started/get-started-hero"
import SignupForm from "@/app/components/get-started/signup-form"
import QuickBenefits from "@/app/components/get-started/quick-benefits"

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <GetStartedHero />
      <SignupForm />
      <QuickBenefits />
    </main>
  )
}
