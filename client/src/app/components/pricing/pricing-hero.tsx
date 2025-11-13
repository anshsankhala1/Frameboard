"use client"

import { Sparkles } from "lucide-react"

export default function PricingHero() {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-24 px-6 border-b-4 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 inline-block animate-scale-in opacity-0">
          <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
            SIMPLE PRICING
          </span>
        </div>

        <h1 className="text-7xl font-anton mb-6 leading-tight tracking-tight animate-fade-in-up delay-100 opacity-0">
          START FREE,
          <br />
          SCALE AS YOU GROW
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200 opacity-0">
          Get started with powerful pre-production tools for free. Upgrade to Pro when you need unlimited projects and AI automation.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300 opacity-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-sm">14-Day Pro Trial</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:scale-105 transition-all duration-300">
            <span className="text-2xl">💳</span>
            <span className="font-bold text-sm">No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:scale-105 transition-all duration-300">
            <span className="text-2xl">✓</span>
            <span className="font-bold text-sm">Cancel Anytime</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 border-3 border-black hover:scale-105 transition-all duration-300 animate-scale-in delay-400 opacity-0">
          <span className="text-3xl">🎉</span>
          <div className="text-left">
            <div className="font-black text-sm">LAUNCH SPECIAL</div>
            <div className="text-xs text-gray-700">Save 20% on annual plans</div>
          </div>
        </div>
      </div>
    </section>
  )
}
