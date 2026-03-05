"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer className="px-6 pb-8 pt-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jackson Farley. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with intention.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
