"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, PlusCircle, RefreshCw, Filter, Download, Calendar, ArrowUpDown, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/context/auth-context"
import { supabase } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

export default function OrdersPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const { user } = useAuth()

  // No need for the document.body.className effect as it's handled by ThemeProvider

  // Fetch user's investments/orders
  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        const { data, error } = await supabase
          .from("investments")
          .select(`
          *,
          projects:project_id (
            name,
            price_per_share,
            maturity_period,
            expected_returns
          )
        `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching orders:", error)
          setOrders([])
        } else {
          setOrders(data || [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  // Function to calculate weeks left for maturity
  const calculateWeeksLeft = (maturityPeriod, createdAt) => {
    if (!maturityPeriod || !createdAt) return "N/A"

    try {
      const matches = String(maturityPeriod).match(/(\d+)\s*weeks?/i)
      if (!matches) return "N/A"

      const totalWeeks = Number.parseInt(matches[1])
      if (isNaN(totalWeeks)) return "N/A"

      const startDate = new Date(createdAt)
      const currentDate = new Date()

      if (isNaN(startDate.getTime())) return "N/A"

      const weeksPassed = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000))
      const weeksLeft = Math.max(0, totalWeeks - weeksPassed)

      return weeksLeft
    } catch (error) {
      console.error("Error calculating weeks left:", error)
      return "N/A"
    }
  }

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
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
    <div className={`p-8 ${themeStyles.background} overflow-auto`}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
            <p className={`mt-1 ${themeStyles.textTertiary}`}>Manage and track all your investment orders</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => {
                  if (user) {
                    // Re-fetch data
                    supabase
                      .from("investments")
                      .select(`
                        *,
                        projects:project_id (
                          name,
                          price_per_share,
                          maturity_period,
                          expected_returns
                        )
                      `)
                      .eq("user_id", user.id)
                      .order("created_at", { ascending: false })
                      .then(({ data, error }) => {
                        if (error) {
                          console.error("Error refreshing orders:", error)
                          setOrders([])
                        } else {
                          setOrders(data || [])
                        }
                        setIsLoading(false)
                      })
                      .catch((error) => {
                        console.error("Error refreshing orders:", error)
                        setOrders([])
                        setIsLoading(false)
                      })
                  } else {
                    setIsLoading(false)
                  }
                }, 500)
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <Button
              size="sm"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium`}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className={`${themeStyles.backgroundCard} p-4 rounded-lg border ${themeStyles.border} mb-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} flex items-center gap-2 rounded-lg h-9`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Button
                variant="outline"
                size="sm"
                className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} flex items-center gap-2 rounded-lg h-9`}
              >
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} flex items-center gap-2 rounded-lg h-9`}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div
          className={`${themeStyles.backgroundCard} rounded-lg border ${themeStyles.border} overflow-hidden ${themeStyles.shadow}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${themeStyles.border} ${theme === "dark" ? "bg-[#0f1217]" : "bg-gray-50"}`}>
                  <th className="w-12 p-4 text-left">
                    <Checkbox />
                  </th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        Time
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        Project
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        Amount
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        approx. weeks of maturity
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        approx. weeks left for maturity
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        Est. profit %
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium uppercase tracking-wider ${themeStyles.textTertiary}`}>
                        Status
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {isLoading ? (
                  // Loading state
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className={`animate-pulse ${themeStyles.hover}`}>
                        <td className="p-4">
                          <div className="h-4 w-4 bg-gray-700 rounded"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-32 bg-gray-700 rounded"></div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="h-4 w-20 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="h-4 w-12 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="h-4 w-12 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-20 bg-gray-700 rounded"></div>
                        </td>
                      </tr>
                    ))
                ) : orders.length === 0 ? (
                  // Empty state
                  <tr>
                    <td colSpan={8} className="py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className={`p-4 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} mb-4`}>
                          <FileText className="h-12 w-12 text-gray-500 opacity-50" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No Records</h3>
                        <p className={`text-sm ${themeStyles.textTertiary} max-w-md text-center mb-4`}>
                          You haven't made any investments yet. Start by exploring projects on the Discover page.
                        </p>
                        <Link href="/dashboard/discover">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                          >
                            Explore Projects
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Display actual orders
                  orders.map((order) => {
                    const maturityPeriod = order.projects?.maturity_period || "N/A"
                    const weeksLeft = calculateWeeksLeft(maturityPeriod, order.created_at)
                    const expectedReturns = order.projects?.expected_returns || "N/A"
                    const projectName = order.projects?.name || "Unknown Project"
                    const amount = order.amount || 0
                    const status = order.status || "unknown"

                    return (
                      <tr key={order.id} className={`${themeStyles.hover}`}>
                        <td className="p-4">
                          <Checkbox />
                        </td>
                        <td className="p-4">
                          <span className={`text-sm ${themeStyles.text}`}>
                            {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Unknown"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-sm font-medium ${themeStyles.text}`}>{projectName}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`text-sm font-medium ${themeStyles.text}`}>{formatCurrency(amount)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`text-sm ${themeStyles.text}`}>
                            {typeof maturityPeriod === "string"
                              ? maturityPeriod.replace(/(\d+)\s*(weeks?)/i, "$1")
                              : "N/A"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`text-sm ${themeStyles.text}`}>{weeksLeft}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`text-sm font-medium ${themeStyles.text}`}>
                            {typeof expectedReturns === "string" ? expectedReturns.replace("%", "") : "N/A"}%
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
                            <span className={`text-sm ${themeStyles.text} capitalize`}>{status}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend and Help Section */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full bg-green-500 mr-2`}></span>
              <span className={`text-xs ${themeStyles.textSecondary}`}>Active</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2`}></span>
              <span className={`text-xs ${themeStyles.textSecondary}`}>Pending</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full bg-blue-500 mr-2`}></span>
              <span className={`text-xs ${themeStyles.textSecondary}`}>Completed</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={`${themeStyles.textSecondary} rounded-lg transition-colors duration-200 text-xs`}
          >
            <HelpCircle className="h-3 w-3 mr-1" />
            Need help with orders?
          </Button>
        </div>
      </div>
    </div>
  )
}
