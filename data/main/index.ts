import { en } from "@/data/main/en"
import { pl } from "@/data/main/pl"
import type { Dict, Locale } from "@/data/main/types"

export const dictionaries: Record<Locale, Dict> = { pl, en }

export const getDict = (locale: Locale): Dict => dictionaries[locale]
