"use client"

import * as React from "react"
import Image from "next/image"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  XIcon,
} from "lucide-react"

import { galleryD, galleryInitialCount } from "@/data/page-d/gallery-d"
import { galleryCopy } from "@/data/page-d/pitch"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"
import { SectionHeadD } from "@/components/page-d/primitives-d"

/**
 * 05 — galeria. Dwie kolumny już od najmniejszych ekranów i jednakowe kadry:
 * siatka jest przewidywalna, a strona na mobile krótsza o połowę względem
 * układu kolumnowego. Pozostałe zdjęcia rozwijają się na życzenie.
 * Lightbox obsługuje strzałki i przesunięcie palcem.
 */
export function GalleryD() {
  const [expanded, setExpanded] = React.useState(false)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const isOpen = openIndex !== null
  const active = isOpen ? galleryD[openIndex] : null
  const visible = expanded ? galleryD : galleryD.slice(0, galleryInitialCount)
  const touchStartX = React.useRef<number | null>(null)

  const go = React.useCallback((direction: 1 | -1) => {
    setOpenIndex((current) => {
      if (current === null) return current
      return (current + direction + galleryD.length) % galleryD.length
    })
  }, [])

  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    // Faza przechwytywania: okno dialogowe zatrzymuje propagację klawiszy,
    // więc zwykły nasłuch na `window` nigdy by nie dostał strzałek.
    window.addEventListener("keydown", onKeyDown, true)
    return () => window.removeEventListener("keydown", onKeyDown, true)
  }, [isOpen, go])

  return (
    <section id="galeria" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        {/* `min-w-0 flex-1` jest konieczne: nagłówek jest kontenerem zapytań
            (`@container`), więc w wierszu flex bez jawnej szerokości
            zwinąłby się do zera. */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="min-w-0 flex-1">
            <SectionHeadD
              index={5}
              eyebrow={galleryCopy.eyebrow}
              title={galleryCopy.title}
            />
          </Reveal>
          <Reveal delay={0.06} className="hidden sm:block">
            <p className="text-sm text-muted-foreground">
              {galleryD.length} zdjęć · Monachium, Paryż, Skopje, kadra
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((item, index) => (
            <Reveal
              as="li"
              key={item.caption}
              delay={Math.min(index % 4, 3) * 0.05}
              className="min-w-0"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-mist ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60 lg:aspect-square"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 46vw"
                  placeholder="blur"
                  style={{ objectPosition: item.position ?? "50% 50%" }}
                  className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
                />
                <span
                  className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy)_82%,transparent),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/85 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-navy uppercase backdrop-blur-sm sm:top-3 sm:left-3">
                  {item.tag}
                </span>
                <span className="absolute inset-x-3 bottom-3 translate-y-2 text-left text-xs leading-snug font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:text-sm">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        {galleryD.length > galleryInitialCount ? (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="xl"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <>
                  <MinusIcon data-icon="inline-start" />
                  {galleryCopy.showLess}
                </>
              ) : (
                <>
                  <PlusIcon data-icon="inline-start" />
                  {galleryCopy.showAll} ({galleryD.length - galleryInitialCount}{" "}
                  więcej)
                </>
              )}
            </Button>
          </div>
        ) : null}
      </Container>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-navy-deep/90 supports-backdrop-filter:backdrop-blur-md"
          className="max-w-[min(94vw,72rem)] gap-0 border-0 bg-transparent p-0 ring-0 sm:max-w-[min(94vw,72rem)]"
        >
          <DialogTitle className="sr-only">
            {active?.caption ?? "Galeria"}
          </DialogTitle>

          {active ? (
            <figure
              className="flex flex-col items-center gap-4"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null
              }}
              onTouchEnd={(event) => {
                const start = touchStartX.current
                const end = event.changedTouches[0]?.clientX
                touchStartX.current = null
                if (start === null || end === undefined) return
                const delta = end - start
                if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1)
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-navy/40">
                <Image
                  src={active.src}
                  alt={active.alt}
                  sizes="94vw"
                  placeholder="blur"
                  className="max-h-[74vh] w-auto object-contain"
                />
              </div>
              <figcaption className="flex w-full items-center justify-between gap-4 rounded-2xl bg-background/90 px-4 py-3 ring-1 ring-foreground/10 backdrop-blur-md">
                <span className="min-w-0 text-sm leading-snug font-medium">
                  {active.caption}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="time mr-1 text-xs text-muted-foreground">
                    {(openIndex ?? 0) + 1} / {galleryD.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={() => go(-1)}
                    aria-label="Poprzednie zdjęcie"
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={() => go(1)}
                    aria-label="Następne zdjęcie"
                  >
                    <ChevronRightIcon />
                  </Button>
                  <DialogClose
                    render={<Button variant="outline" size="icon-lg" />}
                    aria-label="Zamknij galerię"
                  >
                    <XIcon />
                  </DialogClose>
                </span>
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
