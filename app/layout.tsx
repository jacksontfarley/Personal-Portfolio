import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Jackson Farley",
  openGraph: {
    title: "Jackson Farley",
    images: [
      {
        url: "/10.png",
        width: 1200,
        height: 630,
        alt: "Jackson Farley",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
