"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import Image from "next/image"

const CONFETTI_COLORS = ["#FF3366", "#FF6B35", "#FFCC00", "#00D4AA", "#0099FF", "#CC33FF"]

function InteractiveSmiley() {
  const [isHovered, setIsHovered] = useState(false)
  const [clickSpin, setClickSpin] = useState(0)
  const [isRainbow, setIsRainbow] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; x: number; y: number; color: string; rotation: number; scale: number }[]
  >([])

  const handleClick = useCallback(() => {
    // Confetti burst
    const pieces = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: -(Math.random() * 80 + 30),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.6 + 0.4,
    }))
    setConfettiPieces(pieces)
    setTimeout(() => setConfettiPieces([]), 1000)

    // High-velocity click spin (accumulates 360 each click)
    setClickSpin((prev) => prev + 360)

    // Rainbow flash
    setIsRainbow(true)
    setTimeout(() => setIsRainbow(false), 600)
  }, [])

  return (
    <div
      className="relative inline-flex cursor-pointer items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Confetti burst */}
      <AnimatePresence>
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{
              x: piece.x,
              y: piece.y,
              opacity: 0,
              scale: piece.scale,
              rotate: piece.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full"
            style={{ width: 6, height: 6, backgroundColor: piece.color }}
          />
        ))}
      </AnimatePresence>

      {/* Smiley — gentle hover spin + clicky spring spin on tap */}
      <motion.div
        animate={{ rotate: isHovered ? clickSpin + 360 : clickSpin }}
        transition={
          clickSpin > 0 && !isHovered
            ? { type: "spring", stiffness: 300, damping: 15 }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/Smiley.PNG"
          alt="Smiley"
          width={80}
          height={80}
          className="h-auto w-auto transition-all duration-300"
          style={{
            maxHeight: "1.2em",
            width: "auto",
            filter: isRainbow
              ? "hue-rotate(90deg) saturate(2) brightness(1.1)"
              : "none",
          }}
        />
      </motion.div>
    </div>
  )
}

export function IntroScreen() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
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
                <span className="block md:inline">Hello, I&apos;m</span>
                {" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF, #FF3366)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "rainbow-crawl 10s linear infinite",
                  }}
                  className="inline-block md:inline"
                >
                  Jackson&nbsp;Farley
                </span>
              </p>
              <InteractiveSmiley />
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
