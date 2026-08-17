"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import paryzSkok from "@/assets/images/paryz-skok-startowy.webp"
import paryzSztafeta4x200 from "@/assets/images/paryz-sztafeta-4x200.webp"
import paryzSztafetaMix from "@/assets/images/paryz-sztafeta-mix.webp"
import paryzSztafetaRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import { paris as parisData } from "@/data/page-d/paris"
import { videoById } from "@/data/page-e/media"
import { parisG } from "@/data/page-g/copy"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { PlaceMark } from "@/components/page-d/primitives-d"
import { Frame, Grid } from "@/components/page-e/frame-e"
import { VideoE } from "@/components/page-e/video-e"
import { SectionG } from "@/components/page-g/section-g"

const strip = [
  {
    src: paryzSztafeta4x200,
    alt: "Sztafeta 4×200 m st. dowolnym po finale — 7. miejsce",
    caption: "4×200 m st. dowolnym · finał · 7.",
    position: "50% 35%",
  },
  {
    src: paryzSztafetaMix,
    alt: "Sztafeta mieszana 4×100 m st. zmiennym przed finałem — 8. miejsce",
    caption: "4×100 m st. zmiennym mix · finał · 8.",
    position: "50% 30%",
  },
  {
    src: paryzSkok,
    alt: "Skok startowy Barbary w eliminacjach 4×100 m st. zmiennym",
    caption: "4×100 m st. zmiennym · eliminacje · 9.",
    position: "50% 45%",
  },
]

/**
 * 04 — Paryż. Kinowy kadr na całą szerokość i wysokość okna, przypięty:
 * podczas przewijania zdjęcie łagodnie się „oddala", a tytuł wjeżdża od dołu.
 * Dalej: trzy liczby, tablica sztafet z kadrami i głos Barbary po finale.
 */
export function ParisG() {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const titleY = useTransform(scrollYProgress, [0.1, 0.5], ["30%", "0%"])
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const interview = videoById("video-paryz-4x200")

  return (
    <SectionG id="paryz" index={4}>
      {/* Kinowy kadr. */}
      <div ref={stageRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <motion.div
            style={reduceMotion ? undefined : { scale, y: imgY }}
            className="absolute inset-0"
          >
            <Image
              src={paryzSztafetaRazem}
              alt="Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu"
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[45%_45%]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--paper-g)_0%,color-mix(in_oklab,var(--paper-g)_70%,transparent)_35%,color-mix(in_oklab,var(--paper-g)_15%,transparent)_70%,color-mix(in_oklab,var(--paper-g)_50%,transparent)_100%)]" />
          <Frame className="relative flex h-full flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
            <motion.div
              style={
                reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }
              }
            >
              <Grid className="items-end gap-y-6">
                <p className="tag-f col-span-4 flex items-center gap-4 sm:col-span-8 lg:col-span-12">
                  <span className="text-gold-g">{parisG.index}</span>
                  <span
                    className="h-px w-10 bg-current opacity-30"
                    aria-hidden="true"
                  />
                  <span className="text-ink-g/70">{parisG.label}</span>
                </p>
                <h2 className="wide-f col-span-4 text-[clamp(2.25rem,8vw,6.5rem)] text-ink-g sm:col-span-8 lg:col-span-9">
                  {parisG.title}
                </h2>
                <p className="col-span-4 max-w-[52ch] text-base leading-relaxed text-ink-g/80 sm:col-span-6 sm:text-lg lg:col-span-4 lg:col-start-9 lg:pb-2">
                  {parisG.lead}
                </p>
              </Grid>
            </motion.div>
          </Frame>
        </div>
      </div>

      <Frame className="pt-16 pb-24 sm:pb-32 lg:pb-40">
        {/* Trzy liczby. */}
        <Reveal>
          <ul className="grid grid-cols-3 gap-x-4 border-b border-ink-g/10 pb-10 sm:gap-x-8">
            {parisData.takeaways.map((fact) => (
              <li key={fact.label} className="min-w-0">
                <p className="condensed-f text-[clamp(2rem,7vw,7rem)] text-ink-g">
                  {fact.value}
                </p>
                <p className="mt-2 max-w-[22ch] text-xs leading-snug text-ink-g/65 sm:text-sm">
                  {fact.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Tablica sztafet + kadry. */}
        <Grid className="mt-14 items-start gap-y-12 sm:mt-20">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <Reveal>
              <p className="tag-f text-ink-g/55">Sztafety</p>
              <ol className="mt-4 divide-y divide-ink-g/10 border-y border-ink-g/10">
                {parisData.relays.map((relay) => (
                  <li
                    key={relay.event}
                    className="grid grid-cols-[2.75rem_1fr] items-start gap-x-4 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6"
                  >
                    <PlaceMark
                      place={relay.place}
                      stage={relay.stage}
                      className={cn(
                        "size-11",
                        relay.highlight
                          ? "text-ink-g ring-ink-g/60"
                          : "text-ink-g/60"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-base leading-snug font-semibold text-ink-g sm:text-lg">
                          {relay.event}
                        </span>
                        <span
                          className={cn(
                            "tag-f rounded-full px-2 py-0.5 text-[0.5625rem]",
                            relay.stage === "finał"
                              ? "bg-gold-g text-paper-g"
                              : "bg-ink-g/10 text-ink-g/80"
                          )}
                        >
                          {relay.stage}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm text-ink-g/60">
                        {relay.lineup}
                      </p>
                      {relay.note ? (
                        <p className="mt-1.5 text-sm text-ink-g/85">
                          {relay.note}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-start-2 mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
                      <p className="board-f text-2xl text-ink-g sm:text-3xl">
                        {relay.time}
                      </p>
                      {relay.split ? (
                        <p className="text-xs text-ink-g/60">
                          zmiana Barbary{" "}
                          <span className="board-f text-ink-g">
                            {relay.split}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <p className="tag-f text-ink-g/55">Starty indywidualne</p>
              <ul className="mt-4 grid divide-y divide-ink-g/10 border-y border-ink-g/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {parisData.individual.map((start) => (
                  <li
                    key={start.event}
                    className="flex items-baseline justify-between gap-4 py-3.5 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-medium">
                        {start.event}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-g/55">
                        {start.place}. miejsce · {start.stage}
                      </p>
                    </div>
                    <p className="board-f text-lg">{start.time}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-ink-g/60">
                {parisData.individualNote}
              </p>
            </Reveal>
          </div>

          <div className="col-span-4 grid grid-cols-3 gap-3 sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:gap-4">
            {strip.map((item, index) => (
              <Reveal key={item.caption} delay={index * 0.06}>
                <figure className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-ink-g/10 lg:aspect-[16/10]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 33vw"
                    placeholder="blur"
                    style={{ objectPosition: item.position }}
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-2 bottom-2 hidden text-[0.6875rem] text-ink-g/85 sm:block lg:inset-x-3 lg:bottom-3 lg:text-xs">
                    <span className="rounded bg-paper-g/80 px-1.5 py-0.5 backdrop-blur">
                      {item.caption}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Grid>

        {/* Wideo. */}
        <Grid className="mt-16 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-9 lg:col-start-2">
            <p className="tag-f text-ink-g/55">{parisG.videoHeading}</p>
            <div data-cursor="Odtwórz" className="mt-4">
              <VideoE video={interview} />
            </div>
          </Reveal>
        </Grid>
      </Frame>
    </SectionG>
  )
}
