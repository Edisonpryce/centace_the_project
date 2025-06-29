"use client"

import { useEffect, useState } from "react"
import { useCurrency as useContextCurrency } from "@/lib/context/currency-context"

export function useCurrency() {
  const context = useContextCurrency()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Provide fallback for server-side rendering
  if (!isClient) {
    return {
      currency: "GH₵",
      setCurrency: () => {},
      formatAmount: (amount: number) =>
        `GH₵ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      convertAmount: async (amount: number) => amount,
      getRate: async () => 1,
      isLoading: false,
    }
  }

  return context
}
