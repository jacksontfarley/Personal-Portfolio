"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { projects, type Project } from "@/lib/projects"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

/* ── Simple content section ── */
function ContentSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
      <div className="w-40 flex-shrink-0">
        <span className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground">
          {label}
        </span>
      </div>
      <div className="flex-1 rounded-2xl border border-border bg-white px-6 py-4">
        {children}
      </div>
    </div>
  )
}

/* ── Text section ── */
function TextSection({ label, text }: { label: string; text: string }) {
  return (
    <ContentSection label={label}>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </ContentSection>
  )
}

/* ── List section ── */
function ListSection({ label, items }: { label: string; items: string[] }) {
  return (
    <ContentSection label={label}>
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
    </ContentSection>
  )
}

/* ── Project Card (simple, no animations) ── */
function ProjectCard({ project: p, isCurrent }: { project: Project; isCurrent: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 transition-colors duration-150 hover:bg-secondary/50"
      style={isCurrent ? {
        borderColor: "transparent",
        backgroundImage: `linear-gradient(white, white), ${RAINBOW}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      } : undefined}
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-xl">
        <Image src={p.dockIcon} alt={p.title} fill className="object-cover" sizes="64px" />
      </div>
      <p className="max-w-[100px] truncate text-center text-xs font-medium text-muted-foreground group-hover:text-foreground">
        {p.title}
      </p>
      {isCurrent && (
        <span
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
          style={{ background: RAINBOW }}
        />
      )}
    </Link>
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
          <TextSection label="Challenge" text={project.challenge} />
          <TextSection label="Objective" text={project.objective} />
          <TextSection label="Role" text={project.role} />
          <ListSection label="Actions" items={project.actions} />
          <ListSection label="Impact" items={project.impact} />
          <TextSection label="Takeaway" text={project.takeaway} />

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

      {/* Other Projects — simple card grid */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {"DON'T STOP NOW!"}
            </p>
            <div className="grid w-full max-w-2xl grid-cols-4 gap-3 md:grid-cols-8">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} isCurrent={p.slug === project.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
