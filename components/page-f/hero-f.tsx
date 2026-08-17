"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import poWyscigu from "@/assets/images/po-wyscigu-czepek.webp"
import { heroF } from "@/data/page-f/copy"
import { ButtonLink } from "@/components/ui/button"
import { PolishFlag } from "@/components/site/primitives"
import { Frame } from "@/components/page-e/frame-e"
import { useIntro } from "@/components/page-f/intro-f"
import { Chars, Lines, Magnetic } from "@/components/page-f/motion-f"

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Okładka F. Ultraskondensowane nazwisko na całą szerokość ramy, po prawej
 * pionowy kadr (czerwony czepek, woda) odsłaniany kurtyną z poziomej linii;
 * pod spodem trzy linie „napisów z transmisji" i konturowa taśma. Wszystko
 * rusza dopiero po intro-stoperze.
 */
export function HeroF() {
  const { done } = useIntro()
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="start"
      ref={ref}
      data-chapter="0"
      className="lanes-f glow-f relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <Frame className="relative flex flex-1 flex-col pt-(--header-height)">
        {/* Kadr — prawa część ramy, pełna wysokość okładki. */}
        <motion.div
          style={reduceMotion ? undefined : { y: photoY }}
          className="pointer-events-none absolute top-0 right-5 bottom-[44%] w-[58%] sm:right-8 sm:w-[46%] lg:right-12 lg:bottom-[34%] lg:w-[38%] 2xl:right-16"
          aria-hidden="true"
        >
          <motion.div
            initial={reduceMotion ? false : { clipPath: "inset(50% 0 50% 0)" }}
            animate={done ? { clipPath: "inset(0% 0 0% 0)" } : {}}
            transition={{ duration: 1.4, delay: 0.1, ease }}
            className="relative h-full overflow-hidden"
          >
            <Image
              src={poWyscigu}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 46vw"
              placeholder="blur"
              className="object-cover object-[28%_30%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ink-f),color-mix(in_oklab,var(--ink-f)_35%,transparent)_45%,transparent_75%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink-f)_0%,transparent_28%)]" />
          </motion.div>
        </motion.div>

        {/* Górny wiersz. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex items-center justify-between pt-6 sm:pt-8"
        >
          <p className="tag-f flex items-center gap-3 text-chalk-f/70">
            <PolishFlag />
            {heroF.kicker}
          </p>
        </motion.div>

        {/* Nazwisko. */}
        <motion.h1
          style={reduceMotion ? undefined : { y: nameY }}
          className="condensed-f @container relative z-10 mt-auto text-chalk-f"
        >
          <span className="block text-[clamp(4.5rem,21cqw,21rem)]">
            <Chars text={heroF.name[0]} show={done} delay={0.25} />
          </span>
          <span className="block text-[clamp(4.5rem,21cqw,21rem)]">
            <Chars text={heroF.name[1]} show={done} delay={0.42} />
          </span>
        </motion.h1>

        {/* Napisy i akcje. */}
        <motion.div
          style={reduceMotion ? undefined : { opacity: fade }}
          className="relative z-10 mt-8 grid gap-8 pb-10 sm:mt-10 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-12 lg:mt-12"
        >
          <Lines
            lines={heroF.lines}
            show={done}
            delay={12}
            className="max-w-[44ch] gap-1 text-base leading-snug text-chalk-f/85 sm:text-lg lg:text-xl"
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.35, ease }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic className="max-sm:block">
              <ButtonLink
                size="2xl"
                variant="gold"
                href={heroF.cta.href}
                className="rounded-full max-sm:w-full"
              >
                {heroF.cta.label}
                <ArrowRightIcon data-icon="inline-end" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink
              size="2xl"
              variant="outline"
              href={heroF.secondary.href}
              className="rounded-full border-white/25 bg-transparent hover:bg-white/8 max-sm:w-full"
            >
              {heroF.secondary.label}
              <ArrowDownIcon data-icon="inline-end" />
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Frame>

      {/* Taśma konturowa — pełna szerokość, powoli w lewo. */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 overflow-hidden border-t border-white/10 py-3"
        aria-hidden="true"
      >
        <div className="flex w-max motion-safe:animate-marquee-f">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {heroF.marquee.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="condensed-f outline-f px-6 text-[clamp(2.5rem,7vw,6.5rem)] text-chalk-f normal-case">
                    {item}
                  </span>
                  <span className="size-2 rounded-full bg-aqua-f" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
