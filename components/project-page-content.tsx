"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { projects, type Project } from "@/lib/projects"

export function ProjectPageContent({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
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
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {project.category}
                </span>
                <span className="text-xs text-border">{"/"}</span>
                <span className="text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <h1 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 md:col-span-4 md:items-end md:justify-end"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rainbow-border rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-secondary">
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

      {/* Content */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Overview
              </p>
              <div
                className="mt-3 mb-8 h-[2px] w-8 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
              />
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Key Results
              </p>
              <div
                className="mt-3 mb-8 h-[2px] w-8 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
              />
              <ul className="flex flex-col gap-5">
                {project.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, #FF3366, #CC33FF)" }}
                    />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
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
