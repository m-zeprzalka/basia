import { ScrollProgress } from "@/components/motion/scroll-progress"
import { ContactD } from "@/components/page-d/contact-d"
import { DockD } from "@/components/page-d/dock-d"
import { GalleryD } from "@/components/page-d/gallery-d"
import { HeroD } from "@/components/page-d/hero-d"
import { MedalsD } from "@/components/page-d/medals-d"
import { NavD } from "@/components/page-d/nav-d"
import { ParisD } from "@/components/page-d/paris-d"
import { PartnersD } from "@/components/page-d/partners-d"
import { ThesisD } from "@/components/page-d/thesis-d"
import { TrajectoryD } from "@/components/page-d/trajectory-d"
import { SiteFooter } from "@/components/site/site-footer"

/**
 * Wariant D — „prezentacja dla sponsora" w języku wizualnym wariantu A.
 *
 * Jeden cel: rozmowa o kontrakcie. Stąd kolejność sekcji jak w pitch decku:
 * hak (hero) → teza (dlaczego teraz) → dowód wzrostu (trajektoria) →
 * dowód wygrywania (medale) → dowód poziomu seniorskiego (Paryż 2026) →
 * obraz (galeria) → oferta → kontakt. Na mobile każdy blok mieści się
 * w jednym–dwóch ekranach; szczegóły (pełna sylwetka, tabele rekordów,
 * pozostałe zdjęcia) są zwinięte i dostępne na życzenie.
 */
export default function PageD() {
  return (
    <>
      <a
        href="#tresc-d"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavD />

      <main id="tresc-d">
        <HeroD />
        <ThesisD />
        <TrajectoryD />
        <MedalsD />
        <ParisD />
        <GalleryD />
        <PartnersD />
        <ContactD />
      </main>

      <SiteFooter dataAsOf="17.08.2026" />
      <DockD />
    </>
  )
}
