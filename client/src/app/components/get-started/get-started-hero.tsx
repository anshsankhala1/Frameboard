"use client"

import { Sparkles } from "lucide-react"

export default function GetStartedHero() {
  return (
    <section className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-20 px-6 border-b-4 border-black overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider animate-scale-in opacity-0">
          <Sparkles className="w-4 h-4" />
          <span>START YOUR JOURNEY</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-anton mb-6 leading-tight text-white tracking-tight animate-fade-in-up delay-100 opacity-0">
          GET STARTED IN
          <br />
          60 SECONDS
        </h1>

        <p className="text-2xl text-white mb-8 leading-relaxed animate-fade-in-up delay-200 opacity-0">
          Join hundreds of filmmakers using Frameboard to streamline their pre-production.
          <br />
          <span className="font-bold">No credit card required. Free forever plan available.</span>
        </p>
      </div>
    </section>
  )
}
