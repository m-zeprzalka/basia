/**
 * Wariant G — jasny odpowiednik F. Ta sama dyscyplina języka, inne światło:
 * papier, czerń, sygnałowa czerwień. Terminologia jak w D/E/F.
 */

export const menuG = [
  { index: 1, id: "wynik", label: "Wynik", hint: "2:12,45 · replay finału" },
  { index: 2, id: "tor", label: "Tor", hint: "z 2:17,03 do 2:12,45" },
  { index: 3, id: "medale", label: "Medale", hint: "11 medali · 4 imprezy" },
  { index: 4, id: "paryz", label: "Paryż 2026", hint: "dwa finały wśród seniorów" },
  { index: 5, id: "media", label: "Media", hint: "zdjęcia i nagrania" },
  { index: 6, id: "partnerstwo", label: "Partnerstwo", hint: "dlaczego teraz" },
  { index: 7, id: "kontakt", label: "Kontakt", hint: "porozmawiajmy" },
] as const

export const introG = {
  label: "Finał · 200 m st. zmiennym · Monachium, 12.07.2026",
  skip: "Pomiń",
} as const

export const heroG = {
  kicker: "Reprezentantka Polski w pływaniu · rocznik 2010",
  name: ["Barbara", "Leśniewska"],
  lines: [
    "Mistrzyni Europy juniorów.",
    "Finalistka mistrzostw Europy seniorów w wieku 16 lat.",
    "0,32 s od seniorskiego rekordu Polski.",
  ],
  cta: { label: "Zostań partnerem", href: "#partnerstwo" },
  secondary: { label: "Zobacz finał", href: "#wynik" },
  photoCaption: "Przed startem · reprezentacja Polski",
  /** Czerwona taśma — biel na sygnałowej czerwieni, jednostka „s" mała. */
  marquee: [
    "MISTRZYNI EUROPY JUNIORÓW 2026",
    "2:12,45",
    "0,32 s OD SENIORSKIEGO REKORDU POLSKI",
    "11 MEDALI MISTRZOWSKICH",
    "14 REKORDÓW POLSKI",
    "LOS ANGELES 2028",
  ],
} as const

export const resultG = {
  index: "01",
  label: "Wynik",
  title: "Jeden czas.",
  lead: "Finał 200 m stylem zmiennym mistrzostw Europy juniorów. Barbara wygrała o 1,65 s, ustanowiła rekordy Polski 16-, 17- i 18-latek i zatrzymała się 0,32 s od seniorskiego rekordu Polski z 2008 roku.",
  replay: {
    heading: "Replay",
    sub: "Trzy wyścigi na jednym torze — gdyby wystartowały razem.",
    play: "Odtwórz",
    replay: "Jeszcze raz",
    lanes: [
      { key: "2025", label: "MŚ juniorów 2025", sub: "18. miejsce", time: "2:17,03", seconds: 137.03 },
      { key: "2026", label: "ME juniorów 2026", sub: "złoto", time: "2:12,45", seconds: 132.45, highlight: true },
      { key: "record", label: "Seniorski rekord Polski", sub: "K. Baranowska, Pekin 2008", time: "2:12,13", seconds: 132.13, record: true },
    ],
    finishNote: "Fotofinisz: ostatnie 1,1 % dystansu w powiększeniu — 0,32 s to szerokość dłoni.",
    gapLabel: "0,32 s",
    improvementLabel: "4,58 s w dwanaście miesięcy",
  },
  podiumHeading: "Podium finału",
  podium: [
    { medal: "gold" as const, name: "Barbara Leśniewska", time: "2:12,45" },
    { medal: "silver" as const, name: "Viktoria Tarannikova", time: "2:14,10" },
    { medal: "bronze" as const, name: "Anna Rzaeva", time: "2:14,44" },
  ],
  facts: [
    { value: "17.", label: "najszybsza juniorka w historii Europy na tym dystansie" },
    { value: "14", label: "startów w pięć dni mistrzostw" },
    { value: "3", label: "rekordy Polski jednym wynikiem: 16-, 17- i 18-latek" },
  ],
} as const

export const laneG = {
  index: "02",
  label: "Tor",
  title: "Pięć startów. Każdy szybszy.",
  lead: "200 m stylem zmiennym na basenie 50 m — od 18. miejsca mistrzostw świata juniorów do złota mistrzostw Europy juniorów w dwanaście miesięcy. Przewiń, żeby przepłynąć tor.",
  wallLabel: "Ściana · seniorski rekord Polski",
  hint: "Przewijaj — tor przesuwa się w poziomie",
} as const

export const medalsG = {
  index: "03",
  label: "Medale",
  title: "Jedenaście medali. Cztery imprezy.",
  lead: "Najedź na wiersz, żeby zobaczyć kadr; kliknij, żeby otworzyć pełne wyniki i nagrania.",
  recordsRow: { title: "Rekordy Polski", cta: "Tabele" },
} as const

export const parisG = {
  index: "04",
  label: "Paryż 2026",
  title: "Miesiąc po złocie juniorów — dwa finały wśród seniorów.",
  lead: "Mistrzostwa Europy seniorów, Olimpijskie Centrum Sportów Wodnych, 10–16 sierpnia. Jedna z czterech juniorek w 32-osobowej reprezentacji. Trzy sztafety, dwa finały, najszybsze 100 m stylem dowolnym w karierze.",
  videoHeading: "Głos Barbary po finale 4×200 m st. dowolnym",
} as const

export const mediaG = {
  index: "05",
  label: "Media",
  title: "Taśma.",
  lead: "Zdjęcia z podium, z wody i z reprezentacji oraz nagrania PZP. Przeciągnij lub przewiń w poziomie.",
  drag: "Przeciągnij",
} as const

export const contactG = {
  index: "07",
  label: "Kontakt",
  title: "Porozmawiajmy.",
  lead: "W sprawach współpracy, sponsoringu i mediów — kontakt bezpośredni. Odpowiadamy osobiście.",
  cta: "Napisz w sprawie współpracy",
  mailSubject: "Propozycja współpracy — Barbara Leśniewska",
  dataAsOf: "17.08.2026",
} as const
