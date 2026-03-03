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
            <ul className="flex flex-col gap-2.5">
              {(content as string[]).map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FF3366, #CC33FF)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
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
  { label: "The Objective", key: "objective", type: "text" as const },
  { label: "The Role", key: "role", type: "text" as const },
  { label: "The Challenge", key: "challenge", type: "text" as const },
  { label: "The Actions", key: "actions", type: "list" as const },
  { label: "The Impact", key: "impact", type: "list" as const },
  { label: "The Takeaway", key: "takeaway", type: "text" as const },
]

export function ProjectPageContent({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
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

            {/* No tags section */}
          </div>
        </div>
      </section>

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

      {/* Next Project */}
      <section className="border-t border-border px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Next Project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex items-center justify-between"
            >
              <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground transition-colors duration-300 group-hover:text-muted-foreground sm:text-4xl md:text-5xl">
                {nextProject.title}
              </h2>
              <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:h-8 md:w-8" />
            </Link>
            <div
              className="mt-4 h-[2px] w-full rounded-full opacity-30"
              style={{ background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
