"use client"

import { Calendar, Film, Users, FileText, MapPin, User } from "lucide-react"

export default function KeyFeatures() {
  const features = [
    {
      icon: Calendar,
      title: "CENTRALIZED SCHEDULING",
      description: "Automatically coordinate your entire production timeline. Input your crew's availability, production duration, and let our smart system create conflict-free schedules.",
      color: "bg-blue-400",
      highlights: [
        "Team availability tracking",
        "Conflict detection",
        "Auto-generated timelines",
        "Calendar integrations"
      ]
    },
    {
      icon: Film,
      title: "STORYBOARD & SHOT LIST",
      description: "Create detailed storyboards and shot lists with visual references. Organize scenes, add notes, and share with your team—all in one place.",
      color: "bg-purple-400",
      highlights: [
        "Visual scene builder",
        "Shot list management",
        "Reference image library",
        "Export to PDF"
      ]
    },
    {
      icon: Users,
      title: "CREW COORDINATION",
      description: "Keep your entire crew synchronized. Add team members with different roles, manage permissions, and ensure everyone has access to what they need.",
      color: "bg-green-400",
      highlights: [
        "Role-based access",
        "Real-time updates",
        "Team messaging",
        "Task assignments"
      ]
    },
    {
      icon: FileText,
      title: "AUTOMATED CALL SHEETS",
      description: "Generate professional call sheets instantly. Include all necessary details—scenes, locations, crew, call times—and distribute with one click.",
      color: "bg-red-400",
      highlights: [
        "One-click generation",
        "Customizable templates",
        "Email distribution",
        "Mobile-friendly"
      ]
    },
    {
      icon: MapPin,
      title: "LOCATION FINDER",
      description: "Discover and manage filming locations effortlessly. Search nearby locations that match your script requirements and keep all location details organized.",
      color: "bg-orange-400",
      highlights: [
        "Smart location search",
        "Location details & photos",
        "Permission tracking",
        "Map integration"
      ]
    },
    {
      icon: User,
      title: "ACTOR FINDING",
      description: "Find the perfect cast for your production. Search actors based on your character descriptions and manage auditions and callbacks.",
      color: "bg-pink-400",
      highlights: [
        "Character matching",
        "Audition scheduling",
        "Portfolio management",
        "Availability tracking"
      ]
    }
  ]

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              CORE FEATURES
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            ALL YOUR PRE-PRODUCTION
            <br />
            TOOLS IN ONE PLACE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white p-8 hover:translate-y-[-4px] transition-transform"
              style={{
                boxShadow: "6px 6px 0px rgba(0,0,0,1)",
              }}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 ${feature.color} border-3 border-black rounded-lg flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
              </div>

              <h3 className="font-black text-2xl mb-4 leading-tight">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-sm font-semibold">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
