/**
 * English dictionary of the main page — mirrors `pl.ts` (same `Dict` shape).
 *
 * Language notes:
 * - British spelling (medallist, colours) — European sponsorship context,
 * - swim times use a dot for decimals (2:12.45), dates are written out
 *   (12 July 2026) or shortened to `12 Jul 2026` in tables,
 * - Polish proper names (federations, media outlets) keep their original
 *   form where they are names, with a translated descriptor where needed.
 *
 * Structural data (images, seconds, wall order) comes from shared modules;
 * this file only swaps the language layer on top of it.
 */

import type { Milestone } from "@/data/achievements"
import { medalCards } from "@/data/page-h/medal-wall"
import {
  mediaItems,
  type MediaItem,
  type VideoItem,
} from "@/data/page-h/media"
import { raceProgression, seniorRecord } from "@/data/progression"
import type { Pool } from "@/data/records"
import type { Dict, RaceRow } from "@/data/main/types"

const chapters = [
  { index: 0, id: "start", label: "Start" },
  { index: 1, id: "result", label: "Result" },
  { index: 2, id: "progress", label: "Progress" },
  { index: 3, id: "medals", label: "Medals" },
  { index: 4, id: "paris", label: "Paris 2026" },
  { index: 5, id: "media", label: "Media" },
  { index: 6, id: "partnership", label: "Partnership" },
  { index: 7, id: "contact", label: "Contact" },
] as const

/** Zapis czasu z przecinka na kropkę — struktury liczbowe są wspólne. */
const dot = (time: string) => time.replace(",", ".")

/* ---------------------------------------------------------------- media --- */

const videoTexts: Record<
  string,
  { title: string; source: string; context: string; tag: string }
> = {
  "video-paryz-4x200": {
    title:
      "“I can see clear progress and I hope next time will be even better”",
    source: "Polish Swimming Federation",
    context:
      "After the 4×200 m freestyle relay final · European Championships, Paris, 10 Aug 2026",
    tag: "Paris 2026",
  },
  "video-olsztyn-zloto": {
    title: "16-year-old Barbara Leśniewska takes Polish senior gold",
    source: "Polish Swimming Federation",
    context: "Polish Senior Championships · Olsztyn, April 2026",
    tag: "Olsztyn 2026",
  },
  "video-lublin-braz": {
    title: "Barbara Leśniewska after the Polish relay’s bronze in Lublin",
    source: "Polish Swimming Federation",
    context: "European Short Course Championships · Lublin, December 2025",
    tag: "Lublin 2025",
  },
  "video-lublin-medal": {
    title: "“I couldn’t sleep after the medal”",
    source: "Polish Swimming Federation",
    context: "European Short Course Championships · Lublin, December 2025",
    tag: "Lublin 2025",
  },
  "reel-monachium": {
    title: "“16-year-old Pole makes history”",
    source: "Sportowy Fanatyk · Facebook",
    context: "After European junior gold · Munich 2026",
    tag: "Munich 2026",
  },
  "reel-bydgoszcz": {
    title: "Barbara Leśniewska’s Polish record at the age-15 nationals",
    source: "Swimm PL · Facebook",
    context: "Broadcast footage · Bydgoszcz",
    tag: "Bydgoszcz",
  },
}

