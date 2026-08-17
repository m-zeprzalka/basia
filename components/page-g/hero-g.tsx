"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import portret from "@/assets/images/portret-basen.webp"
import { heroG } from "@/data/page-g/copy"
import { ButtonLink } from "@/components/ui/button"
import { PolishFlag } from "@/components/site/primitives"
import { Frame } from "@/components/page-e/frame-e"
import { Chars, Lines, Magnetic } from "@/components/page-f/motion-f"
import { useIntroG } from "@/components/page-g/intro-g"

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Okładka G — plakat. Nazwisko czarnymi, ultraskondensowanymi wersalikami
 * na całą ramę; pod nim po lewej trzy linie i akcje, po prawej pionowy
 * portret w ramie z czerwoną planszą przesuniętą za nim (druk offsetowy).
 * Na dole czerwona taśma z białymi wersalikami. Rusza po intro-stoperze.
 */
export function HeroG() {
  const { done } = useIntroG()
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="start"
      ref={ref}
      data-chapter="0"
      className="lanes-g relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <Frame className="relative flex flex-1 flex-col pt-(--header-height)">
        {/* Plakat: A (kicker + nazwisko) i C (napisy + akcje) w lewych 8 kolumnach,
            B (portret) w prawych 4 na całą wysokość; na mobile A → B → C. */}
        <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-8 pt-6 pb-10 sm:pt-8 sm:pb-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          {/* A */}
          <div className="order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={done ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <p className="tag-f flex items-center gap-3 text-ink-g/65">
                <PolishFlag />
                {heroG.kicker}
              </p>
            </motion.div>
            <motion.h1
              style={reduceMotion ? undefined : { y: nameY }}
              className="condensed-f @container relative z-10 mt-8 text-ink-g sm:mt-10"
            >
              <span className="block text-[clamp(4.5rem,20cqw,13.5rem)]">
                <Chars text={heroG.name[0]} show={done} delay={0.2} />
              </span>
              <span className="block text-[clamp(4.5rem,20cqw,13.5rem)]">
                <Chars text={heroG.name[1]} show={done} delay={0.36} />
              </span>
            </motion.h1>
          </div>

          {/* B — plakat: czerwona plansza + portret odsłaniany kurtyną z dołu. */}
          <motion.div
            style={reduceMotion ? undefined : { y: photoY }}
            className="order-2 flex justify-end lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:items-end"
          >
            <div className="w-[64%] max-w-[20rem] sm:w-[46%] lg:w-full lg:max-w-[24rem]">
              <div className="relative">
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0, x: -12, y: -12 }}
                  animate={done ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.5, ease }}
                  className="absolute -right-3 -bottom-3 h-full w-full bg-red-g sm:-right-4 sm:-bottom-4"
                  aria-hidden="true"
                />
                <motion.figure
                  initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
                  animate={done ? { clipPath: "inset(0% 0 0 0)" } : {}}
                  transition={{ duration: 1.3, delay: 0.3, ease }}
                  className="relative aspect-[4/5] overflow-hidden bg-paper-g-2"
                >
                  <Image
                    src={portret}
                    alt="Barbara Leśniewska w czepku i okularach pływackich, uśmiechnięta, na hali basenowej"
                    fill
                    priority
                    sizes="(min-width: 1024px) 24rem, 60vw"
                    placeholder="blur"
                    className="object-cover object-[50%_20%]"
                  />
                </motion.figure>
              </div>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={done ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="tag-f mt-7 text-ink-g/55 sm:mt-8"
              >
                {heroG.photoCaption}
              </motion.p>
            </div>
          </motion.div>

          {/* C */}
          <motion.div
            style={reduceMotion ? undefined : { opacity: fade }}
            className="order-3 flex flex-col justify-end gap-8 lg:col-span-8 lg:col-start-1 lg:row-start-2"
          >
            <Lines
              lines={heroG.lines}
              show={done}
              delay={11}
              className="max-w-[44ch] gap-1 text-base leading-snug text-ink-g/80 sm:text-lg lg:text-xl"
            />
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={done ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3, ease }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic className="max-sm:block">
                <ButtonLink
                  size="2xl"
                  href={heroG.cta.href}
                  className="rounded-full bg-red-g text-paper-g hover:bg-red-g-deep max-sm:w-full"
                >
                  {heroG.cta.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink
                size="2xl"
                variant="outline"
                href={heroG.secondary.href}
                className="rounded-full border-ink-g/20 bg-transparent hover:bg-ink-g/5 max-sm:w-full"
              >
                {heroG.secondary.label}
                <ArrowDownIcon data-icon="inline-end" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </Frame>

      {/* Czerwona taśma. */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 overflow-hidden bg-red-g py-2 text-paper-g"
        aria-hidden="true"
      >
        <div className="flex w-max motion-safe:animate-marquee-f">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {heroG.marquee.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="condensed-f px-6 text-[clamp(2rem,5.5vw,5rem)] normal-case">
                    {item}
                  </span>
                  <span className="size-2 rounded-full bg-paper-g" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
