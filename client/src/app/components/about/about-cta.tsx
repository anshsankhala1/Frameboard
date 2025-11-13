"use client"

import { ArrowRight, Sparkles } from "lucide-react"

export default function AboutCTA() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-24 px-6 border-t-4 border-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-300 border-2 border-white font-black text-sm tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>JOIN THE MOVEMENT</span>
        </div>

        <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight text-white">
          READY TO TRANSFORM
          <br />
          YOUR PRE-PRODUCTION?
        </h2>

        <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
          Stop fighting your tools. Start making better films with less stress.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button className="px-12 py-5 bg-yellow-300 text-black border-3 border-white font-black text-xl hover:bg-yellow-400 transition flex items-center gap-3 shadow-lg">
            Start Free Today
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>

          <button className="px-12 py-5 bg-white text-black border-3 border-white font-black text-xl hover:bg-gray-100 transition shadow-lg">
            See How It Works
          </button>
        </div>

        <div className="space-y-3 text-gray-400">
          <p className="text-sm font-bold">✓ Free forever plan • No credit card required • Cancel anytime</p>
          <p className="text-sm">Join 500+ filmmakers who have transformed their pre-production workflow</p>
        </div>

        <div className="mt-16 pt-12 border-t-2 border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-black text-4xl text-white mb-2">14 Days</div>
              <div className="text-sm text-gray-400">Free Pro trial</div>
            </div>
            <div>
              <div className="font-black text-4xl text-white mb-2">$0</div>
              <div className="text-sm text-gray-400">To get started</div>
            </div>
            <div>
              <div className="font-black text-4xl text-white mb-2">∞</div>
              <div className="text-sm text-gray-400">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
