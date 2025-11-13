"use client"

import { Film } from "lucide-react"

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-yellow-50 to-white py-24 px-6 border-b-4 border-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-8 inline-block animate-scale-in opacity-0">
            <span className="px-4 py-2 bg-purple-300 border-2 border-black font-black text-sm tracking-wider">
              ABOUT FRAMEBOARD
            </span>
          </div>

          <h1 className="text-7xl font-anton mb-8 leading-tight tracking-tight animate-fade-in-up delay-100 opacity-0">
            PRE-PRODUCTION
            <br />
            SHOULDN'T BE THIS HARD
          </h1>

          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto font-semibold animate-fade-in-up delay-200 opacity-0">
            We built Frameboard because filmmakers deserve better tools.
            Tools that save time. Tools that reduce stress. Tools that let you focus on creativity, not admin.
          </p>
        </div>

        <div
          className="border-4 border-black bg-white p-12 text-center hover:shadow-2xl transition-all duration-500 animate-scale-in delay-300 opacity-0"
          style={{
            boxShadow: "8px 8px 0px rgba(0,0,0,1)",
          }}
        >
          <Film className="w-16 h-16 mx-auto mb-6" strokeWidth={3} />
          <h2 className="font-anton text-3xl mb-4 leading-tight tracking-tight">
            FROM CHAOS TO CLARITY
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Frameboard transforms scattered spreadsheets, endless emails, and disorganized planning
            into one unified platform where your entire team can collaborate effortlessly.
          </p>
        </div>
      </div>
    </section>
  )
}
