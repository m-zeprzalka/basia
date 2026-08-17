import Image from "next/image"
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react"

import monachiumZloto from "@/assets/images/monachium-zloty-medal.webp"
import { contactCopy } from "@/data/page-d/pitch"
import { contact } from "@/data/site"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/site/primitives"
import { Medal, SectionHeadD } from "@/components/page-d/primitives-d"

export const mailtoHrefD = `mailto:${contact.email}?subject=${encodeURIComponent(
  contactCopy.mailSubject
)}`

/**
 * 07 — kontakt. Zamyka prezentację tak, jak zaczęła się: zdjęciem ze złotem
 * i jednym wezwaniem do działania. Dane kontaktowe są dużymi, klikalnymi
 * wierszami — na telefonie jedno dotknięcie wybiera numer albo otwiera e-mail.
 */
export function ContactD() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionHeadD
                index={7}
                eyebrow={contactCopy.eyebrow}
                title={contactCopy.title}
                lead={contactCopy.lead}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-10 border-t border-border">
                <div className="border-b border-border py-6">
                  <p className="eyebrow text-slate">{contact.role}</p>
                  <p className="display mt-3 text-3xl sm:text-4xl">
                    {contact.person}
                  </p>
                </div>

                <a
                  href={mailtoHrefD}
                  className="group flex items-center justify-between gap-6 border-b border-border py-5 transition-colors outline-none hover:text-azure focus-visible:text-azure sm:py-6"
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
                  className="group flex items-center justify-between gap-6 border-b border-border py-5 transition-colors outline-none hover:text-azure focus-visible:text-azure sm:py-6"
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
                href={mailtoHrefD}
                className="mt-8 max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
              >
                {contactCopy.cta}
                <ArrowUpRightIcon data-icon="inline-end" />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-w-0 max-lg:hidden">
            <figure className="relative overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-foreground/10">
              <div className="relative aspect-[5/4]">
                <Image
                  src={monachiumZloto}
                  alt="Barbara Leśniewska prezentuje złoty medal mistrzostw Europy juniorów na tle basenu w Monachium"
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  placeholder="blur"
                  className="object-cover object-[50%_25%]"
                />
              </div>
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/85 p-3 pr-4 ring-1 ring-foreground/10 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <Medal medal="gold" className="size-10" decorative />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-navy">
                    Mistrzyni Europy juniorów 2026
                  </span>
                  <span className="mt-0.5 block text-xs text-slate">
                    200 m stylem zmiennym · Monachium
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
