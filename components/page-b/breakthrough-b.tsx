import { munich } from "@/data/munich"
import { TimeCounter } from "@/components/motion/time-counter"
import { GapGrid } from "@/components/page-b/gap-grid"
import { Frame, Marker } from "@/components/page-b/primitives"

export function BreakthroughB() {
  const { gap } = munich

  return (
    <section
      id="przelom"
      className="on-ink scroll-mt-16 border-b border-line-b bg-ink-b text-paper-b"
    >
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            <Marker index="01" className="text-paper-b/60">
              {munich.date} · {munich.location}
            </Marker>

            <h2 className="display-b mt-7 text-[clamp(2.5rem,11cqw,6rem)]">
              <span className="block">Finał, który</span>
              <span className="outline-b block">zmienił wszystko</span>
            </h2>

            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
              {munich.lead}
            </p>

            <div className="mt-12 border-t border-paper-b/20 pt-8">
              <p className="mono-b flex items-center gap-3 text-amber-b">
                <span className="size-2.5 bg-amber-b" aria-hidden="true" />
                Złoty medal · {munich.headlineEvent}
              </p>
              <p className="time display-b mt-5 text-[clamp(3.5rem,22cqw,9rem)] text-paper-b">
                <TimeCounter seconds={gap.barbara.seconds} />
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <GapGrid
              recordTime={gap.record.time}
              barbaraTime={gap.barbara.time}
              difference={gap.difference}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Rekord Polski seniorek — {gap.record.time}, {gap.record.holder} ·{" "}
              {gap.record.context} — powstał jeszcze w erze kostiumów
              poliuretanowych i przetrwał do dziś.
            </p>
          </div>
        </div>

        {/* Tablica wyników: numer startu jako element graficzny. */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mono-b text-muted-foreground">
            Mistrzostwa Europy juniorek do lat 18 — starty indywidualne
          </h3>

          <ul className="mt-6 border-t border-paper-b/20">
            {munich.results.map((result) => (
              <li
                key={result.event}
                className="group grid grid-cols-[3rem_1fr] items-start gap-x-5 border-b border-paper-b/20 py-6 transition-colors hover:bg-paper-b/6 sm:grid-cols-[6rem_1fr] sm:gap-x-8"
              >
                <span className="display-b text-[clamp(2rem,5vw,3.25rem)] text-electric-soft">
                  <span aria-hidden="true">{result.rank}</span>
                  <span className="sr-only">{result.place}</span>
                </span>
                <div className="min-w-0">
                  <p className="time display-b text-[clamp(1.75rem,4.5vw,3rem)]">
                    {result.time}
                  </p>
                  <p className="mt-2 text-base font-medium sm:text-lg">
                    {result.event}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                    {result.rivals}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {munich.facts.map((fact) => (
            <li key={fact.label} className="border-t border-paper-b/20 pt-5">
              <p className="display-b text-[clamp(2.25rem,6vw,3.25rem)] text-electric-soft">
                {fact.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {fact.label}
              </p>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  )
}
