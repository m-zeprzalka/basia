import { ScrollProgress } from "@/components/motion/scroll-progress"
import { CoverE } from "@/components/page-e/cover-e"
import { DockE } from "@/components/page-e/dock-e"
import { NavE } from "@/components/page-e/nav-e"
import { ParisE } from "@/components/page-e/paris-e"
import { PartnersE } from "@/components/page-e/partners-e"
import { RailE } from "@/components/page-e/rail-e"
import { ContactH } from "@/components/page-h/contact-h"
import { MediaH } from "@/components/page-h/media-h"
import { MedalsH } from "@/components/page-h/medals-h"
import { ResultH } from "@/components/page-h/result-h"
import { TrajectoryH } from "@/components/page-h/trajectory-h"

/**
 * Wariant H — wersja ostateczna prezentacji („pływacki minimalizm" z E
 * plus poprawki klienta z 18.08.2026).
 *
 * Struktura i rozdziały jak w E: okładka → wynik → trajektoria → medale →
 * Paryż 2026 → media → partnerstwo → kontakt. Różnice względem E:
 * replay finału w rozdziale 01 (z wariantu F, dopracowany na mobile),
 * wykres trajektorii na pełną szerokość karty, kadry nagrań bez czarnych
 * pasów, medale w tabelach rekordów, dwa nowe zdjęcia, dwa reelsy
 * z Facebooka, artykuł Przeglądu Sportowego i Instagram Barbary.
 * Rozdziały bez zmian (okładka, Paryż, partnerstwo, nawigacja) pochodzą
 * wprost z `components/page-e/`.
 */
export default function PageH() {
  return (
    <>
      <a
        href="#tresc-h"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavE />
      <RailE />

      <main id="tresc-h">
        <CoverE />
        <ResultH />
        <TrajectoryH />
        <MedalsH />
        <ParisE />
        <MediaH />
        <PartnersE />
        <ContactH />
      </main>

      <DockE />
    </>
  )
}
