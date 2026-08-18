import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — prezentacja dla partnerów",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, dwukrotna mistrzyni Polski seniorów, finalistka mistrzostw Europy seniorów. Multimedialna prezentacja dla sponsorów i partnerów.",
  // Wersja finalna prezentacji — do czasu podpięcia pod domenę nie
  // konkuruje w wyszukiwarce ze stroną główną.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — prezentacja dla partnerów",
    description: site.description,
    url: `${site.url}/page-i`,
  },
}

/**
 * Wariant I (finalny szlif H) dzieli z E/H paletę, kroje, tokeny i siatkę;
 * klasa `page-i` włącza te same lokalne dodatki (kolor wstążki medalu na
 * jasnym i ciemnym tle).
 */
export default function PageILayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-i">{children}</div>
}
