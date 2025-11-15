"use client"

import { useState } from "react"
import { Loader, Sparkles } from "lucide-react"

interface CallSheetFormProps {
  onGenerate: (formData: any) => void
  isGenerating: boolean
}

export default function CallSheetForm({ onGenerate, isGenerating }: CallSheetFormProps) {
  const [formData, setFormData] = useState({
    // Production Details
    productionTitle: "",
    shootDate: "",
    shootingDayNumber: 1,
    generalCallTime: "06:00",
    generalLocation: "",

    // Budget - NEW
    budget: 0,

    // Shooting Range
    shootingRange: {
      type: "days" as "days" | "weeks" | "months",
      duration: 1,
    },

    // Script - PRIMARY INPUT
    script: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-4 border-black bg-white p-8 animate-fade-in-left delay-100 opacity-0"
      style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}
    >
      <div className="mb-6">
        <h2 className="text-3xl font-anton mb-2 tracking-tight">CALL SHEET GENERATOR</h2>
        <p className="text-sm text-gray-600">
          Paste your script below and Claude AI will automatically extract scenes, characters, locations, and generate a professional call sheet.
        </p>
      </div>

      {/* Production Details Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-gray-300">PRODUCTION DETAILS</h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Production Title *</label>
            <input
              type="text"
              required
              value={formData.productionTitle}
              onChange={(e) => setFormData({ ...formData, productionTitle: e.target.value })}
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., The Last Stand"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Shoot Date *</label>
              <input
                type="date"
                required
                value={formData.shootDate}
                onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Shooting Day # *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.shootingDayNumber}
                onChange={(e) => setFormData({ ...formData, shootingDayNumber: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">General Call Time *</label>
              <input
                type="time"
                required
                value={formData.generalCallTime}
                onChange={(e) => setFormData({ ...formData, generalCallTime: e.target.value })}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">General Location *</label>
              <input
                type="text"
                required
                value={formData.generalLocation}
                onChange={(e) => setFormData({ ...formData, generalLocation: e.target.value })}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., Orange County, CA"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Total Film Budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-600">$</span>
              <input
                type="number"
                min="0"
                value={formData.budget || ""}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                className="w-full pl-8 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., 50000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              AI will recommend equipment and find actors within your budget range
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Shooting Range *</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                required
                min="1"
                value={formData.shootingRange.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shootingRange: { ...formData.shootingRange, duration: parseInt(e.target.value) || 1 },
                  })
                }
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Duration"
              />
              <select
                value={formData.shootingRange.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shootingRange: { ...formData.shootingRange, type: e.target.value as "days" | "weeks" | "months" },
                  })
                }
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Script Section - PRIMARY INPUT */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300">
          <Sparkles className="w-5 h-5 text-purple-600" strokeWidth={2} />
          <h3 className="text-xl font-bold">SCRIPT *</h3>
        </div>

        <p className="text-sm text-gray-600 mb-4 bg-purple-50 border-2 border-purple-200 p-3">
          <strong>AI-Powered Extraction:</strong> Paste your script here. Claude will automatically analyze it to extract:
          <br />• Scene numbers, locations, and INT/EXT/DAY/NIGHT information
          <br />• Characters and their appearances
          <br />• Location details and requirements
          <br />• Any special production notes
        </p>

        <textarea
          required
          value={formData.script}
          onChange={(e) => setFormData({ ...formData, script: e.target.value })}
          className="w-full h-96 px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-sm"
          placeholder={`Paste your script here in standard screenplay format...

Example:

INT. COFFEE SHOP - DAY

SARAH (30s, energetic) enters the bustling coffee shop. She spots MIKE (40s, rugged) sitting in the corner booth.

SARAH
(approaching)
You're late.

MIKE
(looking up from his phone)
Traffic. You know how it is.

---

Claude will extract all the details and create a professional call sheet!`}
        />

        <div className="mt-2 text-xs text-gray-500">
          Tip: Include scene headers (INT/EXT, location, time of day) for best results
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-purple-500 text-white py-4 px-6 border-3 border-black font-bold text-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
        style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
      >
        {isGenerating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" strokeWidth={3} />
            Generating Call Sheet with AI...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" strokeWidth={3} />
            Generate Call Sheet with AI
          </>
        )}
      </button>

      {isGenerating && (
        <p className="text-sm text-gray-600 text-center mt-4">
          Claude is analyzing your script and creating a professional call sheet...
        </p>
      )}
    </form>
  )
}
