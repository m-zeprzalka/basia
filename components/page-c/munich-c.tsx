import { munich } from "@/data/munich"
import { Reveal } from "@/components/motion/reveal"
import { TimeCounter } from "@/components/motion/time-counter"
import { Shell, Tag } from "@/components/page-c/primitives"

/* Zakres osi porównania — świadomie zawężony i opisany wprost pod diagramem. */
const SCALE_FROM = 132.0
const SCALE_TO = 132.6
const at = (seconds: number) =>
  ((seconds - SCALE_FROM) / (SCALE_TO - SCALE_FROM)) * 100

export function MunichC() {
  const { gap } = munich
  const recordAt = at(gap.record.seconds)
  const barbaraAt = at(gap.barbara.seconds)

  return (
    <section id="przelom" className="bg-paper-c-soft">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <Reveal>
          <Tag index="01">
            Przełom — {munich.location}, {munich.date.toLowerCase()}
          </Tag>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="serif-c mt-7 max-w-3xl text-[clamp(2.5rem,7.5cqw,5rem)]">
            Finał, który zmienił <em>wszystko</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-c-soft sm:text-lg">
            {munich.lead}
          </p>
        </Reveal>

        {/* Wynik jako centralny obiekt sekcji. */}
        <Reveal delay={0.08}>
          <div className="mt-20 flex flex-col items-center text-center sm:mt-24">
            <p className="label-c flex items-center gap-3 text-ink-c-soft">
              <span
                className="size-2 rounded-full bg-gold"
                aria-hidden="true"
              />
              Złoty medal · {munich.headlineEvent}
            </p>
            <p className="serif-c time mt-6 text-[clamp(4rem,17cqw,11rem)] leading-none">
              <TimeCounter seconds={gap.barbara.seconds} />
            </p>
          </div>
        </Reveal>

        {/* 0,32 s — jedna cienka oś, dwa znaczniki, zero dekoracji. */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-20 max-w-3xl sm:mt-24">
            <figcaption className="label-c text-center text-ink-c-soft">
              Dystans do rekordu Polski seniorek —{" "}
              <span className="text-accent-c">{gap.difference}</span>
            </figcaption>

            <div className="mt-8 sm:mt-14">
              <div className="relative h-px bg-ink-c/20">
                {/* Odcinek różnicy */}
                <span
                  className="absolute -top-px h-[3px] bg-accent-c"
                  style={{
                    left: `${recordAt}%`,
                    width: `${barbaraAt - recordAt}%`,
                  }}
                  aria-hidden="true"
                />

                {/* Rekord seniorek — etykieta nad osią */}
                <span
                  className="absolute -top-[5px] size-[11px] -translate-x-1/2 rounded-full bg-gold"
                  style={{ left: `${recordAt}%` }}
                  aria-hidden="true"
                />
                {/* Pływające etykiety tylko od sm w górę — na telefonie
                    zastępuje je legenda pod osią, żeby nic nie wystawało. */}
                <span
                  className="absolute bottom-4 hidden -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap sm:flex"
                  style={{ left: `${recordAt}%` }}
                >
                  <span className="serif-c time text-xl">
                    {gap.record.time}
                  </span>
                  <span className="text-xs text-ink-c-soft">
                    {gap.record.label}
                  </span>
                </span>

                {/* Barbara — etykieta pod osią */}
                <span
                  className="absolute -top-[5px] size-[11px] -translate-x-1/2 rounded-full bg-ink-c"
                  style={{ left: `${barbaraAt}%` }}
                  aria-hidden="true"
                />
                <span
                  className="absolute top-4 hidden -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap sm:flex"
                  style={{ left: `${barbaraAt}%` }}
                >
                  <span className="serif-c time text-xl">
                    {gap.barbara.time}
                  </span>
                  <span className="text-xs text-ink-c-soft">
                    {gap.barbara.label}
                  </span>
                </span>
              </div>

              {/* Legenda mobilna. */}
              <dl className="mt-6 sm:hidden">
                <div className="flex items-baseline justify-between gap-4 border-b border-line-c py-2.5">
                  <dt className="flex items-center gap-2.5 text-sm text-ink-c-soft">
                    <span
                      className="size-2 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    {gap.record.label}
                  </dt>
                  <dd className="serif-c time text-lg">{gap.record.time}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="flex items-center gap-2.5 text-sm text-ink-c-soft">
                    <span
                      className="size-2 rounded-full bg-ink-c"
                      aria-hidden="true"
                    />
                    {gap.barbara.label}
                  </dt>
                  <dd className="serif-c time text-lg">{gap.barbara.time}</dd>
                </div>
              </dl>

              {/* Odsunięcie na etykiety pod osią. */}
              <div className="hidden h-16 sm:block" aria-hidden="true" />

              <p className="flex items-center justify-between gap-3 text-[0.6875rem] text-ink-c-soft/80">
                <span className="time">2:12,00</span>
                <span className="hidden sm:inline">
                  skala 0,6 s · 200 m st. zmiennym
                </span>
                <span className="time">2:12,60</span>
              </p>
            </div>

            <p className="mt-8 border-t border-line-c pt-6 text-center text-sm leading-relaxed text-ink-c-soft">
              Rekord Polski seniorek — {gap.record.time}, {gap.record.holder} ·{" "}
              {gap.record.context} — powstał jeszcze w erze kostiumów
              poliuretanowych i przetrwał do dziś.
            </p>
          </figure>
        </Reveal>

        {/* Starty indywidualne — rejestr. */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-24 max-w-3xl">
            <h3 className="label-c text-ink-c-soft">
              Mistrzostwa Europy juniorek do lat 18 — starty indywidualne
            </h3>
            <ul className="mt-6 border-t border-line-c">
              {munich.results.map((result) => (
                <li
                  key={result.event}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-6 border-b border-line-c py-6"
                >
                  <span className="serif-c text-2xl text-ink-c-soft">
                    <span aria-hidden="true">{result.rank}</span>
                    <span className="sr-only">{result.place}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="serif-c time text-3xl">{result.time}</p>
                    <p className="mt-1.5 font-medium">{result.event}</p>
                    <p className="mt-1 text-sm text-ink-c-soft">
                      {result.rivals}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {munich.facts.map((fact) => (
                <li key={fact.label}>
                  <p className="serif-c text-3xl">{fact.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-c-soft">
                    {fact.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}
