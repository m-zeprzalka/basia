"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { gallery, galleryLead } from "@/data/gallery"
import { Frame, Marker } from "@/components/page-b/primitives"

/** Rytm siatki: co trzeci kadr zajmuje dwie kolumny — układ nie jest regularny. */
const wide = new Set([1, 4, 8])

export function GalleryB() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const isOpen = openIndex !== null
  const active = isOpen ? gallery[openIndex] : null

  const go = React.useCallback((direction: 1 | -1) => {
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + direction + gallery.length) % gallery.length
    )
  }, [])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null)
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, go])

  return (
    <section id="kadry" className="scroll-mt-16 border-b border-line-b">
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <Marker index="05">Kadry</Marker>
            <h2 className="display-b mt-6 text-[clamp(2.5rem,10cqw,4.5rem)]">
              <span className="block">Basen to jej</span>
              <span className="outline-b block">żywioł</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-b-soft">
            {galleryLead}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <li
              key={item.caption}
              className={cn(wide.has(index) && "col-span-2")}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-paper-b"
              >
                <div
                  className={cn(
                    "duotone relative w-full overflow-hidden",
                    wide.has(index) ? "aspect-[16/10]" : "aspect-[4/5]"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mono-b mt-3 flex items-start gap-2 text-ink-b-soft transition-colors group-hover:text-ink-b">
                  <span className="text-electric">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tracking-normal normal-case">
                    {item.caption}
                  </span>
                </p>
              </button>
            </li>
          ))}
        </ul>
      </Frame>

      {/* Podgląd pełnoekranowy — bez ramek i zaokrągleń, jak reszta wariantu. */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="on-ink fixed inset-0 z-[70] flex flex-col bg-ink-b/97 text-paper-b"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <p className="mono-b">
              <span className="text-electric-soft">
                {String((openIndex ?? 0) + 1).padStart(2, "0")}
              </span>{" "}
              / {String(gallery.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="mono-b flex h-10 items-center gap-2 border border-paper-b/40 px-3 transition-colors outline-none hover:bg-paper-b hover:text-ink-b focus-visible:bg-paper-b focus-visible:text-ink-b"
            >
              Zamknij ✕
            </button>
          </div>

          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-5 pb-6 sm:px-8">
            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              <Image
                src={active.src}
                alt={active.alt}
                placeholder="blur"
                sizes="92vw"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <figcaption className="flex w-full items-center justify-between gap-6">
              <p className="min-w-0 text-sm">{active.caption}</p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Poprzednie zdjęcie"
                  className="flex size-10 items-center justify-center border border-paper-b/40 transition-colors outline-none hover:bg-paper-b hover:text-ink-b focus-visible:bg-paper-b focus-visible:text-ink-b"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Następne zdjęcie"
                  className="flex size-10 items-center justify-center border border-paper-b/40 transition-colors outline-none hover:bg-paper-b hover:text-ink-b focus-visible:bg-paper-b focus-visible:text-ink-b"
                >
                  →
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  )
}
