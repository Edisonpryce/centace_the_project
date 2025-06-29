"use client"

import type React from "react"

import { useTranslation } from "@/hooks/use-translation"
import { useEffect } from "react"

export function RtlProvider({ children }: { children: React.ReactNode }) {
  const { dir, isRTL } = useTranslation()

  useEffect(() => {
    // Set the dir attribute on the html element
    document.documentElement.dir = dir

    // Add or remove RTL class from body
    if (isRTL) {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }

    return () => {
      // Cleanup
      document.body.classList.remove("rtl")
    }
  }, [dir, isRTL])

  return <>{children}</>
}
