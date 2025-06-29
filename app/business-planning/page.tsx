import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Target, FileText, Lightbulb, BarChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BusinessPlanningPage() {
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
          <h1 className="text-4xl font-bold mb-6">Business Planning Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Comprehensive business planning and advisory services for project owners and entrepreneurs
          </p>

          <div className="grid gap-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Business Planning Overview</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-4">
                  Centace's Business Planning services provide comprehensive support to entrepreneurs, project owners,
                  and businesses seeking funding through our platform. Our team of experienced business advisors,
                  financial analysts, and industry experts work closely with you to develop robust business plans,
                  financial projections, and funding strategies.
                </p>
                <p>
                  Whether you're launching a new venture, expanding an existing business, or seeking investment for a
                  specific project, our tailored business planning services help you articulate your vision, validate
                  your business model, and present your opportunity in the most compelling way to potential investors.
                </p>
              </div>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Our Business Planning Services</h2>
              <Tabs defaultValue="business-plan">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="business-plan">Business Plan Development</TabsTrigger>
                  <TabsTrigger value="financial">Financial Modeling</TabsTrigger>
                  <TabsTrigger value="investment">Investment Readiness</TabsTrigger>
                </TabsList>

                <TabsContent value="business-plan" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Comprehensive Business Plan Development</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Our team works with you to create a detailed business plan that articulates your vision,
                        strategy, and execution plan. We focus on creating documents that are both compelling to
                        investors and practical as operational roadmaps.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Key Components:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Executive Summary</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Company Description</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Market Analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Organization & Management</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Service or Product Line</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Additional Elements:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Marketing & Sales Strategy</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Funding Request</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Financial Projections</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Appendix with Supporting Documents</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Risk Assessment & Mitigation</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Financial Modeling & Projections</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Our financial experts develop detailed financial models and projections that demonstrate the
                        viability and potential returns of your business or project. We create realistic, defensible
                        financial forecasts that stand up to investor scrutiny.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Financial Deliverables:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>5-Year Financial Projections</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Cash Flow Statements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Income Statements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Balance Sheets</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Break-Even Analysis</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Financial Analysis:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>ROI & IRR Calculations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Sensitivity Analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Scenario Planning</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Valuation Models</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Funding Requirements Analysis</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="investment" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Investment Readiness & Pitch Preparation</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        We prepare you for the investment process by developing compelling pitch materials, coaching you
                        on presentation skills, and ensuring you're ready to address investor questions and concerns
                        effectively.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Pitch Materials:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Investor Pitch Deck</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Executive Summary</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>One-Page Investment Teaser</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Video Pitch (Optional)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Due Diligence Documentation</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Preparation Services:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Pitch Coaching Sessions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Q&A Preparation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Negotiation Strategy</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Term Sheet Review</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>Investor Matching</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Our Business Planning Process</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">1</div>
                    </div>
                    <CardTitle>Discovery & Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We begin with a thorough assessment of your business concept, market opportunity, competitive
                      landscape, and existing operations (if applicable).
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Initial consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Market research</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Competitive analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>SWOT assessment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    </div>
                    <CardTitle>Strategy & Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Based on our analysis, we develop a comprehensive business strategy and detailed implementation
                      plan tailored to your specific goals and market conditions.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Business model refinement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Go-to-market strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Operational planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Risk mitigation planning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    </div>
                    <CardTitle>Documentation & Preparation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We create all necessary documents and materials to support your business plan and prepare you for
                      investor presentations and due diligence.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Business plan development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Financial model creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Pitch materials preparation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Due diligence documentation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Industries */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Industries We Serve</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-6">
                  Our business planning experts have experience across a wide range of industries, with particular
                  expertise in the following sectors:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Agriculture & Agribusiness</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Technology & Digital Economy</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Manufacturing & Production</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Real Estate & Construction</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Renewable Energy</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Healthcare & Biotechnology</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Transportation & Logistics</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Education & Training</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>Hospitality & Tourism</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Develop Your Business Plan?</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                  Contact our business planning team today to schedule a consultation and learn how we can help you
                  develop a compelling business plan and secure the funding you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-teal-600 hover:bg-gray-100">Schedule Consultation</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
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
