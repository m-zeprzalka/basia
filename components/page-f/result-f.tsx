"use client"

import * as React from "react"
import { PlayIcon, RotateCcwIcon } from "lucide-react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"

import { resultF } from "@/data/page-f/copy"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { TimeCounter } from "@/components/motion/time-counter"
import { Medal } from "@/components/page-d/primitives-d"
import { Frame, Grid } from "@/components/page-e/frame-e"
import { ChapterHeadF, SectionF } from "@/components/page-f/section-f"

const REPLAY_SECONDS = 4.4 // czas odtwarzania całego wyścigu (do mety rekordu)
const ZOOM_FROM = 98.9 // fotofinisz pokazuje ostatnie 1,1 % dystansu

function formatClock(seconds: number) {
  const centis = Math.round(seconds * 100)
  const minutes = Math.floor(centis / 6000)
  const secs = Math.floor((centis % 6000) / 100)
  const cents = centis % 100
  return `${minutes}:${String(secs).padStart(2, "0")},${String(cents).padStart(2, "0")}`
}

/**
 * 01 — Wynik. Jeden czas na całą ramę, pod nim replay: trzy wyścigi na
 * jednym torze (MŚJ 2025, MEJ 2026, seniorski rekord Polski) — gdyby
 * wystartowały razem. Kropki płyną liniowo, każda ze swoją prędkością,
 * i zamierają w chwili, gdy rekord dotyka ściany. Fotofinisz pokazuje
 * ostatnie 1,1 % dystansu w powiększeniu: tam 0,32 s ma szerokość dłoni.
 */
