"use client"

import { Zap } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              BENEFITS
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            EVERYTHING IS BUILT TO
            <br />
            HELP YOU CREATE BETTER
            <br />
            FILMS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From storyboarding to scheduling. Frameboard streamlines every step of pre-production, so you and your team
            can focus on creativity–not admin.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Storyboard & Shotlist - Large Yellow Card */}
          <div
            className="border-4 border-black bg-yellow-200 p-8 row-span-2"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,1)",
            }}
          >
            <h3 className="font-black text-2xl mb-4 leading-tight">
              STORYBOARD &<br />
              SHOTLIST BUILDER
              <br />
              THAT WORKS
            </h3>
            <p className="text-gray-800 leading-relaxed mb-8">
              Create scenes, add visual references, and organize shotlists with an editor tailored for filmmakers.
            </p>

            {/* Nested Card */}
            <div className="border-3 border-gray-300 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-sm">Basic: HTML and CSS</span>
              </div>
              <div className="flex gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">📐 2k</span>
                <span className="flex items-center gap-1">📄 8</span>
                <span className="flex items-center gap-1">👥 22</span>
              </div>
            </div>
          </div>

          {/* Automated Schedules - White Card */}
          <div
            className="border-4 border-black bg-white p-8"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,1)",
            }}
          >
            <h3 className="font-black text-xl mb-4 leading-tight">
              AUTOMATED
              <br />
              SCHEDULES AND
              <br />
              REMINDERS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Instantly generate call sheets, send shoot reminders, and keep your crew in sync–no manual work.
            </p>
          </div>

          {/* One Dashboard - White Card */}
          <div
            className="border-4 border-black bg-white p-8"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,1)",
            }}
          >
            <h3 className="font-black text-xl mb-4 leading-tight">
              ONE
              <br />
              DASHBOARD
              <br />
              FOR YOUR FILM
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All your storyboards, scripts, schedules, and feedback–organized and accessible from a single workspace.
            </p>
          </div>

          {/* Track Progress - Teal Card with Gauge */}
          <div
            className="border-4 border-black bg-teal-50 p-8"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,1)",
            }}
          >
            <h3 className="font-black text-xl mb-4 leading-tight">
              TRACK PROJECT
              <br />
              PROGRESS
            </h3>
            <p className="text-gray-700 mb-6">
              See what's done, what's pending, and who's responsible–so you're always one step ahead.
            </p>

            {/* Gauge Chart Placeholder */}
            <div className="border-3 border-gray-300 bg-white p-6 rounded-lg flex flex-col items-center">
              <div className="text-sm text-gray-600 mb-2">Point Progress</div>
              <div className="w-24 h-24 rounded-full border-4 border-teal-400 border-r-orange-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Your Point</div>
                  <div className="font-black">8,966</div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Location & Cast Finder - Beige Card */}
          <div
            className="border-4 border-black bg-yellow-50 p-8"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,1)",
            }}
          >
            <h3 className="font-black text-xl mb-4 leading-tight">
              SMART LOCATION
              <br />& CAST FINDER
            </h3>
            <p className="text-gray-700 mb-6">
              Automatically discover nearby locations and actors that match your script or shotlist–so you never waste
              time searching.
            </p>

            {/* Leaderboard Placeholder */}
            <div className="border-3 border-gray-300 bg-white p-4 rounded-lg text-xs">
              <div className="font-bold mb-3">Leader Board</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1.</span>
                  <span className="text-gray-600">Charlie Rouard</span>
                </div>
                <div className="flex justify-between">
                  <span>2.</span>
                  <span className="text-gray-600">Ariana Agreeed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}