"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

import { gallery, galleryLead } from "@/data/gallery"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Reveal } from "@/components/motion/reveal"
import { Container, SectionHeading } from "@/components/site/primitives"

export function Gallery() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const isOpen = openIndex !== null
  const active = isOpen ? gallery[openIndex] : null

  const go = React.useCallback((direction: 1 | -1) => {
    setOpenIndex((current) => {
      if (current === null) return current
      return (current + direction + gallery.length) % gallery.length
    })
  }, [])

  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, go])

  return (
    <section id="galeria" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Galeria"
            title="Kadry z basenu i podium"
            lead={galleryLead}
          />
        </Reveal>

        <div className="mt-14 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((item, index) => (
            <Reveal
              key={item.caption}
              delay={Math.min(index, 5) * 0.04}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-mist ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  placeholder="blur"
                  className="h-auto w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
                />
                <span
                  className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy)_80%,transparent),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-4 bottom-4 translate-y-2 text-left text-sm leading-snug font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-navy-deep/85 supports-backdrop-filter:backdrop-blur-md"
          className="max-w-[min(94vw,72rem)] gap-0 border-0 bg-transparent p-0 ring-0 sm:max-w-[min(94vw,72rem)]"
        >
          <DialogTitle className="sr-only">
            {active?.caption ?? "Galeria"}
          </DialogTitle>

          {active ? (
            <figure className="flex flex-col items-center gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-navy/40">
                <Image
                  src={active.src}
                  alt={active.alt}
                  sizes="94vw"
                  placeholder="blur"
                  className="max-h-[76vh] w-auto object-contain"
                />
              </div>
              <figcaption className="flex w-full items-center justify-between gap-4 rounded-2xl bg-background/90 px-4 py-3 ring-1 ring-foreground/10 backdrop-blur-md">
                <span className="min-w-0 text-sm leading-snug font-medium">
                  {active.caption}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="time mr-1 text-xs text-muted-foreground">
                    {(openIndex ?? 0) + 1} / {gallery.length}
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
