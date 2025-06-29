import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Briefcase, Shield, FileText, Users } from "lucide-react"

export default function SoleFundingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0 flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Sole Funding</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Exclusive investment opportunities for high-net-worth individuals and institutional investors
          </p>

          <div className="grid gap-12">
            {/* What is Sole Funding */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What is Sole Funding?</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-4">
                  Sole Funding is Centace's premium investment service designed for investors seeking to fully fund
                  individual projects. This exclusive program provides access to larger-scale investment opportunities
                  with enhanced returns, dedicated project management, and customized investment structures.
                </p>
                <p>
                  Unlike our Cloudfunding model where multiple investors participate in a single project, Sole Funding
                  allows you to be the exclusive investor in a project, giving you greater control, higher potential
                  returns, and customized terms.
                </p>
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Benefits of Sole Funding</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Exclusive Ownership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      As the sole investor, you maintain 100% ownership of the project, giving you complete control over
                      major decisions and the full benefit of all returns.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Full profit retention</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Decision-making authority</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Customized exit strategies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Enhanced Due Diligence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Sole Funding projects undergo our most rigorous vetting process, with comprehensive risk
                      assessment and enhanced security measures.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Comprehensive background checks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Third-party financial audits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Legal structure optimization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle>Customized Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Negotiate specific investment terms tailored to your financial goals, risk tolerance, and timeline
                      preferences.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Flexible payment structures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Personalized return schedules</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Custom reporting requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Dedicated Support Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Receive personalized attention from a dedicated investment manager and support team throughout the
                      entire investment lifecycle.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Personal investment manager</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Direct access to project team</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Priority customer support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Eligibility Requirements</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-6">
                  Sole Funding is available to qualified investors who meet specific eligibility criteria. This ensures
                  that participants have the financial capacity and investment experience necessary for these
                  larger-scale opportunities.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Individual Investors</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Minimum net worth of $1,000,000 (excluding primary residence)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Annual income of at least $200,000 for the past two years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Prior investment experience in similar asset classes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Minimum investment of $250,000 per project</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Institutional Investors</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Minimum assets under management of $5,000,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Established investment entity (fund, corporation, trust)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Compliance with relevant regulatory requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Minimum investment of $500,000 per project</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Process */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">The Sole Funding Process</h2>
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-8 relative">
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      1
                    </div>
                    <h3 className="font-medium text-lg mb-2">Initial Consultation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Meet with our investment team to discuss your financial goals, investment preferences, and risk
                      tolerance. We'll help identify potential projects that align with your objectives.
                    </p>
                  </div>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      2
                    </div>
                    <h3 className="font-medium text-lg mb-2">Project Selection</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Review detailed information about available projects, including business plans, financial
                      projections, risk assessments, and potential returns. Select the project that best meets your
                      investment criteria.
                    </p>
                  </div>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      3
                    </div>
                    <h3 className="font-medium text-lg mb-2">Due Diligence</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our team conducts comprehensive due diligence on your behalf, including site visits, management
                      interviews, financial audits, and legal reviews. You'll receive a detailed due diligence report
                      for your review.
                    </p>
                  </div>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      4
                    </div>
                    <h3 className="font-medium text-lg mb-2">Investment Structuring</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Work with our legal and financial experts to structure the investment according to your
                      preferences. This includes determining payment schedules, return mechanisms, governance rights,
                      and exit strategies.
                    </p>
                  </div>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      5
                    </div>
                    <h3 className="font-medium text-lg mb-2">Project Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Once the investment is finalized, our project management team oversees implementation, providing
                      regular updates and addressing any issues that arise. You'll have direct access to both your
                      investment manager and the project team.
                    </p>
                  </div>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      6
                    </div>
                    <h3 className="font-medium text-lg mb-2">Returns Distribution</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive returns according to the agreed-upon schedule. Our finance team ensures timely and
                      accurate distributions, with detailed reporting on project performance and financial outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Interested in Sole Funding?</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                  Schedule a confidential consultation with our investment team to explore exclusive opportunities and
                  learn more about our Sole Funding program.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100">Schedule Consultation</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    View Sample Projects
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
