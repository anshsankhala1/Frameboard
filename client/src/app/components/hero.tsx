"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <div className="mb-8 inline-block animate-scale-in opacity-0">
          <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
            PRE PRODUCTION STARTS HERE
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-8xl font-anton mb-6 leading-tight tracking-tight animate-fade-in-up delay-100 opacity-0">
          FRAMEBOARD
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-fade-in-up delay-200 opacity-0">
          Everything you need for film pre-production, in one place–so you can focus on bringing your creative vision to
          life.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-6 animate-fade-in-up delay-300 opacity-0">
          <Link href="/get-started">
            <button className="px-8 py-4 bg-yellow-300 border-3 border-black font-bold text-lg hover:bg-yellow-400 hover:scale-105 hover:shadow-lg transition-all duration-300">
              Start for free
            </button>
          </Link>
          <Link href="/pricing" className="font-bold text-lg flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:text-blue-600">
            Compare plans <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}