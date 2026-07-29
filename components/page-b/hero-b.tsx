import Image from "next/image"

import portret from "@/assets/images/portret-basen.webp"
import { site } from "@/data/site"
import { Frame } from "@/components/page-b/primitives"

const facts = [
  { label: "Rocznik", value: "2010" },
  { label: "Klub", value: "UKS GIM 92 Ursynów" },
  { label: "Dystans", value: "200 m st. zmiennym" },
  { label: "Rekord", value: "2:12,45" },
]

export function HeroB() {
  return (
    <section id="gora" className="relative border-b border-line-b pt-16">
      <Frame className="@container">
        <div className="grid items-end gap-10 pt-10 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-12 lg:pt-16">
          <div className="min-w-0">
            <p className="mono-b flex items-center gap-3 text-ink-b-soft">
              <span className="size-2 bg-electric" aria-hidden="true" />
              {site.roleLong}
            </p>

            {/* Nazwisko konturem — znak rozpoznawczy tego wariantu. */}
            <h1 className="display-b mt-7 text-[clamp(3.25rem,15cqw,10rem)]">
              <span className="block">Barbara</span>
              <span className="outline-b block">Leśniewska</span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-b-soft sm:text-lg">
              Mistrzyni Europy juniorek na 200 m stylem zmiennym. Wielokrotna
              rekordzistka Polski. Jedna z najzdolniejszych zawodniczek młodego
              pokolenia polskiego pływania.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#wspolpraca-b"
                className="mono-b inline-flex h-14 items-center bg-ink-b px-7 text-paper-b transition-colors outline-none hover:bg-electric focus-visible:bg-electric"
              >
                Nawiąż współpracę ↗
              </a>
              <a
                href="#przelom"
                className="mono-b inline-flex h-14 items-center border border-ink-b px-7 transition-colors outline-none hover:bg-ink-b hover:text-paper-b focus-visible:bg-ink-b focus-visible:text-paper-b"
              >
                Zobacz wyniki ↓
              </a>
            </div>
          </div>

          {/* Zdjęcie wychodzi poza margines — łamie ramkę, jak w plakacie. */}
          <figure className="group relative -mr-5 min-w-0 sm:-mr-8 lg:-mr-8">
            <div className="duotone relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src={portret}
                alt="Barbara Leśniewska w stroju startowym i czepku na hali basenowej"
                priority
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <figcaption className="mono-b absolute top-4 left-4 z-10 bg-paper-b px-2 py-1 text-ink-b">
              Monachium 2026
            </figcaption>
          </figure>
        </div>
      </Frame>

      {/* Pasek faktów — linie konstrukcyjne zamiast kart. */}
      <div className="border-t border-line-b">
        <Frame>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex flex-col gap-1.5 py-5 lg:py-6 ${
                  index % 2 === 1 ? "border-l border-line-b pl-5" : "pr-5"
                } ${index > 1 ? "border-t border-line-b lg:border-t-0" : ""} ${
                  index > 0 ? "lg:border-l lg:border-line-b lg:pl-6" : ""
                }`}
              >
                <dt className="mono-b text-ink-b-soft">{fact.label}</dt>
                <dd className="font-heading text-lg tracking-tight sm:text-xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Frame>
      </div>
    </section>
  )
}
