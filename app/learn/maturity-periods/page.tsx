import Link from "next/link"

export default function MaturityPeriodsPage() {
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
            <h1 className="text-3xl font-bold mb-6">Understanding Maturity Periods</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">What Are Maturity Periods?</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In the context of Centace investments, a maturity period refers to the length of time an investment
                  must be held before it reaches its full value or before the principal amount can be withdrawn without
                  penalties. Different projects have different maturity periods based on their business model, cash flow
                  projections, and investment tier.
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <h3 className="font-medium mb-3">Key Concepts</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <span className="font-medium">Investment Term</span>
                      <p className="mt-1">The total duration of the investment project from funding to completion.</p>
                    </li>
                    <li>
                      <span className="font-medium">Maturity Date</span>
                      <p className="mt-1">
                        The specific date when an investment reaches the end of its term and the principal becomes fully
                        available for withdrawal.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Distribution Schedule</span>
                      <p className="mt-1">
                        The timeline for receiving returns on your investment, which may occur before the maturity date.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Early Withdrawal</span>
                      <p className="mt-1">
                        Accessing your investment principal before the maturity date, often subject to fees or
                        penalties.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Reinvestment Options</span>
                      <p className="mt-1">
                        Opportunities to reinvest your returns or principal at maturity into new or existing projects.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Maturity Periods by Investment Tier</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Each investment tier on Centace has different typical maturity periods:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-gray-400">
                    <h3 className="font-medium mb-2">Silver Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Typical Range:</span> 3-12 months
                      </li>
                      <li>
                        <span className="font-medium">Distribution:</span> Monthly or quarterly
                      </li>
                      <li>
                        <span className="font-medium">Early Withdrawal Fee:</span> 2-5%
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Medium
                      </li>
                      <li>
                        <span className="font-medium">Notice Period:</span> 30 days
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-yellow-400">
                    <h3 className="font-medium mb-2">Gold Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Typical Range:</span> 12-24 months
                      </li>
                      <li>
                        <span className="font-medium">Distribution:</span> Quarterly
                      </li>
                      <li>
                        <span className="font-medium">Early Withdrawal Fee:</span> 5-8%
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Medium-Low
                      </li>
                      <li>
                        <span className="font-medium">Notice Period:</span> 60 days
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-blue-400">
                    <h3 className="font-medium mb-2">Diamond Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Typical Range:</span> 24-60 months
                      </li>
                      <li>
                        <span className="font-medium">Distribution:</span> Semi-annual or annual
                      </li>
                      <li>
                        <span className="font-medium">Early Withdrawal Fee:</span> 10-15%
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Low
                      </li>
                      <li>
                        <span className="font-medium">Notice Period:</span> 90 days
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Maturity Periods by Project Type</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Different types of projects have inherently different maturity periods based on their business cycles:
                </p>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Agricultural Projects</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Short-term crops (e.g., vegetables): 3-6 months</li>
                      <li>Medium-term crops (e.g., grains): 6-12 months</li>
                      <li>Long-term crops (e.g., tree fruits): 24-60 months</li>
                      <li>Returns often tied to harvest cycles</li>
                      <li>May offer seasonal distributions</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Real Estate Projects</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Rental properties: 12-60 months</li>
                      <li>Development projects: 24-48 months</li>
                      <li>Commercial properties: 36-60 months</li>
                      <li>Returns may include both rental income and capital appreciation</li>
                      <li>Often offer quarterly distributions</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Technology Startups</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Early stage: 36-60 months</li>
                      <li>Growth stage: 24-48 months</li>
                      <li>Pre-IPO: 12-36 months</li>
                      <li>Returns typically realized through exit events (acquisition, IPO)</li>
                      <li>May not offer regular distributions until exit</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Manufacturing & Production</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Equipment financing: 12-36 months</li>
                      <li>Facility expansion: 24-48 months</li>
                      <li>New product lines: 18-36 months</li>
                      <li>Returns typically based on increased production capacity</li>
                      <li>Often offer quarterly or semi-annual distributions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Managing Your Investment Timeline</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Tips for effectively managing your investments based on maturity periods:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <span className="font-medium">Diversify Maturity Dates</span>
                      <p className="mt-1">
                        Spread your investments across projects with different maturity dates to maintain regular access
                        to funds.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Plan for Liquidity Needs</span>
                      <p className="mt-1">
                        Consider your personal financial needs when selecting investment terms. Don't lock up funds you
                        might need in the short term.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Track Maturity Dates</span>
                      <p className="mt-1">
                        Use the Centace dashboard to monitor upcoming maturity dates and plan your reinvestment
                        strategy.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Set Up Automatic Reinvestment</span>
                      <p className="mt-1">
                        Consider enabling automatic reinvestment for projects that align with your investment goals.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Understand Early Withdrawal Terms</span>
                      <p className="mt-1">
                        Familiarize yourself with the early withdrawal policies for each of your investments in case of
                        unexpected financial needs.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
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
