import { milestones } from "@/data/achievements"
import { Reveal } from "@/components/motion/reveal"
import { MedalPoint, Shell, Tag } from "@/components/page-c/primitives"

export function SeasonsC() {
  return (
    <section id="sezony">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <Reveal>
          <Tag index="04">Sezony 2025–2026</Tag>
          <h2 className="serif-c mt-7 max-w-3xl text-[clamp(2.5rem,7.5cqw,5rem)]">
            Dwa sezony, które zbudowały <em>pozycję</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-c-soft sm:text-lg">
            Medale mistrzowskie i rekordy Polski — w kolejności od najnowszych.
          </p>
        </Reveal>

        <ol className="mt-16 border-t border-line-c lg:mt-20">
          {milestones.map((milestone, index) => (
            <Reveal
              as="li"
              key={milestone.id}
              delay={Math.min(index, 3) * 0.04}
              className="grid gap-x-14 gap-y-5 border-b border-line-c py-12 lg:grid-cols-[12rem_1fr] lg:py-14"
            >
              <div className="flex flex-row items-baseline gap-4 lg:flex-col lg:gap-2.5">
                <p className="text-sm font-medium">{milestone.period}</p>
                <p
                  className={`label-c ${
                    milestone.featured ? "text-accent-c" : "text-ink-c-soft"
                  }`}
                >
                  {milestone.tag}
                </p>
              </div>

              <div className="min-w-0">
                <h3 className="serif-c text-[clamp(1.5rem,3.5cqw,2.25rem)]">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-c-soft">
                  {milestone.location}
                </p>

                <ul className="mt-7 flex max-w-2xl flex-col">
                  {milestone.results.map((result) => (
                    <li
                      key={`${result.event}-${result.time ?? ""}`}
                      className="grid grid-cols-[1.25rem_1fr] gap-x-4 py-3"
                    >
                      <span className="flex h-6 items-center">
                        {result.place ? (
                          <span className="time text-xs font-medium text-ink-c-soft">
                            {result.place}
                          </span>
                        ) : (
                          <MedalPoint medal={result.medal} />
                        )}
                      </span>
                      <div className="min-w-0">
                        {result.time ? (
                          <p className="serif-c time text-xl sm:text-2xl">
                            {result.time}
                          </p>
                        ) : null}
                        <p className="mt-0.5 text-[0.9375rem] font-medium">
                          {result.event}
                        </p>
                        {result.note ? (
                          <p className="mt-1 text-sm leading-relaxed text-ink-c-soft">
                            {result.note}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>

                {milestone.summary ? (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-c-soft">
                    {milestone.summary}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </section>
  )
}
