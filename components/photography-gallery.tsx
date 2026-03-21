"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import type { CloudinaryPhoto } from "@/app/api/photos/route"

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

const TABS = [
  { id: "portraits", label: "Portraits" },
  { id: "travel",    label: "Travel" },
  { id: "brand",     label: "Brand" },
] as const

const PORTRAIT_FILTERS = [
  { id: "all",       label: "All" },
  { id: "fitness",   label: "Fitness" },
  { id: "corporate", label: "Corporate" },
  { id: "personal",  label: "Personal" },
] as const

type TabId = (typeof TABS)[number]["id"]
type PortraitFilterId = (typeof PORTRAIT_FILTERS)[number]["id"]

// ─── Pill Button ─────────────────────────────────────────────────────────────
function Pill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
      style={
        active
          ? { background: RAINBOW, color: "#fff" }
          : { background: "var(--background)", color: "var(--muted-foreground)" }
      }
    >
      {!active && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            padding: "1px",
            background: RAINBOW,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {label}
    </button>
  )
}

// ─── Masonry Grid ─────────────────────────────────────────────────────────────
function MasonryGrid({
  photos,
  onPhotoClick,
}: {
  photos: CloudinaryPhoto[]
  onPhotoClick: (index: number) => void
}) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-muted-foreground">No photos in this category yet.</p>
        <p className="mt-1 text-xs text-muted-foreground opacity-60">
          Add images to the matching Cloudinary folder to populate this gallery.
        </p>
      </div>
    )
  }

  // Split into 2 columns on mobile, 3 on md+
  const col1: { photo: CloudinaryPhoto; index: number }[] = []
  const col2: { photo: CloudinaryPhoto; index: number }[] = []
  const col3: { photo: CloudinaryPhoto; index: number }[] = []

  photos.forEach((photo, i) => {
    if (i % 3 === 0) col1.push({ photo, index: i })
    else if (i % 3 === 1) col2.push({ photo, index: i })
    else col3.push({ photo, index: i })
  })

  const Column = ({ items }: { items: { photo: CloudinaryPhoto; index: number }[] }) => (
    <div className="flex flex-col gap-3">
      {items.map(({ photo, index }) => {
        const aspectRatio = photo.width / photo.height
        return (
          <motion.div
            key={photo.public_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-secondary"
            style={{ aspectRatio }}
            onClick={() => onPhotoClick(index)}
          >
            <Image
              src={photo.secure_url}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
              <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
            {/* Rainbow bottom accent on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-full transition-transform duration-300 group-hover:translate-y-0"
              style={{ background: RAINBOW }}
            />
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <Column items={col1} />
      <Column items={col2} />
      <div className="hidden md:flex md:flex-col md:gap-3">
        {col3.map(({ photo, index }) => {
          const aspectRatio = photo.width / photo.height
          return (
            <motion.div
              key={photo.public_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-secondary"
              style={{ aspectRatio }}
              onClick={() => onPhotoClick(index)}
            >
              <Image
                src={photo.secure_url}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                style={{ background: RAINBOW }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: CloudinaryPhoto[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = photos[currentIndex]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Image */}
      <motion.div
        key={photo.public_id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[85vh] max-w-[90vw]"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.secure_url}
          alt=""
          fill
          className="rounded-xl object-contain"
          sizes="90vw"
          priority
        />
        {/* Rainbow bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl"
          style={{ background: RAINBOW }}
        />
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </motion.div>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export function PhotographyGallery() {
  const [activeTab, setActiveTab]       = useState<TabId>("portraits")
  const [portraitFilter, setPortraitFilter] = useState<PortraitFilterId>("all")
  const [photos, setPhotos]             = useState<CloudinaryPhoto[]>([])
  const [loading, setLoading]           = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchPhotos = useCallback(async (tab: TabId, filter: PortraitFilterId) => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setPhotos([])

    try {
      const params = new URLSearchParams({ tab, filter })
      const res = await fetch(`/api/photos?${params}`, { signal: abortRef.current.signal })
      if (!res.ok) throw new Error("fetch failed")
      const data = await res.json()
      setPhotos(data.photos ?? [])
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setPhotos([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPhotos(activeTab, activeTab === "portraits" ? portraitFilter : "all")
  }, [activeTab, portraitFilter, fetchPhotos])

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
    setPortraitFilter("all")
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
  [photos.length])
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
  [photos.length])

  return (
    <section className="px-6 pb-16 pt-4">
      <div className="mx-auto max-w-6xl">

        {/* Top-level tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {TABS.map((tab) => (
            <Pill
              key={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            />
          ))}
          {/* Rainbow divider */}
          <div className="ml-2 hidden h-4 w-px sm:block" style={{ background: RAINBOW }} />
        </div>

        {/* Portrait sub-filters */}
        <AnimatePresence>
          {activeTab === "portraits" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6 flex flex-wrap gap-2 overflow-hidden"
            >
              {PORTRAIT_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPortraitFilter(f.id)}
                  className="text-xs tracking-wide transition-colors duration-200"
                  style={{
                    color: portraitFilter === f.id ? "var(--foreground)" : "var(--muted-foreground)",
                    textDecoration: portraitFilter === f.id ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rainbow rule */}
        <div className="mb-8 h-[1px] w-full" style={{ background: RAINBOW, opacity: 0.3 }} />

        {/* Gallery grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-xl bg-secondary"
              />
            ))}
          </div>
        ) : (
          <MasonryGrid photos={photos} onPhotoClick={setLightboxIndex} />
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
