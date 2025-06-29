"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/lib/context/currency-context"
import { useAuth } from "@/lib/context/auth-context"
import { getUserInvestments } from "@/lib/services/investment-service"
import { getUserTransactions } from "@/lib/services/transaction-service"
import { useTheme } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

export default function OverviewPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [showBalance, setShowBalance] = useState(false)
  const { currency, formatAmount } = useCurrency()
  const { user } = useAuth()
  const router = useRouter()

  const [investments, setInvestments] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // No need for the document.body.className effect as it's handled by ThemeProvider

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (!user) return

      setIsLoading(true)
      try {
        const [investmentsData, transactionsData] = await Promise.all([
          getUserInvestments(user.id),
          getUserTransactions(user.id),
        ])

        setInvestments(investmentsData)
        setTransactions(transactionsData)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to load your data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  // Calculate totals
  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0)
  const totalReturns = investments.reduce((sum, inv) => {
    // Calculate estimated returns based on project expected returns
    // This is a simplified calculation
    const project = inv.projects
    const expectedReturnRate = project?.expected_returns
      ? Number.parseFloat(project.expected_returns.replace(/[^0-9.]/g, "")) / 100
      : 0.08 // Default to 8% if not specified

    return sum + Number(inv.amount) * expectedReturnRate
  }, 0)

  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : "0.00"

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
    <main className={`p-8 ${themeStyles.background} overflow-auto`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
              onClick={() => router.refresh()}
            >
              Refresh
            </Button>
            <Button
              size="sm"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium`}
              onClick={() => router.push("/dashboard/discover")}
            >
              New Investment
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actual Balance Card */}
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold tracking-tight">Actual Balance</h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className={`ml-2 ${themeStyles.textTertiary} hover:${themeStyles.accent} transition-colors duration-200`}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                  onClick={() => router.push("/dashboard/funding")}
                >
                  Deposit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                  onClick={() => router.push("/dashboard/funding?tab=withdraw")}
                >
                  Withdraw
                </Button>
              </div>
            </div>
            <div className="flex items-end space-x-2 mb-6">
              {isLoading ? (
                <div className="h-8 w-32 bg-gray-700 animate-pulse rounded"></div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {showBalance ? formatAmount(totalInvested + totalReturns) : "•••••••"}
                  </h3>
                  <p className={`${themeStyles.textTertiary} mb-1 font-medium`}>{currency}</p>
                </>
              )}
            </div>
            <div className={`flex items-center space-x-2 text-sm ${themeStyles.textTertiary}`}>
              <span>Total invested:</span>
              <ArrowDown className="h-3 w-3 text-red-500" />
              <span>
                {isLoading ? (
                  <div className="h-4 w-20 bg-gray-700 animate-pulse rounded inline-block"></div>
                ) : showBalance ? (
                  formatAmount(totalInvested)
                ) : (
                  "••••••• " + currency
                )}
              </span>
            </div>
          </div>

          {/* Total Returns Card */}
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold tracking-tight">Total Returns</h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className={`ml-2 ${themeStyles.textTertiary} hover:${themeStyles.accent} transition-colors duration-200`}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}
              >
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  `+${returnPercentage}%`
                )}
              </div>
            </div>
            <div className="flex items-end space-x-2 mb-6">
              {isLoading ? (
                <div className="h-8 w-32 bg-gray-700 animate-pulse rounded"></div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold tracking-tight text-green-500">
                    {showBalance ? `+${formatAmount(totalReturns)}` : "•••••••"}
                  </h3>
                  <p className={`${themeStyles.textTertiary} mb-1 font-medium`}>{currency}</p>
                </>
              )}
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${Math.min(Number.parseFloat(returnPercentage), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* My Assets Card */}
        <div
          className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">My Assets</h2>
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
              onClick={() => router.push("/dashboard/portfolio")}
            >
              View All
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-700 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : investments.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${themeStyles.textSecondary} mb-4`}>You don't have any investments yet.</p>
              <Button onClick={() => router.push("/dashboard/discover")}>Discover Projects</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investments.slice(0, 6).map((investment) => {
                const project = investment.projects
                const expectedReturnRate = project?.expected_returns
                  ? Number.parseFloat(project.expected_returns.replace(/[^0-9.]/g, "")) / 100
                  : 0.08
                const currentValue = Number(investment.amount) * (1 + expectedReturnRate)
                const roi = (currentValue / Number(investment.amount) - 1) * 100

                return (
                  <div
                    key={investment.id}
                    className={`${themeStyles.backgroundTertiary} rounded-lg p-4 border ${themeStyles.border} hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 flex-shrink-0"></div>
                      <h3 className="font-medium truncate">{project?.name || "Unknown Project"}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className={`text-xs ${themeStyles.textTertiary}`}>Investment</p>
                        <p className="font-medium">
                          {formatAmount(investment.amount)} {currency}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${themeStyles.textTertiary}`}>Current Value</p>
                        <p className="font-medium">
                          {formatAmount(currentValue)} {currency}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-xs ${themeStyles.textTertiary}`}>ROI</p>
                        <p className="font-medium text-green-500">+{roi.toFixed(1)}%</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          investment.status === "active"
                            ? theme === "dark"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-700"
                            : theme === "dark"
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {investment.status === "active" ? "Active" : "In Progress"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Transactions Card */}
        <div
          className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
              onClick={() => router.push("/dashboard/orders")}
            >
              View All
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-700 animate-pulse rounded"></div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${themeStyles.textSecondary} mb-4`}>You don't have any transactions yet.</p>
              <Button onClick={() => router.push("/dashboard/funding")}>Make a Deposit</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 3).map((transaction) => {
                const isDeposit = transaction.type === "deposit"
                const isInvestment = transaction.type === "investment"
                const isReturn = transaction.type === "return"

                return (
                  <div
                    key={transaction.id}
                    className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"} flex justify-between items-center`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isDeposit || isReturn
                            ? theme === "dark"
                              ? "bg-green-900/30"
                              : "bg-green-100"
                            : theme === "dark"
                              ? "bg-blue-900/30"
                              : "bg-blue-100"
                        } mr-4`}
                      >
                        <ArrowDown
                          className={`h-5 w-5 ${
                            isDeposit || isReturn
                              ? "text-green-500 transform rotate-45"
                              : "text-blue-500 transform -rotate-45"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{isDeposit ? "Deposit" : isInvestment ? "Investment" : "Return"}</p>
                        <p className={`text-xs ${themeStyles.textTertiary}`}>
                          {new Date(transaction.created_at).toLocaleDateString()} •
                          {new Date(transaction.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${isDeposit || isReturn ? "text-green-500" : "text-blue-500"}`}>
                        {isDeposit || isReturn ? "+" : "-"}
                        {formatAmount(transaction.amount)} {currency}
                      </p>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