const photoTexts: Record<string, { caption: string; alt: string; tag: string }> =
  {
    "monachium-zloto": {
      caption:
        "Gold in the 200 m individual medley — European Junior Championships, Munich 2026",
      alt: "Barbara Leśniewska presenting her European Junior Championships gold medal at the Munich pool",
      tag: "Munich 2026",
    },
    "paryz-przed-startem": {
      caption:
        "A moment of focus before the start — European Championships, Paris 2026",
      alt: "Barbara Leśniewska in headphones and the Polish team tracksuit moments before walking out to the start in Paris",
      tag: "Paris 2026",
    },
    "paryz-razem": {
      caption: "Before the relay — Paris 2026",
      alt: "The Polish women’s relay team in a huddle before the start at the European Championships in Paris; the European Aquatics Championships Paris 2026 logo in the background",
      tag: "Paris 2026",
    },
    "portret-studio": {
      caption: "Studio portrait",
      alt: "Studio portrait of Barbara Leśniewska — smiling, hands clasped under her chin",
      tag: "Portrait",
    },
    "paryz-4x200": {
      caption: "7th place in the 4×200 m freestyle relay final — Paris 2026",
      alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska and Aleksandra Knop after the 4×200 m freestyle relay final in Paris",
      tag: "Paris 2026",
    },
    "po-wyscigu": {
      caption: "Right after the race",
      alt: "Close-up of Barbara Leśniewska in a red cap and goggles just after a race",
      tag: "Racing",
    },
    "wroclaw-przed-startem": {
      caption: "Lane 5, seconds before the start — Wrocław",
      alt: "Barbara Leśniewska adjusting her cap behind the lane 5 starting block at a meet in Wrocław",
      tag: "Racing",
    },
    "srebrne-medale": {
      caption: "Two silver medals — EYOF, Skopje 2025",
      alt: "Barbara Leśniewska showing two silver medals won at the EYOF in Skopje",
      tag: "Skopje 2025",
    },
    "podium-zloto-skopje": {
      caption: "Gold in the 200 m individual medley — EYOF, Skopje 2025",
      alt: "Barbara Leśniewska with a gold medal on the podium of the European Youth Olympic Festival in Skopje",
      tag: "Skopje 2025",
    },
    "paryz-skok": {
      caption: "The start — 4×100 m medley relay heats, Paris 2026",
      alt: "Barbara Leśniewska mid-air just after diving off the block in the 4×100 m medley relay heats in Paris",
      tag: "Paris 2026",
    },
    "podium-srebro": {
      caption: "Medal ceremony — EYOF, Skopje 2025",
      alt: "Medal ceremony at the European Youth Olympic Festival — Barbara Leśniewska with a silver medal",
      tag: "Skopje 2025",
    },
    "paryz-mix": {
      caption: "Mixed 4×100 m medley relay final — 8th place, Paris 2026",
      alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok and Barbara Leśniewska greeting the crowd before the mixed 4×100 m medley relay final in Paris",
      tag: "Paris 2026",
    },
    portret: {
      caption: "Before the start",
      alt: "Barbara Leśniewska in her racing suit and cap at the pool",
      tag: "Training",
    },
    "na-scianie": {
      caption: "At the wall",
      alt: "Barbara Leśniewska at the pool wall after finishing a race",
      tag: "Racing",
    },
    kciuk: {
      caption: "Thumbs up after a good swim",
      alt: "Barbara Leśniewska in the water giving a thumbs up after a successful race",
      tag: "Racing",
    },
    cetniewo: {
      caption: "National team camp — COS Cetniewo",
      alt: "Barbara Leśniewska resting on the pool edge during a national team camp in Cetniewo",
      tag: "National team",
    },
    reprezentacja: {
      caption: "In the colours of Poland",
      alt: "Barbara Leśniewska in the official Polish national team outfit",
      tag: "National team",
    },
  }

const localizeItem = (item: MediaItem): MediaItem => {
  if (item.type === "video") {
    const texts = videoTexts[item.id]
    return texts ? { ...item, ...texts } : item
  }
  const texts = photoTexts[item.id]
  return texts ? { ...item, ...texts } : item
}

const enMediaItems = mediaItems.map(localizeItem)

const localizeVideo = (id: string): VideoItem => {
  const found = enMediaItems.find(
    (item): item is VideoItem => item.type === "video" && item.id === id
  )
  if (!found) throw new Error(`Missing video: ${id}`)
  return found
}

/* --------------------------------------------------------------- medals --- */

