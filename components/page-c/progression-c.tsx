import { raceProgression, seniorRecord } from "@/data/progression"
import { Reveal } from "@/components/motion/reveal"
import { Shell, Tag } from "@/components/page-c/primitives"

const formatDelta = (previous: number, current: number) =>
  `−${(previous - current).toFixed(2).replace(".", ",")} s`

/**
 * Progresja jako spokojna oś kolejnych startów: pozioma na desktopie,
 * pionowa na telefonie. Odstępy są rytmem sekwencji, nie skalą wartości —
 * dlatego przy każdym starcie stoi data i wielkość poprawy.
 */
export function ProgressionC() {
  const first = raceProgression[0]
  const last = raceProgression[raceProgression.length - 1]
  const total = formatDelta(first.seconds, last.seconds)

  return (
    <section id="progresja" className="bg-paper-c-soft">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <Reveal>
          <Tag index="03">Progresja</Tag>
          <h2 className="serif-c mt-7 max-w-3xl text-[clamp(2.5rem,7.5cqw,5rem)]">
            Od 18. miejsca <em>do złota</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-c-soft sm:text-lg">
            Wszystkie starty na 200 m stylem zmiennym od 2025 roku, od
            najsłabszego do najlepszego wyniku. Wartości przy czasach to poprawa
            względem poprzedniego startu.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="relative mt-16 flex flex-col gap-12 lg:mt-24 lg:flex-row lg:gap-8">
            {/* Nić sekwencji */}
            <span
              className="absolute top-0 bottom-0 left-[5px] w-px bg-ink-c/20 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
              aria-hidden="true"
            />

            {raceProgression.map((race, index) => {
              const previous = raceProgression[index - 1]

              return (
                <li
                  key={race.time}
                  className="relative min-w-0 pl-9 lg:flex-1 lg:pt-9 lg:pl-0"
                >
                  <span
                    className={`absolute top-1 left-0 size-[11px] rounded-full lg:top-0 ${
                      race.highlight ? "bg-accent-c" : "bg-ink-c"
                    }`}
                    aria-hidden="true"
                  />

                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="serif-c time text-3xl sm:text-4xl">
                      {race.time}
                    </span>
                    {previous ? (
                      <span className="time text-sm font-medium text-accent-c">
                        {formatDelta(previous.seconds, race.seconds)}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2.5 text-sm font-medium">
                    {race.event}
                    {race.venue ? `, ${race.venue}` : ""}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-c-soft">
                    {race.date}
                    {race.note ? ` · ${race.note}` : ""}
                  </p>
                </li>
              )
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-t border-line-c pt-8 lg:mt-20">
            <div>
              <p className="label-c text-ink-c-soft">Łączna poprawa</p>
              <p className="serif-c time mt-2 text-4xl sm:text-5xl">{total}</p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-c-soft">
              Blisko pięć sekund w dwanaście miesięcy. Do seniorskiego rekordu
              Polski ({seniorRecord.time} — {seniorRecord.holder},{" "}
              {seniorRecord.context}) brakuje już tylko 0,32 s.
            </p>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}
