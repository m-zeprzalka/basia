import type { Metadata } from "next"

import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — Fotofinisz (F)",
  description:
    "Barbara Leśniewska — mistrzyni Europy juniorów na 200 m stylem zmiennym, finalistka mistrzostw Europy seniorów. Kinowa prezentacja dla partnerów.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Barbara Leśniewska — Fotofinisz",
    description: site.description,
    url: `${site.url}/page-f`,
  },
}

/**
 * Wariant F ma własną paletę (atrament, papier, aqua) — klasa `page-f`
 * przemapowuje tokeny shadcn dla całej prezentacji (patrz globals.css).
 */
export default function PageFLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-f">{children}</div>
}
