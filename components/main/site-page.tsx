import { getDict } from "@/data/main"
import type { Locale } from "@/data/main/types"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { Contact } from "@/components/main/contact"
import { Cover } from "@/components/main/cover"
import { Dock } from "@/components/main/dock"
import { Media } from "@/components/main/media"
import { Medals } from "@/components/main/medals"
import { Nav } from "@/components/main/nav"
import { Paris } from "@/components/main/paris"
import { Partners } from "@/components/main/partners"
import { Progress } from "@/components/main/progress"
import { Rail } from "@/components/main/rail"
import { Result } from "@/components/main/result"

/**
 * Strona główna — finalny układ wyłoniony w przetargu (wariant I) w dwóch
 * wersjach językowych. Każdy rozdział dostaje swój wycinek słownika przez
 * propsy; kotwice rozdziałów są lokalizowane (`#wynik` / `#result`).
 */
export function SitePage({ locale }: { locale: Locale }) {
  const dict = getDict(locale)
  const id = (index: number) => dict.chapters[index].id

  return (
    <div className="page-main">
      <a
        href={`#${dict.mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        {dict.skipLink}
      </a>

      <ScrollProgress />
      <Nav t={dict.nav} chapters={dict.chapters} locale={locale} />
      <Rail chapters={dict.chapters} ariaLabel={dict.nav.chaptersAria} />

      <main id={dict.mainId}>
        <Cover t={dict.cover} chapterCount={dict.chapters.length} />
        <Result
          id={id(1)}
          t={dict.result}
          replay={dict.replay}
          decimal={dict.decimal}
          medalLabels={dict.medals.medalLabels}
        />
        <Progress
          id={id(2)}
          t={dict.progress}
          medalLabels={dict.medals.medalLabels}
        />
        <Medals id={id(3)} t={dict.medals} videoUi={dict.videoUi} />
        <Paris id={id(4)} t={dict.paris} videoUi={dict.videoUi} />
        <Media id={id(5)} t={dict.media} videoUi={dict.videoUi} />
        <Partners
          id={id(6)}
          t={dict.partnership}
          contactHref={dict.dock.href}
        />
        <Contact id={id(7)} t={dict.contact} />
      </main>

      <Dock
        label={dict.dock.label}
        href={dict.dock.href}
        contactId={dict.dock.contactId}
      />
    </div>
  )
}
