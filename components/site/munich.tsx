import { cn } from "@/lib/utils"
import { munich } from "@/data/munich"
import { Reveal } from "@/components/motion/reveal"
import { TimeCounter } from "@/components/motion/time-counter"
import { GapChart } from "@/components/site/gap-chart"
import { Container, Eyebrow, MedalDot } from "@/components/site/primitives"

export function Munich() {
  const { gap } = munich

  return (
    <section
      id="monachium"
      className="on-deep grain relative scroll-mt-24 overflow-hidden bg-navy text-foreground"
    >
      <div
        className="water-deep pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="lanes pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="@container min-w-0 lg:col-span-6">
            <Reveal>
              <Eyebrow index="01">
                {munich.date} · {munich.location}
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display mt-5 text-[clamp(1.875rem,10cqw,3.75rem)]">
                Finał, który zmienił wszystko
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {munich.lead}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-bright/15 px-3 py-1 text-xs font-medium text-gold-bright ring-1 ring-gold-bright/30">
                  <MedalDot medal="gold" className="ring-0" />
                  Złoty medal
                </span>

                <p className="time display mt-4 bg-[linear-gradient(120deg,#FFFFFF,#CFE4FA_55%,#E6C158)] bg-clip-text text-[clamp(3rem,26cqw,7.5rem)] text-transparent">
                  <TimeCounter seconds={gap.barbara.seconds} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {munich.headlineEvent}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-6">
            <GapChart
              record={gap.record}
              barbara={gap.barbara}
              difference={gap.difference}
            />
          </Reveal>
        </div>

        {/* Wyniki mistrzostw — układ tablicy wyników. */}
        <Reveal delay={0.08} className="mt-16 sm:mt-20">
          <h3 className="eyebrow text-muted-foreground">
            Mistrzostwa Europy juniorek do lat 18 — starty indywidualne
          </h3>
          {/* Dwie kolumny na każdej szerokości: lokata w rynience, reszta w
              jednym bloku — nic nie może na siebie nachodzić. */}
          <ul className="mt-6 border-t border-border">
            {munich.results.map((result) => (
              <li
                key={result.event}
                className="grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-b border-border py-5 sm:grid-cols-[4rem_1fr] sm:py-6"
              >
                <span
                  className={cn(
                    "display text-2xl sm:text-3xl",
                    result.medal === "gold" && "text-gold-bright",
                    result.medal === "bronze" && "text-bronze",
                    !result.medal && "text-muted-foreground"
                  )}
                >
                  <span aria-hidden="true">{result.rank}</span>
                  <span className="sr-only">{result.place}</span>
                </span>
                <div className="min-w-0">
                  <p className="time display text-2xl sm:text-3xl">
                    {result.time}
                  </p>
                  <p className="mt-1.5 text-base font-medium sm:text-lg">
                    {result.event}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {result.rivals}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-3">
          {munich.facts.map((fact, index) => (
            <Reveal as="li" key={fact.label} delay={index * 0.08}>
              <p className="display text-4xl text-gold-bright">{fact.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {fact.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
