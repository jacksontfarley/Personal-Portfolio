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

// Maps folder paths to gallery categories/sub-filters
// Folder structure expected in Cloudinary:
//   portraits/fitness, portraits/corporate, portraits/personal
//   travel
//   brand
const FOLDER_MAP: Record<string, { tab: string; filter?: string }> = {
  "portraits/fitness":   { tab: "portraits", filter: "fitness" },
  "portraits/corporate": { tab: "portraits", filter: "corporate" },
  "portraits/personal":  { tab: "portraits", filter: "personal" },
  portraits:             { tab: "portraits" },
  travel:                { tab: "travel" },
  brand:                 { tab: "brand" },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tab = searchParams.get("tab") ?? "portraits"
  const filter = searchParams.get("filter") ?? "all"

  try {
    // Build folder expression based on tab + filter
    let folderExpression: string
    if (tab === "portraits" && filter !== "all") {
  folderExpression = `folder:portfolio/portraits/${filter}`
} else if (tab === "portraits" && filter === "all") {
  folderExpression = `folder:portfolio/portraits`
} else {
  folderExpression = `folder:portfolio/${tab}/*`
}

    const result = await cloudinary.search
      .expression(folderExpression)
      .with_field("tags")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute()

    const photos: CloudinaryPhoto[] = (result.resources ?? []).map(
      (r: {
        public_id: string
        secure_url: string
        width: number
        height: number
        folder: string
        tags?: string[]
      }) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        width: r.width,
        height: r.height,
        folder: r.folder,
        tags: r.tags ?? [],
      })
    )

    return NextResponse.json({ photos })
  } catch (error) {
    console.error("[photos API] Cloudinary error:", error)
    return NextResponse.json({ photos: [], error: "Failed to fetch photos" }, { status: 500 })
  }
}
