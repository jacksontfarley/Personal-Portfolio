"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { projects, type Project } from "@/lib/projects"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

function useActiveRow(rowCount: number) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const setRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    rowRefs.current[index] = el
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2
      let closest = -1
      let closestDist = Infinity

      for (let i = 0; i < rowCount; i++) {
        const el = rowRefs.current[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const elCenter = rect.top + rect.height / 2
        const dist = Math.abs(elCenter - center)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      }

      // Only highlight if the closest row is reasonably near viewport center
      if (closestDist < window.innerHeight * 0.4) {
        setActiveIndex(closest)
      } else {
        setActiveIndex(-1)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [rowCount])

  return { setRef, activeIndex }
}

function PillRow({
  label,
  content,
  type,
  index,
  isActive,
  rowRef,
}: {
  label: string
  content: string | string[]
  type: "text" | "list"
  index: number
  isActive: boolean
  rowRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
    >
      {/* Label pill */}
      <div className="w-40 flex-shrink-0">
        <div
          className="relative inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-500"
          style={{
            background: isActive ? RAINBOW : "var(--background)",
            color: isActive ? "#fff" : "var(--foreground)",
          }}
        >
          {!isActive && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
              style={{
                padding: "1px",
                background: RAINBOW,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          )}
          {label}
        </div>
      </div>

      {/* Content pill */}
      <div className="flex-1">
        <div
          className="rounded-2xl bg-white px-6 py-4 transition-all duration-500"
          style={{
            border: isActive ? "1.5px solid transparent" : "1px solid #e2e8f0",
            backgroundImage: isActive
              ? `linear-gradient(white, white), ${RAINBOW}`
              : "none",
            backgroundOrigin: "border-box",
            backgroundClip: isActive ? "padding-box, border-box" : "border-box",
          }}
        >
          {type === "list" && Array.isArray(content) ? (
            <div className="flex flex-col gap-2.5">
              {(content as string[]).map((item, j) => {
                // Empty string = spacer between sections
                if (item === "") return <div key={j} className="h-2" />

                // Numbered header (e.g. "1. Cultural Arbitrage...")
                if (/^\d+\.\s/.test(item)) {
                  return (
                    <p key={j} className="text-sm font-semibold leading-relaxed text-foreground">
                      {item}
                    </p>
                  )
                }

                // Regular sub-bullet with bold label before colon
                const colonIdx = item.indexOf(":")
                return (
                  <div
                    key={j}
                    className="flex items-start gap-3 pl-5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #FF3366, #CC33FF)",
                      }}
                    />
                    {colonIdx > -1 ? (
                      <span>
                        <span className="font-semibold text-foreground">
                          {item.slice(0, colonIdx + 1)}
                        </span>
                        {item.slice(colonIdx + 1)}
                      </span>
                    ) : (
                      item
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content as string}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const PILL_ROWS = [
  { label: "Challenge", key: "challenge", type: "text" as const },
  { label: "Objective", key: "objective", type: "text" as const },
  { label: "Role", key: "role", type: "text" as const },
  { label: "Actions", key: "actions", type: "list" as const },
  { label: "Impact", key: "impact", type: "list" as const },
  { label: "Takeaway", key: "takeaway", type: "text" as const },
]

export function ProjectPageContent({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const isComingSoon = project.slug === "photography-portfolio"
  const { setRef, activeIndex } = useActiveRow(PILL_ROWS.length)

  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="px-6 pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/#work"
              className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all work
            </Link>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-8"
            >
              <h1 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="relative rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      padding: "1px",
                      background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  {project.category}
                </span>
                <span className="relative rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      padding: "1px",
                      background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  {project.year}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isComingSoon ? (
        /* ── Coming Soon ── */
        <section className="px-6 py-24 md:py-40">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <h2
                className="text-balance font-serif text-5xl font-normal leading-[1.1] tracking-tight sm:text-6xl md:text-8xl"
                style={{
                  background: RAINBOW,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Coming Soon
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                This project is currently being curated. Check back soon.
              </p>
              <div
                className="mt-4 h-[2px] w-32 rounded-full"
                style={{ background: RAINBOW }}
              />
            </motion.div>
          </div>
        </section>
      ) : (
        <>
          {/* Image */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="px-6"
          >
            <div className="mx-auto max-w-6xl">
              <div className="relative aspect-[16/5] overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Rainbow bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  }}
                />
              </div>
            </div>
          </motion.section>

          {/* Content — Pill Row Layout */}
          <section className="px-6 py-12 md:py-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-5">
              {PILL_ROWS.map((row, i) => (
                <PillRow
                  key={row.label}
                  label={row.label}
                  content={project[row.key as keyof Project] as string | string[]}
                  type={row.type}
                  index={i}
                  isActive={activeIndex === i}
                  rowRef={setRef(i)}
                />
              ))}

              {/* Smiley stamp */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-end pt-4"
              >
                <Image
                  src="/Smiley.PNG"
                  alt=""
                  width={48}
                  height={48}
                  className="rotate-[15deg] opacity-75"
                  style={{ width: 48, height: 48 }}
                />
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Horizontal Project Navigator */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mb-6 px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            More Work
          </p>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((p) => {
            const isCurrent = p.slug === project.slug
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group relative flex w-[280px] flex-none snap-start flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 transition-opacity duration-300"
                style={{ opacity: isCurrent ? 1 : 0.6 }}
                onMouseEnter={(e) => { if (!isCurrent) (e.currentTarget as HTMLElement).style.opacity = "1" }}
                onMouseLeave={(e) => { if (!isCurrent) (e.currentTarget as HTMLElement).style.opacity = "0.6" }}
              >
                {/* Title + category */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-balance font-serif text-xl font-normal leading-snug tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground">
                    {p.category}
                  </p>
                </div>

                {/* Year */}
                <p className="mt-6 text-xs tracking-wide text-muted-foreground">
                  {p.year}
                </p>

                {/* Rainbow accent line — active only */}
                {isCurrent && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: RAINBOW }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
