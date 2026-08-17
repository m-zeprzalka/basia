"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/**
 * Kursor własny — tylko przy precyzyjnym wskaźniku (mysz/trackpad).
 * Mała kropka podąża za wskaźnikiem ze sprężyną; nad elementami z atrybutem
 * `data-cursor="Etykieta"` rozrasta się w krążek z tekstem („Odtwórz",
 * „Powiększ", „Przeciągnij"). Systemowy kursor znika tylko nad tymi
 * elementami (CSS `cursor: none` w globals), więc nigdzie nie gubimy
 * afordancji.
 */
export function CursorF() {
  const [enabled, setEnabled] = React.useState(false)
  const [label, setLabel] = React.useState<string | null>(null)
  const [visible, setVisible] = React.useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.6 })

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const update = () => setEnabled(fine.matches)
    update()
    fine.addEventListener("change", update)
    return () => fine.removeEventListener("change", update)
  }, [])

  React.useEffect(() => {
    if (!enabled) return
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]"
      )
      setLabel(target ? target.getAttribute("data-cursor") : null)
    }
    const onLeave = () => setVisible(false)
    // Przy przewijaniu wskaźnik stoi, ale element pod nim się zmienia.
    const onScroll = () => {
      const target = document
        .elementFromPoint(x.get(), y.get())
        ?.closest<HTMLElement>("[data-cursor]")
      setLabel(target ? target.getAttribute("data-cursor") : null)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const big = label !== null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[95] mix-blend-difference"
    >
      <motion.div
        animate={{
          width: big ? 88 : 10,
          height: big ? 88 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-f"
      >
        <span
          className={`tag-f text-[0.625rem] font-semibold whitespace-nowrap transition-opacity duration-200 ${big ? "opacity-100" : "opacity-0"}`}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
