"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

export function IntroScreen() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Smooth scroll progress — eliminates jitter
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // Main "Hello, I'm Jackson Farley" text transforms
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const textScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92])
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -60])

  // KEEP SWIMMING indicator
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])

  // JF. logo: large + centered → small + top-left (navbar position)
  // Start: centered on screen, scale 4x
  // End: top-left at px-6 py-5 matching navbar, scale 1x
  const logoScale = useTransform(smoothProgress, [0, 0.6], [4, 1])
  const logoOpacity = useTransform(smoothProgress, [0, 0.15, 0.55, 0.75], [0.15, 0.5, 1, 0])
  // X: from center (50vw - half of logo width ~12px) to 24px (left-6)
  const logoX = useTransform(smoothProgress, [0, 0.6], ["calc(50vw - 12px)", "24px"])
  // Y: from center (50vh - half of logo height ~14px) to 20px (top-5)
  const logoY = useTransform(smoothProgress, [0, 0.6], ["calc(50vh - 14px)", "20px"])

  // Spring-smoothed logo transforms
  const logoScaleSmooth = useSpring(logoScale, springConfig)
  const logoOpacitySmooth = useSpring(logoOpacity, springConfig)

  // Decorative orb parallax
  const orbY = useTransform(smoothProgress, [0, 1], [0, -200])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* Scroll-linked JF. logo — interpolates from center to navbar position */}
        <motion.div
          style={{
            opacity: logoOpacitySmooth,
            scale: logoScaleSmooth,
            left: logoX,
            top: logoY,
          }}
          className="pointer-events-none fixed z-50 origin-top-left transform-gpu will-change-transform"
        >
          <span className="text-lg font-medium tracking-tight text-foreground">
            JF
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </span>
        </motion.div>

        {/* Centered name */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
            className="transform-gpu will-change-transform px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Hello, I&apos;m{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Jackson Farley
              </span>
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator — wave-bouncing letters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ opacity: indicatorOpacity }}
          className="flex justify-center pb-12 transform-gpu will-change-transform"
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

        {/* Decorative rainbow gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px] transform-gpu will-change-transform"
          style={{
            y: orbY,
            background:
              "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[120px] transform-gpu will-change-transform"
          style={{
            background:
              "linear-gradient(135deg, #0099FF, #CC33FF, #FF3366, #FFCC00)",
          }}
        />
      </div>
    </section>
  )
}
