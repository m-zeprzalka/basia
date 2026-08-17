"use client"

import * as React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Dystans startowy animacji w pikselach. */
  distance?: number
  as?: "div" | "section" | "li" | "article" | "figure"
}

/**
 * Wejście elementu przy scrollu — jedna, spójna animacja dla całej strony.
 * Przy `prefers-reduced-motion` element pojawia się od razu.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  // Stan „hidden" jest identyczny na serwerze i w przeglądarce (także przy
  // prefers-reduced-motion) — inaczej hydratacja zgłaszała różnicę transformu.
  // Przy ograniczonym ruchu element i tak pojawia się natychmiast (duration 0).
  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
