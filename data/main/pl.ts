/**
 * Słownik polski strony głównej — JEDYNE źródło polskich tekstów finalnej
 * strony (warianty b–i mają własne, zamrożone copy w `data/page-*`).
 *
 * Zawiera poprawki klienta z 19.08.2026: nowy hero i lead wyniku, rozdział
 * „Postępy" zamiast „Trajektorii", usunięty dopisek pod fotofiniszem, nowe
 * teksty mediów i partnerstwa, „odpowiadam osobiście" w kontakcie.
 *
 * Głos: rzeczowy, pewny, bez przechwałek — liczby i obrazy niosą emocję.
 * Terminologia: „mistrzostwa Europy JUNIORÓW", „mistrzostwa Polski SENIORÓW",
 * „mistrzyni Europy juniorów", „seniorski rekord Polski".
 */

import { paris as parisData } from "@/data/page-d/paris"
import { medalCards, recordMilestones } from "@/data/page-h/medal-wall"
import { mediaItems, videoById } from "@/data/page-h/media"
import { raceProgression, seniorRecord } from "@/data/progression"
import { pools, recordsSummary } from "@/data/records"
import type { Dict, RaceRow, RelayRowData } from "@/data/main/types"

const chapters = [
  { index: 0, id: "start", label: "Start" },
  { index: 1, id: "wynik", label: "Wynik" },
  { index: 2, id: "postepy", label: "Postępy" },
  { index: 3, id: "medale", label: "Medale" },
  { index: 4, id: "paryz", label: "Paryż 2026" },
  { index: 5, id: "media", label: "Media" },
  { index: 6, id: "partnerstwo", label: "Partnerstwo" },
  { index: 7, id: "kontakt", label: "Kontakt" },
] as const

/** Znak listy startów bez medalu — wyciągnięty z notki („18. miejsce" → „18."). */
const races: RaceRow[] = raceProgression.map((row) => {
  const mark = row.note?.match(/^\d+\./)?.[0]
  return mark ? { ...row, mark } : { ...row }
})

const relays: RelayRowData[] = parisData.relays.map((relay) => ({
  event: relay.event,
  stageKey: relay.stage === "finał" ? "final" : "heats",
  stageLabel: relay.stage,
  place: relay.place,
  placeLabel: `${relay.place}. miejsce — ${relay.stage}`,
  time: relay.time,
  lineup: relay.lineup,
  split: relay.split,
  note: relay.note,
  highlight: relay.highlight,
}))

