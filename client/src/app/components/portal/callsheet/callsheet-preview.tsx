"use client"

import { Loader, Download, FileText } from "lucide-react"

interface CallSheetPreviewProps {
  content: string | null
  isGenerating: boolean
}

export default function CallSheetPreview({ content, isGenerating }: CallSheetPreviewProps) {
  const handleDownload = () => {
    if (!content) return

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `call-sheet-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    if (!content) return

    const printWindow = window.open('', '', 'height=600,width=800')
    if (printWindow) {
      printWindow.document.write('<html><head><title>Call Sheet</title>')
      printWindow.document.write('<style>body { font-family: monospace; white-space: pre-wrap; padding: 20px; }</style>')
      printWindow.document.write('</head><body>')
      printWindow.document.write(content.replace(/\n/g, '<br>'))
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div
      className="border-4 border-black bg-white p-8 min-h-[800px] animate-fade-in-right delay-200 opacity-0 sticky top-24"
      style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-anton tracking-tight">PREVIEW</h2>

        {content && (
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-400 border-2 border-black font-bold hover:bg-blue-500 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" strokeWidth={3} />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-400 border-2 border-black font-bold hover:bg-green-500 transition-all duration-300 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" strokeWidth={3} />
              Print
            </button>
          </div>
        )}
      </div>

      <div className="border-2 border-gray-300 bg-gray-50 p-6 min-h-[700px]">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mb-4" strokeWidth={2} />
            <p className="text-lg font-bold text-gray-600">Generating your call sheet...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        ) : content ? (
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{content}</pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText className="w-16 h-16 text-gray-300 mb-4" strokeWidth={2} />
            <p className="text-lg font-bold text-gray-400">No call sheet generated yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Fill out the form and click "Generate Call Sheet with AI"
              <br />
              to see your professional call sheet here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
