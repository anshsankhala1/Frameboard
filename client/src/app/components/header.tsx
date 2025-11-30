"use client"

import Link from "next/link"
import FrameboardLogo from "./FrameboardLogo"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // On homepage, start transparent and become solid on scroll
  const headerClasses = isHomePage
    ? scrolled
      ? "bg-white/95 backdrop-blur-md border-b-4 border-blue-500 shadow-lg"
      : "bg-transparent border-b-2 border-white/20"
    : "bg-white border-b-4 border-blue-500"

  const textClasses = isHomePage && !scrolled ? "text-white" : "text-black"
  const linkHoverClasses = isHomePage && !scrolled ? "hover:text-yellow-300" : "hover:text-blue-600"

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <FrameboardLogo className={`w-8 h-8 ${isHomePage && !scrolled ? 'text-white' : ''}`} />
          <span className={`text-2xl font-anton tracking-wide ${textClasses}`}>FRAMEBOARD</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/features" className={`font-semibold text-base hover:-translate-y-0.5 transition-all duration-300 ${textClasses} ${linkHoverClasses}`}>
            Features
          </Link>
          <Link href="/about" className={`font-semibold text-base hover:-translate-y-0.5 transition-all duration-300 ${textClasses} ${linkHoverClasses}`}>
            About
          </Link>
          <Link href="/pricing" className={`font-semibold text-base hover:-translate-y-0.5 transition-all duration-300 ${textClasses} ${linkHoverClasses}`}>
            Pricing
          </Link>
          <Link href="/portal" className={`font-semibold text-base hover:-translate-y-0.5 transition-all duration-300 ${textClasses} ${linkHoverClasses}`}>
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
      {/* Dashed line separator - only show when not on homepage or when scrolled */}
      {(!isHomePage || scrolled) && (
        <div className="border-t-2 border-dashed border-blue-400"></div>
      )}
    </header>
  )
}
