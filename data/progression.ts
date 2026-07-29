/**
 * Starty na 200 m stylem zmiennym (basen 50 m) — dane sekcji „Progresja".
 *
 * Wiersze uszeregowane są według wyniku, od najsłabszego do najlepszego, a nie
 * chronologicznie; przy każdym starcie widoczna jest data, więc zestawienie
 * niczego nie sugeruje wprost.
 */

/** Linia odniesienia — rekord Polski seniorek. */
export const seniorRecord = {
  time: "2:12,13",
  seconds: 132.13,
  label: "Rekord Polski seniorek",
  holder: "Katarzyna Baranowska",
  context: "Pekin 2008",
} as const

/**
 * Zestaw dla alternatywnej sekcji progresji — zawiera także start z MŚ juniorów
 * 2025, czyli punkt wyjścia narracji. Wiersze uszeregowane są według wyniku
 * (od najsłabszego do najlepszego), a nie chronologicznie — daty pozostają
 * widoczne przy każdym starcie, więc zestawienie niczego nie sugeruje wprost.
 */
export type RaceResult = {
  time: string
  seconds: number
  /** Krótka nazwa imprezy — etykieta na osi wykresu. */
  event: string
  venue?: string
  date: string
  note?: string
  medal?: "gold"
  highlight?: boolean
}

export const raceProgression: RaceResult[] = [
  {
    time: "2:17,03",
    seconds: 137.03,
    event: "MŚ juniorów",
    date: "2025",
    note: "18. miejsce",
  },
  {
    time: "2:14,82",
    seconds: 134.82,
    event: "EYOF",
    venue: "Skopje",
    date: "07.2025",
    note: "rekord Polski 15-latek",
    medal: "gold",
  },
  {
    time: "2:13,36",
    seconds: 133.36,
    event: "MP seniorów",
    venue: "Olsztyn",
    date: "04.2026",
    note: "rekord Polski 18-latek",
    medal: "gold",
  },
  {
    time: "2:13,20",
    seconds: 133.2,
    event: "Mare Nostrum",
    venue: "Barcelona",
    date: "06.2026",
  },
  {
    time: "2:12,45",
    seconds: 132.45,
    event: "ME juniorów",
    venue: "Monachium",
    date: "07.2026",
    note: "rekordy Polski 16-, 17- i 18-latek",
    medal: "gold",
    highlight: true,
  },
]

export const progressionContext = {
  start: {
    time: "2:17,03",
    label: "18. miejsce",
    event: "Mistrzostwa świata juniorów 2025",
  },
  improvement: "blisko 5 sekund w dwanaście miesięcy",
} as const
