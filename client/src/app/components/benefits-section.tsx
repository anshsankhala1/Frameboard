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

            {/* Feature Preview */}
            <div className="border-3 border-gray-300 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-400 border-2 border-black rounded mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-600">Visual Storyboard Builder</div>
                  </div>
                </div>
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

            {/* Location Preview */}
            <div className="border-3 border-gray-300 bg-white p-4 rounded-lg text-xs">
              <div className="font-bold mb-3">Nearby Locations</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">📍 Warehouse District</span>
                  <span className="text-xs bg-green-100 px-2 py-1 rounded">0.5mi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">📍 Downtown Studio</span>
                  <span className="text-xs bg-green-100 px-2 py-1 rounded">1.2mi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}