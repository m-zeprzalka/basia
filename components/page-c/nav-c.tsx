"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { site } from "@/data/site"

const links = [
  { label: "Przełom", href: "#przelom" },
  { label: "Sylwetka", href: "#sylwetka" },
  { label: "Progresja", href: "#progresja" },
  { label: "Sezony", href: "#sezony" },
  { label: "Kadry", href: "#galeria" },
  { label: "Rekordy", href: "#rekordy" },
]

export function NavC() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
          "fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-b border-line-c bg-paper-c/90 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-full max-w-[84rem] items-center justify-between gap-6 px-6 sm:px-10">
          <a
            href="#gora"
            className="serif-c text-lg outline-none focus-visible:text-accent-c"
          >
            {site.name}
          </a>

          <nav aria-label="Nawigacja główna" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="py-2.5 text-[0.8125rem] text-ink-c-soft transition-colors outline-none hover:text-ink-c focus-visible:text-accent-c"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#wspolpraca"
              className="hidden h-10 items-center rounded-full border border-ink-c/25 px-5 text-[0.8125rem] font-medium transition-colors outline-none hover:border-ink-c focus-visible:border-accent-c focus-visible:text-accent-c sm:inline-flex"
            >
              Współpraca
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="flex h-10 items-center gap-2.5 rounded-full px-3 text-[0.8125rem] font-medium outline-none focus-visible:text-accent-c lg:hidden"
            >
              Menu
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu pełnoekranowe — biel na bieli, tylko typografia. */}
      <div
        hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col bg-paper-c"
      >
        <div className="mx-auto flex h-16 w-full max-w-[84rem] shrink-0 items-center justify-between px-6 sm:px-10">
          <span className="serif-c text-lg">{site.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 items-center rounded-full px-3 text-[0.8125rem] font-medium outline-none focus-visible:text-accent-c"
          >
            Zamknij
          </button>
        </div>

        <nav
          aria-label="Nawigacja mobilna"
          className="mx-auto flex w-full max-w-[84rem] flex-1 flex-col justify-center overflow-y-auto px-6 pb-16 sm:px-10"
        >
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-line-c">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 py-4 outline-none"
                >
                  <span className="label-c text-accent-c">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <span className="serif-c text-[clamp(1.75rem,7vw,2.75rem)] transition-colors group-hover:text-accent-c group-focus-visible:text-accent-c">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#wspolpraca"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center rounded-full bg-ink-c px-7 text-sm font-medium text-paper-c outline-none focus-visible:bg-accent-c"
            >
              Nawiąż współpracę
            </a>
            <Link href="/" className="uline-c text-sm text-ink-c-soft">
              Wariant A
            </Link>
            <Link href="/page-b" className="uline-c text-sm text-ink-c-soft">
              Wariant B
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
