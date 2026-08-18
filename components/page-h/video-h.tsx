"use client"

import * as React from "react"
import Image from "next/image"
import { PlayIcon } from "lucide-react"

import type { VideoItem } from "@/data/page-h/media"
import { cn } from "@/lib/utils"

/**
 * Osadzenie nagrania w wersji „fasada": do kliknięcia widać tylko plakat
 * i przycisk odtwarzania (zero skryptów zewnętrznych), po kliknięciu wchodzi
 * iframe — youtube-nocookie.com dla nagrań PZP, facebook.com/plugins/video.php
 * dla publicznych reelsów. Plakaty reelsów są lokalne, więc przed interakcją
 * przeglądarka nie łączy się z serwerami Facebooka.
 */

export function videoEmbedSrc(video: VideoItem) {
  if (video.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=pl`
  }
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false&autoplay=true`
}

export function VideoFrame({
  video,
  className,
}: {
  video: VideoItem
  className?: string
}) {
  return (
    <iframe
      src={videoEmbedSrc(video)}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className={cn("absolute inset-0 size-full border-0", className)}
    />
  )
}

export function VideoH({
  video,
  className,
  compact = false,
  priorityPoster = false,
}: {
  video: VideoItem
  className?: string
  /** Mniejsze podpisy — kafelki ściany mediów. */
  compact?: boolean
  priorityPoster?: boolean
}) {
  const [playing, setPlaying] = React.useState(false)

  return (
    <figure
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl bg-navy-deep ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="relative aspect-video w-full">
        {playing ? (
          <VideoFrame video={video} />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full text-left outline-none focus-visible:ring-3 focus-visible:ring-aqua/70 focus-visible:ring-inset"
            aria-label={`Odtwórz nagranie: ${video.title}`}
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes={
                compact
                  ? "(min-width: 1024px) 45vw, 100vw"
                  : "(min-width: 1024px) 60vw, 100vw"
              }
              priority={priorityPoster}
              quality={90}
              {...(typeof video.poster === "string"
                ? null
                : { placeholder: "blur" as const })}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span
              className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_88%,transparent),color-mix(in_oklab,var(--navy-deep)_25%,transparent)_45%,transparent_75%)]"
              aria-hidden="true"
            />

            {/* Etykieta „wideo" i źródło — lewy górny róg. */}
            <span className="absolute top-3 left-3 flex items-center gap-2 sm:top-4 sm:left-4">
              <span className="eyebrow rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] text-navy">
                Wideo
              </span>
              <span className="eyebrow hidden text-[0.625rem] text-white/80 sm:inline">
                {video.source}
              </span>
            </span>

            {/* Przycisk odtwarzania — środek. */}
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-white/92 text-navy shadow-[0_12px_32px_-8px_rgba(6,23,41,0.6)] ring-1 ring-white/40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 sm:size-20">
                <PlayIcon
                  className="ml-1 size-6 fill-current sm:size-7"
                  aria-hidden="true"
                />
              </span>
            </span>

            {/* Tytuł i kontekst — dół. */}
            <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
              <span
                className={cn(
                  "block font-heading leading-snug font-semibold tracking-tight text-white",
                  compact
                    ? "text-sm sm:text-base"
                    : "text-base sm:text-lg lg:text-xl"
                )}
              >
                {video.title}
              </span>
              <span
                className={cn(
                  "mt-1 block text-white/70",
                  compact ? "text-[0.6875rem] sm:text-xs" : "text-xs sm:text-sm"
                )}
              >
                {video.context}
              </span>
            </span>
          </button>
        )}
      </div>
    </figure>
  )
}
