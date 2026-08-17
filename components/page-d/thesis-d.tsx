import Image from "next/image"
import { ChevronDownIcon } from "lucide-react"

import portret from "@/assets/images/portret-basen.webp"
import { bioParagraphs } from "@/data/bio"
import { profile, thesis } from "@/data/page-d/pitch"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container, Emphasized } from "@/components/site/primitives"
import { SectionHeadD } from "@/components/page-d/primitives-d"

/**
 * 01 — teza inwestycyjna. Cztery liczby, które sponsor ma zapamiętać,
 * i krótki profil z pełną sylwetką zwiniętą pod spodem (na mobile nie
 * rozciąga strony, na desktopie jest o jedno kliknięcie).
 */
export function ThesisD() {
  return (
    <section id="dlaczego-teraz" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeadD
            index={1}
            eyebrow={thesis.eyebrow}
            title={thesis.title}
            lead={thesis.lead}
            className="max-w-4xl"
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {thesis.tiles.map((tile, index) => {
            const accent = "accent" in tile && tile.accent === "gold"
            return (
              <Reveal
                as="li"
                key={tile.label}
                delay={index * 0.06}
                className={cn(
                  "@container flex flex-col gap-2 border-l pl-4 sm:pl-5",
                  accent ? "border-gold" : "border-hairline"
                )}
              >
                <p
                  className={cn(
                    "display text-[clamp(1.75rem,17cqw,3rem)]",
                    accent ? "text-navy" : "text-foreground"
                  )}
                >
                  {"countTo" in tile && tile.countTo !== undefined ? (
                    <CountUp
                      to={tile.countTo}
                      decimals={"decimals" in tile ? tile.decimals : 0}
                      suffix={"suffix" in tile ? tile.suffix : ""}
                      className="tnum"
                    />
                  ) : (
                    <span className="tnum">{tile.value}</span>
                  )}
                </p>
                <p className="text-sm leading-snug font-semibold text-foreground">
                  {tile.label}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
                  {tile.note}
                </p>
              </Reveal>
            )
          })}
        </ul>

        {/* Profil — kim jest Barbara, w skrócie. */}
        <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:mt-20 lg:grid-cols-12 lg:gap-14 lg:pt-14">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-5 lg:block">
              <figure className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-mist ring-1 ring-foreground/10 sm:size-28 lg:aspect-[4/5] lg:size-auto lg:w-full lg:max-w-xs lg:rounded-[1.75rem]">
                <Image
                  src={portret}
                  alt="Barbara Leśniewska w stroju startowym i czepku na hali basenowej"
                  sizes="(min-width: 1024px) 24vw, 7rem"
                  placeholder="blur"
                  fill
                  className="object-cover object-[50%_18%]"
                />
              </figure>
              <div className="min-w-0 lg:mt-6">
                <p className="eyebrow text-slate">{profile.eyebrow}</p>
                <p className="mt-2 font-heading text-xl leading-tight font-semibold tracking-tight">
                  {site.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {site.roleLong}
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 lg:mt-10 lg:max-w-xs">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1.5">
                  <dt className="eyebrow text-slate">{fact.label}</dt>
                  <dd className="text-sm leading-snug font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-8">
            <div className="flex flex-col gap-5">
              {profile.short.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[68ch] text-base leading-[1.75] text-graphite sm:text-[1.0625rem]"
                >
                  <Emphasized text={paragraph} />
                </p>
              ))}
            </div>

            {/* Pełna sylwetka — natywne <details>: działa bez JS, nie wydłuża
                strony, dopóki ktoś jej nie potrzebuje. */}
            <details className="group mt-8 rounded-2xl border border-border bg-mist/60 open:bg-mist">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-base font-semibold tracking-tight outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                {profile.moreLabel}
                <ChevronDownIcon
                  className="size-5 shrink-0 text-slate transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="flex flex-col gap-5 border-t border-border px-5 pt-5 pb-6">
                {bioParagraphs.slice(1).map((paragraph, index) => (
                  <p
                    key={index}
                    className="max-w-[68ch] text-[0.9375rem] leading-[1.75] text-graphite"
                  >
                    <Emphasized text={paragraph} />
                  </p>
                ))}
              </div>
            </details>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
