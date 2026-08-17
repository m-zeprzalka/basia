/**
 * Ściana mediów wariantu E — zdjęcia i nagrania w jednej siatce.
 *
 * `size` steruje rozpiętością kafelka na siatce 12-kolumnowej:
 *   wide  — 8 kolumn (16:10), tall — 4 kolumny × 2 rzędy (4:5 wysokie),
 *   square — 4 kolumny (1:1). Na mobile wszystko ma 2 kolumny z 4.
 * `tags` zasilają filtry (patrz `media.filters` w copy.ts).
 *
 * Nagrania (type: "video") to osadzenia YouTube (domena youtube-nocookie.com,
 * bez ciasteczek śledzących) ładowane dopiero po kliknięciu; przed interakcją
 * pobierana jest wyłącznie statyczna miniatura z i.ytimg.com.
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

export type MediaTag = "paryz" | "monachium" | "skopje" | "kadra"
export type MediaSize = "wide" | "tall" | "square"

export type PhotoItem = {
  id: string
  type: "photo"
  src: StaticImageData
  alt: string
  caption: string
  /** Etykieta imprezy na kafelku. */
  tag: string
  tags: MediaTag[]
  size: MediaSize
  position?: string
}

export type VideoItem = {
  id: string
  type: "video"
  /** Identyfikator YouTube (11 znaków) — osadzenie przez youtube-nocookie.com. */
  youtubeId: string
  /** Plakat — miniatura YouTube (i.ytimg.com), ładowana leniwie. */
  poster: string
  title: string
  /** Kanał / źródło nagrania. */
  source: string
  /** Kontekst: impreza i data. */
  context: string
  tag: string
  tags: MediaTag[]
  size: MediaSize
}

export type MediaItem = PhotoItem | VideoItem

const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/**
 * Nagrania z Barbarą — wyłącznie publiczne filmy z kanału Polskiego Związku
 * Pływackiego (zweryfikowane przez YouTube oEmbed 17.08.2026).
 */
export const videos: VideoItem[] = [
  {
    id: "video-paryz-4x200",
    type: "video",
    youtubeId: "6SCr58dm-oc",
    poster: ytPoster("6SCr58dm-oc"),
    title:
      "„Widzę wyraźny postęp i mam nadzieję, że następnym razem będzie jeszcze lepiej”",
    source: "Polski Związek Pływacki",
    context:
      "Po finale sztafety 4×200 m st. dowolnym · ME seniorów, Paryż, 10.08.2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "wide",
  },
  {
    id: "video-olsztyn-zloto",
    type: "video",
    youtubeId: "91JqmUw8gIY",
    poster: ytPoster("91JqmUw8gIY"),
    title: "16-letnia Barbara Leśniewska ze złotym medalem MP seniorów",
    source: "Polski Związek Pływacki",
    context: "Mistrzostwa Polski seniorów · Olsztyn, kwiecień 2026",
    tag: "Olsztyn 2026",
    tags: [],
    size: "wide",
  },
  {
    id: "video-lublin-braz",
    type: "video",
    youtubeId: "-rb_DXSbJX8",
    poster: ytPoster("-rb_DXSbJX8"),
    title: "Barbara Leśniewska po brązowym medalu polskiej sztafety w Lublinie",
    source: "Polski Związek Pływacki",
    context: "Mistrzostwa Europy seniorów na 25 m · Lublin, grudzień 2025",
    tag: "Lublin 2025",
    tags: [],
    size: "wide",
  },
  {
    id: "video-lublin-medal",
    type: "video",
    youtubeId: "4xwNc5fnC_0",
    poster: ytPoster("4xwNc5fnC_0"),
    title: "„Nie mogłam zasnąć po medalu”",
    source: "Polski Związek Pływacki",
    context: "Mistrzostwa Europy seniorów na 25 m · Lublin, grudzień 2025",
    tag: "Lublin 2025",
    tags: [],
    size: "wide",
  },
]

export const videoById = (id: VideoItem["id"]) => {
  const found = videos.find((video) => video.id === id)
  if (!found) throw new Error(`Brak nagrania: ${id}`)
  return found
}

