/** Pasek liczb (sekcja 3.2 copy). */

export type Stat = {
  /** Wartość wyświetlana docelowo. */
  value: string
  /** Liczba do animacji odliczania — pomijana dla wartości nienumerycznych. */
  countTo?: number
  decimals?: number
  suffix?: string
  label: string
  note: string
  /** Wyróżnienie złotem — wynik mistrzowski. */
  highlight?: boolean
}

export const stats: Stat[] = [
  {
    value: "2:12,45",
    label: "Rekord Polski 16-, 17- i 18-latek",
    note: "200 m st. zmiennym — złoto ME juniorów 2026",
    highlight: true,
  },
  {
    value: "10",
    countTo: 10,
    label: "Medali mistrzowskich",
    note: "sezony 2025–2026: MEJ 2026 · EYOF 2025 · MP seniorów 2026",
  },
  {
    value: "14",
    countTo: 14,
    label: "Rekordów Polski",
    note: "w tabelach kategorii wiekowych 15–18 lat",
  },
  {
    value: "0,32",
    countTo: 0.32,
    decimals: 2,
    suffix: " s",
    label: "Do rekordu Polski seniorek",
    note: "200 m st. zmiennym — 2:12,13, Pekin 2008",
  },
  {
    value: "16",
    countTo: 16,
    suffix: " lat",
    label: "A już mistrzyni Polski seniorek",
    note: "dwa złota MP seniorów, Olsztyn 2026",
  },
]
