"use client"

import { Film, Calendar, Users, FileText, Clock } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "project",
      icon: Film,
      action: "Updated storyboard",
      project: "Summer Road Trip",
      user: "Sarah Chen",
      time: "2 hours ago",
      color: "blue",
    },
    {
      id: 2,
      type: "schedule",
      icon: Calendar,
      action: "Created shoot schedule",
      project: "Documentary: City Life",
      user: "Mike Johnson",
      time: "4 hours ago",
      color: "purple",
    },
    {
      id: 3,
      type: "team",
      icon: Users,
      action: "Invited 3 new members",
      project: "Music Video - Eclipse",
      user: "Emily Davis",
      time: "6 hours ago",
      color: "green",
    },
    {
      id: 4,
      type: "callsheet",
      icon: FileText,
      action: "Generated call sheet",
      project: "Summer Road Trip",
      user: "John Doe",
      time: "1 day ago",
      color: "orange",
    },
  ]

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-anton tracking-tight">RECENT ACTIVITY</h2>
          <button className="text-sm font-bold text-blue-600 hover:underline transition-all duration-200">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className={`border-3 border-black bg-white p-6 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 animate-fade-in-left delay-${index * 100} opacity-0`}
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${activity.color}-400 border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{activity.user}</span>
                      <span className="text-gray-600">{activity.action}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">{activity.project}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" strokeWidth={2} />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 border-2 border-black font-bold text-sm hover:bg-gray-100 transition-all duration-200">
                    View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
