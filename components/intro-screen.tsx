"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function IntroScreen() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -40])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="flex flex-col items-center gap-6 px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Hello, I&apos;m{" "}
            <span className="rainbow-text">Jackson Farley</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Scroll
              </span>
              <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border pt-2">
                <motion.div className="h-1.5 w-1 rounded-full rainbow-gradient-animated" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative rainbow gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full rainbow-gradient-animated blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full rainbow-gradient-animated blur-[120px]"
        />
      </div>
    </section>
  )
}
