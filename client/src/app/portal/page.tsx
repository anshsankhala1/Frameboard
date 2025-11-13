import PortalHeader from "@/app/components/portal/portal-header"
import DashboardHero from "@/app/components/portal/dashboard-hero"
import QuickActions from "@/app/components/portal/quick-actions"
import ProjectsOverview from "@/app/components/portal/projects-overview"
import RecentActivity from "@/app/components/portal/recent-activity"

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-white">
      <PortalHeader />
      <DashboardHero />
      <QuickActions />
      <ProjectsOverview />
      <RecentActivity />
    </main>
  )
}
