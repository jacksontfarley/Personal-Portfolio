"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ResumePill } from "./resume-pill"

interface SkillCategory {
  category: string
  items: string[]
}

const skills: SkillCategory[] = [
  {
    category: "Strategy",
    items: [
      "Market Research",
      "Consumer Insights",
      "Campaign Strategy",
      "Brand Positioning",
      "Performance Marketing",
      "Data Analysis",
      "Competitive Analysis",
    ],
  },
  {
    category: "Commercial",
    items: [
      "Budget Management",
      "Vendor Relations",
      "Negotiation",
      "Project Management",
      "Stakeholder Management",
      "Cross-functional Leadership",
      "Agile Methodologies",
    ],
  },
  {
    category: "Creative",
    items: [
      "Content Development",
      "Campaign Concepting",
      "Brand Storytelling",
      "Creative Direction",
      "Social Media Strategy",
      "Visual Communication",
      "Copywriting",
    ],
  },
]

/* ─── Minimalist Skills Reveal ─── */
function SkillsReveal({
  isInView,
  innerRef,
}: {
  isInView: boolean
  innerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div
      id="skills"
      className="mx-auto mt-32 max-w-6xl scroll-mt-24 md:mt-40"
      ref={innerRef}
    >
      {/* Left label + rainbow line (desktop only) */}
      <div className="mb-12 hidden md:grid md:grid-cols-12 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Skills
          </p>
          <div
            className="mt-3 h-[2px] w-8 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
            }}
          />
        </motion.div>
      </div>

      {/* Desktop — hover reveal */}
      <div className="hidden md:flex md:items-start md:justify-center md:gap-16 lg:gap-24">
        {skills.map((skill, i) => {
          const isActive = hoveredIndex === i
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i

          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Rainbow accent line above — only visible on active */}
              <motion.div
                className="mb-4 h-[2px] w-12 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Category header */}
              <motion.h3
                className="cursor-default text-center font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl"
                animate={{ opacity: isDimmed ? 0.3 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {skill.category}
              </motion.h3>

              {/* Skill tags cloud — fades in on hover */}
              <motion.div
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 8,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: isActive ? "auto" : "none", minHeight: 80 }}
              >
                {skill.items.map((item, j) => (
                  <motion.span
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: isActive ? j * 0.04 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile — accordion tiles */}
      <div className="flex flex-col gap-4 md:hidden">
        {skills.map((skill, i) => {
          const isOpen = expandedIndex === i

          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <button
                onClick={() => setExpandedIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <h3 className="font-serif text-xl font-normal tracking-tight text-foreground">
                  {skill.category}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg text-muted-foreground"
                >
                  +
                </motion.span>
              </button>

              {/* Rainbow line under header when open */}
              <motion.div
                className="mx-6 h-[2px] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  transformOrigin: "left",
                }}
              />

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 px-6 pb-6 pt-4">
                      {skill.items.map((item, j) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.25,
                            delay: j * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="px-6 py-20 md:py-24">
      {/* Skills — Interactive Reveal */}
      <SkillsReveal isInView={isInView} innerRef={ref} />

      {/* Resume CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-8 pt-8"
      >
        <div className="flex gap-[2px] text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {"GRAB A SOUVENIR".split("").map((char, i) => (
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
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ResumePill href="/Jackson-Farley-2026.pdf" label="Resume" />
          <ResumePill href="/Jackson-Farley-2026-Long-Form.pdf" label="Resume, But Longer" />
        </div>
      </motion.div>
    </section>
  )
}
