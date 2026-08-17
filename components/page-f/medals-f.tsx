"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRightIcon, XIcon } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

import { medalsF } from "@/data/page-f/copy"
import { medalCards, type MedalCard } from "@/data/page-e/medal-wall"
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
import { Medal } from "@/components/page-d/primitives-d"
import { Frame } from "@/components/page-e/frame-e"
import { MilestoneSheet } from "@/components/page-e/medals-e"
import { ChapterHeadF, SectionF } from "@/components/page-f/section-f"

/**
 * 03 — Medale jako lista startowa: wiersz na imprezę, medale prawdziwe,
 * a nad wierszem — pływający kadr, który podąża za wskaźnikiem (mysz).
 * Na dotyku każdy wiersz ma miniaturę. Kliknięcie otwiera pełne wyniki
 * i nagrania (to samo okno co w wariancie E).
 */
export function MedalsF() {
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [openKey, setOpenKey] = React.useState<string | null>(null)
  const [recordsOpen, setRecordsOpen] = React.useState(false)
  const openCard = medalCards.find((card) => card.key === openKey) ?? null

  const listRef = React.useRef<HTMLOListElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  const onMove = (event: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const hoveredCard = medalCards.find((card) => card.key === hovered) ?? null

  return (
    <SectionF id="medale" index={3} className="lanes-f">
      <Frame className="py-24 sm:py-32 lg:py-40">
        <ChapterHeadF
          index={medalsF.index}
          label={medalsF.label}
          title={medalsF.title}
          lead={medalsF.lead}
        />

        <Reveal delay={0.08}>
          <div className="relative mt-14 sm:mt-20 lg:mt-24">
            <ol
              ref={listRef}
              onMouseMove={onMove}
              onMouseLeave={() => setHovered(null)}
              className="relative divide-y divide-white/10 border-y border-white/10"
            >
              {medalCards.map((card, index) => (
                <li key={card.key}>
                  <button
                    type="button"
                    data-cursor="Wyniki"
                    onMouseEnter={() => setHovered(card.key)}
                    onFocus={() => setHovered(card.key)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setOpenKey(card.key)}
                    className={cn(
                      "group grid w-full grid-cols-[3rem_1fr] items-center gap-x-4 py-6 text-left transition-colors outline-none focus-visible:text-aqua-f sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8 sm:py-8",
                      hovered && hovered !== card.key && "opacity-45"
                    )}
                    aria-label={`${card.title}, ${card.sub} — zobacz wyniki`}
                  >
                    <span className="tag-f text-gold-f">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="condensed-f text-[clamp(2rem,6vw,4.5rem)] transition-colors group-hover:text-aqua-f">
                          {card.title}
                        </span>
                        {/* Miniatura tylko na dotyku (poniżej lg). */}
                        <span className="relative hidden aspect-[4/3] w-24 overflow-hidden rounded-lg ring-1 ring-white/10 max-lg:inline-block sm:w-32">
                          <Thumb card={card} />
                        </span>
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-chalk-f/60">
                        <span>{card.sub}</span>
                        <span className="flex -space-x-1.5">
                          {card.medals.map((medal, medalIndex) => (
                            <Medal
                              key={`${medal}-${medalIndex}`}
                              medal={medal}
                              className="size-7"
                            />
                          ))}
                        </span>
                        {card.videos.length > 0 ? (
                          <span className="tag-f text-[0.5625rem] text-aqua-f">
                            Wideo
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span className="hidden items-center gap-2 text-sm text-chalk-f/60 transition-colors group-hover:text-chalk-f sm:flex">
                      {card.medals.length}{" "}
                      {card.medals.length === 1
                        ? "medal"
                        : card.medals.length < 5
                          ? "medale"
                          : "medali"}
                      <ArrowUpRightIcon
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </li>
              ))}

              {/* Wiersz rekordów Polski. */}
              <li>
                <button
                  type="button"
                  data-cursor="Tabele"
                  onMouseEnter={() => setHovered(null)}
                  onClick={() => setRecordsOpen(true)}
                  className="group grid w-full grid-cols-[3rem_1fr] items-center gap-x-4 py-6 text-left outline-none focus-visible:text-aqua-f sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8 sm:py-8"
                >
                  <span className="tag-f text-gold-f">05</span>
                  <span className="min-w-0">
                    <span className="condensed-f flex flex-wrap items-baseline gap-x-4 text-[clamp(2rem,6vw,4.5rem)] transition-colors group-hover:text-aqua-f">
                      {medalsF.recordsRow.title}
                      <span className="text-gold-f">14</span>
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-chalk-f/60">
                      {recordsSummary.breakdown.map((item) => (
                        <span key={item.category}>
                          <span className="board-f text-chalk-f">
                            {item.count}
                          </span>{" "}
                          · {item.category}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 text-sm text-chalk-f/60 transition-colors group-hover:text-chalk-f sm:flex">
                    {medalsF.recordsRow.cta}
                    <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                  </span>
                </button>
              </li>
            </ol>

            {/* Pływający kadr — tylko mysz (lg+). */}
            <div
              className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
              aria-hidden="true"
            >
              <motion.div
                style={{ x: sx, y: sy }}
                className="absolute top-0 left-0"
              >
                <AnimatePresence>
                  {hoveredCard ? (
                    <motion.div
                      key={hoveredCard.key}
                      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-[4/5] w-56 -translate-x-1/2 -translate-y-[60%] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15 xl:w-64"
                    >
                      <Thumb card={hoveredCard} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </Frame>

      <Dialog
        open={openCard !== null}
        onOpenChange={(open) => {
          if (!open) setOpenKey(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-sm"
          className="max-h-[92svh] max-w-[min(94vw,52rem)] gap-0 overflow-y-auto p-0 sm:max-w-[min(94vw,52rem)]"
        >
          {openCard ? (
            <MilestoneSheet card={openCard} />
          ) : (
            <DialogTitle className="sr-only">Wyniki</DialogTitle>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={recordsOpen} onOpenChange={setRecordsOpen}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-sm"
          className="max-h-[92svh] max-w-[min(94vw,64rem)] gap-0 overflow-y-auto p-0 sm:max-w-[min(94vw,64rem)]"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
            <div>
              <DialogTitle className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
                Rekordy Polski — pełne tabele PZP
              </DialogTitle>
              <DialogDescription className="mt-1">
                Stan na {site.dataAsOf}.
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
          </div>
        </DialogContent>
      </Dialog>
    </SectionF>
  )
}

function Thumb({ card }: { card: MedalCard }) {
  return card.media.kind === "photo" ? (
    <Image
      src={card.media.src}
      alt=""
      fill
      sizes="16rem"
      placeholder="blur"
      style={{ objectPosition: card.media.position ?? "50% 50%" }}
      className="object-cover"
    />
  ) : (
    <Image
      src={card.media.src}
      alt=""
      fill
      sizes="16rem"
      className="object-cover"
    />
  )
}
