"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { trajectory } from "@/data/page-d/pitch"
import { munich } from "@/data/munich"
import { raceProgression, seniorRecord } from "@/data/progression"
import { Reveal } from "@/components/motion/reveal"
import { GapChart } from "@/components/site/gap-chart"
import { Container } from "@/components/site/primitives"
import { Medal, SectionHeadD } from "@/components/page-d/primitives-d"

/* ---------------------------------------------------------------------------
   Wykres rysowany w pikselach, nie w viewBoxie: szerokość bierzemy z pomiaru
   kontenera, więc etykiety mają zawsze czytelny stopień pisma — także na
   telefonie, gdzie skalowany viewBox zmieniłby 13 px w 7 px.
--------------------------------------------------------------------------- */
const DOMAIN = { fast: 131.9, slow: 137.6 }
const PAD = { top: 44, right: 28, bottom: 30, left: 28 }

function useMeasure<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(node)
    setWidth(node.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}

/** Oś dystansu do rekordu — ta sama figura co w A, terminologia wariantu D. */
function GapD() {
  const { gap } = munich
  return (
    <GapChart
      record={{ ...gap.record, label: "Seniorski rekord Polski" }}
      barbara={gap.barbara}
      difference={gap.difference}
      heading="Dystans do seniorskiego rekordu Polski"
      footnote={
        <>
          Seniorski rekord Polski —{" "}
          <span className="time">{gap.record.time}</span>, {gap.record.holder} ·{" "}
          {gap.record.context} — powstał jeszcze w erze kostiumów
          poliuretanowych i przetrwał do dziś. Barbara ma 16 lat i już jest o{" "}
          <span className="time">{gap.difference}</span> od niego.
        </>
      }
    />
  )
}

