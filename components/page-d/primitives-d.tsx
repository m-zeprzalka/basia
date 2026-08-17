import * as React from "react"

import { cn } from "@/lib/utils"
import type { Medal as MedalKind } from "@/data/achievements"

/* ---------------------------------------------------------------------------
   Medal — krążek na wstążce, z numerem miejsca wybitym w metalu.

   Klient: „tam gdzie mamy numerki 1/2/3 miejsce, to zawsze powinno
   przypominać prawdziwe medale". Dlatego zamiast kropki czy cyfry rysujemy
   medal: dwie wstęgi zbiegające się do zawieszki, krążek z metalicznym
   gradientem, wewnętrzny rant i cyfra 1/2/3. Kolor wstążki bierze token
   `--medal-ribbon`, więc na granacie wstążka jest jasna, na bieli — granatowa.
--------------------------------------------------------------------------- */

const metals: Record<
  MedalKind,
  { stops: [string, string, string]; ink: string; label: string; place: string }
> = {
  gold: {
    stops: ["#FBEDB2", "#E0B646", "#A87A22"],
    ink: "#6E4F0F",
    label: "Złoty medal",
    place: "1",
  },
  silver: {
    stops: ["#F7F9FC", "#C5CFDB", "#8794A6"],
    ink: "#4E5A68",
    label: "Srebrny medal",
    place: "2",
  },
  bronze: {
    stops: ["#F2CBA3", "#C98A4B", "#8A552A"],
    ink: "#5E3716",
    label: "Brązowy medal",
    place: "3",
  },
}

export function Medal({
  medal,
  className,
  decorative = false,
}: {
  medal: MedalKind
  className?: string
  /** Gdy medal stoi obok tekstu „Złoty medal", nie dublujemy etykiety. */
  decorative?: boolean
}) {
  const id = React.useId().replace(/:/g, "")
  const metal = metals[medal]
  const gradientId = `medal-${medal}-${id}`
  const shineId = `shine-${id}`

  return (
    <svg
      viewBox="0 0 40 52"
      className={cn("block size-10 shrink-0", className)}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": metal.label })}
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
 * Lokata bez medalu — wyraźnie inna forma niż medal: numer w cienkim
 * pierścieniu, bez wstążki i bez metalu. Nikt nie pomyli jej z podium.
 */
export function PlaceMark({
  place,
  stage,
  className,
}: {
  place: number | string
  /** Kontekst lokaty, np. „finał", „eliminacje" — trafia do etykiety. */
  stage?: string
  className?: string
}) {
  const label = `${place}. miejsce${stage ? ` — ${stage}` : ""}`
  return (
    <span
      role="img"
      aria-label={label}
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

/** Podpis medalu w legendzie i na półce z medalami. */
export function medalLabel(medal: MedalKind) {
  return metals[medal].label
}

/* ---------------------------------------------------------------------------
   Nagłówek sekcji wariantu D — numer sekcji jest częścią rytmu prezentacji
   („01 / 07"), a tytuł może być dłuższy niż w A, bo niesie tezę, nie etykietę.
--------------------------------------------------------------------------- */
export const SECTION_COUNT = 7

export function SectionHeadD({
  index,
  eyebrow,
  title,
  lead,
  className,
  titleClassName,
}: {
  index: number
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <div className={cn("@container flex max-w-3xl flex-col gap-5", className)}>
      <p className="eyebrow flex items-center gap-3 text-muted-foreground">
        <span
          className="shrink-0 whitespace-nowrap text-gold-ink"
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
          <span className="opacity-50">
            {" "}
            / {String(SECTION_COUNT).padStart(2, "0")}
          </span>
        </span>
        <span
          className="h-px w-8 shrink-0 bg-current opacity-40"
          aria-hidden="true"
        />
        <span>{eyebrow}</span>
      </p>
      <h2
        className={cn(
          "display text-[clamp(1.75rem,7.5cqw,3.25rem)] [overflow-wrap:break-word]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
