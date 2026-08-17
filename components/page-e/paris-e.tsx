"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"

import paryzSkok from "@/assets/images/paryz-skok-startowy.webp"
import paryzSztafeta4x200 from "@/assets/images/paryz-sztafeta-4x200.webp"
import paryzSztafetaMix from "@/assets/images/paryz-sztafeta-mix.webp"
import paryzSztafetaRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import { paris as parisData } from "@/data/page-d/paris"
import { paris } from "@/data/page-e/copy"
import { videoById } from "@/data/page-e/media"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { PlaceMark } from "@/components/page-d/primitives-d"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { VideoE } from "@/components/page-e/video-e"

type FrameKey = (typeof paris.frames)[number]["key"]

const frameImages: Record<
  FrameKey,
  { src: StaticImageData; alt: string; position: string }
> = {
  razem: {
    src: paryzSztafetaRazem,
    alt: "Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu",
    position: "45% 50%",
  },
  "4x200": {
    src: paryzSztafeta4x200,
    alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska i Aleksandra Knop po finale sztafety 4×200 m stylem dowolnym",
    position: "50% 35%",
  },
  mix: {
    src: paryzSztafetaMix,
    alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok i Barbara Leśniewska przed finałem sztafety mieszanej 4×100 m stylem zmiennym",
    position: "50% 30%",
  },
  skok: {
    src: paryzSkok,
    alt: "Barbara Leśniewska w locie tuż po skoku startowym podczas eliminacji sztafety 4×100 m stylem zmiennym",
    position: "50% 45%",
  },
}

/**
 * 04 — Paryż 2026. Scrollytelling: na desktopie lewa kolumna to przyklejona
 * rama, w której zdjęcie zmienia się razem z czytanym blokiem (obserwator
 * przecięcia na blokach); na mobile każdy blok ma swoje zdjęcie nad tekstem.
 */
