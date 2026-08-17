import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — prezentacja dla partnerów",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, dwukrotna mistrzyni Polski seniorów, finalistka mistrzostw Europy seniorów. Prezentacja dla sponsorów i partnerów.",
  // Wariant do prezentacji — nie konkuruje w wyszukiwarce ze stroną główną.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — prezentacja dla partnerów",
    description: site.description,
    url: `${site.url}/page-d`,
  },
}

/**
 * Wariant D dzieli z wariantem A paletę, kroje pisma i tokeny (`globals.css`),
 * więc nie potrzebuje własnych fontów ani osobnego przemapowania kolorów.
 * Klasa `page-d` służy wyłącznie do drobnych, lokalnych nadpisań.
 */
export default function PageDLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-d">{children}</div>
}
