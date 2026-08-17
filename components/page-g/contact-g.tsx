"use client"

import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react"

import { contactG } from "@/data/page-g/copy"
import { contact, site } from "@/data/site"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { BrandMark } from "@/components/site/primitives"
import { Frame, Grid } from "@/components/page-e/frame-e"
import { Magnetic } from "@/components/page-f/motion-f"
import { SectionG } from "@/components/page-g/section-g"

const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contactG.mailSubject)}`

/**
 * 07 — Kontakt. Jedno słowo na całą ramę, magnetyczny przycisk, dwa
 * klikalne wiersze i stopka w tym samym rozdziale.
 */
export function ContactG() {
  return (
    <SectionG id="kontakt" index={7} className="glow-g overflow-hidden">
      <Frame className="py-24 sm:py-32 lg:py-40">
        <Reveal>
          <p className="tag-f flex items-center gap-4">
            <span className="text-gold-g">{contactG.index}</span>
            <span
              className="h-px w-10 bg-current opacity-30"
              aria-hidden="true"
            />
            <span className="text-ink-g/60">{contactG.label}</span>
          </p>
          <h2 className="condensed-f @container mt-8 text-[clamp(2.75rem,13cqw,15rem)] text-ink-g">
            {contactG.title}
          </h2>
        </Reveal>

        <Grid className="mt-12 items-end gap-y-10 sm:mt-16">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-lg leading-relaxed text-ink-g/75 sm:text-xl">
              {contactG.lead}
            </p>
            <Magnetic className="mt-8 max-sm:block">
              <ButtonLink
                size="2xl"
                variant="gold"
                href={mailto}
                className="rounded-full max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
              >
                {contactG.cta}
                <ArrowUpRightIcon data-icon="inline-end" />
              </ButtonLink>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={0.08}
            className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7"
          >
            <div className="border-t border-ink-g/12">
              <div className="border-b border-ink-g/12 py-5">
                <p className="tag-f text-ink-g/55">{contact.role}</p>
                <p className="wide-f mt-2 text-2xl sm:text-3xl">
                  {contact.person}
                </p>
              </div>
              <a
                href={mailto}
                className="group flex items-center justify-between gap-6 border-b border-ink-g/12 py-5 outline-none hover:text-red-g focus-visible:text-red-g"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <MailIcon
                    className="size-5 shrink-0 text-ink-g/55 group-hover:text-red-g"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="tag-f block text-ink-g/55">E-mail</span>
                    <span className="mt-1 block truncate font-heading text-lg tracking-tight sm:text-xl">
                      {contact.email}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-ink-g/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`tel:+48${contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center justify-between gap-6 border-b border-ink-g/12 py-5 outline-none hover:text-red-g focus-visible:text-red-g"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <PhoneIcon
                    className="size-5 shrink-0 text-ink-g/55 group-hover:text-red-g"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="tag-f block text-ink-g/55">Telefon</span>
                    <span className="board-f mt-1 block text-lg sm:text-xl">
                      {contact.phone}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-ink-g/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </Grid>

        <Grid className="mt-20 items-center gap-y-4 border-t border-ink-g/12 pt-8 sm:mt-28">
          <div className="col-span-4 flex items-center gap-3 sm:col-span-8 lg:col-span-3">
            <BrandMark className="size-8" />
            <span className="font-heading text-sm font-semibold tracking-tight">
              {site.name}
            </span>
          </div>
          <p className="col-span-4 text-xs leading-relaxed text-ink-g/55 sm:col-span-8 lg:col-span-9">
            © {new Date().getFullYear()} {site.name} · Wyniki wg tabel i
            komunikatów PZP, stan na {contactG.dataAsOf} · Nagrania: Polski
            Związek Pływacki (YouTube) ·{" "}
            <a
              href="/polityka-prywatnosci"
              className="underline-offset-4 hover:text-ink-g hover:underline"
            >
              Polityka prywatności
            </a>
          </p>
        </Grid>
      </Frame>
    </SectionG>
  )
}
