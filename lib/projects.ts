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
  objective: string
  role: string
  challenge: string
  actions: string[]
  impact: string[]
  takeaway: string
}

export const projects: Project[] = [
  {
    title: "Medicine Cabinet Cleanout",
    slug: "medicine-cabinet-cleanout",
    category: "Omnichannel Campaign",
    description:
      "Led the full brand identity and go-to-market strategy for a DTC wellness startup, driving 200% growth in the first quarter.",
    tags: ["Brand Identity", "GTM Strategy", "Content"],
    image: "/images/CTCM.png",
    year: "2025",
    longDescription:
      "Medicine Cabinet Cleanout was a DTC wellness initiative entering a crowded market with zero brand recognition. I led the full brand identity development and go-to-market strategy from the ground up, crafting a positioning rooted in authenticity and accessible wellness. From naming and visual identity to launch campaign and channel strategy, every touchpoint was designed to cut through the noise and build genuine connection with the target consumer.",
    highlights: [
      "Developed brand positioning, visual identity, and tone of voice from scratch",
      "Designed and executed multi-channel GTM strategy across social, paid, and retail",
      "Drove 200% revenue growth in the first quarter post-launch",
      "Built a content engine generating 50+ assets per month across platforms",
    ],
    objective: "Re-engage the 40% of lapsed buyers who previously stocked up and reset the purchase cycle immediately ahead of the critical Back-to-School and Cold, Cough, Flu, and Sinus (CCFS) season.",
    role: "Lead Strategist and Associate Brand Manager. I spearheaded the end-to-end execution, from identifying the \"inventory glut\" insight to vetting and onboarding new promotional vendors. A key part of my role was navigating the high-stakes Internal Medical, Legal, and Regulatory (MLR) approval process to ensure our efficacy and safety claims were both impactful and compliant.",
    challenge: "Following record-breaking illness levels during the \"tripledemic,\" pediatric pain shoppers entered a massive stock-up phase. This created a significant business bottleneck: data showed purchase cycles were lengthening as parents sat on high volumes of product. We weren't just fighting competitors; we were fighting the inventory already sitting in consumer's homes that—while physically present—was largely past its prime.",
    actions: [
      "Cultural Contextualization: Leveraged the #CleanTok trend (48B+ views) to frame medicine safety within the popular \"home organization\" aesthetic, capturing whitespace where only 6% of views were paid brand content.",
      "Gamified Loyalty & Web Hub: Launched a custom site where consumers earned points for eligible purchases and educational engagement, supported by a suite of web resources on Tylenol.com (FAQs, safety videos, and interactive shopping lists).",
      "Modernized Media Mix: Vetted a new vendor to execute high-frequency deal posts and push notifications, and managed an 11-influencer social campaign that bypassed traditional \"ad fatigue.\"",
      "PR Offensive: Pitched the \"Cleanout\" narrative to national news outlets to drive top-of-funnel awareness around medication expiration.",
    ],
    impact: [
      "Market Dominance: Gained +3.8 pts market share vs. YA, while Private Label dropped -2.8 pts.",
      "Sales & Efficiency: Drove 2x coupon redemptions, and a 5x higher average basket value via the loyalty program.",
      "Performance ROI: Achieved a 4x ROI on the web hub and 1.5x ROI on social activations.",
      "Awareness at Scale: Generated 777M news impressions and 230 online coverage pieces (3.8x benchmark).",
      "Audience Engagement: 11 influencers delivered 1.5M impressions with a 7% engagement rate (surpassing the 4.5% benchmark).",
    ],
    takeaway: "True category leadership requires moving beyond 'Buy Now' messaging. By leaning into consumer education and safety, we turned a regulatory necessity into a high-intent sales trigger. When you solve a safety problem for a parent, you don't just get a sale; you regain a loyalist.",
  },
  {
    title: "Aveeno® Daily Moisturizing Videos",
    slug: "avo-videos",
    category: "Creative Development",
    description:
      "Designed and executed a multi-channel acquisition campaign that reduced CAC by 45% while scaling monthly revenue to $2M.",
    tags: ["Paid Media", "Analytics", "CRO"],
    image: "/images/AVO.png",
    year: "2024",
    longDescription:
      "Meridian needed to scale their customer acquisition without burning through budget. I designed a full-funnel performance marketing strategy that paired deep audience segmentation with creative testing at scale. By building a rigorous analytics framework and optimizing every touchpoint from impression to conversion, we achieved dramatic efficiency gains while maintaining quality and brand integrity.",
    highlights: [
      "Reduced customer acquisition cost (CAC) by 45% in 6 months",
      "Scaled monthly revenue from $800K to $2M through optimized paid channels",
      "Built a creative testing framework that improved CTR by 3x",
      "Implemented attribution modeling to connect spend to downstream revenue",
    ],
    objective: "Scale customer acquisition efficiently while growing monthly revenue from $800K to $2M without sacrificing brand integrity.",
    role: "Performance Marketing Lead -- designed full-funnel strategy pairing audience segmentation with creative testing at scale.",
    challenge: "Balancing aggressive growth targets with budget efficiency required a rigorous analytics framework and constant creative optimization.",
    actions: [
      "Built deep audience segmentation models for targeted paid campaigns",
      "Developed creative testing framework improving click-through rates by 3x",
      "Implemented multi-touch attribution modeling across all paid channels",
      "Optimized every touchpoint from impression to conversion",
    ],
    impact: [
      "Reduced customer acquisition cost (CAC) by 45% in 6 months",
      "Scaled monthly revenue from $800K to $2M",
      "3x improvement in creative click-through rates",
    ],
    takeaway: "Performance marketing is a creative discipline. The best results come from pairing data rigor with bold creative experimentation.",
  },
  {
    title: "Topgolf Consumer Retention",
    slug: "tg-consumer-retention",
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
    objective: "Build a scalable content engine for a luxury fashion house that drives organic discovery while maintaining premium brand positioning.",
    role: "Content Strategy Lead -- built editorial infrastructure from the ground up, blending high-end storytelling with SEO rigor.",
    challenge: "World-class products with no scalable content system meant the brand was invisible in organic search despite strong offline reputation.",
    actions: [
      "Built editorial strategy combining luxury storytelling with technical SEO",
      "Established editorial calendar producing 20+ premium pieces monthly",
      "Created scalable content workflow reducing production time by 60%",
      "Developed thought leadership positioning for industry publications",
    ],
    impact: [
      "5x organic traffic growth within 8 months",
      "Earned features in Vogue and WWD through thought leadership",
      "60% reduction in content production time via streamlined workflows",
    ],
    takeaway: "Premium brands can win at organic discovery without compromising their voice -- the key is treating SEO as a storytelling tool, not a formula.",
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
    objective: "Rebuild brand perception and trust for a fintech company losing ground to competitors with sharper, more modern identities.",
    role: "Brand Strategist -- led comprehensive rebrand from consumer research through visual identity redesign and coordinated rollout.",
    challenge: "A stale brand identity was eroding customer trust, while internal stakeholders across product, marketing, and sales needed alignment on the new direction.",
    actions: [
      "Conducted consumer research with 500+ respondents to identify perception gaps",
      "Developed new brand positioning, messaging architecture, and visual system",
      "Redesigned all customer-facing touchpoints for consistency",
      "Coordinated rollout across product, marketing, sales, and customer success",
    ],
    impact: [
      "80% improvement in unaided brand recall post-rebrand",
      "Unified brand experience across all customer touchpoints",
      "Cross-functional alignment achieved across 4 major departments",
    ],
    takeaway: "Rebranding isn't just about new visuals -- it's about rebuilding the internal narrative so every team tells the same story.",
  },
  {
    title: "Uber Eats Role Pilot",
    slug: "ue-role-pilot",
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
    objective: "Build a social-first brand presence from zero to 100K engaged followers, converting audience growth into measurable DTC revenue.",
    role: "Social Strategy Lead -- developed community-first approach prioritizing authentic engagement over vanity metrics.",
    challenge: "A new lifestyle brand with no existing social presence needed to build genuine community in platforms dominated by established competitors.",
    actions: [
      "Developed content pillars and editorial calendar driving 8% avg engagement rate",
      "Built influencer partnership program with 50+ creators generating authentic UGC",
      "Designed platform-specific strategies for Instagram and TikTok",
      "Created UGC programs turning customers into brand advocates",
    ],
    impact: [
      "0 to 100K followers across Instagram and TikTok in 6 months",
      "8% average engagement rate -- 4x industry benchmark",
      "Social-driven revenue = 35% of total DTC sales within first year",
    ],
    takeaway: "Community isn't built through broadcasting -- it's built through listening. The brands that grow fastest are the ones that make their audience feel heard.",
  },
  {
    title: "WWEX Brand Building",
    slug: "wwex-brand-building",
    category: "Creative Development",
    description:
      "Orchestrated a cross-channel product launch for a consumer tech brand, driving $5M in first-month revenue and earning press coverage in major outlets.",
    tags: ["Launch Strategy", "PR", "Experiential"],
    image: "/images/wwex2.png",
    year: "2022",
    longDescription:
      "Prism was launching their flagship consumer tech product into a competitive market. I led the integrated product launch strategy spanning experiential activations, PR, digital campaigns, and retail partnerships. The launch was designed as a cultural moment, not just a product release -- combining physical experiences with digital storytelling to create maximum impact at launch and sustained demand post-launch.",
    highlights: [
      "Generated $5M in revenue within the first 30 days of launch",
      "Secured press coverage in TechCrunch, The Verge, and Wired",
      "Designed experiential pop-up events in 3 cities driving 10K+ attendees",
      "Built retail launch playbook adopted across 200+ retail partner locations",
    ],
    objective: "Orchestrate a product launch that generates $5M in first-month revenue by creating a cultural moment, not just a product release.",
    role: "Integrated Launch Lead -- led cross-channel strategy spanning experiential, PR, digital, and retail partnerships.",
    challenge: "Launching into a competitive consumer tech market required differentiation through experience, not just features.",
    actions: [
      "Designed experiential pop-up events across 3 cities driving 10K+ attendees",
      "Coordinated PR strategy securing coverage in TechCrunch, The Verge, and Wired",
      "Built integrated digital campaign supporting pre-launch through post-launch",
      "Developed retail launch playbook for 200+ partner locations",
    ],
    impact: [
      "$5M in revenue within the first 30 days of launch",
      "Major press coverage in TechCrunch, The Verge, and Wired",
      "10K+ attendees across experiential pop-up events in 3 cities",
    ],
    takeaway: "The best product launches are cultural moments. When you design for experience first and product second, demand takes care of itself.",
  },
  {
    title: "Cyclebar Studio Growth",
    slug: "cb-studio-growth",
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
    objective: "Recapture premium shelf placement and increase velocity across 500+ retail stores by redesigning the in-store brand experience.",
    role: "Trade Marketing Lead -- led strategy rooted in shopper insights, category management, and retailer collaboration.",
    challenge: "Aggressive competitors with stronger retail relationships were winning shelf share, requiring a data-driven approach to reclaim premium placement.",
    actions: [
      "Built shopper insights program analyzing 10K+ in-store purchase behaviors",
      "Redesigned shelf layout, POS materials, and promotional cadence",
      "Developed modular POS toolkit adopted by 3 national retail chains",
      "Established direct retailer collaboration for premium endcap placement",
    ],
    impact: [
      "60% increase in shelf velocity across top-tier retail partners",
      "Premium endcap and eye-level placement in 500+ stores",
      "POS toolkit adopted by 3 national retail chains",
    ],
    takeaway: "Retail isn't won in the boardroom -- it's won at the shelf. The brands that invest in understanding the shopper's last 3 feet win the war.",
  },
  {
    title: "Photography Portfolio",
    slug: "photography-portfolio",
    category: "Visual Storytelling",
    description:
      "Authored a repeatable go-to-market playbook that standardized launch processes and reduced time-to-market by 40% across the portfolio.",
    tags: ["GTM Strategy", "Process Design", "Frameworks"],
    image: "/images/JF pics.png",
    year: "2020",
    longDescription:
      "After leading multiple product launches with varying degrees of structure, I identified the need for a standardized, repeatable go-to-market framework. I built a comprehensive GTM playbook that codified best practices across consumer research, positioning, creative development, channel strategy, and measurement. The playbook became the organization's default launch methodology, reducing time-to-market while improving consistency and cross-functional alignment.",
    highlights: [
      "Reduced average time-to-market by 40% through standardized processes",
      "Created a modular framework adopted across 12+ product launches",
      "Built cross-functional alignment templates improving stakeholder buy-in by 2x",
      "Designed measurement dashboards tracking launch KPIs in real-time",
    ],
    objective: "Create a standardized, repeatable go-to-market framework that reduces time-to-market and improves launch consistency across the portfolio.",
    role: "GTM Strategy Lead -- codified best practices across research, positioning, creative development, channel strategy, and measurement.",
    challenge: "Multiple product launches with varying degrees of structure led to inconsistent results and misaligned cross-functional teams.",
    actions: [
      "Audited past launches to identify patterns in success and failure",
      "Created modular GTM framework adopted across 12+ product launches",
      "Built cross-functional alignment templates improving stakeholder buy-in by 2x",
      "Designed real-time measurement dashboards tracking launch KPIs",
    ],
    impact: [
      "40% reduction in average time-to-market",
      "Framework adopted across 12+ product launches",
      "2x improvement in cross-functional stakeholder buy-in",
    ],
    takeaway: "Repeatable doesn't mean rigid. The best frameworks are modular -- they give teams a shared language while leaving room for creative adaptation.",
  },
]
