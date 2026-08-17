import Image from "next/image"

import sztafetaRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import { paris } from "@/data/page-d/paris"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"
import { PlaceMark, SectionHeadD } from "@/components/page-d/primitives-d"

/**
 * 04 — Paryż 2026, mistrzostwa Europy seniorów. Dowód, że poziom seniorski
 * to nie obietnica, tylko fakt: dwa finały w wieku 16 lat. Lokaty bez medalu
 * dostają pierścień z numerem (PlaceMark) — nigdy formę medalu.
 *
 * Układ: na mobile nagłówek → zdjęcie → wyniki → wnioski; na desktopie
 * zdjęcie zajmuje lewą kolumnę na wysokość nagłówka i wyników (grid z jawnym
 * rozmieszczeniem), a wnioski lądują pod zdjęciem.
 */
export function ParisD() {
  return (
    <section
      id="paryz-2026"
      className="scroll-mt-24 border-y border-border bg-mist"
    >
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
          <Reveal className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <SectionHeadD
              index={4}
              eyebrow={paris.eyebrow}
              title={paris.title}
              lead={paris.lead}
            />
          </Reveal>

          <Reveal
            delay={0.08}
            className="min-w-0 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
            <figure className="relative h-full overflow-hidden rounded-[1.75rem] bg-mist-deep ring-1 ring-foreground/10">
              <div className="relative aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[30rem]">
                <Image
                  src={sztafetaRazem}
                  alt="Polska sztafeta kobiet w kręgu przed startem na mistrzostwach Europy seniorów w Paryżu"
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  placeholder="blur"
                  className="object-cover object-[45%_50%] lg:object-[35%_50%]"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy)_75%,transparent),transparent)]"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-4 bottom-4 text-xs leading-snug text-white/85 sm:inset-x-5 sm:bottom-5 sm:text-sm">
                Przed startem sztafety — {paris.venue}
              </figcaption>
            </figure>
          </Reveal>

          <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-2">
            {/* Sztafety — dwa finały. */}
            <Reveal>
              <h3 className="eyebrow text-slate">Sztafety</h3>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {paris.relays.map((relay) => (
                  <li
                    key={relay.event}
                    className={cn(
                      "grid grid-cols-[2.75rem_1fr] items-start gap-x-4 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6",
                      relay.highlight &&
                        "bg-[linear-gradient(to_right,var(--mist-deep),transparent_70%)]"
                    )}
                  >
                    <PlaceMark
                      place={relay.place}
                      stage={relay.stage}
                      className={cn(
                        "size-11",
                        relay.highlight
                          ? "text-navy ring-navy/40"
                          : "text-slate"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[0.9375rem] leading-snug font-semibold sm:text-base">
                          {relay.event}
                        </span>
                        <span
                          className={cn(
                            "eyebrow rounded-full px-2 py-0.5 text-[0.625rem]",
                            relay.stage === "finał"
                              ? "bg-navy text-white"
                              : "bg-mist-deep text-slate"
                          )}
                        >
                          {relay.stage}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {relay.lineup}
                      </p>
                      {relay.note ? (
                        <p className="mt-1 text-sm leading-relaxed text-graphite">
                          {relay.note}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-start-2 mt-2 flex items-baseline gap-4 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
                      <p className="time font-heading text-xl leading-none font-semibold tracking-tight text-navy sm:text-2xl">
                        {relay.time}
                      </p>
                      {relay.split ? (
                        <p className="text-xs whitespace-nowrap text-muted-foreground">
                          zmiana Barbary{" "}
                          <span className="time font-semibold text-foreground">
                            {relay.split}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Starty indywidualne — krótko i uczciwie. */}
            <Reveal delay={0.06} className="mt-10">
              <h3 className="eyebrow text-slate">Starty indywidualne</h3>
              <ul className="mt-4 grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {paris.individual.map((start) => (
                  <li
                    key={start.event}
                    className="flex items-baseline justify-between gap-4 py-3.5 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-medium">
                        {start.event}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {start.place}. miejsce · {start.stage}
                      </p>
                    </div>
                    <p className="time font-heading text-lg leading-none font-semibold tracking-tight text-navy">
                      {start.time}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {paris.individualNote}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.12}
            className="min-w-0 lg:col-span-5 lg:col-start-1 lg:row-start-3"
          >
            <ul className="grid grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6">
              {paris.takeaways.map((fact) => (
                <li key={fact.label} className="min-w-0">
                  <p
                    className={cn(
                      "display text-2xl text-navy sm:text-3xl",
                      "isTime" in fact && fact.isTime && "time"
                    )}
                  >
                    {fact.value}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-[0.8125rem]">
                    {fact.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
