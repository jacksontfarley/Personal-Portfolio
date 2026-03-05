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
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden relative">
        {/* Centered name */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            style={{ opacity, scale, y }}
            className="px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
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
              <Image
                src="/Smiley.PNG"
                alt="Smiley"
                width={80}
                height={80}
                className="h-auto w-auto"
                style={{ maxHeight: "1.2em", width: "auto" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator pinned near bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ opacity }}
          className="flex justify-center pb-12"
        >
          <span className="flex gap-[2px] text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {"KEEP SWIMMING".split("").map((char, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.div>


      </div>
    </section>
  )
}
