"use client"

import { useTranslation } from "@/hooks/use-translation"

interface TProps {
  text: string
  className?: string
}

export function T({ text, className = "" }: TProps) {
  const { t, isRTL } = useTranslation()
  const rtlClass = isRTL ? "font-arabic" : ""

  return <span className={`${rtlClass} ${className}`}>{t(text)}</span>
}
