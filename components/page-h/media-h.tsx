"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlayIcon,
  PlusIcon,
  XIcon,
} from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react"

import { media as copy } from "@/data/page-e/copy"
import { mediaExtras } from "@/data/page-h/copy"
import {
  mediaInitialCount,
  mediaItems,
  type MediaItem,
  type PhotoItem,
  type VideoItem,
} from "@/data/page-h/media"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Reveal } from "@/components/motion/reveal"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { InstagramGlyph } from "@/components/page-h/instagram-glyph"
import { VideoFrame } from "@/components/page-h/video-h"

type FilterKey = (typeof copy.filters)[number]["key"]

const matches = (item: MediaItem, filter: FilterKey) => {
  if (filter === "all") return true
  if (filter === "video") return item.type === "video"
  return item.tags.includes(filter as MediaItem["tags"][number])
}

/* Rozpiętości kafelków. Wysokość rzędu liczy się z szerokości siatki
   (jednostki cqw), więc kafelki „wide" (8 kolumn) i „square" (4 kolumny)
   zawsze mają tę samą wysokość, a „tall" zajmuje dokładnie dwa rzędy. */
const spanClass: Record<MediaItem["size"], string> = {
  wide: "col-span-4 row-span-1 lg:col-span-8",
  tall: "col-span-2 row-span-2 lg:col-span-4",
  square: "col-span-2 row-span-1 lg:col-span-4",
}

/**
 * 05 — Media. Ściana zdjęć i nagrań na siatce 12 kolumn z filtrami
 * (animowany reflow), lightboxem dla zdjęć i odtwarzaniem wideo w kafelku.
 * Wersja H: w ścianie są też dwa publiczne reelsy z Facebooka (pionowy kafel
 * „tall" i kadr z transmisji), a pod ścianą — artykuł Przeglądu Sportowego
 * i profil Barbary na Instagramie.
 */
