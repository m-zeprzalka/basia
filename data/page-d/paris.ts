/**
 * Mistrzostwa Europy seniorów w pływaniu — Paryż, 10–16.08.2026
 * (Olimpijskie Centrum Sportów Wodnych, Saint-Denis).
 *
 * Źródła: grafiki wynikowe PZP przekazane przez klienta (17.08.2026),
 * komunikaty polswim.pl i kronika24.pl oraz protokoły wyników (Omega).
 *
 * UWAGA: to są wyniki SENIORSKIE z Paryża. Monachium (lipiec 2026) to
 * mistrzostwa Europy JUNIORÓW — dane w `data/munich.ts`.
 *
 * Do potwierdzenia przed publikacją (jedno źródło — protokół wyników):
 * czasy zmian Barbary w sztafetach (54,16 / 54,98 / 55,32 / 1:59,64 / 1:59,87)
 * oraz czas 2:16,67 na 200 m st. zmiennym.
 */

import type { Milestone } from "@/data/achievements"

export type ParisRelay = {
  event: string
  /** Faza, w której padł najlepszy wynik. */
  stage: "finał" | "eliminacje"
  place: number
  time: string
  lineup: string
  /** Zmiana Barbary — czas jej odcinka. */
  split?: string
  note?: string
  highlight?: boolean
}

export type ParisIndividual = {
  event: string
  time: string
  stage: "eliminacje" | "półfinał"
  place: number
}

export const paris = {
  eyebrow: "Paryż, 10–16 sierpnia 2026 · ME seniorów",
  title: "Szesnastolatka w finałach mistrzostw Europy seniorów",
  lead: "Miesiąc po złocie mistrzostw Europy juniorów Barbara zadebiutowała na seniorskich mistrzostwach Europy na basenie 50 m — jako jedna z czterech juniorek w 32-osobowej reprezentacji Polski. Płynęła w trzech sztafetach, w tym w dwóch finałach, i w dwóch konkurencjach indywidualnych. Z dziewięciu polskich finałów w Paryżu dwa były z jej udziałem.",
  venue: "Olimpijskie Centrum Sportów Wodnych, Saint-Denis",
  relays: [
    {
      event: "Sztafeta 4×200 m stylem dowolnym",
      stage: "finał",
      place: 7,
      time: "7:58,22",
      lineup:
        "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska, Aleksandra Knop",
      split: "1:59,87",
      note: "drugi wynik w historii polskiego pływania; Barbara na trzeciej zmianie",
      highlight: true,
    },
    {
      event: "Sztafeta mieszana 4×100 m stylem zmiennym",
      stage: "finał",
      place: 8,
      time: "3:46,37",
      lineup:
        "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok, Barbara Leśniewska",
      split: "54,16",
      note: "awans do finału z 6. czasem eliminacji (3:46,23); Barbara na zmianie dowolnej z najszybszym odcinkiem 100 m w karierze",
      highlight: true,
    },
    {
      event: "Sztafeta 4×100 m stylem zmiennym",
      stage: "eliminacje",
      place: 9,
      time: "4:02,10",
      lineup:
        "Adela Piskorska, Dominika Sztandera, Zuzanna Famulok, Barbara Leśniewska",
      split: "55,32",
      note: "o jedno miejsce od finału",
    },
  ] satisfies ParisRelay[],
  individual: [
    {
      event: "200 m stylem zmiennym",
      time: "2:16,67",
      stage: "eliminacje",
      place: 20,
    },
    {
      event: "100 m stylem motylkowym",
      time: "1:00,54",
      stage: "eliminacje",
      place: 40,
    },
  ] satisfies ParisIndividual[],
  individualNote:
    "Starty indywidualne miesiąc po czternastu wyścigach mistrzostw Europy juniorów — bez awansu do półfinałów, za to z doświadczeniem seniorskiej stawki, które procentuje w kolejnym cyklu.",
  takeaways: [
    {
      value: "2",
      label: "finały mistrzostw Europy seniorów w wieku 16 lat",
    },
    {
      value: "54,16",
      isTime: true,
      label:
        "najszybsze 100 m st. dowolnym w karierze — zmiana w finale sztafety",
    },
    {
      value: "7:58,22",
      isTime: true,
      label: "sztafeta 4×200 m st. dowolnym — drugi wynik w historii Polski",
    },
  ],
} as const

/**
 * Wcześniejszy start seniorski: mistrzostwa Europy na basenie 25 m,
 * Lublin, grudzień 2025 — brązowy medal w sztafecie 4×50 m stylem dowolnym.
 * Barbara (wówczas 15-letnia) płynęła w finale. Źródła: profil World Aquatics,
 * kronika24.pl. Do potwierdzenia z klientem przed publikacją.
 */
export const lublin: Milestone = {
  id: "lublin-2025",
  period: "Grudzień 2025",
  title: "Mistrzostwa Europy seniorów (basen 25 m)",
  location: "Lublin, 02.12.2025",
  tag: "Mistrzostwa Europy seniorów",
  results: [
    {
      medal: "bronze",
      event: "Sztafeta 4×50 m stylem dowolnym",
      time: "1:35,75",
      note: "Katarzyna Wasick, Julia Maik, Kornelia Fiedkiewicz, Barbara Leśniewska — Barbara w finale w wieku 15 lat",
    },
  ],
  summary:
    "Pierwszy seniorski medal mistrzostw Europy — w wieku 15 lat, siedem miesięcy przed złotem mistrzostw Europy juniorów.",
}
