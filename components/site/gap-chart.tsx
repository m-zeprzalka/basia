"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

/** Zakres osi — świadomie zawężony i opisany wprost pod wykresem. */
const SCALE_FROM = 132.0
const SCALE_TO = 132.6

const positionOf = (seconds: number) =>
  ((seconds - SCALE_FROM) / (SCALE_TO - SCALE_FROM)) * 100

export function GapChart({
  record,
  barbara,
  difference,
}: {
  record: {
    label: string
    time: string
    seconds: number
    holder: string
    context: string
  }
  barbara: { label: string; time: string; seconds: number }
  difference: string
}) {
  const ref = React.useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const show = isInView || reduceMotion

  const recordAt = positionOf(record.seconds)
  const barbaraAt = positionOf(barbara.seconds)

  const ease = [0.16, 1, 0.3, 1] as const
  const marker = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, scale: 0.6 },
    animate: show ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.5, delay, ease },
  })

  return (
    <figure
      ref={ref}
      className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/12 backdrop-blur-sm sm:p-8"
    >
      <figcaption className="flex flex-col gap-1.5">
        <span className="eyebrow text-muted-foreground">
          Dystans do rekordu Polski seniorek
        </span>
        <span className="text-lg font-medium">
          Dzieli je <span className="time text-gold-bright">{difference}</span>
        </span>
      </figcaption>

      <div className="mt-10">
        {/* Rekord seniorek — etykieta nad osią. */}
        <div className="relative h-16">
          <motion.div
            {...marker(0.15)}
            className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${recordAt}%` }}
          >
            <span className="time text-lg font-semibold text-gold-bright">
              {record.time}
            </span>
            <span className="mt-0.5 text-center text-[0.6875rem] leading-tight whitespace-nowrap text-muted-foreground">
              {record.label}
            </span>
            <span
              className="mt-2 h-4 w-px bg-gold-bright/60"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <div className="relative h-px bg-white/25">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span
              key={tick}
              className="absolute top-0 h-1.5 w-px bg-white/25"
              style={{ left: `${tick}%` }}
              aria-hidden="true"
            />
          ))}

          {/* Różnica między wynikami — rysowana od rekordu w stronę Barbary. */}
          <motion.span
            className="absolute -top-px h-0.5 origin-left bg-[linear-gradient(to_right,var(--gold-bright),#FFFFFF)]"
            style={{ left: `${recordAt}%`, width: `${barbaraAt - recordAt}%` }}
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={show ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            aria-hidden="true"
          />

          <motion.span
            {...marker(0.15)}
            className="absolute -top-[3px] size-1.5 -translate-x-1/2 rounded-full bg-gold-bright ring-4 ring-gold-bright/20"
            style={{ left: `${recordAt}%` }}
            aria-hidden="true"
          />
          <motion.span
            {...marker(1)}
            className="absolute -top-[3px] size-1.5 -translate-x-1/2 rounded-full bg-white ring-4 ring-white/20"
            style={{ left: `${barbaraAt}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Barbara — etykieta pod osią. */}
        <div className="relative h-16">
          <motion.div
            {...marker(1)}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${barbaraAt}%` }}
          >
            <span className="h-4 w-px bg-white/60" aria-hidden="true" />
            <span className="time mt-2 text-lg font-semibold">
              {barbara.time}
            </span>
            <span className="mt-0.5 text-center text-[0.6875rem] leading-tight whitespace-nowrap text-muted-foreground">
              {barbara.label}
            </span>
          </motion.div>
        </div>

        <p className="mt-2 flex items-center justify-between gap-3 text-[0.6875rem] text-muted-foreground/80">
          <span className="time">2:12,00</span>
          <span className="hidden text-center sm:inline">
            skala 0,6 s · 200 m st. zmiennym
          </span>
          <span className="time">2:12,60</span>
        </p>
      </div>

      <p className="mt-6 border-t border-white/12 pt-5 text-sm leading-relaxed text-muted-foreground">
        Rekord Polski seniorek — {record.time}, {record.holder} ·{" "}
        {record.context} — powstał jeszcze w erze kostiumów poliuretanowych i
        przetrwał do dziś.
      </p>
    </figure>
  )
}
