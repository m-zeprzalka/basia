/** Oś czasu najważniejszych osiągnięć (3.4 copy). */

export type Medal = "gold" | "silver" | "bronze"

export type Result = {
  medal?: Medal
  /** Miejsce zajęte, gdy start nie zakończył się medalem. */
  place?: string
  event: string
  time?: string
  note?: string
}

export type Milestone = {
  id: string
  period: string
  title: string
  location: string
  /** Etykieta rangi imprezy. */
  tag: string
  results: Result[]
  summary?: string
  featured?: boolean
}

export const milestones: Milestone[] = [
  {
    id: "monachium-2026",
    period: "Lipiec 2026",
    title: "Mistrzostwa Europy juniorów",
    location: "Monachium",
    tag: "Mistrzostwa Europy",
    featured: true,
    results: [
      {
        medal: "gold",
        event: "200 m st. zmiennym",
        time: "2:12,45",
        note: "rekord Polski 16-, 17- i 18-latek; wygrana nad Viktorią Tarannikovą (2:14,10) i Anną Rzaevą (2:14,44)",
      },
      {
        medal: "bronze",
        event: "100 m st. motylkowym",
        time: "58,78",
        note: "rekord życiowy i rekord Polski 16-latek",
      },
      {
        place: "5.",
        event: "200 m st. dowolnym",
        time: "1:59,96",
        note: "wynik w finale; zwyciężyła Linda Roth (1:57,79)",
      },
      {
        place: "4.",
        event: "Sztafeta 4×100 m st. dowolnym",
        note: "Barbara na pierwszej zmianie",
      },
    ],
    summary: "Łącznie 14 startów w pięć dni.",
  },
  {
    id: "olsztyn-2026",
    period: "Kwiecień 2026",
    title: "Mistrzostwa Polski seniorów",
    location: "Olsztyn, 21–24.04",
    tag: "Mistrzostwa Polski",
    results: [
      {
        medal: "gold",
        event: "200 m st. dowolnym",
        time: "1:59,00",
        note: "potwierdzone minimum na ME seniorów w Paryżu",
      },
      {
        medal: "gold",
        event: "200 m st. zmiennym",
        time: "2:13,36",
        note: "nowy rekord Polski 18-latek — poprawiony po 21 latach",
      },
      {
        medal: "bronze",
        event: "100 m st. motylkowym",
        time: "58,88",
        note: "minimum na ME; w eliminacjach wyrównany rekord Polski 16-latek",
      },
    ],
  },
  {
    id: "oswiecim-2026",
    period: "Marzec 2026",
    title: "Rekordy Polski 16- i 17-latek",
    location: "Oświęcim",
    tag: "Rekordy Polski",
    results: [
      { event: "100 m st. dowolnym", time: "55,04", note: "15.03.2026" },
      { event: "200 m st. dowolnym", time: "1:58,92", note: "14.03.2026" },
    ],
  },
  {
    id: "barcelona-2026",
    period: "Maj / czerwiec 2026",
    title: "Mare Nostrum",
    location: "Barcelona",
    tag: "Cykl międzynarodowy",
    results: [
      { event: "100 m st. dowolnym", time: "54,79", note: "rekord życiowy" },
      {
        event: "200 m st. zmiennym",
        time: "2:13,20",
        note: "ówczesna poprawa własnego rekordu Polski 18-latek",
      },
    ],
  },
  {
    id: "skopje-2025",
    period: "Lipiec 2025",
    title: "Olimpijski Festiwal Młodzieży Europy",
    location: "Skopje",
    tag: "5 medali",
    featured: true,
    results: [
      {
        medal: "gold",
        event: "200 m st. zmiennym",
        time: "2:14,82",
        note: "rekord Polski 15-latek",
      },
      {
        medal: "silver",
        event: "100 m st. dowolnym",
        time: "55,06",
        note: "rekord Polski 15-latek",
      },
      { medal: "silver", event: "200 m st. dowolnym" },
      { medal: "silver", event: "Sztafeta mieszana 4×100 m st. dowolnym" },
      { medal: "bronze", event: "Sztafeta dziewcząt 4×100 m st. zmiennym" },
    ],
    summary:
      "Najbardziej utytułowana zawodniczka całej polskiej reprezentacji na EYOF 2025; jej medale otworzyły dorobek polskiego pływania na tej imprezie.",
  },
  {
    id: "basen-25-2025",
    period: "Jesień 2025",
    title: "Seria rekordów na basenie 25 m",
    location: "Warszawa, Wrocław",
    tag: "Rekordy Polski",
    results: [
      {
        event: "Cztery rekordy Polski 15-latek",
        note: "szczegóły w tabelach rekordów",
      },
    ],
  },
]
