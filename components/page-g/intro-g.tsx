"use client"

import * as React from "react"
import { animate, AnimatePresence, motion } from "motion/react"

import { introG } from "@/data/page-g/copy"

const FINAL_SECONDS = 132.45
const STORAGE_KEY = "bl-g-intro"

function formatTime(seconds: number) {
  const centis = Math.round(seconds * 100)
  const minutes = Math.floor(centis / 6000)
  const secs = Math.floor((centis % 6000) / 100)
  const cents = centis % 100
  return `${minutes}:${String(secs).padStart(2, "0")},${String(cents).padStart(2, "0")}`
}

const IntroContext = React.createContext<{ done: boolean }>({ done: true })
export const useIntroG = () => React.useContext(IntroContext)

/**
 * Intro-stoper na papierze: białe tło, czarne cyfry naliczają do 2:12,45, kurtyna idzie
 * w górę i odsłania okładkę. Gra raz na sesję, można pominąć, przy
 * ograniczonym ruchu nie pojawia się wcale. Reszta strony dostaje `done`
 * przez kontekst i dopiero wtedy startuje własne animacje.
 */
export function IntroProviderG({ children }: { children: React.ReactNode }) {
  // Start od „count" także w SSR — kurtyna jest w HTML od pierwszej klatki,
  // więc okładka nie mignie przed intro. Kto już widział (sesja) lub ma
  // ograniczony ruch, dostaje „done" w pierwszym efekcie.
  const [phase, setPhase] = React.useState<"count" | "exit" | "done">("count")
  const digitsRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const seen = window.sessionStorage.getItem(STORAGE_KEY) === "1"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduce && !seen) return
    const frame = window.requestAnimationFrame(() => setPhase("done"))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  React.useEffect(() => {
    if (phase !== "count") return
    document.documentElement.style.overflow = "hidden"
    const controls = animate(0, FINAL_SECONDS, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        if (digitsRef.current) digitsRef.current.textContent = formatTime(value)
      },
      onComplete: () => {
        window.setTimeout(() => setPhase("exit"), 420)
      },
    })
    return () => controls.stop()
  }, [phase])

  React.useEffect(() => {
    if (phase === "done") {
      document.documentElement.style.overflow = ""
      window.sessionStorage.setItem(STORAGE_KEY, "1")
    }
  }, [phase])

  const skip = () => {
    if (phase === "count") setPhase("exit")
  }

  return (
    <IntroContext.Provider value={{ done: phase === "done" }}>
      {children}
      <AnimatePresence>
        {phase === "count" || phase === "exit" ? (
          <motion.div
            key="intro"
            role="status"
            aria-live="polite"
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            animate={{
              clipPath:
                phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
            }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (phase === "exit") setPhase("done")
            }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-paper-g text-ink-g"
          >
            <p className="tag-f text-ink-g/60">{introG.label}</p>
            <p className="board-f mt-6 text-[clamp(3rem,16vw,12rem)] leading-none font-medium">
              <span ref={digitsRef}>0:00,00</span>
            </p>
            <div className="mt-8 h-px w-40 overflow-hidden bg-ink-g/12">
              <motion.span
                className="block h-full origin-left bg-red-g"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <button
              type="button"
              onClick={skip}
              className="tag-f absolute right-6 bottom-6 text-ink-g/60 transition-colors hover:text-ink-g"
            >
              {introG.skip}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}
