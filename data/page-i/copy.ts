/**
 * Treści wariantu I (finalny szlif) — wyłącznie to, co różni I od H;
 * reszta copy pochodzi wprost z `data/page-e/copy.ts` i `data/page-h/copy.ts`.
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
  /**
   * Fotofinisz w wersji I: pomiar techniczny — klamra wymiarowa pod odcinkiem
   * między zawodniczką a ścianą, a czasy w wyrównanej legendzie POD osią
   * (żadnych etykiet pozycjonowanych absolutnie w pasie pomiaru).
   */
  finish: {
    heading: "Fotofinisz",
    // Twarde spacje trzymają jednostki w całości — na mobile meta łamie się
    // czysto na dwie linie: „ostatnie 1,1 % dystansu" / „(≈ 2,2 m)".
    meta: "ostatnie 1,1 % dystansu (≈ 2,2 m)",
    bracket: "0,32 s",
    legend: [
      {
        key: "barbara",
        time: "2:12,45",
        label: "Barbara · złoto ME juniorów",
      },
      {
        key: "record",
        time: "2:12,13",
        label: "seniorski rekord Polski",
      },
    ],
    note: "Na całym torze 0,32 sekundy to mgnienie. W powiększeniu ostatnich dwóch metrów widać je w skali dłoni.",
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
