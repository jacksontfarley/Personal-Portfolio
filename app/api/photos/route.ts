import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryPhoto {
  public_id: string
  secure_url: string
  width: number
  height: number
  folder: string
  tags: string[]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tab = searchParams.get("tab") ?? "portraits"
  const filter = searchParams.get("filter") ?? "all"

  try {
    let photos: CloudinaryPhoto[] = []

    if (tab === "portraits" && filter === "all") {
      const [fitness, corporate, personal] = await Promise.all([
        cloudinary.search.expression("folder:portfolio/portraits/fitness").sort_by("created_at", "desc").max_results(100).execute(),
        cloudinary.search.expression("folder:portfolio/portraits/corporate").sort_by("created_at", "desc").max_results(100).execute(),
        cloudinary.search.expression("folder:portfolio/portraits/personal").sort_by("created_at", "desc").max_results(100).execute(),
      ])
      const all = [...(fitness.resources ?? []), ...(corporate.resources ?? []), ...(personal.resources ?? [])]
      photos = all.map((r: any) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        width: r.width,
        height: r.height,
        folder: r.folder,
        tags: r.tags ?? [],
      }))
    } else {
      const folderExpression = tab === "portraits"
        ? `folder:portfolio/portraits/${filter}`
        : `folder:portfolio/${tab}/*`

      const result = await cloudinary.search
        .expression(folderExpression)
        .with_field("tags")
        .sort_by("created_at", "desc")
        .max_results(100)
        .execute()

      photos = (result.resources ?? []).map((r: any) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        width: r.width,
        height: r.height,
        folder: r.folder,
        tags: r.tags ?? [],
      }))
    }

    return NextResponse.json({ photos })
  } catch (error) {
    console.error("[photos API] Cloudinary error:", error)
    return NextResponse.json({ photos: [], error: "Failed to fetch photos" }, { status: 500 })
  }
}
