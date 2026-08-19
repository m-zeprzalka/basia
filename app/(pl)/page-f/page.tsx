import { ScrollProgress } from "@/components/motion/scroll-progress"
import { ContactF } from "@/components/page-f/contact-f"
import { CursorF } from "@/components/page-f/cursor-f"
import { HeroF } from "@/components/page-f/hero-f"
import { IntroProvider } from "@/components/page-f/intro-f"
import { LaneF } from "@/components/page-f/lane-f"
import { MediaF } from "@/components/page-f/media-f"
import { MedalsF } from "@/components/page-f/medals-f"
import { NavF } from "@/components/page-f/nav-f"
import { ParisF } from "@/components/page-f/paris-f"
import { PartnersF } from "@/components/page-f/partners-f"
import { ResultF } from "@/components/page-f/result-f"

/**
 * Wariant F — „Fotofinisz". Kinowa prezentacja: intro-stoper, okładka
 * z ultraskondensowanym nazwiskiem, replay finału z fotofiniszem, przypięty
 * tor poziomy, medale z pływającym kadrem, kinowy Paryż, taśma mediów,
 * partnerstwo na papierze i kontakt. Własna paleta i typografia, wspólne
 * dane z D/E.
 */
export default function PageF() {
  return (
    <IntroProvider>
      <a
        href="#tresc-f"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-chalk-f focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink-f"
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <NavF />
      <CursorF />

      <main id="tresc-f">
        <HeroF />
        <ResultF />
        <LaneF />
        <MedalsF />
        <ParisF />
        <MediaF />
        <PartnersF />
        <ContactF />
      </main>
    </IntroProvider>
  )
}
