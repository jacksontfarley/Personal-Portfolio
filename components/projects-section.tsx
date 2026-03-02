"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link href={`/work/${project.slug}`} className="flex flex-col gap-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-secondary">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
          {/* Rainbow line accent on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage: "linear-gradient(270deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
              backgroundSize: "300% 300%",
              animation: "rainbow-shift 4s ease infinite",
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {project.category}
              </span>
              <span className="text-xs text-border">{"/"}</span>
              <span className="text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rainbow-border rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="work" className="px-6 py-32 md:py-40" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-16">
          <div className="grid gap-6 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-4"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Selected Work
              </p>
              <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
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

          <div className="grid gap-12 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
