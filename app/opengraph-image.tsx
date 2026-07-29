import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const alt =
  "Barbara Leśniewska — mistrzyni Europy juniorek na 200 m stylem zmiennym"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const [photo, archivo, inter] = await Promise.all([
    readFile(path.join(process.cwd(), "assets", "og", "monachium.jpg")),
    readFile(path.join(process.cwd(), "assets", "fonts", "archivo-700.ttf")),
    readFile(path.join(process.cwd(), "assets", "fonts", "inter-600.ttf")),
  ])
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0B2545",
        color: "white",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "58%",
          padding: "64px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 10,
              background: "#E6C158",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#A9BDD6",
            }}
          >
            Reprezentantka Polski w pływaniu
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontFamily: "Archivo",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Barbara
          </div>
          <div
            style={{
              fontSize: 78,
              fontFamily: "Archivo",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Leśniewska
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#C7D7EA",
              maxWidth: 560,
            }}
          >
            Mistrzyni Europy juniorek na 200 m stylem zmiennym. Wielokrotna
            rekordzistka Polski.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 34 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ fontSize: 54, fontFamily: "Archivo", color: "#E6C158" }}
            >
              2:12,45
            </div>
            <div style={{ fontSize: 19, color: "#A9BDD6", marginTop: 6 }}>
              Rekord Polski 16-, 17- i 18-latek
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 54, fontFamily: "Archivo" }}>14</div>
            <div style={{ fontSize: 19, color: "#A9BDD6", marginTop: 6 }}>
              rekordów Polski
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", position: "relative", width: "42%" }}>
        <img
          src={photoSrc}
          alt=""
          width={504}
          height={630}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0B2545 0%, rgba(11,37,69,0) 42%)",
          }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, weight: 600, style: "normal" },
        { name: "Archivo", data: archivo, weight: 700, style: "normal" },
      ],
    }
  )
}
