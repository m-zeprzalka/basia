"use client"

import * as React from "react"

/**
 * Który rozdział (`[data-chapter]`) jest teraz „na scenie".
 * Rozdział wygrywa, gdy przecina pas w środku okna (45–55 % wysokości) —
 * dzięki temu długie rozdziały nie oddają aktywności zbyt wcześnie.
 */
export function useActiveChapter() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const index = Number(visible.target.getAttribute("data-chapter"))
          if (!Number.isNaN(index)) setActive(index)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}
