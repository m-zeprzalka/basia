import * as React from "react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Grid } from "@/components/page-e/frame-e"

/**
 * Rozdział wariantu G: papier (domyślnie) albo tusz. Bez własnych
 * odstępów — każdy rozdział sam decyduje o rytmie, ale trzyma tę samą ramę.
 */
export function SectionG({
  id,
  index,
  tone = "paper",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  id: string
  index: number
  tone?: "paper" | "ink"
}) {
  return (
    <section
      id={id}
      data-chapter={index}
      className={cn(
        "relative scroll-mt-(--header-height)",
        tone === "ink" && "ink-g",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/**
 * Nagłówek rozdziału G — asymetryczny: numer (czerwony) i etykieta w pierwszym wierszu,
 * tytuł szerokim krojem po lewej (8 kolumn), lead osadzony po prawej u dołu.
 */
export function ChapterHeadG({
  index,
  label,
  title,
  lead,
  className,
  titleClassName,
}: {
  index: string
  label: string
  title: React.ReactNode
  lead?: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <Reveal>
      <Grid className={cn("items-end gap-y-8", className)}>
        <p className="tag-f col-span-4 flex items-center gap-4 sm:col-span-8 lg:col-span-12">
          <span className="text-red-g">{index}</span>
          <span
            className="h-px w-10 bg-current opacity-30"
            aria-hidden="true"
          />
          <span className="text-muted-foreground">{label}</span>
        </p>
        <h2
          className={cn(
            "wide-f @container col-span-4 text-[clamp(2.5rem,7.2vw,6.25rem)] sm:col-span-8 lg:col-span-8",
            titleClassName
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p className="col-span-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:col-span-6 sm:text-lg lg:col-span-4 lg:col-start-9 lg:pb-2">
            {lead}
          </p>
        ) : null}
      </Grid>
    </Reveal>
  )
}
