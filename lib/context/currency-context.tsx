"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { convertCurrency, getExchangeRate } from "@/lib/services/currency-service"

type CurrencyContextType = {
  currency: string
  setCurrency: (currency: string) => void
  formatAmount: (amount: number) => string
  convertAmount: (amount: number, fromCurrency?: string) => Promise<number>
  getRate: (fromCurrency: string, toCurrency?: string) => Promise<number>
  isLoading: boolean
}

const defaultContext: CurrencyContextType = {
  currency: "GH₵",
  setCurrency: () => {},
  formatAmount: (amount: number) => `GH₵ ${amount.toLocaleString()}`,
  convertAmount: async (amount: number) => amount,
  getRate: async () => 1,
  isLoading: false,
}

const CurrencyContext = createContext<CurrencyContextType>(defaultContext)

export const useCurrency = () => useContext(CurrencyContext)

interface CurrencyProviderProps {
  children: ReactNode
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>(defaultContext.currency)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("preferredCurrency")
      if (savedCurrency) {
        setCurrency(savedCurrency)
      }
    }
  }, [])

  // Listen for currency change events
  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrency(event.detail.currency)
    }

    window.addEventListener("currencyChanged", handleCurrencyChange as EventListener)

    return () => {
      window.removeEventListener("currencyChanged", handleCurrencyChange as EventListener)
    }
  }, [])

  // Update localStorage when currency changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredCurrency", currency)
    }
  }, [currency])

  // Format amount based on currency
  const formatAmount = (amount: number): string => {
    switch (currency) {
      case "USD":
        return `$ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "EUR":
        return `€ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "GBP":
        return `£ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "NGN":
        return `₦ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "GH₵":
      default:
        return `GH₵ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  // Convert amount from one currency to the current currency
  const convertAmount = async (amount: number, fromCurrency = "GH₵"): Promise<number> => {
    if (fromCurrency === currency) {
      return amount
    }

    setIsLoading(true)
    try {
      // First convert to GH₵ (base currency)
      let amountInGHS = amount
      if (fromCurrency !== "GH₵") {
        const fromRate = await getRate(fromCurrency, "GH₵")
        amountInGHS = amount * fromRate
      }

      // Then convert to target currency
      if (currency === "GH₵") {
        setIsLoading(false)
        return amountInGHS
      }

      const convertedAmount = await convertCurrency(amountInGHS, currency)
      return convertedAmount
    } catch (error) {
      console.error("Error converting amount:", error)
      return amount
    } finally {
      setIsLoading(false)
    }
  }

  // Get exchange rate between currencies
  const getRate = async (fromCurrency: string, toCurrency: string = currency): Promise<number> => {
    try {
      return await getExchangeRate(fromCurrency, toCurrency)
    } catch (error) {
      console.error("Error getting exchange rate:", error)
      return 1
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatAmount,
        convertAmount,
        getRate,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}
