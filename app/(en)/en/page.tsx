import { site } from "@/data/site"
import { SitePage } from "@/components/main/site-page"

/**
 * English version of the main page — same layout, English dictionary.
 * Polish version: `/`.
 */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: `${site.url}/en`,
  jobTitle: "Swimmer, Polish national team member",
  nationality: { "@type": "Country", name: "Poland" },
  birthDate: String(site.birthYear),
  memberOf: {
    "@type": "SportsOrganization",
    name: site.club,
    sport: "Swimming",
  },
  knowsAbout: ["Swimming", "Individual medley", "Freestyle", "Butterfly"],
  award: [
    "European Junior Championships 2026 gold — 200 m individual medley (2:12.45)",
    "European Junior Championships 2026 bronze — 100 m butterfly (58.78)",
    "Two Polish senior titles (2026)",
    "European Short Course Championships bronze (Lublin 2025)",
    "Five medals at the European Youth Olympic Festival 2025",
    "14 Polish age-group records (ages 15–18)",
  ],
}

export default function HomePageEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SitePage locale="en" />
    </>
  )
}
