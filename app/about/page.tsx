import Link from "next/link"

export default function AboutPage() {
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
            <h1 className="text-3xl font-bold mb-6">About Centace</h1>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Centace is dedicated to democratizing access to investment opportunities in real-world business
                  projects. We connect investors with verified businesses seeking funding across various sectors
                  including agriculture, technology, manufacturing, and real estate. Our platform enables individuals to
                  diversify their investment portfolios while supporting tangible economic growth.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Founded in 2023, Centace emerged from the recognition that many promising businesses in emerging
                  markets struggle to access capital, while individual investors lack accessible pathways to invest in
                  real-world projects. Our founders, with backgrounds in finance, technology, and economic development,
                  created Centace to bridge this gap.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Starting in Ghana and expanding across Africa, we've helped fund over 200 projects and connected
                  thousands of investors with opportunities that generate both financial returns and positive social
                  impact.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Transparency</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We provide comprehensive information about all projects, including risks, expected returns, and
                      regular updates.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Integrity</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We conduct thorough due diligence on all projects and maintain the highest ethical standards.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Accessibility</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We make investment opportunities accessible to individuals at various income levels.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Impact</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We prioritize projects that generate positive economic, social, and environmental outcomes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Our Team</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Centace is powered by a diverse team of professionals with expertise in finance, technology, business
                  development, and customer service. Our leadership team brings decades of combined experience from
                  leading financial institutions, tech companies, and development organizations.
                </p>
                <div className="mt-4 grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-3"></div>
                    <h3 className="font-medium">Kwame Adu</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CEO & Co-Founder</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-3"></div>
                    <h3 className="font-medium">Amara Osei</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CTO & Co-Founder</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-3"></div>
                    <h3 className="font-medium">David Mensah</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CFO</p>
                  </div>
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
