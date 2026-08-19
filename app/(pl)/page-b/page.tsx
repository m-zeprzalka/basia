import { ScrollProgress } from "@/components/motion/scroll-progress"
import { BioB } from "@/components/page-b/bio-b"
import { BreakthroughB } from "@/components/page-b/breakthrough-b"
import { ContactB } from "@/components/page-b/contact-b"
import { GalleryB } from "@/components/page-b/gallery-b"
import { HeroB } from "@/components/page-b/hero-b"
import { MarqueeB } from "@/components/page-b/marquee-b"
import { NavB } from "@/components/page-b/nav-b"
import { PartnersB } from "@/components/page-b/partners-b"
import { ProgressionB } from "@/components/page-b/progression-b"
import { RecordsB } from "@/components/page-b/records-b"
import { StatsB } from "@/components/page-b/stats-b"
import { TimelineB } from "@/components/page-b/timeline-b"

/**
 * Wariant B — alternatywna propozycja graficzna na tych samych danych.
 * Kompletnie odrębny język wizualny; nie współdzieli komponentów z wariantem A
 * poza generycznymi pomocnikami animacji.
 */
export default function PageB() {
  return (
    <>
      <a
        href="#tresc-b"
        className="mono-b sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-ink-b focus:px-4 focus:py-3 focus:text-paper-b"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavB />

      <main id="tresc-b">
        <HeroB />
        <MarqueeB />
        <StatsB />
        <BreakthroughB />
        <BioB />
        <ProgressionB />
        <TimelineB />
        <GalleryB />
        <RecordsB />
        <PartnersB />
        <ContactB />
      </main>
    </>
  )
}
