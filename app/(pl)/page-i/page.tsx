import { permanentRedirect } from "next/navigation"

/**
 * Wariant I został wybrany w przetargu i awansował na stronę główną —
 * stary adres prezentacji prowadzi tam, gdzie mieszka finalna wersja.
 */
export default function PageI() {
  permanentRedirect("/")
}
