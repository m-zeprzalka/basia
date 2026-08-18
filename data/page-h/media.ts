/**
 * Ściana mediów wariantu H — zdjęcia i nagrania w jednej siatce.
 *
 * `size` steruje rozpiętością kafelka na siatce 12-kolumnowej:
 *   wide  — 8 kolumn (16:10), tall — 4 kolumny × 2 rzędy (4:5 wysokie),
 *   square — 4 kolumny (1:1). Na mobile wszystko ma 2 kolumny z 4.
 * `tags` zasilają filtry (patrz `media.filters` w copy).
 *
 * Nagrania (type: "video") mają dwa źródła:
 *   provider "youtube"  — osadzenie przez youtube-nocookie.com po kliknięciu;
 *                         plakat to miniatura maxresdefault (1280×720, 16:9 —
 *                         bez czarnych pasów wtopionych w hqdefault).
 *   provider "facebook" — reel osadzony przez facebook.com/plugins/video.php
 *                         po kliknięciu; plakatem jest pobrana okładka reela
 *                         (lokalny WebP), więc przed interakcją nie ładuje się
 *                         nic z serwerów Facebooka.
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
import portretStudio from "@/assets/images/portret-studio.webp"
import reelBydgoszcz from "@/assets/images/reel-bydgoszcz.webp"
import reelMonachium from "@/assets/images/reel-monachium.webp"
import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import srebrneMedale from "@/assets/images/srebrne-medale-skopje.webp"
import wroclawPrzedStartem from "@/assets/images/wroclaw-przed-startem.webp"

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

type VideoBase = {
  id: string
  type: "video"
  title: string
  /** Kanał / źródło nagrania. */
  source: string
  /** Kontekst: impreza i data. */
  context: string
  tag: string
  tags: MediaTag[]
  size: MediaSize
}

export type YouTubeVideoItem = VideoBase & {
  provider: "youtube"
  /** Identyfikator YouTube (11 znaków) — osadzenie przez youtube-nocookie.com. */
  youtubeId: string
  /** Plakat — miniatura YouTube (i.ytimg.com), ładowana leniwie. */
  poster: string
}

export type FacebookVideoItem = VideoBase & {
  provider: "facebook"
  /** Publiczny adres reela — osadzany przez facebook.com/plugins/video.php. */
  url: string
  /** Plakat — lokalna okładka reela (zero zapytań do Facebooka przed kliknięciem). */
  poster: StaticImageData
}

export type VideoItem = YouTubeVideoItem | FacebookVideoItem
export type MediaItem = PhotoItem | VideoItem

/** Miniatura 16:9 w pełnej rozdzielczości — dostępność zweryfikowana 18.08.2026. */
const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

/**
 * Nagrania z Barbarą: publiczne filmy z kanału Polskiego Związku Pływackiego
 * (YouTube, oEmbed zweryfikowany 17.08.2026) oraz dwa publiczne reelsy
 * z Facebooka wskazane przez klienta (osadzenie zweryfikowane 18.08.2026).
 */
export const videos: VideoItem[] = [
  {
    id: "video-paryz-4x200",
    type: "video",
    provider: "youtube",
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
    provider: "youtube",
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
    provider: "youtube",
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
    provider: "youtube",
    youtubeId: "4xwNc5fnC_0",
    poster: ytPoster("4xwNc5fnC_0"),
    title: "„Nie mogłam zasnąć po medalu”",
    source: "Polski Związek Pływacki",
    context: "Mistrzostwa Europy seniorów na 25 m · Lublin, grudzień 2025",
    tag: "Lublin 2025",
    tags: [],
    size: "wide",
  },
  {
    id: "reel-monachium",
    type: "video",
    provider: "facebook",
    url: "https://www.facebook.com/reel/2263903744355786",
    poster: reelMonachium,
    title: "„16-letnia Polka przeszła do historii”",
    source: "Sportowy Fanatyk · Facebook",
    context: "Po złocie mistrzostw Europy juniorów · Monachium 2026",
    tag: "Monachium 2026",
    tags: ["monachium"],
    size: "tall",
  },
  {
    id: "reel-bydgoszcz",
    type: "video",
    provider: "facebook",
    url: "https://www.facebook.com/reel/25249207441439273",
    poster: reelBydgoszcz,
    title: "Rekord Polski Barbary Leśniewskiej na MP 15-latków",
    source: "Swimm PL · Facebook",
    context: "Zapis transmisji · Bydgoszcz",
    tag: "Bydgoszcz",
    tags: [],
    size: "wide",
  },
]

export const videoById = (id: VideoItem["id"]) => {
  const found = videos.find((video) => video.id === id)
  if (!found) throw new Error(`Brak nagrania: ${id}`)
  return found
}

export const youtubeById = (id: VideoItem["id"]) => {
  const found = videoById(id)
  if (found.provider !== "youtube")
    throw new Error(`Nagranie ${id} nie pochodzi z YouTube`)
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
    id: "portret-studio",
    type: "photo",
    src: portretStudio,
    alt: "Portret studyjny Barbary Leśniewskiej — uśmiechnięta, z dłońmi splecionymi pod brodą",
    caption: "Portret studyjny",
    tag: "Portret",
    tags: ["kadra"],
    size: "square",
    position: "50% 30%",
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
    id: "wroclaw-przed-startem",
    type: "photo",
    src: wroclawPrzedStartem,
    alt: "Barbara Leśniewska poprawia czepek za słupkiem startowym toru 5 przed startem podczas zawodów we Wrocławiu",
    caption: "Tor 5, ostatnie sekundy przed startem — Wrocław",
    tag: "Zawody",
    tags: ["kadra"],
    size: "tall",
    position: "50% 32%",
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
    size: "wide",
    position: "60% 45%",
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

const photoById = (id: string) => {
  const found = photos.find((photo) => photo.id === id)
  if (!found) throw new Error(`Brak zdjęcia: ${id}`)
  return found
}

/**
 * Kolejność ściany mediów. Pierwsze osiem kafelków domyka się w pełne rzędy
 * zarówno na mobile (4 kolumny), jak i na desktopie (12 kolumn):
 * [wide + tall] → [square + square] → [tall + wide] → [square + square].
 * Dalej nagrania przeplatają się ze zdjęciami, żeby siatka miała rytm.
 */
export const mediaItems: MediaItem[] = [
  photoById("monachium-zloto"),
  photoById("paryz-przed-startem"),
  photoById("paryz-razem"),
  photoById("portret-studio"),
  videoById("reel-monachium"),
  videoById("video-paryz-4x200"),
  photoById("paryz-4x200"),
  photoById("po-wyscigu"),
  photoById("wroclaw-przed-startem"),
  videoById("video-olsztyn-zloto"),
  photoById("srebrne-medale"),
  photoById("podium-zloto-skopje"),
  photoById("paryz-skok"),
  videoById("reel-bydgoszcz"),
  photoById("podium-srebro"),
  photoById("paryz-mix"),
  photoById("portret"),
  videoById("video-lublin-braz"),
  photoById("na-scianie"),
  photoById("kciuk"),
  photoById("cetniewo"),
  videoById("video-lublin-medal"),
  photoById("reprezentacja"),
]

/** Ile kafelków widać przed rozwinięciem — osiem to dokładnie pełne rzędy. */
export const mediaInitialCount = 8
