import { cn } from "@/lib/utils"

/**
 * Glif aparatu Instagrama — rysowany lokalnie, bo lucide nie zawiera już ikon
 * marek. Kreska 1.8 odpowiada wagą ikonom lucide używanym obok.
 */
export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5", className)}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
