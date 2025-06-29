"use client"

import { useState, useEffect } from "react"
import { Download, Filter, Calendar, FileText, ArrowUpDown, Info, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/lib/context/auth-context"
import type { Transaction } from "@/lib/types/database"
import { useTheme } from "@/components/theme-provider"

export default function AccountStatementPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [period, setPeriod] = useState("last-month")
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summaryData, setSummaryData] = useState({
    openingBalance: 0,
    closingBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalInvestments: 0,
    totalReturns: 0,
    depositCount: 0,
    withdrawalCount: 0,
    startDate: "",
    endDate: "",
  })
  const { user } = useAuth()

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme"
  }, [theme])

  // Fetch user transactions
  useEffect(() => {
    async function fetchTransactions() {
      if (!user) return

      setIsLoading(true)

      try {
        // Get date range based on selected period
        const today = new Date()
        const startDate = new Date()

        if (period === "last-month") {
          startDate.setMonth(today.getMonth() - 1)
        } else if (period === "last-quarter") {
          startDate.setMonth(today.getMonth() - 3)
        } else if (period === "last-year") {
          startDate.setFullYear(today.getFullYear() - 1)
        } else {
          // Default to last 30 days
          startDate.setDate(today.getDate() - 30)
        }

        // Format dates for display
        const startDateStr = startDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        const endDateStr = today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        // Fetch transactions for the user within the date range
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .gte("created_at", startDate.toISOString())
          .lte("created_at", today.toISOString())
          .order("created_at", { ascending: true })

        if (error) {
          console.error("Error fetching transactions:", error)
          return
        }

        // Calculate summary data
        let deposits = 0
        let withdrawals = 0
        let investments = 0
        let returns = 0
        let depositCount = 0
        let withdrawalCount = 0

        data.forEach((transaction) => {
          if (transaction.type === "deposit") {
            deposits += Number(transaction.amount)
            depositCount++
          } else if (transaction.type === "withdrawal") {
            withdrawals += Number(transaction.amount)
            withdrawalCount++
          } else if (transaction.type === "investment") {
            investments += Number(transaction.amount)
          } else if (transaction.type === "return") {
            returns += Number(transaction.amount)
          }
        })

        // Calculate opening and closing balance
        // For simplicity, we'll assume opening balance is deposits - withdrawals - investments + returns
        // In a real app, you'd need to track balance changes over time
        const openingBalance = 0 // This would come from a balance history table in a real app
        const closingBalance = openingBalance + deposits - withdrawals - investments + returns

        setSummaryData({
          openingBalance,
          closingBalance,
          totalDeposits: deposits,
          totalWithdrawals: withdrawals,
          totalInvestments: investments,
          totalReturns: returns,
          depositCount,
          withdrawalCount,
          startDate: startDateStr,
          endDate: endDateStr,
        })

        // Add opening and closing balance transactions for display
        const enhancedTransactions = [
          {
            id: "opening",
            user_id: user.id,
            type: "balance",
            amount: openingBalance,
            status: "completed",
            payment_method: null,
            reference: null,
            created_at: startDate.toISOString(),
            description: "Opening Balance",
          },
          ...data.map((tx) => ({
            ...tx,
            description: getTransactionDescription(tx),
          })),
          {
            id: "closing",
            user_id: user.id,
            type: "balance",
            amount: closingBalance,
            status: "completed",
            payment_method: null,
            reference: null,
            created_at: today.toISOString(),
            description: "Closing Balance",
          },
        ]

        setTransactions(enhancedTransactions)
      } catch (error) {
        console.error("Error processing transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [user, period])

  // Helper function to generate transaction descriptions
  function getTransactionDescription(transaction: Transaction) {
    switch (transaction.type) {
      case "deposit":
        return `Deposit${transaction.payment_method ? ` via ${transaction.payment_method}` : ""}`
      case "withdrawal":
        return `Withdrawal${transaction.payment_method ? ` via ${transaction.payment_method}` : ""}`
      case "investment":
        return `Investment${transaction.reference ? ` - ${transaction.reference}` : ""}`
      case "return":
        return `Return${transaction.reference ? ` - ${transaction.reference}` : ""}`
      default:
        return transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
    }
  }

  // Theme-based style variables
  const themeStyles = {
    background: theme === "dark" ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: theme === "dark" ? "bg-[#161b22]" : "bg-white",
    backgroundCard: theme === "dark" ? "bg-[#1a1d24]" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    textTertiary: theme === "dark" ? "text-gray-400" : "text-gray-500",
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",
    hover: theme === "dark" ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeNav: theme === "dark" ? "bg-[#21262d]" : "bg-blue-50 text-blue-600",
    shadow: theme === "dark" ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    accent: theme === "dark" ? "text-blue-400" : "text-blue-600",
    accentBg: theme === "dark" ? "bg-blue-900/20" : "bg-blue-50",
  }

  return (
    <div className={`p-6 ${themeStyles.background} overflow-auto`}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account Statement</h1>
            <p className={`mt-1 ${themeStyles.textTertiary}`}>View your account activity and transaction history</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              size="sm"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium`}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Select
                  value={period}
                  onValueChange={(value) => {
                    setPeriod(value)
                    setIsLoading(true)
                  }}
                >
                  <SelectTrigger
                    className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} w-[180px]`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} flex items-center gap-2 rounded-lg h-9`}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger
                    className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} w-[150px]`}
                  >
                    <SelectValue placeholder="Transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="deposits">Deposits</SelectItem>
                    <SelectItem value="withdrawals">Withdrawals</SelectItem>
                    <SelectItem value="investments">Investments</SelectItem>
                    <SelectItem value="returns">Returns</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} flex items-center gap-2 rounded-lg h-9`}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Opening Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.openingBalance.toLocaleString()} GH₵</div>
              <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>As of {summaryData.startDate}</p>
            </CardContent>
          </Card>

          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Closing Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.closingBalance.toLocaleString()} GH₵</div>
              <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>As of {summaryData.endDate}</p>
            </CardContent>
          </Card>

          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+{summaryData.totalDeposits.toLocaleString()} GH₵</div>
              <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>{summaryData.depositCount} transactions</p>
            </CardContent>
          </Card>

          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                -{summaryData.totalWithdrawals.toLocaleString()} GH₵
              </div>
              <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>{summaryData.withdrawalCount} transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription className={themeStyles.textTertiary}>
                  Detailed record of all your account transactions
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover}`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Statement
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin mb-4"></div>
                <p className={themeStyles.textSecondary}>Loading transaction data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className={theme === "dark" ? "border-gray-800" : "border-gray-200"}>
                      <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>Date</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">Description</TableHead>
                      <TableHead className="whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span>Amount</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <TableRow key={index} className={theme === "dark" ? "border-gray-800" : "border-gray-200"}>
                            <TableCell>
                              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <Info className="h-8 w-8 text-gray-400 mb-2" />
                            <p className={`${themeStyles.textSecondary} mb-2`}>No transactions found for this period</p>
                            <Button variant="outline" size="sm">
                              Add Funds
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className={theme === "dark" ? "border-gray-800" : "border-gray-200"}
                        >
                          <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                          <TableCell>
                            {new Date(transaction.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.type === "deposit" || transaction.type === "return"
                                ? "text-green-500"
                                : transaction.type === "withdrawal" || transaction.type === "investment"
                                  ? "text-red-500"
                                  : ""
                            }`}
                          >
                            {transaction.type !== "balance" &&
                            (transaction.type === "deposit" || transaction.type === "return")
                              ? "+"
                              : ""}
                            {Number(transaction.amount).toLocaleString()} GH₵
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "completed"
                                  ? theme === "dark"
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-green-100 text-green-700"
                                  : theme === "dark"
                                    ? "bg-yellow-900/30 text-yellow-400"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className={`border-t ${themeStyles.border} pt-4 flex justify-between`}>
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              <span className={`text-xs ${themeStyles.textTertiary}`}>
                This statement covers the period from {summaryData.startDate} to {summaryData.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${themeStyles.textSecondary}`}>Page 1 of 1</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
