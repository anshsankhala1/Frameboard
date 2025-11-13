"use client"

import { ArrowRight, CheckCircle } from "lucide-react"

export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Create Your Production",
      description: "Set up your project with basic details—title, duration, and key dates.",
      color: "bg-blue-300"
    },
    {
      number: "02",
      title: "Add Your Team",
      description: "Invite crew members, assign roles, and input everyone's availability.",
      color: "bg-purple-300"
    },
    {
      number: "03",
      title: "Let AI Build Your Schedule",
      description: "Our AI analyzes availability and creates an optimized production schedule.",
      color: "bg-green-300"
    },
    {
      number: "04",
      title: "Create Storyboards & Shot Lists",
      description: "Build visual references and organize every shot you need to capture.",
      color: "bg-orange-300"
    },
    {
      number: "05",
      title: "Find Locations & Cast",
      description: "Discover perfect locations and actors that match your vision.",
      color: "bg-pink-300"
    },
    {
      number: "06",
      title: "Generate Call Sheets",
      description: "Create and distribute professional call sheets with one click.",
      color: "bg-yellow-300"
    }
  ]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            FROM IDEA TO PRODUCTION
            <br />
            IN 6 SIMPLE STEPS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamline your entire pre-production workflow with Frameboard's intuitive process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div
                className="border-4 border-black bg-white p-8 h-full"
                style={{
                  boxShadow: "6px 6px 0px rgba(0,0,0,1)",
                }}
              >
                <div className={`w-16 h-16 ${step.color} border-3 border-black rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-black">{step.number}</span>
                </div>

                <h3 className="font-black text-2xl mb-4 leading-tight">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-400" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-block border-4 border-black bg-green-100 p-8"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={3} />
              <h3 className="font-black text-3xl">READY TO SHOOT</h3>
            </div>
            <p className="text-lg text-gray-700">
              With everything organized and automated, you're ready to focus on what matters—making great films.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
