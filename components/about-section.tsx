"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8])

  return (
    <section id="about" className="relative px-6 py-32 md:py-40" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            About
          </p>
          <div
            className="mt-3 h-[2px] w-8 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
            }}
          />
        </motion.div>

        {/* Text content + rotating logo */}
        <div className="relative grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col gap-6 md:col-span-9">
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
              I&apos;m a brand marketer driven by a passion for{" "}
              <span
                className="italic"
                style={{
                  padding: "0 0.1em 0.05em 0",
                  backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                making people&apos;s lives better
              </span>
              . My approach blends analytics and creativity, translating unique insights into compelling brand
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
              className="text-base leading-relaxed text-muted-foreground"
            >
              My non-traditional path from elementary education, to B2B client
              success, to CPG brand management gives me 8+ years of unique
              experiences, with a red thread of authentic storytelling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base leading-relaxed text-muted-foreground"
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
              className="text-base leading-relaxed text-muted-foreground"
            >
              And most importantly, I believe in bringing more voices to the
              table, because the most impactful ideas are built on genuine human
              connection.
            </motion.p>
          </div>

          {/* Rotating name logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ scale: logoScale }}
            className="flex items-center justify-center md:col-span-3 md:items-start md:justify-end md:-mt-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-40 lg:w-48"
            >
              <Image
                src="/NAME2.png"
                alt="Jackson Farley circular logo"
                width={200}
                height={200}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