const enMilestones: Record<string, Milestone> = {
  monachium: {
    id: "monachium-2026",
    period: "July 2026",
    title: "European Junior Championships",
    location: "Munich",
    tag: "European Championships",
    featured: true,
    results: [
      {
        medal: "gold",
        event: "200 m individual medley",
        time: "2:12.45",
        note: "Polish record for ages 16, 17 and 18; ahead of Viktoria Tarannikova (2:14.10) and Anna Rzaeva (2:14.44)",
      },
      {
        medal: "bronze",
        event: "100 m butterfly",
        time: "58.78",
        note: "personal best and Polish age-16 record",
      },
      {
        place: "5.",
        event: "200 m freestyle",
        time: "1:59.96",
        note: "result in the final; Linda Roth won (1:57.79)",
      },
      {
        place: "4.",
        event: "4×100 m freestyle relay",
        note: "Barbara on the lead-off leg",
      },
    ],
    summary: "Fourteen races in five days.",
  },
  olsztyn: {
    id: "olsztyn-2026",
    period: "April 2026",
    title: "Polish Senior Championships",
    location: "Olsztyn, 21–24 Apr",
    tag: "Polish Championships",
    results: [
      {
        medal: "gold",
        event: "200 m freestyle",
        time: "1:59.00",
        note: "confirmed the qualifying standard for the European Championships in Paris",
      },
      {
        medal: "gold",
        event: "200 m individual medley",
        time: "2:13.36",
        note: "new Polish age-18 record — bettered after 21 years",
      },
      {
        medal: "bronze",
        event: "100 m butterfly",
        time: "58.88",
        note: "European qualifying standard; equalled the Polish age-16 record in the heats",
      },
    ],
  },
  lublin: {
    id: "lublin-2025",
    period: "December 2025",
    title: "European Championships (25 m pool)",
    location: "Lublin, 2 Dec 2025",
    tag: "European Championships",
    results: [
      {
        medal: "bronze",
        event: "4×50 m freestyle relay",
        time: "1:35.75",
        note: "Katarzyna Wasick, Julia Maik, Kornelia Fiedkiewicz, Barbara Leśniewska — Barbara swam the final aged 15",
      },
    ],
    summary:
      "Her first senior European Championships medal — at 15, seven months before her European junior gold.",
  },
  skopje: {
    id: "skopje-2025",
    period: "July 2025",
    title: "European Youth Olympic Festival",
    location: "Skopje",
    tag: "5 medals",
    featured: true,
    results: [
      {
        medal: "gold",
        event: "200 m individual medley",
        time: "2:14.82",
        note: "Polish age-15 record",
      },
      {
        medal: "silver",
        event: "100 m freestyle",
        time: "55.06",
        note: "Polish age-15 record",
      },
      { medal: "silver", event: "200 m freestyle" },
      { medal: "silver", event: "mixed 4×100 m freestyle relay" },
      { medal: "bronze", event: "girls’ 4×100 m medley relay" },
    ],
    summary:
      "The most decorated athlete of the entire Polish team at EYOF 2025; her medals opened Poland’s swimming tally at the event.",
  },
}

const cardTexts: Record<string, { title: string; sub: string; alt: string }> = {
  monachium: {
    title: "European Junior Championships",
    sub: "Munich · July 2026",
    alt: "Barbara Leśniewska with her European Junior Championships gold medal in Munich",
  },
  olsztyn: {
    title: "Polish Senior Championships",
    sub: "Olsztyn · April 2026",
    alt: "Barbara Leśniewska in the interview zone of the Polish Senior Championships in Olsztyn",
  },
  lublin: {
    title: "European Championships · 25 m",
    sub: "Lublin · December 2025",
    alt: "Barbara Leśniewska with her European Short Course Championships bronze medal in Lublin",
  },
  skopje: {
    title: "European Youth Olympic Festival",
    sub: "Skopje · July 2025",
    alt: "Barbara Leśniewska with a gold medal on the EYOF podium in Skopje",
  },
}

const enMedalCards = medalCards.map((card) => ({
  ...card,
  ...cardTexts[card.key],
  media: { ...card.media, alt: cardTexts[card.key].alt },
  milestone: enMilestones[card.key],
  videos: card.videos.map(
    (video) => localizeVideo(video.id) as (typeof card.videos)[number]
  ),
}))

const enRecordMilestones: Milestone[] = [
  {
    id: "barcelona-2026",
    period: "May / June 2026",
    title: "Mare Nostrum",
    location: "Barcelona",
    tag: "International circuit",
    results: [
      { event: "100 m freestyle", time: "54.79", note: "personal best" },
      {
        event: "200 m individual medley",
        time: "2:13.20",
        note: "improved her own Polish age-18 record at the time",
      },
    ],
  },
  {
    id: "oswiecim-2026",
    period: "March 2026",
    title: "Polish age-16 and age-17 records",
    location: "Oświęcim",
    tag: "Polish records",
    results: [
      { event: "100 m freestyle", time: "55.04", note: "15 Mar 2026" },
      { event: "200 m freestyle", time: "1:58.92", note: "14 Mar 2026" },
    ],
  },
  {
    id: "basen-25-2025",
    period: "Autumn 2025",
    title: "A run of short-course records",
    location: "Warsaw, Wrocław",
    tag: "Polish records",
    results: [
      {
        event: "Four Polish age-15 records",
        note: "details in the record tables",
      },
    ],
  },
]

