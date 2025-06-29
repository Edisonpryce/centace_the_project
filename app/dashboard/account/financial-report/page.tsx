"use client"

import { useState, useEffect } from "react"
import { Calendar, FileText, Info, FileBarChart, FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"

export default function FinancialReportPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [period, setPeriod] = useState("last-month")
  const [isLoading, setIsLoading] = useState(false)

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme"
  }, [theme])

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
            <h1 className="text-2xl font-bold tracking-tight">Financial Report</h1>
            <p className={`mt-1 ${themeStyles.textTertiary}`}>
              Generate and view detailed financial reports for your investments
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Select Period
            </Button>
            <Button
              size="sm"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium`}
            >
              <FilePlus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* No Documents State */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className={`p-6 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} mb-6`}>
              <FileText className="h-12 w-12 text-gray-500 opacity-50" />
            </div>
            <h2 className="text-xl font-medium mb-2">There are no generated documents at this moment</h2>
            <p className={`text-center max-w-md ${themeStyles.textTertiary} mb-6`}>
              Generate a financial report to view detailed analysis of your investment performance, tax information, and
              portfolio growth.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover}`}
              >
                <FileBarChart className="h-4 w-4 mr-2" />
                View Sample Report
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <FilePlus className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription className={themeStyles.textTertiary}>Overview of all your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${themeStyles.textSecondary} mb-4`}>
                This report provides a comprehensive summary of all your investments, including:
              </p>
              <ul className={`text-sm ${themeStyles.textSecondary} space-y-2 list-disc pl-5 mb-4`}>
                <li>Total invested amount</li>
                <li>Current portfolio value</li>
                <li>Performance metrics</li>
                <li>Asset allocation</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
            </CardFooter>
          </Card>

          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader>
              <CardTitle>Tax Statement</CardTitle>
              <CardDescription className={themeStyles.textTertiary}>For tax filing purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${themeStyles.textSecondary} mb-4`}>
                This report provides all necessary information for tax filing, including:
              </p>
              <ul className={`text-sm ${themeStyles.textSecondary} space-y-2 list-disc pl-5 mb-4`}>
                <li>Investment income</li>
                <li>Capital gains/losses</li>
                <li>Dividend distributions</li>
                <li>Tax-deductible expenses</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
            </CardFooter>
          </Card>

          <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription className={themeStyles.textTertiary}>Detailed investment performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${themeStyles.textSecondary} mb-4`}>
                This report provides in-depth analysis of your investment performance, including:
              </p>
              <ul className={`text-sm ${themeStyles.textSecondary} space-y-2 list-disc pl-5 mb-4`}>
                <li>ROI by investment</li>
                <li>Historical performance</li>
                <li>Benchmark comparisons</li>
                <li>Risk assessment</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Help Section */}
        <Card className={`${themeStyles.backgroundCard} border ${themeStyles.border}`}>
          <CardHeader>
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-500 mr-2" />
              <CardTitle>About Financial Reports</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className={themeStyles.textSecondary}>
                Financial reports provide detailed insights into your investment performance and financial status. These
                reports are generated based on your account activity and can be used for various purposes including tax
                filing, investment planning, and portfolio analysis.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                  <h3 className="font-medium mb-2">Report Generation</h3>
                  <p className={`text-sm ${themeStyles.textTertiary}`}>
                    Reports are generated on-demand and can be customized by selecting different time periods and report
                    types. Once generated, reports can be downloaded in PDF format or shared directly.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                  <h3 className="font-medium mb-2">Data Accuracy</h3>
                  <p className={`text-sm ${themeStyles.textTertiary}`}>
                    All financial data in these reports is based on your actual investment transactions and account
                    activity. For any discrepancies, please contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
