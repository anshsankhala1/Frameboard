"use client"

import { X } from "lucide-react"

export default function ProblemSection() {
  const problems = [
    {
      title: "SCATTERED TOOLS KILL CREATIVITY",
      description:
        "Juggling shotlists, schedules, and storyboards on separate platforms breaks your creative flow and slows down your team.",
    },
    {
      title: "NO UNIFIED PROJECT OVERVIEW",
      description:
        "It's hard to see what's ready, what's stuck, and which team members are waiting–making it difficult to keep everyone aligned.",
    },
    {
      title: "TEAMS LOSE MOMENTUM",
      description:
        "Disorganized planning leads to lost files, missed deadlines, and frustrated teammates who lose energy before production even begins.",
    },
  ]

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              PROBLEM
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            PRE-PRODUCTION
            <br />
            SHOULD NOT BE HARD
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Many filmmakers and teams waste time switching tools, lose track of creative assets, and struggle to keep
            projects moving forward.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white p-8 relative"
              style={{
                boxShadow: "4px 4px 0px rgba(0,0,0,1)",
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-300 border-2 border-black flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" strokeWidth={3} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-black text-xl mb-4 leading-tight">{problem.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}