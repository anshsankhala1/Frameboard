"use client"

import { useState } from "react"
import PortalHeader from "@/app/components/portal/portal-header"
import CallSheetForm from "@/app/components/portal/callsheet/callsheet-form"
import CallSheetPreview from "@/app/components/portal/callsheet/callsheet-preview"

export default function CallSheetPage() {
  const [generatedCallSheet, setGeneratedCallSheet] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (formData: any) => {
    setIsGenerating(true)
    try {
      const response = await fetch('http://localhost:3001/api/callsheet/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedCallSheet(data.callSheet.generatedContent)
      } else {
        alert('Failed to generate call sheet: ' + data.message)
      }
    } catch (error) {
      console.error('Error generating call sheet:', error)
      alert('Failed to generate call sheet. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PortalHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-anton mb-3 tracking-tight">GENERATE CALL SHEET</h1>
          <p className="text-lg text-gray-600">
            Fill in the production details below and our AI will generate a professional call sheet for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <CallSheetForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Preview Section */}
          <div>
            <CallSheetPreview
              content={generatedCallSheet}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
