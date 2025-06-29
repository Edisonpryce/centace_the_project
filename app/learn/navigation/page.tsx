import Link from "next/link"

export default function NavigationPage() {
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
            <h1 className="text-3xl font-bold mb-6">Platform Navigation Guide</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">Dashboard Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Centace dashboard is your central hub for managing investments, tracking performance, and
                  discovering new opportunities. Here's how to navigate it effectively:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Main Navigation</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Dashboard - Your investment overview</li>
                      <li>Discover - Browse available projects</li>
                      <li>Portfolio - Track your investments</li>
                      <li>Funding - Manage your account balance</li>
                      <li>Settings - Configure your preferences</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Quick Actions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Invest Now - Start a new investment</li>
                      <li>Add Funds - Deposit money to your account</li>
                      <li>Withdraw - Transfer returns to your bank</li>
                      <li>Notifications - Check platform updates</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Project Discovery</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Finding the right investment opportunities is easy with our intuitive discovery tools:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Filtering & Sorting</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Narrow down projects based on your preferences:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Filter by sector (Agriculture, Technology, Real Estate, etc.)</li>
                    <li>Sort by expected returns</li>
                    <li>Filter by investment tier (Silver, Gold, Diamond)</li>
                    <li>Sort by funding progress</li>
                    <li>Filter by location</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Portfolio Management</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Keep track of your investments and monitor their performance:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Portfolio Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Investment Summary - Overview of all your investments</li>
                    <li>Performance Metrics - Track ROI and growth</li>
                    <li>Project Updates - Receive notifications about your investments</li>
                    <li>Distribution Schedule - View upcoming returns</li>
                    <li>Historical Data - Analyze past performance</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Customize your experience and manage your account details:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Available Settings</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Profile Information - Update your personal details</li>
                    <li>Payment Methods - Manage your funding sources</li>
                    <li>Notification Preferences - Control how you receive updates</li>
                    <li>Security Settings - Protect your account</li>
                    <li>Language & Currency - Customize your display preferences</li>
                    <li>Theme Settings - Toggle between light and dark mode</li>
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
