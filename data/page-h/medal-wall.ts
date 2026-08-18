/**
 * Ściana medali wariantu H — karty imprez z medalami i medium (zdjęcie lub
 * kadr z nagrania). Wyniki pochodzą z `data/achievements.ts` (przez zakładki
 * wariantu D) i `data/page-d/paris.ts` (Lublin 2025).
 *
 * Różnica względem E: plakaty nagrań to miniatury maxresdefault (16:9 bez
 * czarnych pasów), a karty z plakatem mają własny punkt kadrowania.
 */

import type { StaticImageData } from "next/image"

import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import podiumZloto from "@/assets/images/podium-zloto-skopje.webp"
import type { Medal, Milestone } from "@/data/achievements"
import { seasonTabs } from "@/data/page-d/season-d"
import { youtubeById, type YouTubeVideoItem } from "@/data/page-h/media"

export type MedalCard = {
  key: string
  title: string
  sub: string
  /** Kolejność medali na karcie — jak na tablicy klasyfikacji. */
  medals: Medal[]
  media:
    | { kind: "photo"; src: StaticImageData; alt: string; position?: string }
    | { kind: "poster"; src: string; alt: string; position?: string }
  milestone: Milestone
  videos: YouTubeVideoItem[]
  featured?: boolean
}

const tab = (key: string) => {
  const found = seasonTabs.find((entry) => entry.key === key)
  if (!found) throw new Error(`Brak zakładki: ${key}`)
  return found
}

const medalsOf = (milestone: Milestone): Medal[] =>
  milestone.results
    .map((result) => result.medal)
    .filter((medal): medal is Medal => Boolean(medal))

const monachium = tab("monachium").milestones[0]
const olsztyn = tab("olsztyn").milestones[0]
const lublin = tab("lublin").milestones[0]
const skopje = tab("skopje").milestones[0]

export const medalCards: MedalCard[] = [
  {
    key: "monachium",
    title: "Mistrzostwa Europy juniorów",
    sub: "Monachium · lipiec 2026",
    medals: medalsOf(monachium),
    media: {
      kind: "photo",
      src: monachiumZloto,
      alt: "Barbara Leśniewska ze złotym medalem mistrzostw Europy juniorów w Monachium",
      position: "50% 30%",
    },
    milestone: monachium,
    videos: [],
    featured: true,
  },
  {
    key: "olsztyn",
    title: "Mistrzostwa Polski seniorów",
    sub: "Olsztyn · kwiecień 2026",
    medals: medalsOf(olsztyn),
    media: {
      kind: "poster",
      src: youtubeById("video-olsztyn-zloto").poster,
      alt: "Barbara Leśniewska w strefie wywiadów mistrzostw Polski seniorów w Olsztynie",
      position: "38% 50%",
    },
    milestone: olsztyn,
    videos: [youtubeById("video-olsztyn-zloto")],
  },
  {
    key: "lublin",
    title: "Mistrzostwa Europy seniorów · 25 m",
    sub: "Lublin · grudzień 2025",
    medals: medalsOf(lublin),
    media: {
      kind: "poster",
      src: youtubeById("video-lublin-braz").poster,
      alt: "Barbara Leśniewska z brązowym medalem mistrzostw Europy na basenie 25 m w Lublinie",
      position: "50% 50%",
    },
    milestone: lublin,
    videos: [youtubeById("video-lublin-braz"), youtubeById("video-lublin-medal")],
  },
  {
    key: "skopje",
    title: "Olimpijski Festiwal Młodzieży Europy",
    sub: "Skopje · lipiec 2025",
    medals: medalsOf(skopje),
    media: {
      kind: "photo",
      src: podiumZloto,
      alt: "Barbara Leśniewska ze złotym medalem na podium EYOF w Skopje",
      position: "50% 18%",
    },
    milestone: skopje,
    videos: [],
  },
]

/** Kamienie milowe bez medali — rekordy Polski (Oświęcim, Barcelona, basen 25 m). */
export const recordMilestones = tab("rekordy").milestones
