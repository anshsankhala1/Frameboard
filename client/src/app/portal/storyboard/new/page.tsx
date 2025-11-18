"use client"

import { useState } from 'react'
import PortalHeader from "@/app/components/portal/portal-header"

interface StoryboardScene {
  scene: string
  visualDescription: string
  imageUrl?: string | null
}

export default function NewStoryboardPage() {
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [storyboard, setStoryboard] = useState<{ scenes: StoryboardScene[], generatedAt: Date } | null>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setStoryboard(null)

    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/storyboard/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ script }),
      })

      if (!res.ok) {
        let errBody: any = null
        try { errBody = await res.json() } catch (_) { /* ignore */ }
        const msg = errBody?.error || errBody?.message || `Server error (${res.status})`
        throw new Error(msg)
      }

      const data = await res.json()
      setStoryboard(data.storyboard)
    } catch (err: any) {
      setError(err.message || 'Failed to generate storyboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PortalHeader />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Generate Storyboard</h1>

        <form onSubmit={handleGenerate} className="mb-8">
          <label className="block mb-2 font-semibold text-lg">Paste your script or scene text</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-64 border border-gray-300 rounded-lg p-4 mb-4 font-mono text-sm"
            placeholder="INT. HOUSE - DAY

A woman walks into a dimly lit kitchen. She pauses at the doorway, her hand on the light switch.

EXT. GARDEN - DAY

Birds chirp in the background as sunlight filters through the trees..."
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !script.trim()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Generating Storyboard...' : 'Generate Storyboard'}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Analyzing script and generating scenes...</p>
          </div>
        )}

        {storyboard && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Generated Storyboard</h2>
            <p className="text-sm text-gray-500 mb-6">
              Generated {storyboard.scenes.length} scene{storyboard.scenes.length !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {storyboard.scenes.map((s, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  {s.imageUrl ? (
                    <div className="relative h-64 bg-gray-100">
                      <img
                        src={s.imageUrl}
                        alt={`Scene ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400 italic">No image generated</p>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="font-bold text-lg mb-2 text-purple-700">
                      Scene {idx + 1}
                    </div>
                    <div className="text-sm text-gray-800 mb-2 font-semibold">
                      {s.scene}
                    </div>
                    <div className="text-sm text-gray-600">
                      {s.visualDescription}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
