"use client"

import { Calendar, Film, Users, MapPin, FileText, Sparkles } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    { icon: Calendar, label: "Schedule Shoot", color: "blue", href: "/portal/schedule/new" },
    { icon: Film, label: "New Storyboard", color: "purple", href: "/portal/storyboard/new" },
    { icon: Users, label: "Invite Team", color: "green", href: "/portal/team/invite" },
    { icon: MapPin, label: "Find Location", color: "orange", href: "/portal/locations" },
    { icon: FileText, label: "Generate Call Sheet", color: "red", href: "/portal/callsheet" },
    { icon: Sparkles, label: "AI Assistant", color: "pink", href: "/portal/ai" },
  ]

  return (
    <section className="bg-gray-50 py-12 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-anton mb-6 tracking-tight">QUICK ACTIONS</h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href}>
                <button
                  className={`w-full border-3 border-black bg-white p-6 hover:bg-${action.color}-50 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-up delay-${index * 100} opacity-0`}
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
                >
                  <div className={`w-12 h-12 bg-${action.color}-400 border-3 border-black rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <div className="text-sm font-bold text-center">{action.label}</div>
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
