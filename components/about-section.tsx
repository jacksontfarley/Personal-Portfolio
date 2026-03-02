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
            <div className="mt-3 h-[2px] w-8 rainbow-gradient rounded-full" />
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
              I&apos;m a marketing strategist with a passion for building brands
              that stand out. With years of experience across digital, content,
              and growth marketing, I help businesses find their voice and reach
              the right audience.
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
              I believe great marketing is invisible -- it feels natural,
              authentic, and inevitable. My approach combines deep audience
              research with creative storytelling, backed by metrics that
              matter. Whether it&apos;s a product launch, a rebrand, or a
              full-funnel campaign, I bring clarity to complexity.
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
                  <span className="font-serif text-3xl rainbow-text md:text-4xl">
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
