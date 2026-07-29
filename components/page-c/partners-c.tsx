import Image from "next/image"

import cetniewo from "@/assets/images/zgrupowanie-cetniewo.webp"
import { contact } from "@/data/site"
import { sponsorship } from "@/data/sponsorship"
import { Reveal } from "@/components/motion/reveal"
import { Pill, Shell, Tag } from "@/components/page-c/primitives"

const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  "Propozycja współpracy — Barbara Leśniewska"
)}`

export function PartnersC() {
  return (
    <section id="wspolpraca">
      <Shell className="@container py-24 sm:py-32 lg:py-44">
        {/* Manifest na osi — sekcja pisana wprost do sponsora. */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Tag index="07">Współpraca</Tag>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="serif-c mx-auto mt-8 max-w-4xl text-[clamp(2.5rem,8cqw,5.5rem)]">
              Zainwestuj w <em>przyszłość</em> polskiego pływania
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-c-soft sm:text-lg">
              {sponsorship.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ol className="mx-auto mt-20 max-w-3xl border-t border-line-c sm:mt-24">
            {sponsorship.benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-line-c py-8 sm:py-9"
              >
                <span className="serif-c text-2xl text-accent-c">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-medium sm:text-xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-c-soft sm:text-[0.9375rem]">
                    {benefit.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Spokojny kadr treningowy — oddech między argumentami a kalendarzem. */}
        <Reveal delay={0.06}>
          <figure className="mx-auto mt-20 max-w-5xl sm:mt-28">
            <Image
              src={cetniewo}
              alt="Barbara Leśniewska przy brzegu basenu podczas zgrupowania kadry w Cetniewie"
              sizes="(min-width: 1280px) 64rem, 92vw"
              placeholder="blur"
              className="h-auto w-full"
            />
            <figcaption className="label-c mt-3 text-right text-ink-c-soft">
              Zgrupowanie kadry — COS Cetniewo
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-20 max-w-4xl sm:mt-28">
            <h3 className="label-c text-center text-ink-c-soft">
              Horyzont startów
            </h3>
            <ol className="mt-8 grid gap-10 border-t border-line-c pt-10 text-center sm:grid-cols-3">
              {sponsorship.horizon.map((entry) => (
                <li key={entry.year}>
                  <p className="serif-c text-[clamp(2.5rem,6cqw,3.5rem)]">
                    {entry.year}
                  </p>
                  <p className="mt-2 font-medium">{entry.label}</p>
                  <p className="mt-1 text-sm text-ink-c-soft">{entry.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-col items-center gap-5 sm:mt-20">
            <Pill href={mailtoHref} className="h-14 px-9 text-base">
              {sponsorship.cta}
            </Pill>
            <p className="text-sm text-ink-c-soft">
              lub napisz bezpośrednio:{" "}
              <a href={mailtoHref} className="uline-c font-medium text-ink-c">
                {contact.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}
