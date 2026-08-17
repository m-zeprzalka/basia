"use client"

import { chapters } from "@/data/page-e/chapters"
import { cn } from "@/lib/utils"
import { useActiveChapter } from "@/components/page-e/use-active-chapter"

/**
 * Boczna listwa rozdziałów (desktop) — jak numeracja slajdów w prezentacji.
 * Aktywna kreska wydłuża się i pokazuje etykietę; reszta jest kropką.
 * Listwa leży nad różnymi tłami, więc rysuje się bielą w trybie
 * `mix-blend-difference` — na bieli staje się czarna, na granacie jasna.
 */
export function RailE() {
  const active = useActiveChapter()

  return (
    <nav
      aria-label="Rozdziały prezentacji"
      className={cn(
        // `mix-blend-difference` musi siedzieć na elemencie w głównym kontekście
        // warstw (fixed + z-index tworzy własny) — wtedy biel odwraca się na
        // tle strony: na bieli daje czerń, na granacie jasność.
        "fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 mix-blend-difference transition-opacity duration-500 lg:block 2xl:left-6",
        // Na okładce listwa jest zbędna (numer slajdu pokazuje nagłówek) i
        // wchodziłaby w tytuł — pojawia się od pierwszego rozdziału.
        active === 0 ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <ol className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const isActive = chapter.index === active
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${String(chapter.index).padStart(2, "0")} — ${chapter.label}`}
                className="group flex h-4 items-center gap-3 outline-none"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-6 group-focus-visible:w-6",
                    isActive ? "w-6 bg-white" : "w-2 bg-white/55"
                  )}
                  aria-hidden="true"
                />
                <span
                  className="eyebrow pointer-events-none translate-x-1 whitespace-nowrap text-white opacity-0 mix-blend-difference transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  {String(chapter.index).padStart(2, "0")}
                  <span className="opacity-60"> · </span>
                  {chapter.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
