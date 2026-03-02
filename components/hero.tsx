"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-32 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column - text */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              Brand Marketer + Strategist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              <span className="text-balance">
                I craft stories that
                <br />
                <span className="italic">move people</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Building compelling brand narratives and data-driven campaigns
              that connect audiences to the things that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex items-center gap-6"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm tracking-wide text-background transition-all duration-300 hover:opacity-80"
              >
                View Work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#about"
                className="text-sm tracking-wide text-muted-foreground underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
              >
                About Me
              </a>
            </motion.div>
          </div>

          {/* Right column - image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Alex Carter - Marketing Strategist"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-foreground/5" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 hidden items-center gap-3 lg:flex"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-10 w-px bg-border"
          />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  )
}
