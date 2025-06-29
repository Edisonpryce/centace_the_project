import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminStatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description: string
  trend: string
  trendDirection: "up" | "down" | "neutral"
  isMonetary?: boolean
  actionLink?: string
  actionText?: string
  urgent?: boolean
}

export default function AdminStatsCard({
  title,
  value,
  icon,
  description,
  trend,
  trendDirection,
  isMonetary = false,
  actionLink,
  actionText,
  urgent = false,
}: AdminStatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", urgent && "border-red-400 dark:border-red-500")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            {icon}
          </div>
          {urgent && (
            <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:text-red-300">
              Urgent
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {trendDirection === "up" && <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />}
          {trendDirection === "down" && <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
          {trendDirection === "neutral" && <Minus className="h-4 w-4 text-gray-500 mr-1" />}
          <span
            className={cn(
              "text-xs font-medium",
              trendDirection === "up" && "text-green-500",
              trendDirection === "down" && "text-red-500",
              trendDirection === "neutral" && "text-gray-500",
            )}
          >
            {trend} {trendDirection !== "neutral" && "from last month"}
          </span>
        </div>
        {actionLink && actionText && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={actionLink}>{actionText}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
