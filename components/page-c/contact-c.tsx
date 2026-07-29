import Link from "next/link"

import { contact, site } from "@/data/site"
import { Reveal } from "@/components/motion/reveal"
import { Shell, Tag } from "@/components/page-c/primitives"

const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  "Propozycja współpracy — Barbara Leśniewska"
)}`

export function ContactC() {
  return (
    <>
      <section id="kontakt" className="border-t border-line-c bg-paper-c-soft">
        <Shell className="@container py-24 text-center sm:py-32 lg:py-40">
          <Reveal>
            <Tag index="08" className="justify-center">
              Kontakt
            </Tag>
            <h2 className="serif-c mx-auto mt-8 max-w-3xl text-[clamp(2.125rem,8cqw,5rem)]">
              Porozmawiajmy <em>o współpracy</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="label-c mt-14 text-ink-c-soft">{contact.role}</p>
            <p className="serif-c mt-3 text-2xl sm:text-3xl">
              {contact.person}
            </p>
          </Reveal>

          {/* Adres jako największa typografia sekcji — jedyny właściwy CTA. */}
          <Reveal delay={0.12}>
            <p className="mt-10">
              <a
                href={mailtoHref}
                className="serif-c uline-c inline-block max-w-full text-[clamp(1.375rem,4.8cqw,3rem)] break-all transition-colors outline-none hover:text-accent-c focus-visible:text-accent-c"
              >
                {contact.email}
              </a>
            </p>
            <p className="mt-6">
              <a
                href={`tel:+48${contact.phone.replace(/\s/g, "")}`}
                className="serif-c uline-c time inline-block text-[clamp(1.25rem,3.6cqw,2rem)] transition-colors outline-none hover:text-accent-c focus-visible:text-accent-c"
              >
                {contact.phone}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-16 max-w-md text-xs leading-relaxed text-ink-c-soft">
              Wyniki sportowe podajemy wg tabel i komunikatów Polskiego Związku
              Pływackiego — stan na {site.dataAsOf}.
            </p>
          </Reveal>
        </Shell>
      </section>

      <footer className="border-t border-line-c bg-paper-c-soft">
        <Shell className="flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ink-c-soft">
            © {new Date().getFullYear()} {site.name} · Wariant C
          </p>
          <p className="flex items-center gap-5 text-xs text-ink-c-soft">
            <a href="/polityka-prywatnosci" className="uline-c">
              Polityka prywatności
            </a>
            <Link href="/" className="uline-c">
              Wariant A
            </Link>
            <Link href="/page-b" className="uline-c">
              Wariant B
            </Link>
          </p>
        </Shell>
      </footer>
    </>
  )
}
