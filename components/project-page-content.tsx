"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { projects, type Project } from "@/lib/projects"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

/* ── Scroll-based active row ── */
function useActiveRow(rowCount: number) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      rowRefs.current[index] = el
    },
    []
  )

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
      setActiveIndex(closestDist < window.innerHeight * 0.4 ? closest : -1)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [rowCount])

  return { setRef, activeIndex }
}

/* ── Pill Row ── */
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
    <div
      ref={rowRef}
      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
      style={{
        opacity: 0,
        animation: `fadeSlideIn 0.5s ${index * 0.06}s ease forwards`,
      }}
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
              className="pointer-events-none absolute inset-0 rounded-full"
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
            backgroundOrigin: isActive ? "border-box" : undefined,
            backgroundClip: isActive ? "padding-box, border-box" : undefined,
          }}
        >
          {type === "list" && Array.isArray(content) ? (
            <div className="flex flex-col gap-2.5">
              {(content as string[]).map((item, j) => {
                if (item === "") return <div key={j} className="h-2" />
                if (/^\d+\.\s/.test(item)) {
                  return (
                    <p key={j} className="text-sm font-semibold leading-relaxed text-foreground">
                      {item}
                    </p>
                  )
                }
                const colonIdx = item.indexOf(":")
                return (
                  <div key={j} className="flex items-start gap-3 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, #FF3366, #CC33FF)" }}
                    />
                    {colonIdx > -1 ? (
                      <span>
                        <span className="font-semibold text-foreground">{item.slice(0, colonIdx + 1)}</span>
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
            <p className="text-sm leading-relaxed text-muted-foreground">{content as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Dock Icon (desktop) ── */
function DockIcon({ project: p, isCurrent }: { project: Project; isCurrent: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center"
      style={{ zIndex: hovered ? 10 : 1 }}
    >
      {/* Tooltip */}
      <div
        className="pointer-events-none absolute -top-11 left-1/2 z-20 whitespace-nowrap rounded-lg bg-foreground/90 px-3 py-1.5 text-xs font-medium text-background shadow-lg"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? "0px" : "4px"})`,
          transition: "opacity 0.15s, transform 0.15s",
        }}
      >
        {p.title}
        <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-foreground/90" />
      </div>

      <Link href={`/work/${p.slug}`}>
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: 72,
            height: 72,
            transform: hovered ? "scale(1.25)" : "scale(1)",
            transformOrigin: "bottom center",
            transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <Image src={p.dockIcon} alt={p.title} fill className="object-cover" sizes="72px" />
        </div>
      </Link>

      {isCurrent && (
        <div
          className="mt-2 h-1.5 w-1.5 rounded-full"
          style={{ background: RAINBOW, animation: "dockPulse 2s ease-in-out infinite" }}
        />
      )}
    </div>
  )
}

/* ── Dock Icon (mobile grid) ── */
function GridDockIcon({ project: p, isCurrent }: { project: Project; isCurrent: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} className="flex flex-col items-center gap-1.5">
      <div className="relative h-[60px] w-[60px] overflow-hidden rounded-2xl">
        <Image src={p.dockIcon} alt={p.title} fill className="object-cover" sizes="60px" />
      </div>
      {isCurrent && (
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: RAINBOW, animation: "dockPulse 2s ease-in-out infinite" }}
        />
      )}
    </Link>
  )
}

/* ── Rainbow border helper ── */
function RainbowBorder() {
  return (
    <span
      className="pointer-events-none absolute inset-0 rounded-2xl"
      style={{
        padding: "1px",
        background: RAINBOW,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  )
}

/* ── Project Dock ── */
function ProjectDock({ currentSlug }: { currentSlug: string }) {
  return (
    <>
      {/* Desktop (md+) */}
      <div
        className="relative hidden w-full max-w-3xl items-end justify-center gap-6 rounded-2xl px-8 pb-5 pt-8 shadow-lg backdrop-blur-sm md:flex"
        style={{ background: "rgba(255,255,255,0.6)" }}
      >
        <RainbowBorder />
        {projects.map((p) => (
          <DockIcon key={p.slug} project={p} isCurrent={p.slug === currentSlug} />
        ))}
      </div>

      {/* Mobile (<md) — 4-col grid */}
      <div
        className="relative w-full max-w-xs rounded-2xl px-5 py-5 shadow-lg backdrop-blur-sm md:hidden"
        style={{ background: "rgba(255,255,255,0.6)" }}
      >
        <RainbowBorder />
        <div className="grid grid-cols-4 justify-items-center gap-3">
          {projects.map((p) => (
            <GridDockIcon key={p.slug} project={p} isCurrent={p.slug === currentSlug} />
          ))}
        </div>
      </div>
    </>
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

const DONT_STOP_CHARS = "DON'T STOP NOW!".split("")

export function ProjectPageContent({ project }: { project: Project }) {
  const { setRef, activeIndex } = useActiveRow(PILL_ROWS.length)

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="px-6 pb-8 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl" style={{ animation: "fadeSlideIn 0.6s ease forwards" }}>
          <Link
            href="/#work"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all work
          </Link>

          <h1 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {[project.category, project.year].map((tag) => (
              <span key={tag} className="relative rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "1px",
                    background: RAINBOW,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6" style={{ opacity: 0, animation: "fadeSlideIn 0.8s 0.2s ease forwards" }}>
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[16/5] overflow-hidden rounded-xl bg-secondary">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
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

          <div className="flex justify-end pt-4" style={{ opacity: 0, animation: "fadeSlideIn 0.5s 0.4s ease forwards" }}>
            <Image
              src="/Smiley.PNG"
              alt=""
              width={48}
              height={48}
              className="rotate-[15deg] opacity-75"
              style={{ width: 48, height: 48 }}
            />
          </div>
        </div>
      </section>

      {/* Dock */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            {/* Swimming text */}
            <p className="mb-8 flex gap-[2px] text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {DONT_STOP_CHARS.map((char, i) => (
                <span
                  key={i}
                  style={{ display: "inline-block", animation: `wave 1.4s ${i * 0.08}s ease-in-out infinite` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>
            <ProjectDock currentSlug={project.slug} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
