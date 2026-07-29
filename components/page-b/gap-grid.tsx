"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Przewaga pokazana jako siatka setnych sekundy.
 *
 * Jeden kwadrat = 0,01 s, licząc od 2:12,00. Rekord seniorek wypada na polu 13,
 * wynik Barbary na polu 45 — różnica to dokładnie 32 zapalone pola. Nic nie jest
 * tu skalowane ani skracane, więc odczyt jest wprost, bez interpretacji.
 */
const CELLS = 60
const RECORD_CELL = 13
const BARBARA_CELL = 45

export function GapGrid({
  recordTime,
  barbaraTime,
  difference,
}: {
  recordTime: string
  barbaraTime: string
  difference: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const show = isInView || reduceMotion

  return (
    <figure ref={ref} className="border border-paper-b/20 p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="mono-b text-muted-foreground">
          Dystans do rekordu Polski seniorek
        </span>
        <span className="display-b text-[clamp(2rem,6vw,3rem)] text-electric-soft">
          {difference}
        </span>
      </figcaption>

      <div
        className="mt-8 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px] sm:grid-cols-[repeat(30,minmax(0,1fr))] lg:grid-cols-[repeat(60,minmax(0,1fr))]"
        aria-hidden="true"
      >
        {Array.from({ length: CELLS }, (_, index) => {
          const cell = index + 1
          const isRecord = cell === RECORD_CELL
          const isBarbara = cell === BARBARA_CELL
          const isGap = cell > RECORD_CELL && cell < BARBARA_CELL

          return (
            <motion.span
              key={cell}
              className={cn(
                "h-10 sm:h-12 lg:h-16",
                isRecord && "bg-amber-b",
                isBarbara && "bg-paper-b",
                isGap && "bg-electric",
                !isRecord && !isBarbara && !isGap && "bg-paper-b/12"
              )}
              initial={reduceMotion ? false : { opacity: 0, scaleY: 0.2 }}
              animate={show ? { opacity: 1, scaleY: 1 } : {}}
              transition={{
                duration: 0.35,
                delay: 0.15 + index * 0.012,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )
        })}
      </div>

      <p className="mono-b mt-4 text-muted-foreground">
        1 kwadrat = 0,01 s · skala od 2:12,00 do 2:12,60
      </p>

      <dl className="mt-8 border-t border-paper-b/20">
        <div className="flex items-baseline justify-between gap-4 border-b border-paper-b/20 py-3.5">
          <dt className="flex items-center gap-3 text-sm">
            <span className="size-2.5 shrink-0 bg-amber-b" aria-hidden="true" />
            Rekord Polski seniorek
          </dt>
          <dd className="time font-heading text-lg">{recordTime}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3.5">
          <dt className="flex items-center gap-3 text-sm">
            <span className="size-2.5 shrink-0 bg-paper-b" aria-hidden="true" />
            Barbara Leśniewska
          </dt>
          <dd className="time font-heading text-lg">{barbaraTime}</dd>
        </div>
      </dl>
    </figure>
  )
}
