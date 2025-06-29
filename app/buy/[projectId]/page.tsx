import { getProjects } from "@/lib/services/project-service"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, TrendingUp, Shield, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageCurrencyDropdown } from "@/components/language-currency-dropdown"
import { notFound } from "next/navigation"
import { Input } from "@/components/ui/input"

interface PageProps {
  params: {
    projectId: string
  }
}

export default async function BuyProjectPage({ params }: PageProps) {
  const projects = await getProjects()
  const project = projects.find((p) => p.id === params.projectId)

  if (!project) {
    notFound()
  }

  const fundingProgress = Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)
  const totalTarget = project.price_per_share * project.total_shares
  const totalRaised = project.price_per_share * (project.total_shares - project.available_shares)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between bg-white dark:bg-[#0d1117]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
              C
            </div>
            <span className="font-medium">Centace</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/discover"
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Project Discovery
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-black"
            >
              Portfolio Tracking
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-black"
            >
              Returns Distribution
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="w-64 bg-gray-100 dark:bg-[#161b22] border-gray-300 dark:border-gray-700 pl-8 text-sm rounded-md"
              placeholder="Search..."
            />
          </div>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-gray-300 dark:text-gray-300 light:text-gray-700">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-white dark:bg-white light:bg-black text-black dark:text-black light:text-white hover:bg-gray-200 dark:hover:bg-gray-200 light:hover:bg-gray-800"
            >
              Sign up
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
          <LanguageCurrencyDropdown isDark={true} />
          <ThemeToggle className="text-gray-300" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : project.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{project.category}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <MapPin className="mr-2 h-4 w-4" />
                {project.location}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative h-96 rounded-xl overflow-hidden">
              {project.image_url ? (
                <img
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-2">{project.category}</div>
                    <div className="text-lg opacity-90">Investment Project</div>
                  </div>
                </div>
              )}

              {/* Funding Progress Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{fundingProgress}% Funded</span>
                    <span className="text-sm">{formatCurrency(totalRaised)} raised</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-300"
                      style={{ width: `${fundingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This {project.category.toLowerCase()} project represents an excellent investment opportunity in the{" "}
                  {project.location} region. With a proven track record and strong market fundamentals, this project
                  offers investors the chance to participate in sustainable growth while generating attractive returns.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  Our experienced team has carefully selected this project based on rigorous due diligence, market
                  analysis, and growth potential. The project is designed to deliver consistent returns while
                  contributing to local economic development and sustainable practices.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth Potential</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Strong market fundamentals with projected growth
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Risk Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive risk assessment and mitigation strategies
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Team</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Experienced professionals managing the project
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Timeline</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Clear milestones and expected completion dates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">Investment Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Share Price</span>
                  <span className="text-2xl font-bold">{formatCurrency(project.price_per_share)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Available Shares</span>
                  <span className="font-semibold">{project.available_shares.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Target</span>
                  <span className="font-semibold">{formatCurrency(totalTarget)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Amount Raised</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(totalRaised)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Funding Progress</span>
                  <span>{fundingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 rounded-full h-3 transition-all duration-300"
                    style={{ width: `${fundingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Investment Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">12.5%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Expected Return</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">24 mo</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Investment Period</div>
                </div>
              </div>

              {/* Buy Button */}
              <Link href="/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-lg transition-colors duration-200">
                  Buy Shares
                </Button>
              </Link>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                You need to login to purchase shares
              </p>
            </div>

            {/* Risk Information */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Investment Risk</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                All investments carry risk. Please read the full project documentation and consider your risk tolerance
                before investing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
