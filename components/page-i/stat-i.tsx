"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   System statystyk wariantu I.

   StatValue — liczba naliczana jak na tablicy wyników. Rozumie trzy zapisy:
     czas pływacki  „7:58,22"          (m:ss,cc — liczony na setnych),
     ułamek         „+1,65 s" / „0,32 s" (przecinek dziesiętny, prefiks/sufiks),
     liczba całkowita „14" / „17."     (prefiks/sufiks przechodzą bez zmian).
   Przed animacją pokazuje wynik końcowy (zero skoków układu, działa bez JS);
   przy `prefers-reduced-motion` nie animuje wcale.

   StatList — pionowa lista statystyk z włoskowatymi liniami zamiast trzech
   ciasnych kolumn: wartości w jednej szerokości kolumny (równy lewy brzeg
   opisów), wjazd liczb kaskadą. Kolory z tokenów, więc ta sama lista działa
   na bieli i na głębokiej wodzie (`.on-deep`).
--------------------------------------------------------------------------- */

type ParsedStat = {
  target: number
  format: (value: number) => string
}

function formatSwimTime(value: number) {
  const centis = Math.round(value * 100)
  const minutes = Math.floor(centis / 6000)
  const secs = Math.floor((centis % 6000) / 100)
  const cents = centis % 100
  return `${minutes}:${String(secs).padStart(2, "0")},${String(cents).padStart(2, "0")}`
}

function parseStat(raw: string): ParsedStat | null {
  const time = raw.match(/^(\d+):(\d\d),(\d\d)$/)
  if (time) {
    const target =
      Number(time[1]) * 60 + Number(time[2]) + Number(time[3]) / 100
    return { target, format: formatSwimTime }
  }
  const parts = raw.match(/^([^0-9]*)(\d+(?:,\d+)?)([^0-9]*)$/)
  if (!parts) return null
  const [, prefix, digits, suffix] = parts
  const decimals = digits.includes(",") ? digits.split(",")[1].length : 0
  const target = Number(digits.replace(",", "."))
  return {
    target,
    format: (value) =>
      `${prefix}${value.toFixed(decimals).replace(".", ",")}${suffix}`,
  }
}

export function StatValue({
  value,
  duration = 1.8,
  delay = 0,
  /** Dodatkowa bramka startu (np. koniec wyścigu w replayu); poza nią liczy wejście w widok. */
  start = true,
  className,
}: {
  value: string
  duration?: number
  delay?: number
  start?: boolean
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const parsed = React.useMemo(() => parseStat(value), [value])

  React.useEffect(() => {
    const node = ref.current
    if (!node || !inView || !start || !parsed) return
    if (reduceMotion) {
      node.textContent = value
      return
    }
    const controls = animate(0, parsed.target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (current) => {
        node.textContent = parsed.format(current)
      },
    })
    return () => controls.stop()
  }, [inView, start, reduceMotion, parsed, value, duration, delay])

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  )
}

export type StatItem = { value: string; label: string }

export function StatList({
  items,
  className,
  valueClassName,
}: {
  items: readonly StatItem[]
  className?: string
  valueClassName?: string
}) {
  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => (
        <li
          key={item.label}
          className="flex items-baseline gap-x-5 py-3.5 sm:gap-x-6"
        >
          <StatValue
            value={item.value}
            delay={index * 0.12}
            className={cn(
              "board-e w-[7.25rem] shrink-0 text-2xl font-medium text-gold-ink sm:w-[8.25rem] sm:text-3xl",
              valueClassName
            )}
          />
          <span className="min-w-0 text-sm leading-snug text-muted-foreground">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
