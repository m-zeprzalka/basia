/**
 * Treści wariantu H (wersja ostateczna) — wyłącznie to, co różni H od E;
 * reszta copy pochodzi wprost z `data/page-e/copy.ts`.
 *
 * Głos: rzeczowy, pewny, bez przechwałek — liczby i obrazy niosą emocję.
 * Terminologia: „mistrzostwa Europy JUNIORÓW", „mistrzostwa Polski SENIORÓW",
 * „mistrzyni Europy juniorów", „seniorski rekord Polski".
 */

/** Replay finału — trzy wyścigi na jednym torze (rozdział 01). */
export const replay = {
  heading: "Replay",
  sub: "Trzy wyścigi na jednym torze — gdyby wystartowały razem.",
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
  finish: {
    heading: "Fotofinisz · ostatnie 1,1 % dystansu",
    scale: "≈ 2,2 m z 200 m",
    note: "Na całym torze 0,32 sekundy to mgnienie. W powiększeniu ostatnich dwóch metrów widać je w skali dłoni.",
    barbaraLabel: "Barbara 2026",
    recordLabel: "rekord Polski",
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
} as const

/** Pas mediów pod ścianą: artykuł prasowy i Instagram. */
export const mediaExtras = {
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
} as const

/** Kontakt — dodatkowy wiersz z Instagramem. */
export const contactExtras = {
  instagramLabel: "Instagram",
  instagramHandle: "@_lesniewskaa._",
  instagramHref: "https://www.instagram.com/_lesniewskaa._",
  /** Dopisek w stopce o źródłach nagrań. */
  footnoteMedia:
    "Nagrania: Polski Związek Pływacki (YouTube), Sportowy Fanatyk i Swimm PL (Facebook)",
  dataAsOf: "18.08.2026",
} as const

/** Podpis medali w oknie „Pełne tabele". */
export const recordsMedalHint =
  "Medal przy wierszu oznacza, że rekord padł w wyścigu zakończonym medalem imprezy."
