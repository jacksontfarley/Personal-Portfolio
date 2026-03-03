"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// GhostHeadshot: no motion wrapper, renders identically on server and client
function GhostHeadshot() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        right: "0%",
        transform: "translateY(-50%)",
        width: "60%",
        maxWidth: "600px",
        pointerEvents: "none",
        opacity: 0.1,
        zIndex: 0,
      }}
    >
      <Image
        src="/JF_headshot.png"
        alt=""
        width={600}
        height={600}
        className="h-auto w-full grayscale"
        priority
      />
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      style={{ position: "relative" }}
      className="flex min-h-[70vh] flex-col justify-center px-6 py-32"
    >
      <GhostHeadshot />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            Brand Marketer + Strategist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl md:max-w-[55%]"
          >
            I solve business challenges with{" "}
            <span
              className="italic"
              style={{
                padding: "0 0.15em 0.05em 0",
                backgroundImage:
                  "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              curiosity
            </span>
            <br />
            and{" "}
            <span
              className="italic"
              style={{
                padding: "0 0.15em 0.05em 0",
                backgroundImage:
                  "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              creativity
            </span>
          </motion.h1>


        </div>
      </div>
    </section>
  )
}
