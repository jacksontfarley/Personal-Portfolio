"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import Image from "next/image"

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

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
}

function SpotlightCard({
  company,
  index,
  isInView,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: {
  company: Company
  index: number
  isInView: boolean
  isActive: boolean
  isDimmed: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const isTouchDevice = typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: isDimmed ? 0.4 : 1, y: 0, scale: isActive ? 1.05 : 1 } : {}}
      transition={{
        opacity: { duration: 0.3 },
        scale: springTransition,
        y: { duration: 0.5, delay: 0.06 * index },
      }}
      onMouseEnter={() => !isTouchDevice && onActivate()}
      onMouseLeave={() => !isTouchDevice && onDeactivate()}
      onClick={() => isTouchDevice && (isActive ? onDeactivate() : onActivate())}
      className="relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm"
      style={
        isActive
          ? {
              boxShadow:
                "0 0 0 2px transparent, 0 0 20px 2px rgba(255,51,102,0.15), 0 0 40px 4px rgba(0,153,255,0.1)",
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : {}
      }
    >
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-secondary/50 p-2">
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="text-center text-xs font-medium text-foreground sm:text-sm">
        {company.name}
      </p>
    </motion.div>
  )
}

export function SkillsSection() {
  const expRef = useRef(null)
  const expInView = useInView(expRef, { once: true, margin: "-100px" })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleDeactivate = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const activeCompany = activeIndex !== null ? companies[activeIndex] : null

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

          {/* Spotlight grid */}
          <div
            className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7"
            onMouseLeave={handleDeactivate}
          >
            {companies.map((company, i) => (
              <SpotlightCard
                key={company.name}
                company={company}
                index={i}
                isInView={expInView}
                isActive={activeIndex === i}
                isDimmed={activeIndex !== null && activeIndex !== i}
                onActivate={() => handleActivate(i)}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>

          {/* Description box */}
          <div className="min-h-[120px]">
            <AnimatePresence mode="wait">
              {activeCompany ? (
                <motion.div
                  key={activeCompany.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl border border-border bg-background p-6"
                >
                  {/* Rainbow top accent */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                    }}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                    <div className="flex-shrink-0">
                      <p
                        className="text-sm font-semibold"
                        style={{
                          width: "fit-content",
                          background:
                            "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {activeCompany.role}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {activeCompany.period}
                      </p>
                      {activeCompany.brandLogos && (
                        <div className="mt-3 flex items-center gap-2">
                          {activeCompany.brandLogos.map((logo, i) => (
                            <Image
                              key={i}
                              src={logo}
                              alt="Brand logo"
                              width={60}
                              height={20}
                              className="h-4 max-w-[30%] object-contain grayscale"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {activeCompany.description}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-muted-foreground/50"
                >
                  Hover over a logo to learn more
                </motion.p>
              )}
            </AnimatePresence>
          </div>

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
                <h3
                  className="text-sm font-medium tracking-wide"
                  style={{
                    width: "fit-content",
                    background:
                      "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {skill.category}
                </h3>
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
