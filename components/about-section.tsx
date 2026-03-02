"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="px-6 py-32 md:py-40" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              About
            </p>
            <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
          </motion.div>

          <div className="flex flex-col gap-8 md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-pretty font-serif text-2xl leading-relaxed text-foreground md:text-3xl"
            >
              I&apos;m a brand marketer driven by a passion for making
              people&apos;s lives better. My approach pairs a highly analytical
              foundation with a consumer-first lens, translating complex market
              signals into compelling brand experiences that resonate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              I believe in the power of authenticity. Throughout my experiences
              in classroom teaching, B2B client partnership, and brand management, my north
              star remains the same: bringing more voices to the table with a
              relentless obsession for the consumer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-2 gap-8 pt-8 sm:grid-cols-3"
            >
              {[
                { number: "8+", label: "Years Experience" },
                { number: "40+", label: "Brands Served" },
                { number: "3x", label: "Avg. ROI Increase" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span
                    className="font-serif text-3xl md:text-4xl"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
