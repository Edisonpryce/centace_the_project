"use client"

import { useState, useEffect } from "react"
import { useCurrency } from "@/lib/context/currency-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CurrencyConverter() {
  const { currency, convertAmount, formatAmount, getRate, isLoading } = useCurrency()
  const [amount, setAmount] = useState<number>(100)
  const [fromCurrency, setFromCurrency] = useState<string>("GH₵")
  const [toCurrency, setToCurrency] = useState<string>(currency)
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>(1)
  const [isConverting, setIsConverting] = useState<boolean>(false)

  // Update toCurrency when global currency changes
  useEffect(() => {
    setToCurrency(currency)
  }, [currency])

  // Convert the amount when inputs change
  useEffect(() => {
    const convert = async () => {
      if (amount <= 0) {
        setConvertedAmount(0)
        return
      }

      setIsConverting(true)
      try {
        // Get the exchange rate
        const rate = await getRate(fromCurrency, toCurrency)
        setExchangeRate(rate)

        // Convert the amount
        const converted = amount * rate
        setConvertedAmount(Math.round(converted * 100) / 100)
      } catch (error) {
        console.error("Error in currency conversion:", error)
      } finally {
        setIsConverting(false)
      }
    }

    convert()
  }, [amount, fromCurrency, toCurrency, getRate])

  // Swap currencies
  const handleSwap = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  // Format the amount based on currency
  const formatCurrency = (value: number, currencyCode: string): string => {
    switch (currencyCode) {
      case "USD":
        return `$ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "EUR":
        return `€ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "GBP":
        return `£ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "NGN":
        return `₦ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "GH₵":
      default:
        return `GH₵ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between different currencies using real-time exchange rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromCurrency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GH₵">Ghana Cedi (GH₵)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center my-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="rounded-full"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="convertedAmount">Converted Amount</Label>
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-background flex items-center">
                {isConverting || isLoading ? (
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    <span>Converting...</span>
                  </div>
                ) : (
                  formatCurrency(convertedAmount, toCurrency)
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toCurrency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GH₵">Ghana Cedi (GH₵)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
            <p className="text-xs mt-1">
              Rates are updated every 4 hours. Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
