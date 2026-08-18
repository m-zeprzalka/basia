/**
 * Rekordy Polski i rekordy życiowe (3.5 i 3.6 copy).
 * Stan na 17.07.2026 wg tabel i komunikatów Polskiego Związku Pływackiego.
 *
 * Dopisanie nowego wyniku = dodanie wiersza w odpowiedniej tablicy.
 */

export type RecordRow = {
  event: string
  time: string
  venue: string
  date: string
  /** Medal imprezy, jeśli rekord padł w wyścigu zakończonym medalem. */
  medal?: "gold" | "silver" | "bronze"
}

export type AgeGroup = {
  category: string
  rows: RecordRow[]
  footnote?: string
}

export type PoolKey = "50" | "25"

export type Pool = {
  key: PoolKey
  label: string
  shortLabel: string
  groups: AgeGroup[]
  personalBests: { event: string; time: string }[]
  personalBestsNote?: string
}

export const recordsLead =
  "Barbara jest wielokrotną rekordzistką Polski. Rekordy poprawia zarówno na basenie 25-metrowym, jak i na olimpijskim basenie 50-metrowym. Jeden wynik może jednocześnie poprawić rekordy kilku kategorii wiekowych — dlatego tabele PZP prowadzone są osobno dla każdego rocznika i osobno dla obu długości basenu."

export const pools: Pool[] = [
  {
    key: "50",
    label: "Basen 50 m",
    shortLabel: "50 m",
    groups: [
      {
        category: "Rekordy Polski 15-latek",
        rows: [
          {
            event: "100 m stylem dowolnym",
            time: "55,06",
            venue: "Skopje",
            date: "24.07.2025",
            // Srebro EYOF 2025 w tym wyścigu.
            medal: "silver",
          },
          {
            event: "200 m stylem zmiennym",
            time: "2:14,82",
            venue: "Skopje",
            date: "25.07.2025",
            // Złoto EYOF 2025 w tym wyścigu.
            medal: "gold",
          },
        ],
        footnote:
          "Wynik 55,06 został ogłoszony przez PZP jako rekord Polski 15-, 16- i 17-latek. Po późniejszym rezultacie 55,04 rekord 15-latek pozostał na poziomie 55,06, a poprawione zostały rekordy starszych kategorii.",
      },
      {
        category: "Rekordy Polski 16-latek",
        rows: [
          {
            event: "100 m stylem dowolnym",
            time: "55,04",
            venue: "Oświęcim",
            date: "15.03.2026",
          },
          {
            event: "200 m stylem dowolnym",
            time: "1:58,92",
            venue: "Oświęcim",
            date: "14.03.2026",
          },
          {
            event: "100 m stylem motylkowym",
            time: "58,78",
            venue: "Monachium",
            date: "09.07.2026",
            // Brąz mistrzostw Europy juniorów 2026 w tym wyścigu.
            medal: "bronze",
          },
          {
            event: "200 m stylem zmiennym",
            time: "2:12,45",
            venue: "Monachium",
            date: "12.07.2026",
            // Złoto mistrzostw Europy juniorów 2026 w tym wyścigu.
            medal: "gold",
          },
        ],
        footnote:
          "Rekord na 100 m motylkowym Barbara ustanowiła w drodze po brązowy medal mistrzostw Europy juniorów.",
      },
      {
        category: "Rekordy Polski 17-latek",
        rows: [
          {
            event: "100 m stylem dowolnym",
            time: "55,04",
            venue: "Oświęcim",
            date: "15.03.2026",
          },
          {
            event: "200 m stylem dowolnym",
            time: "1:58,92",
            venue: "Oświęcim",
            date: "14.03.2026",
          },
          {
            event: "200 m stylem zmiennym",
            time: "2:12,45",
            venue: "Monachium",
            date: "12.07.2026",
            medal: "gold",
          },
        ],
      },
      {
        category: "Rekordy Polski 18-latek",
        rows: [
          {
            event: "200 m stylem zmiennym",
            time: "2:12,45",
            venue: "Monachium",
            date: "12.07.2026",
            medal: "gold",
          },
        ],
        footnote:
          "Przez 21 lat rekord należał do Katarzyny Baranowskiej (mistrzostwa świata w Montrealu, 2005). Barbara odebrała go jej 24.04.2026 w Olsztynie (2:13,36), poprawiła w Barcelonie (2:13,20), a w finale mistrzostw Europy juniorów zeszła do 2:12,45 — zaledwie 0,32 s od seniorskiego rekordu Polski (2:12,13, Pekin 2008).",
      },
    ],
    personalBests: [
      { event: "50 m stylem dowolnym", time: "25,78" },
      { event: "100 m stylem dowolnym", time: "54,79" },
      { event: "200 m stylem dowolnym", time: "1:58,92" },
      { event: "50 m stylem motylkowym", time: "27,08" },
      { event: "100 m stylem motylkowym", time: "58,78" },
      { event: "200 m stylem zmiennym", time: "2:12,45" },
    ],
    personalBestsNote:
      "Wynik 54,79 na 100 m dowolnym Barbara uzyskała podczas Mare Nostrum w Barcelonie.",
  },
  {
    key: "25",
    label: "Basen 25 m",
    shortLabel: "25 m",
    groups: [
      {
        category: "Rekordy Polski 15-latek",
        rows: [
          {
            event: "50 m stylem dowolnym",
            time: "24,70",
            venue: "Wrocław",
            date: "07.11.2025",
          },
          {
            event: "100 m stylem dowolnym",
            time: "53,26",
            venue: "Wrocław",
            date: "08.11.2025",
          },
          {
            event: "200 m stylem dowolnym",
            time: "1:57,37",
            venue: "Warszawa",
            date: "19.10.2025",
          },
          {
            event: "100 m stylem zmiennym",
            time: "59,73",
            venue: "Wrocław",
            date: "07.11.2025",
          },
        ],
        footnote:
          "Wyniki 1:57,37 na 200 m dowolnym oraz wcześniejsze 1:01,65 na 100 m zmiennym zostały opisane przez PZP także jako rekordy Polski 15- i 16-latek; rekord na 100 m zmiennym Barbara poprawiła następnie do 59,73.",
      },
    ],
    personalBests: [
      { event: "50 m stylem dowolnym", time: "24,70" },
      { event: "100 m stylem dowolnym", time: "53,26" },
      { event: "200 m stylem dowolnym", time: "1:57,37" },
      { event: "100 m stylem zmiennym", time: "59,73" },
    ],
  },
]

/** Podsumowanie 14 pozycji w tabelach rekordów Polski. */
export const recordsSummary = {
  total: 14,
  fromResults: 10,
  breakdown: [
    {
      category: "15 lat",
      count: 6,
      detail: "dwa na basenie 50 m i cztery na basenie 25 m",
    },
    { category: "16 lat", count: 4, detail: "basen 50 m" },
    { category: "17 lat", count: 3, detail: "basen 50 m" },
    { category: "18 lat", count: 1, detail: "basen 50 m" },
  ],
  note: "Zestawienie nie obejmuje rekordów ustanowionych przez Barbarę w wieku 14 lat ani rekordów sztafetowych.",
} as const
