"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { pools, recordsLead, recordsSummary } from "@/data/records"
import { site } from "@/data/site"
import { Reveal } from "@/components/motion/reveal"
import { Shell, Tag } from "@/components/page-c/primitives"

export function RecordsC() {
  const [poolKey, setPoolKey] = React.useState(pools[0].key)
  const pool = pools.find((item) => item.key === poolKey) ?? pools[0]

  return (
    <section id="rekordy" className="bg-paper-c-soft">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-20">
          <div className="@container min-w-0">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Tag index="06">Rekordy Polski</Tag>
                <h2 className="serif-c mt-7 text-[clamp(2rem,11cqw,3.5rem)]">
                  <em>14 pozycji</em> w tabelach rekordów Polski
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-c-soft sm:text-base">
                  {recordsLead}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-10 border-t border-line-c">
                  {recordsSummary.breakdown.map((item) => (
                    <div
                      key={item.category}
                      className="grid grid-cols-[5rem_1fr_auto] items-baseline gap-4 border-b border-line-c py-4"
                    >
                      <dt className="text-sm font-medium">{item.category}</dt>
                      <dd className="min-w-0 text-xs leading-relaxed text-ink-c-soft">
                        {item.detail}
                      </dd>
                      <dd className="serif-c time text-2xl">{item.count}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-md text-xs leading-relaxed text-ink-c-soft">
                  {recordsSummary.note}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div
                  role="group"
                  aria-label="Długość basenu"
                  className="flex gap-2"
                >
                  {pools.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={item.key === poolKey}
                      onClick={() => setPoolKey(item.key)}
                      className={cn(
                        "h-11 rounded-full border px-6 text-sm font-medium transition-colors outline-none focus-visible:border-accent-c focus-visible:text-accent-c",
                        item.key === poolKey
                          ? "border-ink-c bg-ink-c text-paper-c focus-visible:bg-accent-c focus-visible:text-paper-c"
                          : "border-line-c bg-paper-c text-ink-c-soft hover:border-ink-c hover:text-ink-c"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="label-c text-ink-c-soft">
                  Stan na {site.dataAsOf} · PZP
                </p>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-col gap-12">
              {pool.groups.map((group) => (
                <Reveal as="section" key={group.category}>
                  <h3 className="label-c text-accent-c">
                    {group.category.replace("Rekordy Polski ", "Kategoria ")}
                  </h3>
                  <ul className="mt-4 border-t border-line-c">
                    {group.rows.map((row) => (
                      <li
                        key={`${row.event}-${row.date}`}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-x-8 border-b border-line-c py-4"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.9375rem] font-medium">
                            {row.event}
                          </p>
                          <p className="mt-1 text-xs text-ink-c-soft">
                            {row.venue}, {row.date}
                          </p>
                        </div>
                        <p className="serif-c time text-2xl">{row.time}</p>
                      </li>
                    ))}
                  </ul>
                  {group.footnote ? (
                    <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-c-soft">
                      {group.footnote}
                    </p>
                  ) : null}
                </Reveal>
              ))}

              <Reveal as="section">
                <div className="border border-line-c bg-paper-c p-7 sm:p-9">
                  <h3 className="label-c text-accent-c">
                    Rekordy życiowe · basen {pool.shortLabel}
                  </h3>
                  <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
                    {pool.personalBests.map((best) => (
                      <li
                        key={best.event}
                        className="flex items-baseline justify-between gap-4 border-b border-line-c py-3 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                      >
                        <span className="text-sm">{best.event}</span>
                        <span className="serif-c time text-xl">
                          {best.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {pool.personalBestsNote ? (
                    <p className="mt-5 text-xs leading-relaxed text-ink-c-soft">
                      {pool.personalBestsNote}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
