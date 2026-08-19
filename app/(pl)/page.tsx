import { site } from "@/data/site"
import { SitePage } from "@/components/main/site-page"

/**
 * Strona główna — finalny układ wyłoniony w przetargu (dawny wariant I)
 * z poprawkami klienta z 19.08.2026. Wersja angielska: `/en`.
 */

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
    "Brązowy medal mistrzostw Europy seniorów na basenie 25 m (Lublin 2025)",
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
      <SitePage locale="pl" />
    </>
  )
}
