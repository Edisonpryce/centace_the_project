"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, CircleDollarSign, Compass, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/context/auth-context"
import { getUserInvestments } from "@/lib/services/investment-service"
import { getUserTransactions } from "@/lib/services/transaction-service"
import { formatCurrency } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [investments, setInvestments] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      setLoading(true)
      try {
        // Fetch user investments
        const investmentsData = await getUserInvestments(user.id)
        setInvestments(investmentsData)

        // Fetch user transactions
        const transactionsData = await getUserTransactions(user.id)
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  // Calculate portfolio stats based on real data
  const portfolioStats = {
    totalInvested: investments.reduce((total, inv) => total + Number(inv.total_amount || 0), 0),
    currentValue: investments.reduce((total, inv) => {
      // Calculate current value based on initial investment plus any returns
      const initialAmount = Number(inv.total_amount || 0)
      const returnPercentage = Number(inv.projects?.expected_returns?.replace(/[^0-9.-]+/g, "") || 0) / 100
      return total + initialAmount * (1 + returnPercentage)
    }, 0),
    activeInvestments: investments.filter((inv) => inv.status === "active").length,
  }

  // Calculate total returns
  portfolioStats.totalReturns = portfolioStats.currentValue - portfolioStats.totalInvested
  portfolioStats.returnPercentage =
    portfolioStats.totalInvested > 0 ? (portfolioStats.totalReturns / portfolioStats.totalInvested) * 100 : 0

  // Get recent activities from transactions
  const recentActivities = transactions.slice(0, 3).map((transaction) => ({
    type: transaction.type,
    amount: Number(transaction.amount),
    date: new Date(transaction.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    status: transaction.status,
    project: transaction.reference,
  }))

  // Theme-based style variables
  const themeStyles = {
    background: isDark ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundCard: isDark ? "bg-[#1a1d24]" : "bg-white",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    textTertiary: isDark ? "text-gray-400" : "text-gray-600",
    border: isDark ? "border-gray-800" : "border-gray-200",
    hover: isDark ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    accent: isDark ? "text-blue-400" : "text-blue-600",
    positive: isDark ? "text-green-400" : "text-green-600",
    completed: isDark ? "text-green-500" : "text-green-600",
    received: isDark ? "text-blue-500" : "text-blue-600",
  }

  if (loading && !user) {
    return (
      <div
        className={`p-6 ${themeStyles.background} ${themeStyles.text} flex items-center justify-center min-h-screen`}
      >
        <div className="text-center">
          <div
            className={`w-12 h-12 border-4 ${isDark ? "border-t-blue-500 border-blue-200/20" : "border-t-blue-600 border-blue-100"} rounded-full animate-spin mx-auto mb-4`}
          ></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 ${themeStyles.background} ${themeStyles.text} min-h-screen`}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Discover Projects */}
          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Compass className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover Projects</h3>
              <p className={`${themeStyles.textTertiary} mb-4`}>Explore new investment opportunities</p>
              <Link href="/dashboard/discover">
                <Button variant="outline" className="w-full justify-between group">
                  Browse Projects
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
              <p className={`${themeStyles.textTertiary} mb-4`}>Track your current investments</p>
              <Link href="/dashboard/portfolio">
                <Button variant="outline" className="w-full justify-between group">
                  View Portfolio
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Deposit Funds */}
          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Deposit Funds</h3>
              <p className={`${themeStyles.textTertiary} mb-4`}>Add funds to your account</p>
              <Link href="/dashboard/funding">
                <Button variant="outline" className="w-full justify-between group">
                  Deposit
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">Performance Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Invested */}
              <div>
                <p className={`${themeStyles.textTertiary} text-sm mb-1`}>Total Invested</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioStats.totalInvested)}</p>
                <p className={`text-xs ${themeStyles.positive} mt-1`}>+12.5% from last month</p>
              </div>

              {/* Current Value */}
              <div>
                <p className={`${themeStyles.textTertiary} text-sm mb-1`}>Current Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioStats.currentValue)}</p>
                <p className={`text-xs ${themeStyles.positive} mt-1`}>
                  +{portfolioStats.returnPercentage.toFixed(1)}% overall return
                </p>
              </div>

              {/* Active Projects */}
              <div>
                <p className={`${themeStyles.textTertiary} text-sm mb-1`}>Active Projects</p>
                <p className="text-2xl font-bold">{portfolioStats.activeInvestments}</p>
                <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>Across 3 sectors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CircleDollarSign className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                  >
                    <div>
                      <p className="font-medium capitalize">{activity.type}</p>
                      <p className={`text-sm ${themeStyles.textTertiary}`}>{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          activity.type === "deposit"
                            ? themeStyles.completed
                            : activity.type === "investment"
                              ? themeStyles.completed
                              : themeStyles.received
                        }`}
                      >
                        {formatCurrency(activity.amount)}
                      </p>
                      <p
                        className={`text-sm ${
                          activity.type === "deposit"
                            ? "text-green-500"
                            : activity.type === "investment"
                              ? "text-green-500"
                              : "text-blue-500"
                        }`}
                      >
                        {activity.type === "deposit"
                          ? "Completed"
                          : activity.type === "investment"
                            ? "Completed"
                            : "Received"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className={themeStyles.textTertiary}>No recent activities</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Button variant="outline" className="w-full justify-center">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
