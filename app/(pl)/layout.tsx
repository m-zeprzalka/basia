import type { Metadata, Viewport } from "next"

import "../globals.css"
import { site } from "@/data/site"
import { fontClassName } from "@/app/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Barbara Leśniewska — mistrzyni Europy juniorów w pływaniu | Oficjalna strona",
    template: "%s | Barbara Leśniewska",
  },
  description:
    "Oficjalna strona Barbary Leśniewskiej — mistrzyni Europy juniorów na 200 m st. zmiennym, multimedalistki i wielokrotnej rekordzistki Polski. Wyniki, rekordy, media, współpraca ze sponsorami.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Barbara Leśniewska",
    "pływanie",
    "mistrzyni Europy juniorów",
    "rekordy Polski",
    "200 m stylem zmiennym",
    "reprezentacja Polski",
    "sponsoring sportowy",
    "UKS GIM 92 Ursynów",
  ],
  alternates: {
    canonical: "/",
    languages: { pl: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title:
      "Barbara Leśniewska — mistrzyni Europy juniorów w pływaniu | Oficjalna strona",
    description:
      "Oficjalna strona Barbary Leśniewskiej — mistrzyni Europy juniorów na 200 m st. zmiennym, multimedalistki i wielokrotnej rekordzistki Polski.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Barbara Leśniewska — mistrzyni Europy juniorów w pływaniu | Oficjalna strona",
    description:
      "Oficjalna strona Barbary Leśniewskiej — mistrzyni Europy juniorów na 200 m st. zmiennym, multimedalistki i wielokrotnej rekordzistki Polski.",
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

export default function RootLayoutPl({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={fontClassName}>
      <body>{children}</body>
    </html>
  )
}
