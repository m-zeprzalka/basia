import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"

import portret from "@/assets/images/portret-basen.webp"
import { site } from "@/data/site"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Container, PolishFlag } from "@/components/site/primitives"

export function Hero() {
  return (
    <section
      id="start"
      className="grain relative overflow-hidden pt-(--header-height)"
    >
      <div
        className="water pointer-events-none absolute inset-0 -z-20 opacity-70"
        aria-hidden="true"
      />
      <div
        className="lanes pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <Container className="relative pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
        {/* Kolumny opisane ułamkami, nie sztywnymi span-ami — układ skaluje się
            płynnie i zdjęcie nigdy nie wchodzi na tekst. */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-20">
          <div className="@container min-w-0">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-slate">
                <PolishFlag />
                {site.roleLong}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display mt-6 text-[clamp(2.5rem,15cqw,6.25rem)]">
                Barbara <br />
                Leśniewska
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-graphite sm:text-xl">
                Mistrzyni Europy juniorek na 200 m stylem zmiennym. Wielokrotna
                rekordzistka Polski. Jedna z najzdolniejszych zawodniczek
                młodego pokolenia polskiego pływania.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink size="2xl" href="#wspolpraca">
                  Nawiąż współpracę
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
                <ButtonLink size="2xl" variant="outline" href="#monachium">
                  Zobacz profil
                  <ArrowDownIcon data-icon="inline-end" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} distance={28}>
            <div className="relative w-full">
              {/* Poświata pod zdjęciem — sugestia odbicia światła w wodzie. */}
              <div
                className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklab,var(--azure)_22%,transparent),transparent_70%)] blur-[64px]"
                aria-hidden="true"
              />

              <figure className="relative overflow-hidden rounded-[1.75rem] bg-mist-deep ring-1 ring-foreground/10 sm:rounded-[2.25rem]">
                <Image
                  src={portret}
                  alt="Barbara Leśniewska w stroju startowym i czepku na hali basenowej"
                  priority
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 70vw, 92vw"
                  placeholder="blur"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy)_78%,transparent),transparent)]"
                  aria-hidden="true"
                />

                <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/12 p-3.5 ring-1 ring-white/25 backdrop-blur-md sm:p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,#F3DE9B,#D6A93F_45%,#A97C24)] text-navy shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-5"
                          fill="currentColor"
                        >
                          <path d="M12 2.5 14.6 8l6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19l1-6L3.4 8.9 9.4 8 12 2.5Z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.8125rem] leading-tight font-semibold text-white sm:text-sm">
                          Mistrzyni Europy juniorek
                        </p>
                        <p className="mt-0.5 truncate text-xs text-white/75">
                          200 m st. zmiennym · Monachium 2026
                        </p>
                      </div>
                    </div>
                    <p className="time display shrink-0 text-2xl text-white sm:text-[1.75rem]">
                      2:12,45
                    </p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
