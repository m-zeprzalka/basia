import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Barbara Leśniewska — wariant A (archiwalny)",
  description:
    "Pierwotny wariant strony Barbary Leśniewskiej — zachowany jako punkt odniesienia z przetargu.",
  // Wariant archiwalny — nie konkuruje w wyszukiwarce ze stroną główną.
  robots: { index: false, follow: false },
}

/**
 * Wariant A — pierwotna strona główna sprzed przetargu, przeniesiona
 * spod `/` (stronę główną zajmuje finalny układ I). Bez zmian w treści.
 */
export default function PageALayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