export function MediaH() {
  const [filter, setFilter] = React.useState<FilterKey>("all")
  const [expanded, setExpanded] = React.useState(false)
  const [playingId, setPlayingId] = React.useState<string | null>(null)
  const [openPhoto, setOpenPhoto] = React.useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  const filtered = React.useMemo(
    () => mediaItems.filter((item) => matches(item, filter)),
    [filter]
  )
  const visible = expanded ? filtered : filtered.slice(0, mediaInitialCount)
  const hiddenCount = filtered.length - visible.length
  const photos = visible.filter(
    (item): item is PhotoItem => item.type === "photo"
  )
  const openIndex = openPhoto
    ? photos.findIndex((photo) => photo.id === openPhoto)
    : -1
  const active = openIndex >= 0 ? photos[openIndex] : null

  const go = React.useCallback(
    (direction: 1 | -1) => {
      if (openIndex < 0 || photos.length === 0) return
      const next = (openIndex + direction + photos.length) % photos.length
      setOpenPhoto(photos[next].id)
    },
    [openIndex, photos]
  )

  React.useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    // Faza przechwytywania: okno dialogowe zatrzymuje propagację klawiszy,
    // więc zwykły nasłuch na `window` nigdy by nie dostał strzałek.
    window.addEventListener("keydown", onKeyDown, true)
    return () => window.removeEventListener("keydown", onKeyDown, true)
  }, [active, go])

  const changeFilter = (key: FilterKey) => {
    setFilter(key)
    setExpanded(false)
    setPlayingId(null)
  }

  return (
    <Chapter id="media" index={5} tone="light">
      <Frame className={chapterPadding}>
        <Reveal>
          <ChapterHead
            index={5}
            label={copy.label}
            title={copy.title}
            lead={copy.lead}
            aside={
              <div
                role="tablist"
                aria-label="Filtruj materiały"
                className="flex flex-wrap gap-2"
              >
                {copy.filters.map((entry) => {
                  const isActive = entry.key === filter
                  const count = mediaItems.filter((item) =>
                    matches(item, entry.key)
                  ).length
                  return (
                    <button
                      key={entry.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => changeFilter(entry.key)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        isActive
                          ? "border-navy bg-navy text-white"
                          : "border-border bg-background text-foreground/80 hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {entry.label}
                      <span
                        className={cn(
                          "board-e text-xs",
                          isActive ? "text-white/70" : "text-muted-foreground"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            }
          />
        </Reveal>

        {/* Wrapper jest kontenerem zapytań: jednostki cqw w `grid-auto-rows`
            liczą się względem PRZODKA, nie własnego pudełka siatki. */}
        <LayoutGroup>
          <div className="@container mt-14 sm:mt-20 lg:mt-24">
            <motion.ul
              layout={!reduceMotion}
              className="grid [grid-auto-flow:dense] [grid-auto-rows:calc((100cqw_-_1rem)_/_2)] grid-cols-4 gap-4 sm:[grid-auto-rows:calc((100cqw_-_1.5rem)_/_2)] sm:gap-6 lg:[grid-auto-rows:calc((100cqw_-_4rem)_/_3)] lg:grid-cols-12 lg:gap-8"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((item) => (
                  <motion.li
                    key={item.id}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.96 }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "relative min-h-0 min-w-0",
                      spanClass[item.size],
                      // Sam filtr „Wideo": nagrania po dwa w rzędzie zamiast
                      // jednego z dziurą (pionowy reel zostaje na 4 kolumnach).
                      filter === "video" &&
                        item.type === "video" &&
                        item.size === "wide" &&
                        "lg:col-span-6"
                    )}
                  >
                    {item.type === "photo" ? (
                      <PhotoTile
                        item={item}
                        onOpen={() => setOpenPhoto(item.id)}
                      />
                    ) : (
                      <VideoTile
                        item={item}
                        playing={playingId === item.id}
                        onPlay={() => setPlayingId(item.id)}
                      />
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </LayoutGroup>

        {filtered.length > mediaInitialCount ? (
          <div className="mt-8 flex justify-center sm:mt-10">
            <Button
              variant="outline"
              size="xl"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <>
                  <MinusIcon data-icon="inline-start" />
                  {copy.showLess}
                </>
              ) : (
                <>
                  <PlusIcon data-icon="inline-start" />
                  {copy.showMore} ({hiddenCount})
                </>
              )}
            </Button>
          </div>
        ) : null}

        {/* Prasa i media społecznościowe — dopełnienie ściany. */}
        <Grid className="mt-14 gap-y-4 sm:mt-16 sm:gap-y-6 lg:mt-20">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-8">
            <a
              href={mediaExtras.press.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-border p-6 transition-colors outline-none hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-8"
            >
              <div>
                <p className="eyebrow text-muted-foreground">
                  {mediaExtras.press.eyebrow}
                </p>
                <p className="mt-4 font-heading text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl lg:text-[1.75rem]">
                  {mediaExtras.press.title}
                </p>
                <p className="mt-4 max-w-[64ch] border-l-2 border-gold/60 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {mediaExtras.press.excerpt}
                </p>
              </div>
              <p className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                  {mediaExtras.press.cta}
                  <ArrowUpRightIcon
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="board-e text-xs text-muted-foreground">
                  {mediaExtras.press.date}
                </span>
              </p>
            </a>
          </Reveal>

          <Reveal
            delay={0.06}
            className="col-span-4 sm:col-span-8 lg:col-span-4"
          >
            <a
              href={mediaExtras.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="on-deep group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-navy-deep p-6 text-white ring-1 ring-white/10 outline-none focus-visible:ring-3 focus-visible:ring-aqua/70 sm:p-8"
            >
              <span
                className="water-e pointer-events-none absolute inset-0 opacity-70"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="eyebrow text-white/70">
                  {mediaExtras.instagram.eyebrow}
                </p>
                <p className="mt-4 flex items-center gap-3">
                  <InstagramGlyph className="size-6 text-aqua" />
                  <span className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                    {mediaExtras.instagram.handle}
                  </span>
                </p>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-white/75">
                  {mediaExtras.instagram.text}
                </p>
              </div>
              <p className="relative inline-flex items-center gap-1.5 text-sm font-medium text-aqua">
                {mediaExtras.instagram.cta}
                <ArrowUpRightIcon
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </p>
            </a>
          </Reveal>
        </Grid>
      </Frame>

      {/* Lightbox zdjęć. */}
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setOpenPhoto(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-navy-deep/90 supports-backdrop-filter:backdrop-blur-md"
          className="max-w-[min(94vw,76rem)] gap-0 border-0 bg-transparent p-0 ring-0 sm:max-w-[min(94vw,76rem)]"
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
                  quality={90}
                  className="max-h-[76vh] w-auto object-contain"
                />
              </div>
              <figcaption className="flex w-full items-center justify-between gap-4 rounded-2xl bg-background/90 px-4 py-3 ring-1 ring-foreground/10 backdrop-blur-md">
                <span className="min-w-0 text-sm leading-snug font-medium">
                  {active.caption}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="board-e mr-1 text-xs text-muted-foreground">
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
    </Chapter>
  )
}

function PhotoTile({ item, onOpen }: { item: PhotoItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group absolute inset-0 block size-full overflow-hidden rounded-2xl bg-mist text-left ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={
          item.size === "wide"
            ? "(min-width: 1024px) 60vw, 100vw"
            : "(min-width: 1024px) 30vw, 50vw"
        }
        placeholder="blur"
        quality={90}
        style={{ objectPosition: item.position ?? "50% 50%" }}
        className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
      />
      <span
        className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy)_82%,transparent),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
      <span className="absolute top-3 left-3 rounded-full bg-white/88 px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-navy uppercase backdrop-blur-sm sm:top-4 sm:left-4">
        {item.tag}
      </span>
      <span className="absolute inset-x-3 bottom-3 translate-y-2 text-left text-xs leading-snug font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inset-x-4 sm:bottom-4 sm:text-sm">
        {item.caption}
      </span>
    </button>
  )
}

function VideoTile({
  item,
  playing,
  onPlay,
}: {
  item: VideoItem
  playing: boolean
  onPlay: () => void
}) {
  return (
    <div className="group absolute inset-0 overflow-hidden rounded-2xl bg-navy-deep ring-1 ring-foreground/10">
      {playing ? (
        <VideoFrame video={item} />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 size-full text-left outline-none focus-visible:ring-3 focus-visible:ring-aqua/70 focus-visible:ring-inset"
          aria-label={`Odtwórz nagranie: ${item.title}`}
        >
          <Image
            src={item.poster}
            alt=""
            fill
            sizes={
              item.size === "wide"
                ? "(min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1024px) 30vw, 50vw"
            }
            quality={90}
            {...(typeof item.poster === "string"
              ? null
              : { placeholder: "blur" as const })}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_90%,transparent),color-mix(in_oklab,var(--navy-deep)_25%,transparent)_50%,transparent_80%)]"
            aria-hidden="true"
          />
          <span className="absolute top-3 left-3 flex items-center gap-2 sm:top-4 sm:left-4">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-navy uppercase">
              Wideo
            </span>
            <span className="hidden text-[0.625rem] font-semibold tracking-wide text-white/80 uppercase sm:inline">
              {item.tag}
            </span>
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white/92 text-navy shadow-[0_12px_32px_-8px_rgba(6,23,41,0.6)] ring-1 ring-white/40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 sm:size-16">
              <PlayIcon
                className="ml-0.5 size-5 fill-current sm:size-6"
                aria-hidden="true"
              />
            </span>
          </span>
          <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
            <span className="line-clamp-1 block font-heading text-sm leading-snug font-semibold tracking-tight text-white sm:line-clamp-2 sm:text-base">
              {item.title}
            </span>
            <span className="mt-1 hidden text-[0.6875rem] text-white/70 sm:block sm:text-xs">
              {item.source} · {item.context}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
