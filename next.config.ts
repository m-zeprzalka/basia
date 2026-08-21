import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Miniatury nagrań z YouTube (warianty E/H) — same plakaty; iframe ładuje się po kliknięciu.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    // 90 dla dużych kadrów (galeria, lightbox) — oryginały są już stratne,
    // więc domyślne 75 dokładałoby drugą warstwę artefaktów.
    qualities: [75, 90],
  },
  // Etap prezentacji dla sponsorów — nagłówek blokuje indeksowanie każdej
  // odpowiedzi (także sitemap.xml i obrazków OG). Usunąć przed startem.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]
  },
}

export default nextConfig
