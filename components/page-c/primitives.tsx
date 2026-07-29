import * as React from "react"

import { cn } from "@/lib/utils"

/** Węższa rama niż w A/B — treść ma oddychać, nie wypełniać ekran. */
export function Shell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[84rem] px-6 sm:px-10", className)}
      {...props}
    />
  )
}

/** Etykieta sekcji: „(01) Przełom" — jedyny wersalikowy zabieg wariantu. */
export function Tag({
  index,
  children,
  className,
}: {
  index?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("label-c text-ink-c-soft", className)}>
      {index ? <span className="text-accent-c">({index})</span> : null}
      {index ? " " : null}
      {children}
    </p>
  )
}

/**
 * Wyróżnia fragmenty zapisane w treści jako `**tekst**`.
 * Wariant C robi to najciszej, jak się da — pełnym atramentem w szarym tekście.
 */
export function Quiet({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-medium text-ink-c">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

/** Kropka medalowa — korzysta z globalnych tokenów złota/srebra/brązu. */
export function MedalPoint({
  medal,
  className,
}: {
  medal?: "gold" | "silver" | "bronze"
  className?: string
}) {
  if (!medal) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-block size-2 shrink-0 rounded-full border border-line-c",
          className
        )}
      />
    )
  }

  const label =
    medal === "gold" ? "Złoto" : medal === "silver" ? "Srebro" : "Brąz"

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        medal === "gold" && "bg-gold",
        medal === "silver" && "bg-silver",
        medal === "bronze" && "bg-bronze",
        className
      )}
    />
  )
}

/** Przycisk-pastylka — jedyna „bryła" w tym wariancie. */
export function Pill({
  href,
  children,
  variant = "solid",
  className,
  ...props
}: React.ComponentProps<"a"> & {
  href: string
  variant?: "solid" | "ghost"
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium transition-colors outline-none",
        variant === "solid" &&
          "bg-ink-c text-paper-c hover:bg-accent-c focus-visible:bg-accent-c",
        variant === "ghost" &&
          "border border-ink-c/25 text-ink-c hover:border-ink-c focus-visible:border-accent-c focus-visible:text-accent-c",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
