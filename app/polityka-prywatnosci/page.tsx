import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { contact, site } from "@/data/site"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/site/primitives"
import { SiteFooter } from "@/components/site/site-footer"

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Zasady przetwarzania danych na oficjalnej stronie ${site.name}.`,
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-background">
        <Container className="py-20 sm:py-28">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Strona główna
          </Link>

          <h1 className="display mt-8 text-4xl sm:text-5xl">
            Polityka prywatności
          </h1>

          <div className="mt-10 flex max-w-[68ch] flex-col gap-6 text-base leading-[1.75] text-graphite">
            <p>
              Strona {site.url.replace("https://", "")} jest wizytówką
              zawodniczki {site.name}. Ma charakter informacyjny i nie prowadzi
              rejestracji użytkowników ani sprzedaży.
            </p>

            <h2 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
              Administrator danych
            </h2>
            <p>
              Administratorem danych przekazanych w korespondencji jest
              opiekun&nbsp;/&nbsp;menedżer zawodniczki
              {contact.person
                ? ` — ${contact.person}`
                : " (dane do uzupełnienia)"}
              {contact.email ? `, e-mail: ${contact.email}` : ""}.
            </p>

            <h2 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
              Zakres i cel przetwarzania
            </h2>
            <p>
              Dane podane w wiadomości e-mail lub telefonicznie przetwarzamy
              wyłącznie w celu udzielenia odpowiedzi i prowadzenia rozmów o
              współpracy. Nie przekazujemy ich podmiotom trzecim w celach
              marketingowych.
            </p>

            <h2 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
              Pliki cookies i statystyki
            </h2>
            <p>
              Strona nie stosuje własnych plików cookies do śledzenia
              użytkowników. Jeżeli w przyszłości zostanie podłączone narzędzie
              analityczne, informacja o tym pojawi się w tym dokumencie wraz z
              mechanizmem zgody.
            </p>

            <h2 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
              Prawa osób, których dane dotyczą
            </h2>
            <p>
              Przysługuje Państwu prawo dostępu do danych, ich sprostowania,
              usunięcia lub ograniczenia przetwarzania, a także prawo wniesienia
              skargi do Prezesa Urzędu Ochrony Danych Osobowych. W tych sprawach
              prosimy o kontakt na adres wskazany powyżej.
            </p>

            <h2 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
              Prawa do materiałów
            </h2>
            <p>
              Zdjęcia i treści zamieszczone na stronie są chronione prawem
              autorskim. Wykorzystanie ich wymaga zgody właściciela strony.
              Wyniki sportowe podajemy zgodnie z tabelami i komunikatami
              Polskiego Związku Pływackiego — stan na {site.dataAsOf}.
            </p>

            <p className="mt-6 rounded-2xl bg-mist p-5 text-sm text-muted-foreground">
              Dokument jest szkicem przygotowanym razem ze stroną. Przed
              publikacją należy uzupełnić dane administratora i zweryfikować go
              pod kątem faktycznie używanych narzędzi.
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
