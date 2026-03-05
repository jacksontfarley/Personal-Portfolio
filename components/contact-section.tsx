"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

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
    <section id="contact" className="px-6 py-8 md:py-10" ref={ref}>
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
        </motion.div>
      </div>
    </section>
  )
}
