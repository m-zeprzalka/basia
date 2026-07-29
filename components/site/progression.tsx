"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  progressionContext,
  raceProgression,
  seniorRecord,
} from "@/data/progression"
import { Reveal } from "@/components/motion/reveal"
import { Container, SectionHeading } from "@/components/site/primitives"

/* Wykres celowo poglądowy: bez siatki i osi wartości — liczą się czasy przy
   punktach oraz linia rekordu seniorek jako cel. */
const VIEW = { width: 600, height: 330 }
const PLOT = { left: 60, right: 540, top: 56, bottom: 240 }
const DOMAIN = { fast: 132.0, slow: 137.6 }

const yOf = (seconds: number) =>
  PLOT.top +
  ((seconds - DOMAIN.fast) / (DOMAIN.slow - DOMAIN.fast)) *
    (PLOT.bottom - PLOT.top)

const xOf = (index: number) =>
  PLOT.left + (index / (raceProgression.length - 1)) * (PLOT.right - PLOT.left)

const referenceY = yOf(seniorRecord.seconds)

const linePath = raceProgression
  .map(
    (race, index) =>
      `${index === 0 ? "M" : "L"}${xOf(index)},${yOf(race.seconds)}`
  )
  .join(" ")

export function Progression() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const reduceMotion = useReducedMotion()
  const show = isInView || reduceMotion
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const last = raceProgression[raceProgression.length - 1]

  return (
    <section id="progresja" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow="Progresja"
                title="Od 18. miejsca do złota"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col gap-8">
                <div className="border-l-2 border-hairline pl-5">
                  <p className="time display text-3xl text-slate">
                    {progressionContext.start.time}
                  </p>
                  <p className="mt-1.5 text-sm font-medium">
                    {progressionContext.start.label} —{" "}
                    {progressionContext.start.event}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Punkt wyjścia sprzed dwunastu miesięcy.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-5">
                  <p className="time display text-3xl text-navy">{last.time}</p>
                  <p className="mt-1.5 text-sm font-medium">
                    Złoto mistrzostw Europy juniorów 2026
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Poprawa o {progressionContext.improvement}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0">
            <figure className="min-w-0">
              <figcaption className="flex flex-col gap-1.5">
                <span className="eyebrow text-slate">
                  200 m stylem zmiennym · basen 50 m
                </span>
                <span className="text-lg font-medium">
                  Droga od 2:17,03 do 2:12,45
                </span>
              </figcaption>

              <div
                className="mt-6 overflow-x-auto rounded-lg outline-offset-4"
                tabIndex={0}
                role="group"
                aria-label="Wykres progresji — obszar przewijany poziomo"
              >
                <div
                  ref={containerRef}
                  className="relative min-w-[32rem]"
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <svg
                    viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
                    className="h-auto w-full"
                    aria-hidden="true"
                  >
                    {/* Rekord Polski seniorek — cel, do którego prowadzi krzywa. */}
                    <line
                      x1={PLOT.left}
                      x2={PLOT.right}
                      y1={referenceY}
                      y2={referenceY}
                      stroke="var(--gold)"
                      strokeWidth={2}
                      strokeDasharray="6 5"
                    />
                    <text
                      x={PLOT.left}
                      y={referenceY - 10}
                      className="fill-gold-ink text-[13px] font-medium"
                    >
                      <tspan className="time">{seniorRecord.time}</tspan>
                      <tspan> · rekord Polski seniorek</tspan>
                    </text>

                    <line
                      x1={PLOT.left}
                      x2={PLOT.right}
                      y1={PLOT.bottom}
                      y2={PLOT.bottom}
                      stroke="var(--hairline)"
                      strokeWidth={1}
                    />

                    <motion.path
                      d={linePath}
                      fill="none"
                      stroke="var(--azure)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={show ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {raceProgression.map((race, index) => {
                      const x = xOf(index)
                      const y = yOf(race.seconds)
                      const isLast = index === raceProgression.length - 1
                      const isActive = activeIndex === index

                      return (
                        <g key={race.time}>
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={isActive ? 8 : 5.5}
                            fill={isLast ? "var(--gold)" : "var(--azure)"}
                            stroke="var(--background)"
                            strokeWidth={3}
                            initial={
                              reduceMotion ? false : { opacity: 0, scale: 0.4 }
                            }
                            animate={show ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              delay: 0.45 + index * 0.14,
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />

                          {/* Ostatni czas po lewej stronie punktu — inaczej
                              wchodziłby na linię rekordu seniorek. */}
                          {isLast ? (
                            <text
                              x={x - 22}
                              y={y + 5}
                              textAnchor="end"
                              className="time fill-navy text-[17px] font-semibold"
                            >
                              {race.time}
                            </text>
                          ) : (
                            <text
                              x={x}
                              y={y - 17}
                              textAnchor="middle"
                              className="time fill-foreground text-[15px] font-medium"
                            >
                              {race.time}
                            </text>
                          )}

                          <text
                            x={x}
                            y={PLOT.bottom + 26}
                            textAnchor="middle"
                            className="fill-foreground text-[13px] font-medium"
                          >
                            {race.event}
                          </text>
                          <text
                            x={x}
                            y={PLOT.bottom + 44}
                            textAnchor="middle"
                            className="fill-muted-foreground text-[12px]"
                          >
                            {race.venue ? `${race.venue} · ` : ""}
                            {race.date}
                          </text>

                          <circle
                            cx={x}
                            cy={y}
                            r={26}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setActiveIndex(index)}
                          />
                        </g>
                      )
                    })}
                  </svg>

                  {activeIndex !== null ? (
                    <div
                      className={cn(
                        "pointer-events-none absolute z-10 w-max max-w-[13rem] -translate-x-1/2 -translate-y-full rounded-xl bg-navy px-3.5 py-2.5 text-white shadow-lg",
                        activeIndex === 0 && "translate-x-0",
                        activeIndex === raceProgression.length - 1 &&
                          "-translate-x-full"
                      )}
                      style={{
                        left: `${(xOf(activeIndex) / VIEW.width) * 100}%`,
                        top: `${((yOf(raceProgression[activeIndex].seconds) - 18) / VIEW.height) * 100}%`,
                      }}
                      role="status"
                    >
                      <p className="time text-lg leading-none font-semibold">
                        {raceProgression[activeIndex].time}
                      </p>
                      <p className="mt-1.5 text-xs leading-snug text-white/75">
                        {raceProgression[activeIndex].note ??
                          raceProgression[activeIndex].event}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Alternatywa tekstowa dla czytników ekranu. */}
              <div className="sr-only">
                <table>
                  <caption>
                    Starty Barbary Leśniewskiej na 200 m stylem zmiennym
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Zawody</th>
                      <th scope="col">Data</th>
                      <th scope="col">Wynik</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceProgression.map((race) => (
                      <tr key={race.time}>
                        <td>
                          {race.event}
                          {race.venue ? `, ${race.venue}` : ""}
                        </td>
                        <td>{race.date}</td>
                        <td>{race.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <figcaption className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                Starty uszeregowane od najsłabszego do najlepszego wyniku; przy
                każdym podana data. Linia przerywana to rekord Polski seniorek —{" "}
                <span className="time">{seniorRecord.time}</span> (
                {seniorRecord.holder}, {seniorRecord.context}).
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
