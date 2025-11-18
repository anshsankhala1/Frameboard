"use client"

import { User, CreditCard, Crown, Calendar, Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import PortalHeader from "../../components/portal/portal-header"

export default function SettingsPage() {
  // Mock user data - in a real app, this would come from an API/database
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Indie Film Productions",
    role: "Director/Producer",
    joinDate: "January 2024",
  }

  const currentPlan = {
    name: "Professional",
    price: "$49/month",
    status: "Active",
    renewalDate: "February 15, 2025",
    features: [
      "Unlimited projects",
      "AI-powered call sheets",
      "Advanced scheduling",
      "Team collaboration (up to 10 members)",
      "Priority support",
      "Export to all formats",
    ],
  }

  const billingInfo = {
    paymentMethod: "Visa ending in 4242",
    billingEmail: "billing@example.com",
    billingAddress: "123 Main St, Los Angeles, CA 90001",
    nextBillingDate: "February 15, 2025",
    nextBillingAmount: "$49.00",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader />

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-anton mb-2">ACCOUNT SETTINGS</h1>
          <p className="text-gray-600 text-lg">
            Manage your account, billing, and subscription
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Information */}
          <div className="lg:col-span-2 bg-white border-4 border-black p-6" style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6" strokeWidth={3} />
              <h2 className="text-2xl font-anton">ACCOUNT INFORMATION</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user.role}
                    className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={user.company}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </label>
                <input
                  type="text"
                  value={user.joinDate}
                  className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50"
                  readOnly
                  disabled
                />
              </div>

              <button className="w-full mt-4 px-6 py-3 bg-blue-500 text-white font-bold border-4 border-black hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:translate-y-1" style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
                EDIT ACCOUNT INFO
              </button>
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-white border-4 border-black p-6" style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-yellow-500" strokeWidth={3} />
              <h2 className="text-2xl font-anton">CURRENT PLAN</h2>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-black p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-anton">{currentPlan.name}</h3>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold border-2 border-black">
                    {currentPlan.status}
                  </span>
                </div>
                <p className="text-3xl font-anton text-blue-600 mb-2">
                  {currentPlan.price}
                </p>
                <p className="text-xs text-gray-600">
                  Renews on {currentPlan.renewalDate}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-3">Plan Features:</h4>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full px-4 py-2 bg-purple-500 text-white font-bold border-4 border-black hover:bg-purple-600 transition-all duration-300 hover:translate-x-1 hover:translate-y-1" style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
                UPGRADE PLAN
              </button>

              <button className="w-full px-4 py-2 border-2 border-black bg-white font-bold hover:bg-gray-50 transition-all duration-300">
                CANCEL SUBSCRIPTION
              </button>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="mt-6 bg-white border-4 border-black p-6" style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}>
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6" strokeWidth={3} />
            <h2 className="text-2xl font-anton">BILLING INFORMATION</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Payment Method
              </label>
              <div className="flex items-center gap-3 p-4 border-2 border-black bg-gray-50">
                <CreditCard className="w-5 h-5" />
                <span className="font-semibold">{billingInfo.paymentMethod}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Billing Email
              </label>
              <input
                type="email"
                value={billingInfo.billingEmail}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Billing Address
              </label>
              <input
                type="text"
                value={billingInfo.billingAddress}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
                readOnly
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Billing Date</p>
                <p className="text-lg font-bold">{billingInfo.nextBillingDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount Due</p>
                <p className="text-lg font-bold text-blue-600">{billingInfo.nextBillingAmount}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-black text-white font-bold border-4 border-black hover:bg-gray-800 transition-all duration-300 hover:translate-x-1 hover:translate-y-1" style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
              UPDATE PAYMENT METHOD
            </button>
            <button className="px-6 py-3 border-2 border-black bg-white font-bold hover:bg-gray-50 transition-all duration-300">
              VIEW BILLING HISTORY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
