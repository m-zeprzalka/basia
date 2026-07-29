import Image from "next/image"

import reprezentacja from "@/assets/images/reprezentacja-polski.webp"
import { bioFacts, bioParagraphs, bioPullQuote } from "@/data/bio"
import { Frame, Marked, Marker } from "@/components/page-b/primitives"

export function BioB() {
  const [opening, ...rest] = bioParagraphs

  return (
    <section id="sylwetka" className="scroll-mt-16 border-b border-line-b">
      <Frame className="@container py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <Marker index="02">Sylwetka</Marker>
            <h2 className="display-b mt-7 text-[clamp(2rem,13cqw,4.5rem)]">
              <span className="block">Wszechstronność,</span>
              <span className="outline-b block">która wygrywa</span>
            </h2>

            <figure className="group mt-10 hidden lg:block">
              <div className="duotone relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={reprezentacja}
                  alt="Barbara Leśniewska w oficjalnym stroju reprezentacji Polski"
                  fill
                  sizes="30vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </figure>

            <dl className="mt-10 border-t border-line-b">
              {bioFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line-b py-3.5"
                >
                  <dt className="mono-b text-ink-b-soft">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            {/* Inicjał otwierający — chwyt rodem ze składu prasowego. */}
            <p className="text-[1.0625rem] leading-[1.75] text-ink-b-soft first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--font-anton)] first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:text-electric sm:text-lg">
              <Marked text={opening} />
            </p>

            <blockquote className="my-10 border-y border-ink-b py-8">
              <p className="display-b text-[clamp(1.5rem,5cqw,2.25rem)]">
                {bioPullQuote.text}
              </p>
              <footer className="mono-b mt-5 text-ink-b-soft">
                {bioPullQuote.caption}
              </footer>
            </blockquote>

            {/* Dwie szpalty tekstu — gęstość magazynu, nie strony wizytówkowej. */}
            <div className="flex flex-col gap-6 text-[1.0625rem] leading-[1.75] text-ink-b-soft lg:columns-2 lg:gap-10 lg:[&>p]:mb-6">
              {rest.map((paragraph, index) => (
                <p key={index}>
                  <Marked text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    </section>
  )
}
