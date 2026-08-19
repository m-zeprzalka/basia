import Image, { type StaticImageData } from "next/image"
import { ArrowRightIcon, CheckIcon, FlagIcon } from "lucide-react"

import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import paryzRazem from "@/assets/images/paryz-sztafeta-razem.webp"
import portret from "@/assets/images/po-wyscigu-czepek.webp"
import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import type { PartnershipDict } from "@/data/main/types"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"

/** Małe kadry przy argumentach — obraz towarzyszy każdemu punktowi (desktop).
    Zdjęcie reprezentacji kadrowane od góry — niżej ucinało głowę. */
const argumentMedia: { src: StaticImageData; position: string }[] = [
  { src: monachiumZloto, position: "50% 30%" },
  { src: paryzRazem, position: "45% 50%" },
  { src: portret, position: "40% 30%" },
  { src: reprezentacja, position: "50% 0%" },
]

/**
 * 06 — Partnerstwo. Cztery argumenty jako edytorska lista z numerami w lewym
 * pasie siatki (i małym kadrem po prawej), formaty współpracy i horyzont —
 * tor od 2025 do Los Angeles.
 */
export function Partners({
  id,
  t,
  contactHref,
}: {
  id: string
  t: PartnershipDict
  contactHref: string
}) {
  return (
    <Chapter id={id} index={6} tone="light">
      <Frame className={chapterPadding}>
        <Reveal>
          <ChapterHead
            index={6}
            label={t.label}
            title={t.title}
            lead={t.lead}
            aside={
              <ButtonLink size="2xl" href={contactHref} className="max-sm:w-full">
                {t.cta}
                <ArrowRightIcon data-icon="inline-end" />
              </ButtonLink>
            }
          />
        </Reveal>

        {/* Argumenty — numer w lewym pasie, treść w prawym. */}
        <ol className="mt-14 border-t border-border sm:mt-20 lg:mt-24">
          {t.args.map((argument, index) => (
            <Reveal as="li" key={argument.title} delay={index * 0.05}>
              <Grid className="gap-y-3 border-b border-border py-8 sm:py-10 lg:py-12">
                <p className="board-e col-span-4 text-3xl font-medium text-gold-ink sm:col-span-8 lg:col-span-3 lg:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="col-span-4 sm:col-span-8 lg:col-span-6">
                  <h3 className="font-heading text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                    {argument.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                    {argument.body}
                  </p>
                </div>
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl bg-mist ring-1 ring-foreground/10 lg:col-span-2 lg:col-start-11 lg:block">
                  <Image
                    src={argumentMedia[index].src}
                    alt={argument.alt}
                    fill
                    sizes="14vw"
                    placeholder="blur"
                    style={{ objectPosition: argumentMedia[index].position }}
                    className="object-cover"
                  />
                </div>
              </Grid>
            </Reveal>
          ))}
        </ol>

        {/* Formaty. */}
        <Grid className="mt-14 gap-y-8 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-3">
            <h3 className="eyebrow text-muted-foreground">
              {t.formatsHeading}
            </h3>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
              {t.formatsNote}
            </p>
          </Reveal>
          <div className="col-span-4 grid gap-4 sm:col-span-8 sm:grid-cols-3 lg:col-span-9">
            {t.formats.map((format, index) => (
              <Reveal
                key={format.name}
                delay={index * 0.06}
                className="flex flex-col gap-2 rounded-2xl border border-border p-5 sm:p-6"
              >
                <span
                  className="board-e text-xs text-gold-ink"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-lg font-semibold tracking-tight">
                  {format.name}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {format.body}
                </span>
              </Reveal>
            ))}
          </div>
        </Grid>

        {/* Horyzont — tor. */}
        <Grid className="mt-14 gap-y-8 sm:mt-20 lg:mt-24">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-3">
            <h3 className="eyebrow text-muted-foreground">
              {t.horizonHeading}
            </h3>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
              {t.horizonNote}
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="col-span-4 sm:col-span-8 lg:col-span-9"
          >
            <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-6">
              {/* Lina toru — tylko na desktopie, pod znacznikami. */}
              <span
                className="lane-rope absolute top-[7px] right-0 left-0 hidden text-navy sm:block"
                aria-hidden="true"
              />
              {t.horizon.map((entry) => (
                <li key={entry.year} className="relative flex gap-4 sm:block">
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ring-4 ring-background sm:mt-0",
                      entry.state === "done" && "bg-navy",
                      entry.state === "next" && "bg-azure",
                      entry.state === "goal" && "bg-gold"
                    )}
                    aria-hidden="true"
                  >
                    {entry.state === "done" ? (
                      <CheckIcon
                        className="size-2.5 text-white"
                        strokeWidth={3}
                      />
                    ) : entry.state === "goal" ? (
                      <FlagIcon className="size-2 text-navy" strokeWidth={3} />
                    ) : null}
                  </span>
                  <div className="sm:mt-5">
                    <p className="board-e text-2xl font-medium text-navy sm:text-3xl">
                      {entry.year}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug font-medium">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.stateLabels[entry.state]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Grid>
      </Frame>
    </Chapter>
  )
}
