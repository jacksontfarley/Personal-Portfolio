import Image from "next/image"

export function HeroGhostImage() {
  return (
    <div
      className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 w-[60%] max-w-[600px] sm:w-[50%] sm:right-0 md:w-[42%] md:right-[2%]"
      style={{ opacity: 0.1 }}
    >
      <Image
        src="/JF_headshot.png"
        alt=""
        width={600}
        height={600}
        className="h-auto w-full grayscale"
        priority
      />
    </div>
  )
}
