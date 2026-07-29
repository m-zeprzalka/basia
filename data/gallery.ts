/** Galeria (3.8 copy). Zdjęcia importowane statycznie — next/image generuje blur i rozmiary. */

import type { StaticImageData } from "next/image"

import cetniewo from "@/assets/images/zgrupowanie-cetniewo.webp"
import kciukWGore from "@/assets/images/kciuk-w-gore.webp"
import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import naScianie from "@/assets/images/na-scianie-basenu.webp"
import poWyscigu from "@/assets/images/po-wyscigu-czepek.webp"
import podiumSrebro from "@/assets/images/podium-srebro-skopje.webp"
import podiumZloto from "@/assets/images/podium-zloto-skopje.webp"
import portretBasen from "@/assets/images/portret-basen-szeroki.webp"
import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import srebrneMedale from "@/assets/images/srebrne-medale-skopje.webp"

export type GalleryItem = {
  src: StaticImageData
  alt: string
  caption: string
}

export const galleryLead =
  "Basen to jej żywioł — od porannych treningów na Ursynowie po finały mistrzostw Europy."

export const gallery: GalleryItem[] = [
  {
    src: monachiumZloto,
    alt: "Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium",
    caption: "Złoto na 200 m stylem zmiennym — ME juniorów, Monachium 2026",
  },
  {
    src: poWyscigu,
    alt: "Zbliżenie na Barbarę Leśniewską w czerwonym czepku i okularach pływackich tuż po wyścigu",
    caption: "Chwila po wyścigu",
  },
  {
    src: podiumZloto,
    alt: "Barbara Leśniewska ze złotym medalem na podium Olimpijskiego Festiwalu Młodzieży Europy w Skopje",
    caption: "Złoto na 200 m stylem zmiennym — EYOF, Skopje 2025",
  },
  {
    src: srebrneMedale,
    alt: "Barbara Leśniewska pokazuje dwa srebrne medale zdobyte na EYOF w Skopje",
    caption: "Dwa srebrne medale — EYOF, Skopje 2025",
  },
  {
    src: podiumSrebro,
    alt: "Ceremonia dekoracji na Olimpijskim Festiwalu Młodzieży Europy — Barbara Leśniewska ze srebrnym medalem",
    caption: "Dekoracja medalowa — EYOF, Skopje 2025",
  },
  {
    src: portretBasen,
    alt: "Barbara Leśniewska w stroju startowym i czepku na hali basenowej",
    caption: "Przed startem",
  },
  {
    src: naScianie,
    alt: "Barbara Leśniewska przy ścianie basenu po zakończonym wyścigu",
    caption: "Meta",
  },
  {
    src: cetniewo,
    alt: "Barbara Leśniewska oparta o brzeg basenu podczas zgrupowania kadry w Cetniewie",
    caption: "Zgrupowanie kadry — COS Cetniewo",
  },
  {
    src: kciukWGore,
    alt: "Barbara Leśniewska w wodzie pokazuje kciuk w górę po udanym starcie",
    caption: "Po udanym starcie",
  },
  {
    src: reprezentacja,
    alt: "Barbara Leśniewska w oficjalnym stroju reprezentacji Polski",
    caption: "W barwach reprezentacji Polski",
  },
]