export const photos: PhotoItem[] = [
  {
    id: "monachium-zloto",
    type: "photo",
    src: monachiumZloto,
    alt: "Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium",
    caption:
      "Złoto na 200 m stylem zmiennym — mistrzostwa Europy juniorów, Monachium 2026",
    tag: "Monachium 2026",
    tags: ["monachium"],
    size: "wide",
    position: "50% 42%",
  },
  {
    id: "paryz-przed-startem",
    type: "photo",
    src: paryzPrzedStartem,
    alt: "Barbara Leśniewska w słuchawkach i dresie reprezentacji Polski chwilę przed wyjściem na start w Paryżu",
    caption:
      "Chwila skupienia przed startem — mistrzostwa Europy seniorów, Paryż 2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "tall",
    position: "35% 25%",
  },
  {
    id: "paryz-razem",
    type: "photo",
    src: paryzSztafetaRazem,
    alt: "Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu; w tle logotyp European Aquatics Championships Paris 2026",
    caption: "Przed startem sztafety — Paryż 2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "square",
    position: "45% 50%",
  },
  {
    id: "paryz-4x200",
    type: "photo",
    src: paryzSztafeta4x200,
    alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska i Aleksandra Knop po finale sztafety 4×200 m stylem dowolnym w Paryżu",
    caption: "7. miejsce w finale 4×200 m stylem dowolnym — Paryż 2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "square",
    position: "50% 35%",
  },
  {
    id: "podium-zloto-skopje",
    type: "photo",
    src: podiumZloto,
    alt: "Barbara Leśniewska ze złotym medalem na podium Olimpijskiego Festiwalu Młodzieży Europy w Skopje",
    caption: "Złoto na 200 m stylem zmiennym — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    tags: ["skopje"],
    size: "tall",
    position: "50% 20%",
  },
  {
    id: "paryz-skok",
    type: "photo",
    src: paryzSkok,
    alt: "Barbara Leśniewska w locie tuż po skoku startowym ze słupka podczas eliminacji sztafety 4×100 m stylem zmiennym w Paryżu",
    caption: "Skok startowy — eliminacje 4×100 m stylem zmiennym, Paryż 2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "wide",
    position: "50% 45%",
  },
  {
    id: "po-wyscigu",
    type: "photo",
    src: poWyscigu,
    alt: "Zbliżenie na Barbarę Leśniewską w czerwonym czepku i okularach pływackich tuż po wyścigu",
    caption: "Chwila po wyścigu",
    tag: "Zawody",
    tags: ["kadra"],
    size: "square",
    position: "40% 30%",
  },
  {
    id: "srebrne-medale",
    type: "photo",
    src: srebrneMedale,
    alt: "Barbara Leśniewska pokazuje dwa srebrne medale zdobyte na EYOF w Skopje",
    caption: "Dwa srebrne medale — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    tags: ["skopje"],
    size: "square",
    position: "40% 30%",
  },
  {
    id: "paryz-mix",
    type: "photo",
    src: paryzSztafetaMix,
    alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok i Barbara Leśniewska pozdrawiają publiczność przed finałem sztafety mieszanej 4×100 m stylem zmiennym w Paryżu",
    caption:
      "Finał sztafety mieszanej 4×100 m stylem zmiennym — 8. miejsce, Paryż 2026",
    tag: "Paryż 2026",
    tags: ["paryz"],
    size: "wide",
    position: "50% 30%",
  },
  {
    id: "portret",
    type: "photo",
    src: portretBasen,
    alt: "Barbara Leśniewska w stroju startowym i czepku na hali basenowej",
    caption: "Przed startem",
    tag: "Trening",
    tags: ["kadra"],
    size: "tall",
    position: "55% 30%",
  },
  {
    id: "podium-srebro",
    type: "photo",
    src: podiumSrebro,
    alt: "Ceremonia dekoracji na Olimpijskim Festiwalu Młodzieży Europy — Barbara Leśniewska ze srebrnym medalem",
    caption: "Dekoracja medalowa — EYOF, Skopje 2025",
    tag: "Skopje 2025",
    tags: ["skopje"],
    size: "square",
    position: "20% 40%",
  },
  {
    id: "na-scianie",
    type: "photo",
    src: naScianie,
    alt: "Barbara Leśniewska przy ścianie basenu po zakończonym wyścigu",
    caption: "Meta",
    tag: "Zawody",
    tags: ["kadra"],
    size: "square",
    position: "60% 50%",
  },
  {
    id: "kciuk",
    type: "photo",
    src: kciukWGore,
    alt: "Barbara Leśniewska w wodzie pokazuje kciuk w górę po udanym starcie",
    caption: "Po udanym starcie",
    tag: "Zawody",
    tags: ["kadra"],
    size: "wide",
    position: "60% 40%",
  },
  {
    id: "cetniewo",
    type: "photo",
    src: cetniewo,
    alt: "Barbara Leśniewska oparta o brzeg basenu podczas zgrupowania kadry w Cetniewie",
    caption: "Zgrupowanie kadry — COS Cetniewo",
    tag: "Kadra",
    tags: ["kadra"],
    size: "square",
    position: "60% 50%",
  },
  {
    id: "reprezentacja",
    type: "photo",
    src: reprezentacja,
    alt: "Barbara Leśniewska w oficjalnym stroju reprezentacji Polski",
    caption: "W barwach reprezentacji Polski",
    tag: "Reprezentacja",
    tags: ["kadra"],
    size: "tall",
    position: "50% 20%",
  },
]

/**
 * Kolejność ściany mediów: nagrania przeplecione ze zdjęciami, żeby siatka
 * miała rytm (szeroki kafel wideo co kilka zdjęć).
 */
export const mediaItems: MediaItem[] = [
  photos[0],
  photos[1],
  photos[2],
  videoById("video-paryz-4x200"),
  photos[3],
  photos[4],
  photos[5],
  photos[6],
  videoById("video-olsztyn-zloto"),
  photos[7],
  photos[8],
  photos[9],
  videoById("video-lublin-braz"),
  photos[10],
  photos[11],
  photos[12],
  videoById("video-lublin-medal"),
  photos[13],
  photos[14],
]

/** Ile kafelków widać przed rozwinięciem (na każdym filtrze). */
export const mediaInitialCount = 9
