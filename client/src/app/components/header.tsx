"use client"

import { CalendarIcon } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b-4 border-blue-500 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <CalendarIcon className="w-8 h-8" strokeWidth={3} />
          <span className="text-2xl font-anton tracking-wide">FRAMEBOARD</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/features" className="font-semibold text-base hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300">
            Features
          </Link>
          <Link href="/about" className="font-semibold text-base hover:text-purple-600 hover:-translate-y-0.5 transition-all duration-300">
            About
          </Link>
          <Link href="/pricing" className="font-semibold text-base hover:text-pink-600 hover:-translate-y-0.5 transition-all duration-300">
            Pricing
          </Link>
          <Link href="/portal" className="font-semibold text-base hover:text-green-600 hover:-translate-y-0.5 transition-all duration-300">
            Portal
          </Link>

          {/* Get Started Button */}
          <Link href="/get-started">
            <button className="px-6 py-3 bg-yellow-300 border-3 border-black font-bold text-black hover:bg-yellow-400 hover:scale-105 hover:shadow-lg transition-all duration-300">
              Get Started
            </button>
          </Link>
        </nav>
      </div>
      {/* Dashed line separator */}
      <div className="border-t-2 border-dashed border-blue-400"></div>
    </header>
  )
}
