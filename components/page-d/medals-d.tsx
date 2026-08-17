import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Milestone } from "@/data/achievements"
import { medals } from "@/data/page-d/pitch"
import { defaultSeasonTab, seasonTabs } from "@/data/page-d/season-d"
import { pools, recordsSummary } from "@/data/records"
import { site } from "@/data/site"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"
import {
  Medal,
  PlaceMark,
  SectionHeadD,
  medalLabel,
} from "@/components/page-d/primitives-d"

/**
 * 03 — medale i rekordy. Zamiast długiej osi czasu: półka z medalami
 * (policzalny dorobek) i zakładki po imprezach — na mobile jedna karta na raz.
 * Pełne tabele rekordów PZP są zwinięte pod spodem: wiarygodność na życzenie,
 * bez wydłużania strony.
 */
export function MedalsD() {
  return (
    <section id="medale" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeadD
              index={3}
              eyebrow={medals.eyebrow}
              title={medals.title}
              lead={medals.lead}
            />
          </Reveal>

          {/* Półka z medalami. */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:self-end">
            <ul className="grid grid-cols-3 gap-3 sm:gap-4">
              {medals.shelf.map((entry, index) => (
                <li
                  key={entry.medal}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-2xl border border-border bg-mist/70 px-3 py-5 text-center sm:py-6",
                    index === 0 &&
                      "border-gold/40 bg-[linear-gradient(180deg,#FFF9E6,var(--mist))]"
                  )}
                >
                  <Medal medal={entry.medal} className="size-14 sm:size-16" />
                  <p className="display text-3xl text-navy sm:text-4xl">
                    {entry.count}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {entry.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-12 sm:mt-14">
          <Tabs defaultValue={defaultSeasonTab} className="gap-6">
            {/* Lista przewija się poziomo na mobile (zakładki są szerokie, bo
                niosą nazwę imprezy i jej rangę); `h-auto!` — bo shadcn wymusza
                stałą wysokość paska przez wariant grupowy. */}
            <TabsList className="-mx-5 flex h-auto! w-auto [scrollbar-width:none] justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
              {seasonTabs.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="h-auto flex-none flex-col items-start gap-0.5 rounded-xl border border-border bg-background px-4 py-2.5 text-left text-foreground/70 hover:text-foreground data-active:border-navy data-active:bg-navy data-active:text-white hover:data-active:text-white [&[data-active]]:bg-navy [&[data-active]]:shadow-none"
                >
                  <span className="text-sm font-semibold">{tab.label}</span>
                  <span className="text-[0.6875rem] font-normal opacity-70">
                    {tab.sub}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {seasonTabs.map((tab) => (
              <TabsContent key={tab.key} value={tab.key}>
                <div className="flex flex-col gap-6">
                  {tab.milestones.map((milestone) => (
                    <MilestoneCard key={milestone.id} milestone={milestone} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        {/* Pełne tabele rekordów — zwinięte. */}
        <Reveal delay={0.04} className="mt-10">
          <details className="group rounded-2xl border border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block font-heading text-base font-semibold tracking-tight sm:text-lg">
                  {medals.recordsToggle}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                  {recordsSummary.total} pozycji w tabelach kategorii 15–18 lat
                  · stan na {site.dataAsOf}
                </span>
              </span>
              <ChevronDownIcon
                className="size-5 shrink-0 text-slate transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-border px-5 pt-6 pb-6 sm:px-6">
              <RecordsCompact />
            </div>
          </details>
        </Reveal>
      </Container>
    </section>
  )
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <article className="rounded-3xl border border-border bg-background p-5 sm:p-7 lg:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div>
          <h3 className="font-heading text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
            {milestone.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {milestone.location} · {milestone.period}
          </p>
        </div>
        <p className="eyebrow text-gold-ink">{milestone.tag}</p>
      </header>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {milestone.results.map((result) => (
          <li
            key={`${result.event}-${result.time ?? ""}`}
            className="grid grid-cols-[2.75rem_1fr] items-center gap-x-4 py-3.5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6"
          >
            <span className="flex items-center justify-center">
              {result.medal ? (
                <Medal medal={result.medal} className="size-11" />
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
                  <span className="sr-only"> — {medalLabel(result.medal)}</span>
                ) : null}
              </p>
              {result.note ? (
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {result.note}
                </p>
              ) : null}
            </div>
            {result.time ? (
              <p className="time col-start-2 mt-1 font-heading text-lg leading-none font-semibold tracking-tight text-navy sm:col-start-3 sm:mt-0 sm:text-xl">
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
    </article>
  )
}

/** Tabele rekordów PZP w skondensowanej formie — dwie kolumny na desktopie. */
export function RecordsCompact() {
  return (
    <div className="flex flex-col gap-10">
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {recordsSummary.breakdown.map((item) => (
          <li
            key={item.category}
            className="flex items-baseline justify-between gap-3 border-b border-border/70 py-2 text-sm"
          >
            <span className="font-medium">Kategoria {item.category}</span>
            <span className="text-muted-foreground">
              <span className="time font-semibold text-navy">{item.count}</span>{" "}
              · {item.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {pools.map((pool) => (
          <div key={pool.key} className="min-w-0">
            <h4 className="font-heading text-lg font-semibold tracking-tight">
              {pool.label}
            </h4>
            {pool.groups.map((group) => (
              <div key={group.category} className="mt-5">
                <p className="eyebrow text-slate">{group.category}</p>
                <table className="mt-2 w-full text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Konkurencja</th>
                      <th scope="col">Wynik</th>
                      <th scope="col">Miejsce i data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr
                        key={`${row.event}-${row.date}`}
                        className="border-b border-border/70"
                      >
                        <td className="py-2 pr-3">{row.event}</td>
                        <td className="time py-2 pr-3 text-right font-semibold whitespace-nowrap text-navy">
                          {row.time}
                        </td>
                        <td className="py-2 text-right text-muted-foreground">
                          {row.venue},{" "}
                          <span className="whitespace-nowrap">{row.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {group.footnote ? (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {group.footnote}
                  </p>
                ) : null}
              </div>
            ))}

            <div className="mt-6">
              <p className="eyebrow text-slate">
                Rekordy życiowe · {pool.label}
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-x-6">
                {pool.personalBests.map((best) => (
                  <li
                    key={best.event}
                    className="flex items-baseline justify-between gap-3 border-b border-border/70 py-2 text-sm"
                  >
                    <span>{best.event}</span>
                    <span className="time font-semibold text-navy">
                      {best.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {recordsSummary.note} Stan na {site.dataAsOf} wg tabel i komunikatów
        Polskiego Związku Pływackiego.
      </p>
    </div>
  )
}
