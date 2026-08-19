import type { Metadata } from "next"
import { Anton, Space_Grotesk } from "next/font/google"

import { site } from "@/data/site"

/* Krój plakatowy — wąski, jednowagowy, wersalikowy. Świadomie odwrotność
   szerokiego Archivo z wariantu A. */
const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Barbara Leśniewska — wariant B",
  description: site.description,
  // Alternatywna propozycja graficzna nie powinna konkurować w wyszukiwarce.
  robots: { index: false, follow: false },
}

export default function PageBLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`page-b ${anton.variable} ${spaceGrotesk.variable}`}>
      {children}
    </div>
  )
}
