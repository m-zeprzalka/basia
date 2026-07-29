const items = [
  "Mistrzyni Europy juniorek 2026",
  "2:12,45 — rekord Polski 16-, 17- i 18-latek",
  "10 medali mistrzowskich w sezonach 2025–2026",
  "Dwukrotna mistrzyni Polski seniorek",
  "5 medali EYOF Skopje 2025",
  "14 rekordów Polski",
  "Minima na ME seniorów — Paryż 2026",
]

/** Pasek przewijanych faktów — jasny, oddzielony wyłącznie liniami. */
export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border bg-background py-4">
      <div className="edge-fade-x flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 text-sm whitespace-nowrap text-graphite"
              >
                <span
                  className="size-1.5 shrink-0 rotate-45 bg-gold"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
