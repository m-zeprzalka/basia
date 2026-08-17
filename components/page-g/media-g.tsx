"use client"

import * as React from "react"
import Image from "next/image"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  XIcon,
} from "lucide-react"
import { motion } from "motion/react"

import { mediaItems, type PhotoItem, type VideoItem } from "@/data/page-e/media"
import { mediaG } from "@/data/page-g/copy"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Reveal } from "@/components/motion/reveal"
import { Frame } from "@/components/page-e/frame-e"
import { ChapterHeadG, SectionG } from "@/components/page-g/section-g"

/**
 * 05 — Taśma. Jedna pozioma wstęga zdjęć i nagrań: przeciąganie myszą,
 * przesunięcie palcem, strzałki i pasek postępu. Zdjęcia otwierają lightbox,
 * nagrania grają w miejscu.
 */
export function MediaG() {
  const stripRef = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [openPhoto, setOpenPhoto] = React.useState<string | null>(null)
  const [playing, setPlaying] = React.useState<string | null>(null)
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(
    null
  )

  const photos = mediaItems.filter(
    (item): item is PhotoItem => item.type === "photo"
  )
  const openIndex = openPhoto
    ? photos.findIndex((photo) => photo.id === openPhoto)
    : -1
  const active = openIndex >= 0 ? photos[openIndex] : null

  const go = React.useCallback(
    (direction: 1 | -1) => {
      if (openIndex < 0) return
      setOpenPhoto(
        photos[(openIndex + direction + photos.length) % photos.length].id
      )
    },
    [openIndex, photos]
  )

  React.useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKeyDown, true)
    return () => window.removeEventListener("keydown", onKeyDown, true)
  }, [active, go])

  // Postęp taśmy — pasek pod nią. Kółka myszy nie przechwytujemy: pionowe
  // przewijanie zawsze przewija stronę (trackpad i shift+kółko dają poziom
  // natywnie, do tego przeciąganie i strzałki).
  React.useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const onScroll = () => {
      const max = strip.scrollWidth - strip.clientWidth
      setProgress(max > 0 ? strip.scrollLeft / max : 0)
    }
    strip.addEventListener("scroll", onScroll, { passive: true })
    return () => strip.removeEventListener("scroll", onScroll)
  }, [])

  const scrollBy = (direction: 1 | -1) => {
    const strip = stripRef.current
    if (!strip) return
    strip.scrollBy({
      left: direction * strip.clientWidth * 0.7,
      behavior: "smooth",
    })
  }

  return (
    <SectionG id="media" index={5} className="overflow-hidden">
      <Frame className="pt-24 sm:pt-32 lg:pt-40">
        <ChapterHeadG
          index={mediaG.index}
          label={mediaG.label}
          title={mediaG.title}
          lead={mediaG.lead}
        />
      </Frame>

      <Reveal delay={0.08}>
        {/* Taśma zaczyna się na lewej krawędzi ramy i wybiega za prawą — świadome krwawienie. */}
        <div
          ref={stripRef}
          data-cursor={mediaG.drag}
          className="mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-6 select-none sm:mt-16 sm:gap-4 sm:px-8 lg:mt-20 lg:px-12 2xl:px-16 [&::-webkit-scrollbar]:hidden"
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") return
            const strip = stripRef.current
            if (!strip) return
            drag.current = {
              x: event.clientX,
              left: strip.scrollLeft,
              moved: false,
            }
          }}
          onPointerMove={(event) => {
            const strip = stripRef.current
            if (!drag.current || !strip) return
            const dx = event.clientX - drag.current.x
            if (Math.abs(dx) > 4) drag.current.moved = true
            strip.scrollLeft = drag.current.left - dx
          }}
          onPointerUp={() => {
            drag.current = null
          }}
          onPointerLeave={() => {
            drag.current = null
          }}
          onClickCapture={(event) => {
            // Po przeciągnięciu nie otwieramy kafelka.
            if (drag.current?.moved) event.preventDefault()
          }}
        >
          {mediaItems.map((item) =>
            item.type === "photo" ? (
              <PhotoCard
                key={item.id}
                item={item}
                onOpen={() => setOpenPhoto(item.id)}
              />
            ) : (
              <VideoCard
                key={item.id}
                item={item}
                playing={playing === item.id}
                onPlay={() => setPlaying(item.id)}
              />
            )
          )}
          <div className="w-px shrink-0" aria-hidden="true" />
        </div>
      </Reveal>

      <Frame className="pb-24 sm:pb-32 lg:pb-40">
        <div className="mt-4 flex items-center justify-between gap-6">
          <div className="h-px flex-1 bg-ink-g/12">
            <motion.span
              className="block h-full bg-red-g"
              animate={{ width: `${Math.max(progress, 0.02) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full border-ink-g/20 bg-transparent hover:bg-ink-g/5"
              onClick={() => scrollBy(-1)}
              aria-label="Przewiń w lewo"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full border-ink-g/20 bg-transparent hover:bg-ink-g/5"
              onClick={() => scrollBy(1)}
              aria-label="Przewiń w prawo"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </Frame>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setOpenPhoto(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/90 supports-backdrop-filter:backdrop-blur-md"
          className="max-w-[min(94vw,76rem)] gap-0 border-0 bg-transparent p-0 ring-0 sm:max-w-[min(94vw,76rem)]"
        >
          <DialogTitle className="sr-only">
            {active?.caption ?? "Galeria"}
          </DialogTitle>
          {active ? (
            <figure className="flex flex-col items-center gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-black/40">
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
                  <span className="board-f mr-1 text-xs text-muted-foreground">
                    {openIndex + 1} / {photos.length}
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
    </SectionG>
  )
}

function PhotoCard({ item, onOpen }: { item: PhotoItem; onOpen: () => void }) {
  const portrait = item.size === "tall"
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="Powiększ"
      className={cn(
        "group relative h-[52vh] shrink-0 snap-start overflow-hidden rounded-2xl bg-paper-g-2 text-left ring-1 ring-ink-g/10 outline-none focus-visible:ring-3 focus-visible:ring-red-g/70 sm:h-[58vh] lg:h-[64vh]",
        portrait ? "aspect-[4/5]" : "aspect-[3/2]"
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={
          portrait
            ? "(min-width: 1024px) 34vw, 60vw"
            : "(min-width: 1024px) 50vw, 85vw"
        }
        placeholder="blur"
        draggable={false}
        style={{ objectPosition: item.position ?? "50% 50%" }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.85),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="tag-f absolute top-4 left-4 rounded-full bg-paper-g/80 px-2.5 py-1 text-[0.5625rem] text-ink-g backdrop-blur">
        {item.tag}
      </span>
      <span className="absolute inset-x-4 bottom-4 translate-y-2 text-sm font-medium text-ink-g opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {item.caption}
      </span>
    </button>
  )
}

function VideoCard({
  item,
  playing,
  onPlay,
}: {
  item: VideoItem
  playing: boolean
  onPlay: () => void
}) {
  const src = `https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=pl`
  return (
    <div className="group relative aspect-video h-[52vh] shrink-0 snap-start overflow-hidden rounded-2xl bg-paper-g-2 ring-1 ring-ink-g/10 sm:h-[58vh] lg:h-[64vh]">
      {playing ? (
        <iframe
          src={src}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          data-cursor="Odtwórz"
          className="absolute inset-0 size-full text-left outline-none focus-visible:ring-3 focus-visible:ring-red-g/70 focus-visible:ring-inset"
          aria-label={`Odtwórz nagranie: ${item.title}`}
        >
          <Image
            src={item.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 90vw"
            draggable={false}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.92),rgba(5,10,20,0.25)_50%,transparent_80%)]"
            aria-hidden="true"
          />
          <span className="absolute top-4 left-4 flex items-center gap-2">
            <span className="tag-f rounded-full bg-paper-g px-2.5 py-1 text-[0.5625rem] text-ink-g">
              Wideo
            </span>
            <span className="tag-f text-[0.5625rem] text-ink-g/80">
              {item.tag}
            </span>
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-paper-g text-ink-g shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 sm:size-20">
              <PlayIcon
                className="ml-1 size-6 fill-current sm:size-7"
                aria-hidden="true"
              />
            </span>
          </span>
          <span className="absolute inset-x-4 bottom-4">
            <span className="line-clamp-2 block font-heading text-sm leading-snug font-semibold tracking-tight text-ink-g sm:text-base">
              {item.title}
            </span>
            <span className="mt-1 block text-[0.6875rem] text-ink-g/65 sm:text-xs">
              {item.source} · {item.context}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
