"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback, useEffect } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"

function RainbowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </span>
  )
}

function CoverFlowCard({
  project,
  offset,
  isActive,
}: {
  project: (typeof projects)[0]
  offset: number
  isActive: boolean
}) {
  // offset: 0 = center, negative = left, positive = right
  const clampedOffset = Math.max(-3, Math.min(3, offset))
  const absOffset = Math.abs(clampedOffset)

  // 3D transforms
  const rotateY = clampedOffset * -35
  const translateX = clampedOffset * 280
  const translateZ = -absOffset * 200
  const scale = 1 - absOffset * 0.15
  const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.2
  const zIndex = 10 - absOffset

  return (
    <motion.div
      animate={{
        rotateY,
        x: translateX,
        z: translateZ,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
        mass: 0.8,
      }}
      className="absolute left-1/2 top-0 w-[320px] -ml-[160px] cursor-pointer sm:w-[420px] sm:-ml-[210px] md:w-[520px] md:-ml-[260px]"
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        tabIndex={isActive ? 0 : -1}
      >
        <div
          className={`flex flex-col gap-4 rounded-xl border bg-background p-3 shadow-sm transition-all duration-300 ${
            isActive
              ? "border-transparent shadow-2xl"
              : "border-border shadow-sm"
          }`}
          style={
            isActive
              ? {
                  boxShadow:
                    "0 0 0 1px transparent, 0 25px 60px -12px rgba(0,0,0,0.15), 0 0 30px 2px rgba(255,51,102,0.08), 0 0 30px 2px rgba(0,153,255,0.08)",
                }
              : {}
          }
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
            {isActive && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  backgroundImage:
                    "linear-gradient(270deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
                  backgroundSize: "300% 300%",
                  animation: "rainbow-shift 4s ease infinite",
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 px-1 pb-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                {project.title}
              </h3>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <div className="flex flex-wrap gap-2">
              <RainbowPill>{project.category}</RainbowPill>
              <RainbowPill>{project.year}</RainbowPill>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      // Wrap around
      const wrapped = ((index % projects.length) + projects.length) % projects.length
      setActiveIndex(wrapped)
    },
    []
  )

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev])

  // Touch/swipe support
  const touchStartX = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev()
      else goNext()
    }
  }

  return (
    <section className="py-32 md:py-40" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-16">
          <div id="work" className="scroll-mt-24 grid gap-6 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-4"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Selected Work
              </p>
              <div
                className="mt-3 h-[2px] w-8 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:col-span-8"
            >
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                A curated selection of campaigns and brand projects that
                delivered measurable impact.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Cover Flow Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16"
        style={{ perspective: 1200 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel viewport */}
        <div
          className="relative mx-auto h-[320px] sm:h-[380px] md:h-[440px]"
          style={{ perspectiveOrigin: "50% 50%" }}
        >
          {projects.map((project, i) => {
            const offset = i - activeIndex
            // Only render cards within visible range
            if (Math.abs(offset) > 3) return null

            return (
              <div
                key={project.slug}
                onClick={() => {
                  if (i !== activeIndex) goTo(i)
                }}
              >
                <CoverFlowCard
                  project={project}
                  offset={offset}
                  isActive={i === activeIndex}
                />
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-2 w-2 rounded-full transition-all duration-300"
                aria-label={`Go to project ${i + 1}`}
              >
                {i === activeIndex ? (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : (
                  <div className="absolute inset-0 rounded-full bg-border" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
