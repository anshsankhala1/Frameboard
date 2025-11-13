"use client"

import { Zap, Shield, Sparkles } from "lucide-react"

export default function QuickBenefits() {
  return (
    <section className="bg-gray-50 py-16 px-6 border-t-4 border-black">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-black text-center mb-12">WHAT HAPPENS NEXT?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="border-4 border-black bg-white p-6 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-blue-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <div className="font-black text-xl mb-3">1. INSTANT ACCESS</div>
            <p className="text-sm text-gray-700">
              Get immediate access to your dashboard and start creating your first production in seconds.
            </p>
          </div>

          <div
            className="border-4 border-black bg-white p-6 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-purple-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <div className="font-black text-xl mb-3">2. TRY PRO FREE</div>
            <p className="text-sm text-gray-700">
              Enjoy a 14-day free trial of all Pro features—AI scheduling, unlimited projects, and more.
            </p>
          </div>

          <div
            className="border-4 border-black bg-white p-6 text-center"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="w-16 h-16 bg-green-500 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <div className="font-black text-xl mb-3">3. STAY FREE</div>
            <p className="text-sm text-gray-700">
              After your trial, keep using Frameboard free forever or upgrade to Pro anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div
            className="inline-block border-4 border-black bg-gradient-to-r from-yellow-300 to-orange-300 px-8 py-6"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <p className="font-black text-2xl mb-2">QUESTIONS?</p>
            <p className="text-gray-800">
              Check out our{" "}
              <a href="/pricing" className="underline font-bold hover:text-black">
                pricing page
              </a>{" "}
              or{" "}
              <a href="/about" className="underline font-bold hover:text-black">
                learn more about us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
