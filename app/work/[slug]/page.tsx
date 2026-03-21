import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { ProjectPageContent } from "@/components/project-page-content"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} - Jackson Farley`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectPageContent project={project} />
}