export function ResultF() {
  const lanes = resultF.replay.lanes
  const fastest = Math.min(...lanes.map((lane) => lane.seconds))
  const finishAt = (seconds: number) => (fastest / seconds) * 100
  const zoomAt = (seconds: number) =>
    ((finishAt(seconds) - ZOOM_FROM) / (100 - ZOOM_FROM)) * 100

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
          clockRef.current.textContent = formatClock(fastest)
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
        if (clockRef.current) clockRef.current.textContent = formatClock(value)
      },
      onComplete: () => setPhase("finished"),
    })
    return () => controls.stop()
  }, [started, run, reduceMotion, fastest])

  const finished = phase === "finished"

  return (
    <SectionF id="wynik" index={1}>
      <Frame className="py-24 sm:py-32 lg:py-40">
        <ChapterHeadF
          index={resultF.index}
          label={resultF.label}
          title={resultF.title}
          lead={resultF.lead}
        />

        {/* Jeden czas. */}
        <Reveal>
          <div className="@container mt-14 border-t border-white/10 pt-6 sm:mt-20 lg:mt-24">
            <p className="condensed-f text-[clamp(5rem,26cqw,24rem)] text-chalk-f">
              <TimeCounter seconds={132.45} duration={2.2} />
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
              <p className="tag-f text-chalk-f/60">
                200 m st. zmiennym · finał · Monachium, 12.07.2026
              </p>
              <p className="tag-f text-gold-f">
                Rekord Polski 16-, 17- i 18-latek
              </p>
            </div>
          </div>
        </Reveal>

        {/* Replay. */}
        <Reveal delay={0.1}>
          <div
            ref={replayRef}
            className="mt-16 rounded-3xl border border-white/10 bg-ink-f-2/60 p-5 sm:mt-20 sm:p-8 lg:mt-24 lg:p-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="tag-f text-aqua-f">{resultF.replay.heading}</p>
                <p className="mt-2 max-w-[48ch] text-base text-chalk-f/80 sm:text-lg">
                  {resultF.replay.sub}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="board-f text-2xl text-chalk-f sm:text-3xl"
                  aria-live="off"
                >
                  <span ref={clockRef}>0:00,00</span>
                </span>
                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-full border-white/20 bg-transparent hover:bg-white/8"
                  onClick={() => {
                    setPhase("idle")
                    setRun((value) => value + 1)
                  }}
                >
                  {phase === "finished" ? (
                    <>
                      <RotateCcwIcon data-icon="inline-start" />
                      {resultF.replay.replay}
                    </>
                  ) : (
                    <>
                      <PlayIcon data-icon="inline-start" />
                      {resultF.replay.play}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Tory. */}
            <ol className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/10">
              {lanes.map((lane) => {
                const target = finishAt(lane.seconds)
                const gap = lane.seconds - fastest
                return (
                  <li
                    key={lane.key}
                    className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-center gap-x-4 py-4 sm:grid-cols-[minmax(0,14rem)_1fr_5.5rem] sm:gap-x-6"
                  >
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "truncate text-sm font-medium",
                          "record" in lane && lane.record
                            ? "text-gold-f"
                            : "text-chalk-f"
                        )}
                      >
                        {lane.label}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-chalk-f/55">
                        {lane.sub}
                      </p>
                    </div>
                    <div className="relative h-8">
                      {/* Lina toru. */}
                      <span
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(to_right,rgba(238,243,248,0.28)_0_6px,transparent_6px_12px)]"
                        aria-hidden="true"
                      />
                      {/* Ściana. */}
                      <span
                        className="absolute top-0 right-0 h-full w-px bg-gold-f/70"
                        aria-hidden="true"
                      />
                      <motion.span
                        key={run}
                        className={cn(
                          "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                          "record" in lane && lane.record
                            ? "bg-gold-f shadow-[0_0_0_6px_rgba(230,193,88,0.18)]"
                            : "highlight" in lane && lane.highlight
                              ? "bg-aqua-f shadow-[0_0_0_6px_rgba(94,225,255,0.18)]"
                              : "bg-chalk-f/70"
                        )}
                        initial={{ left: reduceMotion ? `${target}%` : "0%" }}
                        animate={started ? { left: `${target}%` } : {}}
                        transition={{
                          duration: reduceMotion ? 0 : REPLAY_SECONDS,
                          ease: "linear",
                        }}
                        aria-hidden="true"
                      />
                      {/* Etykieta straty — po dotarciu do mety. */}
                      <motion.span
                        className={cn(
                          "board-f absolute top-1/2 -translate-y-1/2 text-xs whitespace-nowrap",
                          gap === 0 ? "text-gold-f" : "text-chalk-f/70"
                        )}
                        style={{
                          right: gap === 0 ? "0.75rem" : `${100 - target + 2}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: finished ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        aria-hidden="true"
                      >
                        {gap === 0
                          ? "ściana"
                          : `+${gap.toFixed(2).replace(".", ",")} s`}
                      </motion.span>
                    </div>
                    <p className="board-f col-start-2 text-right text-sm text-chalk-f sm:col-start-3 sm:text-base">
                      {lane.time}
                    </p>
                  </li>
                )
              })}
            </ol>

            {/* Fotofinisz — powiększenie ostatnich 1,1 % dystansu. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center"
              aria-hidden={!finished}
            >
              <div className="rounded-2xl border border-gold-f/30 bg-ink-f p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="tag-f text-gold-f">
                    Fotofinisz · ostatnie 1,1 % dystansu
                  </p>
                  <p className="tag-f text-chalk-f/45">≈ 2,2 m z 200 m</p>
                </div>
                <div className="relative mt-6 h-16">
                  <span
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-0 right-0 h-full w-px bg-gold-f"
                    aria-hidden="true"
                  />
                  {lanes
                    .filter((lane) => zoomAt(lane.seconds) >= 0)
                    .map((lane) => {
                      const left = zoomAt(lane.seconds)
                      const isRecord = "record" in lane && lane.record
                      return (
                        <React.Fragment key={lane.key}>
                          <span
                            className={cn(
                              "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
                              isRecord ? "bg-gold-f" : "bg-aqua-f"
                            )}
                            style={{ left: `${left}%` }}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              "board-f absolute top-0 -translate-x-1/2 text-xs whitespace-nowrap",
                              isRecord
                                ? "right-0 translate-x-0 text-gold-f"
                                : "text-aqua-f"
                            )}
                            style={isRecord ? undefined : { left: `${left}%` }}
                          >
                            {lane.time}
                          </span>
                          <span
                            className={cn(
                              "absolute bottom-0 -translate-x-1/2 text-[0.6875rem] whitespace-nowrap text-chalk-f/60",
                              isRecord && "right-0 translate-x-0"
                            )}
                            style={isRecord ? undefined : { left: `${left}%` }}
                          >
                            {isRecord ? "rekord Polski" : "Barbara 2026"}
                          </span>
                        </React.Fragment>
                      )
                    })}
                  {/* Odcinek 0,32 s. */}
                  <span
                    className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-[linear-gradient(to_right,var(--aqua-f),var(--gold-f))]"
                    style={{ left: `${zoomAt(132.45)}%`, right: 0 }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm text-chalk-f/70">
                  {resultF.replay.finishNote}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                <div>
                  <p className="condensed-f text-5xl text-aqua-f normal-case sm:text-6xl">
                    {resultF.replay.gapLabel}
                  </p>
                  <p className="mt-2 text-sm text-chalk-f/70">
                    do seniorskiego rekordu Polski (K. Baranowska, Pekin 2008)
                  </p>
                </div>
                <div>
                  <p className="condensed-f text-5xl text-chalk-f normal-case sm:text-6xl">
                    4,58 s
                  </p>
                  <p className="mt-2 text-sm text-chalk-f/70">
                    poprawy w dwanaście miesięcy — z 18. miejsca na świecie do
                    złota Europy
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Podium i fakty. */}
        <Grid className="mt-16 gap-y-12 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-6">
            <p className="tag-f text-chalk-f/60">{resultF.podiumHeading}</p>
            <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {resultF.podium.map((row) => (
                <li
                  key={row.name}
                  className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 py-3.5"
                >
                  <Medal medal={row.medal} className="size-10" />
                  <span className="text-base font-medium">{row.name}</span>
                  <span className="board-f text-lg">{row.time}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal
            delay={0.08}
            className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8"
          >
            <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6">
              {resultF.facts.map((fact) => (
                <li key={fact.label} className="min-w-0">
                  <p className="condensed-f text-5xl text-gold-f sm:text-6xl">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-chalk-f/70 sm:text-sm">
                    {fact.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Grid>
      </Frame>
    </SectionF>
  )
}
