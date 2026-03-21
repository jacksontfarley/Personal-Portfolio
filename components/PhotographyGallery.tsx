"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CldImage } from "next-cloudinary"
import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type CloudinaryPhoto = {
  public_id: string
  width: number
  height: number
  secure_url: string
}

type Collection = "portraits" | "travel" | "brand"
type PortraitFilter = "all" | "fitness" | "corporate" | "personal"

// ─── Constants ────────────────────────────────────────────────────────────────

const RAINBOW = "linear-gradient(135deg, #FF3366, #FF6B35, #FFCC00, #00D4AA, #0099FF, #CC33FF)"

const COLLECTIONS: { id: Collection; label: string }[] = [
  { id: "portraits", label: "Portraits" },
  { id: "travel", label: "Travel" },
  { id: "brand", label: "Brand" },
]

const PORTRAIT_FILTERS: { id: PortraitFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fitness", label: "Fitness" },
  { id: "corporate", label: "Corporate" },
  { id: "personal", label: "Personal" },
]

// ─── Rainbow Pill Button ──────────────────────────────────────────────────────

function RainbowPill({
  label,
  isActive,
  onClick,
  small = false,
}: {
  label: string
  isActive: boolean
  onClick: () => void
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-500 ${
        small ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
      }`}
      style={{
        background: isActive ? RAINBOW : "var(--background)",
        color: isActive ? "#fff" : "var(--foreground)",
      }}
    >
      {!isActive && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
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
  onSelect,
}: {
  photos: CloudinaryPhoto[]
  onSelect: (index: number) => void
}) {
  // Split into 3 columns (2 on mobile via CSS)
  const columns: CloudinaryPhoto[][] = [[], [], []]
  photos.forEach((photo, i) => columns[i % 3].push(photo))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3">
          {col.map((photo, rowIdx) => {
            const globalIndex = colIdx + rowIdx * 3
            return (
              <motion.div
                key={photo.public_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: globalIndex * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-secondary"
                onClick={() => onSelect(globalIndex)}
              >
                <CldImage
                  src={photo.public_id}
                  width={600}
                  height={Math.round(600 * (photo.height / photo.width))}
                  alt=""
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Rainbow shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,51,102,0.08), rgba(0,153,255,0.08))`,
                  }}
                />
                {/* Rainbow bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: RAINBOW }}
                />
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: CloudinaryPhoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = photos[index]

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
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
    >
      {/* Rainbow top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: RAINBOW }}
      />

      {/* Close */}
      <button
        className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-white/40">
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={photo.public_id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <CldImage
          src={photo.public_id}
          width={1400}
          height={1000}
          alt=""
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
        />
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-4 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ collection }: { collection: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-32 gap-4"
    >
      <div
        className="h-[2px] w-16 rounded-full"
        style={{ background: RAINBOW }}
      />
      <p className="text-sm text-muted-foreground">
        No photos in {collection} yet.
      </p>
    </motion.div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  const heights = [220, 300, 180, 260, 200, 340, 190, 280, 240]
  const columns: number[][] = [[], [], []]
  heights.forEach((h, i) => columns[i % 3].push(h))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3">
          {col.map((h, i) => (
            <div
              key={i}
              className="rounded-xl bg-secondary animate-pulse"
              style={{ height: h }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PhotographyGallery() {
  const [activeCollection, setActiveCollection] = useState<Collection>("portraits")
  const [portraitFilter, setPortraitFilter] = useState<PortraitFilter>("all")
  const [photos, setPhotos] = useState<CloudinaryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Fetch photos when collection or sub-filter changes
  useEffect(() => {
    setLoading(true)
    setPhotos([])

    const folder =
      activeCollection === "portraits" && portraitFilter !== "all"
        ? `portraits/${portraitFilter}`
        : activeCollection

    fetch(`/api/photos?collection=${folder}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [activeCollection, portraitFilter])

  // Reset sub-filter when switching away from portraits
  const handleCollectionChange = (col: Collection) => {
    setActiveCollection(col)
    if (col !== "portraits") setPortraitFilter("all")
  }

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null))
  }, [photos.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null))
  }, [photos.length])

  return (
    <>
      {/* Collection tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {COLLECTIONS.map((col) => (
          <RainbowPill
            key={col.id}
            label={col.label}
            isActive={activeCollection === col.id}
            onClick={() => handleCollectionChange(col.id)}
          />
        ))}
      </motion.div>

      {/* Portrait sub-filters */}
      <AnimatePresence>
        {activeCollection === "portraits" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-2 mb-8 overflow-hidden"
          >
            {PORTRAIT_FILTERS.map((f) => (
              <RainbowPill
                key={f.id}
                label={f.label}
                isActive={portraitFilter === f.id}
                onClick={() => setPortraitFilter(f.id)}
                small
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rainbow divider */}
      <div
        className="h-[1px] w-full mb-8 opacity-30"
        style={{ background: RAINBOW }}
      />

      {/* Gallery */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSkeleton />
          </motion.div>
        ) : photos.length === 0 ? (
          <EmptyState collection={activeCollection} />
        ) : (
          <motion.div
            key={`${activeCollection}-${portraitFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MasonryGrid photos={photos} onSelect={setLightboxIndex} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo count */}
      {!loading && photos.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-xs tracking-widest uppercase text-muted-foreground"
        >
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </motion.p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
