"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import type { Medal as MedalKind } from "@/data/achievements"
import type { ProgressDict } from "@/data/main/types"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { Medal } from "@/components/main/medal"

/* Wykres liczony w pikselach: szerokość z pomiaru ramy, więc stopień pisma
   etykiet jest stały na każdej szerokości ekranu. Wcięcia boczne są minimalne —
   pole wykresu ma tę samą szerokość co tekst karty. */
const DOMAIN = { fast: 131.9, slow: 137.6 }
const PAD = { top: 44, right: 12, bottom: 34, left: 12 }
const ease = [0.16, 1, 0.3, 1] as const

function useWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [width, setWidth] = React.useState(0)
  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    )
    observer.observe(node)
    setWidth(node.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [])
  return [ref, width] as const
}

/**
 * 02 — Postępy. Wykres na 8 kolumnach, lista startów (tablica) na 4;
 * punkt i wiersz są jednym stanem — dotknięcie jednego podświetla drugie.
 *
 * Etykiety czasów mają jeden stopień pisma i leżą po stronie, po której nie
 * biegnie linia (starty są uszeregowane od najsłabszego do najlepszego, więc
 * linia zawsze wznosi się w prawo): środkowe punkty podpisujemy z lewej nad
 * linią, pierwszy z prawej pod linią, a najlepszy — pod punktem, przy ścianie.
 */
