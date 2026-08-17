/**
 * Treści wariantu E — prezentacja multimedialna dla partnerów.
 *
 * Głos: rzeczowy, pewny, bez przechwałek — liczby i obrazy niosą emocję.
 * Terminologia: „mistrzostwa Europy JUNIORÓW", „mistrzostwa Polski SENIORÓW",
 * „mistrzyni Europy juniorów", „seniorski rekord Polski".
 * Wyniki: `data/munich.ts`, `data/progression.ts`, `data/achievements.ts`,
 * `data/page-d/paris.ts` (Paryż 2026 i Lublin 2025) — tutaj tylko słowa.
 */

export const cover = {
  kicker: "Reprezentantka Polski w pływaniu",
  edition: "Prezentacja dla partnerów · sezon 2026/27",
  name: ["Barbara", "Leśniewska"],
  tagline:
    "Mistrzyni Europy juniorów. Szesnastolatka, która pływa już w finałach mistrzostw Europy seniorów. Kolejny horyzont: Los Angeles 2028.",
  primaryCta: { label: "Zostań partnerem", href: "#partnerstwo" },
  secondaryCta: { label: "Obejrzyj prezentację", href: "#wynik" },
  scrollHint: "Przewiń",
  /** Pasek „tablicy wyników" na dole okładki. */
  board: [
    { value: "2:12,45", label: "200 m st. zmiennym · złoto ME juniorów 2026" },
    { value: "0,32 s", label: "do seniorskiego rekordu Polski" },
    { value: "11", label: "medali mistrzowskich w sezonach 2025–2026" },
    { value: "14", label: "rekordów Polski w kategoriach 15–18 lat" },
    { value: "2", label: "finały ME seniorów w Paryżu 2026" },
  ],
} as const

export const result = {
  label: "Wynik",
  title: "Jeden czas, który mówi wszystko.",
  lead: "Finał 200 m stylem zmiennym mistrzostw Europy juniorów, Monachium, 12 lipca 2026. Barbara wygrała o ponad półtorej sekundy, ustanowiła rekordy Polski 16-, 17- i 18-latek i zatrzymała się 0,32 sekundy od seniorskiego rekordu Polski z ery kostiumów poliuretanowych.",
  boardCaption: "200 m stylem zmiennym · finał · Monachium, 12.07.2026",
  facts: [
    {
      value: "17.",
      label: "najszybsza juniorka w historii Europy na tym dystansie",
    },
    { value: "+1,65 s", label: "przewaga nad srebrną medalistką (2:14,10)" },
    { value: "14", label: "startów w pięć dni mistrzostw" },
  ],
  videoLabel: "Obejrzyj",
  gapHeading: "Dystans do seniorskiego rekordu Polski",
} as const

export const trajectory = {
  label: "Trajektoria",
  title: "Od 18. miejsca na świecie do złota Europy w dwanaście miesięcy.",
  lead: "Pięć startów na 200 m stylem zmiennym na basenie 50 m — każdy szybszy od poprzedniego. Wykres nie jest prognozą. Pokazuje tempo, z jakim Barbara skraca dystans do najlepszych.",
  caption:
    "Starty uszeregowane według wyniku, przy każdym data. Linia przerywana — seniorski rekord Polski.",
} as const

export const medals = {
  label: "Medale",
  title: "Jedenaście medali mistrzowskich. Cztery imprezy. Dwa sezony.",
  lead: "Mistrzostwa Europy juniorów, mistrzostwa Polski seniorów, mistrzostwa Europy seniorów na basenie 25 m i Olimpijski Festiwal Młodzieży Europy. Dotknij karty, żeby zobaczyć pełne wyniki.",
  shelf: [
    { medal: "gold" as const, count: 4, label: "złote" },
    { medal: "silver" as const, count: 3, label: "srebrne" },
    { medal: "bronze" as const, count: 4, label: "brązowe" },
  ],
  recordsCard: {
    title: "Rekordy Polski",
    value: "14",
    sub: "pozycji w tabelach PZP kategorii 15–18 lat · basen 25 m i 50 m",
    cta: "Pełne tabele",
  },
  dialogHint: "Wyniki wg tabel i komunikatów PZP",
} as const

export const paris = {
  label: "Paryż 2026",
  title: "Miesiąc po złocie juniorów — dwa finały wśród seniorów.",
  intro:
    "Mistrzostwa Europy seniorów, Olimpijskie Centrum Sportów Wodnych, 10–16 sierpnia 2026. Jedna z czterech juniorek w 32-osobowej reprezentacji Polski. Trzy sztafety, dwa finały, dwa starty indywidualne — i najszybsze 100 m stylem dowolnym w karierze.",
  relaysHeading: "Sztafety",
  individualHeading: "Starty indywidualne",
  /** Ujęcia towarzyszące kolejnym blokom tekstu (sticky media). */
  frames: [
    { key: "razem", caption: "Przed startem sztafety — Saint-Denis" },
    {
      key: "4x200",
      caption: "Finał 4×200 m st. dowolnym — 7. miejsce, 7:58,22",
    },
    {
      key: "mix",
      caption: "Finał sztafety mieszanej 4×100 m st. zmiennym — 8. miejsce",
    },
    { key: "skok", caption: "Eliminacje 4×100 m st. zmiennym — skok startowy" },
  ],
} as const

