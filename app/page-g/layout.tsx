import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — Tafla (G)",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, finalistka mistrzostw Europy seniorów. Jasna, plakatowa prezentacja dla partnerów.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — Tafla",
    description: site.description,
    url: `${site.url}/page-g`,
  },
}

/** Wariant G — jasny odpowiednik F; klasa `page-g` przemapowuje tokeny. */
export default function PageGLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-g">{children}</div>
}
