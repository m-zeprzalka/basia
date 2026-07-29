import {
  ArrowRightIcon,
  Globe2Icon,
  MegaphoneIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react"

import { sponsorship } from "@/data/sponsorship"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Container, Eyebrow } from "@/components/site/primitives"

const icons: Record<(typeof sponsorship.benefits)[number]["icon"], LucideIcon> =
  {
    trending: TrendingUpIcon,
    globe: Globe2Icon,
    shield: ShieldCheckIcon,
    megaphone: MegaphoneIcon,
  }

export function Sponsorship() {
  return (
    <section
      id="wspolpraca"
      className="on-deep grain relative scroll-mt-24 overflow-hidden bg-navy-deep text-foreground"
    >
      <div
        className="water-deep pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="@container min-w-0 lg:col-span-5">
            <Reveal>
              <Eyebrow index="07">Współpraca</Eyebrow>
              <h2 className="display mt-5 text-[clamp(1.875rem,9cqw,3.5rem)]">
                {sponsorship.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {sponsorship.lead}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ButtonLink
                size="2xl"
                variant="gold"
                className="mt-9 max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
                href="#kontakt"
              >
                {sponsorship.cta}
                <ArrowRightIcon data-icon="inline-end" />
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow text-muted-foreground">
                {sponsorship.benefitsHeading}
              </h3>
            </Reveal>
            <ul className="mt-6 grid overflow-hidden rounded-2xl ring-1 ring-white/12 sm:grid-cols-2">
              {sponsorship.benefits.map((benefit, index) => {
                const Icon = icons[benefit.icon]
                return (
                  <Reveal
                    as="li"
                    key={benefit.title}
                    delay={index * 0.07}
                    className="flex flex-col gap-4 border-b border-white/12 p-6 last:border-b-0 sm:p-7 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-gold-bright/12 text-gold-bright ring-1 ring-gold-bright/25">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-heading text-lg leading-snug tracking-tight">
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

        {/* Horyzont startów — argument „dlaczego teraz". */}
        <Reveal delay={0.06} className="mt-16 sm:mt-20">
          <h3 className="eyebrow text-muted-foreground">Horyzont startów</h3>
          <ol className="mt-6 grid overflow-hidden rounded-2xl ring-1 ring-white/12 sm:grid-cols-3">
            {sponsorship.horizon.map((entry) => (
              <li
                key={entry.year}
                className="flex flex-col gap-2 border-b border-white/12 p-6 last:border-b-0 sm:border-b-0 sm:p-7 sm:[&:not(:last-child)]:border-r"
              >
                <span className="display text-3xl text-gold-bright">
                  {entry.year}
                </span>
                <span className="text-base font-medium">{entry.label}</span>
                <span className="text-sm text-muted-foreground">
                  {entry.detail}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}
