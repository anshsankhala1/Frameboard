"use client"

import { Check, X, Sparkles } from "lucide-react"

export default function FeatureComparison() {
  const features = [
    {
      category: "CORE FEATURES",
      items: [
        { name: "Production Dashboard", free: true, pro: true },
        { name: "Team Members", free: "Up to 5", pro: "Unlimited" },
        { name: "Active Productions", free: "Up to 3", pro: "Unlimited" },
        { name: "Cloud Storage", free: "1 GB", pro: "50 GB" },
        { name: "Call Sheet Templates", free: "Basic", pro: "Advanced + Custom" },
      ]
    },
    {
      category: "SCHEDULING",
      items: [
        { name: "Manual Scheduling", free: true, pro: true },
        { name: "Availability Tracking", free: true, pro: true },
        { name: "AI Schedule Optimization", free: false, pro: true, ai: true },
        { name: "Conflict Detection", free: "Basic", pro: "AI-Powered", ai: true },
        { name: "Multi-day Productions", free: false, pro: true },
      ]
    },
    {
      category: "STORYBOARDING & SHOT LISTS",
      items: [
        { name: "Manual Storyboards", free: true, pro: true },
        { name: "Shot List Management", free: "Basic", pro: "Advanced" },
        { name: "AI Visual Generation", free: false, pro: true, ai: true },
        { name: "Script to Storyboard", free: false, pro: true, ai: true },
        { name: "Shot Versioning", free: false, pro: true },
        { name: "Reference Library", free: "Limited", pro: "Unlimited" },
      ]
    },
    {
      category: "LOCATION & CASTING",
      items: [
        { name: "Manual Location Entry", free: true, pro: true },
        { name: "AI Location Finder", free: false, pro: true, ai: true },
        { name: "AI Actor Matching", free: false, pro: true, ai: true },
        { name: "Audition Management", free: false, pro: true },
      ]
    },
    {
      category: "COLLABORATION",
      items: [
        { name: "Role-Based Permissions", free: "Basic", pro: "Advanced" },
        { name: "Real-time Notifications", free: true, pro: true },
        { name: "Team Messaging", free: "Limited", pro: "Unlimited" },
        { name: "File Sharing", free: "Limited", pro: "Unlimited" },
      ]
    },
    {
      category: "INTEGRATIONS & EXPORTS",
      items: [
        { name: "PDF Export", free: true, pro: true },
        { name: "Bulk Data Import", free: false, pro: true },
        { name: "Final Draft Integration", free: false, pro: true },
        { name: "Google Drive Sync", free: false, pro: true },
        { name: "Custom Branding", free: false, pro: true },
      ]
    },
    {
      category: "SUPPORT",
      items: [
        { name: "Email Support", free: "Standard", pro: "Priority" },
        { name: "Chat Support", free: false, pro: true },
        { name: "Onboarding Sessions", free: false, pro: true },
        { name: "Early Feature Access", free: false, pro: true },
      ]
    },
  ]

  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-6 h-6 text-green-600 mx-auto" strokeWidth={3} />
    } else if (value === false) {
      return <X className="w-6 h-6 text-gray-300 mx-auto" strokeWidth={2} />
    } else {
      return <span className="text-sm font-bold text-gray-700">{value}</span>
    }
  }

  return (
    <section className="bg-gray-50 py-20 px-6 border-y-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-blue-300 border-2 border-black font-black text-sm tracking-wider">
              DETAILED COMPARISON
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            COMPARE PLANS
            <br />
            FEATURE BY FEATURE
          </h2>
        </div>

        <div
          className="border-4 border-black bg-white overflow-hidden"
          style={{
            boxShadow: "8px 8px 0px rgba(0,0,0,1)",
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b-4 border-black bg-gray-100">
            <div className="p-6 border-r-4 border-black">
              <span className="font-black text-lg">FEATURES</span>
            </div>
            <div className="p-6 border-r-4 border-black text-center">
              <span className="font-black text-lg">FREE</span>
              <div className="text-xs text-gray-600 mt-1">$0/month</div>
            </div>
            <div className="p-6 text-center bg-purple-50">
              <span className="font-black text-lg">PRO</span>
              <div className="text-xs text-gray-700 mt-1">$29/month</div>
            </div>
          </div>

          {/* Feature Categories */}
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="px-6 py-4 bg-yellow-100 border-b-2 border-black">
                <span className="font-black text-sm tracking-wider">{category.category}</span>
              </div>
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`grid grid-cols-3 border-b-2 border-gray-200 hover:bg-gray-50 transition ${
                    itemIndex === category.items.length - 1 && categoryIndex !== features.length - 1
                      ? "border-b-4 border-black"
                      : ""
                  }`}
                >
                  <div className="p-4 border-r-2 border-gray-200 flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.name}</span>
                    {item.ai && (
                      <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="p-4 border-r-2 border-gray-200 text-center flex items-center justify-center">
                    {renderCell(item.free)}
                  </div>
                  <div className="p-4 bg-purple-50/30 text-center flex items-center justify-center">
                    {renderCell(item.pro)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold">
              Features marked with sparkle are <strong>AI-Powered</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
