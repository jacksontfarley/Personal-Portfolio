import { useState } from "react"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

export function ResumePill({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      download
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300"
      style={{
        background: hovered ? RAINBOW : "var(--background)",
        color: hovered ? "#fff" : "var(--foreground)",
      }}
    >
      {!hovered && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: RAINBOW,
            WebkitMaskImage: `linear-gradient(90deg, transparent, transparent 40%, rgb(0,0,0), rgb(0,0,0) 60%, transparent, transparent)`,
            maskImage: `linear-gradient(90deg, transparent, transparent 40%, rgb(0,0,0), rgb(0,0,0) 60%, transparent, transparent)`,
          }}
        />
      )}
      {label}
    </a>
  )
}
