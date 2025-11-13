"use client"

import { X, ArrowRight, Check } from "lucide-react"

export default function TransformSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 border-y-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-green-300 border-2 border-black font-black text-sm tracking-wider">
              THE TRANSFORMATION
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            BEFORE & AFTER FRAMEBOARD
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Before - Old Way */}
          <div
            className="border-4 border-black bg-red-50 p-8"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500 border-3 border-black rounded-full flex items-center justify-center">
                <X className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl">THE OLD WAY</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Scattered Tools</div>
                  <div className="text-sm text-gray-700">Spreadsheets, email chains, Google Docs, separate calendar apps—information everywhere</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Manual Everything</div>
                  <div className="text-sm text-gray-700">Hours spent building schedules by hand, checking availability one person at a time</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Constant Conflicts</div>
                  <div className="text-sm text-gray-700">Double bookings, missed availability, crew members in two places at once</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Communication Chaos</div>
                  <div className="text-sm text-gray-700">Endless email threads, missing messages, people out of the loop</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Version Confusion</div>
                  <div className="text-sm text-gray-700">"Which call sheet is the latest?" "Did you see the updated schedule?"</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Stressed Teams</div>
                  <div className="text-sm text-gray-700">Overwhelmed crew, frustrated producers, exhausted directors—before shooting even begins</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white border-2 border-black text-center">
              <div className="font-black text-sm text-red-600">RESULT: Wasted Time, Missed Opportunities, Preventable Mistakes</div>
            </div>
          </div>

          {/* After - With Frameboard */}
          <div
            className="border-4 border-black bg-green-50 p-8"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 border-3 border-black rounded-full flex items-center justify-center">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl">WITH FRAMEBOARD</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">One Unified Platform</div>
                  <div className="text-sm text-gray-700">Everything in one place—schedules, storyboards, crew info, locations, call sheets</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">AI-Powered Automation</div>
                  <div className="text-sm text-gray-700">Intelligent scheduling, automated conflict detection, smart recommendations—done in minutes</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Zero Conflicts</div>
                  <div className="text-sm text-gray-700">AI analyzes all availability and constraints, preventing scheduling issues before they happen</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Seamless Communication</div>
                  <div className="text-sm text-gray-700">Built-in messaging, automatic notifications, everyone sees updates instantly</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Always Current</div>
                  <div className="text-sm text-gray-700">Single source of truth, real-time updates, everyone working from the same information</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
                <div>
                  <div className="font-bold mb-1">Focused, Creative Teams</div>
                  <div className="text-sm text-gray-700">Less admin stress means more mental space for the creative work that matters</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white border-2 border-black text-center">
              <div className="font-black text-sm text-green-600">RESULT: More Time, Better Films, Happier Teams</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div
            className="inline-block border-4 border-black bg-gradient-to-r from-yellow-300 to-orange-300 px-12 py-8"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="font-black text-3xl mb-2">THE DIFFERENCE IS CLEAR</div>
                <div className="text-lg text-gray-800">Stop fighting your tools. Start making better films.</div>
              </div>
              <ArrowRight className="w-12 h-12 flex-shrink-0" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
