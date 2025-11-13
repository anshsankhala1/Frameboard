"use client"

import { Sparkles, TrendingUp } from "lucide-react"

export default function DashboardHero() {
  return (
    <section className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-12 px-6 border-b-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="animate-fade-in-left opacity-0">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-yellow-300 border-2 border-black text-xs font-black tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>PRO PLAN</span>
            </div>
            <h1 className="text-5xl font-anton mb-3 text-white tracking-tight">
              WELCOME BACK, JOHN
            </h1>
            <p className="text-lg text-white/90 mb-4">
              You have 3 active projects and 5 upcoming shoots this week.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 animate-fade-in-right delay-200 opacity-0">
            <div
              className="border-3 border-black bg-white p-4 min-w-[140px] hover:scale-105 transition-all duration-300"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" strokeWidth={3} />
                <span className="text-xs font-bold text-gray-600">THIS WEEK</span>
              </div>
              <div className="text-3xl font-anton mb-1">12</div>
              <div className="text-xs text-gray-600">Tasks Completed</div>
            </div>

            <div
              className="border-3 border-black bg-yellow-100 p-4 min-w-[140px] hover:scale-105 transition-all duration-300"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" strokeWidth={3} />
                <span className="text-xs font-bold text-gray-600">TEAM SIZE</span>
              </div>
              <div className="text-3xl font-anton mb-1">24</div>
              <div className="text-xs text-gray-600">Active Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
