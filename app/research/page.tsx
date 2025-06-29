import { CardContent, Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChartIcon as ChartBar, TrendingUp, BookOpen, Users } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Investment Research</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">
            Industry-leading analysis and insights to help you make informed investment decisions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Research Categories</h3>
                <nav>
                  <ul className="space-y-2">
                    {[
                      "Market Analysis",
                      "Project Reports",
                      "Sector Insights",
                      "Investment Strategies",
                      "Risk Assessment",
                      "Emerging Trends",
                    ].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Research Updates</h4>
                  <Button size="sm" variant="outline" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="featured">Featured Research</TabsTrigger>
                <TabsTrigger value="recent">Recently Published</TabsTrigger>
                <TabsTrigger value="popular">Most Viewed</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-8">
                {/* Featured Research Item */}
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
                      <ChartBar className="w-16 h-16 text-blue-500" />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Market Analysis
                          </Badge>
                          <h3 className="text-xl font-bold">Agricultural Investment Outlook 2025</h3>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Comprehensive analysis of global agricultural investment trends, with focus on sustainable
                        farming practices, technology integration, and expected returns across different regions.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Published: May 10, 2025</div>
                        <Button size="sm">Read Full Report</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Featured Research Item */}
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Sector Insights
                          </Badge>
                          <h3 className="text-xl font-bold">Renewable Energy Project Performance</h3>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Detailed analysis of performance metrics from renewable energy investments, comparing solar,
                        wind, and hydro projects across different markets with ROI benchmarking.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Published: April 28, 2025</div>
                        <Button size="sm">Read Full Report</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Featured Research Item */}
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-purple-500" />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Investment Strategies
                          </Badge>
                          <h3 className="text-xl font-bold">Portfolio Diversification Through Real Assets</h3>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Strategic guide to building a balanced investment portfolio using real-world assets as a hedge
                        against market volatility, with allocation recommendations and risk analysis.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Published: April 15, 2025</div>
                        <Button size="sm">Read Full Report</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="recent" className="space-y-8">
                {/* Simpler list view of recent research */}
                {[
                  {
                    title: "Technology Infrastructure Investments: Regional Growth Analysis",
                    category: "Sector Insights",
                    date: "May 12, 2025",
                    icon: <ChartBar className="w-10 h-10 text-blue-500" />,
                  },
                  {
                    title: "Post-Pandemic Recovery: Agricultural Project Returns",
                    category: "Market Analysis",
                    date: "May 8, 2025",
                    icon: <TrendingUp className="w-10 h-10 text-green-500" />,
                  },
                  {
                    title: "Supply Chain Resilience: Manufacturing Investment Opportunities",
                    category: "Risk Assessment",
                    date: "May 3, 2025",
                    icon: <FileText className="w-10 h-10 text-amber-500" />,
                  },
                  {
                    title: "Digital Transformation in Traditional Industries: Investment Guide",
                    category: "Investment Strategies",
                    date: "April 30, 2025",
                    icon: <BookOpen className="w-10 h-10 text-purple-500" />,
                  },
                  {
                    title: "Sustainable Construction Projects: Environmental Impact vs. ROI",
                    category: "Project Reports",
                    date: "April 25, 2025",
                    icon: <Users className="w-10 h-10 text-cyan-500" />,
                  },
                ].map((report, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">{report.icon}</div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-1">
                          {report.category}
                        </Badge>
                        <h3 className="text-lg font-bold mb-1">{report.title}</h3>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Published: {report.date}</div>
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popular" className="space-y-8">
                {/* Popular research with view counts */}
                {[
                  {
                    title: "The Future of Real Estate Investment: Post-Pandemic Trends",
                    category: "Market Analysis",
                    views: "12,458",
                    icon: <ChartBar className="w-10 h-10 text-blue-500" />,
                  },
                  {
                    title: "Small-Scale Agricultural Projects: Risk vs. Return Analysis",
                    category: "Risk Assessment",
                    views: "9,745",
                    icon: <TrendingUp className="w-10 h-10 text-red-500" />,
                  },
                  {
                    title: "Emerging Markets Infrastructure Investment Guide",
                    category: "Investment Strategies",
                    views: "8,921",
                    icon: <FileText className="w-10 h-10 text-amber-500" />,
                  },
                  {
                    title: "Technology Investments in Traditional Industries",
                    category: "Sector Insights",
                    views: "7,886",
                    icon: <BookOpen className="w-10 h-10 text-green-500" />,
                  },
                  {
                    title: "Private Equity in Sustainable Development Projects",
                    category: "Project Reports",
                    views: "6,554",
                    icon: <Users className="w-10 h-10 text-indigo-500" />,
                  },
                ].map((report, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">{report.icon}</div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-1">
                          {report.category}
                        </Badge>
                        <h3 className="text-lg font-bold mb-1">{report.title}</h3>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{report.views}</span> views
                          </div>
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
