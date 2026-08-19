import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"

import { site } from "@/data/site"

/* Lekki serif o wysokim kontraście optycznym — rola plakatowa wariantu C.
   Oś `opsz` pozwala przeglądarce dobrać rysunek liter do stopnia pisma. */
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Barbara Leśniewska — wariant C",
  description: site.description,
  // Alternatywna propozycja graficzna nie powinna konkurować w wyszukiwarce.
  robots: { index: false, follow: false },
}

export default function PageCLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`page-c ${fraunces.variable} ${manrope.variable}`}>
      {children}
    </div>
  )
}
