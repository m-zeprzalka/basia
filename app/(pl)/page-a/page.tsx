import { site } from "@/data/site"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { About } from "@/components/site/about"
import { Achievements } from "@/components/site/achievements"
import { Contact } from "@/components/site/contact"
import { Gallery } from "@/components/site/gallery"
import { Hero } from "@/components/site/hero"
import { Munich } from "@/components/site/munich"
import { Progression } from "@/components/site/progression"
import { Records } from "@/components/site/records"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Sponsorship } from "@/components/site/sponsorship"
import { StatsBar } from "@/components/site/stats-bar"
import { Ticker } from "@/components/site/ticker"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Pływaczka, reprezentantka Polski",
  nationality: { "@type": "Country", name: "Polska" },
  birthDate: String(site.birthYear),
  memberOf: {
    "@type": "SportsOrganization",
    name: site.club,
    sport: "Swimming",
  },
  knowsAbout: ["Pływanie", "Styl zmienny", "Styl dowolny", "Styl motylkowy"],
  award: [
    "Złoty medal mistrzostw Europy juniorów 2026 — 200 m stylem zmiennym (2:12,45)",
    "Brązowy medal mistrzostw Europy juniorów 2026 — 100 m stylem motylkowym (58,78)",
    "Dwa złote medale mistrzostw Polski seniorów 2026",
    "Pięć medali Olimpijskiego Festiwalu Młodzieży Europy 2025",
    "14 rekordów Polski w kategoriach wiekowych 15–18 lat",
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Dane strukturalne budowane z jednego, statycznego źródła.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <SiteHeader />

      <main id="tresc">
        <Hero />
        <Ticker />
        <StatsBar />
        <Munich />
        <About />
        <Progression />
        <Achievements />
        <Gallery />
        <Records />
        <Sponsorship />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
