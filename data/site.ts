/**
 * Konfiguracja strony i dane kontaktowe.
 *
 * UWAGA: pola oznaczone jako puste uzupełnia właściciel strony przed publikacją.
 * Komponenty wykrywają brak wartości i pokazują neutralny placeholder zamiast
 * zmyślonych danych.
 */

export const site = {
  name: "Barbara Leśniewska",
  /** Krótka rola — nagłówek, stopka. */
  role: "Reprezentantka Polski",
  /** Pełna rola — nadtytuł hero, dane strukturalne. */
  roleLong: "Reprezentantka Polski w pływaniu",
  club: "UKS GIM 92 Ursynów Warszawa",
  birthYear: 2010,
  /** Adres produkcyjny — podmień po podpięciu domeny. */
  url: "https://barbaralesniewska.pl",
  locale: "pl-PL",
  /** Stan danych sportowych wg tabel i komunikatów PZP. */
  dataAsOf: "17.07.2026",
  title:
    "Barbara Leśniewska — mistrzyni Europy juniorek w pływaniu | Oficjalna strona",
  description:
    "Oficjalna strona Barbary Leśniewskiej — mistrzyni Europy juniorek na 200 m st. zmiennym, multimedalistki i wielokrotnej rekordzistki Polski. Wyniki, rekordy, galeria, współpraca ze sponsorami.",
} as const

export const nav = [
  { label: "O Barbarze", href: "#o-barbarze" },
  { label: "Osiągnięcia", href: "#osiagniecia" },
  { label: "Galeria", href: "#galeria" },
  { label: "Rekordy i wyniki", href: "#rekordy" },
  { label: "Współpraca", href: "#wspolpraca" },
] as const

export const contact = {
  person: "Michał Leśniewski",
  role: "Kontakt w sprawach współpracy i mediów",
  email: "michal.lesniewski@olinek.com.pl",
  phone: "603 680 970",
} as const
