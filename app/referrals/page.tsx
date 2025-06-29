import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Users, Gift, Coins, ArrowRight } from "lucide-react"

export default function ReferralsPage() {
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
          <h1 className="text-4xl font-bold mb-6">Referral Program</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Earn rewards by referring investors and project owners to the Centace platform
          </p>

          <div className="grid gap-12">
            {/* Program Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Referral Program Overview</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <p className="mb-4">
                  The Centace Referral Program rewards you for introducing new investors and project owners to our
                  platform. Whether you're an existing investor, a business partner, or simply someone who believes in
                  our mission, you can earn significant rewards for helping us grow our community.
                </p>
                <p>
                  Our two-sided referral program offers benefits for both referring existing users and the new users
                  they bring to the platform. It's our way of thanking you for helping us connect more investors with
                  promising real-world projects.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">How Our Referral Program Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">1</div>
                    </div>
                    <CardTitle>Sign Up & Share</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Register for our referral program and receive your unique referral link. Share this link with
                      potential investors and project owners through email, social media, or direct messaging.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
                      <strong>Tip:</strong> Personalize your outreach by explaining why you think Centace would be
                      valuable for the specific person you're referring.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    </div>
                    <CardTitle>They Join & Invest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      When someone uses your referral link to sign up and completes the verification process, they're
                      connected to your account. Once they make their first investment or list their first project, both
                      of you qualify for rewards.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
                      <strong>Note:</strong> The referred user must complete verification and make an investment or list
                      a project within 90 days of registration.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    </div>
                    <CardTitle>Earn Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Receive your rewards based on the type of referral and the activity of your referred users. Track
                      all your referrals and earnings through your personalized referral dashboard.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
                      <strong>Bonus:</strong> Unlock additional rewards and higher commission rates as you reach
                      referral milestones!
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Reward Structure */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Reward Structure</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-medium">Investor Referrals</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Cash Bonus</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Receive $50 for each new investor who invests at least $1,000 within 90 days of
                            registration.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Commission</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Earn 1% of your referred investors' investments for their first year on the platform (up to
                            $1,000 per referral).
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Investment Credit</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Receive a $100 investment credit that can be applied to your next investment after 5
                            successful investor referrals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                        <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="text-xl font-medium">Project Owner Referrals</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Flat Bonus</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Earn $200 for each project owner who successfully lists a project that gets funded on our
                            platform.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Success Fee Share</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Receive 10% of Centace's success fee for the first project funded by your referred project
                            owner.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Priority Investment Access</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Get early access to invest in projects from your referred project owners before they're
                            available to the general platform.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-3">Referral Tiers & Bonuses</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 px-3">Tier</th>
                          <th className="text-left py-2 px-3">Referrals</th>
                          <th className="text-left py-2 px-3">Investor Bonus</th>
                          <th className="text-left py-2 px-3">Project Owner Bonus</th>
                          <th className="text-left py-2 px-3">Additional Perks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 px-3">Bronze</td>
                          <td className="py-2 px-3">1-5</td>
                          <td className="py-2 px-3">$50 + 1%</td>
                          <td className="py-2 px-3">$200 + 10%</td>
                          <td className="py-2 px-3">Basic referral dashboard</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 px-3">Silver</td>
                          <td className="py-2 px-3">6-15</td>
                          <td className="py-2 px-3">$75 + 1.25%</td>
                          <td className="py-2 px-3">$250 + 12.5%</td>
                          <td className="py-2 px-3">$100 investment credit</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 px-3">Gold</td>
                          <td className="py-2 px-3">16-30</td>
                          <td className="py-2 px-3">$100 + 1.5%</td>
                          <td className="py-2 px-3">$300 + 15%</td>
                          <td className="py-2 px-3">VIP customer support</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">Platinum</td>
                          <td className="py-2 px-3">31+</td>
                          <td className="py-2 px-3">$150 + 2%</td>
                          <td className="py-2 px-3">$400 + 20%</td>
                          <td className="py-2 px-3">Exclusive investment opportunities</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Referral Benefits */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Benefits for Referred Users</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                      <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>For New Investors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Waived Platform Fee</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Platform fee waived for your first investment (up to $50 value).
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Investment Bonus</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Receive a $50 bonus when you make your first investment of $1,000 or more.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Priority Support</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Get priority customer support for your first 30 days on the platform.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>For New Project Owners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Reduced Success Fee</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            20% discount on our standard success fee for your first funded project.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Free Business Plan Review</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Complimentary review of your business plan by our expert team (valued at $500).
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Featured Placement</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Your first project will receive featured placement on our platform for 7 days.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Rules & Eligibility */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Program Rules & Eligibility</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      You must have a registered and verified Centace account to participate in the referral program.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Referred users must sign up using your unique referral link and complete the verification process.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Investor referral rewards are paid only when the referred investor makes an investment of at least
                      $1,000 within 90 days of registration.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Project owner referral rewards are paid only when the referred project owner successfully lists a
                      project that receives funding.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      You cannot refer yourself or create multiple accounts to participate in the referral program.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Centace reserves the right to modify, suspend, or terminate the referral program at any time.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Referral rewards are subject to applicable taxes and regulations in your jurisdiction.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Employees of Centace and their immediate family members are not eligible to participate in the
                      referral program.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Start Earning Rewards Today!</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                  Join our referral program and start earning rewards for helping us grow the Centace community. It's
                  easy to get started and there's no limit to how much you can earn!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-orange-600 hover:bg-gray-100">Join Referral Program</Button>
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