export const media = {
  label: "Media",
  title: "Kadry, które sponsor może pokazać jutro.",
  lead: "Zdjęcia z podium, z wody i z reprezentacji oraz nagrania z zawodów. Wszystkie materiały są dostępne w wysokiej rozdzielczości na potrzeby komunikacji partnera.",
  filters: [
    { key: "all", label: "Wszystko" },
    { key: "video", label: "Wideo" },
    { key: "paryz", label: "Paryż 2026" },
    { key: "monachium", label: "Monachium 2026" },
    { key: "skopje", label: "Skopje 2025" },
    { key: "kadra", label: "Kadra i trening" },
  ],
  showMore: "Pokaż więcej",
  showLess: "Zwiń",
} as const

export const partners = {
  label: "Partnerstwo",
  title:
    "Najlepszy moment na wejście jest przed przejściem do seniorskiej czołówki. Ten moment jest teraz.",
  lead: "Partner, który dołącza dziś, buduje historię razem z Barbarą — nie kupuje jej gotowej. Za nią sezon, który potwierdził trajektorię. Przed nią cykl prowadzący do Los Angeles 2028.",
  arguments: [
    {
      title: "Historia wzrostu, która sprzedaje się sama",
      body: "Z 18. miejsca mistrzostw świata juniorów do tytułu mistrzyni Europy juniorów w dwanaście miesięcy. Każdy sezon przynosi rekordy Polski — i kolejne powody, by o Barbarze mówić.",
    },
    {
      title: "Obecność na największych arenach",
      body: "Mistrzostwa Europy seniorów w Paryżu z dwoma finałami sztafet w wieku 16 lat. Przed nią mistrzostwa świata seniorów i mistrzostwa Europy juniorów w 2027 roku oraz igrzyska w Los Angeles jako cel cyklu.",
    },
    {
      title: "Wizerunek, któremu się ufa",
      body: "Pracowitość, klasa i sportowa dojrzałość szesnastolatki, która rywalizuje jak doświadczona seniorka. Autentyczna historia bez kontrowersji — bezpieczna dla marki i naturalna w komunikacji.",
    },
    {
      title: "Realna ekspozycja marki",
      body: "Logotyp na czepku, dresie i sprzęcie (zgodnie z regulacjami PZP i World Aquatics), obecność w mediach społecznościowych, udział w kampaniach, spotkaniach i wydarzeniach partnera.",
    },
  ],
  formatsHeading: "Formaty partnerstwa",
  formats: [
    {
      name: "Partner główny",
      body: "Największa widoczność: czepek, dres, materiały prasowe, wspólne kampanie i treści.",
    },
    {
      name: "Partner techniczny",
      body: "Sprzęt, odżywianie, regeneracja, technologia — produkt w codziennym treningu i na zawodach.",
    },
    {
      name: "Partner wizerunkowy",
      body: "Kampanie, ambasadorstwo, wydarzenia i content — historia Barbary jako część komunikacji marki.",
    },
  ],
  formatsNote:
    "Zakres i formaty ustalamy indywidualnie — powyższe to punkt wyjścia do rozmowy.",
  horizonHeading: "Horyzont",
  horizon: [
    {
      year: "2025",
      label: "EYOF Skopje · ME 25 m Lublin",
      state: "done" as const,
    },
    {
      year: "2026",
      label: "MP seniorów · ME juniorów · ME seniorów Paryż",
      state: "done" as const,
    },
    {
      year: "2027",
      label: "MŚ seniorów · ME juniorów",
      state: "next" as const,
    },
    {
      year: "2028",
      label: "Igrzyska olimpijskie, Los Angeles",
      state: "goal" as const,
    },
  ],
  cta: "Porozmawiajmy o współpracy",
} as const

export const contact = {
  label: "Kontakt",
  title: "Porozmawiajmy.",
  lead: "W sprawach współpracy, sponsoringu i mediów prosimy o kontakt bezpośredni — odpowiadamy osobiście.",
  cta: "Napisz w sprawie współpracy",
  mailSubject: "Propozycja współpracy — Barbara Leśniewska",
  dataAsOf: "17.08.2026",
} as const

export const dock = {
  label: "Porozmawiajmy o współpracy",
  href: "#kontakt",
} as const
