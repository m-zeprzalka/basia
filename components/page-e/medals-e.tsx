"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRightIcon, PlayIcon, XIcon } from "lucide-react"

import type { Milestone } from "@/data/achievements"
import { medals } from "@/data/page-e/copy"
import {
  medalCards,
  recordMilestones,
  type MedalCard,
} from "@/data/page-e/medal-wall"
import { recordsSummary } from "@/data/records"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Reveal } from "@/components/motion/reveal"
import { RecordsCompact } from "@/components/page-d/medals-d"
import { Medal, PlaceMark, medalLabel } from "@/components/page-d/primitives-d"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { VideoE } from "@/components/page-e/video-e"

/**
 * 03 — Ściana medali. Cztery karty imprez (zdjęcie lub kadr z nagrania,
 * prawdziwe medale w rogu), pod nimi pas rekordów Polski. Karta otwiera
 * okno z pełnymi wynikami i — tam, gdzie są — nagraniami PZP.
 */
export function MedalsE() {
  const [openKey, setOpenKey] = React.useState<string | null>(null)
  const [recordsOpen, setRecordsOpen] = React.useState(false)
  const openCard = medalCards.find((card) => card.key === openKey) ?? null

  return (
    <Chapter id="medale" index={3} tone="light">
      <Frame className={chapterPadding}>
        <Reveal>
          <ChapterHead
            index={3}
            label={medals.label}
            title={medals.title}
            lead={medals.lead}
            aside={
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {medals.shelf.map((entry) => (
                  <li key={entry.medal} className="flex items-center gap-3">
                    <Medal medal={entry.medal} className="size-9" />
                    <span className="board-e text-2xl font-medium text-navy">
                      {entry.count}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {entry.label}
                    </span>
                  </li>
                ))}
              </ul>
            }
          />
        </Reveal>

        {/* Karty imprez — 2 kolumny na mobile, 4 na desktopie. */}
        <Grid className="mt-14 gap-y-4 sm:mt-20 sm:gap-y-6 lg:mt-24">
          {medalCards.map((card, index) => (
            <Reveal
              key={card.key}
              delay={index * 0.06}
              className="col-span-2 sm:col-span-4 lg:col-span-3"
            >
              <MedalCardTile card={card} onOpen={() => setOpenKey(card.key)} />
            </Reveal>
          ))}
        </Grid>

        {/* Pas rekordów Polski. */}
        <Reveal delay={0.1}>
          <Grid className="mt-4 sm:mt-6">
            <div className="col-span-4 grid gap-6 rounded-2xl border border-border p-5 sm:col-span-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7 lg:col-span-12 lg:p-8">
              <div className="flex items-baseline gap-4 sm:block">
                <p className="board-e text-5xl font-medium text-navy sm:text-6xl">
                  {medals.recordsCard.value}
                </p>
                <p className="font-heading text-lg font-semibold tracking-tight sm:mt-2">
                  {medals.recordsCard.title}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  {medals.recordsCard.sub}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {recordsSummary.breakdown.map((item) => (
                    <li
                      key={item.category}
                      className="flex items-baseline gap-2 text-sm"
                    >
                      <span className="board-e font-medium text-navy">
                        {item.count}
                      </span>
                      <span className="text-muted-foreground">
                        w kategorii {item.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                size="xl"
                onClick={() => setRecordsOpen(true)}
                className="justify-self-start sm:justify-self-end"
              >
                {medals.recordsCard.cta}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </Grid>
        </Reveal>
      </Frame>

      {/* Okno karty imprezy. */}
      <Dialog
        open={openCard !== null}
        onOpenChange={(open) => {
          if (!open) setOpenKey(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-navy-deep/70 supports-backdrop-filter:backdrop-blur-sm"
          className="max-h-[92svh] max-w-[min(94vw,52rem)] gap-0 overflow-y-auto p-0 sm:max-w-[min(94vw,52rem)]"
        >
          {openCard ? (
            <MilestoneSheet card={openCard} />
          ) : (
            <DialogTitle className="sr-only">Wyniki</DialogTitle>
          )}
        </DialogContent>
      </Dialog>

      {/* Okno tabel rekordów. */}
      <Dialog open={recordsOpen} onOpenChange={setRecordsOpen}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-navy-deep/70 supports-backdrop-filter:backdrop-blur-sm"
          className="max-h-[92svh] max-w-[min(94vw,64rem)] gap-0 overflow-y-auto p-0 sm:max-w-[min(94vw,64rem)]"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
            <div>
              <DialogTitle className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
                Rekordy Polski — pełne tabele PZP
              </DialogTitle>
              <DialogDescription className="mt-1">
                Stan na {site.dataAsOf}. Zestawienie nie obejmuje rekordów
                sztafetowych ani ustanowionych w wieku 14 lat.
              </DialogDescription>
            </div>
            <DialogClose
              render={<Button variant="outline" size="icon-lg" />}
              aria-label="Zamknij"
            >
              <XIcon />
            </DialogClose>
          </div>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <RecordsCompact />
            <div className="mt-10 border-t border-border pt-8">
              <h4 className="eyebrow text-muted-foreground">
                Kamienie milowe bez medali
              </h4>
              <ul className="mt-4 grid gap-6 sm:grid-cols-3">
                {recordMilestones.map((milestone) => (
                  <li
                    key={milestone.id}
                    className="rounded-2xl border border-border p-4"
                  >
                    <p className="font-heading text-base font-semibold tracking-tight">
                      {milestone.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {milestone.location} · {milestone.period}
                    </p>
                    <ul className="mt-3 divide-y divide-border/70">
                      {milestone.results.map((result) => (
                        <li
                          key={result.event}
                          className="flex items-baseline justify-between gap-3 py-2 text-sm"
                        >
                          <span className="min-w-0">
                            {result.event}
                            {result.note ? (
                              <span className="block text-xs text-muted-foreground">
                                {result.note}
                              </span>
                            ) : null}
                          </span>
                          {result.time ? (
                            <span className="board-e font-medium text-navy">
                              {result.time}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Chapter>
  )
}

function MedalCardTile({
  card,
  onOpen,
}: {
  card: MedalCard
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-navy text-left ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:aspect-[4/5]",
        card.featured && "ring-gold/40"
      )}
      aria-label={`${card.title}, ${card.sub} — zobacz wyniki`}
    >
      {card.media.kind === "photo" ? (
        <Image
          src={card.media.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 50vw"
          placeholder="blur"
          style={{ objectPosition: card.media.position ?? "50% 50%" }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={card.media.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      <span
        className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--navy-deep)_92%,transparent),color-mix(in_oklab,var(--navy-deep)_35%,transparent)_45%,color-mix(in_oklab,var(--navy-deep)_20%,transparent)_100%)]"
        aria-hidden="true"
      />

      {/* Medale — lewy górny róg. */}
      <span className="absolute top-3 left-3 flex -space-x-1.5 sm:top-4 sm:left-4">
        {card.medals.map((medal, index) => (
          <Medal
            key={`${medal}-${index}`}
            medal={medal}
            className="size-8 drop-shadow-md sm:size-9"
          />
        ))}
      </span>
      {card.videos.length > 0 ? (
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-navy sm:top-4 sm:right-4 sm:size-9">
          <PlayIcon
            className="ml-0.5 size-3.5 fill-current"
            aria-hidden="true"
          />
          <span className="sr-only">Nagranie</span>
        </span>
      ) : null}

      <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
        <span className="block font-heading text-sm leading-snug font-semibold tracking-tight text-white sm:text-base lg:text-lg">
          {card.title}
        </span>
        <span className="mt-1 block text-xs text-white/70 sm:text-sm">
          {card.sub}
        </span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/85">
          {card.medals.length}{" "}
          {card.medals.length === 1
            ? "medal"
            : card.medals.length < 5
              ? "medale"
              : "medali"}
          <ArrowUpRightIcon
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  )
}

export function MilestoneSheet({ card }: { card: MedalCard }) {
  const milestone: Milestone = card.milestone
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="min-w-0">
          <DialogTitle className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
            {milestone.title}
          </DialogTitle>
          <DialogDescription className="mt-1">
            {milestone.location} · {milestone.period}
          </DialogDescription>
        </div>
        <DialogClose
          render={<Button variant="outline" size="icon-lg" />}
          aria-label="Zamknij"
        >
          <XIcon />
        </DialogClose>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <ul className="divide-y divide-border border-y border-border">
          {milestone.results.map((result) => (
            <li
              key={`${result.event}-${result.time ?? ""}`}
              className="grid grid-cols-[2.75rem_1fr] items-center gap-x-4 py-3.5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6"
            >
              <span className="flex items-center justify-center">
                {result.medal ? (
                  <Medal medal={result.medal} className="size-10" />
                ) : result.place ? (
                  <PlaceMark
                    place={result.place.replace(".", "")}
                    className="text-slate"
                  />
                ) : (
                  <span
                    className="size-2 rounded-full bg-azure"
                    aria-hidden="true"
                  />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[0.9375rem] leading-snug font-medium">
                  {result.event}
                  {result.medal ? (
                    <span className="sr-only">
                      {" "}
                      — {medalLabel(result.medal)}
                    </span>
                  ) : null}
                </p>
                {result.note ? (
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {result.note}
                  </p>
                ) : null}
              </div>
              {result.time ? (
                <p className="board-e col-start-2 mt-1 text-lg font-medium text-navy sm:col-start-3 sm:mt-0 sm:text-xl">
                  {result.time}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        {milestone.summary ? (
          <p className="mt-5 max-w-2xl border-l-2 border-gold/60 pl-4 text-sm leading-relaxed text-graphite">
            {milestone.summary}
          </p>
        ) : null}

        {card.videos.length > 0 ? (
          <div className="mt-8">
            <h4 className="eyebrow text-muted-foreground">
              Nagrania · Polski Związek Pływacki
            </h4>
            <div
              className={cn(
                "mt-4 grid gap-4",
                card.videos.length > 1 && "sm:grid-cols-2"
              )}
            >
              {card.videos.map((video) => (
                <VideoE key={video.id} video={video} compact />
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted-foreground">
          {medals.dialogHint}.
        </p>
      </div>
    </div>
  )
}
