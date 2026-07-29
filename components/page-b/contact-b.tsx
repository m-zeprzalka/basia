import Link from "next/link"

import { contact, site } from "@/data/site"
import { Frame, Marker } from "@/components/page-b/primitives"

const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  "Propozycja współpracy — Barbara Leśniewska"
)}`

export function ContactB() {
  return (
    <>
      <section id="kontakt-b" className="scroll-mt-16 border-b border-line-b">
        <Frame className="@container py-16 sm:py-20 lg:py-28">
          <Marker index="08">Kontakt</Marker>

          <h2 className="display-b mt-7 text-[clamp(2.5rem,10cqw,5.5rem)]">
            <span className="block">Porozmawiajmy</span>
            <span className="outline-b block">o współpracy</span>
          </h2>

          <p className="mt-8 max-w-xl leading-relaxed text-ink-b-soft sm:text-lg">
            W sprawach współpracy, sponsoringu i mediów prosimy o kontakt
            bezpośredni.
          </p>

          {/* Adres jako element typograficzny — największy link na stronie. */}
          <div className="mt-14 border-t border-ink-b">
            <p className="mono-b pt-6 text-ink-b-soft">{contact.role}</p>
            <p className="mt-3 font-heading text-2xl tracking-tight sm:text-3xl">
              {contact.person}
            </p>

            <a
              href={mailtoHref}
              className="group mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line-b pt-8 outline-none"
            >
              <span className="mono-b w-20 shrink-0 text-ink-b-soft">
                E-mail
              </span>
              <span className="display-b min-w-0 text-[clamp(1.5rem,6cqw,3rem)] break-all text-ink-b transition-colors group-hover:text-electric group-focus-visible:text-electric">
                {contact.email}
              </span>
            </a>

            <a
              href={`tel:+48${contact.phone.replace(/\s/g, "")}`}
              className="group mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line-b pt-8 outline-none"
            >
              <span className="mono-b w-20 shrink-0 text-ink-b-soft">
                Telefon
              </span>
              <span className="time display-b text-[clamp(1.75rem,7cqw,3rem)] transition-colors group-hover:text-electric group-focus-visible:text-electric">
                {contact.phone}
              </span>
            </a>
          </div>

          <a
            href={mailtoHref}
            className="mono-b mt-14 inline-flex h-16 items-center bg-ink-b px-9 text-paper-b transition-colors outline-none hover:bg-electric focus-visible:bg-electric"
          >
            Napisz w sprawie współpracy ↗
          </a>
        </Frame>
      </section>

      <footer>
        <Frame className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-b flex items-center gap-3">
            <span className="size-2 bg-electric" aria-hidden="true" />
            {site.name} · Wariant B
          </p>
          <p className="mono-b text-ink-b-soft">
            Wyniki wg tabel PZP, stan na {site.dataAsOf}
          </p>
          <Link
            href="/"
            className="mono-b underline-offset-4 transition-colors outline-none hover:text-electric focus-visible:text-electric"
          >
            ← Zobacz wariant A
          </Link>
        </Frame>
      </footer>
    </>
  )
}
