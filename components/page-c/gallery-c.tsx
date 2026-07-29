"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { gallery, galleryLead } from "@/data/gallery"
import { Reveal } from "@/components/motion/reveal"
import { Shell, Tag } from "@/components/page-c/primitives"

/**
 * Lookbook: jeden kadr na raz, zmienna szerokość i wyrównanie —
 * rytm rozkładówki zamiast równej siatki.
 */
const layouts = [
  "lg:w-7/12",
  "lg:w-5/12 lg:ml-auto",
  "lg:w-6/12 lg:mx-auto",
  "lg:w-8/12",
  "lg:w-5/12 lg:ml-auto",
  "lg:w-6/12",
  "lg:w-7/12 lg:ml-auto",
  "lg:w-5/12",
  "lg:w-8/12 lg:mx-auto",
  "lg:w-6/12 lg:ml-auto",
]

export function GalleryC() {
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
    <section id="galeria">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <Tag index="05">Kadry</Tag>
              <h2 className="serif-c mt-7 text-[clamp(2.5rem,7.5cqw,5rem)]">
                Basen to jej <em>żywioł</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-c-soft">
              {galleryLead}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 sm:gap-24 lg:mt-24">
          {gallery.map((item, index) => (
            <Reveal key={item.caption}>
              <figure className={cn("w-full", layouts[index % layouts.length])}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group block w-full text-left outline-none"
                >
                  <span className="block overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      sizes="(min-width: 1024px) 55vw, 92vw"
                      placeholder="blur"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
                    />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-6">
                    <span className="text-[0.8125rem] text-ink-c-soft transition-colors group-hover:text-ink-c group-focus-visible:text-accent-c">
                      {item.caption}
                    </span>
                    <span
                      className="label-c shrink-0 text-accent-c"
                      aria-hidden="true"
                    >
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                  </span>
                </button>
              </figure>
            </Reveal>
          ))}
        </div>
      </Shell>

      {/* Podgląd na bieli — spójny z resztą wariantu. */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[70] flex flex-col bg-paper-c"
        >
          <div className="mx-auto flex h-16 w-full max-w-[84rem] shrink-0 items-center justify-between px-6 sm:px-10">
            <p className="label-c text-ink-c-soft">
              <span className="text-accent-c">
                {String((openIndex ?? 0) + 1).padStart(2, "0")}
              </span>{" "}
              / {String(gallery.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="flex h-11 items-center rounded-full px-4 text-sm font-medium outline-none hover:text-accent-c focus-visible:text-accent-c"
            >
              Zamknij
            </button>
          </div>

          <figure className="mx-auto flex min-h-0 w-full max-w-[84rem] flex-1 flex-col px-6 pb-8 sm:px-10">
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <Image
                src={active.src}
                alt={active.alt}
                placeholder="blur"
                sizes="92vw"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <figcaption className="mt-5 flex items-center justify-between gap-6 border-t border-line-c pt-5">
              <p className="min-w-0 text-sm text-ink-c-soft">
                {active.caption}
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Poprzednie zdjęcie"
                  className="flex size-11 items-center justify-center rounded-full border border-line-c transition-colors outline-none hover:border-ink-c focus-visible:border-accent-c focus-visible:text-accent-c"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Następne zdjęcie"
                  className="flex size-11 items-center justify-center rounded-full border border-line-c transition-colors outline-none hover:border-ink-c focus-visible:border-accent-c focus-visible:text-accent-c"
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
