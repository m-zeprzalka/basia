import * as React from "react"
import { WavesHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Medal } from "@/data/achievements"

/**
 * Wyróżnia fragmenty zapisane w treści jako `**tekst**`.
 * Dzięki temu redakcja zostaje w plikach `data/`, a nie w komponentach.
 */
export function Emphasized({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[86rem] px-5 sm:px-8 lg:px-12",
        className
      )}
      {...props}
    />
  )
}

export function Eyebrow({
  index,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & { index?: string }) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3 text-muted-foreground",
        className
      )}
      {...props}
    >
      {index ? (
        <span className="text-gold-ink" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "start",
  className,
}: {
  index?: string
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "start" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "@container flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="display text-[clamp(1.625rem,8.5cqw,3.5rem)] [overflow-wrap:break-word]">
        {title}
      </h2>
      {lead ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  )
}

const medalStyles: Record<
  Medal,
  { ring: string; fill: string; label: string }
> = {
  gold: {
    ring: "ring-gold/40",
    fill: "bg-[linear-gradient(140deg,#F3DE9B,#D6A93F_45%,#A97C24)]",
    label: "Złoto",
  },
  silver: {
    ring: "ring-silver/40",
    fill: "bg-[linear-gradient(140deg,#F2F5F9,#BFCBD9_45%,#8B99AB)]",
    label: "Srebro",
  },
  bronze: {
    ring: "ring-bronze/40",
    fill: "bg-[linear-gradient(140deg,#EBC29A,#C58749_45%,#8E5A2B)]",
    label: "Brąz",
  },
}

/** Wynik bez medalu — ten sam krążek, ale w chłodnej bieli, wyraźnie jaśniejszy od srebra. */
const plainStyle = {
  ring: "ring-hairline",
  fill: "bg-[linear-gradient(140deg,#FFFFFF,#F4F8FC_45%,#DCE7F3)]",
}

export function MedalDot({
  medal,
  className,
}: {
  medal?: Medal
  className?: string
}) {
  const style = medal ? medalStyles[medal] : plainStyle
  return (
    <span
      className={cn(
        "inline-block size-3 shrink-0 rounded-full ring-4",
        style.fill,
        style.ring,
        className
      )}
      // Brak medalu nie jest informacją — czytnik ogłasza tylko krążki medalowe.
      {...(medal
        ? { role: "img", "aria-label": medalStyles[medal].label }
        : { "aria-hidden": true })}
    />
  )
}

/** Znak marki — fale (Lucide `waves-horizontal`) na gradiencie wody. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-[0.7rem] bg-[linear-gradient(150deg,var(--azure),var(--navy))] text-white shadow-[0_6px_16px_-8px_var(--azure)]",
        className
      )}
    >
      <WavesHorizontalIcon
        className="size-5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </span>
  )
}

/** Flaga Polski w kółku — akcent przy nadtytule. */
export function PolishFlag({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Polska"
      className={cn(
        "relative inline-block size-4 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/20",
        className
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#D4213D]" />
    </span>
  )
}
