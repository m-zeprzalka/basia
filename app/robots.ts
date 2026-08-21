import type { MetadataRoute } from "next"

// Etap prezentacji dla sponsorów — blokada całej witryny.
// Przed publicznym startem przywrócić: allow "/" + sitemap (git log tego pliku).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  }
}
