import Link from "next/link"

export default function AnnouncementsPage() {
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
            <h1 className="text-3xl font-bold mb-6">Announcements</h1>

            <div className="space-y-8">
              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">Centace Expands to East Africa</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">May 10, 2025</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We're excited to announce our expansion into East Africa, with new offices opening in Nairobi, Kenya
                    and Dar es Salaam, Tanzania. This expansion will allow us to connect with more businesses seeking
                    funding and provide our investors with a wider range of investment opportunities across diverse
                    markets.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our East African operations will focus initially on agricultural projects, renewable energy
                    initiatives, and technology startups. We've already identified several promising projects that will
                    be available for investment in the coming weeks.
                  </p>
                </div>
              </section>

              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">New Diamond Tier Investment Options</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">April 22, 2025</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    In response to investor demand, we're introducing enhanced options for our Diamond Tier investments.
                    The new Diamond+ category will offer exclusive access to high-potential projects with expected
                    returns of 18-25% annually, along with quarterly distribution options and priority access to project
                    visits.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Diamond+ will be available to existing Diamond Tier investors starting May 1, and to all qualified
                    investors from June 15. Stay tuned for more details on the first wave of Diamond+ projects.
                  </p>
                </div>
              </section>

              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">Q1 2025 Performance Results</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">April 15, 2025</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We're pleased to report strong performance across our investment portfolio for Q1 2025. Overall, our
                    projects delivered an average return of 14.3%, exceeding projections by 2.1 percentage points.
                    Agricultural projects led the way with 16.7% returns, followed by technology at 15.2% and
                    manufacturing at 13.8%.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    All investors should have received their detailed quarterly statements. If you haven't received
                    yours, please contact our investor relations team at investors@centace.com.
                  </p>
                </div>
              </section>

              <section>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">Mobile App Launch</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">March 28, 2025</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We're thrilled to announce the launch of our mobile app for iOS and Android devices. The app
                    provides a streamlined way to browse investment opportunities, manage your portfolio, and receive
                    real-time updates on your investments.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Key features include biometric authentication, push notifications for important updates, offline
                    access to your portfolio data, and a simplified investment process. Download the app today from the
                    App Store or Google Play Store.
                  </p>
                </div>
              </section>

              <section>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">New Strategic Partnership with AgriTech Ghana</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">March 5, 2025</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Centace has formed a strategic partnership with AgriTech Ghana, a leading agricultural technology
                    company. This partnership will bring exclusive investment opportunities in tech-enabled farming
                    projects that combine traditional agriculture with innovative technologies for improved yields and
                    sustainability.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    The first wave of AgriTech projects will focus on precision farming, vertical farming, and
                    climate-resilient crop varieties. These projects are expected to be available for investment by
                    mid-April.
                  </p>
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
