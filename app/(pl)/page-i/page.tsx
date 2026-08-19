import { ScrollProgress } from "@/components/motion/scroll-progress"
import { DockE } from "@/components/page-e/dock-e"
import { NavE } from "@/components/page-e/nav-e"
import { PartnersE } from "@/components/page-e/partners-e"
import { RailE } from "@/components/page-e/rail-e"
import { ContactH } from "@/components/page-h/contact-h"
import { MediaH } from "@/components/page-h/media-h"
import { MedalsH } from "@/components/page-h/medals-h"
import { TrajectoryH } from "@/components/page-h/trajectory-h"
import { CoverI } from "@/components/page-i/cover-i"
import { ParisI } from "@/components/page-i/paris-i"
import { ResultI } from "@/components/page-i/result-i"

/**
 * Wariant I — finalna wersja dla klienta: H plus szlif projektowy
 * z 18.08.2026. Struktura i rozdziały jak w E/H.
 *
 * Zasada: komponenty wariantu H pozostają NIETKNIĘTE — rozdziały bez zmian
 * (trajektoria, medale, media, kontakt) są stąd importowane, a każdy
 * rozdział ze zmianami ma nowy komponent w `components/page-i/`:
 * - okładka (`cover-i`) — zdjęcie q90, naliczana tablica wyników,
 * - wynik (`result-i` + `replay-i`) — fotofinisz jako rysunek techniczny
 *   (klamra wymiarowa 0,32 s, wyrównana legenda pod osią), fakty w pionowej
 *   liście `StatList` z naliczanymi liczbami zamiast trzech ciasnych kolumn,
 * - Paryż (`paris-i`) — pozioma rama 4:3 (zdjęcia pomniejszane zamiast
 *   powiększanych — koniec rozmycia), q90, fakty w `StatList`.
 */
export default function PageI() {
  return (
    <>
      <a
        href="#tresc-i"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavE />
      <RailE />

      <main id="tresc-i">
        <CoverI />
        <ResultI />
        <TrajectoryH />
        <MedalsH />
        <ParisI />
        <MediaH />
        <PartnersE />
        <ContactH />
      </main>

      <DockE />
    </>
  )
}
