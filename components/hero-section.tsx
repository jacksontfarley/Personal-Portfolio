"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            Marketing Strategist
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance font-serif text-5xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              I craft stories that
              <br />
              <span className="italic rainbow-text">move markets</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Blending creativity with data to build brand narratives that
            resonate, campaigns that convert, and strategies that scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-6 pt-4"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:text-muted-foreground"
            >
              View selected work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <div className="h-px w-12 rainbow-gradient" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
