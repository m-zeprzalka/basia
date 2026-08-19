"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import przedStartem from "@/assets/images/paryz-przed-startem.webp"
import type { CoverDict } from "@/data/main/types"
import { ButtonLink } from "@/components/ui/button"
import { PolishFlag } from "@/components/site/primitives"
import { Chapter, Frame, Grid } from "@/components/page-e/frame-e"
import { StatValue } from "@/components/main/stat"

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Okładka. Pełnoekranowe zdjęcie z Paryża z powolnym najazdem (Ken Burns)
 * po wejściu i paralaksą przy przewijaniu; nazwisko na całą szerokość ramy,
 * pod spodem tablica wyników jak na hali (na desktopie liczby naliczają się
 * jak na tablicy świetlnej). Wszystko poza zdjęciem leży na siatce 12 kolumn.
 */
export function Cover({
  t,
  chapterCount,
}: {
  t: CoverDict
  chapterCount: number
}) {
  const ref = React.useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <Chapter
      id="start"
      index={0}
      tone="deep"
      ref={ref}
      className="isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* Warstwa medium — pełne krwawienie, paralaksa, najazd. */}
      <motion.div
        style={reduceMotion ? undefined : { y: mediaY, opacity: mediaOpacity }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <motion.div
          initial={reduceMotion ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src={przedStartem}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
            className="object-cover object-[36%_22%] sm:object-[45%_25%] lg:object-[52%_28%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--navy-deep)_0%,color-mix(in_oklab,var(--navy-deep)_86%,transparent)_30%,color-mix(in_oklab,var(--navy-deep)_28%,transparent)_60%,transparent_88%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,color-mix(in_oklab,var(--navy-deep)_72%,transparent),transparent_55%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--navy-deep)_60%,transparent),transparent)]" />
      </motion.div>

      <Frame className="relative flex flex-1 flex-col justify-end pt-(--header-height)">
        <motion.div style={reduceMotion ? undefined : { y: textY }}>
          <Grid className="mt-[30svh] items-end gap-y-6 pb-8 sm:mt-[34svh] sm:gap-y-8 sm:pb-12 lg:mt-[22svh] lg:pb-14">
            <motion.div
              {...rise(0.1)}
              className="col-span-4 flex items-center justify-between gap-6 sm:col-span-8 lg:col-span-12"
            >
              <p className="eyebrow flex items-center gap-3 text-white/80">
                <PolishFlag />
                {t.kicker}
              </p>
              <p className="eyebrow hidden text-white/60 lg:block">
                <span className="tnum">00</span>
                <span className="opacity-60"> / </span>
                <span className="tnum">
                  {String(chapterCount - 1).padStart(2, "0")}
                </span>
              </p>
            </motion.div>

            <motion.h1
              {...rise(0.22)}
              className="display-e @container col-span-4 text-white sm:col-span-8 lg:col-span-12"
            >
              <span className="block text-[clamp(2.75rem,14.5cqw,12rem)]">
                {t.name[0]}
              </span>
              <span className="block text-[clamp(2.75rem,14.5cqw,12rem)]">
                {t.name[1]}
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.34)}
              className="col-span-4 max-w-[46ch] text-base leading-relaxed text-white/85 sm:col-span-6 sm:text-lg lg:col-span-6 lg:text-xl"
            >
              {t.tagline}
            </motion.p>

            <motion.div
              {...rise(0.44)}
              className="col-span-4 flex flex-col gap-4 sm:col-span-8 sm:flex-row sm:items-center sm:gap-3 lg:col-span-6 lg:justify-end"
            >
              <ButtonLink size="2xl" variant="gold" href={t.primaryCta.href}>
                {t.primaryCta.label}
                <ArrowRightIcon data-icon="inline-end" />
              </ButtonLink>
              {/* Na mobile drugi przycisk jest linkiem — jeden ekran, jedna
                  wyraźna akcja; od `sm` pełny przycisk konturowy. */}
              <ButtonLink
                size="2xl"
                variant="outline"
                href={t.secondaryCta.href}
                className="hidden border-white/35 bg-white/8 text-white backdrop-blur-sm hover:bg-white/16 hover:text-white sm:inline-flex"
              >
                {t.secondaryCta.label}
                <ArrowDownIcon data-icon="inline-end" />
              </ButtonLink>
              <a
                href={t.secondaryCta.href}
                className="inline-flex items-center gap-2 self-start text-sm font-medium text-white/85 underline-offset-4 hover:underline sm:hidden"
              >
                {t.secondaryCta.label}
                <ArrowDownIcon className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          </Grid>
        </motion.div>
      </Frame>

      {/* Tablica wyników — pasek zamykający okładkę. Na desktopie pięć pól na
          siatce, na mniejszych ekranach przewijana tablica. */}
      <motion.div
        {...rise(0.6)}
        className="relative border-t border-white/15 bg-navy-deep/55 backdrop-blur-md"
      >
        <Frame className="hidden lg:block">
          <dl className="grid grid-cols-5 gap-x-8 py-6">
            {t.board.map((item, index) => (
              <div key={item.value} className="flex min-w-0 flex-col gap-1.5">
                <dt className="sr-only">{item.label}</dt>
                <dd className="board-e text-2xl font-medium text-white xl:text-[1.75rem]">
                  <StatValue
                    value={item.value}
                    duration={1.6}
                    delay={0.9 + index * 0.1}
                  />
                </dd>
                <dd className="text-xs leading-snug text-white/65">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Frame>
        <div
          className="overflow-hidden py-4 lg:hidden"
          role="group"
          aria-label={t.boardAria}
        >
          <div className="edge-fade-x flex w-max motion-safe:animate-marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                {t.board.map((item) => (
                  <li
                    key={item.value}
                    className="flex items-baseline gap-3 whitespace-nowrap"
                  >
                    <span className="board-e text-lg font-medium text-white">
                      {item.value}
                    </span>
                    <span className="text-xs text-white/65">{item.label}</span>
                    <span
                      className="ml-5 size-1.5 rotate-45 bg-gold-bright/80"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </motion.div>
    </Chapter>
  )
}
