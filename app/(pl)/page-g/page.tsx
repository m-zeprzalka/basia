import { ScrollProgress } from "@/components/motion/scroll-progress"
import { CursorF } from "@/components/page-f/cursor-f"
import { ContactG } from "@/components/page-g/contact-g"
import { HeroG } from "@/components/page-g/hero-g"
import { IntroProviderG } from "@/components/page-g/intro-g"
import { LaneG } from "@/components/page-g/lane-g"
import { MediaG } from "@/components/page-g/media-g"
import { MedalsG } from "@/components/page-g/medals-g"
import { NavG } from "@/components/page-g/nav-g"
import { ParisG } from "@/components/page-g/paris-g"
import { PartnersG } from "@/components/page-g/partners-g"
import { ResultG } from "@/components/page-g/result-g"

/**
 * Wariant G — „Tafla": jasny odpowiednik F na tym samym poziomie. Papier,
 * czerń tuszu, sygnałowa czerwień; plakatowa okładka; te same mechaniki
 * (intro-stoper, replay z fotofiniszem, przypięty tor, pływający kadr,
 * taśma) i jedna ciemna plansza (partnerstwo). Kursor własny wspólny z F.
 */
export default function PageG() {
  return (
    <IntroProviderG>
      <a
        href="#tresc-g"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-ink-g focus:px-4 focus:py-2.5 focus:text-sm focus:text-paper-g"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavG />
      <CursorF />

      <main id="tresc-g">
        <HeroG />
        <ResultG />
        <LaneG />
        <MedalsG />
        <ParisG />
        <MediaG />
        <PartnersG />
        <ContactG />
      </main>
    </IntroProviderG>
  )
}
