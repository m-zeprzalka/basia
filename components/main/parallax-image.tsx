"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Zdjęcie w ramie z delikatną paralaksą: obraz jest o kilkanaście procent
 * wyższy od ramy i przesuwa się wolniej niż strona. Przy `prefers-reduced-motion`
 * zostaje nieruchomy. Rama musi mieć własne proporcje (aspect-*) lub wysokość.
 *
 * Domyślna jakość 90 — duże kadry nie dostają drugiej warstwy kompresji
 * z optymalizatora obrazów (oryginały są już stratne).
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  position = "50% 50%",
  strength = 10,
  priority = false,
  quality = 90,
  className,
  imageClassName,
  children,
}: {
  src: StaticImageData
  alt: string
  sizes: string
  position?: string
  /** Zakres przesunięcia w procentach wysokości ramy. */
  strength?: number
  priority?: boolean
  quality?: number
  className?: string
  imageClassName?: string
  children?: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`]
  )

  return (
    <div
      ref={ref}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <motion.div
        style={reduceMotion ? undefined : { y }}
        className={cn("absolute inset-0", !reduceMotion && "-inset-y-[12%]")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder="blur"
          style={{ objectPosition: position }}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
      {children}
    </div>
  )
}
