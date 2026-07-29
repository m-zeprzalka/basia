"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { nav, site } from "@/data/site"
import { Button, ButtonLink } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Container, BrandMark } from "@/components/site/primitives"

const sectionIds = nav.map((item) => item.href.replace("#", ""))

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        "fixed inset-x-0 top-0 z-50 h-(--header-height) transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        {/* Stała wysokość znaku i tekstu — dzięki temu wyrównanie w pionie nie
            zmienia się między breakpointami. */}
        <a
          href="#start"
          className="flex h-9 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BrandMark />
          <span className="flex flex-col justify-center leading-none">
            <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
              {site.name}
            </span>
            <span className="mt-1.5 hidden text-[0.6875rem] tracking-wide text-muted-foreground sm:block">
              {site.role}
            </span>
          </span>
        </a>

        <nav aria-label="Nawigacja główna" className="hidden lg:block">
          <ul className="flex h-9 items-center gap-1">
            {nav.map((item) => {
              const id = item.href.replace("#", "")
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "relative flex h-9 items-center rounded-lg px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                      active === id && "text-foreground"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-azure transition-transform duration-300",
                        active === id && "scale-x-100"
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
            className="hidden sm:inline-flex"
            href="#wspolpraca"
          >
            Nawiąż współpracę
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="lg:hidden"
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
              {/* Przycisk zamknięcia siada dokładnie tam, gdzie był hamburger:
                  ten sam rozmiar, ten sam odstęp od krawędzi i ta sama oś. */}
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

              {/* Panel jest kontrolowany, więc kotwice zamykają go przez
                  `onClick` — dzięki temu pozostają linkami, a nie przyciskami. */}
              <nav
                aria-label="Nawigacja mobilna"
                className="border-t border-border/60 px-5 pt-2 pb-6"
              >
                <ul className="flex flex-col">
                  {nav.map((item) => (
                    <li key={item.href} className="border-b border-border/60">
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-3.5 font-heading text-lg tracking-tight outline-none focus-visible:text-azure"
                      >
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
                  Nawiąż współpracę
                </ButtonLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
