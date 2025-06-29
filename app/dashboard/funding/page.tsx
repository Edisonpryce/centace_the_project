"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Landmark, Wallet, AlertCircle, CheckCircle2, Copy, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { processDeposit, processWithdrawal } from "./actions"

export default function FundingPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Theme-based style variables
  const themeStyles = {
    background: isDark ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: isDark ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: isDark ? "bg-[#161b22]" : "bg-white",
    backgroundCard: isDark ? "bg-[#1a1d24]" : "bg-white",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-100" : "text-gray-700",
    textTertiary: isDark ? "text-gray-200" : "text-gray-600",
    border: isDark ? "border-gray-800" : "border-gray-200",
    borderSecondary: isDark ? "border-gray-700" : "border-gray-300",
    hover: isDark ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeNav: isDark ? "bg-[#21262d]" : "bg-blue-50 text-blue-600",
    shadow: isDark ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    accent: isDark ? "text-blue-400" : "text-blue-600",
    accentBg: isDark ? "bg-blue-900/20" : "bg-blue-50",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }, 1500)
  }

  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const presetAmounts = [100, 500, 1000, 5000]

  return (
    <div className={`p-6 ${themeStyles.background}`}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 -ml-2 mb-6`}
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Fund Your Account</h1>
          <p className={`${themeStyles.textTertiary}`}>
            Add funds to your account to start investing in available projects
          </p>
        </div>

        {showSuccess ? (
          <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} mb-8`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Deposit Successful!</h2>
                <p className={`${themeStyles.textTertiary} max-w-md mb-6`}>
                  Your account has been funded successfully. You will be redirected to the dashboard shortly.
                </p>
                <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="deposit">Deposit Funds</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} mb-8`}>
                    <CardHeader>
                      <CardTitle>Deposit Method</CardTitle>
                      <CardDescription>Choose how you want to fund your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6" action={processDeposit}>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="amount">Amount</Label>
                            <div className="mt-1.5 relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                              <Input
                                id="amount"
                                type="text"
                                placeholder="Enter amount"
                                className="pl-8"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {presetAmounts.map((presetAmount) => (
                                <button
                                  key={presetAmount}
                                  type="button"
                                  className={`px-3 py-1 text-sm rounded-full ${themeStyles.border} ${themeStyles.hover}`}
                                  onClick={() => setAmount(presetAmount.toString())}
                                >
                                  ${presetAmount}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label>Payment Method</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
                              <div
                                className={`border ${themeStyles.border} rounded-lg p-4 cursor-pointer ${
                                  paymentMethod === "card" ? "ring-2 ring-blue-500" : ""
                                }`}
                                onClick={() => setPaymentMethod("card")}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`h-10 w-10 rounded-full ${themeStyles.accentBg} flex items-center justify-center mr-3`}
                                  >
                                    <CreditCard className={`h-5 w-5 ${themeStyles.accent}`} />
                                  </div>
                                  <div>
                                    <p className="font-medium">Credit Card</p>
                                    <p className={`text-xs ${themeStyles.textTertiary}`}>Instant processing</p>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`border ${themeStyles.border} rounded-lg p-4 cursor-pointer ${
                                  paymentMethod === "bank" ? "ring-2 ring-blue-500" : ""
                                }`}
                                onClick={() => setPaymentMethod("bank")}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`h-10 w-10 rounded-full ${themeStyles.accentBg} flex items-center justify-center mr-3`}
                                  >
                                    <Landmark className={`h-5 w-5 ${themeStyles.accent}`} />
                                  </div>
                                  <div>
                                    <p className="font-medium">Bank Transfer</p>
                                    <p className={`text-xs ${themeStyles.textTertiary}`}>1-3 business days</p>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`border ${themeStyles.border} rounded-lg p-4 cursor-pointer ${
                                  paymentMethod === "crypto" ? "ring-2 ring-blue-500" : ""
                                }`}
                                onClick={() => setPaymentMethod("crypto")}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`h-10 w-10 rounded-full ${themeStyles.accentBg} flex items-center justify-center mr-3`}
                                  >
                                    <Wallet className={`h-5 w-5 ${themeStyles.accent}`} />
                                  </div>
                                  <div>
                                    <p className="font-medium">Cryptocurrency</p>
                                    <p className={`text-xs ${themeStyles.textTertiary}`}>BTC, ETH, USDT</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {paymentMethod === "card" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="cardName">Cardholder Name</Label>
                                  <Input id="cardName" placeholder="John Doe" className="mt-1.5" required />
                                </div>
                                <div>
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    className="mt-1.5"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" className="mt-1.5" required />
                                </div>
                                <div>
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" placeholder="123" className="mt-1.5" required />
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === "bank" && (
                            <div className="space-y-4">
                              <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Bank Transfer Information</AlertTitle>
                                <AlertDescription>
                                  Please use the following details to make your bank transfer. Include your account ID
                                  in the reference.
                                </AlertDescription>
                              </Alert>

                              <div className={`p-4 rounded-lg ${themeStyles.border} space-y-3`}>
                                <div className="flex justify-between items-center">
                                  <span className={`${themeStyles.textTertiary}`}>Account Name</span>
                                  <div className="flex items-center">
                                    <span className="font-medium">Centace Investments Ltd</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyToClipboard("Centace Investments Ltd")}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className={`${themeStyles.textTertiary}`}>Account Number</span>
                                  <div className="flex items-center">
                                    <span className="font-medium">8374928374</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyToClipboard("8374928374")}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className={`${themeStyles.textTertiary}`}>Bank Name</span>
                                  <div className="flex items-center">
                                    <span className="font-medium">International Bank</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyToClipboard("International Bank")}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className={`${themeStyles.textTertiary}`}>Reference</span>
                                  <div className="flex items-center">
                                    <span className="font-medium">ACC-123456</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyToClipboard("ACC-123456")}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="transferReference">Transfer Reference</Label>
                                <Input
                                  id="transferReference"
                                  placeholder="Enter your bank reference"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          )}

                          {paymentMethod === "crypto" && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="cryptoType">Select Cryptocurrency</Label>
                                <Select defaultValue="btc">
                                  <SelectTrigger className="mt-1.5">
                                    <SelectValue placeholder="Select cryptocurrency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                                    <SelectItem value="usdt">Tether (USDT)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Crypto Deposit Address</AlertTitle>
                                <AlertDescription>
                                  Send your cryptocurrency to the address below. The funds will be credited after 2
                                  confirmations.
                                </AlertDescription>
                              </Alert>

                              <div className={`p-4 rounded-lg ${themeStyles.border}`}>
                                <div className="flex flex-col">
                                  <span className={`text-sm ${themeStyles.textTertiary} mb-1`}>Bitcoin Address</span>
                                  <div className="flex items-center justify-between">
                                    <code className="text-sm font-mono break-all">
                                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                    </code>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCopyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")
                                      }
                                      className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="txid">Transaction ID (optional)</Label>
                                <Input id="txid" placeholder="Enter transaction ID" className="mt-1.5" />
                              </div>
                            </div>
                          )}

                          <Alert variant="destructive" className="bg-amber-50 text-amber-800 border border-amber-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                              All deposits are subject to our terms and conditions. Funds will be available for
                              investment after processing.
                            </AlertDescription>
                          </Alert>

                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Processing..." : "Complete Deposit"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} sticky top-20`}>
                    <CardHeader>
                      <CardTitle>Deposit Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className={`${themeStyles.textTertiary}`}>Amount</span>
                          <span className="font-medium">${amount || "0.00"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeStyles.textTertiary}`}>Processing Fee</span>
                          <span className="font-medium">$0.00</span>
                        </div>
                        <div className="border-t border-dashed pt-4 mt-4">
                          <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-bold">${amount || "0.00"}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                      <p className={`text-xs ${themeStyles.textTertiary} mb-4`}>
                        By proceeding with this deposit, you agree to our Terms of Service and Privacy Policy.
                      </p>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm">Secure payment processing</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="withdraw">
              <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} mb-8`}>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Request a withdrawal from your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" action={processWithdrawal}>
                    <div>
                      <Label htmlFor="withdrawAmount">Amount</Label>
                      <div className="mt-1.5 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input id="withdrawAmount" type="text" placeholder="Enter amount" className="pl-8" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="withdrawMethod">Withdrawal Method</Label>
                      <Select defaultValue="bank">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="card">Credit Card Refund</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="accountDetails">Account Details</Label>
                      <Input
                        id="accountDetails"
                        placeholder="Enter your bank account details"
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Withdrawal Processing Time</AlertTitle>
                      <AlertDescription>
                        Withdrawals typically take 1-3 business days to process. You will receive an email confirmation
                        once your request is approved.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                      Request Withdrawal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
