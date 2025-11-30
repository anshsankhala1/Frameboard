"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function SubscriptionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/portal')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
      <div
        className="max-w-2xl w-full bg-white border-4 border-black p-12 text-center"
        style={{
          boxShadow: "12px 12px 0px rgba(0,0,0,1)",
        }}
      >
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="font-black text-4xl mb-4">Welcome to Pro!</h1>
          <p className="text-xl text-gray-700 mb-2">
            Your subscription is now active
          </p>
          <p className="text-sm text-gray-600">
            You now have access to all Pro features including AI-powered tools
          </p>
        </div>

        <div className="space-y-4 mb-8 max-w-md mx-auto text-left">
          <div className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-600 rounded">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <div>
              <div className="font-bold text-sm">Unlimited Productions</div>
              <div className="text-xs text-gray-600">Create as many projects as you need</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 border-2 border-purple-600 rounded">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <div>
              <div className="font-bold text-sm">AI-Powered Tools</div>
              <div className="text-xs text-gray-600">Storyboard generation, scheduling assistant, and more</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-600 rounded">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <div>
              <div className="font-bold text-sm">Priority Support</div>
              <div className="text-xs text-gray-600">Get help when you need it most</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => router.push('/portal')}
            className="px-8 py-4 bg-black text-white border-3 border-black font-black text-lg hover:bg-gray-800 transition inline-flex items-center gap-3"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  )
}
