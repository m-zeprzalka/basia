import { sponsorship } from "@/data/sponsorship"
import { Frame, Marker } from "@/components/page-b/primitives"

export function PartnersB() {
  return (
    <section
      id="wspolpraca-b"
      className="on-ink scroll-mt-16 bg-ink-b text-paper-b"
    >
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <Marker index="07" className="text-paper-b/60">
          Współpraca
        </Marker>

        <h2 className="display-b mt-7 max-w-5xl text-[clamp(2.75rem,9cqw,6.5rem)]">
          <span className="block">Zainwestuj w</span>
          <span className="outline-b block">przyszłość polskiego</span>
          <span className="block">pływania</span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <p className="max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
            {sponsorship.lead}
          </p>

          {/* Korzyści numerowane — spis treści oferty, nie kafelki. */}
          <ol className="border-t border-paper-b/20">
            {sponsorship.benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="group grid grid-cols-[3rem_1fr] gap-x-5 border-b border-paper-b/20 py-6 transition-colors hover:bg-paper-b/6 sm:grid-cols-[4.5rem_1fr]"
              >
                <span className="display-b text-[clamp(1.5rem,4vw,2.25rem)] text-electric-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg tracking-tight sm:text-xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <h3 className="mono-b text-muted-foreground">Horyzont startów</h3>
          <ol className="mt-6 grid border-t border-paper-b/20 sm:grid-cols-3">
            {sponsorship.horizon.map((entry, index) => (
              <li
                key={entry.year}
                className={`border-b border-paper-b/20 py-7 sm:border-b-0 sm:pr-6 ${
                  index > 0 ? "sm:border-l sm:border-paper-b/20 sm:pl-6" : ""
                }`}
              >
                <p className="display-b text-[clamp(2.5rem,7vw,4rem)] text-electric-soft">
                  {entry.year}
                </p>
                <p className="mt-3 text-base font-medium">{entry.label}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href="#kontakt-b"
          className="mono-b mt-14 inline-flex h-16 items-center bg-electric px-9 text-paper-b transition-colors outline-none hover:bg-paper-b hover:text-ink-b focus-visible:bg-paper-b focus-visible:text-ink-b"
        >
          {sponsorship.cta} ↗
        </a>
      </Frame>
    </section>
  )
}
