/** Mistrzostwa Europy juniorów 2026 — sekcja przełomu (3.7 copy). */

export const munich = {
  event: "Mistrzostwa Europy juniorów",
  location: "Monachium",
  date: "Lipiec 2026",
  headlineTime: "2:12,45",
  headlineEvent: "200 m stylem zmiennym",
  lead: "W ostatnim dniu mistrzostw Barbara wygrała finał 200 m stylem zmiennym, wyprzedzając rywalki o ponad półtorej sekundy. Ten sam wynik ustanowił rekordy Polski 16-, 17- i 18-latek.",
  results: [
    {
      event: "200 m stylem zmiennym",
      time: "2:12,45",
      rank: "1.",
      place: "1. miejsce",
      medal: "gold" as const,
      rivals: "przed Viktorią Tarannikovą i Anną Rzaevą",
    },
    {
      event: "100 m stylem motylkowym",
      time: "58,78",
      rank: "3.",
      place: "3. miejsce",
      medal: "bronze" as const,
      rivals: "za Cateriną Santambrogio i Serafimą Fokiną",
    },
    {
      event: "200 m stylem dowolnym",
      time: "1:59,96",
      rank: "5.",
      place: "5. miejsce",
      medal: null,
      rivals: "wynik w finale; zwyciężyła Linda Roth (1:57,79)",
    },
  ],
  /** Dystans do seniorskiego rekordu Polski. */
  gap: {
    barbara: { label: "Barbara Leśniewska", time: "2:12,45", seconds: 132.45 },
    record: {
      label: "Rekord Polski seniorek",
      time: "2:12,13",
      seconds: 132.13,
      holder: "Katarzyna Baranowska",
      context: "Pekin 2008",
    },
    difference: "0,32 s",
  },
  facts: [
    {
      value: "17.",
      label: "najszybsza juniorka w historii Europy na 200 m st. zmiennym",
    },
    { value: "14", label: "startów w ciągu pięciu dni mistrzostw" },
    {
      value: "4.",
      label:
        "miejsce sztafety 4×100 m st. dowolnym — Barbara na pierwszej zmianie",
    },
  ],
} as const
