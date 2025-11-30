"use client"

import { useEffect, useState } from "react"
import { Crown, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface SubscriptionData {
  subscriptionPlan: 'free' | 'pro'
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | 'inactive'
  subscriptionCurrentPeriodEnd?: string
  hasActiveSubscription: boolean
}

export default function SubscriptionStatus() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [])

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
      const response = await fetch(`${API_URL}/api/stripe/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSubscription(data)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
      const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating portal session:', error)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 border-3 border-black"></div>
      </div>
    )
  }

  if (!subscription) return null

  const isPro = subscription.hasActiveSubscription

  return (
    <div
      className={`border-4 border-black p-6 ${
        isPro
          ? 'bg-gradient-to-br from-purple-100 to-blue-100'
          : 'bg-white'
      }`}
      style={{
        boxShadow: "6px 6px 0px rgba(0,0,0,1)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {isPro && (
              <div className="w-10 h-10 bg-purple-500 border-3 border-black rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
            )}
            <div>
              <h3 className="font-black text-2xl">
                {isPro ? 'PRO PLAN' : 'FREE PLAN'}
              </h3>
              <p className="text-sm text-gray-700">
                {isPro ? 'All features unlocked' : 'Limited features'}
              </p>
            </div>
          </div>

          {isPro && subscription.subscriptionCurrentPeriodEnd && (
            <p className="text-xs text-gray-600 mb-3">
              Renews on {new Date(subscription.subscriptionCurrentPeriodEnd).toLocaleDateString()}
            </p>
          )}

          {isPro && subscription.subscriptionStatus === 'past_due' && (
            <div className="mb-3 px-3 py-2 bg-red-100 border-2 border-red-500 rounded">
              <p className="text-xs font-bold text-red-700">
                Payment failed. Please update your payment method.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isPro ? (
            <button
              onClick={handleManageSubscription}
              className="px-4 py-2 bg-black text-white border-3 border-black font-bold text-sm hover:bg-gray-800 transition flex items-center gap-2"
            >
              Manage
              <ExternalLink className="w-4 h-4" strokeWidth={3} />
            </button>
          ) : (
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 bg-purple-500 text-white border-3 border-black font-bold text-sm hover:bg-purple-600 transition flex items-center gap-2"
            >
              Upgrade to Pro
              <Crown className="w-4 h-4" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
