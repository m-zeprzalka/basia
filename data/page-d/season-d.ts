/**
 * Zakładki sekcji „Medale i rekordy" wariantu D.
 *
 * Źródłem wyników pozostaje `data/achievements.ts` (jedna prawda dla wszystkich
 * wariantów); tutaj tylko grupujemy je w karty, żeby na mobile sekcja mieściła
 * się w jednym ekranie zamiast długiej osi czasu. Lublin 2025 (brąz ME seniorów
 * na 25 m) dochodzi z `data/page-d/paris.ts`.
 */

import { milestones, type Milestone } from "@/data/achievements"
import { lublin } from "@/data/page-d/paris"

export type SeasonTab = {
  key: string
  /** Krótka etykieta zakładki. */
  label: string
  /** Podtytuł — ranga imprezy. */
  sub: string
  milestones: Milestone[]
}

const byId = (id: string) => {
  const found = milestones.find((milestone) => milestone.id === id)
  if (!found) throw new Error(`Brak kamienia milowego: ${id}`)
  return found
}

export const seasonTabs: SeasonTab[] = [
  {
    key: "monachium",
    label: "Monachium 2026",
    sub: "Mistrzostwa Europy juniorów",
    milestones: [byId("monachium-2026")],
  },
  {
    key: "olsztyn",
    label: "Olsztyn 2026",
    sub: "Mistrzostwa Polski seniorów",
    milestones: [byId("olsztyn-2026")],
  },
  {
    key: "lublin",
    label: "Lublin 2025",
    sub: "Mistrzostwa Europy seniorów · 25 m",
    milestones: [lublin],
  },
  {
    key: "skopje",
    label: "Skopje 2025",
    sub: "Olimpijski Festiwal Młodzieży Europy",
    milestones: [byId("skopje-2025")],
  },
  {
    key: "rekordy",
    label: "Rekordy 2025/26",
    sub: "Oświęcim · Barcelona · basen 25 m",
    milestones: [
      byId("barcelona-2026"),
      byId("oswiecim-2026"),
      byId("basen-25-2025"),
    ],
  },
]

/** Domyślnie otwarta karta — złoto mistrzostw Europy juniorów. */
export const defaultSeasonTab = "monachium"
