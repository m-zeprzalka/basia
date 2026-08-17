/**
 * Galeria wariantu D — osiem pierwszych zdjęć widać od razu, resztę po
 * rozwinięciu (na mobile galeria ma być krótka, nie kompletna).
 * Nowe kadry z mistrzostw Europy seniorów w Paryżu (sierpień 2026) są na początku.
 */

import type { StaticImageData } from "next/image"

import cetniewo from "@/assets/images/zgrupowanie-cetniewo.webp"
import kciukWGore from "@/assets/images/kciuk-w-gore.webp"
import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import naScianie from "@/assets/images/na-scianie-basenu.webp"
import paryzPrzedStartem from "@/assets/images/paryz-przed-startem.webp"
import paryzSkok from "@/assets/images/paryz-skok-startowy.webp"
import paryzSztafeta4x200 from "@/assets/images/paryz-sztafeta-4x200.webp"
import paryzSztafetaMix from "@/assets/images/paryz-sztafeta-mix.webp"
import paryzSztafetaRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import poWyscigu from "@/assets/images/po-wyscigu-czepek.webp"
import podiumSrebro from "@/assets/images/podium-srebro-skopje.webp"
import podiumZloto from "@/assets/images/podium-zloto-skopje.webp"
import portretBasen from "@/assets/images/portret-basen-szeroki.webp"
import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import srebrneMedale from "@/assets/images/srebrne-medale-skopje.webp"

export type GalleryItemD = {
  src: StaticImageData
  alt: string
  caption: string
  /** Etykieta imprezy — mały nadruk na kafelku. */
  tag: string
  /** Kadr w siatce — gdzie trzymać środek ciężkości zdjęcia. */
  position?: string
}

export const galleryD: GalleryItemD[] = [
  {
    src: monachiumZloto,
    alt: "Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium",
    caption:
      "Złoto na 200 m stylem zmiennym — mistrzostwa Europy juniorów, Monachium 2026",
    tag: "Monachium 2026",
    position: "50% 30%",
  },
  {
    src: paryzSztafetaRazem,
    alt: "Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu; w tle logotyp European Aquatics Championships Paris 2026",
    caption: "Przed startem sztafety — mistrzostwa Europy seniorów, Paryż 2026",
    tag: "Paryż 2026",
  },
  {
    src: paryzSztafeta4x200,
    alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska i Aleksandra Knop po finale sztafety 4×200 m stylem dowolnym w Paryżu",
    caption: "7. miejsce w finale 4×200 m stylem dowolnym — Paryż 2026",
    tag: "Paryż 2026",
    position: "50% 35%",
  },
  {
    src: paryzSkok,
    alt: "Barbara Leśniewska w locie tuż po skoku startowym ze słupka podczas eliminacji sztafety 4×100 m stylem zmiennym w Paryżu",
    caption: "Skok startowy — eliminacje 4×100 m stylem zmiennym, Paryż 2026",
    tag: "Paryż 2026",
    position: "50% 40%",
  },
  {
    src: poWyscigu,
    alt: "Zbliżenie na Barbarę Leśniewską w czerwonym czepku i okularach pływackich tuż po wyścigu",
    caption: "Chwila po wyścigu",
    tag: "Zawody",
    position: "40% 30%",
  },
  {
    src: podiumZloto,
    alt: "Barbara Leśniewska ze złotym medalem na podium Olimpijskiego Festiwalu Młodzieży Europy w Skopje",
    caption: "Złoto na 200 m stylem zmiennym — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    position: "50% 20%",
  },
  {
    src: paryzSztafetaMix,
    alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok i Barbara Leśniewska pozdrawiają publiczność przed finałem sztafety mieszanej 4×100 m stylem zmiennym w Paryżu",
    caption:
      "Finał sztafety mieszanej 4×100 m stylem zmiennym — 8. miejsce, Paryż 2026",
    tag: "Paryż 2026",
    position: "50% 30%",
  },
  {
    src: srebrneMedale,
    alt: "Barbara Leśniewska pokazuje dwa srebrne medale zdobyte na EYOF w Skopje",
    caption: "Dwa srebrne medale — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    position: "40% 30%",
  },
  {
    src: portretBasen,
    alt: "Barbara Leśniewska w stroju startowym i czepku na hali basenowej",
    caption: "Przed startem",
    tag: "Trening",
    position: "55% 30%",
  },
  {
    src: paryzPrzedStartem,
    alt: "Barbara Leśniewska w słuchawkach i dresie reprezentacji Polski chwilę przed wyjściem na start w Paryżu",
    caption: "Chwila skupienia przed startem — Paryż 2026",
    tag: "Paryż 2026",
    position: "35% 25%",
  },
  {
    src: podiumSrebro,
    alt: "Ceremonia dekoracji na Olimpijskim Festiwalu Młodzieży Europy — Barbara Leśniewska ze srebrnym medalem",
    caption: "Dekoracja medalowa — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    position: "20% 40%",
  },
  {
    src: naScianie,
    alt: "Barbara Leśniewska przy ścianie basenu po zakończonym wyścigu",
    caption: "Meta",
    tag: "Zawody",
    position: "60% 50%",
  },
  {
    src: kciukWGore,
    alt: "Barbara Leśniewska w wodzie pokazuje kciuk w górę po udanym starcie",
    caption: "Po udanym starcie",
    tag: "Zawody",
    position: "60% 40%",
  },
  {
    src: cetniewo,
    alt: "Barbara Leśniewska oparta o brzeg basenu podczas zgrupowania kadry w Cetniewie",
    caption: "Zgrupowanie kadry — COS Cetniewo",
    tag: "Kadra",
    position: "60% 50%",
  },
  {
    src: reprezentacja,
    alt: "Barbara Leśniewska w oficjalnym stroju reprezentacji Polski",
    caption: "W barwach reprezentacji Polski",
    tag: "Reprezentacja",
    position: "50% 20%",
  },
]

/** Ile kafelków widać przed rozwinięciem. */
export const galleryInitialCount = 8