export const pl: Dict = {
  locale: "pl",
  decimal: ",",
  skipLink: "Przejdź do treści",
  mainId: "tresc",
  chapters,

  nav: {
    edition: "Prezentacja dla partnerów · sezon 2026/27",
    cta: "Zostań partnerem",
    ctaHref: "#partnerstwo",
    chaptersTitle: "Rozdziały",
    chaptersAria: "Rozdziały prezentacji",
    openMenu: "Otwórz spis rozdziałów",
    close: "Zamknij",
    langAria: "Język strony",
  },

  dock: { label: "Porozmawiajmy o współpracy", href: "#kontakt", contactId: "kontakt" },

  videoUi: { badge: "Wideo", playPrefix: "Odtwórz nagranie:", embedLang: "pl" },

  cover: {
    kicker: "Reprezentantka Polski w pływaniu",
    edition: "Prezentacja dla partnerów · sezon 2026/27",
    name: ["Barbara", "Leśniewska"],
    tagline:
      "Mistrzyni Europy juniorów. Szesnastolatka, która już pływa w finałach mistrzostw Europy seniorów. Kolejny cel: Olimpiada Los Angeles 2028.",
    primaryCta: { label: "Zostań partnerem", href: "#partnerstwo" },
    secondaryCta: { label: "Obejrzyj prezentację", href: "#wynik" },
    board: [
      { value: "2:12,45", label: "200 m st. zmiennym · złoto ME juniorów 2026" },
      { value: "0,32 s", label: "do seniorskiego rekordu Polski" },
      { value: "11", label: "medali mistrzowskich w sezonach 2025–2026" },
      { value: "14", label: "rekordów Polski w kategoriach 15–18 lat" },
      { value: "2", label: "finały ME seniorów w Paryżu 2026" },
    ],
    boardAria: "Najważniejsze liczby",
  },

  result: {
    label: "Wynik",
    title: "Jeden czas, który mówi wszystko.",
    lead: "Finał 200 m stylem zmiennym mistrzostw Europy juniorów, Monachium, 12 lipca 2026. Barbara pokonała przeciwniczki o ponad półtorej sekundy, ustanowiła rekordy Polski 16-, 17- i 18-latek, kończąc wyścig 0,32 sekundy od seniorskiego rekordu Polski z ery kostiumów poliuretanowych.",
    boardCaption: "200 m stylem zmiennym · finał · Monachium, 12.07.2026",
    recordNote: "Rekord Polski 16-, 17- i 18-latek",
    finalHeading: "Finał · 200 m st. zmiennym",
    podium: [
      { medal: "gold", name: "Barbara Leśniewska", time: "2:12,45" },
      { medal: "silver", name: "Viktoria Tarannikova", time: "2:14,10" },
      { medal: "bronze", name: "Anna Rzaeva", time: "2:14,44" },
    ],
    podiumNote:
      "Przewaga nad srebrną medalistką: 1,65 s. Najlepszy czas półfinałów, w finale o dwie sekundy szybciej.",
    factsHeading: "W liczbach",
    facts: [
      {
        value: "17.",
        label: "najszybsza juniorka w historii Europy na tym dystansie",
      },
      { value: "+1,65 s", label: "przewaga nad srebrną medalistką (2:14,10)" },
      { value: "14", label: "startów w pięć dni mistrzostw" },
    ],
    photoAlt:
      "Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium",
    photoTitle: "Mistrzyni Europy juniorów",
    photoSub: "200 m stylem zmiennym · Monachium, 12.07.2026",
  },

  replay: {
    heading: "Wizualizacja",
    sub: "Trzy wyścigi odtworzone jednocześnie.",
    play: "Odtwórz",
    again: "Jeszcze raz",
    lanes: [
      {
        key: "2025",
        label: "MŚ juniorów 2025",
        sub: "18. miejsce",
        time: "2:17,03",
        seconds: 137.03,
      },
      {
        key: "2026",
        label: "ME juniorów 2026",
        sub: "złoto",
        time: "2:12,45",
        seconds: 132.45,
        highlight: true,
      },
      {
        key: "record",
        label: "Seniorski rekord Polski",
        sub: "K. Baranowska, Pekin 2008",
        time: "2:12,13",
        seconds: 132.13,
        record: true,
      },
    ],
    wall: "ściana",
    finish: {
      heading: "Fotofinisz",
      // Twarde spacje trzymają jednostki w całości — na mobile meta łamie się
      // czysto na dwie linie: „ostatnie 1,1 % dystansu" / „(≈ 2,2 m)".
      meta: "ostatnie 1,1 % dystansu (≈ 2,2 m)",
      bracket: "0,32 s",
      legend: [
        { key: "barbara", time: "2:12,45", label: "Barbara · złoto ME juniorów" },
        { key: "record", time: "2:12,13", label: "seniorski rekord Polski" },
      ],
    },
    stats: [
      {
        value: "0,32 s",
        label: "do seniorskiego rekordu Polski (K. Baranowska, Pekin 2008)",
      },
      {
        value: "4,58 s",
        label:
          "poprawy w dwanaście miesięcy — z 18. miejsca na świecie do złota Europy",
      },
    ],
  },

  progress: {
    label: "Postępy",
    title: "Od 18. miejsca na świecie do złota mistrzostw Europy w dwanaście miesięcy.",
    lead: "Pięć startów na 200 m stylem zmiennym na basenie 50 m — każdy szybszy od poprzedniego. Wykres nie jest prognozą. Pokazuje tempo, z jakim Barbara skraca dystans do najlepszych.",
    chartHeadingPre: "Droga od ",
    chartHeadingMid: " do ",
    chartFrom: "2:17,03",
    chartTo: "2:12,45",
    chartEyebrow: "200 m st. zmiennym · basen 50 m",
    recordLineLabel: " · seniorski rekord Polski",
    record: {
      time: seniorRecord.time,
      seconds: seniorRecord.seconds,
      holder: seniorRecord.holder,
      context: seniorRecord.context,
    },
    races,
    caption:
      "Starty uszeregowane według wyniku, przy każdym data. Linia przerywana — seniorski rekord Polski.",
    startsHeading: "Starty · 200 m st. zmiennym",
    startsAria: "Starty na 200 m stylem zmiennym",
    footnote:
      "Poprawa o blisko pięć sekund w dwanaście miesięcy — i najlepszy czas półfinałów zamieniony na złoto w finale.",
  },

  medals: {
    label: "Medale",
    title: "Jedenaście medali mistrzowskich. Cztery imprezy. Dwa sezony.",
    lead: "Mistrzostwa Europy juniorów, mistrzostwa Polski seniorów, mistrzostwa Europy seniorów na basenie 25 m i Olimpijski Festiwal Młodzieży Europy. Dotknij karty, żeby zobaczyć pełne wyniki.",
    shelf: [
      { medal: "gold", count: 4, label: "złote" },
      { medal: "silver", count: 3, label: "srebrne" },
      { medal: "bronze", count: 4, label: "brązowe" },
    ],
    recordsCard: {
      title: "Rekordy Polski",
      value: "14",
      sub: "pozycji w tabelach PZP kategorii 15–18 lat · basen 25 m i 50 m",
      cta: "Pełne tabele",
    },
    dialogHint: "Wyniki wg tabel i komunikatów PZP",
    cards: medalCards,
    cardSrOpen: "zobacz wyniki",
    videoBadgeSr: "Nagranie",
    medalWord: { one: "medal", few: "medale", many: "medali" },
    medalLabels: {
      gold: "Złoty medal",
      silver: "Srebrny medal",
      bronze: "Brązowy medal",
    },
    sheetVideosHeading: "Nagrania · Polski Związek Pływacki",
    close: "Zamknij",
    resultsFallback: "Wyniki",
    recordsDialog: {
      title: "Rekordy Polski — pełne tabele PZP",
      desc: "Stan na 17.07.2026. Zestawienie nie obejmuje rekordów sztafetowych ani ustanowionych w wieku 14 lat.",
      milestonesHeading: "Kamienie milowe bez medali",
      recordMilestones,
    },
    records: {
      breakdown: recordsSummary.breakdown.map((item) => ({
        count: item.count,
        stripLabel: `w kategorii ${item.category}`,
        dialogLabel: `Kategoria ${item.category}`,
        detail: item.detail,
      })),
      pools,
      tableSr: { event: "Konkurencja", result: "Wynik", venueDate: "Miejsce i data" },
      personalBestsHeading: "Rekordy życiowe",
      medalInRace: "w tym wyścigu",
      hint: "Medal przy wierszu oznacza, że rekord padł w wyścigu zakończonym medalem imprezy.",
      note: "Zestawienie nie obejmuje rekordów ustanowionych przez Barbarę w wieku 14 lat ani rekordów sztafetowych. Stan na 17.07.2026 wg tabel i komunikatów Polskiego Związku Pływackiego.",
    },
  },

  paris: {
    label: "Paryż 2026",
    title: "Miesiąc po złocie juniorów — dwa finały wśród seniorów.",
    intro:
      "Mistrzostwa Europy seniorów, Olimpijskie Centrum Sportów Wodnych, 10–16 sierpnia 2026. Jedna z czterech juniorek w 32-osobowej reprezentacji Polski. Trzy sztafety, dwa finały, dwa starty indywidualne — i najszybsze 100 m stylem dowolnym w karierze.",
    factsHeading: "Paryż w liczbach",
    relaysHeading: "Sztafety",
    individualHeading: "Starty indywidualne",
    frames: [
      {
        key: "razem",
        caption: "Przed startem sztafety — Saint-Denis",
        alt: "Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu",
      },
      {
        key: "4x200",
        caption: "Finał 4×200 m st. dowolnym — 7. miejsce, 7:58,22",
        alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska i Aleksandra Knop po finale sztafety 4×200 m stylem dowolnym",
      },
      {
        key: "mix",
        caption: "Finał sztafety mieszanej 4×100 m st. zmiennym — 8. miejsce",
        alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok i Barbara Leśniewska przed finałem sztafety mieszanej 4×100 m stylem zmiennym",
      },
      {
        key: "skok",
        caption: "Eliminacje 4×100 m st. zmiennym — skok startowy",
        alt: "Barbara Leśniewska w locie tuż po skoku startowym podczas eliminacji sztafety 4×100 m stylem zmiennym",
      },
    ],
    takeaways: parisData.takeaways.map(({ value, label }) => ({ value, label })),
    relays,
    splitPrefix: "zmiana Barbary",
    individual: parisData.individual.map((start) => ({
      event: start.event,
      time: start.time,
      meta: `${start.place}. miejsce · ${start.stage}`,
    })),
    individualNote:
      "Starty indywidualne miesiąc po czternastu wyścigach mistrzostw Europy juniorów — kolejne doświadczenie w pogoni za seniorską stawką, które zaprocentuje w kolejnych sezonach.",
    voiceHeading: "Głos Barbary po finale",
    video: videoById("video-paryz-4x200"),
  },

  media: {
    label: "Media",
    title: "Kadry, które jako sponsor możesz wykorzystać.",
    lead: "Zdjęcia z podium, wody i z reprezentacji oraz nagrania z zawodów. Wszystkie materiały są dostępne na potrzeby komunikacji partnera.",
    filters: [
      { key: "all", label: "Wszystko" },
      { key: "video", label: "Wideo" },
      { key: "paryz", label: "Paryż 2026" },
      { key: "monachium", label: "Monachium 2026" },
      { key: "skopje", label: "Skopje 2025" },
      { key: "kadra", label: "Kadra i trening" },
    ],
    filterAria: "Filtruj materiały",
    showMore: "Pokaż więcej",
    showLess: "Zwiń",
    items: mediaItems,
    lightbox: {
      prev: "Poprzednie zdjęcie",
      next: "Następne zdjęcie",
      close: "Zamknij galerię",
      fallback: "Galeria",
    },
    press: {
      eyebrow: "Prasa · Przegląd Sportowy Onet",
      title: "„Młoda Polka zszokowała świat. Teraz szczerze wyznaje”",
      excerpt:
        "„Barbara Leśniewska ma zaledwie 15 lat, a już zdobyła pierwszy medal seniorskiej imprezy — w Lublinie w mistrzostwach Europy na krótkim basenie. Młoda pływaczka dopiero zaczyna swoją karierę, ale już ma ambitny cel — udowodnić światu, że Polska też potrafi wygrywać.”",
      date: "24.12.2025",
      cta: "Przeczytaj artykuł",
      href: "https://przegladsportowy.onet.pl/plywanie/mloda-polka-zszokowala-swiat-teraz-szczerze-wyznaje/6vh1h6f",
    },
    instagram: {
      eyebrow: "Media społecznościowe",
      handle: "@_lesniewskaa._",
      text: "Treningi, zawody i kulisy reprezentacji — na bieżąco, prosto od Barbary.",
      cta: "Obserwuj na Instagramie",
      href: "https://www.instagram.com/_lesniewskaa._",
    },
  },

  partnership: {
    label: "Partnerstwo",
    title:
      "Najlepszy moment na rozpoczęcie współpracy jest właśnie teraz! Na chwilę przed przejściem do seniorskiej czołówki.",
    lead: "Partner, który dołączy już dziś, buduje historię razem z Barbarą — pomaga tworzyć legendę polskiego pływania. Za nią sezon, który potwierdził ciągły progres. Przed nią czas prowadzący ją do Olimpiady w Los Angeles 2028.",
    cta: "Porozmawiajmy o współpracy",
    args: [
      {
        title: "Historia sukcesów, która sprzedaje się sama",
        body: "Z 18. miejsca mistrzostw świata juniorów do tytułu mistrzyni Europy juniorów w dwanaście miesięcy. Każdy sezon przynosi rekordy Polski — i kolejne powody, by mówić o Barbarze.",
        alt: "Barbara ze złotym medalem mistrzostw Europy juniorów",
      },
      {
        title: "Obecność na największych arenach",
        body: "Mistrzostwa Europy seniorów w Paryżu z dwoma finałami sztafet już w wieku 16 lat. Przed nią mistrzostwa świata seniorów i mistrzostwa Europy juniorów w 2027 roku oraz Igrzyska w Los Angeles jako najważniejszy cel.",
        alt: "Sztafeta przed startem na mistrzostwach Europy seniorów w Paryżu",
      },
      {
        title: "Wizerunek, który budzi zaufanie",
        body: "Pracowitość, klasa i sportowa dojrzałość szesnastolatki, która rywalizuje jak doświadczona seniorka. Autentyczna historia bez kontrowersji — bezpieczna dla marki i naturalna w komunikacji.",
        alt: "Barbara Leśniewska tuż po wyścigu",
      },
      {
        title: "Realna ekspozycja marki",
        body: "Logotyp na czepku, dresie i sprzęcie (zgodnie z regulacjami PZP i World Aquatics), obecność w mediach społecznościowych, udział w kampaniach, spotkaniach i wydarzeniach partnera.",
        alt: "Barbara Leśniewska w stroju reprezentacji Polski",
      },
    ],
    formatsHeading: "Formaty partnerstwa",
    formatsNote:
      "Zakres i formaty ustalamy indywidualnie — powyższe to punkt wyjścia do rozmowy.",
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
    horizonHeading: "Horyzont",
    horizonNote:
      "Za nami dwa sezony potwierdzeń. Przed nami cykl, który kończy się w Los Angeles.",
    horizon: [
      { year: "2025", label: "EYOF Skopje · ME 25 m Lublin", state: "done" },
      {
        year: "2026",
        label: "MP seniorów · ME juniorów · ME seniorów Paryż",
        state: "done",
      },
      { year: "2027", label: "MŚ seniorów · ME juniorów", state: "next" },
      { year: "2028", label: "Igrzyska olimpijskie, Los Angeles", state: "goal" },
    ],
    stateLabels: {
      done: "za nami",
      next: "najbliższy cykl — walka o minima i medale",
      goal: "cel cyklu",
    },
  },

  contact: {
    label: "Kontakt",
    title: "Porozmawiajmy.",
    lead: "W sprawach współpracy, sponsoringu i mediów prosimy o kontakt bezpośredni — odpowiadam osobiście.",
    cta: "Napisz w sprawie współpracy",
    mailSubject: "Propozycja współpracy — Barbara Leśniewska",
    personRole: "Kontakt w sprawach współpracy i mediów",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    instagramLabel: "Instagram",
    instagramHandle: "@_lesniewskaa._",
    instagramHref: "https://www.instagram.com/_lesniewskaa._",
    portraitAlt: "Barbara Leśniewska w stroju startowym i czepku na hali basenowej",
    footer: {
      note: "Wyniki wg tabel i komunikatów PZP, stan na 19.08.2026",
      media:
        "Nagrania: Polski Związek Pływacki (YouTube), Sportowy Fanatyk i Swimm PL (Facebook)",
      instagram: "Instagram",
      privacy: "Polityka prywatności",
      privacyHref: "/polityka-prywatnosci",
    },
  },
}
