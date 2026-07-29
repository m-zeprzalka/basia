import type { Metadata, Viewport } from "next"
import { Archivo, Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { site } from "@/data/site"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Barbara Leśniewska",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Barbara Leśniewska",
    "pływanie",
    "mistrzyni Europy juniorek",
    "rekordy Polski",
    "200 m stylem zmiennym",
    "reprezentacja Polski",
    "sponsoring sportowy",
    "UKS GIM 92 Ursynów",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={cn(
        "antialiased",
        inter.variable,
        archivo.variable,
        jetbrainsMono.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
