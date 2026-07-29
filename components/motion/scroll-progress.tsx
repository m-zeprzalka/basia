"use client"

import { motion, useScroll, useSpring } from "motion/react"

/** Cienki wskaźnik postępu czytania — pod nagłówkiem strony. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(to_right,var(--azure),var(--aqua),var(--gold))]"
    />
  )
}
