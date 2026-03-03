"use client"

import { motion, useInView, useAnimationControls } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"

// Split projects into two rows
const row1 = projects.slice(0, 4)
const row2 = projects.slice(4, 8)

function MarqueeCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block w-[360px] flex-shrink-0 sm:w-[420px] md:w-[480px]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex flex-col gap-4 rounded-xl border border-border bg-background p-3 shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative aspect-[16/5] overflow-hidden rounded-lg bg-secondary">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
              backgroundSize: "300% 300%",
              animation: "rainbow-shift 4s ease infinite",
            }}
          />
        </div>

        <div className="flex flex-col gap-3 px-1 pb-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
              {project.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <div className="flex flex-wrap gap-2">
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
              {project.category}
            </span>
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
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function MarqueeRow({
  items,
  direction = "left",
  isInView,
}: {
  items: (typeof projects)
  direction?: "left" | "right"
  isInView: boolean
}) {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimationControls()

  // Each card is ~480px + 24px gap = 504px, 4 cards per set = 2016px
  // We duplicate items 3x to ensure seamless loop
  const duplicated = [...items, ...items, ...items]
  const setWidth = items.length * 504

  useEffect(() => {
    if (!isInView) return

    const animate = () => {
      if (direction === "left") {
        controls.start({
          x: [-setWidth, 0],
          transition: {
            x: {
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          },
        })
      } else {
        controls.start({
          x: [0, -setWidth],
          transition: {
            x: {
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          },
        })
      }
    }

    if (!isPaused) {
      animate()
    } else {
      controls.stop()
    }
  }, [isInView, isPaused, controls, direction, setWidth])

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={controls}
        style={{ width: "max-content" }}
      >
        {duplicated.map((project, i) => (
          <MarqueeCard key={`${project.slug}-${i}`} project={project} />
        ))}
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

      {/* Full-bleed marquee rows */}
      <div className="mt-16 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <MarqueeRow items={row1} direction="left" isInView={isInView} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <MarqueeRow items={row2} direction="right" isInView={isInView} />
        </motion.div>
      </div>
    </section>
  )
}
