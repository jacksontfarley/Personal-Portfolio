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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
        {/* Left arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute z-50 rounded-full bg-background/80 p-2 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          style={{ right: "100%", top: "50%", transform: "translateY(-50%) translateX(12px)" }}
          aria-label="Previous role"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute z-50 rounded-full bg-background/80 p-2 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          style={{ left: "100%", top: "50%", transform: "translateY(-50%) translateX(-12px)" }}
          aria-label="Next role"
        >
          <ChevronRight className="h-5 w-5" />
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
      </div>
    </>
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
    <section className="px-6 py-32 md:py-40">
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
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center gap-6 pt-8 sm:flex-row sm:justify-center"
          >
            <p className="text-pretty text-center font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
              Grab a copy of my resume as a souvenir!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/resume-1-pager.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-shadow duration-300 hover:shadow-lg"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                1-Pager
              </a>
              <a
                href="/resume-long-form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-shadow duration-300 hover:shadow-lg"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                Long-Form
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills */}
      <div
        id="skills"
        className="mx-auto mt-32 max-w-6xl scroll-mt-24 md:mt-40"
        ref={ref}
      >
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
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

          <div className="grid gap-12 sm:grid-cols-3 md:col-span-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-4"
              >
              <motion.div className="flex flex-col gap-2">
                <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  {skill.category}
                </h3>
                <div
                  className="h-[2px] w-6 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                  }}
                />
              </motion.div>
                <ul className="flex flex-col gap-2.5">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
