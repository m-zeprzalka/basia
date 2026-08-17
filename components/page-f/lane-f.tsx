"use client"

import * as React from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { laneF } from "@/data/page-f/copy"
import { raceProgression, seniorRecord } from "@/data/progression"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Medal } from "@/components/page-d/primitives-d"
import { Frame } from "@/components/page-e/frame-e"
import { ChapterHeadF, SectionF } from "@/components/page-f/section-f"

/**
 * 02 — Tor. Na desktopie rozdział jest przypięty: pionowe przewijanie
 * przesuwa tor w poziomie — pięć „stacji" (startów) i ściana z seniorskim
 * rekordem Polski na końcu. Na mniejszych ekranach ten sam tor jest pionową
 * listą. Oba warianty są w DOM, o widoczności decyduje CSS.
 */
export function LaneF() {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [distance, setDistance] = React.useState(0)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.4 })
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const last = raceProgression[raceProgression.length - 1]

  return (
    <SectionF id="tor" index={2}>
      {/* ---------- Desktop: przypięty tor poziomy ---------- */}
      <div
        ref={wrapRef}
        className="relative hidden lg:block"
        style={{ height: `${raceProgression.length * 62 + 60}vh` }}
      >
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
          {/* Kompaktowy nagłówek — tor potrzebuje miejsca. */}
          <Frame className="pt-(--header-height)">
            <div className="grid items-start gap-x-8 gap-y-4 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="tag-f flex items-center gap-4">
                  <span className="text-gold-f">{laneF.index}</span>
                  <span
                    className="h-px w-10 bg-current opacity-30"
                    aria-hidden="true"
                  />
                  <span className="text-chalk-f/60">{laneF.label}</span>
                </p>
                <h2 className="wide-f mt-5 text-[clamp(2rem,4.4vw,4rem)]">
                  {laneF.title}
                </h2>
              </div>
              <p className="max-w-[46ch] text-sm leading-relaxed text-chalk-f/70 lg:col-span-4 lg:col-start-9 lg:pt-8 lg:text-base">
                {laneF.lead}
              </p>
            </div>
          </Frame>

          <div className="relative min-h-0 flex-1">
            <motion.div
              ref={trackRef}
              style={reduceMotion ? undefined : { x }}
              className="absolute inset-y-0 left-0 flex items-end pr-[10vw] pl-12 2xl:pl-16"
            >
              {/* Lina toru na całej długości. */}
              <span
                className="pointer-events-none absolute right-0 bottom-[5.5rem] left-0 h-px bg-[repeating-linear-gradient(to_right,rgba(238,243,248,0.3)_0_8px,transparent_8px_16px)]"
                aria-hidden="true"
              />
              {raceProgression.map((race, index) => (
                <Station
                  key={race.time}
                  race={race}
                  index={index}
                  last={index === raceProgression.length - 1}
                />
              ))}
              {/* Ściana. */}
              <div className="relative flex h-full w-[38vw] min-w-[26rem] flex-col justify-end pb-[7.5rem] pl-12">
                <span
                  className="absolute inset-y-0 left-0 w-px bg-gold-f"
                  aria-hidden="true"
                />
                <p className="tag-f text-gold-f">{laneF.wallLabel}</p>
                <p className="condensed-f mt-3 text-[clamp(4rem,10.5vw,10rem)] text-gold-f">
                  {seniorRecord.time}
                </p>
                <p className="mt-3 max-w-[30ch] text-sm text-chalk-f/70">
                  {seniorRecord.holder} · {seniorRecord.context}. Od finału w
                  Monachium dzieli go{" "}
                  <span className="board-f text-aqua-f">0,32 s</span>.
                </p>
              </div>
            </motion.div>
            {/* Pływaczka — znacznik stoi w miejscu, tor płynie pod nim. */}
            <span
              className="pointer-events-none absolute bottom-[5.5rem] left-[36%] size-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-aqua-f shadow-[0_0_0_10px_rgba(94,225,255,0.14),0_0_40px_rgba(94,225,255,0.55)]"
              aria-hidden="true"
            />
          </div>

          {/* Pasek postępu i podpowiedź. */}
          <Frame className="pb-6">
            <div className="flex items-center justify-between gap-6">
              <p className="tag-f text-chalk-f/45">{laneF.hint}</p>
              <div className="h-px w-48 bg-white/12">
                <motion.span
                  className="block h-full bg-aqua-f"
                  style={{ width: progress }}
                />
              </div>
            </div>
          </Frame>
        </div>
      </div>

      {/* ---------- Mobile / tablet: pionowa lista ---------- */}
      <div className="lg:hidden">
        <Frame className="py-24 sm:py-32">
          <ChapterHeadF
            index={laneF.index}
            label={laneF.label}
            title={laneF.title}
            lead={laneF.lead}
          />
          <ol className="relative mt-14 border-l border-dashed border-white/20 pl-8">
            {raceProgression.map((race, index) => {
              const isLast = index === raceProgression.length - 1
              return (
                <Reveal
                  as="li"
                  key={race.time}
                  delay={index * 0.05}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    className={cn(
                      "absolute top-3 -left-8 size-3 -translate-x-1/2 rounded-full ring-4 ring-ink-f",
                      isLast ? "bg-gold-f" : "bg-aqua-f"
                    )}
                    aria-hidden="true"
                  />
                  <p
                    className={cn(
                      "condensed-f text-6xl sm:text-7xl",
                      isLast ? "text-gold-f" : "text-chalk-f"
                    )}
                  >
                    {race.time}
                  </p>
                  <p className="mt-3 flex items-center gap-3 text-base font-medium">
                    {race.medal ? (
                      <Medal medal={race.medal} className="size-8" />
                    ) : null}
                    {race.event}
                    {race.venue ? `, ${race.venue}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-chalk-f/60">
                    {race.date}
                    {race.note ? ` · ${race.note}` : ""}
                  </p>
                </Reveal>
              )
            })}
            <li className="relative pt-12">
              <span
                className="absolute top-14 -left-8 h-8 w-px -translate-x-1/2 bg-gold-f"
                aria-hidden="true"
              />
              <p className="tag-f text-gold-f">{laneF.wallLabel}</p>
              <p className="condensed-f mt-2 text-5xl text-gold-f">
                {seniorRecord.time}
              </p>
              <p className="mt-2 text-sm text-chalk-f/70">
                {seniorRecord.holder} · {seniorRecord.context} · od {last.time}{" "}
                dzieli go <span className="board-f text-aqua-f">0,32 s</span>
              </p>
            </li>
          </ol>
        </Frame>
      </div>
    </SectionF>
  )
}

function Station({
  race,
  index,
  last,
}: {
  race: (typeof raceProgression)[number]
  index: number
  last: boolean
}) {
  return (
    <div className="relative flex h-full w-[46vw] min-w-[30rem] flex-col justify-end pr-16">
      {/* Znacznik na linie. */}
      <span
        className={cn(
          "absolute bottom-[5.5rem] left-0 size-3 -translate-x-1/2 translate-y-1/2 rounded-full ring-4 ring-ink-f",
          last ? "bg-gold-f" : "bg-chalk-f/70"
        )}
        aria-hidden="true"
      />
      <p className="tag-f text-chalk-f/45">
        {String(index + 1).padStart(2, "0")}{" "}
        <span className="opacity-60">/</span>{" "}
        {String(raceProgression.length).padStart(2, "0")}
      </p>
      <p
        className={cn(
          "condensed-f mt-3 text-[clamp(4rem,10.5vw,10rem)]",
          last ? "text-gold-f" : "text-chalk-f"
        )}
      >
        {race.time}
      </p>
      <div className="mt-5 mb-[7.5rem] flex items-start gap-4">
        {race.medal ? (
          <Medal medal={race.medal} className="size-11 shrink-0" />
        ) : null}
        <div>
          <p className="text-lg font-medium">
            {race.event}
            {race.venue ? `, ${race.venue}` : ""}
          </p>
          <p className="mt-1 text-sm text-chalk-f/60">
            {race.date}
            {race.note ? ` · ${race.note}` : ""}
          </p>
        </div>
      </div>
    </div>
  )
}
