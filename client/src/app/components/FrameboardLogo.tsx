import Image from 'next/image'

export default function FrameboardLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <Image
      src="/frameboard-logo.png"
      alt="Frameboard Logo"
      width={32}
      height={32}
      className={className}
      priority
    />
  )
}
