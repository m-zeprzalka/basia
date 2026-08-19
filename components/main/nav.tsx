"use client"

import * as React from "react"
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react"

import type { ChapterMeta, Locale, NavDict } from "@/data/main/types"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"
import { Button, ButtonLink } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrandMark } from "@/components/site/primitives"
import { Frame } from "@/components/page-e/frame-e"
import { useActiveChapter } from "@/components/page-e/use-active-chapter"

/** Adresy obu wersji językowych — przełącznik prowadzi na górę strony. */
const localeHref: Record<Locale, string> = { pl: "/", en: "/en" }

/**
 * Nagłówek: marka · bieżący rozdział („02 · Postępy") · przełącznik języka
 * · CTA. Nad okładką przezroczysty i biały; po przewinięciu jasny z rozmyciem.
 */
export function Nav({
  t,
  chapters,
  locale,
}: {
  t: NavDict
  chapters: readonly ChapterMeta[]
  locale: Locale
}) {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const active = useActiveChapter()
  const current = chapters[active] ?? chapters[0]

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const light = !scrolled

  const langSwitch = (className?: string) => (
    <nav
      aria-label={t.langAria}
      className={cn("board-e flex items-center gap-1.5 text-xs", className)}
    >
      {(["pl", "en"] as const).map((lang, index) => (
        <React.Fragment key={lang}>
          {index > 0 ? (
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
          ) : null}
          <a
            href={localeHref[lang]}
            aria-current={locale === lang ? "page" : undefined}
            className={cn(
              "rounded-sm px-0.5 py-1 uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              locale === lang
                ? "font-semibold"
                : "opacity-55 hover:opacity-90 focus-visible:opacity-90"
            )}
          >
            {lang}
          </a>
        </React.Fragment>
      ))}
    </nav>
  )

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-(--header-height) transition-[background-color,box-shadow,backdrop-filter,color] duration-300",
        light
          ? "on-deep bg-transparent text-white"
          : "border-b border-border/70 bg-background/85 text-foreground backdrop-blur-xl"
      )}
    >
      <Frame className="flex h-full items-center justify-between gap-4 sm:gap-6">
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
                light ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {t.edition}
            </span>
          </span>
        </a>

        {/* Bieżący rozdział — jak numer slajdu. */}
        <p
          className={cn(
            "eyebrow hidden items-center gap-3 lg:flex",
            light ? "text-white/80" : "text-muted-foreground"
          )}
          aria-live="polite"
        >
          <span className="tnum text-gold-ink">
            {String(current.index).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
          <span>{current.label}</span>
        </p>

        <div className="flex h-9 items-center gap-2 sm:gap-3">
          {langSwitch(light ? "text-white" : "text-foreground")}

          <ButtonLink
            size="xl"
            variant={light ? "gold" : "default"}
            className="hidden sm:inline-flex"
            href={t.ctaHref}
          >
            {t.cta}
            <ArrowRightIcon data-icon="inline-end" />
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className={cn(
                    light &&
                      "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  )}
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">{t.openMenu}</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(22rem,88vw)] gap-0"
            >
              <div className="flex h-(--header-height) shrink-0 items-center justify-between pr-5 pl-5 sm:pr-8">
                <SheetTitle className="flex items-center gap-3 text-[0.9375rem] font-semibold tracking-tight">
                  <BrandMark className="size-8" />
                  {t.chaptersTitle}
                </SheetTitle>
                <SheetClose
                  render={<Button variant="outline" size="icon-lg" />}
                >
                  <XIcon />
                  <span className="sr-only">{t.close}</span>
                </SheetClose>
              </div>

              <nav
                aria-label={t.chaptersAria}
                className="border-t border-border/60 px-5 pt-2 pb-6"
              >
                <ol className="flex flex-col">
                  {chapters.map((chapter) => (
                    <li key={chapter.id} className="border-b border-border/60">
                      <a
                        href={`#${chapter.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={
                          active === chapter.index ? "true" : undefined
                        }
                        className={cn(
                          "flex items-baseline gap-4 py-3.5 font-heading text-lg tracking-tight outline-none focus-visible:text-azure",
                          active === chapter.index
                            ? "text-foreground"
                            : "text-foreground/75"
                        )}
                      >
                        <span
                          className="eyebrow tnum text-gold-ink"
                          aria-hidden="true"
                        >
                          {String(chapter.index).padStart(2, "0")}
                        </span>
                        {chapter.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <ButtonLink
                  size="xl"
                  href={t.ctaHref}
                  onClick={() => setOpen(false)}
                  className="mt-6 w-full"
                >
                  {t.cta}
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Frame>
    </header>
  )
}
