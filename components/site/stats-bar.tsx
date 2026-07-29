import { cn } from "@/lib/utils"
import { stats } from "@/data/stats"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"

export function StatsBar() {
  return (
    <section
      aria-label="Barbara w liczbach"
      className="border-b border-border bg-mist"
    >
      <Container className="py-14 sm:py-16">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-5 lg:gap-x-6">
          {stats.map((stat, index) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={index * 0.06}
              className={cn(
                "@container flex flex-col gap-2 border-l pl-5",
                stat.highlight ? "border-gold" : "border-hairline",
                // Pierwszy kafelek zajmuje pełną szerokość na małych ekranach.
                index === 0 && "col-span-2 lg:col-span-1"
              )}
            >
              <p
                className={cn(
                  "display text-[clamp(1.875rem,24cqw,3rem)]",
                  stat.highlight ? "time text-navy" : "text-foreground"
                )}
              >
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
              <p className="text-sm leading-snug font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {stat.note}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
