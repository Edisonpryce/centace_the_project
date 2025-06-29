import Link from "next/link"

export default function CareersPage() {
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
            <h1 className="text-3xl font-bold mb-6">Careers at Centace</h1>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Join Our Team</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  At Centace, we're building the future of investment in real-world projects. We're looking for
                  passionate, innovative individuals who share our vision of democratizing access to investment
                  opportunities and supporting economic growth across Africa and beyond.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Why Work With Us</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Meaningful Impact</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Your work directly contributes to economic development and helps businesses and investors thrive.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Growth Opportunities</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We invest in our team's professional development and provide clear paths for advancement.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Innovative Environment</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We embrace new ideas and technologies to solve complex challenges in the investment space.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Inclusive Culture</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We value diversity and create an environment where everyone can contribute and thrive.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Open Positions</h2>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium">Investment Analyst</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Accra, Ghana • Full-time</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Evaluate potential investment projects, conduct due diligence, and prepare investment
                      recommendations.
                    </p>
                    <button className="text-sm text-yellow-400 hover:text-yellow-300">View Details</button>
                  </div>

                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium">Frontend Developer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Remote • Full-time</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Build and maintain user interfaces for our investment platform using React, Next.js, and Tailwind
                      CSS.
                    </p>
                    <button className="text-sm text-yellow-400 hover:text-yellow-300">View Details</button>
                  </div>

                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium">Business Development Manager</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Lagos, Nigeria • Full-time</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Identify and develop relationships with businesses seeking funding and expand our project
                      portfolio.
                    </p>
                    <button className="text-sm text-yellow-400 hover:text-yellow-300">View Details</button>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Application Process</h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Submit your application through our careers portal</li>
                  <li>Initial screening and review by our HR team</li>
                  <li>Technical or role-specific assessment</li>
                  <li>Interview with the hiring manager and team members</li>
                  <li>Final interview with leadership</li>
                  <li>Offer and onboarding</li>
                </ol>
              </section>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-yellow-700 dark:text-yellow-400">
                  Don't see a position that fits?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  We're always looking for talented individuals. Send your resume to careers@centace.com with a note
                  about how you can contribute to our mission.
                </p>
              </div>
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
