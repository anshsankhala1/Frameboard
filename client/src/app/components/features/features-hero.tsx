"use client"

import { Calendar, Users, Film, MapPin, FileText } from "lucide-react"

export default function FeaturesHero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-6 border-b-4 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block animate-scale-in opacity-0">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              POWERFUL FEATURES
            </span>
          </div>
          <h1 className="text-7xl font-anton mb-6 leading-tight tracking-tight animate-fade-in-up delay-100 opacity-0">
            EVERYTHING YOU NEED
            <br />
            FOR PRE-PRODUCTION
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200 opacity-0">
            From automated scheduling to AI-powered storyboarding, Frameboard brings together all the tools you need to streamline your film pre-production process.
          </p>
        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-5 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-300 opacity-0">
            <div className="w-16 h-16 bg-blue-400 border-3 border-black rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <Calendar className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-sm text-center">Smart Scheduling</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-300 opacity-0">
            <div className="w-16 h-16 bg-purple-400 border-3 border-black rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <Film className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-sm text-center">Storyboarding</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-400 opacity-0">
            <div className="w-16 h-16 bg-green-400 border-3 border-black rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <Users className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-sm text-center">Crew Coordination</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-400 opacity-0">
            <div className="w-16 h-16 bg-red-400 border-3 border-black rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <FileText className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-sm text-center">Call Sheets</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-500 opacity-0">
            <div className="w-16 h-16 bg-orange-400 border-3 border-black rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <MapPin className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-sm text-center">Location Finder</span>
          </div>
        </div>
      </div>
    </section>
  )
}
