"use client"

import { motion, useInView, LayoutGroup } from "framer-motion"
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

function BentoCard({
  company,
  index,
  isInView,
  isExpanded,
  onToggle,
}: {
  company: Company
  index: number
  isInView: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      layout
      layoutId={`bento-${company.name}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        ...springTransition,
        opacity: { duration: 0.5, delay: 0.06 * index },
        y: { duration: 0.5, delay: 0.06 * index },
        layout: springTransition,
      }}
      onClick={onToggle}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) onToggle()
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches && isExpanded) onToggle()
      }}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-background p-5 transition-shadow duration-300 ${
        isExpanded
          ? "col-span-2 row-span-2 shadow-xl"
          : "col-span-1 row-span-1 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Rainbow top accent — visible when expanded */}
      <motion.div
        layout="position"
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
        }}
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0, scaleX: isExpanded ? 1 : 0 }}
        transition={springTransition}
      />

      {/* Collapsed: Logo + name */}
      <div className={`flex items-center gap-4 ${isExpanded ? "mb-4" : ""}`}>
        <motion.div
          layout="position"
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary/50 p-2 sm:h-16 sm:w-16"
        >
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </motion.div>

        <motion.div layout="position" className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {company.name}
          </p>
          {!isExpanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="truncate text-xs text-muted-foreground"
            >
              {company.role}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Expanded: Full details */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          <div>
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
              {company.role}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {company.period}
            </p>
          </div>

          {company.brandLogos && (
            <div className="flex items-center gap-2">
              {company.brandLogos.map((logo, i) => (
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

          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-relaxed">
            {company.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export function SkillsSection() {
  const expRef = useRef(null)
  const expInView = useInView(expRef, { once: true, margin: "-100px" })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
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

          <LayoutGroup>
            <motion.div
              layout
              className="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
              transition={springTransition}
            >
              {companies.map((company, i) => (
                <BentoCard
                  key={company.name}
                  company={company}
                  index={i}
                  isInView={expInView}
                  isExpanded={expandedIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </motion.div>
          </LayoutGroup>

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
