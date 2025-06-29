import Link from "next/link"

export default function ProjectFundingPage() {
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
            <h1 className="text-3xl font-bold mb-6">Project Funding Guide</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">Understanding Investment Tiers</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Centace offers three distinct investment tiers, each with its own risk profile, minimum investment
                  amount, and potential returns:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-gray-400">
                    <h3 className="font-medium mb-2">Silver Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Risk Level:</span> Low to Moderate
                      </li>
                      <li>
                        <span className="font-medium">Min Investment:</span> $100
                      </li>
                      <li>
                        <span className="font-medium">Expected Returns:</span> 5-8% annually
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Medium (3-6 months)
                      </li>
                      <li>
                        <span className="font-medium">Fee Structure:</span> Upfront/recurring fee as disclosed
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-yellow-400">
                    <h3 className="font-medium mb-2">Gold Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Risk Level:</span> Moderate
                      </li>
                      <li>
                        <span className="font-medium">Min Investment:</span> $500
                      </li>
                      <li>
                        <span className="font-medium">Expected Returns:</span> 8-12% annually
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Medium (6-12 months)
                      </li>
                      <li>
                        <span className="font-medium">Fee Structure:</span> Upfront asset structuring fee and ongoing
                        management fee
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg border-t-4 border-blue-400">
                    <h3 className="font-medium mb-2">Diamond Tier</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-medium">Risk Level:</span> Moderate to High
                      </li>
                      <li>
                        <span className="font-medium">Min Investment:</span> $2,000
                      </li>
                      <li>
                        <span className="font-medium">Expected Returns:</span> 12-20% annually
                      </li>
                      <li>
                        <span className="font-medium">Liquidity:</span> Low (12+ months)
                      </li>
                      <li>
                        <span className="font-medium">Fee Structure:</span> Management/supervisory fee (5.5% of net
                        profits)
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">How to Fund a Project</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Investing in a project on Centace is a straightforward process:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-4">
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Browse Projects</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Explore available projects in the Discovery section. Filter by sector, expected returns, or
                        investment tier to find opportunities that match your investment goals.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Review Project Details</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Carefully read the project's Disclosure Statement, which includes key information about the
                        business, financial projections, risk factors, and fee structure.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Select Investment Amount</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Choose how much you want to invest, keeping in mind the minimum investment requirement for the
                        project's tier. You can purchase multiple shares to increase your investment.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Fund Your Account</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Ensure you have sufficient funds in your Centace account. If needed, add funds using one of our
                        supported payment methods (mobile money, bank transfer, etc.).
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Confirm Investment</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Review your investment details and confirm your purchase. You'll receive a confirmation email
                        with all the relevant information.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Track Your Investment</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Monitor your investment's performance in your Portfolio dashboard. You'll receive regular
                        updates on project progress and upcoming distributions.
                      </p>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Payment Methods</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Centace supports various payment methods to make funding your account convenient:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Mobile Money</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Instant deposits</li>
                      <li>Available 24/7</li>
                      <li>Supported providers: MTN Mobile Money, Vodafone Cash, AirtelTigo Money</li>
                      <li>Processing fee: 1%</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Bank Transfer</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Processing time: 1-3 business days</li>
                      <li>No processing fee</li>
                      <li>Minimum amount: $50</li>
                      <li>Available for both local and international transfers</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Funding Security</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your investments are protected through several security measures:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <span className="font-medium">Escrow Accounts</span>
                      <p className="mt-1">
                        All funds are held in segregated escrow accounts until deployment to the project.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Project Verification</span>
                      <p className="mt-1">
                        All projects undergo rigorous due diligence before being listed on the platform.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Secure Transactions</span>
                      <p className="mt-1">
                        All financial transactions are encrypted and processed through secure payment gateways.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Regulatory Compliance</span>
                      <p className="mt-1">
                        Centace operates in compliance with relevant financial regulations and maintains appropriate
                        licenses.
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
