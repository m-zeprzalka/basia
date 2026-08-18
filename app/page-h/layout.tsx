import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — prezentacja dla partnerów",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, dwukrotna mistrzyni Polski seniorów, finalistka mistrzostw Europy seniorów. Multimedialna prezentacja dla sponsorów i partnerów.",
  // Wersja ostateczna prezentacji — do czasu podpięcia pod domenę nie
  // konkuruje w wyszukiwarce ze stroną główną.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — prezentacja dla partnerów",
    description: site.description,
    url: `${site.url}/page-h`,
  },
}

/**
 * Wariant H (wersja ostateczna) dzieli z E paletę, kroje, tokeny i siatkę;
 * klasa `page-h` włącza te same lokalne dodatki co `page-e` (kolor wstążki
 * medalu na jasnym i ciemnym tle).
 */
export default function PageHLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-h">{children}</div>
}
