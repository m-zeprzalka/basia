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
app/                 layout, strona główna, warianty /page-b … /page-h, polityka, OG image, sitemap, robots
assets/images/       zoptymalizowane zdjęcia (WebP) — importowane statycznie przez next/image
assets/fonts/        pliki TTF wyłącznie na potrzeby generowania grafiki Open Graph
basia/               oryginały zdjęć od klienta + pobrane okładki reelsów (źródło dla skryptu; katalog poza git)
scripts/             przygotowanie zasobów graficznych
components/site/     sekcje strony głównej (wariant A)
components/page-b/   wariant B · page-c/ C · page-d/ D · page-e/ E · page-f/ F („Fotofinisz") · page-g/ G · page-h/ H (ostateczny)
components/motion/   Reveal, CountUp, TimeCounter, ScrollProgress
components/ui/       komponenty shadcn/ui (tylko realnie używane)
data/                wszystkie treści i wyniki (data/page-d/ … page-h/ — treści wariantów D–H)
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

## Wariant D — `/page-d` (prezentacja dla sponsora)

Alternatywa zbudowana na języku wizualnym wariantu A (te same tokeny, kroje
i komponenty pomocnicze), ale z jednym celem: doprowadzić sponsora do rozmowy
o kontrakcie. Kolejność sekcji jak w pitch decku:

Hero (Paryż 2026, trzy liczby) → 01 Dlaczego teraz (teza + profil) →
02 Trajektoria (interaktywny wykres 2:17,03 → 2:12,45) → 03 Medale i rekordy
(półka z medalami, zakładki po imprezach, tabele PZP zwinięte) → 04 Paryż 2026
(ME seniorów — dwa finały sztafet) → 05 Galeria (2 kolumny na mobile, 8 + reszta
po rozwinięciu) → 06 Współpraca (korzyści, formaty, horyzont) → 07 Kontakt.

- Pliki: `app/page-d/`, `components/page-d/`, `data/page-d/` (`pitch.ts` — copy,
  `paris.ts` — ME seniorów Paryż 2026 + Lublin 2025, `season-d.ts` — zakładki,
  `gallery-d.ts` — galeria). Wyniki wspólne (rekordy, progresja, oś osiągnięć)
  nadal pochodzą z `data/`.
- Medale: komponent `Medal` (`components/page-d/primitives-d.tsx`) rysuje
  krążek na wstążce z cyfrą 1/2/3 — wszędzie tam, gdzie wcześniej były numerki.
  Lokaty bez medalu mają osobną formę (`PlaceMark`).
- Mobile: strona jest o ok. 45% krótsza od wariantu A (ok. 11 700 px vs
  22 600 px przy 390 px szerokości); pływający pasek CTA (`DockD`) znika, gdy
  sekcja kontaktu jest na ekranie.
- Terminologia: „mistrzostwa Europy **juniorów**", „mistrzostwa Polski
  **seniorów**", „mistrzyni Europy juniorów", „seniorski rekord Polski".

### Do potwierdzenia z klientem przed publikacją wariantu D

1. **Brąz ME seniorów na basenie 25 m (Lublin, 02.12.2025, sztafeta 4×50 m
   st. dowolnym, 1:35,75)** — wg profilu World Aquatics i relacji prasowych
   Barbara płynęła w finale. Klientowski plik copy o tym medalu nie wspomina;
   w wariancie D podnosi on licznik medali z 10 do 11.
2. Czasy zmian Barbary w sztafetach w Paryżu (1:59,87 · 54,16 · 55,32) oraz
   2:16,67 na 200 m st. zmiennym — jedno źródło (protokoły wyników).
3. Wyniki 100 m i 200 m st. dowolnym w Paryżu — brak śladu startu; przyjęto,
   że Barbara nie wystartowała indywidualnie w tych konkurencjach.
4. Horyzont 2027 (MŚ seniorów, ME juniorów) — bez nazw miast do czasu
   potwierdzenia.

## Wariant E — `/page-e` (prezentacja multimedialna, wersja ostateczna)

„Pływacki minimalizm": język wizualny A na sztywnej siatce prezentacji.
Osiem rozdziałów jak osiem slajdów, boczna listwa rozdziałów na desktopie,
bieżący rozdział w nagłówku, pływające CTA na mobile.

00 Okładka (pełnoekranowe zdjęcie z Paryża, najazd + paralaksa, tablica
wyników) → 01 Wynik (2:12,45 na całą ramę, tablica finału z medalami, dystans
do rekordu) → 02 Trajektoria (wykres na 8 kolumnach + tablica startów) →
03 Medale (ściana kart imprez ze zdjęciem/kadrem z nagrania i medalami; okno
z wynikami i wideo PZP) → 04 Paryż 2026 (scrollytelling: przyklejona rama
mediów zmienia kadr z czytanym blokiem; wywiad PZP po finale) → 05 Media
(bento na 12 kolumnach, filtry z animowanym przepływem, lightbox, wideo
w kafelku) → 06 Partnerstwo (argumenty z kadrami, formaty, horyzont-tor) →
07 Kontakt (ze stopką).

- **Siatka.** `components/page-e/frame-e.tsx`: `Frame` (rama 90 rem),
  `Grid` (4 / 8 / 12 kolumn, rynna 1 / 1,5 / 2 rem), `Chapter`
  + `ChapterHead` (numer i etykieta w lewym pasie 3 kolumn, tytuł w prawym).
  Każdy blok leży na kolumnach — pełne krwawienie mają tylko warstwy tła.
  Wysokość rzędu ściany mediów liczy się z jednostek `cqw`, dzięki czemu
  kafelki 8/4/4 kolumn zawsze się domykają. Audyt wyrównania (skrypt
  Playwright w sesji): 0 elementów poza siatką przy 390 / 768 / 1024 / 1440.
- **Wideo.** `data/page-e/media.ts` — cztery publiczne nagrania z kanału PZP
  na YouTube (zweryfikowane oEmbed 17.08.2026): wywiad po finale 4×200 dow.
  w Paryżu, po złocie MP seniorów w Olsztynie, dwa po brązie ME 25 m
  w Lublinie. Osadzenie przez `youtube-nocookie.com` dopiero po kliknięciu
  (`components/page-e/video-e.tsx`); przed kliknięciem tylko miniatura
  z `i.ytimg.com` (`images.remotePatterns` w `next.config.ts`).
  Pełnego wyścigu z Monachium nie ma publicznie na YouTube (VOD za paywallem
  European Aquatics TV).
- **Dane.** `data/page-e/` (rozdziały, copy, media, ściana medali) + wspólne
  `data/` oraz `data/page-d/paris.ts` (Paryż 2026, Lublin 2025) i
  `data/page-d/season-d.ts`. Medale rysuje `Medal` z `components/page-d/`.
- **Ruch.** Reveal przy przewijaniu, Ken Burns i paralaksa okładki,
  paralaksa zdjęć (`ParallaxImageE`), rysowanie wykresu, animowany filtr
  siatki (motion `layout`). Wszystko respektuje `prefers-reduced-motion`.

## Wariant F — `/page-f` „Fotofinisz" (wersja autorska)

Kinowa prezentacja o własnym języku: atrament (`#050A14`), papier, elektryczna
aqua, złoto medali; typografia na osi szerokości Archivo — 62 % (nazwisko,
liczby, wersaliki) kontra 118 % (zdania). Rozdziały jak ujęcia z transmisji:

- **Intro-stoper** — czarny ekran, cyfry naliczają do 2:12,45, kurtyna idzie
  w górę (raz na sesję, `sessionStorage`; „Pomiń"; brak przy reduced-motion).
- **Okładka** — nazwisko na całą ramę literka po literce, pionowy kadr
  odsłaniany kurtyną z linii, trzy „napisy z transmisji", konturowa taśma.
- **01 Wynik** — 2:12,45 na całą ramę i **replay**: trzy wyścigi na jednym
  torze (MŚJ 2025 · MEJ 2026 · seniorski rekord Polski) płyną własnymi
  prędkościami i zamierają, gdy rekord dotyka ściany; **fotofinisz** powiększa
  ostatnie 1,1 % dystansu, gdzie 0,32 s ma szerokość dłoni. Podium z medalami.
- **02 Tor** — na desktopie rozdział przypięty: pionowe przewijanie przesuwa
  tor w poziomie (pięć stacji + ściana 2:12,13, znacznik pływaczki stoi, tor
  płynie pod nim); na mobile pionowa lista.
- **03 Medale** — lista startowa; nad wierszem pływający kadr podąża za
  kursorem, klik otwiera wyniki i nagrania PZP (okno z E); wiersz rekordów.
- **04 Paryż** — kinowy kadr na cały ekran, przypięty, tytuł wjeżdża od dołu;
  tablica sztafet, trzy kadry, wywiad PZP.
- **05 Taśma** — pozioma wstęga zdjęć i wideo: przeciąganie myszą, palcem,
  strzałki, pasek postępu; lightbox; wideo gra w kafelku.
- **06 Partnerstwo** — jedyna jasna plansza (papier), argumenty 2×2, formaty,
  horyzont-tor. **07 Kontakt** — jedno słowo, magnetyczny przycisk, stopka.
- Warstwa: menu pełnoekranowe (wersaliki rozdziałów), kursor własny z etykietą
  („Wyniki", „Odtwórz", „Powiększ", „Przeciągnij") tylko przy `pointer: fine`,
  magnetyczne CTA. Wszystko respektuje `prefers-reduced-motion`.
- Pliki: `app/page-f/`, `components/page-f/`, `data/page-f/copy.ts`; siatka
  `Frame`/`Grid` z E, dane wspólne (D/E). Zero poziomego przewijania 320–1920.

## Wariant H — `/page-h` (WERSJA OSTATECZNA)

Wersja ostateczna zbudowana wprost na E (ta sama siatka `Frame`/`Grid`,
te same rozdziały i tokeny) plus poprawki klienta z 18.08.2026. Rozdziały
bez zmian (okładka, Paryż 2026, partnerstwo, nawigacja, listwa, dock)
importowane są z `components/page-e/`; zmienione mają odpowiedniki
w `components/page-h/`, a dane w `data/page-h/`.

Różnice względem E:

1. **Replay w rozdziale 01** (`replay-h.tsx`) — komponent „trzy wyścigi na
   jednym torze" z wariantu F, przerysowany tokenami E i dopracowany na
   mobile: etykiety strat (`+0,32 s`) mają stały odstęp 1,25 rem od kropek,
   a fotofinisz rozdziela piętra — rekord nad linią, Barbara pod linią —
   więc napisy nie nachodzą na siebie na żadnej szerokości. Fotofinisz
   przejmuje rolę osi „dystans do rekordu" z E (bez duplikacji liczby 0,32 s).
2. **Trajektoria** (`trajectory-h.tsx`) — pole wykresu ma szerokość tekstu
   karty (wcięcia 12 px zamiast 24 px), wszystkie czasy jeden stopień pisma
   (13 px; najlepszy tylko złoty i półgruby), a etykiety leżą po wolnej
   stronie linii (środkowe nad linią z lewej, pierwszy pod linią z prawej) —
   nic nie przecina wykresu.
3. **Medale** (`medals-h.tsx`) — kadry z nagrań to miniatury
   `maxresdefault` (1280×720, prawdziwe 16:9): kryją całą kartę bez czarnych
   pasów wtopionych w stare `hqdefault`. Okno „Pełne tabele"
   (`records-h.tsx`) rysuje medal przy rekordach ustanowionych w wyścigach
   medalowych (pole `medal` w `data/records.ts`).
4. **Media** (`media-h.tsx`, `data/page-h/media.ts`) — dwa nowe zdjęcia
   (portret studyjny w kadrze bez obcej marki, Wrocław zza słupka), dwa
   publiczne reelsy z Facebooka (Sportowy Fanatyk — po złocie Monachium,
   pionowy kafel; Swimm PL — rekord w Bydgoszczy) osadzane przez
   `facebook.com/plugins/video.php` dopiero po kliknięciu — plakatami są
   pobrane okładki reelsów (lokalne WebP), więc przed interakcją zero
   zapytań do Facebooka. Pod ścianą pas: artykuł Przeglądu Sportowego Onet
   (24.12.2025, tylko link) i karta Instagrama. Pierwsze 8 kafelków domyka
   pełne rzędy na mobile i desktopie.
5. **Kontakt** (`contact-h.tsx`) — trzeci wiersz z Instagramem
   (`@_lesniewskaa._`, profil publiczny — link, bo osadzenie profilu wymaga
   skryptów Meta), zaktualizowana stopka ze źródłami nagrań.
6. **Jakość zdjęć** — WebP generowane w jakości 90 (zamiast 86),
   `next/image` z `quality={90}` dla dużych kadrów (`images.qualities`
   w `next.config.ts`). Oryginały od klienta są mocno skompresowane, więc
   pełnej ostrości nie da się odzyskać — ale strona nie dokłada już drugiej
   warstwy kompresji.

Osadzenia (YouTube `maxresdefault` i oEmbed, reelsy przez plugin wideo)
zweryfikowane 18.08.2026. Wideo z Barbarą wskazane przez klienta
(4xwNc5fnC_0, 6SCr58dm-oc, -rb_DXSbJX8) były już na ścianie E — bez duplikacji.

## Wariant I — `/page-i` (FINALNY — wersja dla klienta)

Finalny szlif projektowy H (18.08.2026). Zasada nienaruszalności:
**komponenty `components/page-h/` pozostają nietknięte** — rozdziały bez
zmian (trajektoria, medale, media, kontakt) strona I importuje wprost
z `page-h/`, a `partnerstwo`, nawigację, listwę i dock z `page-e/`.
Każdy rozdział ze zmianami ma nowy komponent w `components/page-i/`
i ewentualne treści w `data/page-i/`.

Zmiany względem H:

1. **Fotofinisz jako rysunek techniczny** (`replay-i.tsx`) — zamiast
   napisów pozycjonowanych absolutnie w pasie pomiaru: oś ostatnich 2,2 m,
   znacznik zawodniczki, ściana i **klamra wymiarowa** z różnicą 0,32 s pod
   odcinkiem, a czasy w **wyrównanej legendzie pod osią** (dwie kolumny od
   `sm`, jedna na mobile). Twarde spacje w nagłówku pilnują czystego łamania.
   Nic nie ma prawa na nic nachodzić na żadnej szerokości.
2. **`StatList` / `StatValue`** (`stat-i.tsx`) — reużywalny system
   statystyk: pionowa lista z włoskowatymi liniami i wspólną kolumną
   wartości zamiast trzech ciasnych kolumn. Liczby naliczają się jak na
   tablicy świetlnej (rozumieją czas pływacki `7:58,22`, ułamki `+1,65 s`
   i liczby całkowite; kaskadowe opóźnienia; szanują reduced-motion; kolory
   z tokenów — działa na bieli i na głębokiej wodzie). Użycia: fakty
   rozdziału 01, „Paryż w liczbach", liczby przy fotofiniszu, tablica
   okładki na desktopie.
3. **Paryż bez rozmycia** (`paris-i.tsx`) — przyklejona rama zmieniona
   z pionowej 4:5 na **poziomą 4:3 i o kolumnę szerszą**: wszystkie kadry
   z Paryża są poziome, więc pionowa rama wymuszała mocne kadrowanie
   i powiększanie ponad rozdzielczość źródła. Teraz zdjęcia są pomniejszane
   (nigdy powiększane) i serwowane w `quality={90}`.
4. **Okładka** (`cover-i.tsx`) — zdjęcie hero w `quality={90}`, liczby
   tablicy wyników naliczają się po wejściu (tylko desktop; mobilna
   taśma pozostaje statyczna).

QA (Playwright, 390/768/1440, DPR 2): zero poziomego overflow, fotofinisz
i StatList sprawdzone wizualnie na wszystkich trzech szerokościach.

## Zdjęcia

Skrypt `scripts/prepare-images.mjs` kadruje oryginały z katalogu `basia/`
(usuwa pasek Instagram Stories i wklejony w grafikę tekst), skaluje je i
zapisuje jako WebP w `assets/images/`, a dodatkowo generuje JPEG pod grafikę
Open Graph. Grafiki wynikowe PZP z Paryża 2026 są kadrowane do samej
fotografii (bez tekstu „7. miejsce" i belki logotypów).

```bash
npm run images
```

Do galerii świadomie nie trafiło prywatne zdjęcie z plaży — strona jest
kierowana do sponsorów, a bohaterką jest osoba niepełnoletnia. Portret
studyjny (ponownie przysłany przez klienta 18.08.2026) wszedł do wariantu H
w kadrze kwadratowym, uciętym nad napisem obcej marki na koszulce.
W `basia/` leżą też pobrane okładki reelsów (`reel-*-cover.jpeg`) — służą
wyłącznie jako plakaty osadzeń z Facebooka.

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
