import * as React from "react"

import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   System siatki wariantu E — jedna rama, jedna siatka, jeden rytm.

   Frame   — rama strony (max 90 rem), stałe marginesy boczne.
   Grid    — 4 / 8 / 12 kolumn z jednym rozmiarem rynny na breakpoint.
             KAŻDY blok treści leży na kolumnach tej siatki (col-span/col-start),
             pełne krwawienie mają wyłącznie warstwy tła (zdjęcia, gradienty).
   Chapter — rozdział prezentacji: identyfikator, ton (jasny / głęboka woda),
             jednakowe odstępy pionowe. Nagłówek rozdziału (ChapterHead) ma
             stały układ: numer i etykieta w lewym pasie (3 kolumny), tytuł
             i lead w prawym (9 kolumn) — ten sam rytm w całej prezentacji.
--------------------------------------------------------------------------- */

export function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 2xl:px-16",
        className
      )}
      {...props}
    />
  )
}

export function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8",
        className
      )}
      {...props}
    />
  )
}

export type ChapterTone = "light" | "mist" | "deep"

const toneClass: Record<ChapterTone, string> = {
  light: "bg-background text-foreground",
  mist: "bg-mist text-foreground",
  deep: "on-deep bg-navy-deep text-foreground",
}

export function Chapter({
  id,
  index,
  tone = "light",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  id: string
  index: number
  tone?: ChapterTone
}) {
  return (
    <section
      id={id}
      data-chapter={index}
      className={cn(
        "relative scroll-mt-(--header-height)",
        toneClass[tone],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/** Jednakowy oddech rozdziału — używany zamiast luźnych `py-*`. */
export const chapterPadding = "py-16 sm:py-28 lg:py-36"

export function ChapterHead({
  index,
  label,
  title,
  lead,
  className,
  titleClassName,
  aside,
}: {
  index: number
  label: string
  title: React.ReactNode
  lead?: React.ReactNode
  className?: string
  titleClassName?: string
  /** Opcjonalna treść pod leadem w prawej kolumnie (np. przyciski). */
  aside?: React.ReactNode
}) {
  return (
    <Grid className={cn("gap-y-6", className)}>
      <div className="col-span-4 flex items-center gap-4 sm:col-span-8 lg:col-span-3 lg:block">
        <p className="eyebrow text-gold-ink">
          <span className="tnum">{String(index).padStart(2, "0")}</span>
        </p>
        <p className="eyebrow text-muted-foreground lg:mt-3">{label}</p>
      </div>
      <div className="@container col-span-4 min-w-0 sm:col-span-8 lg:col-span-9 xl:col-span-8">
        <h2
          className={cn(
            "display-e text-[clamp(2rem,6.6cqw,4.75rem)]",
            titleClassName
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-8">
            {lead}
          </p>
        ) : null}
        {aside ? <div className="mt-8">{aside}</div> : null}
      </div>
    </Grid>
  )
}

/** Włoskowata linia rozdzielająca w kolorze bieżącego tonu. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-full bg-current opacity-[0.12]", className)}
      aria-hidden="true"
    />
  )
}
