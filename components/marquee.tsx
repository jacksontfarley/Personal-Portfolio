"use client"

import { motion } from "framer-motion"

const items = [
  "Brand Strategy",
  "Content Marketing",
  "Growth",
  "Digital Campaigns",
  "Social Media",
  "Storytelling",
  "Analytics",
  "Creative Direction",
]

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border py-6">
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-border" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
