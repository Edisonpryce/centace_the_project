import Link from "next/link"

export default function VisitInvestmentSitePage() {
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
            <h1 className="text-3xl font-bold mb-6">Visit Investment Site Guide</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">About Site Visits</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  At Centace, we believe in transparency and providing investors with firsthand experience of their
                  investments. Our site visit program allows you to see your investment projects in person, meet the
                  teams behind them, and gain deeper insights into the operations.
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <h3 className="font-medium mb-3">Benefits of Site Visits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <span className="font-medium">Direct Verification</span>
                      <p className="mt-1">
                        See the physical assets and operations of your investment projects firsthand.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Meet the Team</span>
                      <p className="mt-1">
                        Interact with project managers and team members to understand their expertise and vision.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Deeper Understanding</span>
                      <p className="mt-1">
                        Gain insights into the day-to-day operations, challenges, and opportunities of your investments.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Networking</span>
                      <p className="mt-1">
                        Connect with other investors and industry professionals during organized site visits.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Confidence Building</span>
                      <p className="mt-1">
                        Build trust and confidence in your investment decisions through direct observation.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">How to Schedule a Site Visit</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Scheduling a visit to your investment site is simple and can be done through your dashboard:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-4">
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Navigate to Dashboard</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Log in to your Centace account and go to your dashboard.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Select "Visit" Tab</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Click on the "Visit" tab in the main navigation menu.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Choose a Project</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Select the project site you wish to visit from your investment portfolio.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">View Available Dates</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Browse the calendar to see available visit dates for your selected project.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Book Your Visit</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Select your preferred date and time slot, then confirm your booking.
                      </p>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Receive Confirmation</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        You'll receive a confirmation email with details about your visit, including location, contact
                        information, and any special instructions.
                      </p>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Types of Site Visits</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Centace offers different types of site visits to accommodate various investor needs:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Individual Visits</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Personalized tour of your specific investment projects</li>
                      <li>One-on-one meetings with project managers</li>
                      <li>Flexible scheduling based on your availability</li>
                      <li>Available for Diamond and Gold tier investors</li>
                      <li>Duration: 2-3 hours per project</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Group Visits</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Scheduled tours with other investors</li>
                      <li>Comprehensive overview of project operations</li>
                      <li>Networking opportunities with fellow investors</li>
                      <li>Available for all investment tiers</li>
                      <li>Duration: 4-6 hours (multiple projects)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Preparing for Your Visit</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To make the most of your investment site visit, consider these preparation tips:
                </p>
                <div className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <span className="font-medium">Review Project Details</span>
                      <p className="mt-1">
                        Familiarize yourself with the project's business model, progress reports, and key metrics before
                        your visit.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Prepare Questions</span>
                      <p className="mt-1">
                        Make a list of questions you'd like to ask the project team during your visit.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Dress Appropriately</span>
                      <p className="mt-1">
                        Wear comfortable clothing and appropriate footwear for the specific site (e.g., closed-toe shoes
                        for agricultural or construction sites).
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Bring Identification</span>
                      <p className="mt-1">
                        Have your government-issued ID and Centace investor card ready for verification.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Consider Transportation</span>
                      <p className="mt-1">
                        Plan your transportation to and from the site in advance. Some projects offer shuttle services
                        from designated meeting points.
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
