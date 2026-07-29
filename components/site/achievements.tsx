import { cn } from "@/lib/utils"
import { milestones } from "@/data/achievements"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import {
  Container,
  MedalDot,
  SectionHeading,
} from "@/components/site/primitives"

export function Achievements() {
  return (
    <section id="osiagniecia" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Osiągnięcia"
            title="Dwa sezony, które zbudowały pozycję"
            lead="Medale mistrzowskie i rekordy Polski z lat 2025–2026 — w kolejności od najnowszych."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {(["gold", "silver", "bronze"] as const).map((medal) => (
              <li key={medal} className="flex items-center gap-2.5">
                <MedalDot medal={medal} className="ring-2" />
                <span className="text-sm text-muted-foreground">
                  {medal === "gold"
                    ? "Złoty medal"
                    : medal === "silver"
                      ? "Srebrny medal"
                      : "Brązowy medal"}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ol className="mt-12 border-t border-border">
          {milestones.map((milestone, index) => (
            <Reveal
              as="li"
              key={milestone.id}
              delay={Math.min(index, 3) * 0.05}
              className={cn(
                "group grid gap-x-10 gap-y-6 border-b border-border py-10 transition-colors lg:grid-cols-[13rem_1fr] lg:py-12",
                milestone.featured &&
                  "bg-[linear-gradient(to_left,var(--mist),transparent_60%)]"
              )}
            >
              <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                <p className="font-heading text-sm font-semibold tracking-tight text-navy lg:text-base">
                  {milestone.period}
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "border-border bg-background text-[0.6875rem] tracking-wide",
                    milestone.featured && "border-gold/50 text-gold-ink"
                  )}
                >
                  {milestone.tag}
                </Badge>
              </div>

              <div className="min-w-0">
                <h3 className="font-heading text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {milestone.location}
                </p>

                {/* Czas stoi nad nazwą konkurencji także na desktopie — osobna
                    kolumna przy prawej krawędzi rozrywała wiersz. */}
                <ul className="mt-7 flex flex-col">
                  {milestone.results.map((result) => (
                    <li
                      key={`${result.event}-${result.time ?? ""}`}
                      className="grid grid-cols-[1.5rem_1fr] gap-x-4 py-3"
                    >
                      <span className="flex h-6 items-center justify-center">
                        {result.place ? (
                          <span className="time text-sm font-medium text-muted-foreground">
                            {result.place}
                          </span>
                        ) : (
                          <MedalDot medal={result.medal} className="ring-2" />
                        )}
                      </span>

                      <div className="min-w-0">
                        {result.time ? (
                          <p className="time font-heading text-xl leading-snug font-semibold tracking-tight text-navy sm:text-2xl">
                            {result.time}
                          </p>
                        ) : null}
                        <p className="mt-0.5 text-[0.9375rem] leading-snug font-medium">
                          {result.event}
                        </p>
                        {result.note ? (
                          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {result.note}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>

                {milestone.summary ? (
                  <p className="mt-6 max-w-2xl border-l-2 border-azure/30 pl-4 text-sm leading-relaxed text-graphite">
                    {milestone.summary}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