export function Progress({
  id,
  t,
  medalLabels,
}: {
  id: string
  t: ProgressDict
  medalLabels: Record<MedalKind, string>
}) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const chartRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(chartRef, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const show = inView || reduceMotion

  const races = t.races
  const lastIndex = races.length - 1
  const [active, setActive] = React.useState(lastIndex)

  const compact = width < 560
  const height = compact ? 260 : 360
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
  const recordY = yOf(t.record.seconds)

  const linePath = races
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${xOf(index).toFixed(1)},${yOf(point.seconds).toFixed(1)}`
    )
    .join(" ")
  const areaPath = `${linePath} L${xOf(lastIndex).toFixed(1)},${plot.bottom} L${xOf(0).toFixed(1)},${plot.bottom} Z`

  /** Pozycja etykiety czasu — zawsze po wolnej stronie linii. */
  const timeLabel = (index: number, x: number, y: number) => {
    if (index === 0) return { x: x + 12, y: y + 8, anchor: "start" as const }
    if (index === lastIndex)
      return { x: x + 4, y: y + 28, anchor: "end" as const }
    return { x: x - 10, y: y - 10, anchor: "end" as const }
  }

  return (
    <Chapter id={id} index={2} tone="light">
      <Frame className={chapterPadding}>
        <Reveal>
          <ChapterHead
            index={2}
            label={t.label}
            title={t.title}
            lead={t.lead}
          />
        </Reveal>

        <Grid className="mt-14 items-start gap-y-10 sm:mt-20 lg:mt-24">
          {/* Wykres. */}
          <Reveal className="col-span-4 min-w-0 sm:col-span-8 lg:col-span-8">
            <figure className="rounded-2xl border border-border p-4 sm:p-6">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="text-base font-medium sm:text-lg">
                  {t.chartHeadingPre}
                  <span className="board-e">{t.chartFrom}</span>
                  {t.chartHeadingMid}
                  <span className="board-e text-gold-ink">{t.chartTo}</span>
                </span>
                <span className="eyebrow text-muted-foreground">
                  {t.chartEyebrow}
                </span>
              </figcaption>

              <div ref={ref} className="mt-4 w-full">
                <div ref={chartRef}>
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
                          id="progress-main-fill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0"
                            stopColor="var(--azure)"
                            stopOpacity="0.16"
                          />
                          <stop
                            offset="1"
                            stopColor="var(--azure)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <line
                        x1={plot.left}
                        x2={plot.right}
                        y1={recordY}
                        y2={recordY}
                        stroke="var(--gold)"
                        strokeWidth={1.5}
                        strokeDasharray="5 5"
                      />
                      <text
                        x={plot.right}
                        y={recordY - 9}
                        textAnchor="end"
                        className="fill-gold-ink text-[12px] font-medium"
                      >
                        <tspan className="board-e">{t.record.time}</tspan>
                        <tspan>{t.recordLineLabel}</tspan>
                      </text>

                      <line
                        x1={plot.left}
                        x2={plot.right}
                        y1={plot.bottom}
                        y2={plot.bottom}
                        stroke="var(--hairline)"
                      />

                      <motion.path
                        d={areaPath}
                        fill="url(#progress-main-fill)"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={show ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.7 }}
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
                        transition={{ duration: 1.6, ease }}
                      />

                      {races.map((point, index) => {
                        const x = xOf(index)
                        const y = yOf(point.seconds)
                        const isLast = index === lastIndex
                        const isActive = index === active
                        const label = timeLabel(index, x, y)
                        return (
                          <g key={point.time}>
                            {isActive ? (
                              <circle
                                cx={x}
                                cy={y}
                                r={16}
                                fill={isLast ? "var(--gold)" : "var(--azure)"}
                                opacity={0.14}
                              />
                            ) : null}
                            <motion.circle
                              cx={x}
                              cy={y}
                              r={isActive ? 7 : 5}
                              fill={isLast ? "var(--gold)" : "var(--azure)"}
                              stroke="var(--background)"
                              strokeWidth={3}
                              initial={
                                reduceMotion
                                  ? false
                                  : { opacity: 0, scale: 0.3 }
                              }
                              animate={show ? { opacity: 1, scale: 1 } : {}}
                              transition={{
                                delay: 0.4 + index * 0.16,
                                duration: 0.4,
                                ease,
                              }}
                              style={{ transformOrigin: `${x}px ${y}px` }}
                            />
                            <text
                              x={label.x}
                              y={label.y}
                              textAnchor={label.anchor}
                              className={cn(
                                "board-e text-[13px] font-medium",
                                isLast
                                  ? "fill-gold-ink font-semibold"
                                  : "fill-foreground"
                              )}
                            >
                              {point.time}
                            </text>
                            {!compact ? (
                              <text
                                x={x}
                                y={plot.bottom + 20}
                                textAnchor={
                                  index === 0
                                    ? "start"
                                    : isLast
                                      ? "end"
                                      : "middle"
                                }
                                className="fill-muted-foreground text-[12px] font-medium"
                              >
                                {point.event}
                              </text>
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

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {t.caption} <span className="board-e">{t.record.time}</span> (
                {t.record.holder}, {t.record.context}).
              </p>
            </figure>
          </Reveal>

          {/* Lista startów — tablica; ten sam stan co punkty. */}
          <Reveal
            delay={0.08}
            className="col-span-4 min-w-0 sm:col-span-8 lg:col-span-4"
          >
            <h3 className="eyebrow text-muted-foreground">{t.startsHeading}</h3>
            <ol
              role="tablist"
              aria-label={t.startsAria}
              className="mt-4 divide-y divide-border border-y border-border"
            >
              {races.map((point, index) => {
                const isActive = index === active
                return (
                  <li key={point.time}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      className={cn(
                        "grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-3 text-left transition-colors outline-none focus-visible:bg-mist sm:gap-x-4",
                        isActive ? "bg-mist" : "hover:bg-mist/60"
                      )}
                    >
                      <span className="flex justify-center">
                        {point.medal ? (
                          <Medal
                            medal={point.medal}
                            className="size-8"
                            label={medalLabels[point.medal]}
                          />
                        ) : (
                          <span className="board-e text-xs text-muted-foreground">
                            {point.mark ?? "—"}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {point.event}
                          {point.venue ? `, ${point.venue}` : ""}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {point.date}
                          {point.note ? ` · ${point.note}` : ""}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "board-e pr-3 text-base font-medium sm:text-lg",
                          index === lastIndex ? "text-gold-ink" : "text-navy"
                        )}
                      >
                        {point.time}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footnote}
            </p>
          </Reveal>
        </Grid>
      </Frame>
    </Chapter>
  )
}
