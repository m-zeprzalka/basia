"use client"

import * as React from "react"
import { PlayIcon, RotateCcwIcon } from "lucide-react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"

import type { ReplayDict } from "@/data/main/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StatValue } from "@/components/main/stat"

const REPLAY_SECONDS = 4.4 // czas odtwarzania całego wyścigu (do mety rekordu)
const ZOOM_FROM = 98.9 // fotofinisz pokazuje ostatnie 1,1 % dystansu

function formatClock(seconds: number, separator: string) {
  const centis = Math.round(seconds * 100)
  const minutes = Math.floor(centis / 6000)
  const secs = Math.floor((centis % 6000) / 100)
  const cents = centis % 100
  return `${minutes}:${String(secs).padStart(2, "0")}${separator}${String(cents).padStart(2, "0")}`
}

/**
 * Wizualizacja: trzy wyścigi na jednym torze (MŚJ 2025, MEJ 2026, seniorski
 * rekord Polski) — gdyby wystartowały razem. Kropki płyną liniowo, każda ze
 * swoją prędkością, i zamierają w chwili, gdy rekord dotyka ściany.
 *
 * Fotofinisz to rysunek techniczny pomiaru: oś ostatnich 2,2 m, znacznik
 * zawodniczki, ściana i klamra wymiarowa z różnicą 0,32 s pod odcinkiem.
 * Czasy nie wiszą w pasie pomiaru — leżą w wyrównanej legendzie pod osią.
 */
