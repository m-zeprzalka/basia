"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

type CountUpProps = {
  to: number
  decimals?: number
  duration?: number
  suffix?: string
  className?: string
}

/** Licznik odliczający wartość po wejściu w widok. */
export function CountUp({
  to,
  decimals = 0,
  duration = 1.4,
  suffix = "",
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const reduceMotion = useReducedMotion()

  const format = React.useCallback(
    (value: number) =>
      value.toLocaleString("pl-PL", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  )

  React.useEffect(() => {
    const node = ref.current
    if (!node || !isInView) return

    if (reduceMotion) {
      node.textContent = format(to) + suffix
      return
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = format(value) + suffix
      },
    })

    return () => controls.stop()
  }, [isInView, to, duration, suffix, format, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {format(0)}
      {suffix}
    </span>
  )
}
