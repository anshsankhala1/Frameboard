"use client"

import { useState } from "react"
import PortalHeader from "@/app/components/portal/portal-header"
import CallSheetForm from "@/app/components/portal/callsheet/callsheet-form"
import CallSheetPreview from "@/app/components/portal/callsheet/callsheet-preview"

export default function CallSheetPage() {
  const [generatedCallSheet, setGeneratedCallSheet] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (formData: any) => {
    setIsGenerating(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/callsheet/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Store the entire call sheet object including Excel data
        setGeneratedCallSheet(data.callSheet)

        // Automatically download the Excel file
        if (data.callSheet.excelData && data.callSheet.filename) {
          downloadExcelFile(data.callSheet.excelData, data.callSheet.filename)
        }
      } else {
        alert('Failed to generate call sheet: ' + data.error || data.message)
      }
    } catch (error) {
      console.error('Error generating call sheet:', error)
      alert('Failed to generate call sheet. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadExcelFile = (base64Data: string, filename: string) => {
    try {
      // Convert base64 to binary
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Create blob and download
      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      console.log('Excel file downloaded:', filename)
    } catch (error) {
      console.error('Error downloading Excel file:', error)
      alert('Failed to download Excel file. Please try again.')
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
              content={generatedCallSheet?.generatedContent}
              isGenerating={isGenerating}
            />
            {generatedCallSheet && generatedCallSheet.excelData && (
              <div className="mt-4">
                <button
                  onClick={() => downloadExcelFile(generatedCallSheet.excelData, generatedCallSheet.filename)}
                  className="w-full px-6 py-4 bg-green-500 text-white font-bold text-lg border-4 border-black hover:bg-green-600 transition-all duration-300 hover:translate-x-1 hover:translate-y-1"
                  style={{ boxShadow: "6px 6px 0px rgba(0,0,0,1)" }}
                >
                  📥 DOWNLOAD EXCEL CALL SHEET
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
