"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden px-6 py-32">
      {/* Ghosted headshot — no motion wrapper to avoid hydration mismatch */}
      <div
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 w-[60%] max-w-[600px] sm:w-[50%] sm:right-0 md:w-[42%] md:right-[2%]"
        style={{ opacity: 0.10 }}
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

          <div>
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
                  backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
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
                  backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                creativity
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Marrying analytical rigor and bold innovation to shake up the
            status quo and craft strategies that resonate, inspire, and drive
            growth.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
