"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:gap-16">
          {/* Text side */}
          <div className="flex flex-1 flex-col gap-8">
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
                className="text-balance font-serif text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
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
                {" "}and{" "}
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

          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-48 flex-shrink-0 sm:w-56 md:mx-0 md:w-64 lg:w-72"
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
      </div>
    </section>
  )
}
