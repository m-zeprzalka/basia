"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { dock } from "@/data/page-d/pitch"
import { ButtonLink } from "@/components/ui/button"

/**
 * Pływający pasek z jedynym wezwaniem do działania — tylko na mobile.
 * Pojawia się po przewinięciu hero i chowa, gdy sekcja kontaktu lub stopka
 * są już na ekranie (nie zasłania danych kontaktowych).
 */
export function DockD() {
  const [pastHero, setPastHero] = React.useState(false)
  const [nearContact, setNearContact] = React.useState(false)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const targets = [
      document.getElementById("kontakt"),
      document.querySelector("footer"),
    ].filter((element): element is HTMLElement => element !== null)
    if (targets.length === 0) return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        })
        setNearContact(visible.size > 0)
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.05 }
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const show = pastHero && !nearContact

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="dock"
          initial={reduceMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] lg:hidden"
        >
          <div className="mx-auto max-w-md rounded-2xl bg-navy/92 p-2 shadow-[0_12px_32px_-12px_rgba(6,23,41,0.6)] ring-1 ring-white/15 backdrop-blur-xl">
            <ButtonLink
              size="xl"
              variant="gold"
              href={dock.href}
              className="w-full"
            >
              {dock.label}
              <ArrowRightIcon data-icon="inline-end" />
            </ButtonLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
