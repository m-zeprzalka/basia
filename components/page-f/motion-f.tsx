"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   Pomocnicy ruchu wariantu F.
   Magnetic — element „przyciąga się" do wskaźnika (delikatnie, tylko mysz).
   Lines    — tekst pojawia się linia po linii, maską od dołu.
   Chars    — nagłówek pojawia się litera po literze (na potrzeby okładki).
--------------------------------------------------------------------------- */

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 })

  const onMove = (event: React.MouseEvent) => {
    if (reduceMotion) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] },
  }),
}

/** Linie tekstu wjeżdżające zza maski. `show` steruje startem (np. po intro). */
export function Lines({
  lines,
  show = true,
  className,
  lineClassName,
  as: Tag = "p",
  delay = 0,
}: {
  lines: readonly string[]
  show?: boolean
  className?: string
  lineClassName?: string
  as?: "p" | "h1" | "h2" | "div"
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <Tag className={cn("flex flex-col", className)}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            custom={index + delay}
            variants={reduceMotion ? undefined : lineVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Litery nagłówka — każda wjeżdża osobno; `show` odpala sekwencję. */
export function Chars({
  text,
  show = true,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string
  show?: boolean
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduceMotion = useReducedMotion()
  const chars = Array.from(text)
  return (
    <span
      className={cn(
        "-mt-[0.16em] inline-block overflow-hidden pt-[0.16em] align-top",
        className
      )}
      aria-label={text}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={reduceMotion ? false : { y: "105%", rotate: 4 }}
          animate={show ? { y: "0%", rotate: 0 } : {}}
          transition={{
            duration: 1,
            delay: delay + index * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  )
}
