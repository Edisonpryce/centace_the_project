import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Users, TrendingUp, Clock } from "lucide-react"

export default function CloudfundingPage() {
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
          <h1 className="text-4xl font-bold mb-6">Cloudfunding</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Centace's innovative approach to collective investment in real-world projects
          </p>

          <div className="grid gap-12">
            {/* What is Cloudfunding */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What is Cloudfunding?</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-4">
                  Cloudfunding is Centace's proprietary investment model that combines the best aspects of crowdfunding
                  and traditional investment. It allows multiple investors to pool resources and invest in carefully
                  vetted real-world projects across various sectors.
                </p>
                <p>
                  Unlike traditional crowdfunding platforms, Cloudfunding provides investors with structured investment
                  opportunities, professional due diligence, and ongoing project management to maximize returns and
                  minimize risks.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">How Cloudfunding Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Pool Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Multiple investors contribute capital to a single project, reducing individual investment
                      requirements while maintaining significant potential returns.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Track Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monitor your investments in real-time through our dashboard. Receive regular updates on project
                      milestones, financial performance, and projected returns.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle>Receive Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Earn returns based on project performance. Distributions are made according to each project's
                      timeline and structure, with complete transparency.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Benefits of Cloudfunding</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Lower Minimum Investment</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Access high-quality investment opportunities with lower capital requirements than traditional
                        investment vehicles.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Diversification</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Spread your investment across multiple projects in different sectors to reduce risk and optimize
                        returns.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Professional Management</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Benefit from our team's expertise in project selection, due diligence, and ongoing management.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Transparency</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Access detailed information about each project, including business plans, financial projections,
                        and risk assessments.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Real-World Impact</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Support tangible projects that create jobs, develop infrastructure, and contribute to economic
                        growth.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Project Types */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Cloudfunding Project Categories</h2>
              <Tabs defaultValue="agriculture">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
                  <TabsTrigger value="technology">Technology</TabsTrigger>
                  <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                  <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                </TabsList>
                <TabsContent value="agriculture" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Agricultural Projects</h3>
                  <p className="mb-4">
                    Invest in sustainable farming operations, agricultural processing facilities, and food production
                    ventures. These projects typically offer seasonal returns aligned with harvest cycles.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average ROI: 12-18% annually | Typical Duration: 2-5 years
                  </p>
                </TabsContent>
                <TabsContent value="technology" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Technology Ventures</h3>
                  <p className="mb-4">
                    Support innovative technology companies developing solutions in fintech, agritech, healthtech, and
                    sustainable energy. These investments offer higher potential returns with corresponding risk
                    profiles.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average ROI: 18-25% annually | Typical Duration: 3-7 years
                  </p>
                </TabsContent>
                <TabsContent value="real-estate" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Real Estate Development</h3>
                  <p className="mb-4">
                    Invest in commercial and residential real estate projects, including affordable housing, mixed-use
                    developments, and commercial properties. These projects offer stable returns with asset-backed
                    security.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average ROI: 10-15% annually | Typical Duration: 3-10 years
                  </p>
                </TabsContent>
                <TabsContent value="manufacturing" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Manufacturing & Production</h3>
                  <p className="mb-4">
                    Support manufacturing facilities, production lines, and industrial operations across various
                    sectors. These projects typically generate returns through operational revenue and potential asset
                    appreciation.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average ROI: 14-20% annually | Typical Duration: 4-8 years
                  </p>
                </TabsContent>
              </Tabs>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Cloudfunding?</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                  Join thousands of investors who are already diversifying their portfolios with real-world projects
                  through Centace's Cloudfunding platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Browse Projects</Button>
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
