import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"

import przedStartem from "@/assets/images/paryz-przed-startem.webp"
import { hero } from "@/data/page-d/pitch"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { TimeCounter } from "@/components/motion/time-counter"
import { Container, PolishFlag } from "@/components/site/primitives"
import { Medal } from "@/components/page-d/primitives-d"

/**
 * Hero na pełnym ekranie: zdjęcie z mistrzostw Europy seniorów w Paryżu —
 * chwila skupienia przed startem. Na desktopie fotografia zajmuje prawą część
 * ekranu, a tekst stoi na granacie po lewej — nic nie nachodzi na sylwetkę.
 * Na mobile zdjęcie wypełnia górę ekranu, tekst leży na gradiencie u dołu.
 * Trzy kluczowe liczby zamykają ekran: sponsor już nad zgięciem dostaje skrót.
 */
export function HeroD() {
  return (
    <section
      id="start"
      className="on-deep relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-deep text-foreground"
    >
      {/* Fotografia: pełna szerokość na mobile, prawe 58% na desktopie. */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src={przedStartem}
          alt=""
          priority
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          placeholder="blur"
          className="object-cover object-[32%_22%] sm:object-[40%_25%] lg:object-[38%_30%]"
        />
        {/* Zszycie zdjęcia z granatową kolumną tekstu (desktop). */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-[linear-gradient(to_right,var(--navy-deep),transparent)] lg:block"
          aria-hidden="true"
        />
        {/* Dół zdjęcia pod pasek liczb i tekst (mobile). */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--navy-deep)_0%,color-mix(in_oklab,var(--navy-deep)_88%,transparent)_26%,color-mix(in_oklab,var(--navy-deep)_30%,transparent)_56%,transparent_82%)] lg:bg-[linear-gradient(to_top,var(--navy-deep)_0%,color-mix(in_oklab,var(--navy-deep)_70%,transparent)_18%,transparent_45%)]"
          aria-hidden="true"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--navy-deep)_55%,transparent),transparent)]"
        aria-hidden="true"
      />

      <Container className="relative flex flex-1 flex-col justify-end pt-(--header-height) pb-8 sm:pb-12 lg:pb-14">
        <div className="mt-[40svh] grid gap-10 lg:mt-[22svh] lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="@container min-w-0 lg:col-span-7 xl:col-span-6">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-white/75">
                <PolishFlag />
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display mt-5 text-[clamp(2.75rem,14cqw,7rem)] text-white">
                {hero.headline[0]} <br />
                {hero.headline[1]}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
                {hero.lead}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  size="2xl"
                  variant="gold"
                  href={hero.primaryCta.href}
                >
                  {hero.primaryCta.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
                <ButtonLink
                  size="2xl"
                  variant="outline"
                  href={hero.secondaryCta.href}
                  className="border-white/35 bg-white/8 text-white backdrop-blur-sm hover:bg-white/16 hover:text-white"
                >
                  {hero.secondaryCta.label}
                  <ArrowDownIcon data-icon="inline-end" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trzy liczby — pasek zamykający hero. Pierwsza z prawdziwym medalem. */}
        <Reveal delay={0.32}>
          <dl className="mt-10 grid grid-cols-[1.15fr_1fr_0.85fr] gap-3 border-t border-white/15 pt-6 sm:mt-14 sm:grid-cols-3 sm:gap-8 lg:mt-16">
            {hero.keyFacts.map((fact, index) => (
              <div key={fact.label} className="flex min-w-0 flex-col">
                <dt className="order-2 mt-1.5 text-[0.75rem] leading-snug font-semibold text-white sm:text-sm">
                  {fact.label}
                </dt>
                <dd className="order-1 flex items-center gap-2 sm:gap-3">
                  {index === 0 ? (
                    <Medal
                      medal="gold"
                      className="hidden size-9 shrink-0 sm:block"
                      decorative
                    />
                  ) : null}
                  <span className="time display text-[clamp(1.25rem,5.6vw,2.75rem)] text-white">
                    {"isTime" in fact && fact.isTime ? (
                      <TimeCounter seconds={fact.seconds} />
                    ) : (
                      fact.value
                    )}
                  </span>
                </dd>
                <dd className="order-3 mt-0.5 hidden text-xs leading-snug text-white/65 sm:block">
                  {fact.note}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