export function TrajectoryD() {
  const [ref, width] = useMeasure<HTMLDivElement>()
  const chartRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const show = isInView || reduceMotion

  const lastIndex = raceProgression.length - 1
  const [active, setActive] = React.useState(lastIndex)
  const race = raceProgression[active]

  const compact = width < 560
  const height = compact ? 250 : 320
  const plot = {
    left: PAD.left,
    right: Math.max(width - PAD.right, PAD.left + 1),
    top: PAD.top,
    bottom: height - PAD.bottom,
  }
  const xOf = (index: number) =>
    plot.left + (index / lastIndex) * (plot.right - plot.left)
  const yOf = (seconds: number) =>
    plot.top +
    ((seconds - DOMAIN.fast) / (DOMAIN.slow - DOMAIN.fast)) *
      (plot.bottom - plot.top)
  const recordY = yOf(seniorRecord.seconds)

  const linePath = raceProgression
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${xOf(index).toFixed(1)},${yOf(point.seconds).toFixed(1)}`
    )
    .join(" ")
  const areaPath = `${linePath} L${xOf(lastIndex).toFixed(1)},${plot.bottom} L${xOf(0).toFixed(1)},${plot.bottom} Z`

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="trajektoria"
      className="on-deep grain relative scroll-mt-24 overflow-hidden bg-navy text-foreground"
    >
      <div
        className="water-deep pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="lanes pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <SectionHeadD
                index={2}
                eyebrow={trajectory.eyebrow}
                title={trajectory.title}
                lead={trajectory.lead}
              />
            </Reveal>

            <Reveal delay={0.12} className="mt-10 hidden lg:block">
              <GapD />
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-7">
            <figure className="rounded-3xl bg-white/6 p-4 ring-1 ring-white/12 backdrop-blur-sm sm:p-6 lg:p-8">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="text-base font-medium sm:text-lg">
                  Droga od <span className="time">2:17,03</span> do{" "}
                  <span className="time text-gold-bright">2:12,45</span>
                </span>
                <span className="eyebrow text-muted-foreground">
                  200 m st. zmiennym · basen 50 m
                </span>
              </figcaption>

              <div ref={ref} className="mt-4 w-full">
                <div ref={chartRef} className="relative">
                  {width > 0 ? (
                    <svg
                      width={width}
                      height={height}
                      viewBox={`0 0 ${width} ${height}`}
                      className="block overflow-visible"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="trajectory-fill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0"
                            stopColor="var(--aqua)"
                            stopOpacity="0.28"
                          />
                          <stop
                            offset="1"
                            stopColor="var(--aqua)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      {/* Seniorski rekord Polski — cel, do którego zmierza krzywa. */}
                      <line
                        x1={plot.left}
                        x2={plot.right}
                        y1={recordY}
                        y2={recordY}
                        stroke="var(--gold-bright)"
                        strokeWidth={1.5}
                        strokeDasharray="5 5"
                        opacity={0.9}
                      />
                      <text
                        x={plot.right}
                        y={recordY - 9}
                        textAnchor="end"
                        className="fill-gold-bright text-[12px] font-medium"
                      >
                        <tspan className="time">{seniorRecord.time}</tspan>
                        <tspan> · seniorski rekord Polski</tspan>
                      </text>

                      <line
                        x1={plot.left}
                        x2={plot.right}
                        y1={plot.bottom}
                        y2={plot.bottom}
                        stroke="rgba(255,255,255,0.18)"
                      />

                      <motion.path
                        d={areaPath}
                        fill="url(#trajectory-fill)"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={show ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                      <motion.path
                        d={linePath}
                        fill="none"
                        stroke="var(--aqua)"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={reduceMotion ? false : { pathLength: 0 }}
                        animate={show ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.5, ease }}
                      />

                      {raceProgression.map((point, index) => {
                        const x = xOf(index)
                        const y = yOf(point.seconds)
                        const isLast = index === lastIndex
                        const isActive = index === active
                        return (
                          <g key={point.time}>
                            {isActive ? (
                              <motion.circle
                                cx={x}
                                cy={y}
                                r={16}
                                fill={
                                  isLast ? "var(--gold-bright)" : "var(--aqua)"
                                }
                                opacity={0.18}
                                initial={reduceMotion ? false : { scale: 0.4 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, ease }}
                                style={{ transformOrigin: `${x}px ${y}px` }}
                              />
                            ) : null}
                            <motion.circle
                              cx={x}
                              cy={y}
                              r={isActive ? 7 : 5}
                              fill={
                                isLast ? "var(--gold-bright)" : "var(--aqua)"
                              }
                              stroke="var(--navy)"
                              strokeWidth={3}
                              initial={
                                reduceMotion
                                  ? false
                                  : { opacity: 0, scale: 0.3 }
                              }
                              animate={show ? { opacity: 1, scale: 1 } : {}}
                              transition={{
                                delay: 0.35 + index * 0.16,
                                duration: 0.4,
                                ease,
                              }}
                              style={{ transformOrigin: `${x}px ${y}px` }}
                            />
                            {/* Czas nad punktem; ostatni pod punktem — nie wchodzi
                                ani na linię rekordu, ani na etykietę poprzedniego startu. */}
                            <text
                              x={isLast ? x + 4 : x}
                              y={isLast ? y + 28 : y - 14}
                              textAnchor={isLast ? "end" : "middle"}
                              className={cn(
                                "time font-medium",
                                isLast
                                  ? "fill-gold-bright text-[15px] font-semibold"
                                  : "fill-white text-[13px]",
                                isActive && !isLast && "fill-white"
                              )}
                            >
                              {point.time}
                            </text>
                            {!compact ? (
                              <>
                                <text
                                  x={x}
                                  y={plot.bottom + 18}
                                  textAnchor={
                                    index === 0
                                      ? "start"
                                      : isLast
                                        ? "end"
                                        : "middle"
                                  }
                                  className="fill-white text-[12px] font-medium"
                                >
                                  {point.event}
                                </text>
                              </>
                            ) : null}
                            <circle
                              cx={x}
                              cy={y}
                              r={22}
                              fill="transparent"
                              className="cursor-pointer"
                              onMouseEnter={() => setActive(index)}
                              onClick={() => setActive(index)}
                            />
                          </g>
                        )
                      })}
                    </svg>
                  ) : (
                    <div style={{ height }} />
                  )}
                </div>
              </div>

              {/* Przełącznik startów — dostępny odpowiednik punktów na wykresie. */}
              <div
                role="tablist"
                aria-label="Starty na 200 m stylem zmiennym"
                className="mt-4 flex flex-wrap gap-2"
              >
                {raceProgression.map((point, index) => {
                  const isActive = index === active
                  return (
                    <button
                      key={point.time}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(index)}
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ring-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-aqua",
                        isActive
                          ? "bg-white text-navy ring-white"
                          : "bg-white/6 text-white/80 ring-white/15 hover:bg-white/12"
                      )}
                    >
                      <span className="time">{point.time}</span>
                      <span
                        className={isActive ? "text-navy/70" : "text-white/55"}
                      >
                        {point.event}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Szczegóły aktywnego startu. */}
              <div
                role="status"
                aria-live="polite"
                className="mt-4 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 rounded-2xl bg-navy-deep/60 p-4 ring-1 ring-white/10"
              >
                <div className="row-span-2 flex items-center">
                  {race.medal ? (
                    <Medal medal={race.medal} className="size-11" />
                  ) : (
                    <span className="time display text-3xl text-white/70">
                      {race.note?.match(/^\d+\./)?.[0] ?? "—"}
                    </span>
                  )}
                </div>
                <p className="time display text-2xl text-white sm:text-3xl">
                  {race.time}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-white">{race.event}</span>
                  {race.venue ? ` · ${race.venue}` : ""} · {race.date}
                  {race.note ? ` · ${race.note}` : ""}
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {trajectory.chartCaption}. Linia przerywana — seniorski rekord
                Polski: <span className="time">{seniorRecord.time}</span> (
                {seniorRecord.holder}, {seniorRecord.context}).
              </p>

              <table className="sr-only">
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
                  {raceProgression.map((point) => (
                    <tr key={point.time}>
                      <td>
                        {point.event}
                        {point.venue ? `, ${point.venue}` : ""}
                      </td>
                      <td>{point.date}</td>
                      <td>{point.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </Reveal>

          {/* Na mobile oś dystansu jest zwinięta: 0,32 s widać już w hero,
              w tezie i na linii rekordu wykresu — nie wydłużamy strony. */}
          <details className="group min-w-0 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl bg-white/6 px-5 py-4 text-sm font-medium ring-1 ring-white/12 outline-none select-none focus-visible:ring-2 focus-visible:ring-aqua [&::-webkit-details-marker]:hidden">
              Zobacz dystans do seniorskiego rekordu Polski
              <span
                className="text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              >
                ▾
              </span>
            </summary>
            <div className="mt-4">
              <GapD />
            </div>
          </details>
        </div>
      </Container>
    </section>
  )
}
