"use client"

// Force cache bust - v2
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { projects, type Project } from "@/lib/projects"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

/* ── Pill Row with IntersectionObserver for scroll activation ── */
function PillRow({
  label,
  children,
  index,
}: {
  label: string
  children: React.ReactNode
  index: number
}) {
  const rowId = `pill-row-${index}`

  return (
    <div
      id={rowId}
      className="pill-row flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
    >
      {/* Left pill */}
      <div className="w-40 flex-shrink-0">
        <span className="pill-label inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-all duration-300">
          {label}
        </span>
      </div>
      {/* Right content */}
      <div className="pill-content flex-1 rounded-2xl border border-border bg-white px-6 py-4 transition-all duration-300">
        {children}
      </div>
    </div>
  )
}

/* ── Text row ── */
function TextRow({ label, text, index }: { label: string; text: string; index: number }) {
  return (
    <PillRow label={label} index={index}>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </PillRow>
  )
}

/* ── List row ── */
function ListRow({ label, items, index }: { label: string; items: string[]; index: number }) {
  return (
    <PillRow label={label} index={index}>
      <div className="flex flex-col gap-2.5">
        {items.map((item, j) => {
          if (item === "") return <div key={j} className="h-2" />
          if (/^\d+\.\s/.test(item)) {
            return (
              <p key={j} className="text-sm font-semibold leading-relaxed text-foreground">
                {item}
              </p>
            )
          }
          const colonIdx = item.indexOf(":")
          return (
            <div key={j} className="flex items-start gap-3 pl-5 text-sm leading-relaxed text-muted-foreground">
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF3366, #CC33FF)" }}
              />
              {colonIdx > -1 ? (
                <span>
                  <span className="font-semibold text-foreground">{item.slice(0, colonIdx + 1)}</span>
                  {item.slice(colonIdx + 1)}
                </span>
              ) : (
                item
              )}
            </div>
          )
        })}
      </div>
    </PillRow>
  )
}

/* ── Project Card (no images, text only) ── */
function ProjectCard({ project: p, isCurrent }: { project: Project; isCurrent: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className={
        "group relative flex items-center justify-center rounded-xl border p-3 text-center transition-colors duration-150 hover:bg-secondary/50 " +
        (isCurrent ? "border-transparent" : "border-border bg-white")
      }
      style={
        isCurrent
          ? {
              backgroundImage: `linear-gradient(white, white), ${RAINBOW}`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : undefined
      }
    >
      <span className="line-clamp-2 text-xs font-medium leading-tight text-muted-foreground group-hover:text-foreground">
        {p.title}
      </span>
    </Link>
  )
}

/* ── Scroll Observer Script ── */
function ScrollObserverScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  if (typeof IntersectionObserver === 'undefined') return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var row = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
        row.classList.add('pill-active');
      } else {
        row.classList.remove('pill-active');
      }
    });
  }, { threshold: [0, 0.4, 1], rootMargin: '-20% 0px -20% 0px' });

  document.querySelectorAll('.pill-row').forEach(function(el) {
    observer.observe(el);
  });
})();
`,
      }}
    />
  )
}

export function ProjectPageContent({ project }: { project: Project }) {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="px-6 pb-8 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#work"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all work
          </Link>

          <h1 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {[project.category, project.year].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[16/5] overflow-hidden rounded-xl bg-secondary">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)" }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <TextRow label="Challenge" text={project.challenge} index={0} />
          <TextRow label="Objective" text={project.objective} index={1} />
          <TextRow label="Role" text={project.role} index={2} />
          <ListRow label="Actions" items={project.actions} index={3} />
          <ListRow label="Impact" items={project.impact} index={4} />
          <TextRow label="Takeaway" text={project.takeaway} index={5} />

          <div className="flex justify-end pt-4">
            <Image
              src="/Smiley.PNG"
              alt=""
              width={48}
              height={48}
              className="rotate-[15deg] opacity-75"
              style={{ width: 48, height: 48 }}
            />
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {"DON'T STOP NOW!"}
            </p>
            <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} isCurrent={p.slug === project.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline script for scroll-based pill activation — no React hooks */}
      <ScrollObserverScript />
    </main>
  )
}