const enPools: Pool[] = [
  {
    key: "50",
    label: "50 m pool",
    shortLabel: "50 m",
    groups: [
      {
        category: "Polish age-15 records",
        rows: [
          {
            event: "100 m freestyle",
            time: "55.06",
            venue: "Skopje",
            date: "24 Jul 2025",
            medal: "silver",
          },
          {
            event: "200 m individual medley",
            time: "2:14.82",
            venue: "Skopje",
            date: "25 Jul 2025",
            medal: "gold",
          },
        ],
        footnote:
          "The 55.06 was announced by the Polish federation as the record for ages 15, 16 and 17. After the later 55.04, the age-15 record stayed at 55.06 while the older categories were updated.",
      },
      {
        category: "Polish age-16 records",
        rows: [
          {
            event: "100 m freestyle",
            time: "55.04",
            venue: "Oświęcim",
            date: "15 Mar 2026",
          },
          {
            event: "200 m freestyle",
            time: "1:58.92",
            venue: "Oświęcim",
            date: "14 Mar 2026",
          },
          {
            event: "100 m butterfly",
            time: "58.78",
            venue: "Munich",
            date: "9 Jul 2026",
            medal: "bronze",
          },
          {
            event: "200 m individual medley",
            time: "2:12.45",
            venue: "Munich",
            date: "12 Jul 2026",
            medal: "gold",
          },
        ],
        footnote:
          "Barbara set the 100 m butterfly record on her way to European junior bronze.",
      },
      {
        category: "Polish age-17 records",
        rows: [
          {
            event: "100 m freestyle",
            time: "55.04",
            venue: "Oświęcim",
            date: "15 Mar 2026",
          },
          {
            event: "200 m freestyle",
            time: "1:58.92",
            venue: "Oświęcim",
            date: "14 Mar 2026",
          },
          {
            event: "200 m individual medley",
            time: "2:12.45",
            venue: "Munich",
            date: "12 Jul 2026",
            medal: "gold",
          },
        ],
      },
      {
        category: "Polish age-18 records",
        rows: [
          {
            event: "200 m individual medley",
            time: "2:12.45",
            venue: "Munich",
            date: "12 Jul 2026",
            medal: "gold",
          },
        ],
        footnote:
          "For 21 years the record belonged to Katarzyna Baranowska (World Championships, Montreal 2005). Barbara took it on 24 Apr 2026 in Olsztyn (2:13.36), improved it in Barcelona (2:13.20), and in the European junior final brought it down to 2:12.45 — just 0.32 s off the Polish senior record (2:12.13, Beijing 2008).",
      },
    ],
    personalBests: [
      { event: "50 m freestyle", time: "25.78" },
      { event: "100 m freestyle", time: "54.79" },
      { event: "200 m freestyle", time: "1:58.92" },
      { event: "50 m butterfly", time: "27.08" },
      { event: "100 m butterfly", time: "58.78" },
      { event: "200 m individual medley", time: "2:12.45" },
    ],
    personalBestsNote:
      "Barbara swam the 54.79 over 100 m freestyle at the Mare Nostrum meet in Barcelona.",
  },
  {
    key: "25",
    label: "25 m pool",
    shortLabel: "25 m",
    groups: [
      {
        category: "Polish age-15 records",
        rows: [
          {
            event: "50 m freestyle",
            time: "24.70",
            venue: "Wrocław",
            date: "7 Nov 2025",
          },
          {
            event: "100 m freestyle",
            time: "53.26",
            venue: "Wrocław",
            date: "8 Nov 2025",
          },
          {
            event: "200 m freestyle",
            time: "1:57.37",
            venue: "Warsaw",
            date: "19 Oct 2025",
          },
          {
            event: "100 m individual medley",
            time: "59.73",
            venue: "Wrocław",
            date: "7 Nov 2025",
          },
        ],
        footnote:
          "The 1:57.37 over 200 m freestyle and the earlier 1:01.65 over 100 m medley were also listed by the federation as records for ages 15 and 16; Barbara later lowered the 100 m medley record to 59.73.",
      },
    ],
    personalBests: [
      { event: "50 m freestyle", time: "24.70" },
      { event: "100 m freestyle", time: "53.26" },
      { event: "200 m freestyle", time: "1:57.37" },
      { event: "100 m individual medley", time: "59.73" },
    ],
  },
]

