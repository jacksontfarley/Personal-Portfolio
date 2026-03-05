"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRef, useState, useCallback } from "react"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"
const CONFETTI_COLORS = ["#FF3366", "#FF6B35", "#FFCC00", "#00D4AA", "#0099FF", "#CC33FF"]

function InteractiveSmiley() {
  const [isHovered, setIsHovered] = useState(false)
  const [clickSpin, setClickSpin] = useState(0)
  const [isRainbow, setIsRainbow] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; x: number; y: number; color: string; rotation: number; scale: number }[]
  >([])

  const handleClick = useCallback(() => {
    const pieces = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: -(Math.random() * 80 + 30),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.6 + 0.4,
    }))
    setConfettiPieces(pieces)
    setTimeout(() => setConfettiPieces([]), 1000)

    setClickSpin((prev) => prev + 360)

    setIsRainbow(true)
    setTimeout(() => setIsRainbow(false), 600)
  }, [])

  return (
    <div
      className="relative inline-flex cursor-pointer items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <AnimatePresence>
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{ x: piece.x, y: piece.y, opacity: 0, scale: piece.scale, rotate: piece.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full"
            style={{ width: 6, height: 6, backgroundColor: piece.color }}
          />
        ))}
      </AnimatePresence>
      <motion.div
        animate={{ rotate: isHovered ? clickSpin + 360 : clickSpin }}
        transition={
          clickSpin > 0 && !isHovered
            ? { type: "spring", stiffness: 300, damping: 15 }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/Smiley.PNG"
          alt=""
          width={80}
          height={80}
          className="h-auto w-auto transition-all duration-300"
          style={{
            maxHeight: "1.2em",
            width: "auto",
            filter: isRainbow
              ? "hue-rotate(90deg) saturate(2) brightness(1.1)"
              : "none",
          }}
        />
      </motion.div>
    </div>
  )
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jackson-farley/", external: true },
  { label: "Email", href: "mailto:hello@jacksonfarley.me", external: false },
]

function ContactPill({ label, href, external }: { label: string; href: string; external: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
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
            padding: "2px",
            background: RAINBOW,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {label}
    </a>
  )
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="px-6 py-4 md:py-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Floating heading */}
          <div className="flex gap-[2px] text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {"DON'T BE A STRANGER".split("").map((char, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Pill links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socials.map((social) => (
              <ContactPill
                key={social.label}
                label={social.label}
                href={social.href}
                external={social.external}
              />
            ))}
          </div>

          {/* Smiley */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <InteractiveSmiley />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
