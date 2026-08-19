import * as React from "react"

import type { Medal as MedalKind } from "@/data/achievements"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   Medal — krążek na wstążce, z numerem miejsca wybitym w metalu (rysunek
   przeniesiony z wariantu D: „numerki 1/2/3 zawsze powinny przypominać
   prawdziwe medale"). Wersja strony głównej: etykieta dostępności przychodzi
   z zewnątrz (słownik PL/EN) — bez etykiety medal jest dekoracyjny.
--------------------------------------------------------------------------- */

const metals: Record<
  MedalKind,
  { stops: [string, string, string]; ink: string; place: string }
> = {
  gold: {
    stops: ["#FBEDB2", "#E0B646", "#A87A22"],
    ink: "#6E4F0F",
    place: "1",
  },
  silver: {
    stops: ["#F7F9FC", "#C5CFDB", "#8794A6"],
    ink: "#4E5A68",
    place: "2",
  },
  bronze: {
    stops: ["#F2CBA3", "#C98A4B", "#8A552A"],
    ink: "#5E3716",
    place: "3",
  },
}

export function Medal({
  medal,
  className,
  /** Etykieta dla czytników (np. „Złoty medal" / „Gold medal"); bez niej rysunek jest dekoracją. */
  label,
}: {
  medal: MedalKind
  className?: string
  label?: string
}) {
  const id = React.useId().replace(/:/g, "")
  const metal = metals[medal]
  const gradientId = `medal-${medal}-${id}`
  const shineId = `shine-${id}`

  return (
    <svg
      viewBox="0 0 40 52"
      className={cn("block size-10 shrink-0", className)}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={metal.stops[0]} />
          <stop offset="0.52" stopColor={metal.stops[1]} />
          <stop offset="1" stopColor={metal.stops[2]} />
        </linearGradient>
        <radialGradient id={shineId} cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wstążka — dwie wstęgi, prawa lekko przyciemniona (zagięcie). */}
      <path
        d="M7 0h9.5l8 22.5-9.5.5z"
        fill="var(--medal-ribbon, var(--navy))"
      />
      <path
        d="M23.5 0H33l-8 23-9.5-.5z"
        fill="var(--medal-ribbon, var(--navy))"
      />
      <path d="M23.5 0H33l-8 23-9.5-.5z" fill="#000" opacity="0.18" />
      {/* Zawieszka. */}
      <rect x="17" y="17" width="6" height="5" rx="1.5" fill={metal.stops[2]} />

      {/* Krążek. */}
      <circle cx="20" cy="35" r="16" fill={metal.stops[2]} />
      <circle cx="20" cy="34.4" r="15.4" fill={`url(#${gradientId})`} />
      <circle
        cx="20"
        cy="34.4"
        r="12"
        fill="none"
        stroke={metal.ink}
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <circle
        cx="20"
        cy="34.4"
        r="13.2"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <circle cx="20" cy="34.4" r="15.4" fill={`url(#${shineId})`} />

      {/* Cyfra miejsca — wybita, więc lekko wgłębiona: cień u góry, jasny brzeg u dołu. */}
      <text
        x="20"
        y="35.2"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-heading"
        fontWeight="700"
        fontSize="15"
        fill="#FFFFFF"
        fillOpacity="0.55"
        transform="translate(0 0.7)"
      >
        {metal.place}
      </text>
      <text
        x="20"
        y="35.2"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-heading"
        fontWeight="700"
        fontSize="15"
        fill={metal.ink}
      >
        {metal.place}
      </text>
    </svg>
  )
}

/**
 * Lokata bez medalu — numer w cienkim pierścieniu, bez wstążki i metalu.
 * Etykieta dostępności (np. „7. miejsce — finał" / „7th place — final")
 * przychodzi ze słownika; bez niej czytnik dostaje sam numer.
 */
export function PlaceMark({
  place,
  label,
  className,
}: {
  place: number | string
  label?: string
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={label ?? `${place}.`}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-current/25",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="time font-heading text-sm leading-none font-semibold tracking-tight"
      >
        {place}.
      </span>
    </span>
  )
}
