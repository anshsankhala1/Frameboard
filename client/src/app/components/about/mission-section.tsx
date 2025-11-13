"use client"

import { Heart, Target, Lightbulb } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              OUR MISSION
            </span>
          </div>
          <h2 className="text-6xl font-black mb-6 leading-tight">
            EMPOWERING FILMMAKERS
            <br />
            EVERYWHERE
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe great films start with great pre-production. Our mission is to give every filmmaker
            the tools they need to bring their vision to life—without the stress, chaos, and wasted time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="border-4 border-black bg-gradient-to-br from-blue-100 to-blue-50 p-8 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-blue-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-black text-2xl mb-3">OUR GOAL</h3>
            <p className="text-gray-700 leading-relaxed">
              Make pre-production so effortless that filmmakers can focus 100% of their energy on creativity and storytelling.
            </p>
          </div>

          <div
            className="border-4 border-black bg-gradient-to-br from-purple-100 to-purple-50 p-8 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-purple-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-black text-2xl mb-3">OUR VALUES</h3>
            <p className="text-gray-700 leading-relaxed">
              Built by filmmakers, for filmmakers. We understand your challenges because we've been there.
            </p>
          </div>

          <div
            className="border-4 border-black bg-gradient-to-br from-green-100 to-green-50 p-8 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-green-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-black text-2xl mb-3">OUR INNOVATION</h3>
            <p className="text-gray-700 leading-relaxed">
              AI and automation aren't buzzwords—they're tools that genuinely save hours and reduce stress.
            </p>
          </div>
        </div>

        <div
          className="border-4 border-black bg-gradient-to-r from-yellow-200 to-orange-200 p-12"
          style={{
            boxShadow: "8px 8px 0px rgba(0,0,0,1)",
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-black text-4xl mb-6">FOR INDIE FILMMAKERS & STUDIOS ALIKE</h3>
            <p className="text-xl text-gray-800 leading-relaxed mb-6">
              Whether you're a solo director planning your first short film or a production company
              managing multiple features, Frameboard scales with you.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From student films to major productions, from documentaries to narrative features—
              if you're making a film, Frameboard is built for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
