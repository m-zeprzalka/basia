import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import { munich } from "@/data/munich"
import { result } from "@/data/page-e/copy"
import { Reveal } from "@/components/motion/reveal"
import { TimeCounter } from "@/components/motion/time-counter"
import { Medal } from "@/components/page-d/primitives-d"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { ParallaxImageE } from "@/components/page-e/parallax-image-e"

/** Tablica finału — trzy pierwsze zawodniczki, prawdziwe medale zamiast cyfr. */
const podium = [
  { medal: "gold" as const, name: "Barbara Leśniewska", time: "2:12,45" },
  { medal: "silver" as const, name: "Viktoria Tarannikova", time: "2:14,10" },
  { medal: "bronze" as const, name: "Anna Rzaeva", time: "2:14,44" },
]

/**
 * 01 — Wynik. Jeden czas na całą szerokość ramy, jak na tablicy hali:
 * to jest zdanie otwierające całą prezentację. Poniżej — zdjęcie ze złotem,
 * tablica finału i dystans do seniorskiego rekordu Polski.
 */
export function ResultE() {
  const { gap } = munich

  return (
    <Chapter id="wynik" index={1} tone="deep" className="overflow-hidden">
      <div
        className="water-e pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <Frame className={`relative ${chapterPadding}`}>
        <Reveal>
          <ChapterHead
            index={1}
            label={result.label}
            title={result.title}
            lead={result.lead}
          />
        </Reveal>

        {/* Tablica: czas na 12 kolumn. */}
        <Reveal delay={0.1}>
          <Grid className="mt-14 sm:mt-20 lg:mt-24">
            <div className="@container col-span-4 sm:col-span-8 lg:col-span-12">
              <p className="board-e text-[clamp(4.25rem,21cqw,17rem)] leading-[0.9] font-medium text-white">
                <TimeCounter seconds={gap.barbara.seconds} duration={2.4} />
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-4">
                <p className="eyebrow text-white/75">{result.boardCaption}</p>
                <p className="eyebrow text-gold-bright">
                  Rekord Polski 16-, 17- i 18-latek
                </p>
              </div>
            </div>
          </Grid>
        </Reveal>

        <Grid className="mt-14 items-start gap-y-12 sm:mt-20 lg:mt-24">
          {/* Medium — zdjęcie ze złotem, paralaksa. */}
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-7">
            <figure>
              <ParallaxImageE
                src={monachiumZloto}
                alt="Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium"
                sizes="(min-width: 1024px) 56vw, 100vw"
                position="50% 28%"
                className="aspect-[4/3] rounded-2xl ring-1 ring-white/10 sm:aspect-[16/11]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_80%,transparent),transparent)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 sm:inset-x-6 sm:bottom-6">
                  <Medal
                    medal="gold"
                    className="size-11 sm:size-12"
                    decorative
                  />
                  <div>
                    <p className="text-sm font-semibold text-white sm:text-base">
                      Mistrzyni Europy juniorów
                    </p>
                    <p className="text-xs text-white/70 sm:text-sm">
                      200 m stylem zmiennym · Monachium, 12.07.2026
                    </p>
                  </div>
                </div>
              </ParallaxImageE>
            </figure>
          </Reveal>

          {/* Tablica finału + dystans do rekordu. */}
          <div className="col-span-4 flex flex-col gap-10 sm:col-span-8 lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              <h3 className="eyebrow text-white/70">
                Finał · 200 m st. zmiennym
              </h3>
              <ol className="mt-4 divide-y divide-white/12 border-y border-white/12">
                {podium.map((row) => (
                  <li
                    key={row.name}
                    className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-3"
                  >
                    <Medal medal={row.medal} className="size-9" />
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
                Przewaga nad srebrną medalistką: 1,65 s. Najlepszy czas
                półfinałów, w finale o dwie sekundy szybciej.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <GapRuler
                heading={result.gapHeading}
                record={gap.record}
                barbara={gap.barbara}
                difference={gap.difference}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6">
                {result.facts.map((fact) => (
                  <li key={fact.label} className="min-w-0">
                    <p className="board-e text-2xl font-medium text-gold-bright sm:text-3xl">
                      {fact.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-white/70">
                      {fact.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Grid>
      </Frame>
    </Chapter>
  )
}

/**
 * Oś dystansu do rekordu — skala 0,6 s, dwa znaczniki, różnica nad odcinkiem.
 * Świadomie nie słupki: 0,32 s na 132 s nie da się uczciwie pokazać długością.
 */
function GapRuler({
  heading,
  record,
  barbara,
  difference,
}: {
  heading: string
  record: { time: string; seconds: number; holder: string; context: string }
  barbara: { time: string; seconds: number }
  difference: string
}) {
  const from = 132.0
  const to = 132.6
  const at = (seconds: number) => ((seconds - from) / (to - from)) * 100
  const recordAt = at(record.seconds)
  const barbaraAt = at(barbara.seconds)

  return (
    <figure>
      <figcaption className="eyebrow text-white/70">{heading}</figcaption>
      <div className="mt-6">
        <div className="relative h-7">
          <span
            className="board-e absolute -translate-x-1/2 text-sm text-gold-bright"
            style={{ left: `${(recordAt + barbaraAt) / 2}%` }}
          >
            {difference}
          </span>
        </div>
        <div className="relative h-px bg-white/25">
          <span
            className="absolute -top-px h-0.5 bg-gold-bright"
            style={{ left: `${recordAt}%`, width: `${barbaraAt - recordAt}%` }}
            aria-hidden="true"
          />
          <span
            className="absolute -top-[3px] size-1.5 -translate-x-1/2 rounded-full bg-gold-bright ring-4 ring-gold-bright/20"
            style={{ left: `${recordAt}%` }}
            aria-hidden="true"
          />
          <span
            className="absolute -top-[3px] size-1.5 -translate-x-1/2 rounded-full bg-white ring-4 ring-white/20"
            style={{ left: `${barbaraAt}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 flex items-start justify-between gap-4 text-xs">
          <div>
            <p className="board-e text-sm text-gold-bright">{record.time}</p>
            <p className="mt-0.5 leading-snug text-white/65">
              seniorski rekord Polski · {record.holder}, {record.context}
            </p>
          </div>
          <div className="text-right">
            <p className="board-e text-sm text-white">{barbara.time}</p>
            <p className="mt-0.5 leading-snug text-white/65">Barbara · 2026</p>
          </div>
        </div>
      </div>
    </figure>
  )
}
