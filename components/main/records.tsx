import type { Medal as MedalKind } from "@/data/achievements"
import type { MedalsDict } from "@/data/main/types"
import { Medal } from "@/components/main/medal"

/**
 * Tabele rekordów PZP w skondensowanej formie — przy wierszach rekordów
 * ustanowionych w wyścigach medalowych rysujemy zdobyty medal (życzenie
 * klienta — „warto pokazać medale, o ile były zdobyte").
 */
export function RecordsCompact({
  t,
  medalLabels,
}: {
  t: MedalsDict["records"]
  medalLabels: Record<MedalKind, string>
}) {
  const anyMedal = t.pools.some((pool) =>
    pool.groups.some((group) => group.rows.some((row) => row.medal))
  )

  return (
    <div className="flex flex-col gap-10">
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.breakdown.map((item) => (
          <li
            key={item.dialogLabel}
            className="flex items-baseline justify-between gap-3 border-b border-border/70 py-2 text-sm"
          >
            <span className="font-medium">{item.dialogLabel}</span>
            <span className="text-muted-foreground">
              <span className="time font-semibold text-navy">{item.count}</span>{" "}
              · {item.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {t.pools.map((pool) => (
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
                      <th scope="col">{t.tableSr.event}</th>
                      <th scope="col">{t.tableSr.result}</th>
                      <th scope="col">{t.tableSr.venueDate}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr
                        key={`${row.event}-${row.date}`}
                        className="border-b border-border/70"
                      >
                        <td className="py-2 pr-3">
                          <span className="flex items-center gap-2.5">
                            <span
                              className="flex w-6 shrink-0 justify-center"
                              aria-hidden={row.medal ? undefined : "true"}
                            >
                              {row.medal ? (
                                <Medal medal={row.medal} className="size-6" />
                              ) : null}
                            </span>
                            <span>
                              {row.event}
                              {row.medal ? (
                                <span className="sr-only">
                                  {" "}
                                  — {medalLabels[row.medal]} {t.medalInRace}
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </td>
                        <td className="time py-2 pr-3 text-right align-middle font-semibold whitespace-nowrap text-navy">
                          {row.time}
                        </td>
                        <td className="py-2 text-right align-middle text-muted-foreground">
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
                {t.personalBestsHeading} · {pool.label}
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
        {anyMedal ? `${t.hint} ` : null}
        {t.note}
      </p>
    </div>
  )
}
