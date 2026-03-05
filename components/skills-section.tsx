"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const skills = [
  {
    category: "Strategy",
    items: [
      "Brand Positioning",
      "NPI Commercialization",
      "Consumer Insights",
      "Omnichannel Campaign Planning",
      "Retail & Trade Strategy",
    ],
  },
  {
    category: "Commercial",
    items: [
      "P&L Management",
      "Financial Forecasting & Modeling",
      "Cross-Functional Leadership",
      "B2B Sales & Negotiation",
      "Operational Infrastructure",
    ],
  },
  {
    category: "Creative",
    items: [
      "Creative Direction",
      "Scriptwriting & Copywriting",
      "Graphic Design & Photography",
      "Social Media Strategy",
      "Experiential Activations",
    ],
  },
]

interface Company {
  name: string
  logo: string
  role: string
  period: string
  description: string
  brandLogos?: string[]
}

const companies: Company[] = [
  {
    name: "Kenvue",
    logo: "/images/logos/Kenvue-scaled.webp",
    role: "Associate Brand Manager",
    period: "2024 -- Present",
    brandLogos: [
      "/images/logos/tylenol.png",
      "/images/logos/Motrin.svg",
      "/images/logos/aveeno.svg.png",
    ],
    description:
      "Leading brand work for iconic consumer health brands, including paid media strategy, asset development, NPI launch plans, and omnichannel campaign execution. Forecasted for $350MM P&L and experience running $50MM+ media plans.",
  },
  {
    name: "SMU",
    logo: "/images/logos/SMU-Mustangs-Emblem.png",
    role: "MBA Candidate",
    period: "2022 -- 2024",
    description:
      "Earned MBA in marketing with several honors, including Class Marshal (Top 2); held numerous leadership roles and TA positions.",
  },
  {
    name: "Uber",
    logo: "/images/logos/Uber_logo_2018.png",
    role: "Client Partner",
    period: "2021 -- 2022",
    description:
      "Managed $41M portfolio of Dallas restaurant owners, building custom growth plans and expanding local footprint on Uber Eats.",
  },
  {
    name: "Worldwide Express",
    logo: "/images/logos/images.jpeg",
    role: "Account Management, Marketing, Operations",
    period: "2017 -- 2021",
    description:
      "Held several roles, most notably serving on lean marketing team during high-growth, early stage of company; developed range of sales enablement materials and built brand voice through social media.",
  },
  {
    name: "Liberty Public Schools",
    logo: "/images/logos/bbHighResolutionLPSLogoBluewTransparentBackground.png",
    role: "Elementary Educator",
    period: "2016 -- 2017",
    description:
      "Developed curriculum and led a classroom of 25+ students, honing communication, empathy, and the art of making complex ideas accessible.",
  },
  {
    name: "CycleBar",
    logo: "/images/logos/389-3893967_cyclebar-logo-cycle-bar.png",
    role: "Studio Manager & Marketing",
    period: "2018 -- 2023",
    description:
      "Taught indoor spin classes for 5 years; served as Lead Instructor for 2 years, managing end-to-end operations for instructor team, including creative work (photoshoots, social media, etc).",
  },
  {
    name: "Mizzou",
    logo: "/images/logos/missouri-tigers-logo-png-transparent.png",
    role: "B.S. Education",
    period: "2012 -- 2016",
    description:
      "Studied elementary education, graduating cum laude; earned Undergraduate Student Leader of the Year award through the College of Education; involved in Greek Life and other campus organizations.",
  },
]

const expandSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
}

