"use client"

import { useState } from "react"
import { CurrencyConverter } from "@/components/currency-converter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrency } from "@/lib/context/currency-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CurrencyDisplay } from "@/components/currency-display"

export default function CurrencyToolsPage() {
  const { currency } = useCurrency()
  const [activeTab, setActiveTab] = useState("converter")
  const [amount, setAmount] = useState(1000)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Currency Tools</h1>
        <p className="text-muted-foreground">Convert currencies and view real-time exchange rates</p>
      </div>

      <Tabs defaultValue="converter" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="converter">Currency Converter</TabsTrigger>
          <TabsTrigger value="examples">Conversion Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="converter" className="space-y-4">
          <CurrencyConverter />

          <Card>
            <CardHeader>
              <CardTitle>About Currency Conversion</CardTitle>
              <CardDescription>
                Our currency conversion uses real-time exchange rates updated every 4 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                All investments on our platform are primarily stored in Ghana Cedis (GH₵), but you can view and interact
                with them in your preferred currency. The conversion happens in real-time based on current exchange
                rates.
              </p>
              <p>
                When you change your preferred currency in settings, all amounts throughout the platform will be
                automatically converted to that currency.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Examples</CardTitle>
              <CardDescription>See how different amounts convert between currencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="exampleAmount" className="w-24">
                    Amount:
                  </Label>
                  <Input
                    id="exampleAmount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
                    className="max-w-[200px]"
                  />
                  <Button variant="outline" onClick={() => setAmount(1000)} className="text-xs">
                    Reset
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">Currency</th>
                        <th className="text-right p-3">Converted Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3">Ghana Cedi (GH₵)</td>
                        <td className="p-3 text-right">
                          <CurrencyDisplay amount={amount} fromCurrency="GH₵" className="font-medium" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">US Dollar ($)</td>
                        <td className="p-3 text-right">
                          <CurrencyDisplay
                            amount={amount}
                            fromCurrency="GH₵"
                            showConversion={true}
                            className="font-medium"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">Euro (€)</td>
                        <td className="p-3 text-right">
                          <CurrencyDisplay
                            amount={amount}
                            fromCurrency="GH₵"
                            showConversion={true}
                            className="font-medium"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">British Pound (£)</td>
                        <td className="p-3 text-right">
                          <CurrencyDisplay
                            amount={amount}
                            fromCurrency="GH₵"
                            showConversion={true}
                            className="font-medium"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">Nigerian Naira (₦)</td>
                        <td className="p-3 text-right">
                          <CurrencyDisplay
                            amount={amount}
                            fromCurrency="GH₵"
                            showConversion={true}
                            className="font-medium"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Your current preferred currency is set to {currency}. You can change this in your account settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
