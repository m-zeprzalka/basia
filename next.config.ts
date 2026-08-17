import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Miniatury nagrań z YouTube (wariant E) — same plakaty; iframe ładuje się po kliknięciu.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
}

export default nextConfig
