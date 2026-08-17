import { ArrowRightIcon, CheckIcon, FlagIcon } from "lucide-react"

import { partners } from "@/data/page-e/copy"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Frame, Grid } from "@/components/page-e/frame-e"
import { ChapterHeadG, SectionG } from "@/components/page-g/section-g"

/**
 * 06 — Partnerstwo na tuszu. Jedyna ciemna plansza jasnej prezentacji —
 * kontrapunkt między dwiema jasnymi. Cztery argumenty ogromnymi numerami,
 * formaty, horyzont-tor i czerwony przycisk.
 */
export function PartnersG() {
  return (
    <SectionG id="partnerstwo" index={6} tone="ink">
      <Frame className="py-24 sm:py-32 lg:py-40">
        <ChapterHeadG
          index="06"
          label={partners.label}
          title="Ten moment jest teraz."
          lead={partners.lead}
        />

        {/* Argumenty — 2 × 2, numer jako obraz. */}
        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/12 sm:mt-20 sm:grid-cols-2 lg:mt-24">
          {partners.arguments.map((argument, index) => (
            <Reveal
              as="li"
              key={argument.title}
              delay={index * 0.05}
              className="bg-ink-g p-6 sm:p-8 lg:p-10"
            >
              <p className="condensed-f text-[clamp(4rem,9vw,8rem)] text-paper-g/15">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="wide-f mt-2 text-2xl sm:text-3xl">
                {argument.title}
              </h3>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                {argument.body}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* Formaty. */}
        <Grid className="mt-16 gap-y-8 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-3">
            <p className="tag-f text-muted-foreground">
              {partners.formatsHeading}
            </p>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
              {partners.formatsNote}
            </p>
          </Reveal>
          <div className="col-span-4 grid gap-4 sm:col-span-8 sm:grid-cols-3 lg:col-span-9">
            {partners.formats.map((format, index) => (
              <Reveal
                key={format.name}
                delay={index * 0.06}
                className="flex flex-col gap-3 border-t-2 border-foreground pt-5"
              >
                <span className="tag-f text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="wide-f text-xl">{format.name}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {format.body}
                </span>
              </Reveal>
            ))}
          </div>
        </Grid>

        {/* Horyzont — tor. */}
        <Grid className="mt-16 gap-y-8 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-3">
            <p className="tag-f text-muted-foreground">
              {partners.horizonHeading}
            </p>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
              Za nami dwa sezony potwierdzeń. Przed nami cykl, który kończy się
              w Los Angeles.
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="col-span-4 sm:col-span-8 lg:col-span-9"
          >
            <ol className="relative grid gap-6 sm:grid-cols-4">
              <span
                className="absolute top-[7px] right-0 left-0 hidden h-px bg-[repeating-linear-gradient(to_right,rgba(251,251,249,0.35)_0_8px,transparent_8px_16px)] sm:block"
                aria-hidden="true"
              />
              {partners.horizon.map((entry) => (
                <li key={entry.year} className="relative flex gap-4 sm:block">
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ring-4 ring-ink-g sm:mt-0",
                      entry.state === "done" && "bg-foreground",
                      entry.state === "next" && "bg-azure",
                      entry.state === "goal" && "bg-gold"
                    )}
                    aria-hidden="true"
                  >
                    {entry.state === "done" ? (
                      <CheckIcon
                        className="size-2.5 text-ink-g"
                        strokeWidth={3}
                      />
                    ) : null}
                    {entry.state === "goal" ? (
                      <FlagIcon
                        className="size-2 text-foreground"
                        strokeWidth={3}
                      />
                    ) : null}
                  </span>
                  <div className="sm:mt-5">
                    <p className="condensed-f text-4xl sm:text-5xl">
                      {entry.year}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug font-medium">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {entry.state === "done"
                        ? "za nami"
                        : entry.state === "next"
                          ? "najbliższy cykl — walka o minima i medale"
                          : "cel cyklu"}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Grid>

        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <ButtonLink
            size="2xl"
            href="#kontakt"
            className="rounded-full bg-red-g text-paper-g hover:bg-red-g-deep max-sm:w-full"
          >
            {partners.cta}
            <ArrowRightIcon data-icon="inline-end" />
          </ButtonLink>
        </Reveal>
      </Frame>
    </SectionG>
  )
}