function LogoCard({
  company,
  index,
  isInView,
  onSelect,
}: {
  company: Company
  index: number
  isInView: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      layoutId={`card-${company.name}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        opacity: { duration: 0.5, delay: 0.06 * index },
        y: { duration: 0.5, delay: 0.06 * index },
        layout: expandSpring,
      }}
      onClick={onSelect}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        width={80}
        height={80}
        className="h-16 w-16 object-contain sm:h-20 sm:w-20"
      />
    </motion.div>
  )
}

function ExpandedModal({
  company,
  onClose,
  onPrev,
  onNext,
}: {
  company: Company
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Expanded card + arrows */}
      <div className="fixed inset-0 z-50 flex items-center justify-center gap-4 p-4 sm:p-8" onClick={onClose}>
        {/* Left arrow — flex sibling, sits naturally left of card */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="flex-shrink-0 rounded-full bg-background/80 p-2 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          aria-label="Previous role"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <motion.div
          layoutId={`card-${company.name}`}
          transition={expandSpring}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-10 pb-24 shadow-2xl sm:p-12 sm:pb-28"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Rainbow top accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-0 h-[2px] origin-left"
            style={{
              background:
                "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo + company name */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/50 p-2">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {company.name}
            </p>
          </div>

          {/* Job title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <p
              className="text-base font-semibold sm:text-lg"
              style={{
                width: "fit-content",
                background:
                  "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {company.role}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {company.period}
            </p>
          </motion.div>

          {/* Brand logos */}
          {company.brandLogos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-4 flex items-center gap-3"
            >
              {company.brandLogos.map((logo, i) => (
                <Image
                  key={i}
                  src={logo}
                  alt="Brand logo"
                  width={60}
                  height={20}
                  className="h-5 max-w-[30%] object-contain grayscale"
                />
              ))}
            </motion.div>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed"
          >
            {company.description}
          </motion.p>

          {/* Smiley watermark */}
          <Image
            src="/Smiley.PNG"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-6 right-6 h-8 w-8 rotate-[8deg] opacity-[0.4]"
          />
        </motion.div>

        {/* Right arrow — flex sibling, sits naturally right of card */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="flex-shrink-0 rounded-full bg-background/80 p-2 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          aria-label="Next role"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </>
  )
}

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

function ResumePill({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300"
      style={{
        background: hovered ? RAINBOW : "var(--background)",
        color: hovered ? "#fff" : "var(--foreground)",
      }}
    >
      {!hovered && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            padding: "2px",
            background: RAINBOW,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {label}
    </a>
  )
}

/* ─── Minimalist Skills Reveal ─── */
function SkillsReveal({
  isInView,
  innerRef,
}: {
  isInView: boolean
  innerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div
      id="skills"
      className="mx-auto mt-24 max-w-6xl scroll-mt-24 md:mt-32"
      ref={innerRef}
    >
      {/* SKILLS label — far left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Skills
        </p>
        <div
          className="mt-3 h-[2px] w-8 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
          }}
        />
      </motion.div>

      {/* Desktop — hover reveal */}
      <div className="hidden md:flex md:items-start md:justify-center md:gap-16 lg:gap-24">
        {skills.map((skill, i) => {
          const isActive = hoveredIndex === i
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i

          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Rainbow accent line above — only visible on active */}
              <motion.div
                className="mb-4 h-[2px] w-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Category header */}
              <motion.h3
                className="cursor-default text-center font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl"
                animate={{ opacity: isDimmed ? 0.3 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {skill.category}
              </motion.h3>

              {/* Skill tags cloud — fades in on hover */}
              <motion.div
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 8,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                  minHeight: 80,
                }}
              >
                {skill.items.map((item, j) => (
                  <motion.span
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: isActive ? j * 0.04 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile — accordion tiles */}
      <div className="flex flex-col gap-4 md:hidden">
        {skills.map((skill, i) => {
          const isOpen = expandedIndex === i

          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <button
                onClick={() => setExpandedIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <h3 className="font-serif text-xl font-normal tracking-tight text-foreground">
                  {skill.category}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg text-muted-foreground"
                >
                  +
                </motion.span>
              </button>

              {/* Rainbow line under header when open */}
              <motion.div
                className="mx-6 h-[2px] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  transformOrigin: "left",
                }}
              />

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 px-6 pb-6 pt-4">
                      {skill.items.map((item, j) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.25,
                            delay: j * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const expRef = useRef(null)
  const expInView = useInView(expRef, { once: true, margin: "-100px" })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? companies.length - 1 : prev - 1
    )
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === companies.length - 1 ? 0 : prev + 1
    )
  }, [])

  return (
    <section className="px-6 py-24 md:py-32">
      {/* Experience — Bento Grid */}
      <div id="experience" className="mx-auto max-w-6xl scroll-mt-24" ref={expRef}>
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </p>
            <div
              className="mt-3 h-[2px] w-8 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
              }}
            />
          </motion.div>

          {/* Logo-only grid */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
            {companies.map((company, i) => (
              <LogoCard
                key={company.name}
                company={company}
                index={i}
                isInView={expInView}
                onSelect={() => handleSelect(i)}
              />
            ))}
          </div>

          {/* Expanded modal */}
          <AnimatePresence>
            {selectedIndex !== null && (
              <ExpandedModal
                company={companies[selectedIndex]}
                onClose={handleClose}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
          </AnimatePresence>

          {/* Resume CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 pt-8"
          >
            <div className="flex gap-[2px] text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {"GRAB A SOUVENIR".split("").map((char, i) => (
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
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ResumePill href="/Jackson-Farley-2026.pdf" label="Resume" />
              <ResumePill href="/Jackson-Farley-2026-Long-Form.pdf" label="Resume, But Longer" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills — Minimalist Interactive Reveal */}
      <SkillsReveal isInView={isInView} innerRef={ref} />
    </section>
  )
}
