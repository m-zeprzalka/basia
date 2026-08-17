"use client"

import * as React from "react"
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { pitchNav } from "@/data/page-d/pitch"
import { site } from "@/data/site"
import { Button, ButtonLink } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrandMark, Container } from "@/components/site/primitives"

const sectionIds = pitchNav.map((item) => item.href.replace("#", ""))

/**
 * Nagłówek wariantu D. Nad ciemnym hero jest przezroczysty i pisany bielą;
 * po przewinięciu przechodzi w jasny pasek z rozmyciem — jak w wariancie A.
 */
export function NavD() {
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-(--header-height) transition-[background-color,box-shadow,backdrop-filter,color] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 text-foreground backdrop-blur-xl"
          : "on-deep bg-transparent text-white"
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <a
          href="#start"
          className="flex h-9 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BrandMark />
          <span className="flex flex-col justify-center leading-none">
            <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
              {site.name}
            </span>
            <span
              className={cn(
                "mt-1.5 hidden text-[0.6875rem] tracking-wide sm:block",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}
            >
              Prezentacja dla partnerów
            </span>
          </span>
        </a>

        <nav aria-label="Nawigacja główna" className="hidden lg:block">
          <ul className="flex h-9 items-center gap-1">
            {pitchNav.map((item) => {
              const id = item.href.replace("#", "")
              const isActive = active === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex h-9 items-center rounded-lg px-3 text-[0.8125rem] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      scrolled
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-white/75 hover:text-white",
                      isActive && (scrolled ? "text-foreground" : "text-white")
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300",
                        scrolled ? "bg-azure" : "bg-gold-bright",
                        isActive && "scale-x-100"
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex h-9 items-center gap-2">
          <ButtonLink
            size="xl"
            variant={scrolled ? "default" : "gold"}
            className="hidden sm:inline-flex"
            href="#wspolpraca"
          >
            Zostań partnerem
            <ArrowRightIcon data-icon="inline-end" />
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className={cn(
                    "lg:hidden",
                    !scrolled &&
                      "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  )}
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">Otwórz menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(20rem,88vw)] gap-0"
            >
              <div className="flex h-(--header-height) shrink-0 items-center justify-between pr-5 pl-5 sm:pr-8">
                <SheetTitle className="flex items-center gap-3 text-[0.9375rem] font-semibold tracking-tight">
                  <BrandMark className="size-8" />
                  {site.name}
                </SheetTitle>
                <SheetClose
                  render={<Button variant="outline" size="icon-lg" />}
                >
                  <XIcon />
                  <span className="sr-only">Zamknij menu</span>
                </SheetClose>
              </div>

              <nav
                aria-label="Nawigacja mobilna"
                className="border-t border-border/60 px-5 pt-2 pb-6"
              >
                <ul className="flex flex-col">
                  {pitchNav.map((item, index) => (
                    <li key={item.href} className="border-b border-border/60">
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-3.5 font-heading text-lg tracking-tight outline-none focus-visible:text-azure"
                      >
                        <span
                          className="eyebrow text-gold-ink"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  size="xl"
                  href="#wspolpraca"
                  onClick={() => setOpen(false)}
                  className="mt-6 w-full"
                >
                  Zostań partnerem
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
