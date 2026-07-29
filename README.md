# Barbara Leśniewska — oficjalna strona

Landing page zawodniczki, skierowany przede wszystkim do sponsorów i partnerów
biznesowych. Next.js (App Router) + Tailwind CSS v4 + shadcn/ui (Base UI).

```bash
npm run dev        # serwer deweloperski
npm run build      # build produkcyjny
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Struktura

```
app/                 layout, strona główna, polityka prywatności, OG image, sitemap, robots
assets/images/       zoptymalizowane zdjęcia (WebP) — importowane statycznie przez next/image
assets/fonts/        pliki TTF wyłącznie na potrzeby generowania grafiki Open Graph
basia/               oryginały zdjęć od klienta (źródło dla skryptu)
components/site/     sekcje strony
components/motion/   Reveal, CountUp, TimeCounter, ScrollProgress
components/ui/       komponenty shadcn/ui (tylko realnie używane)
data/                wszystkie treści i wyniki
scripts/             przygotowanie zasobów graficznych
```

## Aktualizacja wyników

Wyniki sportowe **nie są wpisane w komponentach** — wszystkie znajdują się w
katalogu `data/`. Dopisanie nowego rezultatu to dodanie wiersza w tablicy:

| Plik                   | Zawartość                                                     |
| ---------------------- | ------------------------------------------------------------- |
| `data/site.ts`         | metadane, nawigacja, dane kontaktowe                          |
| `data/stats.ts`        | pasek liczb pod hero                                          |
| `data/munich.ts`       | sekcja ME juniorów 2026 i porównanie z rekordem seniorek       |
| `data/bio.ts`          | tekst „O Barbarze"                                            |
| `data/progression.ts`  | dane obu wariantów sekcji „Progresja"                         |
| `data/achievements.ts` | oś czasu osiągnięć                                            |
| `data/records.ts`      | tabele rekordów Polski i rekordów życiowych                   |
| `data/gallery.ts`      | galeria (zdjęcie + alt + podpis)                              |
| `data/sponsorship.ts`  | sekcja dla sponsorów                                          |

Po zmianie wyników zaktualizuj też pole `dataAsOf` w `data/site.ts` — data
„stan na…" pojawia się przy tabelach rekordów i w stopce.

## Do uzupełnienia przed publikacją

1. **Domena** — `site.url` w `data/site.ts` (wykorzystywana w metadanych
   kanonicznych, `sitemap.xml` i `robots.txt`).
2. **Polityka prywatności** — `app/polityka-prywatnosci/page.tsx` jest szkicem;
   wymaga weryfikacji prawnej.
3. **Data brązu na 100 m motylkowym w Monachium** — w tabelach przyjęto
   09.07.2026 wg PZP (nota redakcyjna z pliku copy).

Dane kontaktowe (`contact` w `data/site.ts`) są już uzupełnione.

## Zdjęcia

Skrypt `scripts/prepare-images.mjs` kadruje oryginały z katalogu `basia/`
(usuwa pasek Instagram Stories i wklejony w grafikę tekst), skaluje je i
zapisuje jako WebP w `assets/images/`, a dodatkowo generuje JPEG pod grafikę
Open Graph.

```bash
node scripts/prepare-images.mjs
```

Do galerii świadomie nie trafiły dwa prywatne zdjęcia (plaża, portret w
koszulce obcej marki) — strona jest kierowana do sponsorów, a bohaterką jest
osoba niepełnoletnia.

## Uwagi projektowe

- Jasna paleta (biel, błękit, granat) z akcentem złota. Tokeny w
  `app/globals.css`; klasa `.on-deep` przemapowuje tokeny shadcn dla ciemnych
  sekcji, dzięki czemu komponenty działają bez nadpisywania klas.
- Wszystkie animacje respektują `prefers-reduced-motion`.
- Wykres progresji ma alternatywę tekstową (tabela dla czytników ekranu) oraz
  jawnie opisany zakres osi. Porównanie z rekordem seniorek to oś liczbowa,
  nie słupki — różnica 0,32 s na dystansie 132 s nie daje się uczciwie pokazać
  długością słupka.
- Struktura tekstów jest gotowa pod i18n: treści są odseparowane od komponentów.
- W tekście biografii fragmenty w `**gwiazdkach**` są automatycznie pogrubiane
  (`Emphasized` w `components/site/primitives.tsx`) — redakcja zostaje w `data/`.

## Kolejność sekcji

Hero → pasek faktów → liczby → 01 Monachium → 02 O Barbarze → 03 Progresja →
04 Osiągnięcia → 05 Galeria → 06 Rekordy i wyniki → 07 Współpraca → 08 Kontakt.
Numeracja w `index` komponentów `SectionHeading` musi odpowiadać tej kolejności,
podobnie jak lista `nav` w `data/site.ts`.

## Responsywność

Kluczowe elementy typograficzne (H1, nagłówki sekcji, liczby w pasku statystyk,
wielki czas w Monachium) skalują się jednostkami `cqw` — czyli względem własnej
kolumny, a nie okna przeglądarki. Dzięki temu układ nie psuje się na
szerokościach pośrednich. W `scripts/` nie ma testu wizualnego; przy większych
zmianach layoutu warto przejechać stronę detektorem kolizji (sprawdzanie
`scrollWidth > clientWidth` oraz nachodzących prostokątów rodzeństwa) w zakresie
320–1920 px.
