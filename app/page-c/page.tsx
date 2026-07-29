import { BioC } from "@/components/page-c/bio-c"
import { ContactC } from "@/components/page-c/contact-c"
import { GalleryC } from "@/components/page-c/gallery-c"
import { HeroC } from "@/components/page-c/hero-c"
import { MunichC } from "@/components/page-c/munich-c"
import { NavC } from "@/components/page-c/nav-c"
import { PartnersC } from "@/components/page-c/partners-c"
import { ProgressionC } from "@/components/page-c/progression-c"
import { RecordsC } from "@/components/page-c/records-c"
import { SeasonsC } from "@/components/page-c/seasons-c"
import { StatsC } from "@/components/page-c/stats-c"

/**
 * Wariant C — trzecia propozycja graficzna na tych samych danych.
 * Editorial minimalism: światło, typografia, jeden akcent. Bez współdzielenia
 * komponentów z A/B poza generycznymi pomocnikami animacji.
 */
export default function PageC() {
  return (
    <>
      <a
        href="#tresc-c"
        className="label-c sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-ink-c focus:px-4 focus:py-3 focus:text-paper-c"
      >
        Przejdź do treści
      </a>

      <NavC />

      <main id="tresc-c">
        <HeroC />
        <StatsC />
        <MunichC />
        <BioC />
        <ProgressionC />
        <SeasonsC />
        <GalleryC />
        <RecordsC />
        <PartnersC />
        <ContactC />
      </main>
    </>
  )
}
