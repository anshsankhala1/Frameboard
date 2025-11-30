"use client"

import { Check, Sparkles, Zap, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function PricingPlans() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGetStartedFree = () => {
    router.push('/get-started')
  }

  const handleStartTrial = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      // Not logged in, redirect to get-started
      router.push('/get-started')
      return
    }

    setLoading(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
      const PRICE_ID = process.env.NEXT_PUBLIC_PRO_MONTHLY_PRICE_ID

      console.log('Stripe checkout details:', {
        apiUrl: API_URL,
        priceId: PRICE_ID,
        hasToken: !!token
      })

      if (!PRICE_ID) {
        alert('Stripe is not configured. Please contact support.')
        setLoading(false)
        return
      }

      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ priceId: PRICE_ID })
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error:', errorText)
        alert(`Failed to create checkout session: ${response.status}`)
        setLoading(false)
        return
      }

      const data = await response.json()
      console.log('Checkout session data:', data)

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        alert('Failed to start checkout. Please try again.')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div
            className="border-4 border-black bg-white p-10 relative"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-400 border-3 border-black rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-black text-3xl">FREE</h3>
                  <p className="text-sm text-gray-600">Perfect for small projects</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">$0</span>
                  <span className="text-gray-600 font-bold">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Forever free • Up to 5 team members</p>
              </div>

              <button
                onClick={handleGetStartedFree}
                className="w-full px-8 py-4 bg-white border-3 border-black font-black text-lg hover:bg-gray-50 transition mb-8"
              >
                Get Started Free
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="font-black text-sm text-gray-500 uppercase tracking-wider mb-4">
                What's Included:
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Centralized scheduling</strong> for small teams</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Basic storyboard & shot list</strong> maker (manual uploads)</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Crew coordination</strong> for core roles</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Call sheet creation</strong> with basic templates</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Team management</strong> with basic role assignments</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Manual availability input</strong> for cast & crew</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Production dashboard</strong> with notifications</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Limited cloud storage</strong> for files & media</span>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-200">
              <div className="text-xs text-gray-600">
                <strong>Limitations:</strong> Up to 3 productions, basic features only, no AI tools
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div
            className="border-4 border-black bg-gradient-to-br from-purple-100 to-blue-100 p-10 relative"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 right-8">
              <div className="px-4 py-2 bg-yellow-300 border-3 border-black font-black text-xs tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                MOST POPULAR
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 border-3 border-black rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-black text-3xl">PRO</h3>
                  <p className="text-sm text-gray-700">For professional filmmakers</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">$29</span>
                  <span className="text-gray-700 font-bold">/month</span>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-bold text-purple-700">or $290/year (save 17%)</p>
                  <p className="text-sm text-gray-700">Unlimited team members</p>
                </div>
              </div>

              <button
                onClick={handleStartTrial}
                disabled={loading}
                className="w-full px-8 py-4 bg-black text-white border-3 border-black font-black text-lg hover:bg-gray-800 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Start Pro Subscription'}
              </button>
              <p className="text-xs text-center text-gray-600">Secure payment with Stripe</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="font-black text-sm text-gray-700 uppercase tracking-wider mb-4">
                Everything in Free, plus:
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold"><strong>Unlimited productions</strong> and team size</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold"><strong>AI scheduling assistant</strong> with automated optimization</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold"><strong>AI-powered storyboard generation</strong> from scripts</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold"><strong>Automated location & actor finding</strong> with AI</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Advanced shot list management</strong> with versioning</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Crew analytics & availability heatmaps</strong></span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Bulk imports & integrations</strong> (Final Draft, Google Drive)</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Priority email & chat support</strong></span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Increased storage</strong> for assets</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Export all reports</strong> in multiple formats</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Custom branding</strong> for reports & call sheets</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm"><strong>Early access</strong> to new features</span>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-purple-300">
              <div className="px-4 py-3 bg-white/80 border-2 border-black rounded text-center">
                <div className="font-black text-sm mb-1">🎬 BEST VALUE</div>
                <div className="text-xs text-gray-700">Perfect for indie filmmakers & studios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
