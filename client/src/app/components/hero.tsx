"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Label */}
        <div className="mb-8 inline-block">
          <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm tracking-wider">
            PRE PRODUCTION STARTS HERE
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-anton mb-6 leading-tight tracking-tight text-white">
          FRAMEBOARD
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-12 leading-relaxed max-w-3xl">
          Everything you need for film pre-production, in one place–so you can focus on bringing your creative vision to
          life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/get-started">
            <button className="px-8 py-4 bg-yellow-300 border-3 border-black font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              Start for free
            </button>
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-3 border-white text-white font-black text-lg hover:bg-white/20 transition-all duration-300 shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]"
          >
            Compare plans
          </Link>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-10 h-10 text-white opacity-80 hover:opacity-100 transition-opacity" strokeWidth={3} />
        </button>
      </div>

      {/* Gradient fade to content below */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </section>
  )
}