export function Replay({
  t,
  decimal,
}: {
  t: ReplayDict
  decimal: "," | "."
}) {
  const lanes = t.lanes
  const fastest = Math.min(...lanes.map((lane) => lane.seconds))
  const finishAt = (seconds: number) => (fastest / seconds) * 100
  const zoomAt = (seconds: number) =>
    ((finishAt(seconds) - ZOOM_FROM) / (100 - ZOOM_FROM)) * 100

  const barbara = lanes.find((lane) => lane.highlight)!
  const barbaraZoom = zoomAt(barbara.seconds)
  const bracketMid = (barbaraZoom + 100) / 2

  const replayRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(replayRef, { once: true, margin: "-25% 0px" })
  const reduceMotion = useReducedMotion()
  const [run, setRun] = React.useState(0)
  const [phase, setPhase] = React.useState<"idle" | "running" | "finished">(
    "idle"
  )
  const clockRef = React.useRef<HTMLSpanElement>(null)

  // Start automatyczny po wejściu w widok (raz) — kolejne uruchomienia z przycisku.
  const started = run > 0 || inView

  React.useEffect(() => {
    if (!started) return
    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => {
        setPhase("finished")
        if (clockRef.current)
          clockRef.current.textContent = formatClock(fastest, decimal)
      })
      return () => window.cancelAnimationFrame(frame)
    }
    let first = true
    const controls = animate(0, fastest, {
      duration: REPLAY_SECONDS,
      ease: "linear",
      onUpdate: (value) => {
        if (first) {
          first = false
          setPhase("running")
        }
        if (clockRef.current)
          clockRef.current.textContent = formatClock(value, decimal)
      },
      onComplete: () => setPhase("finished"),
    })
    return () => controls.stop()
  }, [started, run, reduceMotion, fastest, decimal])

  const finished = phase === "finished"

  return (
    <div
      ref={replayRef}
      className="rounded-2xl border border-white/12 bg-white/5 p-5 sm:p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="eyebrow text-aqua">{t.heading}</p>
          <p className="mt-2 max-w-[48ch] text-base text-white/80 sm:text-lg">
            {t.sub}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="board-e text-2xl font-medium text-white sm:text-3xl"
            aria-live="off"
          >
            <span ref={clockRef}>0:00{decimal}00</span>
          </span>
          <Button
            variant="outline"
            size="xl"
            className="rounded-full border-white/30 bg-white/8 text-white hover:bg-white/16 hover:text-white"
            onClick={() => {
              setPhase("idle")
              setRun((value) => value + 1)
            }}
          >
            {finished ? (
              <>
                <RotateCcwIcon data-icon="inline-start" />
                {t.again}
              </>
            ) : (
              <>
                <PlayIcon data-icon="inline-start" />
                {t.play}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tory. */}
      <ol className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/12">
        {lanes.map((lane) => {
          const target = finishAt(lane.seconds)
          const gap = lane.seconds - fastest
          const isRecord = Boolean(lane.record)
          const isBarbara = Boolean(lane.highlight)
          return (
            <li
              key={lane.key}
              className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-center gap-x-4 py-4 sm:grid-cols-[minmax(0,14rem)_1fr_5.5rem] sm:gap-x-6"
            >
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[0.8125rem] leading-snug font-medium sm:text-sm",
                    isRecord ? "text-gold-bright" : "text-white"
                  )}
                >
                  {lane.label}
                </p>
                <p className="mt-0.5 truncate text-xs text-white/55">
                  {lane.sub}
                </p>
              </div>
              <div className="relative h-8">
                {/* Lina toru. */}
                <span
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.28)_0_6px,transparent_6px_12px)]"
                  aria-hidden="true"
                />
                {/* Ściana. */}
                <span
                  className="absolute top-0 right-0 h-full w-px bg-gold-bright/70"
                  aria-hidden="true"
                />
                <motion.span
                  key={run}
                  className={cn(
                    "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    isRecord
                      ? "bg-gold-bright shadow-[0_0_0_6px_rgba(230,193,88,0.18)]"
                      : isBarbara
                        ? "bg-aqua shadow-[0_0_0_6px_rgba(53,189,238,0.2)]"
                        : "bg-white/70"
                  )}
                  initial={{ left: reduceMotion ? `${target}%` : "0%" }}
                  animate={started ? { left: `${target}%` } : {}}
                  transition={{
                    duration: reduceMotion ? 0 : REPLAY_SECONDS,
                    ease: "linear",
                  }}
                  aria-hidden="true"
                />
                {/* Etykieta straty — po dotarciu do mety, ze stałym odstępem
                    od kropki (1,25 rem), żeby nie stykała się z nią na mobile. */}
                <motion.span
                  className={cn(
                    "board-e absolute top-1/2 -translate-y-1/2 text-xs whitespace-nowrap",
                    gap === 0 ? "text-gold-bright" : "text-white/70"
                  )}
                  style={{
                    right: `calc(${100 - target}% + 1.25rem)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: finished ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  aria-hidden="true"
                >
                  {gap === 0
                    ? t.wall
                    : `+${gap.toFixed(2).replace(".", decimal)} s`}
                </motion.span>
              </div>
              <p className="board-e col-start-2 text-right text-sm font-medium text-white sm:col-start-3 sm:text-base">
                {lane.time}
              </p>
            </li>
          )
        })}
      </ol>

      {/* Fotofinisz. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center"
        aria-hidden={!finished}
      >
        <div className="rounded-2xl border border-gold-bright/30 bg-navy-deep/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="eyebrow text-gold-bright">{t.finish.heading}</p>
            <p className="eyebrow text-white/45">{t.finish.meta}</p>
          </div>

          {/* Pomiar: oś, znacznik zawodniczki, ściana i klamra wymiarowa. */}
          <div className="relative mt-7 h-16" aria-hidden="true">
            {/* Oś ostatnich 2,2 m. */}
            <span className="absolute inset-x-0 top-[21px] h-px -translate-y-1/2 bg-white/15" />
            {/* Odcinek zawodniczka → ściana. */}
            <span
              className="absolute top-[21px] h-0.5 -translate-y-1/2 bg-[linear-gradient(to_right,var(--aqua),var(--gold-bright))]"
              style={{ left: `${barbaraZoom}%`, right: 0 }}
            />
            {/* Znacznik Barbary. */}
            <span
              className="absolute top-[21px] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua ring-4 ring-aqua/20"
              style={{ left: `${barbaraZoom}%` }}
            />
            {/* Ściana. */}
            <span className="absolute top-[7px] right-0 h-7 w-0.5 rounded-full bg-gold-bright" />
            {/* Klamra wymiarowa. */}
            <span
              className="absolute top-[35px] h-2 border-x border-b border-gold-bright/50"
              style={{ left: `${barbaraZoom}%`, right: 0 }}
            />
            <span
              className="board-e absolute top-[45px] -translate-x-1/2 text-sm font-medium whitespace-nowrap text-gold-bright"
              style={{ left: `${bracketMid}%` }}
            >
              {t.finish.bracket}
            </span>
          </div>

          {/* Legenda — wyrównane wiersze zamiast napisów w pasie pomiaru. */}
          <ul className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-white/10 pt-4 sm:grid-cols-2">
            {t.finish.legend.map((entry) => {
              const isRecord = entry.key === "record"
              return (
                <li
                  key={entry.key}
                  className={cn(
                    "flex min-w-0 items-center gap-2.5",
                    isRecord && "sm:justify-end"
                  )}
                >
                  {isRecord ? (
                    <span
                      className="h-3.5 w-0.5 shrink-0 rounded-full bg-gold-bright"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="size-2.5 shrink-0 rounded-full bg-aqua"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "board-e text-sm font-medium",
                      isRecord ? "text-gold-bright" : "text-white"
                    )}
                  >
                    {entry.time}
                  </span>
                  <span className="min-w-0 truncate text-xs text-white/60">
                    {entry.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Dwie liczby, które zostają w głowie — naliczane po fotofiniszu. */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
          {t.stats.map((stat, index) => (
            <div key={stat.value}>
              <StatValue
                value={stat.value}
                start={finished}
                duration={1.4}
                delay={0.2 + index * 0.15}
                className={cn(
                  "board-e text-4xl font-medium sm:text-5xl",
                  index === 0 ? "text-gold-bright" : "text-white"
                )}
              />
              <p className="mt-2 text-sm leading-snug text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
