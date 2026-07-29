import { site } from "@/data/site"
import { Container, BrandMark } from "@/components/site/primitives"

/**
 * Stopka celowo minimalna i jasna — nie ma odciągać uwagi od sekcji
 * współpracy, która jest celem strony.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-8" />
          <span className="font-heading text-sm font-semibold tracking-tight">
            {site.name}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · Wyniki wg tabel PZP, stan
          na {site.dataAsOf} ·{" "}
          <a
            href="/polityka-prywatnosci"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Polityka prywatności
          </a>
        </p>
      </Container>
    </footer>
  )
}
