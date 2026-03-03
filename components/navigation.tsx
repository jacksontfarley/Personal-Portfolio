"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { projects } from "@/lib/projects"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const workRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith("/work/")

  useEffect(() => {
    if (isProjectPage) {
      setVisible(true)
      setScrolled(true)
      return
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isProjectPage])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: visible ? 0 : -20, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-foreground"
          >
            JF
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {/* About */}
            <a
              href={isProjectPage ? "/#about" : "#about"}
              className="relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground group"
            >
              About
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
            </a>

            {/* Experience */}
            <a
              href={isProjectPage ? "/#experience" : "#experience"}
              className="relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground group"
            >
              Experience
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
            </a>

            {/* Skills */}
            <a
              href={isProjectPage ? "/#skills" : "#skills"}
              className="relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground group"
            >
              Skills
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
            </a>

            {/* Work dropdown — opens on hover */}
            <div
              ref={workRef}
              className="relative"
              onMouseEnter={() => setWorkOpen(true)}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <a
                href={isProjectPage ? "/#work" : "#work"}
                className="relative flex items-center gap-1 text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground group"
              >
                Work
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${workOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
              </a>

              <AnimatePresence>
                {workOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full mt-1 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background/95 pt-2 shadow-lg backdrop-blur-xl"
                  >
                    {/* Rainbow top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                      }}
                    />
                    <div className="flex flex-col py-2">
                      {projects.map((project, i) => (
                        <motion.div
                          key={project.slug}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                        >
                          <Link
                            href={`/work/${project.slug}`}
                            onClick={() => setWorkOpen(false)}
                            className="flex flex-col gap-0.5 px-4 py-2.5 transition-colors duration-200 hover:bg-secondary"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {project.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {project.category}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <a
              href={isProjectPage ? "/#contact" : "#contact"}
              className="relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 5.5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="block h-[1.5px] bg-foreground"
              style={{ width: 20 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[1.5px] w-5 bg-foreground"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -5.5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="block h-[1.5px] bg-foreground"
              style={{ width: 20 }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              <motion.a
                href={isProjectPage ? "/#about" : "#about"}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0, duration: 0.4 }}
                className="text-2xl font-light tracking-wide text-foreground"
              >
                About
              </motion.a>
              <motion.a
                href={isProjectPage ? "/#experience" : "#experience"}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.06, duration: 0.4 }}
                className="text-2xl font-light tracking-wide text-foreground"
              >
                Experience
              </motion.a>
              <motion.a
                href={isProjectPage ? "/#skills" : "#skills"}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.12, duration: 0.4 }}
                className="text-2xl font-light tracking-wide text-foreground"
              >
                Skills
              </motion.a>

              <div className="my-2 h-px w-12 bg-border" />

              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Work
              </span>
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: (i + 3) * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-light tracking-wide text-foreground"
                  >
                    {project.title}
                  </Link>
                </motion.div>
              ))}

              <div className="my-2 h-px w-12 bg-border" />

              <motion.a
                href={isProjectPage ? "/#contact" : "#contact"}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: (projects.length + 3) * 0.06, duration: 0.4 }}
                className="text-2xl font-light tracking-wide text-foreground"
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
