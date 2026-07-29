import { stats } from "@/data/stats"
import { CountUp } from "@/components/motion/count-up"
import { Frame } from "@/components/page-b/primitives"

/**
 * Liczby jako siatka konstrukcyjna: pionowe linie zamiast kart, a najechanie
 * odwraca kafelek na czarno. Zero cieni, zero zaokrągleń.
 */
export function StatsB() {
  return (
    <section aria-label="Barbara w liczbach" className="border-b border-line-b">
      <Frame>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <li
              key={stat.label}
              className={`group flex flex-col justify-between gap-8 py-8 transition-colors duration-200 hover:bg-ink-b hover:text-paper-b sm:px-6 sm:py-10 lg:px-5 ${
                index > 0 ? "border-t border-line-b sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-line-b" : ""} ${
                index > 1 ? "sm:border-t sm:border-line-b" : ""
              } ${
                index > 0
                  ? "lg:border-t-0 lg:border-l lg:border-line-b"
                  : "lg:pl-0"
              }`}
            >
              <p className="mono-b text-ink-b-soft group-hover:text-paper-b/60">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <p className="display-b text-[clamp(2.5rem,7vw,3.75rem)]">
                  {stat.countTo !== undefined ? (
                    <CountUp
                      to={stat.countTo}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      className="tnum"
                    />
                  ) : (
                    <span className="time">{stat.value}</span>
                  )}
                </p>
                <p className="mt-4 text-sm leading-snug font-medium">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-b-soft group-hover:text-paper-b/65">
                  {stat.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  )
}
