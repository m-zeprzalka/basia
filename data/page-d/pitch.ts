/**
 * Wariant D — treści „prezentacji dla sponsora".
 *
 * Strona ma jeden cel: doprowadzić do rozmowy o kontrakcie sponsorskim.
 * Wszystkie teksty poniżej są pisane z perspektywy partnera biznesowego
 * (marka sportowa, energetyczna, technologiczna) — nie kibica.
 *
 * Terminologia (uwaga klienta): imprezy nazywamy „mistrzostwa Europy JUNIORÓW",
 * „mistrzostwa Polski SENIORÓW" (nazwa imprezy jest wspólna dla obu płci);
 * tytuł Barbary: „mistrzyni Europy juniorów". Rekord Katarzyny Baranowskiej
 * opisujemy jako „seniorski rekord Polski".
 */

export const pitchNav = [
  { label: "Dlaczego teraz", href: "#dlaczego-teraz" },
  { label: "Trajektoria", href: "#trajektoria" },
  { label: "Medale", href: "#medale" },
  { label: "Paryż 2026", href: "#paryz-2026" },
  { label: "Galeria", href: "#galeria" },
  { label: "Współpraca", href: "#wspolpraca" },
] as const

export const hero = {
  eyebrow: "Reprezentantka Polski w pływaniu · rocznik 2010",
  /** Jedno zdanie, które ma zostać w głowie sponsora. */
  headline: ["Barbara", "Leśniewska"],
  lead: "Mistrzyni Europy juniorów na 200 m stylem zmiennym. Ma 16 lat, a już jest dwukrotną mistrzynią Polski seniorów oraz medalistką i finalistką mistrzostw Europy seniorów. Następny horyzont: Los Angeles 2028.",
  primaryCta: { label: "Zostań partnerem", href: "#wspolpraca" },
  secondaryCta: { label: "Zobacz trajektorię", href: "#trajektoria" },
  /** Trzy liczby nad zdjęciem — skrót całej prezentacji. */
  keyFacts: [
    {
      value: "2:12,45",
      isTime: true,
      seconds: 132.45,
      label: "Złoto ME juniorów 2026",
      note: "rekord Polski 16-, 17- i 18-latek",
    },
    {
      value: "0,32 s",
      label: "Do seniorskiego rekordu Polski",
      note: "200 m st. zmiennym · Pekin 2008",
    },
    {
      value: "14",
      label: "Rekordów Polski",
      note: "w kategoriach 15–18 lat",
    },
  ],
} as const

/** 01 — teza inwestycyjna: dlaczego Barbara i dlaczego właśnie teraz. */
export const thesis = {
  eyebrow: "Dlaczego teraz",
  title:
    "Najlepszy moment na wejście jest przed przejściem do seniorskiej czołówki. Ten moment jest teraz.",
  lead: "Barbara ma za sobą sezon, który potwierdził trajektorię: złoto i brąz mistrzostw Europy juniorów, dwa tytuły mistrzyni Polski seniorów, brązowy medal mistrzostw Europy seniorów na basenie 25 m i dwa finały mistrzostw Europy seniorów w Paryżu. Partner, który dołącza dziś, buduje tę historię razem z nią — nie kupuje jej gotowej.",
  tiles: [
    {
      value: "18. → 1.",
      label: "W dwanaście miesięcy",
      note: "z 18. miejsca mistrzostw świata juniorów 2025 do złota mistrzostw Europy juniorów 2026 na 200 m st. zmiennym",
      accent: "gold" as const,
    },
    {
      value: "0,32",
      suffix: " s",
      countTo: 0.32,
      decimals: 2,
      label: "Do seniorskiego rekordu Polski",
      note: "2:12,13 Katarzyny Baranowskiej z igrzysk w Pekinie 2008 — jeszcze z ery kostiumów poliuretanowych",
    },
    {
      value: "16",
      suffix: " lat",
      countTo: 16,
      label: "A już wśród seniorów",
      note: "dwa złota mistrzostw Polski seniorów, brąz mistrzostw Europy seniorów (25 m) i dwa finały mistrzostw Europy seniorów w Paryżu",
    },
    {
      value: "14",
      countTo: 14,
      label: "Rekordów Polski",
      note: "w tabelach kategorii wiekowych 15–18 lat, na basenie 25 m i 50 m",
    },
  ],
} as const

/** Krótki profil pod tezą — kim jest Barbara w trzech zdaniach. */
export const profile = {
  eyebrow: "Profil",
  short: [
    "Barbara Leśniewska (rocznik 2010) to **reprezentantka Polski** i zawodniczka **UKS GIM 92 Ursynów Warszawa**. Rywalizuje w stylu dowolnym, motylkowym i zmiennym — dzięki tej wszechstronności jest cenna zarówno w startach indywidualnych, jak i w sztafetach reprezentacji.",
    "Jej znakiem rozpoznawczym jest **rywalizacja pod presją**: rekordy życiowe i rekordy Polski poprawia w najważniejszych finałach. Systematyczny rozwój i odporność psychiczna dają realne podstawy, by w kolejnych latach walczyć o najwyższe cele także w pływaniu seniorskim — **z horyzontem igrzysk olimpijskich w Los Angeles 2028**.",
  ],
  facts: [
    { label: "Rocznik", value: "2010" },
    { label: "Klub", value: "UKS GIM 92 Ursynów Warszawa" },
    { label: "Konkurencje", value: "dowolny · motylkowy · zmienny" },
    { label: "Horyzont", value: "Los Angeles 2028" },
  ],
  moreLabel: "Pełna sylwetka",
} as const

