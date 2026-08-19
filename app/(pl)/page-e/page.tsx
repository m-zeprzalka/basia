import { ScrollProgress } from "@/components/motion/scroll-progress"
import { ContactE } from "@/components/page-e/contact-e"
import { CoverE } from "@/components/page-e/cover-e"
import { DockE } from "@/components/page-e/dock-e"
import { MediaE } from "@/components/page-e/media-e"
import { MedalsE } from "@/components/page-e/medals-e"
import { NavE } from "@/components/page-e/nav-e"
import { ParisE } from "@/components/page-e/paris-e"
import { PartnersE } from "@/components/page-e/partners-e"
import { RailE } from "@/components/page-e/rail-e"
import { ResultE } from "@/components/page-e/result-e"
import { TrajectoryE } from "@/components/page-e/trajectory-e"

/**
 * Wariant E — multimedialna prezentacja dla partnerów („pływacki minimalizm").
 *
 * Osiem rozdziałów jak osiem slajdów: okładka → wynik → trajektoria → medale →
 * Paryż 2026 → media → partnerstwo → kontakt. Wszystko na jednej siatce
 * 12 kolumn (`components/page-e/frame-e.tsx`), z bocznym paskiem rozdziałów
 * na desktopie i pływającym CTA na mobile.
 */
export default function PageE() {
  return (
    <>
      <a
        href="#tresc-e"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavE />
      <RailE />

      <main id="tresc-e">
        <CoverE />
        <ResultE />
        <TrajectoryE />
        <MedalsE />
        <ParisE />
        <MediaE />
        <PartnersE />
        <ContactE />
      </main>

      <DockE />
    </>
  )
}
