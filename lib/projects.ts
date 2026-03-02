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
    title: "Solara Brand Launch",
    slug: "solara-brand-launch",
    category: "Brand Strategy",
    description:
      "Led the full brand identity and go-to-market strategy for a DTC wellness startup, driving 200% growth in the first quarter.",
    tags: ["Brand Identity", "GTM Strategy", "Content"],
    image: "/images/project-1.jpg",
    year: "2025",
    longDescription:
      "Solara was a DTC wellness startup entering a crowded market with zero brand recognition. I led the full brand identity development and go-to-market strategy from the ground up, crafting a positioning rooted in authenticity and accessible wellness. From naming and visual identity to launch campaign and channel strategy, every touchpoint was designed to cut through the noise and build genuine connection with the target consumer.",
    highlights: [
      "Developed brand positioning, visual identity, and tone of voice from scratch",
      "Designed and executed multi-channel GTM strategy across social, paid, and retail",
      "Drove 200% revenue growth in the first quarter post-launch",
      "Built a content engine generating 50+ assets per month across platforms",
    ],
  },
  {
    title: "Meridian Growth Campaign",
    slug: "meridian-growth-campaign",
    category: "Performance Marketing",
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
    title: "Atelier Content System",
    slug: "atelier-content-system",
    category: "Content Strategy",
    description:
      "Built a scalable content engine for a luxury fashion house, growing organic traffic 5x and establishing thought leadership.",
    tags: ["SEO", "Storytelling", "Editorial"],
    image: "/images/project-3.jpg",
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
    title: "Nova Product Rebrand",
    slug: "nova-product-rebrand",
    category: "Rebranding",
    description:
      "Orchestrated a complete brand overhaul for a fintech company, resulting in 80% improvement in brand recall and customer trust scores.",
    tags: ["Positioning", "Visual Identity", "Research"],
    image: "/images/project-4.jpg",
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
]