/** 02 — trajektoria (dane wykresu w `data/progression.ts`). */
export const trajectory = {
  eyebrow: "Trajektoria",
  title:
    "Od 18. miejsca na świecie do złota Europy. I 0,32 s od seniorskiego rekordu Polski.",
  lead: "Pięć startów na 200 m stylem zmiennym w dwanaście miesięcy — każdy szybszy od poprzedniego. Wykres nie jest prognozą, ale pokazuje tempo, z jakim Barbara skraca dystans do najlepszych.",
  chartCaption:
    "200 m stylem zmiennym · basen 50 m · starty uszeregowane według wyniku, przy każdym data",
} as const

/** 03 — medale sezonów 2025–2026 (dane w `data/achievements.ts`). */
export const medals = {
  eyebrow: "Medale i rekordy",
  title: "Jedenaście medali mistrzowskich w dwa sezony",
  lead: "Mistrzostwa Europy juniorów, mistrzostwa Polski seniorów, mistrzostwa Europy seniorów na basenie 25 m, Olimpijski Festiwal Młodzieży Europy — w sezonach 2025–2026 każda impreza mistrzowska z medalem, a między nimi seria rekordów Polski.",
  shelf: [
    { medal: "gold" as const, count: 4, label: "złote" },
    { medal: "silver" as const, count: 3, label: "srebrne" },
    { medal: "bronze" as const, count: 4, label: "brązowe" },
  ],
  recordsToggle: "Pełne tabele rekordów Polski (PZP)",
} as const

/** 05 — galeria. */
export const galleryCopy = {
  eyebrow: "Galeria",
  title: "Kadry z basenu, podium i reprezentacji",
  showAll: "Pokaż wszystkie zdjęcia",
  showLess: "Zwiń galerię",
} as const

/** 06 — oferta dla partnera. */
export const offer = {
  eyebrow: "Współpraca",
  title: "Zainwestuj w zawodniczkę na progu seniorskiej kariery",
  lead: "Partnerstwo z Barbarą Leśniewską to wejście w kluczowym momencie: po sezonie, który potwierdził trajektorię, i przed cyklem, który prowadzi do Los Angeles 2028. To marka młodej, pracowitej i konsekwentnie rozwijającej się reprezentantki Polski, która już dziś zdobywa medale dla kraju.",
  benefitsHeading: "Co zyskuje partner",
  benefits: [
    {
      icon: "trending" as const,
      title: "Historię wzrostu, która sprzedaje się sama",
      body: "Z 18. miejsca na świecie do tytułu mistrzyni Europy juniorów w dwanaście miesięcy. Każdy sezon przynosi rekordy — i kolejne powody, by o Barbarze mówić.",
    },
    {
      icon: "globe" as const,
      title: "Obecność na największych arenach",
      body: "Za nią mistrzostwa Europy seniorów w Paryżu z dwoma finałami sztafet. Przed nią cykl seniorski z celem na igrzyska w Los Angeles 2028.",
    },
    {
      icon: "shield" as const,
      title: "Wizerunek, któremu się ufa",
      body: "Pracowitość, klasa i sportowa dojrzałość szesnastolatki, która rywalizuje jak doświadczona seniorka. Bez kontrowersji, z autentyczną historią.",
    },
    {
      icon: "megaphone" as const,
      title: "Realną ekspozycję marki",
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
    "Zakres i formaty współpracy ustalamy indywidualnie — powyższe to punkt wyjścia do rozmowy.",
  horizonHeading: "Horyzont startów",
  horizon: [
    {
      year: "2026",
      label: "ME seniorów, Paryż",
      detail: "za nami — dwa finały sztafet w wieku 16 lat",
      done: true,
    },
    {
      year: "2027",
      label: "Cykl seniorski i juniorski",
      detail:
        "mistrzostwa świata seniorów oraz mistrzostwa Europy juniorów — walka o minima i medale",
      done: false,
    },
    {
      year: "2028",
      label: "Igrzyska olimpijskie",
      detail: "Los Angeles — cel, do którego prowadzi każdy sezon",
      done: false,
    },
  ],
  cta: "Porozmawiajmy o współpracy",
} as const

/** 07 — kontakt. */
export const contactCopy = {
  eyebrow: "Kontakt",
  title: "Jedna rozmowa. Reszta to formalności.",
  lead: "W sprawach współpracy, sponsoringu i mediów prosimy o kontakt bezpośredni — odpowiadamy osobiście.",
  cta: "Napisz w sprawie współpracy",
  mailSubject: "Propozycja współpracy — Barbara Leśniewska",
} as const

/** Pływająca zachęta na mobile — jedyny cel strony zawsze w zasięgu kciuka. */
export const dock = {
  label: "Porozmawiajmy o współpracy",
  href: "#kontakt",
} as const
