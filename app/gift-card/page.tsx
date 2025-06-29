import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, CreditCard, Share2, HelpCircle, DollarSign, ChevronRight } from "lucide-react"

export default function GiftCardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Investment Gift Cards</h1>
              <p className="text-xl mb-6">Share the gift of investing with friends and family</p>
              <p className="mb-8">
                Centace Gift Cards allow you to introduce others to real-world investment opportunities. Give the gift
                that keeps growing and help someone start their investment journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Buy a Gift Card
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-600/10">
                  Redeem Card
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-44 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 rounded-xl shadow-lg p-6 transform rotate-6">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-2xl font-bold">Centace Gift</div>
                    <Gift className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold">$100</div>
                  <div className="mt-2 text-sm opacity-80">GIFT-XXXX-XXXX-XXXX</div>
                </div>
                <div className="w-72 h-44 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 rounded-xl shadow-lg p-6 absolute top-4 -left-4 transform -rotate-3">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-2xl font-bold">Centace Gift</div>
                    <Gift className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold">$50</div>
                  <div className="mt-2 text-sm opacity-80">GIFT-XXXX-XXXX-XXXX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Purchase a Gift Card</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a gift card amount, personalize it with a message, and complete your purchase.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <Share2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. Share the Gift</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Send the gift card electronically or print it for physical gifting. Include the unique redemption
                    code.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Recipient Invests</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The recipient redeems the card and uses the funds to start investing in real-world projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Purchase Section */}
        <section className="mb-16">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-8">Purchase a Gift Card</h2>
            <Tabs defaultValue="digital" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="digital">Digital Gift Card</TabsTrigger>
                <TabsTrigger value="physical">Physical Gift Card</TabsTrigger>
              </TabsList>

              <TabsContent value="digital" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Card Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Select Amount</label>
                        <Select defaultValue="100">
                          <SelectTrigger>
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">$25</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="250">$250</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="custom">Custom Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Design</label>
                        <Select defaultValue="blue">
                          <SelectTrigger>
                            <SelectValue placeholder="Select design" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue Gradient</SelectItem>
                            <SelectItem value="purple">Purple Dreams</SelectItem>
                            <SelectItem value="green">Green Growth</SelectItem>
                            <SelectItem value="gold">Gold Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Recipient Email</label>
                        <Input type="email" placeholder="friend@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Delivery Date</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Personal Message (Optional)</label>
                        <Input as="textarea" placeholder="Add a personal message..." className="h-24" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl shadow mb-4 p-6 text-white">
                        <div className="flex justify-between">
                          <div className="text-xl font-bold">Centace Gift</div>
                          <Gift className="h-6 w-6" />
                        </div>
                        <div className="mt-8 text-3xl font-bold">$100</div>
                        <div className="mt-2 text-sm opacity-80">To: Recipient Name</div>
                        <div className="mt-6 text-sm">From: Your Name</div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                          "Happy Birthday! Here's to starting your investment journey. - Your Name"
                        </p>
                      </div>
                      <Button className="w-full">Purchase Gift Card</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="physical" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Card Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Select Amount</label>
                        <Select defaultValue="100">
                          <SelectTrigger>
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">$25</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="250">$250</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="custom">Custom Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Design</label>
                        <Select defaultValue="blue">
                          <SelectTrigger>
                            <SelectValue placeholder="Select design" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue Gradient</SelectItem>
                            <SelectItem value="purple">Purple Dreams</SelectItem>
                            <SelectItem value="green">Green Growth</SelectItem>
                            <SelectItem value="gold">Gold Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Shipping Address</label>
                        <Input placeholder="Recipient's Name" className="mb-2" />
                        <Input placeholder="Address Line 1" className="mb-2" />
                        <Input placeholder="Address Line 2 (Optional)" className="mb-2" />
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input placeholder="City" />
                          <Input placeholder="State/Province" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Postal Code" />
                          <Select defaultValue="us">
                            <SelectTrigger>
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Personal Message (Optional)</label>
                        <Input as="textarea" placeholder="Add a personal message..." className="h-24" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl shadow mb-4 p-6 text-white">
                        <div className="flex justify-between">
                          <div className="text-xl font-bold">Centace Gift</div>
                          <Gift className="h-6 w-6" />
                        </div>
                        <div className="mt-8 text-3xl font-bold">$100</div>
                        <div className="mt-2 text-sm opacity-80">Physical Gift Card</div>
                        <div className="mt-6 text-sm">Will be shipped to recipient's address</div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Delivery Details:</div>
                        <p className="text-gray-800 dark:text-gray-200">
                          Estimated shipping: 3-5 business days
                          <br />
                          Includes gift envelope and redemption instructions
                        </p>
                      </div>
                      <Button className="w-full">Purchase Gift Card</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">How do gift cards work?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Centace Gift Cards contain a monetary value that can be applied toward investments on our
                      platform. Recipients can redeem the card and use the funds to invest in projects of their choice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Do gift cards expire?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No, Centace Gift Cards do not expire. The recipient can redeem the gift card at any time and start
                      investing when they're ready.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Can I add a personalized message?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes, you can add a personalized message to both digital and physical gift cards. This message will
                      be displayed when the recipient views or opens their gift.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">How does the recipient redeem the gift card?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      The recipient can visit our redemption page, enter the unique code provided with the gift card,
                      and the funds will be added to their account balance for investment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="gap-2">
              View All FAQs
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
