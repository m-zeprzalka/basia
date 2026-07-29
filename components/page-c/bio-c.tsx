import Image from "next/image"

import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import { bioFacts, bioParagraphs, bioPullQuote } from "@/data/bio"
import { Reveal } from "@/components/motion/reveal"
import { Quiet, Shell, Tag } from "@/components/page-c/primitives"

export function BioC() {
  const [opening, ...rest] = bioParagraphs

  return (
    <section id="sylwetka">
      <Shell className="@container py-24 sm:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-20">
          <div className="@container min-w-0">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Tag index="02">Sylwetka</Tag>
                <h2 className="serif-c mt-7 text-[clamp(2rem,11cqw,3.5rem)]">
                  Wszechstronność, która wygrywa <em>finały</em>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className="mt-10">
                  <Image
                    src={reprezentacja}
                    alt="Barbara Leśniewska w oficjalnym stroju reprezentacji Polski"
                    sizes="(min-width: 1024px) 30vw, 92vw"
                    placeholder="blur"
                    className="h-auto w-full"
                  />
                  <figcaption className="label-c mt-3 text-ink-c-soft">
                    W barwach reprezentacji Polski
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.14}>
                <dl className="mt-8 border-t border-line-c">
                  {bioFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line-c py-3.5"
                    >
                      <dt className="label-c text-ink-c-soft">{fact.label}</dt>
                      <dd className="text-right text-sm font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[62ch] text-lg leading-[1.85] text-ink-c-soft sm:text-xl sm:leading-[1.9]">
                <Quiet text={opening} />
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote className="my-14 border-y border-line-c py-10">
                <p className="serif-c max-w-2xl text-[clamp(1.5rem,4cqw,2.25rem)] leading-[1.25]">
                  <em>{bioPullQuote.text}</em>
                </p>
                <footer className="label-c mt-6 text-ink-c-soft">
                  {bioPullQuote.caption}
                </footer>
              </blockquote>
            </Reveal>

            <div className="flex max-w-[62ch] flex-col gap-7 text-[1.0625rem] leading-[1.85] text-ink-c-soft">
              {rest.map((paragraph, index) => (
                <Reveal key={index} delay={Math.min(index, 3) * 0.04}>
                  <p>
                    <Quiet text={paragraph} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
