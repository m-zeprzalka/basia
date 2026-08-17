"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { menuG } from "@/data/page-g/copy"
import { contact, site } from "@/data/site"
import { cn } from "@/lib/utils"
import { BrandMark } from "@/components/site/primitives"
import { Frame } from "@/components/page-e/frame-e"

/**
 * Nagłówek G: marka po lewej, „Menu" po prawej. Menu to pełnoekranowa
 * biała plansza z ogromnymi czarnymi wersalikami rozdziałów i czerwonymi
 * numerami. Pasek dostaje białe rozmycie po przewinięciu.
 */
export function NavG() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] h-(--header-height) transition-[background-color,border-color] duration-300",
          scrolled && !open
            ? "border-b border-ink-g/10 bg-paper-g/80 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <Frame className="flex h-full items-center justify-between">
          <a
            href="#start"
            onClick={() => setOpen(false)}
            className="flex h-9 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <BrandMark />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="tag-f mt-1.5 hidden text-[0.5625rem] text-ink-g/55 sm:block">
                Prezentacja dla partnerów · 2026/27
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-f"
            className="group flex h-10 items-center gap-3 rounded-full border border-ink-g/15 bg-paper-g/70 pr-2 pl-4 text-sm font-medium backdrop-blur outline-none hover:border-ink-g/50 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="tag-f text-[0.625rem]">
              {open ? "Zamknij" : "Menu"}
            </span>
            <span className="grid size-6 place-items-center">
              <span
                className={cn(
                  "block h-px w-4 bg-current transition-transform duration-300",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "-mt-px block h-px w-4 bg-current transition-transform duration-300",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[3px]"
                )}
              />
            </span>
          </button>
        </Frame>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-f"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Spis rozdziałów"
            initial={
              reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="lanes-g fixed inset-0 z-[65] overflow-y-auto bg-paper-g pt-(--header-height) text-ink-g"
          >
            <Frame className="flex min-h-full flex-col justify-between py-10 lg:py-14">
              <ol className="flex flex-col divide-y divide-ink-g/10 border-y border-ink-g/10">
                {menuG.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-4 outline-none focus-visible:text-red-g sm:grid-cols-[4rem_1fr_auto] sm:py-5"
                    >
                      <span className="tag-f text-red-g">
                        {String(item.index).padStart(2, "0")}
                      </span>
                      <span className="condensed-f text-[clamp(2.5rem,9vw,7rem)] transition-colors group-hover:text-red-g">
                        {item.label}
                      </span>
                      <span className="hidden text-sm text-ink-g/55 sm:block">
                        {item.hint}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-10 flex flex-col gap-4 text-sm text-ink-g/70 sm:flex-row sm:items-end sm:justify-between">
                <p>
                  {contact.person} · {contact.role}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-ink-g underline-offset-4 hover:underline"
                >
                  {contact.email}
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Frame>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
