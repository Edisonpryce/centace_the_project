import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, ThumbsUp, Star, Send, FileText, BarChart, Lightbulb } from "lucide-react"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Product Feedback & Suggestions</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">
            Help us improve the Centace investment platform by sharing your thoughts and ideas
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Feedback Info */}
          <div className="col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Why Your Feedback Matters</CardTitle>
                <CardDescription>Your insights help us build a better investment platform for everyone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Shape Our Roadmap</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your suggestions directly influence our product development priorities
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Improve User Experience</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us identify pain points and enhance the platform's usability
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Suggest New Features</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Share innovative ideas that could benefit the entire investor community
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">What happens to your feedback?</h3>
                  <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Our product team reviews all submissions</li>
                    <li>Feedback is categorized and prioritized</li>
                    <li>Selected ideas enter our development pipeline</li>
                    <li>You may be contacted for more details</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Feedback Forms */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="general">General Feedback</TabsTrigger>
                <TabsTrigger value="feature">Feature Request</TabsTrigger>
                <TabsTrigger value="bug">Report an Issue</TabsTrigger>
                <TabsTrigger value="survey">Quick Survey</TabsTrigger>
              </TabsList>

              {/* General Feedback Form */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Thoughts</CardTitle>
                    <CardDescription>
                      Tell us about your experience with the Centace investment platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="feedback-type">Feedback Type</Label>
                      <Select defaultValue="general">
                        <SelectTrigger>
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Comments</SelectItem>
                          <SelectItem value="usability">Usability Feedback</SelectItem>
                          <SelectItem value="performance">Performance Issues</SelectItem>
                          <SelectItem value="design">Design Feedback</SelectItem>
                          <SelectItem value="content">Content Suggestions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rating">Overall Experience</Label>
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="text-gray-400 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none"
                            aria-label={`Rate ${rating} stars`}
                          >
                            <Star className="h-6 w-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="feedback">Your Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Please share your thoughts, suggestions, or concerns about our platform..."
                        className="min-h-32"
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="contact-consent" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="contact-consent"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          You can contact me about this feedback
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          We may reach out for clarification or to discuss your feedback in more detail.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Feedback</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Feature Request Form */}
              <TabsContent value="feature">
                <Card>
                  <CardHeader>
                    <CardTitle>Request a New Feature</CardTitle>
                    <CardDescription>
                      Suggest new capabilities that would enhance your investment experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="feature-title">Feature Title</Label>
                      <Input id="feature-title" placeholder="A brief title for your feature idea" />
                    </div>
                    <div>
                      <Label htmlFor="feature-category">Feature Category</Label>
                      <Select defaultValue="portfolio">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio">Portfolio Management</SelectItem>
                          <SelectItem value="discovery">Project Discovery</SelectItem>
                          <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                          <SelectItem value="communication">Communication Tools</SelectItem>
                          <SelectItem value="payments">Payments & Transactions</SelectItem>
                          <SelectItem value="mobile">Mobile Experience</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="feature-description">Feature Description</Label>
                      <Textarea
                        id="feature-description"
                        placeholder="Describe the feature in detail. What problem does it solve? How would it work?"
                        className="min-h-32"
                      />
                    </div>
                    <div>
                      <Label htmlFor="feature-benefit">How would this benefit investors?</Label>
                      <Textarea
                        id="feature-benefit"
                        placeholder="Explain how this feature would improve the investment experience..."
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Feature Priority</Label>
                      <RadioGroup defaultValue="medium">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="priority-low" />
                          <Label htmlFor="priority-low">Nice to have</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="priority-medium" />
                          <Label htmlFor="priority-medium">Important</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="priority-high" />
                          <Label htmlFor="priority-high">Critical</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="feature-updates" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="feature-updates"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Keep me updated on this feature request
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          We'll notify you about status changes and implementation plans.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Request</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Bug Report Form */}
              <TabsContent value="bug">
                <Card>
                  <CardHeader>
                    <CardTitle>Report an Issue</CardTitle>
                    <CardDescription>Help us identify and fix problems with the platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="issue-title">Issue Title</Label>
                      <Input id="issue-title" placeholder="Brief description of the problem" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="issue-location">Where did you encounter this issue?</Label>
                        <Select defaultValue="dashboard">
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="project-page">Project Page</SelectItem>
                            <SelectItem value="portfolio">Portfolio View</SelectItem>
                            <SelectItem value="account">Account Settings</SelectItem>
                            <SelectItem value="payment">Payment Process</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="issue-severity">Issue Severity</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Minor - Slight inconvenience</SelectItem>
                            <SelectItem value="medium">Moderate - Affects functionality</SelectItem>
                            <SelectItem value="high">Major - Feature unusable</SelectItem>
                            <SelectItem value="critical">Critical - System unusable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="issue-description">Issue Description</Label>
                      <Textarea
                        id="issue-description"
                        placeholder="Please describe the issue in detail. What happened? What did you expect to happen?"
                        className="min-h-32"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reproduction-steps">Steps to Reproduce</Label>
                      <Textarea
                        id="reproduction-steps"
                        placeholder="1. Go to...
2. Click on...
3. Enter...
4. Observe..."
                        className="min-h-32 font-mono text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="browser">Browser/App Version</Label>
                        <Input id="browser" placeholder="e.g., Chrome 98, iOS App 2.1" />
                      </div>
                      <div>
                        <Label htmlFor="device">Device/OS</Label>
                        <Input id="device" placeholder="e.g., Windows 11, iPhone 13" />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="issue-contact" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="issue-contact"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I'm willing to provide additional information if needed
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Our development team may contact you for clarification or testing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Report</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Quick Survey */}
              <TabsContent value="survey">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Platform Survey</CardTitle>
                    <CardDescription>
                      Take a minute to share your thoughts on key aspects of our platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-2 block">
                        How easy is it to find investment opportunities that match your interests?
                      </Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Very Difficult</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                              aria-label={`Rate ${rating}`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">Very Easy</span>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">
                        How satisfied are you with the investment information provided?
                      </Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Not Satisfied</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                              aria-label={`Rate ${rating}`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">Very Satisfied</span>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">How would you rate the portfolio tracking features?</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Poor</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                              aria-label={`Rate ${rating}`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">Excellent</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="most-valuable">What feature do you find most valuable?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a feature" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discovery">Project Discovery</SelectItem>
                          <SelectItem value="portfolio">Portfolio Management</SelectItem>
                          <SelectItem value="analytics">Performance Analytics</SelectItem>
                          <SelectItem value="updates">Project Updates</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="education">Educational Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="improvement">What one thing would you most like to see improved?</Label>
                      <Textarea id="improvement" placeholder="Please share your thoughts..." className="min-h-20" />
                    </div>

                    <div>
                      <Label className="mb-2 block">How likely are you to recommend Centace to others?</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Not Likely</span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                            <button
                              key={rating}
                              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-sm"
                              aria-label={`Rate ${rating}`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">Very Likely</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Skip Survey</Button>
                    <Button>Submit Survey</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Recent Feedback Implementations */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Improvements Based on Feedback</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Enhanced Portfolio Analytics</CardTitle>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardDescription>Implemented April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on investor feedback, we've added detailed ROI tracking, sector diversification analysis, and
                  customizable performance dashboards.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Mobile App Improvements</CardTitle>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <CardDescription>Implemented March 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've redesigned the mobile experience with faster loading times, offline project viewing, and
                  real-time investment notifications.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Simplified Investment Process</CardTitle>
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Send className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <CardDescription>Implemented February 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've streamlined the investment flow, reducing the steps required to invest in a project from 7 to
                  just 3, while maintaining security.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
