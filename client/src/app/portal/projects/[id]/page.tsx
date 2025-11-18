"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PortalHeader from "@/app/components/portal/portal-header"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  type: 'callsheet' | 'storyboard' | 'ai_conversation'
  createdAt: string
  updatedAt: string
  data: any
}

export default function ProjectViewPage() {
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string)
    }
  }, [params.id])

  async function fetchProject(id: string) {
    try {
      setLoading(true)
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch project')
      const data = await res.json()
      setProject(data.project)
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Failed to load project')
      router.push('/portal/projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <PortalHeader />
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">Loading project...</div>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-white">
        <PortalHeader />
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">Project not found</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <PortalHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <Link href="/portal/projects" className="inline-flex items-center gap-2 mb-6 text-black hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-gray-600">
            {project.type === 'storyboard' && 'Storyboard'}
            {project.type === 'ai_conversation' && 'AI Conversation'}
            {project.type === 'callsheet' && 'Call Sheet'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(project.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Storyboard View */}
        {project.type === 'storyboard' && project.data.scenes && (
          <div className="space-y-6">
            {project.data.scenes.map((scene: any, index: number) => (
              <div
                key={index}
                className="border-3 border-black bg-white p-6"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
              >
                <div className="flex items-start gap-6">
                  {scene.imageUrl && (
                    <img
                      src={scene.imageUrl}
                      alt={`Scene ${scene.sceneNumber}`}
                      className="w-64 h-48 object-cover border-2 border-black"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Scene {scene.sceneNumber}</h3>
                    <p className="text-gray-700 mb-4">{scene.description}</p>
                    {scene.shotType && (
                      <p className="text-sm text-gray-600"><strong>Shot:</strong> {scene.shotType}</p>
                    )}
                    {scene.duration && (
                      <p className="text-sm text-gray-600"><strong>Duration:</strong> {scene.duration}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Conversation View */}
        {project.type === 'ai_conversation' && project.data.messages && (
          <div className="space-y-4">
            {project.data.messages.map((message: any, index: number) => (
              <div
                key={index}
                className={`p-4 border-2 border-black ${
                  message.role === 'user' ? 'bg-blue-50 ml-12' : 'bg-gray-50 mr-12'
                }`}
                style={{ boxShadow: "2px 2px 0px rgba(0,0,0,1)" }}
              >
                <div className="font-bold mb-2">
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
          </div>
        )}

        {/* Call Sheet View (shouldn't reach here but just in case) */}
        {project.type === 'callsheet' && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600 mb-4">Call sheets are available for download from the projects list</p>
            <Link href="/portal/projects" className="text-blue-600 hover:underline">
              Go to Projects
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
