import Image from "next/image"

import portret from "@/assets/images/portret-basen-szeroki.webp"
import { site } from "@/data/site"
import { Reveal } from "@/components/motion/reveal"
import { Pill, Shell } from "@/components/page-c/primitives"

export function HeroC() {
  return (
    <section id="gora" className="pt-16">
      <Shell className="@container">
        {/* Kompozycja centralna — oś symetrii zamiast kolumn. */}
        <div className="flex flex-col items-center pt-16 pb-14 text-center sm:pt-24 lg:pt-32">
          <Reveal>
            <p className="label-c flex items-center gap-3 text-ink-c-soft">
              <span
                className="size-1.5 rounded-full bg-accent-c"
                aria-hidden="true"
              />
              {site.roleLong}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="serif-c mt-8 text-[clamp(3.25rem,13cqw,9rem)] leading-[0.98]">
              Barbara <em className="block text-accent-c">Leśniewska</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-c-soft sm:text-lg">
              Mistrzyni Europy juniorek na 200 m stylem zmiennym. Wielokrotna
              rekordzistka Polski. Jedna z najzdolniejszych zawodniczek młodego
              pokolenia polskiego pływania.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Pill href="#wspolpraca">Nawiąż współpracę</Pill>
              <a
                href="#przelom"
                className="uline-c py-3 text-sm font-medium outline-none"
              >
                Poznaj wyniki
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <figure className="mx-auto max-w-5xl pb-20 sm:pb-28">
            <div className="label-c flex items-baseline justify-between pb-3 text-ink-c-soft">
              <span>Monachium 2026</span>
              <span aria-hidden="true">(01)</span>
            </div>
            <Image
              src={portret}
              alt="Barbara Leśniewska w stroju startowym i czepku na hali basenowej"
              priority
              sizes="(min-width: 1280px) 64rem, 92vw"
              placeholder="blur"
              className="h-auto w-full"
            />
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <span className="text-sm text-ink-c-soft">
                Mistrzyni Europy juniorek · 200 m stylem zmiennym
              </span>
              <span className="flex items-baseline gap-3">
                <span className="label-c text-ink-c-soft">Rekord Polski</span>
                <span className="serif-c time text-2xl">2:12,45</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Shell>
    </section>
  )
}
