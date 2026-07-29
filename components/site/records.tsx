import { cn } from "@/lib/utils"
import {
  pools,
  recordsLead,
  recordsSummary,
  type AgeGroup,
  type Pool,
} from "@/data/records"
import { site } from "@/data/site"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/motion/reveal"
import { Container, SectionHeading } from "@/components/site/primitives"

export function Records() {
  return (
    <section id="rekordy" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                index="06"
                eyebrow="Rekordy i wyniki"
                title="14 pozycji w tabelach rekordów Polski"
                lead={recordsLead}
              />
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-6">
            <RecordsSummary />
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-16">
          <Tabs defaultValue="50" className="gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TabsList className="group-data-horizontal/tabs:h-11 p-1">
                {pools.map((pool) => (
                  <TabsTrigger key={pool.key} value={pool.key} className="px-4">
                    {pool.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <p className="text-xs text-muted-foreground">
                Stan na {site.dataAsOf} wg tabel i komunikatów PZP
              </p>
            </div>

            {pools.map((pool) => (
              <TabsContent key={pool.key} value={pool.key}>
                <PoolPanel pool={pool} />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </Container>
    </section>
  )
}

/** Wiersz w układzie zgodnym z sekcją „Osiągnięcia": etykieta w lewej kolumnie, treść po prawej. */
function RecordRow({
  label,
  badge,
  featured,
  children,
}: {
  label: string
  badge: string
  featured?: boolean
  children: React.ReactNode
}) {
  return (
    <li
      className={cn(
        "grid gap-x-10 gap-y-6 border-b border-border py-10 lg:grid-cols-[13rem_1fr] lg:py-12",
        featured && "bg-[linear-gradient(to_left,var(--mist),transparent_60%)]"
      )}
    >
      <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
        <p className="font-heading text-sm font-semibold tracking-tight text-navy lg:text-base">
          {label}
        </p>
        <Badge
          variant="outline"
          className={cn(
            "border-border bg-background text-[0.6875rem] tracking-wide",
            featured && "border-gold/50 text-gold-ink"
          )}
        >
          {badge}
        </Badge>
      </div>
      <div className="min-w-0">{children}</div>
    </li>
  )
}

function PoolPanel({ pool }: { pool: Pool }) {
  return (
    <ol className="border-t border-border">
      {pool.groups.map((group) => (
        <AgeGroupRow key={group.category} group={group} />
      ))}

      <RecordRow
        label="Rekordy życiowe"
        badge={`Basen ${pool.shortLabel}`}
        featured
      >
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {pool.personalBests.map((best) => (
            <li
              key={best.event}
              className="flex items-baseline justify-between gap-4 border-b border-border/70 py-3 last:border-b-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <span className="text-[0.9375rem]">{best.event}</span>
              <span className="time font-heading text-lg font-semibold tracking-tight text-navy">
                {best.time}
              </span>
            </li>
          ))}
        </ul>
        {pool.personalBestsNote ? (
          <p className="mt-6 max-w-2xl border-l-2 border-azure/30 pl-4 text-sm leading-relaxed text-graphite">
            {pool.personalBestsNote}
          </p>
        ) : null}
      </RecordRow>
    </ol>
  )
}

function AgeGroupRow({ group }: { group: AgeGroup }) {
  return (
    <RecordRow
      label={group.category.replace("Rekordy Polski ", "")}
      badge={`${group.rows.length} ${group.rows.length === 1 ? "rekord" : "rekordy"}`}
    >
      {/* Ten sam układ co w „Osiągnięciach": czas nad konkurencją, bez
          osobnej kolumny przy prawej krawędzi. */}
      <ul className="flex flex-col">
        {group.rows.map((row) => (
          <li
            key={`${row.event}-${row.date}`}
            className="border-b border-border/70 py-3.5 last:border-b-0"
          >
            <p className="time font-heading text-xl leading-snug font-semibold tracking-tight text-navy sm:text-2xl">
              {row.time}
            </p>
            <p className="mt-0.5 text-[0.9375rem] leading-snug font-medium">
              {row.event}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {row.venue}, {row.date}
            </p>
          </li>
        ))}
      </ul>

      {group.footnote ? (
        <p className="mt-6 max-w-2xl border-l-2 border-azure/30 pl-4 text-sm leading-relaxed text-graphite">
          {group.footnote}
        </p>
      ) : null}
    </RecordRow>
  )
}

function RecordsSummary() {
  const max = Math.max(...recordsSummary.breakdown.map((item) => item.count))

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {recordsSummary.total} pozycji w tabelach rekordów Polski kategorii
          15–18 lat, wynikających z {recordsSummary.fromResults} różnych
          rezultatów.
        </p>
        <p className="display text-6xl text-navy">{recordsSummary.total}</p>
      </div>

      <ul className="flex flex-col">
        {recordsSummary.breakdown.map((item) => (
          <li
            key={item.category}
            className="flex flex-col gap-2 border-b border-border py-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium">
                Kategoria {item.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.detail}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-deep">
                <div
                  className="h-full rounded-full bg-azure"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
              <span className="time w-6 text-right text-sm font-semibold text-navy">
                {item.count}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        {recordsSummary.note}
      </p>
    </div>
  )
}
