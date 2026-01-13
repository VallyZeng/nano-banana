import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Design Banana - AI Image Editor | Transform Photos with Text",
    template: "%s | Design Banana",
  },
  description:
    "Transform any image with simple text prompts. Advanced AI model for consistent character editing and scene preservation.",
  keywords: [
    "AI image editor",
    "photo editing",
    "text-to-image",
    "character consistency",
    "AI art",
    "image transformation",
    "photo editing AI",
  ],
  authors: [{ name: "Design Banana" }],
  creator: "Design Banana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Design Banana - AI Image Editor | Transform Photos with Text",
    description:
      "Transform any image with simple text prompts. Advanced AI model for consistent character editing and scene preservation.",
    siteName: "Design Banana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Design Banana - AI Image Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Banana - AI Image Editor | Transform Photos with Text",
    description:
      "Transform any image with simple text prompts. Advanced AI model for consistent character editing and scene preservation.",
    images: ["/og-image.png"],
    creator: "@designbanana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
