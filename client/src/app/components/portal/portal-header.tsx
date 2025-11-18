"use client"

import { Bell, Settings, User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/app/contexts/AuthContext"
import FrameboardLogo from "../FrameboardLogo"

export default function PortalHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/signin'
  }

  return (
    <header className="border-b-4 border-blue-500 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/portal" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <FrameboardLogo className="w-8 h-8" />
          <span className="text-2xl font-anton tracking-wide">FRAMEBOARD</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/portal/projects"
            className="font-semibold text-base hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Projects
          </Link>
          <Link
            href="/portal/storyboard/new"
            className="font-semibold text-base hover:text-pink-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Storyboard
          </Link>
          <Link
            href="/portal/callsheet"
            className="font-semibold text-base hover:text-red-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Call Sheets
          </Link>
          <Link
            href="/portal/ai"
            className="font-semibold text-base hover:text-purple-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            AI Assistant
          </Link>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110">
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-8 h-8 bg-blue-500 border-2 border-black rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="font-semibold text-sm">{user?.name || 'User'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white border-3 border-black animate-scale-in"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
              >
                <div className="p-3 border-b-2 border-gray-200">
                  <div className="font-bold text-sm">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-600">{user?.email || ''}</div>
                </div>

                <Link
                  href="/portal/settings"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-200"
                >
                  <Settings className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-semibold">Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all duration-200 border-t-2 border-gray-200 text-left"
                >
                  <LogOut className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-semibold">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* Dashed line separator */}
      <div className="border-t-2 border-dashed border-blue-400"></div>
    </header>
  )
}
