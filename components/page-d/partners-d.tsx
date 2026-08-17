import {
  ArrowRightIcon,
  CheckIcon,
  Globe2Icon,
  MegaphoneIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react"

import { offer } from "@/data/page-d/pitch"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"
import { SectionHeadD } from "@/components/page-d/primitives-d"

const icons: Record<(typeof offer.benefits)[number]["icon"], LucideIcon> = {
  trending: TrendingUpIcon,
  globe: Globe2Icon,
  shield: ShieldCheckIcon,
  megaphone: MegaphoneIcon,
}

/**
 * 06 — oferta. Cztery korzyści, trzy formaty partnerstwa i horyzont startów:
 * argument „dlaczego teraz" domknięty konkretem. Sekcja kończy się jednym
 * przyciskiem — do kontaktu.
 */
export function PartnersD() {
  return (
    <section
      id="wspolpraca"
      className="on-deep grain relative scroll-mt-24 overflow-hidden bg-navy-deep text-foreground"
    >
      <div
        className="water-deep pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <SectionHeadD
                index={6}
                eyebrow={offer.eyebrow}
                title={offer.title}
                lead={offer.lead}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ButtonLink
                size="2xl"
                variant="gold"
                className="mt-9 max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
                href="#kontakt"
              >
                {offer.cta}
                <ArrowRightIcon data-icon="inline-end" />
              </ButtonLink>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow text-muted-foreground">
                {offer.benefitsHeading}
              </h3>
            </Reveal>
            {/* Na mobile karty przewijają się poziomo (snap) — cztery korzyści
                zajmują jeden ekran zamiast czterech; od `sm` zwykła siatka. */}
            <ul className="-mx-5 mt-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {offer.benefits.map((benefit, index) => {
                const Icon = icons[benefit.icon]
                return (
                  <Reveal
                    as="li"
                    key={benefit.title}
                    delay={index * 0.06}
                    className="flex w-[82%] shrink-0 snap-start flex-col gap-3 rounded-2xl bg-white/5 p-5 ring-1 ring-white/12 sm:w-auto sm:gap-4 sm:p-7"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-gold-bright/12 text-gold-bright ring-1 ring-gold-bright/25 sm:size-11">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-heading text-base leading-snug tracking-tight sm:text-lg">
                      {benefit.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.body}
                    </p>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Formaty partnerstwa. */}
          <Reveal className="min-w-0 lg:col-span-7">
            <h3 className="eyebrow text-muted-foreground">
              {offer.formatsHeading}
            </h3>
            <ol className="-mx-5 mt-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {offer.formats.map((format, index) => (
                <li
                  key={format.name}
                  className="flex w-[78%] shrink-0 snap-start flex-col gap-2 rounded-2xl bg-white/6 p-5 ring-1 ring-white/12 sm:w-auto"
                >
                  <span className="eyebrow text-gold-bright" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-base font-semibold tracking-tight">
                    {format.name}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {format.body}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {offer.formatsNote}
            </p>
          </Reveal>

          {/* Horyzont — co za nami (✓) i co przed nami. */}
          <Reveal delay={0.08} className="min-w-0 lg:col-span-5">
            <h3 className="eyebrow text-muted-foreground">
              {offer.horizonHeading}
            </h3>
            <ol className="mt-5 flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12">
              {offer.horizon.map((entry) => (
                <li
                  key={entry.year}
                  className={cn(
                    "grid grid-cols-[4.5rem_1fr] items-start gap-x-4 border-b border-white/12 p-5 last:border-b-0",
                    entry.done && "bg-white/4"
                  )}
                >
                  <span className="display flex items-center gap-2 text-2xl text-gold-bright">
                    {entry.year}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-base font-medium">
                      {entry.label}
                      {entry.done ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-aqua/15 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide whitespace-nowrap text-aqua uppercase">
                          <CheckIcon className="size-3" aria-hidden="true" />
                          za nami
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {entry.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
