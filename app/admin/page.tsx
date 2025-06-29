import { getPlatformStats } from "@/lib/services/admin-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, ImageIcon, Flag, BarChart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import AdminStatsCard from "./components/admin-stats-card"
import AdminChart from "./components/admin-chart"

export const metadata = {
  title: "Admin Dashboard | Centace Investment Platform",
}

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const stats = await getPlatformStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AdminStatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-5 w-5" />}
          description="Registered users on the platform"
          trend="+5.2%"
          trendDirection="up"
        />

        <AdminStatsCard
          title="Total Investments"
          value={stats.totalInvestments}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Completed investment transactions"
          trend="+12.3%"
          trendDirection="up"
        />

        <AdminStatsCard
          title="Total Invested"
          value={formatCurrency(stats.totalInvested)}
          icon={<DollarSign className="h-5 w-5" />}
          description="Capital invested on the platform"
          trend="+8.7%"
          trendDirection="up"
          isMonetary
        />

        <AdminStatsCard
          title="Active Projects"
          value={stats.totalProjects}
          icon={<BarChart className="h-5 w-5" />}
          description="Investment opportunities available"
          trend="+3.1%"
          trendDirection="up"
        />

        <AdminStatsCard
          title="Pending Media"
          value={stats.pendingMedia}
          icon={<ImageIcon className="h-5 w-5" />}
          description="Media items awaiting approval"
          trend="0"
          trendDirection="neutral"
          actionLink="/admin/media"
          actionText="Review"
        />

        <AdminStatsCard
          title="Flagged Content"
          value={stats.flaggedContent}
          icon={<Flag className="h-5 w-5" />}
          description="Reports requiring attention"
          trend="+2"
          trendDirection="down"
          actionLink="/admin/reports"
          actionText="Review"
          urgent={stats.flaggedContent > 0}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminChart type="line" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminChart type="bar" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminChart type="pie" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity items would go here */}
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading recent activity...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
