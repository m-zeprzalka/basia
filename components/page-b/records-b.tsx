"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { pools, recordsLead, recordsSummary } from "@/data/records"
import { site } from "@/data/site"
import { Frame, Marker } from "@/components/page-b/primitives"

/**
 * Rekordy jako indeks: twarde przełączniki, wiersze odwracające się na czarno,
 * czasy jako główny nośnik graficzny.
 */
export function RecordsB() {
  const [poolKey, setPoolKey] = React.useState(pools[0].key)
  const pool = pools.find((item) => item.key === poolKey) ?? pools[0]
  const max = Math.max(...recordsSummary.breakdown.map((item) => item.count))

  return (
    <section id="rekordy-b" className="scroll-mt-16 border-b border-line-b">
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <Marker index="06">Rekordy i wyniki</Marker>
            <h2 className="display-b mt-7 text-[clamp(2.5rem,15cqw,4.5rem)]">
              <span className="block">14 pozycji</span>
              <span className="outline-b block">w tabelach</span>
              <span className="block">rekordów Polski</span>
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-ink-b-soft">
              {recordsLead}
            </p>

            <ul className="mt-10 border-t border-ink-b">
              {recordsSummary.breakdown.map((item) => (
                <li
                  key={item.category}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line-b py-4"
                >
                  <span className="mono-b w-16 text-ink-b-soft">
                    {item.category}
                  </span>
                  <span
                    className="h-2 bg-electric"
                    style={{ width: `${(item.count / max) * 100}%` }}
                    aria-hidden="true"
                  />
                  <span className="time font-heading text-lg font-medium">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-b-soft">
              {recordsSummary.note}
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Długość basenu"
                className="flex border border-ink-b"
              >
                {pools.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={item.key === poolKey}
                    onClick={() => setPoolKey(item.key)}
                    className={cn(
                      "mono-b h-12 px-5 transition-colors outline-none focus-visible:bg-electric focus-visible:text-paper-b",
                      item.key === poolKey
                        ? "bg-ink-b text-paper-b"
                        : "hover:bg-paper-b-deep"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mono-b text-ink-b-soft">
                Stan na {site.dataAsOf} · PZP
              </p>
            </div>

            <div className="mt-8 border-t border-ink-b">
              {pool.groups.map((group) => (
                <section
                  key={group.category}
                  className="border-b border-line-b py-6"
                >
                  <h3 className="mono-b text-electric">
                    {group.category.replace("Rekordy Polski ", "")}
                  </h3>

                  <ul className="mt-4">
                    {group.rows.map((row) => (
                      <li
                        key={`${row.event}-${row.date}`}
                        className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-t border-line-b py-3.5 transition-colors hover:bg-ink-b hover:text-paper-b sm:px-2"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.9375rem] font-medium">
                            {row.event}
                          </p>
                          <p className="mono-b mt-1 text-ink-b-soft group-hover:text-paper-b/60">
                            {row.venue} · {row.date}
                          </p>
                        </div>
                        <p className="time display-b text-[clamp(1.5rem,4vw,2rem)]">
                          {row.time}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {group.footnote ? (
                    <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-b-soft">
                      {group.footnote}
                    </p>
                  ) : null}
                </section>
              ))}

              <section className="bg-paper-b-deep px-5 py-6 sm:px-7">
                <h3 className="mono-b text-electric">
                  Rekordy życiowe · basen {pool.shortLabel}
                </h3>
                <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
                  {pool.personalBests.map((best) => (
                    <li
                      key={best.event}
                      className="flex items-baseline justify-between gap-4 border-t border-line-b py-3"
                    >
                      <span className="text-sm">{best.event}</span>
                      <span className="time font-heading text-lg font-medium">
                        {best.time}
                      </span>
                    </li>
                  ))}
                </ul>
                {pool.personalBestsNote ? (
                  <p className="mt-5 text-xs leading-relaxed text-ink-b-soft">
                    {pool.personalBestsNote}
                  </p>
                ) : null}
              </section>
            </div>
          </div>
        </div>
      </Frame>
    </section>
  )
}
