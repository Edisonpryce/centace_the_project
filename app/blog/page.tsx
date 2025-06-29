import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-3">
                C
              </div>
              <span className="font-medium text-xl">Centace</span>
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Centace Blog</h1>

            <div className="space-y-8">
              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">
                          Understanding Investment Tiers: Silver, Gold, and Diamond
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          May 8, 2025
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Centace offers three distinct investment tiers—Silver, Gold, and Diamond—each with unique
                        benefits, risk profiles, and return potentials. This comprehensive guide explains the
                        differences between each tier and helps you determine which is right for your investment goals.
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs mr-2">
                          Investing
                        </span>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs">
                          Beginner
                        </span>
                        <Link href="#" className="ml-auto text-yellow-400 hover:text-yellow-300">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">The Rise of Agribusiness Investment in West Africa</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          April 25, 2025
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        West Africa's agricultural sector is experiencing unprecedented growth and investment interest.
                        This article explores the factors driving this trend, the most promising sub-sectors, and what
                        investors should know before adding agricultural projects to their portfolios.
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded text-xs mr-2">
                          Agriculture
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs">
                          Market Analysis
                        </span>
                        <Link href="#" className="ml-auto text-yellow-400 hover:text-yellow-300">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">Diversification Strategies for Small Investors</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          April 12, 2025
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Even with limited capital, effective diversification is possible and crucial for managing risk.
                        This guide provides practical strategies for small investors to build a diversified portfolio
                        across different sectors, project types, and risk levels on the Centace platform.
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs mr-2">
                          Investing
                        </span>
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded text-xs">
                          Strategy
                        </span>
                        <Link href="#" className="ml-auto text-yellow-400 hover:text-yellow-300">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">
                          Impact Investing: Financial Returns with Social Benefits
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          March 30, 2025
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Impact investing allows you to generate financial returns while contributing to positive social
                        and environmental outcomes. This article examines how Centace's platform enables impact
                        investing, featuring case studies of projects that have delivered both strong returns and
                        meaningful impact.
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs mr-2">
                          Impact
                        </span>
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                          Investing
                        </span>
                        <Link href="#" className="ml-auto text-yellow-400 hover:text-yellow-300">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="inline-flex">
                <button className="px-3 py-1 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117]">
                  Previous
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117]">
                  2
                </button>
                <button className="px-3 py-1 border-t border-b border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117]">
                  3
                </button>
                <button className="px-3 py-1 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117]">
                  Next
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-yellow-400 hover:text-yellow-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
