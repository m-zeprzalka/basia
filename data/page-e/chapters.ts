/**
 * Rozdziały prezentacji E — jedno źródło dla nawigacji, bocznej listwy
 * postępu i numeracji nagłówków. Kolejność = kolejność na stronie.
 */

export type ChapterMeta = {
  index: number
  id: string
  /** Krótka etykieta — nawigacja, listwa. */
  label: string
}

export const chapters: ChapterMeta[] = [
  { index: 0, id: "start", label: "Start" },
  { index: 1, id: "wynik", label: "Wynik" },
  { index: 2, id: "trajektoria", label: "Trajektoria" },
  { index: 3, id: "medale", label: "Medale" },
  { index: 4, id: "paryz", label: "Paryż 2026" },
  { index: 5, id: "media", label: "Media" },
  { index: 6, id: "partnerstwo", label: "Partnerstwo" },
  { index: 7, id: "kontakt", label: "Kontakt" },
]

export const chapterCount = chapters.length

/** Pozycje w nagłówku (bez „Start" i „Kontakt" — te mają własne przyciski). */
export const navChapters = chapters.filter(
  (chapter) => chapter.index > 0 && chapter.index < chapterCount - 1
)
