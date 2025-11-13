"use client"

import { Film, Clock, Users, MoreVertical, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProjectsOverview() {
  const projects = [
    {
      id: 1,
      title: "Summer Road Trip",
      status: "In Production",
      progress: 65,
      dueDate: "Dec 15, 2024",
      team: 8,
      color: "blue",
    },
    {
      id: 2,
      title: "Documentary: City Life",
      status: "Pre-Production",
      progress: 40,
      dueDate: "Jan 20, 2025",
      team: 5,
      color: "purple",
    },
    {
      id: 3,
      title: "Music Video - Eclipse",
      status: "Planning",
      progress: 15,
      dueDate: "Feb 10, 2025",
      team: 6,
      color: "pink",
    },
  ]

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-anton mb-2 tracking-tight">YOUR PROJECTS</h2>
            <p className="text-gray-600">Manage and track all your film productions</p>
          </div>
          <Link href="/portal/projects/new">
            <button className="px-6 py-3 bg-yellow-300 border-3 border-black font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
              + New Project
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`border-4 border-black bg-${project.color}-50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-${(index + 1) * 100} opacity-0`}
              style={{ boxShadow: "6px 6px 0px rgba(0,0,0,1)" }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${project.color}-400 border-3 border-black rounded-lg flex items-center justify-center`}>
                  <Film className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <button className="p-2 hover:bg-white/50 rounded transition-all duration-200">
                  <MoreVertical className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-anton mb-2 tracking-tight">{project.title}</h3>

              {/* Status Badge */}
              <div className="inline-block px-3 py-1 bg-white border-2 border-black text-xs font-bold mb-4">
                {project.status}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-3 bg-white border-2 border-black">
                  <div
                    className={`h-full bg-${project.color}-500 transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span className="text-xs">{project.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" strokeWidth={2} />
                  <span className="text-xs">{project.team} members</span>
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/portal/projects/${project.id}`}>
                <button className="w-full mt-4 py-2 border-2 border-black font-bold text-sm hover:bg-white transition-all duration-300">
                  Open Project →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
