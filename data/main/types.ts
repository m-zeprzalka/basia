/**
 * Słownik strony głównej — jeden typ, dwie implementacje (`pl.ts`, `en.ts`).
 *
 * Zasady:
 * - komponenty w `components/main/` nie importują tekstów bezpośrednio;
 *   każdy rozdział dostaje swój wycinek słownika przez propsy (serializowalny,
 *   bez funkcji — wycinki trafiają też do komponentów klienckich),
 * - struktury sportowe (obrazy, czasy w sekundach, kolejność ściany mediów)
 *   pochodzą ze wspólnych modułów `data/*`; słownik niesie warstwę językową,
 * - zapis dziesiętny różni się między językami (2:12,45 vs 2:12.45) —
 *   `decimal` sterują nim komponenty liczące (zegar replayu, naliczenia).
 */

import type { Medal, Milestone } from "@/data/achievements"
import type { MedalCard } from "@/data/page-h/medal-wall"
import type { MediaItem, VideoItem } from "@/data/page-h/media"
import type { Pool } from "@/data/records"

export type Locale = "pl" | "en"

export type ChapterMeta = {
  index: number
  /** Kotwica rozdziału — lokalizowana (np. `wynik` / `result`). */
  id: string
  label: string
}

export type StatItem = { value: string; label: string }

export type RaceRow = {
  time: string
  seconds: number
  event: string
  venue?: string
  date: string
  note?: string
  medal?: "gold"
  highlight?: boolean
  /** Znak w kolumnie listy startów, gdy nie ma medalu (np. „18."). */
  mark?: string
}

export type RelayRowData = {
  event: string
  /** Klucz strukturalny fazy — steruje kolorem plakietki. */
  stageKey: "final" | "heats"
  stageLabel: string
  place: number
  /** Pełna etykieta lokaty dla czytników ekranu. */
  placeLabel: string
  time: string
  lineup: string
  split?: string
  note?: string
  highlight?: boolean
}

export type CoverDict = {
  kicker: string
  edition: string
  name: readonly [string, string]
  tagline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  board: readonly StatItem[]
  boardAria: string
}

export type ResultDict = {
  label: string
  title: string
  lead: string
  boardCaption: string
  recordNote: string
  finalHeading: string
  podium: readonly { medal: Medal; name: string; time: string }[]
  podiumNote: string
  factsHeading: string
  facts: readonly StatItem[]
  photoAlt: string
  photoTitle: string
  photoSub: string
}

export type ReplayDict = {
  heading: string
  sub: string
  play: string
  again: string
  lanes: readonly {
    key: string
    label: string
    sub: string
    time: string
    seconds: number
    highlight?: boolean
    record?: boolean
  }[]
  /** Etykieta przy kropce, która dotyka ściany jako pierwsza. */
  wall: string
  finish: {
    heading: string
    meta: string
    bracket: string
    legend: readonly { key: "barbara" | "record"; time: string; label: string }[]
  }
  stats: readonly StatItem[]
}

export type ProgressDict = {
  label: string
  title: string
  lead: string
  chartHeadingPre: string
  chartHeadingMid: string
  chartFrom: string
  chartTo: string
  chartEyebrow: string
  recordLineLabel: string
  record: { time: string; seconds: number; holder: string; context: string }
  races: readonly RaceRow[]
  caption: string
  startsHeading: string
  startsAria: string
  footnote: string
}

export type MedalsDict = {
  label: string
  title: string
  lead: string
  shelf: readonly { medal: Medal; count: number; label: string }[]
  recordsCard: { title: string; value: string; sub: string; cta: string }
  dialogHint: string
  cards: readonly MedalCard[]
  /** „— zobacz wyniki" w etykiecie karty. */
  cardSrOpen: string
  videoBadgeSr: string
  medalWord: { one: string; few: string; many: string }
  medalLabels: Record<Medal, string>
  sheetVideosHeading: string
  close: string
  resultsFallback: string
  recordsDialog: {
    title: string
    desc: string
    milestonesHeading: string
    recordMilestones: readonly Milestone[]
  }
  records: {
    breakdown: readonly {
      count: number
      stripLabel: string
      dialogLabel: string
      detail: string
    }[]
    pools: readonly Pool[]
    tableSr: { event: string; result: string; venueDate: string }
    personalBestsHeading: string
    /** „{medal} w tym wyścigu" — sr-only przy wierszu z medalem. */
    medalInRace: string
    hint: string
    note: string
  }
}

export type ParisDict = {
  label: string
  title: string
  intro: string
  factsHeading: string
  relaysHeading: string
  individualHeading: string
  frames: readonly {
    key: "razem" | "4x200" | "mix" | "skok"
    caption: string
    alt: string
  }[]
  takeaways: readonly StatItem[]
  relays: readonly RelayRowData[]
  splitPrefix: string
  individual: readonly { event: string; time: string; meta: string }[]
  individualNote: string
  voiceHeading: string
  video: VideoItem
}

export type MediaDict = {
  label: string
  title: string
  lead: string
  filters: readonly { key: "all" | "video" | "paryz" | "monachium" | "skopje" | "kadra"; label: string }[]
  filterAria: string
  showMore: string
  showLess: string
  items: readonly MediaItem[]
  lightbox: { prev: string; next: string; close: string; fallback: string }
  press: {
    eyebrow: string
    title: string
    excerpt: string
    date: string
    cta: string
    href: string
  }
  instagram: {
    eyebrow: string
    handle: string
    text: string
    cta: string
    href: string
  }
}

export type PartnershipDict = {
  label: string
  title: string
  lead: string
  cta: string
  args: readonly { title: string; body: string; alt: string }[]
  formatsHeading: string
  formatsNote: string
  formats: readonly { name: string; body: string }[]
  horizonHeading: string
  horizonNote: string
  horizon: readonly {
    year: string
    label: string
    state: "done" | "next" | "goal"
  }[]
  stateLabels: { done: string; next: string; goal: string }
}

export type ContactDict = {
  label: string
  title: string
  lead: string
  cta: string
  mailSubject: string
  personRole: string
  emailLabel: string
  phoneLabel: string
  instagramLabel: string
  instagramHandle: string
  instagramHref: string
  portraitAlt: string
  footer: {
    note: string
    media: string
    instagram: string
    privacy: string
    privacyHref: string
  }
}

export type NavDict = {
  edition: string
  cta: string
  ctaHref: string
  chaptersTitle: string
  chaptersAria: string
  openMenu: string
  close: string
  langAria: string
}

export type VideoUiDict = {
  badge: string
  playPrefix: string
  /** Parametr `hl` osadzenia YouTube. */
  embedLang: string
}

export type Dict = {
  locale: Locale
  decimal: "," | "."
  skipLink: string
  mainId: string
  chapters: readonly ChapterMeta[]
  nav: NavDict
  dock: { label: string; href: string; contactId: string }
  videoUi: VideoUiDict
  cover: CoverDict
  result: ResultDict
  replay: ReplayDict
  progress: ProgressDict
  medals: MedalsDict
  paris: ParisDict
  media: MediaDict
  partnership: PartnershipDict
  contact: ContactDict
}

/** Wybór formy liczebnika przy słowie „medal" (PL: 1 medal / 2 medale / 5 medali). */
export function medalWordFor(
  count: number,
  word: { one: string; few: string; many: string }
) {
  if (count === 1) return word.one
  if (count < 5) return word.few
  return word.many
}
