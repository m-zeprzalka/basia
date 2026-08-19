"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"

import paryzSkok from "@/assets/images/paryz-skok-startowy.webp"
import paryzSztafeta4x200 from "@/assets/images/paryz-sztafeta-4x200.webp"
import paryzSztafetaMix from "@/assets/images/paryz-sztafeta-mix.webp"
import paryzSztafetaRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import type { ParisDict, RelayRowData, VideoUiDict } from "@/data/main/types"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { PlaceMark } from "@/components/main/medal"
import { StatList } from "@/components/main/stat"
import { Video } from "@/components/main/video"

type FrameKey = ParisDict["frames"][number]["key"]

/** Kadry przyklejonej ramy — obrazy i punkty kadrowania są wspólne dla języków. */
const frameImages: Record<FrameKey, { src: StaticImageData; position: string }> =
  {
    razem: { src: paryzSztafetaRazem, position: "45% 50%" },
    "4x200": { src: paryzSztafeta4x200, position: "50% 40%" },
    mix: { src: paryzSztafetaMix, position: "50% 35%" },
    skok: { src: paryzSkok, position: "50% 45%" },
  }

/**
 * 04 — Paryż 2026. Scrollytelling: na desktopie lewa kolumna to przyklejona
 * rama pozioma (4:3, kadry z Paryża są poziome — zdjęcia pomniejszane zamiast
 * powiększanych, q90), w której zdjęcie zmienia się razem z czytanym blokiem
 * (obserwator przecięcia na blokach); na mobile każdy blok ma swoje zdjęcie
 * nad tekstem. Fakty otwierające to pionowa lista z naliczanymi liczbami.
 */
export function Paris({
  id,
  t,
  videoUi,
}: {
  id: string
  t: ParisDict
  videoUi: VideoUiDict
}) {
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
          | FrameKey
          | undefined
        if (key) setActive(key)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] }
    )
    blocks.forEach((block) => observer.observe(block))
    return () => observer.disconnect()
  }, [])

  const relays = t.relays

  return (
    // `overflow-x-clip`, nie `overflow-hidden`: przodek z overflow:hidden jest
    // kontenerem przewijania i wyłącza position:sticky przyklejonej ramy.
    <Chapter id={id} index={4} tone="deep" className="overflow-x-clip">
      <div
        className="water-e pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Frame className={`relative ${chapterPadding}`}>
        <Reveal>
          <ChapterHead
            index={4}
            label={t.label}
            title={t.title}
            lead={t.intro}
          />
        </Reveal>

        <Grid className="mt-14 items-start gap-y-12 sm:mt-20 lg:mt-24">
          {/* Przyklejona rama z mediami — tylko desktop. */}
          <div className="hidden lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-6 lg:block lg:self-start">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy ring-1 ring-white/10">
              {t.frames.map((frame) => {
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
                      alt={frame.alt}
                      fill
                      sizes="45vw"
                      quality={90}
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
              <figcaption className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-6">
                <span className="text-sm leading-snug text-white/85">
                  {t.frames.find((frame) => frame.key === active)?.caption}
                </span>
                <span className="board-e shrink-0 text-xs text-white/60">
                  {String(
                    t.frames.findIndex((frame) => frame.key === active) + 1
                  ).padStart(2, "0")}
                  <span className="opacity-60"> / </span>
                  {String(t.frames.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Bloki treści. */}
          <div
            ref={rootRef}
            className="col-span-4 flex flex-col gap-14 sm:col-span-8 lg:col-span-5 lg:col-start-8 lg:gap-24"
          >
            {/* 01 — wejście: fakty. */}
            <Block t={t} frameKey="razem">
              <h3 className="eyebrow text-white/70">{t.factsHeading}</h3>
              <StatList items={t.takeaways} className="mt-4" />
            </Block>

            {/* 02 — 4×200 dowolnym. */}
            <Block t={t} frameKey="4x200">
              <h3 className="eyebrow text-white/70">{t.relaysHeading}</h3>
              <RelayRow relay={relays[0]} splitPrefix={t.splitPrefix} />
            </Block>

            {/* 03 — sztafeta mieszana. */}
            <Block t={t} frameKey="mix">
              <RelayRow relay={relays[1]} splitPrefix={t.splitPrefix} />
            </Block>

            {/* 04 — 4×100 zmiennym + starty indywidualne. */}
            <Block t={t} frameKey="skok">
              <RelayRow relay={relays[2]} splitPrefix={t.splitPrefix} />
              <h3 className="eyebrow mt-10 text-white/70">
                {t.individualHeading}
              </h3>
              <ul className="mt-4 divide-y divide-white/12 border-y border-white/12">
                {t.individual.map((start) => (
                  <li
                    key={start.event}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-medium text-white">
                        {start.event}
                      </p>
                      <p className="mt-0.5 text-xs text-white/60">
                        {start.meta}
                      </p>
                    </div>
                    <p className="board-e text-lg font-medium text-white">
                      {start.time}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                {t.individualNote}
              </p>
            </Block>

            {/* Głos Barbary — nagranie PZP po finale 4×200. */}
            <Reveal>
              <h3 className="eyebrow text-white/70">{t.voiceHeading}</h3>
              <Video video={t.video} t={videoUi} className="mt-4" />
            </Reveal>
          </div>
        </Grid>
      </Frame>
    </Chapter>
  )
}

function Block({
  t,
  frameKey,
  children,
}: {
  t: ParisDict
  frameKey: FrameKey
  children: React.ReactNode
}) {
  const image = frameImages[frameKey]
  const frame = t.frames.find((entry) => entry.key === frameKey)!
  return (
    <Reveal>
      <div data-frame={frameKey}>
        {/* Na mobile zdjęcie bloku nad tekstem — zamiast przyklejonej ramy. */}
        <figure className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-navy ring-1 ring-white/10 lg:hidden">
          <Image
            src={image.src}
            alt={frame.alt}
            fill
            sizes="100vw"
            quality={90}
            placeholder="blur"
            style={{ objectPosition: image.position }}
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_85%,transparent),transparent)]"
            aria-hidden="true"
          />
          <figcaption className="absolute inset-x-4 bottom-4 text-xs leading-snug text-white/85">
            {frame.caption}
          </figcaption>
        </figure>
        {children}
      </div>
    </Reveal>
  )
}

function RelayRow({
  relay,
  splitPrefix,
}: {
  relay: RelayRowData
  splitPrefix: string
}) {
  return (
    <div className="mt-4 grid grid-cols-[2.75rem_1fr] items-start gap-x-4 border-y border-white/12 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6">
      <PlaceMark
        place={relay.place}
        label={relay.placeLabel}
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
              relay.stageKey === "final"
                ? "bg-gold-bright text-navy"
                : "bg-white/12 text-white/80"
            )}
          >
            {relay.stageLabel}
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
            {splitPrefix}{" "}
            <span className="board-e font-medium text-white">
              {relay.split}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
