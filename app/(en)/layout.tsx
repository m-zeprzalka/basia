import type { Metadata, Viewport } from "next"

import "../globals.css"
import { site } from "@/data/site"
import { fontClassName } from "@/app/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Barbara Leśniewska — European junior swimming champion | Official site",
    template: "%s | Barbara Leśniewska",
  },
  description:
    "Official site of Barbara Leśniewska — European junior champion in the 200 m individual medley and multiple Polish record holder. Results, records, media and partnership opportunities.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Barbara Leśniewska",
    "swimming",
    "European junior champion",
    "Polish records",
    "200 m individual medley",
    "Polish national team",
    "sports sponsorship",
  ],
  alternates: {
    canonical: "/en",
    languages: { pl: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: `${site.url}/en`,
    siteName: site.name,
    title:
      "Barbara Leśniewska — European junior swimming champion | Official site",
    description:
      "Official site of Barbara Leśniewska — European junior champion in the 200 m individual medley and multiple Polish record holder.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Barbara Leśniewska — European junior swimming champion | Official site",
    description:
      "Official site of Barbara Leśniewska — European junior champion in the 200 m individual medley and multiple Polish record holder.",
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

export default function RootLayoutEn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontClassName}>
      <body>{children}</body>
    </html>
  )
}
