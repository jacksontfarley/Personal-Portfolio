"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
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
      "Leading brand strategy for a portfolio of iconic consumer health brands, driving NPI commercialization and omnichannel campaign execution.",
  },
  {
    name: "SMU",
    logo: "/images/logos/large_blob.png",
    role: "MBA Candidate",
    period: "2022 -- 2024",
    description:
      "Pursued graduate studies in brand management and marketing strategy, blending academic rigor with real-world consulting projects.",
  },
  {
    name: "Uber",
    logo: "/images/logos/Uber_logo_2018.png",
    role: "Operations & Strategy",
    period: "2021 -- 2022",
    description:
      "Drove operational strategy and growth initiatives, leveraging data to optimize market performance and stakeholder engagement.",
  },
  {
    name: "Worldwide Express",
    logo: "/images/logos/images.jpeg",
    role: "B2B Client Success",
    period: "2020 -- 2021",
    description:
      "Managed enterprise client relationships and B2B sales strategy, building operational infrastructure that scaled revenue growth.",
  },
  {
    name: "Liberty Public Schools",
    logo: "/images/logos/bbHighResolutionLPSLogoBluewTransparentBackground.png",
    role: "Elementary Educator",
    period: "2018 -- 2020",
    description:
      "Developed curriculum and led a classroom of 25+ students, honing communication, empathy, and the art of making complex ideas accessible.",
  },
  {
    name: "CycleBar",
    logo: "/images/logos/389-3893967_cyclebar-logo-cycle-bar.png",
    role: "Studio Manager & Marketing",
    period: "2017 -- 2018",
    description:
      "Ran studio operations, community marketing, and experiential activations that grew membership and deepened brand loyalty.",
  },
  {
    name: "Mizzou",
    logo: "/images/logos/missouri-tigers-logo-png-transparent.png",
    role: "B.A. Communications",
    period: "2014 -- 2018",
    description:
      "Studied strategic communication and journalism at the University of Missouri, building a foundation in storytelling and media.",
  },
]

function ExperienceCard({
  company,
  index,
  isInView,
}: {
  company: Company
  index: number
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo container */}
      <motion.div
        animate={{
          scale: hovered ? 1.1 : 1,
          boxShadow: hovered
            ? "0 8px 30px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-3 sm:h-24 sm:w-24"
      >
        {/* Rainbow border on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute inset-0 rounded-2xl"
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
          )}
        </AnimatePresence>
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Company name */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0.6 }}
        className="mt-3 text-center text-xs font-medium text-foreground sm:text-sm"
      >
        {company.name}
      </motion.p>

      {/* Hover reveal card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-background p-5 shadow-lg sm:w-72"
          >
            {/* Rainbow top accent line */}
            <div
              className="absolute left-4 right-4 top-0 h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
              }}
            />
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
            <p className="mt-1 text-xs text-muted-foreground">
              {company.period}
            </p>
            {company.brandLogos && (
              <div className="mt-3 flex items-center gap-2">
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
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {company.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const expRef = useRef(null)
  const expInView = useInView(expRef, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="px-6 py-32 md:py-40">
      {/* Skills */}
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Expertise
            </p>
            <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
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
                    background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
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

      {/* Experience */}
      <div className="mx-auto mt-32 max-w-6xl md:mt-40" ref={expRef}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </p>
            <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
          </motion.div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-16 sm:grid-cols-4 md:grid-cols-7">
            {companies.map((company, i) => (
              <ExperienceCard
                key={company.name}
                company={company}
                index={i}
                isInView={expInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
