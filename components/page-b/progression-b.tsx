"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { progressionContext, raceProgression } from "@/data/progression"
import { Frame, Marker } from "@/components/page-b/primitives"

const formatDelta = (previous: number, current: number) =>
  `−${(previous - current).toFixed(2).replace(".", ",")}`

/**
 * Progresja opowiedziana skokami, nie krzywą.
 *
 * Bohaterem każdego wiersza jest wielkość poprawy względem poprzedniego wyniku —
 * dzięki temu historia „blisko pięć sekund w dwanaście miesięcy" jest widoczna
 * wprost, bez wykresu i bez skalowania osi.
 */
export function ProgressionB() {
  const ref = React.useRef<HTMLOListElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const reduceMotion = useReducedMotion()
  const show = isInView || reduceMotion

  const first = raceProgression[0]
  const last = raceProgression[raceProgression.length - 1]
  const total = formatDelta(first.seconds, last.seconds)

  return (
    <section id="progresja-b" className="scroll-mt-16 border-b border-line-b">
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <Marker index="03">Progresja</Marker>
            <h2 className="display-b mt-7 text-[clamp(2.5rem,15cqw,4.5rem)]">
              <span className="block">Od 18. miejsca</span>
              <span className="outline-b block">do złota</span>
            </h2>

            <p className="mt-8 max-w-md leading-relaxed text-ink-b-soft">
              Wszystkie starty na 200 m stylem zmiennym od 2025 roku,
              uszeregowane według wyniku. Liczba przy każdym wierszu to poprawa
              względem wiersza wyżej.
            </p>

            <div className="mt-10 border-t border-ink-b pt-6">
              <p className="mono-b text-ink-b-soft">Łączna poprawa</p>
              <p className="display-b mt-3 text-[clamp(3.5rem,18cqw,6rem)] text-electric">
                {total} s
              </p>
              <p className="mt-3 text-sm text-ink-b-soft">
                {progressionContext.improvement}.
              </p>
            </div>
          </div>

          <ol ref={ref} className="min-w-0 border-t border-line-b">
            {raceProgression.map((race, index) => {
              const previous = raceProgression[index - 1]

              return (
                <motion.li
                  key={race.time}
                  className={cn(
                    "group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-line-b py-6 transition-colors sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-x-8",
                    race.highlight && "bg-paper-b-deep"
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={show ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Skok — najgłośniejszy element wiersza. */}
                  <p
                    className={cn(
                      "display-b order-2 text-[clamp(1.75rem,6vw,2.75rem)] sm:order-none",
                      previous ? "text-electric" : "text-ink-b-soft"
                    )}
                  >
                    {previous ? (
                      <>
                        {formatDelta(previous.seconds, race.seconds)}
                        <span className="text-[0.5em]"> s</span>
                      </>
                    ) : (
                      <span className="mono-b tracking-[0.2em]">Start</span>
                    )}
                  </p>

                  <div className="order-1 min-w-0 sm:order-none">
                    <p className="text-base font-medium">
                      {race.event}
                      {race.venue ? `, ${race.venue}` : ""}
                    </p>
                    <p className="mono-b mt-1.5 text-ink-b-soft">
                      {race.date}
                      {race.note ? ` · ${race.note}` : ""}
                    </p>
                  </div>

                  <p className="time display-b order-3 text-right text-[clamp(1.75rem,6vw,2.75rem)] sm:order-none">
                    {race.time}
                  </p>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </Frame>
    </section>
  )
}
