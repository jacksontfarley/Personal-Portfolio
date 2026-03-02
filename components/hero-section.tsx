"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            Marketing Strategist
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance font-serif text-5xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              I craft stories that
              <br />
              <span className="italic text-muted-foreground">move markets</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Blending creativity with data to build brand narratives that
            resonate, campaigns that convert, and strategies that scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-6 pt-4"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:text-accent"
            >
              View selected work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-border pt-2"
        >
          <motion.div className="h-1.5 w-1 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
