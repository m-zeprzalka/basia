import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import type { Medal as MedalKind } from "@/data/achievements"
import type { ReplayDict, ResultDict } from "@/data/main/types"
import { munich } from "@/data/munich"
import { Reveal } from "@/components/motion/reveal"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { Medal } from "@/components/main/medal"
import { ParallaxImage } from "@/components/main/parallax-image"
import { Replay } from "@/components/main/replay"
import { StatList } from "@/components/main/stat"
import { TimeCounter } from "@/components/main/time-counter"

/**
 * 01 — Wynik. Jeden czas na całą szerokość ramy, jak na tablicy hali —
 * a zaraz pod nim wizualizacja finału: trzy wyścigi na jednym torze
 * i fotofinisz z klamrą 0,32 s. Niżej — zdjęcie ze złotem, tablica finału
 * i fakty w pionowej liście z naliczanymi liczbami.
 */
export function Result({
  id,
  t,
  replay,
  decimal,
  medalLabels,
}: {
  id: string
  t: ResultDict
  replay: ReplayDict
  decimal: "," | "."
  medalLabels: Record<MedalKind, string>
}) {
  const { gap } = munich

  return (
    <Chapter id={id} index={1} tone="deep" className="overflow-hidden">
      <div
        className="water-e pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <Frame className={`relative ${chapterPadding}`}>
        <Reveal>
          <ChapterHead
            index={1}
            label={t.label}
            title={t.title}
            lead={t.lead}
          />
        </Reveal>

        {/* Tablica: czas na 12 kolumn. */}
        <Reveal delay={0.1}>
          <Grid className="mt-14 sm:mt-20 lg:mt-24">
            <div className="@container col-span-4 sm:col-span-8 lg:col-span-12">
              <p className="board-e text-[clamp(4.25rem,21cqw,17rem)] leading-[0.9] font-medium text-white">
                <TimeCounter
                  seconds={gap.barbara.seconds}
                  separator={decimal}
                  duration={2.4}
                />
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-4">
                <p className="eyebrow text-white/75">{t.boardCaption}</p>
                <p className="eyebrow text-gold-bright">{t.recordNote}</p>
              </div>
            </div>
          </Grid>
        </Reveal>

        {/* Wizualizacja finału — trzy wyścigi na jednym torze. */}
        <Reveal delay={0.15}>
          <div className="mt-14 sm:mt-20 lg:mt-24">
            <Replay t={replay} decimal={decimal} />
          </div>
        </Reveal>

        <Grid className="mt-14 items-start gap-y-12 sm:mt-20 lg:mt-24">
          {/* Medium — zdjęcie ze złotem, paralaksa. */}
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-7">
            <figure>
              <ParallaxImage
                src={monachiumZloto}
                alt={t.photoAlt}
                sizes="(min-width: 1024px) 56vw, 100vw"
                position="50% 28%"
                className="aspect-[4/3] rounded-2xl ring-1 ring-white/10 sm:aspect-[16/11]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_80%,transparent),transparent)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 sm:inset-x-6 sm:bottom-6">
                  <Medal medal="gold" className="size-11 sm:size-12" />
                  <div>
                    <p className="text-sm font-semibold text-white sm:text-base">
                      {t.photoTitle}
                    </p>
                    <p className="text-xs text-white/70 sm:text-sm">
                      {t.photoSub}
                    </p>
                  </div>
                </div>
              </ParallaxImage>
            </figure>
          </Reveal>

          {/* Tablica finału + fakty. */}
          <div className="col-span-4 flex flex-col gap-10 sm:col-span-8 lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              <h3 className="eyebrow text-white/70">{t.finalHeading}</h3>
              <ol className="mt-4 divide-y divide-white/12 border-y border-white/12">
                {t.podium.map((row) => (
                  <li
                    key={row.name}
                    className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-3"
                  >
                    <Medal
                      medal={row.medal}
                      className="size-9"
                      label={medalLabels[row.medal]}
                    />
                    <span className="min-w-0 text-sm leading-snug font-medium text-white sm:text-[0.9375rem]">
                      {row.name}
                    </span>
                    <span className="board-e text-base font-medium text-white sm:text-lg">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs leading-relaxed text-white/60">
                {t.podiumNote}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <h3 className="eyebrow text-white/70">{t.factsHeading}</h3>
              <StatList items={t.facts} className="mt-4" />
            </Reveal>
          </div>
        </Grid>
      </Frame>
    </Chapter>
  )
}
