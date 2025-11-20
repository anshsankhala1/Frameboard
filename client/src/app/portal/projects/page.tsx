"use client"

import { useState, useEffect } from 'react'
import PortalHeader from "@/app/components/portal/portal-header"
import { FileText, Film, Sparkles, Download, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { jsPDF } from 'jspdf'

interface Project {
  id: string
  title: string
  type: 'callsheet' | 'storyboard' | 'ai_conversation'
  createdAt: string
  updatedAt: string
  data: any
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'callsheet' | 'storyboard' | 'ai_conversation'>('all')

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      setLoading(true)
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to delete project')

      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  function downloadCallSheet(project: Project) {
    if (project.type !== 'callsheet' || !project.data.excelData) return

    const byteCharacters = atob(project.data.excelData)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = project.data.filename || 'callsheet.xlsx'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  async function downloadStoryboardPDF(project: Project) {
    if (project.type !== 'storyboard') return

    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      const contentWidth = pageWidth - (margin * 2)

      // Title page
      pdf.setFontSize(24)
      pdf.text(project.title, pageWidth / 2, 30, { align: 'center' })
      pdf.setFontSize(12)
      pdf.text('Storyboard', pageWidth / 2, 40, { align: 'center' })
      pdf.setFontSize(10)
      pdf.text(`Generated: ${new Date(project.createdAt).toLocaleDateString()}`, pageWidth / 2, 50, { align: 'center' })

      // Add scenes
      if (project.data.scenes && project.data.scenes.length > 0) {
        for (let i = 0; i < project.data.scenes.length; i++) {
          const scene = project.data.scenes[i]

          pdf.addPage()

          // Scene number and title
          pdf.setFontSize(16)
          pdf.text(`Scene ${i + 1}`, margin, 20)

          pdf.setFontSize(12)
          const sceneLines = pdf.splitTextToSize(scene.scene, contentWidth)
          pdf.text(sceneLines, margin, 30)

          let yPos = 30 + (sceneLines.length * 6)

          // Visual description
          pdf.setFontSize(10)
          pdf.text('Visual Description:', margin, yPos + 10)
          const descLines = pdf.splitTextToSize(scene.visualDescription, contentWidth)
          pdf.text(descLines, margin, yPos + 18)

          yPos += 18 + (descLines.length * 5)

          // Add image if available
          if (scene.imageUrl) {
            try {
              const img = new Image()
              // Don't set crossOrigin for data URLs or if not needed
              if (!scene.imageUrl.startsWith('data:')) {
                img.crossOrigin = 'anonymous'
              }

              await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = (e) => {
                  console.error('Image load error:', { url: scene.imageUrl, error: e })
                  reject(new Error(`Failed to load image from ${scene.imageUrl}`))
                }
                img.src = scene.imageUrl
              })

              // Calculate image dimensions to fit on page
              const imgWidth = contentWidth
              const imgHeight = (img.height / img.width) * imgWidth
              const maxImgHeight = pageHeight - yPos - margin - 20

              if (imgHeight > maxImgHeight) {
                const scale = maxImgHeight / imgHeight
                pdf.addImage(img, 'JPEG', margin, yPos + 10, imgWidth * scale, maxImgHeight)
              } else {
                pdf.addImage(img, 'JPEG', margin, yPos + 10, imgWidth, imgHeight)
              }
            } catch (err) {
              console.error('Error loading image:', err)
              pdf.setFontSize(9)
              pdf.setTextColor(150, 150, 150)
              pdf.text('[Image could not be loaded]', margin, yPos + 10)
              pdf.setTextColor(0, 0, 0)
            }
          }
        }
      }

      // Save the PDF
      pdf.save(`${project.title.replace(/[^a-z0-9]/gi, '_')}_storyboard.pdf`)
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter)

  const getIcon = (type: string) => {
    switch (type) {
      case 'callsheet': return FileText
      case 'storyboard': return Film
      case 'ai_conversation': return Sparkles
      default: return FileText
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'callsheet': return 'red'
      case 'storyboard': return 'purple'
      case 'ai_conversation': return 'pink'
      default: return 'gray'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'callsheet': return 'Call Sheet'
      case 'storyboard': return 'Storyboard'
      case 'ai_conversation': return 'AI Conversation'
      default: return type
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PortalHeader />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-gray-600">All your generated call sheets, storyboards, and AI conversations</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 border-2 border-black font-semibold transition-all ${
              filter === 'all' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
            }`}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,1)" }}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter('callsheet')}
            className={`px-4 py-2 border-2 border-black font-semibold transition-all ${
              filter === 'callsheet' ? 'bg-red-500 text-white border-red-600' : 'bg-white hover:bg-red-50'
            }`}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,1)" }}
          >
            Call Sheets ({projects.filter(p => p.type === 'callsheet').length})
          </button>
          <button
            onClick={() => setFilter('storyboard')}
            className={`px-4 py-2 border-2 border-black font-semibold transition-all ${
              filter === 'storyboard' ? 'bg-purple-500 text-white border-purple-600' : 'bg-white hover:bg-purple-50'
            }`}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,1)" }}
          >
            Storyboards ({projects.filter(p => p.type === 'storyboard').length})
          </button>
          <button
            onClick={() => setFilter('ai_conversation')}
            className={`px-4 py-2 border-2 border-black font-semibold transition-all ${
              filter === 'ai_conversation' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white hover:bg-pink-50'
            }`}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,1)" }}
          >
            AI Conversations ({projects.filter(p => p.type === 'ai_conversation').length})
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading projects...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-gray-600 mb-4">No projects found</div>
            <div className="text-sm text-gray-500">Create a call sheet, storyboard, or have an AI conversation to get started!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => {
              const Icon = getIcon(project.type)
              const color = getColor(project.type)

              return (
                <div
                  key={project.id}
                  className="border-3 border-black bg-white p-4 hover:scale-102 transition-all"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 bg-${color}-400 border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{project.title}</h3>
                      <p className="text-sm text-gray-600">{getTypeLabel(project.type)}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    {project.type === 'callsheet' && project.data.excelData && (
                      <button
                        onClick={() => downloadCallSheet(project)}
                        className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-semibold rounded border-2 border-green-600 hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}

                    {project.type === 'storyboard' && (
                      <>
                        <button
                          onClick={() => downloadStoryboardPDF(project)}
                          className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-semibold rounded border-2 border-green-600 hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          PDF
                        </button>
                        <Link href={`/portal/projects/${project.id}`} className="flex-1">
                          <button className="w-full px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded border-2 border-blue-600 hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </Link>
                      </>
                    )}

                    {project.type === 'ai_conversation' && (
                      <Link href={`/portal/projects/${project.id}`} className="flex-1">
                        <button className="w-full px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded border-2 border-blue-600 hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </Link>
                    )}

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded border-2 border-red-600 hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
