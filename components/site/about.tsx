import Image from "next/image"

import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import trening from "@/assets/images/zgrupowanie-cetniewo.webp"
import { bioFacts, bioParagraphs, bioPullQuote } from "@/data/bio"
import { Reveal } from "@/components/motion/reveal"
import {
  Container,
  Emphasized,
  SectionHeading,
} from "@/components/site/primitives"

export function About() {
  return (
    <section id="o-barbarze" className="scroll-mt-24 bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <figure className="relative overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-foreground/10">
                  <Image
                    src={reprezentacja}
                    alt="Barbara Leśniewska w oficjalnym stroju reprezentacji Polski"
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className="relative -mt-16 ml-auto w-2/3 overflow-hidden rounded-[1.25rem] bg-mist ring-4 ring-background">
                  <Image
                    src={trening}
                    alt="Barbara Leśniewska przy brzegu basenu podczas zgrupowania kadry w Cetniewie"
                    sizes="(min-width: 1024px) 22vw, 60vw"
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Reveal>

              <Reveal delay={0.16}>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7">
                  {bioFacts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1.5">
                      <dt className="eyebrow text-slate">{fact.label}</dt>
                      <dd className="text-sm leading-snug font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                index="02"
                eyebrow="O Barbarze"
                title="Wszechstronność, która wygrywa najważniejsze finały"
              />
            </Reveal>

            <div className="mt-10 flex flex-col gap-6">
              {bioParagraphs.slice(0, 3).map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="max-w-[68ch] text-base leading-[1.75] text-graphite sm:text-[1.0625rem]">
                    <Emphasized text={paragraph} />
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <blockquote className="my-4 border-l-2 border-gold py-2 pl-6">
                  <p className="font-heading text-xl leading-snug tracking-tight text-navy sm:text-2xl">
                    {bioPullQuote.text}
                  </p>
                  <footer className="eyebrow mt-3 text-slate">
                    {bioPullQuote.caption}
                  </footer>
                </blockquote>
              </Reveal>

              {bioParagraphs.slice(3).map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="max-w-[68ch] text-base leading-[1.75] text-graphite sm:text-[1.0625rem]">
                    <Emphasized text={paragraph} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
