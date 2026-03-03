"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

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
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* Hero: name left, photo right */}
        <div className="flex flex-1 items-center justify-center px-6">
          <motion.div
            style={{ opacity, scale, y }}
            className="mx-auto w-full max-w-6xl"
          >
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 text-center md:items-start md:text-left"
              >
                <p className="font-serif text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                  Hello, I&apos;m{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Jackson Farley
                  </span>
                </p>
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/Smiley.PNG"
                    alt="Smiley"
                    width={80}
                    height={80}
                    className="h-auto w-auto"
                    style={{ maxHeight: "1.2em", width: "auto" }}
                  />
                </div>
              </motion.div>

              {/* Photo side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-48 flex-shrink-0 sm:w-56 md:w-64 lg:w-72"
              >
                <Image
                  src="/JF_headshot.png"
                  alt="Jackson Farley"
                  width={400}
                  height={400}
                  className="h-auto w-full"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative rainbow gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "linear-gradient(135deg, #0099FF, #CC33FF, #FF3366, #FFCC00)" }}
        />
      </div>
    </section>
  )
}
