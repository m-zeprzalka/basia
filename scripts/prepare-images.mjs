/**
 * Przygotowanie zasobów graficznych.
 *
 * Źródło: ./basia (oryginały przekazane przez klienta)
 * Wynik:  ./assets/images (WebP, kadry bez elementów UI, importowane statycznie przez next/image)
 *
 * Uruchomienie: node scripts/prepare-images.mjs
 */
import { mkdir, readdir, rm } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const SRC = path.resolve("basia")
const OUT = path.resolve("assets/images")
const MAX_WIDTH = 1800
/* Oryginały od klienta są już mocno skompresowane (80–110 kB JPEG) — wysoka
   jakość WebP nie odzyska detalu, ale nie dokłada kolejnej warstwy artefaktów. */
const QUALITY = 90

/**
 * `crop` podajemy w pikselach oryginału. Kadry usuwają elementy obce dla strony
 * (pasek Instagram Stories, wklejony w grafikę tekst i belka logotypów).
 */
const IMAGES = [
  {
    src: "dace8494-3e65-410d-8243-c565555d77bd.jpeg",
    out: "monachium-zloty-medal.webp",
    // 1638x2048 — obcinamy dolny pas z tekstem i logotypami oraz kolorową ramkę grafiki
    crop: { left: 8, top: 6, width: 1616, height: 1394 },
  },
  {
    src: "1160ebb2-06a6-4557-b41e-7756f8d56756.jpeg",
    out: "reprezentacja-polski.webp",
    // 1206x2096 — obcinamy górny pasek interfejsu Instagram Stories
    crop: { left: 0, top: 150, width: 1206, height: 1946 },
  },
  {
    src: "d59e8eae-769f-4742-8b8e-0f9544e768e5.jpeg",
    out: "portret-basen.webp",
    // 2000x1333 — kadr pionowy 4:5 na potrzeby sekcji hero
    crop: { left: 560, top: 0, width: 1066, height: 1333 },
  },
  {
    src: "d59e8eae-769f-4742-8b8e-0f9544e768e5.jpeg",
    out: "portret-basen-szeroki.webp",
  },
  {
    src: "41b2ec16-cb49-4233-8af6-e466b38d399b.jpeg",
    out: "podium-zloto-skopje.webp",
  },
  {
    src: "bb4af3ff-029a-490e-84e2-882fc0ed73dc.jpeg",
    out: "podium-srebro-skopje.webp",
  },
  {
    src: "3f738814-0ed7-49c3-8291-7226353b62f9.jpeg",
    out: "srebrne-medale-skopje.webp",
  },
  {
    src: "374e9c68-e18d-47b8-9730-0f091343a38b.jpeg",
    out: "po-wyscigu-czepek.webp",
  },
  {
    src: "74125e51-db67-44be-9c96-c83f16cd774a.jpeg",
    out: "na-scianie-basenu.webp",
  },
  {
    src: "5579891e-33d0-4fe7-92d9-6babd9ed1394.jpeg",
    out: "kciuk-w-gore.webp",
  },
  {
    src: "6efe9020-0e1b-463b-8928-fb07ee4d22cc.jpeg",
    out: "zgrupowanie-cetniewo.webp",
  },

  // --- Mistrzostwa Europy seniorów, Paryż 2026 (dostarczone 17.08.2026) ---
  // Przed startem — słuchawki, dres reprezentacji, ściana LED. Bez kadrowania.
  {
    src: "184e0aa9-aa6b-4a12-93d5-f5f2ebd7534e.jpeg",
    out: "paryz-przed-startem.webp",
  },
  // Sztafeta kobiet w kręgu przed startem, w tle logotyp mistrzostw. Bez kadrowania.
  {
    src: "e8b197e6-6095-4401-9596-d1f7b2b0d88c.jpeg",
    out: "paryz-sztafeta-razem.webp",
  },
  {
    src: "0bde2314-145f-4288-9eb0-ba29635745cb.jpeg",
    out: "paryz-sztafeta-mix.webp",
    // 1638x2048 — grafika PZP: obcinamy logotyp mistrzostw u góry, tekst „8. miejsce"
    // i belkę logotypów u dołu oraz zieloną krawędź z prawej
    crop: { left: 0, top: 230, width: 1624, height: 1120 },
  },
  {
    src: "8430ae0f-11a2-48f6-af96-5448aa61d105.jpeg",
    out: "paryz-sztafeta-4x200.webp",
    // 1638x2048 — jak wyżej: sama fotografia zespołu bez tekstu grafiki
    crop: { left: 0, top: 270, width: 1624, height: 1090 },
  },
  {
    src: "2dsaed.jpeg",
    out: "paryz-skok-startowy.webp",
    // 942x1652 — grafika PZP z eliminacji 4×100 m st. zmiennym: zostaje sam skok ze słupka
    crop: { left: 0, top: 380, width: 942, height: 850 },
  },

  // --- Zdjęcia dostarczone 18.08.2026 (wariant H) ---
  {
    src: "596d3f36-f66c-4e7f-bb42-4bf58906db63.jpeg",
    out: "portret-studio.webp",
    // 1365x2048 — kadr kwadratowy: twarz i dłonie, bez napisu obcej marki na koszulce
    crop: { left: 40, top: 90, width: 1285, height: 1270 },
  },
  {
    src: "cc31b9ab-35ec-4622-b824-c4fd80ad86ea.jpeg",
    out: "wroclaw-przed-startem.webp",
    // Za słupkiem startowym toru 5 we Wrocławiu — bez kadrowania.
  },

  // --- Okładki nagrań z Facebooka (miniatury reelsów — fasada przed kliknięciem) ---
  {
    src: "reel-monachium-cover.jpeg",
    out: "reel-monachium.webp",
  },
  {
    src: "reel-bydgoszcz-cover.jpeg",
    out: "reel-bydgoszcz.webp",
  },
]

async function main() {
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const available = new Set(await readdir(SRC))
  const report = []

  for (const image of IMAGES) {
    if (!available.has(image.src)) {
      throw new Error(`Brak pliku źródłowego: ${image.src}`)
    }

    let pipeline = sharp(path.join(SRC, image.src)).rotate()
    if (image.crop) pipeline = pipeline.extract(image.crop)

    const info = await pipeline
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(path.join(OUT, image.out))

    report.push(
      `${image.out.padEnd(32)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} kB`
    )
  }

  // Wariant JPEG pod grafikę Open Graph — generator OG nie obsługuje WebP.
  const ogDir = path.resolve("assets/og")
  await mkdir(ogDir, { recursive: true })
  const og = await sharp(
    path.join(SRC, "dace8494-3e65-410d-8243-c565555d77bd.jpeg")
  )
    .extract({ left: 8, top: 6, width: 1616, height: 1394 })
    .resize({ width: 760, height: 950, fit: "cover", position: "top" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(ogDir, "monachium.jpg"))
  report.push(
    `og/monachium.jpg${" ".repeat(17)}${og.width}x${og.height}  ${(og.size / 1024).toFixed(0)} kB`
  )

  console.log(report.join("\n"))
}

await main()
