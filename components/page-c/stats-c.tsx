import { stats } from "@/data/stats"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Shell } from "@/components/page-c/primitives"

/**
 * Liczby jako spokojny rejestr — jeden wiersz na fakt, włoskowate linie,
 * duża lekka cyfra po lewej. Żadnych kart ani kafelków.
 */
export function StatsC() {
  return (
    <section aria-label="Barbara w liczbach" className="border-t border-line-c">
      <Shell className="@container">
        <ol>
          {stats.map((stat, index) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={Math.min(index, 3) * 0.05}
              className="grid items-baseline gap-x-10 gap-y-3 border-b border-line-c py-9 last:border-b-0 sm:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] sm:py-11"
            >
              <p className="serif-c time text-[clamp(2.75rem,8cqw,4.5rem)]">
                {stat.countTo !== undefined ? (
                  <CountUp
                    to={stat.countTo}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    className="tnum"
                  />
                ) : (
                  stat.value
                )}
              </p>
              <div className="min-w-0">
                <p className="text-base font-medium sm:text-lg">{stat.label}</p>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-c-soft">
                  {stat.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </section>
  )
}