export function ParisE() {
  const [active, setActive] = React.useState<FrameKey>("razem")
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const blocks = Array.from(
      root.querySelectorAll<HTMLElement>("[data-frame]")
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const key = visible?.target.getAttribute("data-frame") as
          FrameKey | undefined
        if (key) setActive(key)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] }
    )
    blocks.forEach((block) => observer.observe(block))
    return () => observer.disconnect()
  }, [])

  const relays = parisData.relays
  const interview = videoById("video-paryz-4x200")

  return (
    <Chapter id="paryz" index={4} tone="deep" className="overflow-hidden">
      <div
        className="water-e pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Frame className={`relative ${chapterPadding}`}>
        <Reveal>
          <ChapterHead
            index={4}
            label={paris.label}
            title={paris.title}
            lead={paris.intro}
          />
        </Reveal>

        <Grid className="mt-14 items-start gap-y-12 sm:mt-20 lg:mt-24">
          {/* Przyklejona rama z mediami — tylko desktop. */}
          <div className="hidden lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:block lg:self-start">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy ring-1 ring-white/10">
              {paris.frames.map((frame) => {
                const image = frameImages[frame.key]
                const isActive = frame.key === active
                return (
                  <div
                    key={frame.key}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[1.04] opacity-0"
                    )}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="40vw"
                      placeholder="blur"
                      style={{ objectPosition: image.position }}
                      className="object-cover"
                    />
                  </div>
                )
              })}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_85%,transparent),transparent)]"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6">
                <span className="text-sm leading-snug text-white/85">
                  {paris.frames.find((frame) => frame.key === active)?.caption}
                </span>
                <span className="board-e shrink-0 text-xs text-white/60">
                  {String(
                    paris.frames.findIndex((frame) => frame.key === active) + 1
                  ).padStart(2, "0")}
                  <span className="opacity-60"> / </span>
                  {String(paris.frames.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Bloki treści. */}
          <div
            ref={rootRef}
            className="col-span-4 flex flex-col gap-14 sm:col-span-8 lg:col-span-6 lg:col-start-7 lg:gap-24"
          >
            {/* 01 — wejście: fakty. */}
            <Block frameKey="razem" caption={paris.frames[0].caption}>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6">
                {parisData.takeaways.map((fact) => (
                  <li key={fact.label} className="min-w-0">
                    <p className="board-e text-2xl font-medium text-gold-bright sm:text-3xl">
                      {fact.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-white/70 sm:text-sm">
                      {fact.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>

            {/* 02 — 4×200 dowolnym. */}
            <Block frameKey="4x200" caption={paris.frames[1].caption}>
              <h3 className="eyebrow text-white/70">{paris.relaysHeading}</h3>
              <RelayRow relay={relays[0]} />
            </Block>

            {/* 03 — sztafeta mieszana. */}
            <Block frameKey="mix" caption={paris.frames[2].caption}>
              <RelayRow relay={relays[1]} />
            </Block>

            {/* 04 — 4×100 zmiennym + starty indywidualne. */}
            <Block frameKey="skok" caption={paris.frames[3].caption}>
              <RelayRow relay={relays[2]} />
              <h3 className="eyebrow mt-10 text-white/70">
                {paris.individualHeading}
              </h3>
              <ul className="mt-4 divide-y divide-white/12 border-y border-white/12">
                {parisData.individual.map((start) => (
                  <li
                    key={start.event}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-medium text-white">
                        {start.event}
                      </p>
                      <p className="mt-0.5 text-xs text-white/60">
                        {start.place}. miejsce · {start.stage}
                      </p>
                    </div>
                    <p className="board-e text-lg font-medium text-white">
                      {start.time}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                {parisData.individualNote}
              </p>
            </Block>

            {/* Głos Barbary — nagranie PZP po finale 4×200. */}
            <Reveal>
              <h3 className="eyebrow text-white/70">Głos Barbary po finale</h3>
              <VideoE video={interview} className="mt-4" />
            </Reveal>
          </div>
        </Grid>
      </Frame>
    </Chapter>
  )
}

function Block({
  frameKey,
  caption,
  children,
}: {
  frameKey: FrameKey
  caption: string
  children: React.ReactNode
}) {
  const image = frameImages[frameKey]
  return (
    <Reveal>
      <div data-frame={frameKey}>
        {/* Na mobile zdjęcie bloku nad tekstem — zamiast przyklejonej ramy. */}
        <figure className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-navy ring-1 ring-white/10 lg:hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            style={{ objectPosition: image.position }}
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_85%,transparent),transparent)]"
            aria-hidden="true"
          />
          <figcaption className="absolute inset-x-4 bottom-4 text-xs leading-snug text-white/85">
            {caption}
          </figcaption>
        </figure>
        {children}
      </div>
    </Reveal>
  )
}

function RelayRow({ relay }: { relay: (typeof parisData.relays)[number] }) {
  return (
    <div className="mt-4 grid grid-cols-[2.75rem_1fr] items-start gap-x-4 border-y border-white/12 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6">
      <PlaceMark
        place={relay.place}
        stage={relay.stage}
        className={cn(
          "size-11",
          relay.highlight ? "text-white ring-white/60" : "text-white/70"
        )}
      />
      <div className="min-w-0">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-base leading-snug font-semibold text-white sm:text-lg">
            {relay.event}
          </span>
          <span
            className={cn(
              "eyebrow rounded-full px-2 py-0.5 text-[0.625rem]",
              relay.stage === "finał"
                ? "bg-gold-bright text-navy"
                : "bg-white/12 text-white/80"
            )}
          >
            {relay.stage}
          </span>
        </p>
        <p className="mt-1.5 text-sm text-white/65">{relay.lineup}</p>
        {relay.note ? (
          <p className="mt-1.5 text-sm leading-relaxed text-white/85">
            {relay.note}
          </p>
        ) : null}
      </div>
      <div className="col-start-2 mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
        <p className="board-e text-2xl font-medium text-white sm:text-3xl">
          {relay.time}
        </p>
        {relay.split ? (
          <p className="text-xs text-white/60">
            zmiana Barbary{" "}
            <span className="board-e font-medium text-white">
              {relay.split}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
