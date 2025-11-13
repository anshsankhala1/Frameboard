"use client"

import { Clock, Zap, Users, CheckCircle, Sparkles, TrendingUp } from "lucide-react"

export default function WhyFrameboard() {
  const reasons = [
    {
      icon: Clock,
      title: "SAVE HOURS EVERY WEEK",
      description: "Stop wasting time switching between tools, chasing down information, and manually coordinating schedules. Frameboard automates tedious tasks so you can focus on what matters.",
      color: "bg-blue-400",
      stat: "10+ hours saved per week"
    },
    {
      icon: Sparkles,
      title: "AI-POWERED OPTIMIZATION",
      description: "Our intelligent AI analyzes your production needs, crew availability, and constraints to generate optimal schedules, find perfect locations, and match actors to characters—automatically.",
      color: "bg-purple-400",
      stat: "90% faster scheduling"
    },
    {
      icon: Users,
      title: "ELIMINATE SCHEDULING CONFLICTS",
      description: "Never double-book crew or miss availability windows again. Frameboard's smart conflict detection ensures everyone is where they need to be, when they need to be there.",
      color: "bg-green-400",
      stat: "95% fewer conflicts"
    },
    {
      icon: TrendingUp,
      title: "INCREASE TEAM PRODUCTIVITY",
      description: "When everything lives in one place, your team works faster. No more searching for files, asking for updates, or missing important changes. Everyone stays in sync, effortlessly.",
      color: "bg-orange-400",
      stat: "3x faster collaboration"
    },
    {
      icon: CheckCircle,
      title: "NEVER MISS A DEADLINE",
      description: "Automated reminders, clear timelines, and real-time updates keep your production on track. Know exactly what's done, what's pending, and what needs attention.",
      color: "bg-red-400",
      stat: "100% on-time productions"
    },
    {
      icon: Zap,
      title: "BETTER FILMS, LESS STRESS",
      description: "With AI handling logistics and automation taking care of admin work, you and your team have more energy for creativity. Make better decisions when you're not overwhelmed.",
      color: "bg-pink-400",
      stat: "70% less stress reported"
    }
  ]

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              WHY FRAMEBOARD?
            </span>
          </div>
          <h2 className="text-6xl font-black mb-6 leading-tight">
            BUILT FOR FILMMAKERS
            <br />
            BY FILMMAKERS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We understand your pain points because we've lived them. Here's how Frameboard solves the biggest challenges in pre-production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white p-8 hover:translate-y-[-4px] transition-transform"
              style={{
                boxShadow: "6px 6px 0px rgba(0,0,0,1)",
              }}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 ${reason.color} border-3 border-black rounded-full flex items-center justify-center mb-4`}>
                  <reason.icon className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="font-black text-2xl mb-3 leading-tight">
                  {reason.title}
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {reason.description}
              </p>

              <div className="pt-4 border-t-2 border-gray-200">
                <div className="inline-block px-3 py-1 bg-yellow-100 border-2 border-black">
                  <span className="font-black text-sm">{reason.stat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
