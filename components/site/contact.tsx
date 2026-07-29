import Image from "next/image"
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react"

import naScianie from "@/assets/images/na-scianie-basenu.webp"
import { contact } from "@/data/site"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Container, SectionHeading } from "@/components/site/primitives"

const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  "Propozycja współpracy — Barbara Leśniewska"
)}`

export function Contact() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            index="08"
            eyebrow="Kontakt"
            title="Porozmawiajmy o współpracy"
            lead="W sprawach współpracy, sponsoringu i mediów prosimy o kontakt bezpośredni."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <Reveal delay={0.06} className="min-w-0">
            <div className="border-t border-border">
              <div className="border-b border-border py-7">
                <p className="eyebrow text-slate">{contact.role}</p>
                <p className="display mt-3 text-3xl sm:text-4xl">
                  {contact.person}
                </p>
              </div>

              {/* Dane kontaktowe jako duże, klikalne wiersze — bez ozdobników. */}
              <a
                href={mailtoHref}
                className="group flex items-center justify-between gap-6 border-b border-border py-6 transition-colors outline-none hover:text-azure focus-visible:text-azure"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <MailIcon
                    className="size-5 shrink-0 text-slate transition-colors group-hover:text-azure"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="eyebrow block text-slate">E-mail</span>
                    <span className="mt-1 block truncate font-heading text-lg tracking-tight sm:text-xl">
                      {contact.email}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={`tel:+48${contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center justify-between gap-6 border-b border-border py-6 transition-colors outline-none hover:text-azure focus-visible:text-azure"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <PhoneIcon
                    className="size-5 shrink-0 text-slate transition-colors group-hover:text-azure"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="eyebrow block text-slate">Telefon</span>
                    <span className="time mt-1 block font-heading text-lg tracking-tight sm:text-xl">
                      {contact.phone}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <ButtonLink
              size="2xl"
              href={mailtoHref}
              className="mt-9 max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
            >
              Napisz w sprawie współpracy
              <ArrowUpRightIcon data-icon="inline-end" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0">
            <figure className="overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-foreground/10">
              <Image
                src={naScianie}
                alt="Barbara Leśniewska przy ścianie basenu po zakończonym wyścigu"
                sizes="(min-width: 1024px) 34vw, 92vw"
                placeholder="blur"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
