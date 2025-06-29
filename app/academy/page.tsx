import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Search, BookOpen, Video, FileText, Clock, Award, ChevronRight, Play, Users, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Centace Investment Academy</h1>
          <p className="text-xl mb-8 max-w-3xl">
            Master the art of investing in real-world assets and build your financial future
          </p>
          <div className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search courses, articles, and resources..."
                className="pl-10 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Courses */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Button variant="outline" className="gap-2">
              View All Courses <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Investment Fundamentals",
                desc: "Learn the basics of investing in real-world projects and assets",
                lessons: 12,
                duration: "4 hours",
                level: "Beginner",
                image: "investment-fundamentals",
                popular: true,
              },
              {
                title: "Agricultural Investment Masterclass",
                desc: "Deep dive into agricultural investments and sustainable farming opportunities",
                lessons: 18,
                duration: "6 hours",
                level: "Intermediate",
                image: "agricultural-investment",
              },
              {
                title: "Portfolio Diversification Strategies",
                desc: "Advanced techniques for balancing your investment portfolio",
                lessons: 10,
                duration: "3.5 hours",
                level: "Advanced",
                image: "portfolio-diversification",
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/placeholder-y2fkc.png')`,
                    }}
                  />
                  <Button size="sm" variant="default" className="absolute bottom-3 right-3 gap-1 bg-blue-600">
                    <Play className="h-4 w-4" /> Start Learning
                  </Button>
                  {course.popular && <Badge className="absolute top-3 left-3 bg-blue-600">Popular</Badge>}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{course.desc}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Learning Paths</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Beginner Investor",
                desc: "Start your investment journey with foundational knowledge and basic strategies",
                courses: 4,
                duration: "14 hours",
                progress: 0,
                icon: <BookOpen className="h-10 w-10 text-green-500" />,
              },
              {
                title: "Real Asset Specialist",
                desc: "Focus on tangible assets like agriculture, real estate, and infrastructure",
                courses: 5,
                duration: "18 hours",
                progress: 0,
                icon: <Award className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Portfolio Manager",
                desc: "Learn advanced portfolio management and diversification techniques",
                courses: 6,
                duration: "22 hours",
                progress: 0,
                icon: <Users className="h-10 w-10 text-blue-500" />,
              },
              {
                title: "Sustainable Investing",
                desc: "Discover how to align your investments with environmental and social impact",
                courses: 4,
                duration: "16 hours",
                progress: 0,
                icon: <Filter className="h-10 w-10 text-purple-500" />,
              },
            ].map((path, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">{path.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{path.desc}</p>
                      <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>{path.courses} courses</div>
                        <div>{path.duration}</div>
                      </div>
                      <Progress value={path.progress} className="h-2 mb-4" />
                      <Button>Start Learning Path</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Investment Resources</h2>
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="tools">Tools & Calculators</TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Understanding Risk Profiles in Real Asset Investments",
                    category: "Risk Management",
                    readTime: "8 min read",
                  },
                  {
                    title: "The Importance of Due Diligence in Project Selection",
                    category: "Investment Strategy",
                    readTime: "12 min read",
                  },
                  {
                    title: "Tax Implications of Investment Returns",
                    category: "Tax Planning",
                    readTime: "10 min read",
                  },
                  {
                    title: "Evaluating Agricultural Project Sustainability",
                    category: "Sustainable Investing",
                    readTime: "9 min read",
                  },
                  {
                    title: "Understanding Investment Terms and Conditions",
                    category: "Legal",
                    readTime: "15 min read",
                  },
                  {
                    title: "Maximizing Returns through Portfolio Diversification",
                    category: "Strategy",
                    readTime: "11 min read",
                  },
                ].map((article, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-2">
                        {article.category}
                      </Badge>
                      <h3 className="font-bold mb-2">{article.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <Button variant="link" className="px-0 mt-2">
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Articles</Button>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "How to Evaluate Project Risk vs. Reward",
                    duration: "18:24",
                    views: "2.4K",
                  },
                  {
                    title: "Agricultural Investment Site Visits: What to Look For",
                    duration: "22:15",
                    views: "1.8K",
                  },
                  {
                    title: "Understanding Financial Reports for Investment Projects",
                    duration: "15:42",
                    views: "3.1K",
                  },
                  {
                    title: "Expert Interview: Future of Real Asset Investments",
                    duration: "28:10",
                    views: "4.5K",
                  },
                  {
                    title: "Investment Portfolio Building Workshop",
                    duration: "45:36",
                    views: "5.2K",
                  },
                  {
                    title: "Case Study: Successful Agricultural Investment Project",
                    duration: "20:18",
                    views: "2.9K",
                  },
                ].map((video, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('/placeholder-t5j84.png')`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700">
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{video.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {video.duration}
                        </div>
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-1" />
                          {video.views} views
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Videos</Button>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Investment Return Calculator",
                    desc: "Calculate potential returns based on investment amount and project specifics",
                    icon: <Calculator className="h-10 w-10 text-blue-500" />,
                  },
                  {
                    title: "Portfolio Diversification Analyzer",
                    desc: "Analyze your current portfolio and get recommendations for diversification",
                    icon: <PieChart className="h-10 w-10 text-green-500" />,
                  },
                  {
                    title: "Risk Assessment Tool",
                    desc: "Evaluate the risk level of potential investments based on multiple factors",
                    icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
                  },
                  {
                    title: "Compound Interest Calculator",
                    desc: "Visualize how your investment can grow over time with compound returns",
                    icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
                  },
                  {
                    title: "Tax Impact Estimator",
                    desc: "Estimate the tax implications of your investment returns",
                    icon: <DollarSign className="h-10 w-10 text-red-500" />,
                  },
                  {
                    title: "Investment Comparison Tool",
                    desc: "Compare multiple investment opportunities side by side",
                    icon: <BarChart2 className="h-10 w-10 text-indigo-500" />,
                  },
                ].map((tool, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center p-4">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">{tool.icon}</div>
                        <h3 className="font-bold mb-2">{tool.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.desc}</p>
                        <Button>Launch Tool</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Call To Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our academy courses today and gain the knowledge and confidence to build your investment
            portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              View Course Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// These components are used in the page but not imported
function Calculator(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function PieChart(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}

function AlertTriangle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function TrendingUp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m23 6-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  )
}

function DollarSign(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function BarChart2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  )
}
