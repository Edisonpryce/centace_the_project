import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Phone, Video, Mail, Clock, Users, HelpCircle, Send, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ChatSupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">24/7 Chat Support</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">
            Get immediate assistance with your investment platform questions and concerns
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Support Options */}
          <div className="col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
                <CardDescription>Choose your preferred support method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Video className="h-4 w-4" />
                    Video Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-3">Support Hours</h3>
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Chat & Email: 24/7</p>
                      <p>Phone: Mon-Fri, 8am-8pm</p>
                      <p>Video: By appointment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Chat Interface */}
          <div className="col-span-1 lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/support-agent.png" alt="Support Agent" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Investment Support</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700"
                        >
                          Online
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Typically replies in 2 minutes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <div className="px-4 pt-2 border-b border-gray-200 dark:border-gray-800">
                  <TabsList className="w-full justify-start h-10 bg-transparent">
                    <TabsTrigger
                      value="chat"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-10"
                    >
                      Live Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-10"
                    >
                      FAQ
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {/* Chat messages */}
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/support-agent.png" alt="Support Agent" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          Hello! Welcome to Centace Investment Support. How can I assist you today with your investment
                          needs?
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">10:32 AM</span>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          I'm interested in agricultural investments. Can you tell me more about the available projects?
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">10:33 AM</span>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/abstract-geometric-shapes.png" alt="You" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/support-agent.png" alt="Support Agent" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          Of course! We currently have several agricultural investment opportunities available. These
                          include sustainable farming projects in various regions, with different investment minimums
                          and expected returns.
                        </p>
                        <p className="text-sm mt-2">
                          Would you like me to recommend specific projects based on your investment goals, or would you
                          prefer to browse all available agricultural projects?
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">10:35 AM</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button size="icon" className="rounded-full">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Our support agents are real people. Please be respectful in your communications.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="flex-1 p-4 overflow-y-auto m-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        How do I start investing on Centace?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        To start investing, create an account, complete the verification process, and fund your account.
                        Then browse available projects and select the ones that match your investment goals.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        What is the minimum investment amount?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        Minimum investment amounts vary by project. Some projects start as low as $50, while others may
                        require $1,000 or more. Each project page clearly displays the minimum investment amount.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        How are returns distributed?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        Return distribution methods and schedules vary by project. Some projects provide quarterly
                        distributions, while others distribute returns at project completion or at specific milestones.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        How do I track my investments?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        You can track all your investments through your personalized dashboard. The dashboard provides
                        real-time updates on project progress, financial performance, and upcoming distributions.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        What happens if a project doesn't meet its funding goal?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        If a project doesn't reach its funding goal within the specified timeframe, your investment
                        amount will be returned to your account balance in full, with no fees deducted.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        How is my investment secured?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                        Each project undergoes rigorous due diligence. Many projects are backed by real assets, and we
                        implement legal structures to protect investor interests. Specific security measures are
                        detailed on each project page.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Additional Support Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Dedicated Account Managers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Investors with portfolios exceeding $50,000 receive personalized support from a dedicated account
                manager who can provide tailored investment advice and priority assistance.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                Community Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Join our investor community forum to connect with other investors, share experiences, and get
                peer-to-peer support for common questions about projects and investment strategies.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Visit Community
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-amber-500" />
                Self-Service Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Access our comprehensive knowledge base, video tutorials, and step-by-step guides to find answers to
                common questions and learn how to make the most of the Centace platform.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
