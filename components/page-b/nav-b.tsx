"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const links = [
  { index: "01", label: "Przełom", href: "#przelom" },
  { index: "02", label: "Sylwetka", href: "#sylwetka" },
  { index: "03", label: "Progresja", href: "#progresja-b" },
  { index: "04", label: "Sezony", href: "#sezony" },
  { index: "05", label: "Kadry", href: "#kadry" },
  { index: "06", label: "Rekordy", href: "#rekordy-b" },
]

export function NavB() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Otwarte menu pełnoekranowe blokuje przewijanie tła.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-300",
          scrolled
            ? "border-line-b bg-paper-b/92 backdrop-blur-md"
            : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-full max-w-[110rem] items-center justify-between gap-6 px-5 sm:px-8">
          <a
            href="#gora"
            className="flex items-center gap-3 outline-none focus-visible:text-electric"
          >
            <span className="size-2.5 bg-electric" aria-hidden="true" />
            <span className="display-b text-base tracking-normal sm:text-lg">
              Barbara Leśniewska
            </span>
          </a>

          <nav aria-label="Nawigacja główna" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mono-b group flex items-baseline gap-1.5 text-ink-b-soft transition-colors outline-none hover:text-ink-b focus-visible:text-electric"
                  >
                    <span className="text-electric opacity-60 transition-opacity group-hover:opacity-100">
                      {link.index}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#wspolpraca-b"
              className="mono-b hidden h-10 items-center bg-ink-b px-4 text-paper-b transition-colors outline-none hover:bg-electric focus-visible:bg-electric sm:inline-flex"
            >
              Współpraca ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mono-b flex h-10 items-center gap-2 border border-ink-b px-3 transition-colors outline-none hover:bg-ink-b hover:text-paper-b focus-visible:bg-ink-b focus-visible:text-paper-b xl:hidden"
              aria-expanded={open}
            >
              Menu
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu pełnoekranowe — kontra dla jasnej strony. */}
      <div
        hidden={!open}
        className="on-ink fixed inset-0 z-[60] flex flex-col bg-ink-b text-paper-b"
      >
        <div className="mx-auto flex h-16 w-full max-w-[110rem] shrink-0 items-center justify-between px-5 sm:px-8">
          <span className="display-b text-base tracking-normal sm:text-lg">
            Barbara Leśniewska
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mono-b flex h-10 items-center gap-2 border border-paper-b/40 px-3 transition-colors outline-none hover:bg-paper-b hover:text-ink-b focus-visible:bg-paper-b focus-visible:text-ink-b"
          >
            Zamknij ✕
          </button>
        </div>

        <nav
          aria-label="Nawigacja mobilna"
          className="mx-auto w-full max-w-[110rem] flex-1 overflow-y-auto px-5 pb-10 sm:px-8"
        >
          <ul className="border-t border-paper-b/15">
            {links.map((link) => (
              <li key={link.href} className="border-b border-paper-b/15">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-5 transition-colors outline-none hover:text-electric-soft focus-visible:text-electric-soft"
                >
                  <span className="mono-b text-paper-b/45">{link.index}</span>
                  <span className="display-b text-[clamp(2rem,9vw,3.5rem)]">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#wspolpraca-b"
            onClick={() => setOpen(false)}
            className="mono-b mt-8 flex h-14 items-center justify-center bg-electric text-paper-b outline-none focus-visible:bg-paper-b focus-visible:text-ink-b"
          >
            Nawiąż współpracę ↗
          </a>

          <Link
            href="/"
            className="mono-b mt-4 flex h-12 items-center justify-center border border-paper-b/30 outline-none focus-visible:border-paper-b"
          >
            ← Wariant A
          </Link>
        </nav>
      </div>
    </>
  )
}
