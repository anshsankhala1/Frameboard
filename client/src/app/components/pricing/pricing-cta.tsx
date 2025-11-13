"use client"

import { ArrowRight, Check } from "lucide-react"

export default function PricingCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-24 px-6 border-t-4 border-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight text-white">
            READY TO START
            <br />
            YOUR NEXT PRODUCTION?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of filmmakers who are creating better films with less stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Free CTA */}
          <div
            className="border-4 border-black bg-white p-8 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <h3 className="font-black text-3xl mb-2">Start Free</h3>
              <p className="text-gray-600">Perfect for your first project</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm font-semibold">Up to 5 team members</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm font-semibold">3 active productions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm font-semibold">Core pre-production tools</span>
              </div>
            </div>

            <button className="w-full px-8 py-4 bg-white border-3 border-black font-black text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          {/* Pro CTA */}
          <div
            className="border-4 border-black bg-gradient-to-br from-purple-100 to-blue-100 p-8 text-center"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-yellow-300 border-2 border-black font-black text-xs mb-3">
                RECOMMENDED
              </div>
              <h3 className="font-black text-3xl mb-2">Start Pro Trial</h3>
              <p className="text-gray-700">14 days free, then $29/month</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-600" strokeWidth={3} />
                <span className="text-sm font-semibold">Unlimited everything</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-600" strokeWidth={3} />
                <span className="text-sm font-semibold">All AI-powered features</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-600" strokeWidth={3} />
                <span className="text-sm font-semibold">Priority support</span>
              </div>
            </div>

            <button className="w-full px-8 py-4 bg-black text-white border-3 border-black font-black text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2">
              Start Pro Trial
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
            <p className="text-xs text-gray-600 mt-3">No credit card required</p>
          </div>
        </div>

        <div className="text-center">
          <div
            className="inline-block border-4 border-black bg-white px-8 py-6"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-center justify-center gap-12 flex-wrap">
              <div className="text-center">
                <div className="font-black text-3xl mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              <div className="w-px h-12 bg-black"></div>
              <div className="text-center">
                <div className="font-black text-3xl mb-1">1000+</div>
                <div className="text-sm text-gray-600">Productions</div>
              </div>
              <div className="w-px h-12 bg-black"></div>
              <div className="text-center">
                <div className="font-black text-3xl mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
