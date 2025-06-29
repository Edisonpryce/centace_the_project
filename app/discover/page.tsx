import { getProjects } from "@/lib/services/project-service"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ArrowUpRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageCurrencyDropdown } from "@/components/language-currency-dropdown"

export default async function DiscoverPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0d1117] sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation - Left side */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
                  C
                </div>
                <span className="font-medium">Centace</span>
              </Link>
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
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Portfolio Tracking
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Returns Distribution
              </Link>
            </nav>
          </div>

          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="w-64 bg-gray-100 dark:bg-[#161b22] border-gray-300 dark:border-gray-700 pl-8 text-sm rounded-md"
                placeholder="Search..."
              />
            </div>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Sign up
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            <LanguageCurrencyDropdown isDark={false} />
            <ThemeToggle className="text-gray-700 dark:text-gray-300" />
          </div>

          {/* Mobile Hamburger Menu - Only visible on mobile */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Investment Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our curated selection of investment opportunities across various sectors
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-xl font-bold mb-1">{project.category || "Investment Project"}</div>
                      <div className="text-sm opacity-90">Investment Project</div>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : project.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                {/* Funding Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white text-sm font-medium mb-1">
                    {Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}%
                    Funded
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{
                        width: `${Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                {/* Project Title & Location */}
                <div className="mb-4">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {project.location} • {project.category}
                  </p>
                </div>

                {/* Financial Information */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Share Price</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(project.price_per_share)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Available</p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {project.available_shares.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Target Amount */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Target Amount</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(project.price_per_share * project.total_shares)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/buy/${project.id}`} className="block">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                    View Project Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-700 p-8 rounded-xl text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ready to start investing?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Create an account to access detailed project information, invest in opportunities, and track your portfolio
            performance.
          </p>
          <Link href="/signup">
            <Button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-medium">
              Sign up now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
