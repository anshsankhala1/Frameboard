"use client"

import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 py-24 px-6 border-t-4 border-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-black text-sm tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>START FREE TODAY</span>
        </div>

        <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          READY TO TRANSFORM
          <br />
          YOUR PRE-PRODUCTION?
        </h2>

        <p className="text-xl text-gray-800 mb-12 leading-relaxed max-w-2xl mx-auto">
          Join filmmakers who are saving hours of work and reducing stress with Frameboard's intelligent pre-production tools.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-4 bg-black text-white border-3 border-black font-black text-lg hover:bg-gray-800 transition flex items-center gap-3 shadow-lg">
            Get Started Free
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>

          <button className="px-10 py-4 bg-white border-3 border-black font-black text-lg hover:bg-gray-100 transition shadow-lg">
            Schedule a Demo
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="font-black text-3xl mb-1">500+</div>
            <div className="text-sm font-bold text-gray-700">Productions</div>
          </div>
          <div className="w-px h-12 bg-black"></div>
          <div className="text-center">
            <div className="font-black text-3xl mb-1">10k+</div>
            <div className="text-sm font-bold text-gray-700">Hours Saved</div>
          </div>
          <div className="w-px h-12 bg-black"></div>
          <div className="text-center">
            <div className="font-black text-3xl mb-1">98%</div>
            <div className="text-sm font-bold text-gray-700">Satisfaction</div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-black">
          <p className="text-sm font-bold text-gray-700">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
