import * as React from "react"

import { cn } from "@/lib/utils"

/** Szeroki układ z widocznymi marginesami konstrukcyjnymi. */
export function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[110rem] px-5 sm:px-8", className)}
      {...props}
    />
  )
}

/** Numer i etykieta sekcji — zapis techniczny, jak opis rysunku. */
export function Marker({
  index,
  children,
  className,
}: {
  index: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("mono-b flex items-baseline gap-4", className)}>
      <span className="text-electric">{index}</span>
      <span className="h-px w-10 shrink-0 translate-y-[-0.2em] bg-current opacity-30" />
      <span>{children}</span>
    </p>
  )
}

/** Nagłówek plakatowy — pierwsza linia pełna, druga konturem. */
export function PosterHeading({
  lines,
  className,
  outlineFrom = 1,
}: {
  lines: string[]
  className?: string
  /** Od której linii rysować sam kontur liter. */
  outlineFrom?: number
}) {
  return (
    <h2
      className={cn(
        "display-b text-[clamp(2.5rem,11cqw,6rem)] text-balance",
        className
      )}
    >
      {lines.map((line, index) => (
        <span
          key={line}
          className={cn("block", index >= outlineFrom && "outline-b")}
        >
          {line}
        </span>
      ))}
    </h2>
  )
}

/**
 * Wyróżnia fragmenty zapisane w treści jako `**tekst**`.
 * Wariant B używa podkreślenia elektrycznym błękitem zamiast pogrubienia.
 */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            key={index}
            className="font-medium text-foreground [text-decoration-line:underline] decoration-electric decoration-2 underline-offset-4"
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

const medalColor = {
  gold: "bg-amber-b",
  silver: "bg-ink-b-soft",
  bronze: "bg-[#B87333]",
} as const

/** Medal jako kwadrat — w tym języku nic nie jest zaokrąglone. */
export function MedalSquare({
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
          "inline-block size-2.5 shrink-0 border border-current opacity-40",
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
        "inline-block size-2.5 shrink-0",
        medalColor[medal],
        className
      )}
    />
  )
}
