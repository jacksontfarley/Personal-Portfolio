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
              people&apos;s lives better. My approach blends analytics and
              creativity, translating unique insights into compelling brand
              experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              My non-traditional path from elementary education, to B2B client
              success, to CPG brand management gives me 8+ years of unique
              perspectives, with a red thread of authentic storytelling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Through all my experiences, I&apos;ve learned how to connect the
              10,000-foot strategy with the 1-inch execution. I bring a
              relentless focus and a fresh POV to tackle gnarly business
              challenges with enthusiasm and agility.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              And most importantly, I believe in bringing more voices to the
              table, because the most impactful ideas are built on genuine human
              connection.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
