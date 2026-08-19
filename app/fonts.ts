import { Archivo, Inter, JetBrains_Mono } from "next/font/google"

import { cn } from "@/lib/utils"

/**
 * Kroje strony — jeden moduł dla obu root layoutów (PL i EN, route groups
 * mają osobne korzenie, żeby `<html lang>` był zgodny z językiem treści).
 */

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const fontClassName = cn(
  "antialiased",
  inter.variable,
  archivo.variable,
  jetbrainsMono.variable
)
