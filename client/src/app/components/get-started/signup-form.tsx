"use client"

import { ArrowRight, Mail, User, Check } from "lucide-react"
import { useState } from "react"

export default function SignupForm() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro">("free")

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          className="border-4 border-black bg-gradient-to-br from-gray-50 to-white p-12 hover:shadow-xl transition-all duration-300"
          style={{
            boxShadow: "10px 10px 0px rgba(0,0,0,1)",
          }}
        >
          <h2 className="text-4xl font-anton mb-8 text-center tracking-tight">CREATE YOUR ACCOUNT</h2>

          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block font-bold text-lg mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-500" strokeWidth={2} />
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 border-3 border-black text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block font-bold text-lg mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-500" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 border-3 border-black text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block font-bold text-lg mb-3">Choose Your Plan</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedPlan("free")}
                  className={`p-6 border-3 border-black text-left transition-all duration-300 hover:scale-105 ${
                    selectedPlan === "free"
                      ? "bg-blue-100 ring-4 ring-blue-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  style={{
                    boxShadow: selectedPlan === "free" ? "6px 6px 0px rgba(59,130,246,1)" : "4px 4px 0px rgba(0,0,0,1)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-black text-2xl">FREE</div>
                    {selectedPlan === "free" && (
                      <div className="w-6 h-6 bg-blue-500 border-2 border-black rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-black mb-2">$0</div>
                  <div className="text-sm text-gray-600">
                    • Up to 5 users
                    <br />
                    • 3 productions
                    <br />• Basic features
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan("pro")}
                  className={`p-6 border-3 border-black text-left transition-all duration-300 hover:scale-105 ${
                    selectedPlan === "pro"
                      ? "bg-purple-100 ring-4 ring-purple-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  style={{
                    boxShadow: selectedPlan === "pro" ? "6px 6px 0px rgba(168,85,247,1)" : "4px 4px 0px rgba(0,0,0,1)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-black text-2xl">PRO</div>
                    {selectedPlan === "pro" && (
                      <div className="w-6 h-6 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-black mb-2">$29/mo</div>
                  <div className="text-sm text-gray-600">
                    • Unlimited users
                    <br />
                    • Unlimited productions
                    <br />• All AI features
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 bg-yellow-300 border-3 border-black font-black text-xl hover:bg-yellow-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                boxShadow: "6px 6px 0px rgba(0,0,0,1)",
              }}
            >
              Create Account & Start Free
              <ArrowRight className="w-6 h-6" strokeWidth={3} />
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-600">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-sm font-bold">
              ✓ No credit card required • ✓ Cancel anytime • ✓ 14-day Pro trial included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
