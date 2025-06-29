"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useCurrency } from "@/hooks/use-currency"

/**
 * Hook to add currency display attributes to elements
 * This helps with global currency updates
 */
export function useGlobalCurrency() {
  const { currency, setCurrency, formatAmount } = useCurrency()
  const [isInitialized, setIsInitialized] = useState(false)

  // Listen for currency change events
  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrency(event.detail.currency)
      // Force refresh of currency displays
      document.querySelectorAll("[data-currency-display]").forEach((el) => {
        el.setAttribute("data-currency-refresh", Date.now().toString())
      })
    }

    window.addEventListener("currencyChanged", handleCurrencyChange as EventListener)
    setIsInitialized(true)

    return () => {
      window.removeEventListener("currencyChanged", handleCurrencyChange as EventListener)
    }
  }, [setCurrency])

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const savedCurrency = localStorage.getItem("preferredCurrency")
      if (savedCurrency) {
        setCurrency(savedCurrency)
      }
    }
  }, [isInitialized, setCurrency])

  return {
    currency,
    setCurrency,
    formatAmount,
    // Helper function to mark elements for currency updates
    markForCurrencyUpdates: (ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        ref.current.setAttribute("data-currency-display", "true")
      }
    },
  }
}
