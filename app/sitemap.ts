import type { MetadataRoute } from "next"

import { site } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { pl: site.url, en: `${site.url}/en` },
      },
    },
    {
      url: `${site.url}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { pl: site.url, en: `${site.url}/en` },
      },
    },
    {
      url: `${site.url}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
