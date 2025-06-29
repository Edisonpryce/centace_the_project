"use client"

import { useLanguage } from "@/lib/context/language-context"

export function useTranslation() {
  const { language, setLanguage, getTranslation, isRTL, dir } = useLanguage()

  const t = (key: string): string => {
    return getTranslation(key)
  }

  return { language, setLanguage, t, isRTL, dir }
}
