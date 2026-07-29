const phrases = [
  "Mistrzyni Europy juniorek",
  "14 rekordów Polski",
  "10 medali mistrzowskich",
  "Mistrzyni Polski seniorek",
  "Paryż 2026",
  "Los Angeles 2028",
]

/**
 * Pas manifestu — wielka typografia w ruchu, naprzemiennie pełna i konturowa.
 * Zastępuje delikatny pasek faktów z wariantu A czymś znacznie głośniejszym.
 */
export function MarqueeB() {
  return (
    <div className="overflow-hidden border-b border-line-b bg-paper-b-deep py-5 sm:py-7">
      <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee-b">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {phrases.map((phrase, index) => (
              <li
                key={phrase}
                className="display-b flex items-center text-[clamp(1.75rem,5vw,3.5rem)] whitespace-nowrap"
              >
                <span className={index % 2 === 1 ? "outline-b" : undefined}>
                  {phrase}
                </span>
                <span
                  className="mx-6 size-3 shrink-0 rotate-45 bg-electric sm:mx-10"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
