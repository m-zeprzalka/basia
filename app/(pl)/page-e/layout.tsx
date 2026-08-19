import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — prezentacja dla partnerów (E)",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, dwukrotna mistrzyni Polski seniorów, finalistka mistrzostw Europy seniorów. Multimedialna prezentacja dla sponsorów i partnerów.",
  // Wariant do prezentacji — nie konkuruje w wyszukiwarce ze stroną główną.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — prezentacja dla partnerów",
    description: site.description,
    url: `${site.url}/page-e`,
  },
}

/**
 * Wariant E dzieli z A paletę, kroje i tokeny (`globals.css`); klasa `page-e`
 * włącza tylko lokalne dodatki (kolor wstążki medalu, klasy `display-e`,
 * `board-e`, `lane-rope`).
 */
export default function PageELayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-e">{children}</div>
}
