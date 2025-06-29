"use client"

import { useEffect, useState, useRef } from "react"
import { useCurrency } from "@/lib/context/currency-context"
import { Skeleton } from "@/components/ui/skeleton"

interface CurrencyDisplayProps {
  amount: number
  className?: string
  fromCurrency?: string
  showConversion?: boolean
}

export function CurrencyDisplay({
  amount,
  className = "",
  fromCurrency = "GH₵",
  showConversion = false,
}: CurrencyDisplayProps) {
  const { formatAmount, convertAmount, currency, isLoading } = useCurrency()
  const [formattedValue, setFormattedValue] = useState<string>("")
  const [convertedAmount, setConvertedAmount] = useState<number>(amount)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Convert and format the amount whenever currency changes
  useEffect(() => {
    const updateCurrency = async () => {
      if (fromCurrency === currency) {
        // No conversion needed
        setConvertedAmount(amount)
        setFormattedValue(formatAmount(amount))
        return
      }

      setIsConverting(true)
      try {
        // Convert the amount to the current currency
        const converted = await convertAmount(amount, fromCurrency)
        setConvertedAmount(converted)
        setFormattedValue(formatAmount(converted))
      } catch (error) {
        console.error("Error converting currency:", error)
        // Fallback to just formatting the original amount
        setFormattedValue(formatAmount(amount))
      } finally {
        setIsConverting(false)
      }
    }

    updateCurrency()

    // Mark this element for currency updates
    if (elementRef.current) {
      elementRef.current.setAttribute("data-currency-display", "true")
    }

    // Listen for refresh triggers
    const handleRefresh = (e: Event) => {
      if (e.target && (e.target as HTMLElement).hasAttribute("data-currency-refresh")) {
        updateCurrency()
      }
    }

    document.addEventListener("DOMAttrModified", handleRefresh)

    return () => {
      document.removeEventListener("DOMAttrModified", handleRefresh)
    }
  }, [amount, currency, formatAmount, convertAmount, fromCurrency])

  if (isConverting || isLoading) {
    return <Skeleton className={`w-24 h-6 ${className}`} />
  }

  return (
    <span ref={elementRef} className={className}>
      {formattedValue}
      {showConversion && fromCurrency !== currency && (
        <span className="text-xs text-gray-500 ml-1">
          ({fromCurrency} {amount.toLocaleString()})
        </span>
      )}
    </span>
  )
}
