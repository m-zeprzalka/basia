"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

/** Zapis wyniku pływackiego: m:ss,cc (PL) lub m:ss.cc (EN) — liczony na setnych. */
function formatTime(seconds: number, separator: string) {
  const centiseconds = Math.round(seconds * 100)
  const minutes = Math.floor(centiseconds / 6000)
  const secs = Math.floor((centiseconds % 6000) / 100)
  const cents = centiseconds % 100

  const rest = `${String(secs).padStart(2, "0")}${separator}${String(cents).padStart(2, "0")}`
  return minutes > 0 ? `${minutes}:${rest}` : rest
}

/**
 * Czas naliczany jak na tablicy wyników — zatrzymuje się na rezultacie.
 * Separator dziesiętny podaje słownik bieżącego języka.
 */
export function TimeCounter({
  seconds,
  separator = ",",
  duration = 2,
  className,
}: {
  seconds: number
  separator?: string
  duration?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const node = ref.current
    if (!node || !isInView) return

    if (reduceMotion) {
      node.textContent = formatTime(seconds, separator)
      return
    }

    const controls = animate(0, seconds, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = formatTime(value, separator)
      },
    })

    return () => controls.stop()
  }, [isInView, seconds, separator, duration, reduceMotion])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={formatTime(seconds, separator)}
    >
      {formatTime(seconds, separator)}
    </span>
  )
}
