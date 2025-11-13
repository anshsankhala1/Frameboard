"use client"

import { Sparkles, Calendar, Image, MapPin, Lightbulb } from "lucide-react"

export default function AIFeatures() {
  return (
    <section className="bg-gradient-to-b from-yellow-50 to-white py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-purple-300 border-2 border-black font-black text-sm tracking-wider">
              AI-POWERED
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            INTELLIGENT AUTOMATION
            <br />
            FOR SMARTER PRE-PRODUCTION
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI integrations take the stress out of pre-production by automating tedious tasks and providing intelligent recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Scheduling */}
          <div
            className="border-4 border-black bg-blue-100 p-10"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-500 border-3 border-black rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-black text-3xl mb-2 leading-tight">
                  AI SCHEDULING ASSISTANT
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-600">POWERED BY AI</span>
                </div>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6 text-lg">
              Input your production timeline, crew availability, and constraints. Our AI analyzes all factors and generates optimal schedules that minimize conflicts and maximize efficiency.
            </p>

            <div className="bg-white border-3 border-black p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Conflict Detection</span>
                  <span className="px-3 py-1 bg-green-300 border-2 border-black text-xs font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Auto-Optimization</span>
                  <span className="px-3 py-1 bg-green-300 border-2 border-black text-xs font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Smart Suggestions</span>
                  <span className="px-3 py-1 bg-green-300 border-2 border-black text-xs font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Storyboarding */}
          <div
            className="border-4 border-black bg-purple-100 p-10"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-500 border-3 border-black rounded-full flex items-center justify-center flex-shrink-0">
                <Image className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-black text-3xl mb-2 leading-tight">
                  AI STORYBOARD GENERATOR
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-600">POWERED BY AI</span>
                </div>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6 text-lg">
              Describe your scenes and let AI generate visual representations. Transform your script into storyboard images and even preview videos of your shots.
            </p>

            <div className="bg-white border-3 border-black p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Scene Visualization</span>
                  <span className="px-3 py-1 bg-yellow-300 border-2 border-black text-xs font-bold">AI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Shot Preview Videos</span>
                  <span className="px-3 py-1 bg-yellow-300 border-2 border-black text-xs font-bold">AI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Style Matching</span>
                  <span className="px-3 py-1 bg-yellow-300 border-2 border-black text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Location Finding */}
          <div
            className="border-4 border-black bg-orange-100 p-10"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-orange-500 border-3 border-black rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-black text-3xl mb-2 leading-tight">
                  SMART LOCATION MATCHING
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-600">POWERED BY AI</span>
                </div>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6 text-lg">
              AI analyzes your script and storyboards to recommend perfect filming locations based on your creative vision, budget, and logistical needs.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Script-based recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Proximity optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Budget-aware suggestions</span>
              </div>
            </div>
          </div>

          {/* AI Actor Matching */}
          <div
            className="border-4 border-black bg-pink-100 p-10"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-pink-500 border-3 border-black rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-black text-3xl mb-2 leading-tight">
                  INTELLIGENT CASTING
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-600">POWERED BY AI</span>
                </div>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6 text-lg">
              Describe your characters and let AI find actors that match your vision. Get recommendations based on character traits, experience, and availability.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Character trait matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Experience level filtering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-bold">Availability checking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
