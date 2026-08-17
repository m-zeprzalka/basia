import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react"

import portret from "@/assets/images/portret-basen-szeroki.webp"
import { contact as copy } from "@/data/page-e/copy"
import { contact, site } from "@/data/site"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { BrandMark } from "@/components/site/primitives"
import {
  Chapter,
  ChapterHead,
  Frame,
  Grid,
  chapterPadding,
} from "@/components/page-e/frame-e"
import { ParallaxImageE } from "@/components/page-e/parallax-image-e"

export const mailtoHrefE = `mailto:${contact.email}?subject=${encodeURIComponent(copy.mailSubject)}`

/**
 * 07 — Kontakt i zamknięcie prezentacji. Jedno słowo, dwa klikalne wiersze,
 * portret. Stopka jest częścią rozdziału — prezentacja kończy się jednym
 * ekranem, nie doklejonym paskiem.
 */
export function ContactE() {
  return (
    <Chapter id="kontakt" index={7} tone="deep" className="overflow-hidden">
      <div
        className="water-e pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Frame className={`relative ${chapterPadding}`}>
        <Reveal>
          <ChapterHead
            index={7}
            label={copy.label}
            title={copy.title}
            lead={copy.lead}
            titleClassName="text-[clamp(2.75rem,10cqw,7rem)]"
          />
        </Reveal>

        <Grid className="mt-12 items-end gap-y-10 sm:mt-16 lg:mt-20">
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-4">
            <div className="border-t border-white/15">
              <div className="border-b border-white/15 py-6">
                <p className="eyebrow text-white/65">{contact.role}</p>
                <p className="display-e mt-3 text-3xl text-white sm:text-4xl">
                  {contact.person}
                </p>
              </div>
              <a
                href={mailtoHrefE}
                className="group flex items-center justify-between gap-6 border-b border-white/15 py-5 text-white transition-colors outline-none hover:text-aqua focus-visible:text-aqua sm:py-6"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <MailIcon
                    className="size-5 shrink-0 text-white/60 transition-colors group-hover:text-aqua"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="eyebrow block text-white/60">E-mail</span>
                    <span className="mt-1 block truncate font-heading text-lg tracking-tight sm:text-xl">
                      {contact.email}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`tel:+48${contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center justify-between gap-6 border-b border-white/15 py-5 text-white transition-colors outline-none hover:text-aqua focus-visible:text-aqua sm:py-6"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <PhoneIcon
                    className="size-5 shrink-0 text-white/60 transition-colors group-hover:text-aqua"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="eyebrow block text-white/60">Telefon</span>
                    <span className="board-e mt-1 block text-lg sm:text-xl">
                      {contact.phone}
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
            <ButtonLink
              size="2xl"
              variant="gold"
              href={mailtoHrefE}
              className="mt-8 max-sm:h-auto max-sm:w-full max-sm:py-4 max-sm:whitespace-normal"
            >
              {copy.cta}
              <ArrowUpRightIcon data-icon="inline-end" />
            </ButtonLink>
          </Reveal>

          <Reveal
            delay={0.1}
            className="col-span-4 sm:col-span-8 lg:col-span-3 lg:col-start-10"
          >
            <ParallaxImageE
              src={portret}
              alt="Barbara Leśniewska w stroju startowym i czepku na hali basenowej"
              sizes="(min-width: 1024px) 22vw, 100vw"
              position="55% 30%"
              strength={8}
              className="aspect-[4/5] rounded-2xl ring-1 ring-white/10 max-lg:hidden"
            />
          </Reveal>
        </Grid>

        {/* Stopka prezentacji. */}
        <Grid className="mt-16 items-center gap-y-4 border-t border-white/15 pt-8 sm:mt-24 lg:mt-28">
          <div className="col-span-4 flex items-center gap-3 sm:col-span-8 lg:col-span-3">
            <BrandMark className="size-8" />
            <span className="font-heading text-sm font-semibold tracking-tight text-white">
              {site.name}
            </span>
          </div>
          <p className="col-span-4 text-xs leading-relaxed text-white/60 sm:col-span-8 lg:col-span-9">
            © {new Date().getFullYear()} {site.name} · Wyniki wg tabel i
            komunikatów PZP, stan na {copy.dataAsOf} · Nagrania: Polski Związek
            Pływacki (YouTube) ·{" "}
            <a
              href="/polityka-prywatnosci"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Polityka prywatności
            </a>
          </p>
        </Grid>
      </Frame>
    </Chapter>
  )
}
