import PortalHeader from "@/app/components/portal/portal-header"
import DashboardHero from "@/app/components/portal/dashboard-hero"
import QuickActions from "@/app/components/portal/quick-actions"
import ProjectsOverview from "@/app/components/portal/projects-overview"
import RecentActivity from "@/app/components/portal/recent-activity"
import SubscriptionStatus from "@/app/components/portal/subscription-status"

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-white">
      <PortalHeader />
      <DashboardHero />

      {/* Subscription Status */}
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <SubscriptionStatus />
      </section>

      <QuickActions />
      <ProjectsOverview />
      <RecentActivity />
    </main>
  )
}
