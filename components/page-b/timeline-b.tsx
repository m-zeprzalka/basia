"use client"

import * as React from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"
import { milestones, type Milestone } from "@/data/achievements"
import { Frame, Marker, MedalSquare } from "@/components/page-b/primitives"

/**
 * Sezony przewijane w poziomie: pionowy scroll przesuwa taśmę kart w bok.
 *
 * Dystans liczony jest z realnej szerokości taśmy, więc sekcja kończy się
 * dokładnie wtedy, gdy widać ostatnią kartę. Przy `prefers-reduced-motion`
 * cała mechanika znika i zostaje zwykła lista pionowa.
 */
export function TimelineB() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const trackRef = React.useRef<HTMLOListElement>(null)
  const [distance, setDistance] = React.useState(0)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    // Przy ograniczonym ruchu renderuje się statyczna lista — dystans nieużywany.
    if (reduceMotion) return

    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener("resize", measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [reduceMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 140, damping: 30, restDelta: 0.5 })
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  if (reduceMotion) {
    return (
      <section id="sezony" className="scroll-mt-16 border-b border-line-b">
        <Frame className="@container py-16 sm:py-20">
          <TimelineHeading />
          <ol className="mt-12 flex flex-col gap-6">
            {milestones.map((milestone) => (
              <li key={milestone.id}>
                <MilestoneCard milestone={milestone} />
              </li>
            ))}
          </ol>
        </Frame>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="sezony"
      className="relative scroll-mt-16 border-b border-line-b"
      style={distance ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-5 px-5 sm:gap-6 sm:px-8"
        >
          <li className="flex w-[80vw] shrink-0 flex-col justify-center pr-6 sm:w-[26rem]">
            <TimelineHeading />
          </li>

          {milestones.map((milestone) => (
            <li
              key={milestone.id}
              className="w-[86vw] shrink-0 sm:w-[30rem] lg:w-[34rem]"
            >
              <MilestoneCard milestone={milestone} />
            </li>
          ))}

          <li className="w-5 shrink-0 sm:w-8" aria-hidden="true" />
        </motion.ol>

        {/* Pasek postępu taśmy — jedyna wskazówka, że sekcja jeszcze trwa. */}
        <div className="pointer-events-none absolute inset-x-5 bottom-8 h-px bg-line-b sm:inset-x-8">
          <motion.div
            className="h-px origin-left bg-electric"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  )
}

function TimelineHeading() {
  return (
    <div className="@container">
      <Marker index="04">Sezony</Marker>
      <h2 className="display-b mt-6 text-[clamp(2.5rem,14cqw,4.5rem)]">
        <span className="block">Dwa sezony,</span>
        <span className="outline-b block">które zbudowały</span>
        <span className="block">pozycję</span>
      </h2>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-b-soft">
        Medale mistrzowskie i rekordy Polski z lat 2025–2026, od najnowszych.
        Przewijaj, żeby przejść przez kolejne starty.
      </p>
    </div>
  )
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border border-line-b bg-paper-b p-6 sm:p-8",
        milestone.featured && "border-ink-b bg-paper-b-deep"
      )}
    >
      <header className="flex items-baseline justify-between gap-4 border-b border-line-b pb-4">
        <p className="mono-b text-ink-b-soft">{milestone.period}</p>
        <p
          className={cn(
            "mono-b",
            milestone.featured ? "text-electric" : "text-ink-b-soft"
          )}
        >
          {milestone.tag}
        </p>
      </header>

      <h3 className="display-b mt-5 text-[clamp(1.5rem,4vw,2rem)]">
        {milestone.title}
      </h3>
      <p className="mono-b mt-2 text-ink-b-soft">{milestone.location}</p>

      <ul className="mt-6 flex flex-1 flex-col">
        {milestone.results.map((result) => (
          <li
            key={`${result.event}-${result.time ?? ""}`}
            className="grid grid-cols-[1rem_1fr] gap-x-3 border-t border-line-b py-3"
          >
            <span className="flex h-5 items-center">
              {result.place ? (
                <span className="time text-xs font-medium text-ink-b-soft">
                  {result.place}
                </span>
              ) : (
                <MedalSquare medal={result.medal} />
              )}
            </span>
            <div className="min-w-0">
              {result.time ? (
                <p className="time font-heading text-lg leading-tight font-medium">
                  {result.time}
                </p>
              ) : null}
              <p className="mt-0.5 text-sm leading-snug">{result.event}</p>
              {result.note ? (
                <p className="mt-1 text-xs leading-relaxed text-ink-b-soft">
                  {result.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {milestone.summary ? (
        <p className="mt-5 border-t border-line-b pt-4 text-xs leading-relaxed text-ink-b-soft">
          {milestone.summary}
        </p>
      ) : null}
    </article>
  )
}
