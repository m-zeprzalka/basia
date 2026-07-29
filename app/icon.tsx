import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

/**
 * Favicon rysowany tym samym znakiem co nagłówek — Lucide `waves-horizontal`.
 * Ścieżki są wpisane wprost, bo generator grafiki nie renderuje komponentów Reacta.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(150deg, #0E6BD8, #0B2545)",
      }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
        <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
        <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
      </svg>
    </div>,
    size
  )
}
