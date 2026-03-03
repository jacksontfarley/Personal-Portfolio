export interface Project {
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  image: string
  year: string
  longDescription: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: "Medicine Cabinet Cleanout",
    slug: "medicine-cabinet-cleanout",
    category: "Omnichannel Campaign",
    description:
      "Led the full brand identity and go-to-market strategy for a DTC wellness startup, driving 200% growth in the first quarter.",
    tags: ["Brand Identity", "GTM Strategy", "Content"],
    image: "/images/project-1.jpg",
    year: "2025",
    longDescription:
      "Medicine Cabinet Cleanout was a DTC wellness initiative entering a crowded market with zero brand recognition. I led the full brand identity development and go-to-market strategy from the ground up, crafting a positioning rooted in authenticity and accessible wellness. From naming and visual identity to launch campaign and channel strategy, every touchpoint was designed to cut through the noise and build genuine connection with the target consumer.",
    highlights: [
      "Developed brand positioning, visual identity, and tone of voice from scratch",
      "Designed and executed multi-channel GTM strategy across social, paid, and retail",
      "Drove 200% revenue growth in the first quarter post-launch",
      "Built a content engine generating 50+ assets per month across platforms",
    ],
  },
  {
    title: "Aveeno® Daily Moisturizing Videos",
    slug: "aveeno-dm-videos",
    category: "Creative Development",
    description:
      "Designed and executed a multi-channel acquisition campaign that reduced CAC by 45% while scaling monthly revenue to $2M.",
    tags: ["Paid Media", "Analytics", "CRO"],
    image: "/images/project-2.jpg",
    year: "2024",
    longDescription:
      "Meridian needed to scale their customer acquisition without burning through budget. I designed a full-funnel performance marketing strategy that paired deep audience segmentation with creative testing at scale. By building a rigorous analytics framework and optimizing every touchpoint from impression to conversion, we achieved dramatic efficiency gains while maintaining quality and brand integrity.",
    highlights: [
      "Reduced customer acquisition cost (CAC) by 45% in 6 months",
      "Scaled monthly revenue from $800K to $2M through optimized paid channels",
      "Built a creative testing framework that improved CTR by 3x",
      "Implemented attribution modeling to connect spend to downstream revenue",
    ],
  },
  {
    title: "Topgolf Consumer Retention",
    slug: "topgolf-consumer-retention",
    category: "Research & Insights",
    description:
      "Built a scalable content engine for a luxury fashion house, growing organic traffic 5x and establishing thought leadership.",
    tags: ["SEO", "Storytelling", "Editorial"],
    image: "/images/topgolf2.png",
    year: "2024",
    longDescription:
      "Atelier, a luxury fashion house, had world-class products but no scalable content infrastructure. I built their editorial strategy from the ground up -- a content system that blended high-end storytelling with SEO rigor. The result was an engine that consistently produced culturally relevant content, driving organic discovery while maintaining the brand's premium positioning.",
    highlights: [
      "Grew organic traffic 5x within 8 months through strategic content and SEO",
      "Established an editorial calendar producing 20+ pieces of premium content monthly",
      "Built thought leadership positioning that earned features in Vogue and WWD",
      "Created a scalable content workflow reducing production time by 60%",
    ],
  },
  {
    title: "CES Market Research",
    slug: "ces-market-research",
    category: "Research & Insights",
    description:
      "Orchestrated a complete brand overhaul for a fintech company, resulting in 80% improvement in brand recall and customer trust scores.",
    tags: ["Positioning", "Visual Identity", "Research"],
    image: "/images/CES2.png",
    year: "2023",
    longDescription:
      "Nova's fintech brand had grown stale and was losing ground to competitors with sharper, more modern identities. I led a comprehensive rebrand that began with deep consumer research and competitive analysis, then moved through strategic repositioning, visual identity redesign, and a coordinated rollout across every customer touchpoint. The goal was to rebuild trust and make the brand feel as innovative as the product.",
    highlights: [
      "Led consumer research with 500+ respondents to identify brand perception gaps",
      "Developed new brand positioning, messaging architecture, and visual system",
      "Achieved 80% improvement in unaided brand recall post-rebrand",
      "Coordinated rollout across product, marketing, sales, and customer success teams",
    ],
  },
  {
    title: "Uber Eats Role Pilot",
    slug: "uber-eats-role-pilot",
    category: "Operational Strategy",
    description:
      "Built and launched a social-first brand presence from zero, growing to 100K engaged followers in 6 months with a community-led content strategy.",
    tags: ["Social Strategy", "Community", "Content"],
    image: "/images/UE.png",
    year: "2023",
    longDescription:
      "Vero was a new lifestyle brand with no existing social media presence. I developed a community-first social strategy that prioritized authentic engagement over vanity metrics. From platform selection and content pillars to influencer partnerships and UGC programs, every element was designed to build a genuine, engaged audience that converted into loyal customers.",
    highlights: [
      "Grew from 0 to 100K followers across Instagram and TikTok in 6 months",
      "Developed content pillars and editorial calendar driving 8% avg engagement rate",
      "Built influencer partnership program with 50+ creators generating authentic UGC",
      "Social-driven revenue accounted for 35% of total DTC sales within first year",
    ],
  },
  {
    title: "WWEX Brand Building",
    slug: "wwex-brand-building",
    category: "Creative Development",
    description:
      "Orchestrated a cross-channel product launch for a consumer tech brand, driving $5M in first-month revenue and earning press coverage in major outlets.",
    tags: ["Launch Strategy", "PR", "Experiential"],
    image: "/images/WWEX.png",
    year: "2022",
    longDescription:
      "Prism was launching their flagship consumer tech product into a competitive market. I led the integrated product launch strategy spanning experiential activations, PR, digital campaigns, and retail partnerships. The launch was designed as a cultural moment, not just a product release -- combining physical experiences with digital storytelling to create maximum impact at launch and sustained demand post-launch.",
    highlights: [
      "Generated $5M in revenue within the first 30 days of launch",
      "Secured press coverage in TechCrunch, The Verge, and Wired",
      "Designed experiential pop-up events in 3 cities driving 10K+ attendees",
      "Built retail launch playbook adopted across 200+ retail partner locations",
    ],
  },
  {
    title: "Cyclebar Studio Growth",
    slug: "cyclebar-studio-growth",
    category: "Experiential Strategy & Operations",
    description:
      "Developed a data-driven retail merchandising strategy that increased shelf velocity by 60% and secured premium placement across 500+ stores.",
    tags: ["Retail Strategy", "Merchandising", "Analytics"],
    image: "/images/CB.png",
    year: "2021",
    longDescription:
      "A leading CPG brand was losing shelf share to aggressive competitors with stronger retail relationships. I led the development of a comprehensive trade marketing strategy rooted in shopper insights, category management data, and retailer collaboration. By redesigning the in-store experience -- from shelf layout and POS materials to promotional cadence -- we recaptured premium placement and drove measurable velocity gains across key retail partners.",
    highlights: [
      "Increased shelf velocity by 60% across top-tier retail partners",
      "Secured premium endcap and eye-level placement in 500+ stores",
      "Built shopper insights program analyzing 10K+ in-store purchase behaviors",
      "Designed modular POS toolkit adopted by 3 national retail chains",
    ],
  },
  {
    title: "Photography Portfolio",
    slug: "photography-portfolio",
    category: "Visual Storytelling",
    description:
      "Authored a repeatable go-to-market playbook that standardized launch processes and reduced time-to-market by 40% across the portfolio.",
    tags: ["GTM Strategy", "Process Design", "Frameworks"],
    image: "/images/project-8.jpg",
    year: "2020",
    longDescription:
      "After leading multiple product launches with varying degrees of structure, I identified the need for a standardized, repeatable go-to-market framework. I built a comprehensive GTM playbook that codified best practices across consumer research, positioning, creative development, channel strategy, and measurement. The playbook became the organization's default launch methodology, reducing time-to-market while improving consistency and cross-functional alignment.",
    highlights: [
      "Reduced average time-to-market by 40% through standardized processes",
      "Created a modular framework adopted across 12+ product launches",
      "Built cross-functional alignment templates improving stakeholder buy-in by 2x",
      "Designed measurement dashboards tracking launch KPIs in real-time",
    ],
  },
]