/* ------------------------------------------------------------- progress --- */

const raceTexts: {
  event: string
  venue?: string
  note?: string
  mark?: string
}[] = [
  { event: "World Juniors", note: "18th place", mark: "18." },
  { event: "EYOF", venue: "Skopje", note: "Polish age-15 record" },
  { event: "Polish Seniors", venue: "Olsztyn", note: "Polish age-18 record" },
  { event: "Mare Nostrum", venue: "Barcelona" },
  {
    event: "European Juniors",
    venue: "Munich",
    note: "Polish records for ages 16–18",
  },
]

const races: RaceRow[] = raceProgression.map((row, index) => ({
  time: dot(row.time),
  seconds: row.seconds,
  date: row.date,
  medal: row.medal,
  highlight: row.highlight,
  ...raceTexts[index],
}))

/* ----------------------------------------------------------------- dict --- */

export const en: Dict = {
  locale: "en",
  decimal: ".",
  skipLink: "Skip to content",
  mainId: "content",
  chapters,

  nav: {
    edition: "Partner presentation · 2026/27 season",
    cta: "Become a partner",
    ctaHref: "#partnership",
    chaptersTitle: "Chapters",
    chaptersAria: "Presentation chapters",
    openMenu: "Open chapter list",
    close: "Close",
    langAria: "Site language",
  },

  dock: { label: "Let’s talk partnership", href: "#contact", contactId: "contact" },

  videoUi: { badge: "Video", playPrefix: "Play video:", embedLang: "en" },

  cover: {
    kicker: "Polish national team swimmer",
    edition: "Partner presentation · 2026/27 season",
    name: ["Barbara", "Leśniewska"],
    tagline:
      "European junior champion. Sixteen years old — and already swimming in senior European Championship finals. Next goal: the Los Angeles 2028 Olympics.",
    primaryCta: { label: "Become a partner", href: "#partnership" },
    secondaryCta: { label: "View the presentation", href: "#result" },
    board: [
      { value: "2:12.45", label: "200 m medley · European junior gold 2026" },
      { value: "0.32 s", label: "off the Polish senior record" },
      { value: "11", label: "championship medals across 2025–2026" },
      { value: "14", label: "Polish age-group records (ages 15–18)" },
      { value: "2", label: "senior European finals in Paris 2026" },
    ],
    boardAria: "Key numbers",
  },

  result: {
    label: "Result",
    title: "One time that says it all.",
    lead: "The 200 m individual medley final of the European Junior Championships — Munich, 12 July 2026. Barbara beat the field by more than a second and a half, set the Polish records for ages 16, 17 and 18, and finished the race 0.32 seconds off the Polish senior record from the polyurethane-suit era.",
    boardCaption: "200 m individual medley · final · Munich, 12 July 2026",
    recordNote: "Polish record for ages 16, 17 and 18",
    finalHeading: "Final · 200 m medley",
    podium: [
      { medal: "gold", name: "Barbara Leśniewska", time: "2:12.45" },
      { medal: "silver", name: "Viktoria Tarannikova", time: "2:14.10" },
      { medal: "bronze", name: "Anna Rzaeva", time: "2:14.44" },
    ],
    podiumNote:
      "Margin over the silver medallist: 1.65 s. Fastest time of the semifinals — and two seconds quicker in the final.",
    factsHeading: "By the numbers",
    facts: [
      {
        value: "17th",
        label: "fastest junior in European history in this event",
      },
      { value: "+1.65 s", label: "margin over the silver medallist (2:14.10)" },
      { value: "14", label: "races in five days of championships" },
    ],
    photoAlt:
      "Barbara Leśniewska presenting her European Junior Championships gold medal at the Munich pool",
    photoTitle: "European junior champion",
    photoSub: "200 m individual medley · Munich, 12 July 2026",
  },

  replay: {
    heading: "Visualisation",
    sub: "Three races replayed at once.",
    play: "Play",
    again: "Play again",
    lanes: [
      {
        key: "2025",
        label: "World Juniors 2025",
        sub: "18th place",
        time: "2:17.03",
        seconds: 137.03,
      },
      {
        key: "2026",
        label: "European Juniors 2026",
        sub: "gold",
        time: "2:12.45",
        seconds: 132.45,
        highlight: true,
      },
      {
        key: "record",
        label: "Polish senior record",
        sub: "K. Baranowska, Beijing 2008",
        time: "2:12.13",
        seconds: 132.13,
        record: true,
      },
    ],
    wall: "wall",
    finish: {
      heading: "Photo finish",
      meta: "the last 1.1 % of the race (≈ 2.2 m)",
      bracket: "0.32 s",
      legend: [
        { key: "barbara", time: "2:12.45", label: "Barbara · European junior gold" },
        { key: "record", time: "2:12.13", label: "Polish senior record" },
      ],
    },
    stats: [
      {
        value: "0.32 s",
        label: "off the Polish senior record (K. Baranowska, Beijing 2008)",
      },
      {
        value: "4.58 s",
        label:
          "faster in twelve months — from 18th in the world to European gold",
      },
    ],
  },

  progress: {
    label: "Progress",
    title: "From 18th in the world to European gold in twelve months.",
    lead: "Five 200 m individual medley races in the 50 m pool — every one faster than the last. The chart is not a forecast. It shows the pace at which Barbara is closing the gap to the very best.",
    chartHeadingPre: "The road from ",
    chartHeadingMid: " to ",
    chartFrom: "2:17.03",
    chartTo: "2:12.45",
    chartEyebrow: "200 m medley · 50 m pool",
    recordLineLabel: " · Polish senior record",
    record: {
      time: dot(seniorRecord.time),
      seconds: seniorRecord.seconds,
      holder: "Katarzyna Baranowska",
      context: "Beijing 2008",
    },
    races,
    caption:
      "Races ordered by result, each with its date. The dashed line is the Polish senior record —",
    startsHeading: "Races · 200 m medley",
    startsAria: "200 m individual medley races",
    footnote:
      "Nearly five seconds faster in twelve months — and the fastest semifinal time converted into gold in the final.",
  },

  medals: {
    label: "Medals",
    title: "Eleven championship medals. Four events. Two seasons.",
    lead: "The European Junior Championships, the Polish Senior Championships, the European Short Course Championships and the European Youth Olympic Festival. Tap a card to see the full results.",
    shelf: [
      { medal: "gold", count: 4, label: "gold" },
      { medal: "silver", count: 3, label: "silver" },
      { medal: "bronze", count: 4, label: "bronze" },
    ],
    recordsCard: {
      title: "Polish records",
      value: "14",
      sub: "entries in the federation’s age-group tables (15–18) · 25 m and 50 m pools",
      cta: "Full tables",
    },
    dialogHint:
      "Results per the tables and communiqués of the Polish Swimming Federation",
    cards: enMedalCards,
    cardSrOpen: "view results",
    videoBadgeSr: "Video",
    medalWord: { one: "medal", few: "medals", many: "medals" },
    medalLabels: {
      gold: "Gold medal",
      silver: "Silver medal",
      bronze: "Bronze medal",
    },
    sheetVideosHeading: "Videos · Polish Swimming Federation",
    close: "Close",
    resultsFallback: "Results",
    recordsDialog: {
      title: "Polish records — full federation tables",
      desc: "As of 17 July 2026. The list excludes relay records and records set at age 14.",
      milestonesHeading: "Milestones beyond the medals",
      recordMilestones: enRecordMilestones,
    },
    records: {
      breakdown: [
        {
          count: 6,
          stripLabel: "at age 15",
          dialogLabel: "Age 15",
          detail: "two in the 50 m pool and four in the 25 m pool",
        },
        { count: 4, stripLabel: "at age 16", dialogLabel: "Age 16", detail: "50 m pool" },
        { count: 3, stripLabel: "at age 17", dialogLabel: "Age 17", detail: "50 m pool" },
        { count: 1, stripLabel: "at age 18", dialogLabel: "Age 18", detail: "50 m pool" },
      ],
      pools: enPools,
      tableSr: { event: "Event", result: "Time", venueDate: "Venue and date" },
      personalBestsHeading: "Personal bests",
      medalInRace: "in this race",
      hint: "A medal next to a row means the record was set in a race that ended with a championship medal.",
      note: "The list excludes records Barbara set at age 14 and relay records. As of 17 July 2026, per the tables and communiqués of the Polish Swimming Federation.",
    },
  },

  paris: {
    label: "Paris 2026",
    title: "A month after junior gold — two finals among the seniors.",
    intro:
      "The senior European Championships, Olympic Aquatics Centre, 10–16 August 2026. One of four juniors in Poland’s 32-strong team. Three relays, two finals, two individual events — and the fastest 100 m freestyle of her career.",
    factsHeading: "Paris by the numbers",
    relaysHeading: "Relays",
    individualHeading: "Individual events",
    frames: [
      {
        key: "razem",
        caption: "Before the relay — Saint-Denis",
        alt: "The Polish women’s relay team in a huddle before the start at the European Championships in Paris",
      },
      {
        key: "4x200",
        caption: "4×200 m freestyle relay final — 7th place, 7:58.22",
        alt: "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska and Aleksandra Knop after the 4×200 m freestyle relay final",
      },
      {
        key: "mix",
        caption: "Mixed 4×100 m medley relay final — 8th place",
        alt: "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok and Barbara Leśniewska before the mixed 4×100 m medley relay final",
      },
      {
        key: "skok",
        caption: "4×100 m medley relay heats — the start",
        alt: "Barbara Leśniewska mid-air just after diving off the block in the 4×100 m medley relay heats",
      },
    ],
    takeaways: [
      { value: "2", label: "senior European finals at the age of 16" },
      {
        value: "54.16",
        label: "her fastest 100 m freestyle ever — split in the relay final",
      },
      {
        value: "7:58.22",
        label:
          "4×200 m freestyle relay — the second-fastest time in Polish history",
      },
    ],
    relays: [
      {
        event: "4×200 m freestyle relay",
        stageKey: "final",
        stageLabel: "final",
        place: 7,
        placeLabel: "7th place — final",
        time: "7:58.22",
        lineup:
          "Justina Kozan, Zuzanna Famulok, Barbara Leśniewska, Aleksandra Knop",
        split: "1:59.87",
        note: "the second-fastest result in the history of Polish swimming; Barbara on the third leg",
        highlight: true,
      },
      {
        event: "Mixed 4×100 m medley relay",
        stageKey: "final",
        stageLabel: "final",
        place: 8,
        placeLabel: "8th place — final",
        time: "3:46.37",
        lineup:
          "Ksawery Masiuk, Jan Kałusowski, Zuzanna Famulok, Barbara Leśniewska",
        split: "54.16",
        note: "reached the final with the 6th time of the heats (3:46.23); Barbara swam the freestyle leg with the fastest 100 m of her career",
        highlight: true,
      },
      {
        event: "4×100 m medley relay",
        stageKey: "heats",
        stageLabel: "heats",
        place: 9,
        placeLabel: "9th place — heats",
        time: "4:02.10",
        lineup:
          "Adela Piskorska, Dominika Sztandera, Zuzanna Famulok, Barbara Leśniewska",
        split: "55.32",
        note: "one place short of the final",
      },
    ],
    splitPrefix: "Barbara’s split",
    individual: [
      {
        event: "200 m individual medley",
        time: "2:16.67",
        meta: "20th place · heats",
      },
      { event: "100 m butterfly", time: "1:00.54", meta: "40th place · heats" },
    ],
    individualNote:
      "Her individual races came a month after fourteen races at the European Junior Championships — more experience chasing the senior field, and it will pay off in the seasons ahead.",
    voiceHeading: "Barbara after the final",
    video: localizeVideo("video-paryz-4x200"),
  },

  media: {
    label: "Media",
    title: "Footage you can use as a sponsor.",
    lead: "Podium, pool and national-team photos plus race footage. All materials are available for partner communications.",
    filters: [
      { key: "all", label: "All" },
      { key: "video", label: "Video" },
      { key: "paryz", label: "Paris 2026" },
      { key: "monachium", label: "Munich 2026" },
      { key: "skopje", label: "Skopje 2025" },
      { key: "kadra", label: "Team & training" },
    ],
    filterAria: "Filter materials",
    showMore: "Show more",
    showLess: "Show less",
    items: enMediaItems,
    lightbox: {
      prev: "Previous photo",
      next: "Next photo",
      close: "Close gallery",
      fallback: "Gallery",
    },
    press: {
      eyebrow: "Press · Przegląd Sportowy Onet",
      title: "“Young Pole shocked the world. Now she opens up”",
      excerpt:
        "“Barbara Leśniewska is only 15 and she has already won her first medal at a senior event — the European Short Course Championships in Lublin. The young swimmer is just starting out, but she already has an ambitious goal: to prove to the world that Poland can win, too.”",
      date: "24 Dec 2025",
      cta: "Read the article (in Polish)",
      href: "https://przegladsportowy.onet.pl/plywanie/mloda-polka-zszokowala-swiat-teraz-szczerze-wyznaje/6vh1h6f",
    },
    instagram: {
      eyebrow: "Social media",
      handle: "@_lesniewskaa._",
      text: "Training, racing and behind the scenes with the national team — straight from Barbara.",
      cta: "Follow on Instagram",
      href: "https://www.instagram.com/_lesniewskaa._",
    },
  },

  partnership: {
    label: "Partnership",
    title:
      "The best moment to start a partnership is right now! Just before the move into the senior elite.",
    lead: "A partner who joins today builds the story together with Barbara — helping create a legend of Polish swimming. Behind her: a season that confirmed steady progress. Ahead: the road to the Los Angeles 2028 Olympics.",
    cta: "Let’s talk partnership",
    args: [
      {
        title: "A success story that sells itself",
        body: "From 18th place at the World Junior Championships to the European junior title in twelve months. Every season brings Polish records — and new reasons to talk about Barbara.",
        alt: "Barbara with her European Junior Championships gold medal",
      },
      {
        title: "Present on the biggest stages",
        body: "The senior European Championships in Paris with two relay finals at just 16. Ahead of her: the senior World Championships and the European Junior Championships in 2027, with the Los Angeles Olympics as the ultimate goal.",
        alt: "The relay team before the start at the European Championships in Paris",
      },
      {
        title: "An image that inspires trust",
        body: "The work ethic, class and maturity of a sixteen-year-old who competes like a seasoned senior. An authentic story with no controversies — safe for a brand and natural to communicate.",
        alt: "Barbara Leśniewska just after a race",
      },
      {
        title: "Real brand exposure",
        body: "Logo on the cap, tracksuit and equipment (within Polish federation and World Aquatics regulations), social-media presence, and participation in the partner’s campaigns, meetings and events.",
        alt: "Barbara Leśniewska in the Polish national team outfit",
      },
    ],
    formatsHeading: "Partnership formats",
    formatsNote:
      "Scope and formats are agreed individually — the above is a starting point for a conversation.",
    formats: [
      {
        name: "Main partner",
        body: "Maximum visibility: cap, tracksuit, press materials, joint campaigns and content.",
      },
      {
        name: "Technical partner",
        body: "Equipment, nutrition, recovery, technology — your product in daily training and at competitions.",
      },
      {
        name: "Image partner",
        body: "Campaigns, ambassadorship, events and content — Barbara’s story as part of your brand communication.",
      },
    ],
    horizonHeading: "The horizon",
    horizonNote:
      "Two seasons of proof behind her. Ahead — a cycle that ends in Los Angeles.",
    horizon: [
      {
        year: "2025",
        label: "EYOF Skopje · European SC Championships, Lublin",
        state: "done",
      },
      {
        year: "2026",
        label: "Polish Seniors · European Juniors · Europeans in Paris",
        state: "done",
      },
      {
        year: "2027",
        label: "World Championships · European Juniors",
        state: "next",
      },
      { year: "2028", label: "Olympic Games, Los Angeles", state: "goal" },
    ],
    stateLabels: {
      done: "completed",
      next: "the next cycle — chasing standards and medals",
      goal: "the goal",
    },
  },

  contact: {
    label: "Contact",
    title: "Let’s talk.",
    lead: "For partnership, sponsorship and media enquiries, please get in touch directly — I reply personally.",
    cta: "Write about a partnership",
    mailSubject: "Partnership proposal — Barbara Leśniewska",
    personRole: "Partnership and media contact",
    emailLabel: "E-mail",
    phoneLabel: "Phone",
    instagramLabel: "Instagram",
    instagramHandle: "@_lesniewskaa._",
    instagramHref: "https://www.instagram.com/_lesniewskaa._",
    portraitAlt: "Barbara Leśniewska in her racing suit and cap at the pool",
    footer: {
      note: "Results per Polish Swimming Federation tables and communiqués, as of 19 August 2026",
      media:
        "Footage: Polish Swimming Federation (YouTube), Sportowy Fanatyk and Swimm PL (Facebook)",
      instagram: "Instagram",
      privacy: "Privacy policy (in Polish)",
      privacyHref: "/polityka-prywatnosci",
    },
  },
}
