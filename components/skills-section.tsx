"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  {
    category: "Strategy",
    items: [
      "Brand Positioning",
      "Go-To-Market Strategy",
      "Market Research",
      "Competitive Analysis",
      "Customer Segmentation",
    ],
  },
  {
    category: "Growth",
    items: [
      "Performance Marketing",
      "SEO & Content Strategy",
      "Conversion Optimization",
      "Marketing Automation",
      "Analytics & Attribution",
    ],
  },
  {
    category: "Creative",
    items: [
      "Storytelling & Copywriting",
      "Campaign Concepting",
      "Visual Direction",
      "Social Media Strategy",
      "Influencer Partnerships",
    ],
  },
]

const experience = [
  {
    period: "2022 -- Present",
    role: "Senior Marketing Strategist",
    company: "Freelance / Consulting",
    description:
      "Leading brand strategy and growth marketing for startups and established companies across tech, wellness, and luxury sectors.",
  },
  {
    period: "2019 -- 2022",
    role: "Marketing Lead",
    company: "Vertex Digital",
    description:
      "Managed a team of 8, overseeing all digital marketing channels and driving 150% year-over-year revenue growth for key accounts.",
  },
  {
    period: "2017 -- 2019",
    role: "Content Strategist",
    company: "Bloom Agency",
    description:
      "Developed content strategies and editorial calendars for B2B and DTC brands, growing organic acquisition by 3x on average.",
  },
]

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
                    backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
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
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </p>
            <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }} />
          </motion.div>

          <div className="flex flex-col md:col-span-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 30 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-t border-border py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="text-base font-medium text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-xs tracking-wider text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
