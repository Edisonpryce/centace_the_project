"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  CreditCard,
  Wallet,
  Shield,
  Zap,
  Globe,
  Clock,
  ChevronRight,
  Download,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function PaymentPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between bg-white dark:bg-[#0d1117]">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
              C
            </div>
            <span className="font-medium">Centace</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Home
          </Link>
          <Link
            href="/discover"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Discover
          </Link>
          <Link href="/payment" className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
            appCent Payment
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 transition-colors">New</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">appCent Payment System</h1>
              <p className="text-xl mb-8 text-white/90">
                The seamless mobile payment solution for all your investment transactions on Centace
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-75"></div>
                <div className="relative bg-white dark:bg-[#161b22] p-2 rounded-2xl shadow-xl">
                  <img
                    src="/mobile-payment-app-blue.png"
                    alt="appCent Mobile Interface"
                    className="rounded-xl w-full max-w-[300px] mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Tabs Section */}
        <Tabs defaultValue="features" className="w-full mb-16" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 dark:bg-[#161b22]">
              <TabsTrigger value="features" className="text-sm md:text-base">
                Features
              </TabsTrigger>
              <TabsTrigger value="how-it-works" className="text-sm md:text-base">
                How It Works
              </TabsTrigger>
              <TabsTrigger value="security" className="text-sm md:text-base">
                Security
              </TabsTrigger>
              <TabsTrigger value="pricing" className="text-sm md:text-base">
                Pricing
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-8 w-8 text-cyan-500" />,
                  title: "Instant Transfers",
                  description: "Transfer funds instantly between your bank account, wallet, and investment projects.",
                },
                {
                  icon: <Globe className="h-8 w-8 text-cyan-500" />,
                  title: "Global Accessibility",
                  description: "Access your funds and make payments from anywhere in the world, at any time.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-cyan-500" />,
                  title: "Enhanced Security",
                  description:
                    "Multi-factor authentication and end-to-end encryption to keep your transactions secure.",
                },
                {
                  icon: <Wallet className="h-8 w-8 text-cyan-500" />,
                  title: "Digital Wallet",
                  description: "Store multiple payment methods and manage your investment funds in one place.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-cyan-500" />,
                  title: "Transaction History",
                  description: "Detailed records of all your transactions with real-time status updates.",
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-cyan-500" />,
                  title: "Multiple Payment Options",
                  description: "Support for credit/debit cards, bank transfers, and other popular payment methods.",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-white dark:bg-[#161b22] border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how-it-works">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                {[
                  {
                    step: 1,
                    title: "Download the appCent App",
                    description:
                      "Get started by downloading the appCent mobile application from your device's app store. Available for both iOS and Android devices.",
                  },
                  {
                    step: 2,
                    title: "Create Your Account",
                    description:
                      "Sign up using your Centace credentials or create a new account. Verify your identity to ensure secure access to all features.",
                  },
                  {
                    step: 3,
                    title: "Link Your Payment Methods",
                    description:
                      "Connect your bank accounts, credit cards, or other payment methods to fund your appCent wallet.",
                  },
                  {
                    step: 4,
                    title: "Make Investments & Payments",
                    description:
                      "Use appCent to fund your investments on Centace, make payments, or transfer money to other users seamlessly.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      {index < 3 && (
                        <div className="mt-4 ml-6 h-8 border-l-2 border-dashed border-gray-300 dark:border-gray-700"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-[#161b22] rounded-xl p-8 border border-gray-200 dark:border-gray-800 mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-cyan-500" />
                  Security First Approach
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  At Centace, we prioritize the security of your financial information and transactions. Our appCent
                  payment system is built with multiple layers of protection to ensure your data remains safe.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "End-to-End Encryption",
                      description:
                        "All data transmitted through appCent is encrypted using industry-standard protocols.",
                    },
                    {
                      title: "Multi-Factor Authentication",
                      description:
                        "Secure your account with multiple verification methods including biometrics and one-time passwords.",
                    },
                    {
                      title: "Fraud Detection",
                      description:
                        "Advanced algorithms monitor transactions in real-time to detect and prevent suspicious activities.",
                    },
                    {
                      title: "Regulatory Compliance",
                      description:
                        "appCent adheres to international financial regulations and data protection standards.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border border-cyan-100 dark:border-cyan-900/30">
                <h4 className="font-semibold mb-2 text-cyan-800 dark:text-cyan-300">Our Security Certifications</h4>
                <p className="text-sm text-cyan-700 dark:text-cyan-400">
                  appCent is certified by leading financial security standards including PCI DSS, ISO 27001, and
                  complies with GDPR and local data protection regulations.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Basic",
                    price: "Free",
                    description: "Essential features for individual investors",
                    features: [
                      "Basic fund transfers",
                      "Investment payments",
                      "Transaction history",
                      "Standard security features",
                      "Email support",
                    ],
                    cta: "Get Started",
                    popular: false,
                  },
                  {
                    title: "Premium",
                    price: "$4.99/month",
                    description: "Advanced features for active investors",
                    features: [
                      "All Basic features",
                      "Instant transfers",
                      "Multiple payment methods",
                      "Advanced analytics",
                      "Priority support",
                      "No foreign transaction fees",
                    ],
                    cta: "Upgrade Now",
                    popular: true,
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    description: "Tailored solutions for businesses",
                    features: [
                      "All Premium features",
                      "Bulk transactions",
                      "API access",
                      "Custom integration",
                      "Dedicated account manager",
                      "Enhanced security features",
                    ],
                    cta: "Contact Sales",
                    popular: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative ${
                      plan.popular
                        ? "border-cyan-500 dark:border-cyan-600 shadow-lg"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-cyan-500 hover:bg-cyan-600">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.title}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-cyan-500 hover:bg-cyan-600"
                            : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to simplify your investment payments?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Download the appCent mobile app today and experience seamless transactions for all your Centace
                investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download App
                </Button>
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-4">
                <img src="/app-store-badge.png" alt="App Store" className="h-14" />
                <img src="/google-play-badge.png" alt="Google Play" className="h-14" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "Is appCent available in all countries?",
                  answer:
                    "appCent is currently available in most countries where Centace operates. We're continuously expanding our coverage to provide global access to our payment system.",
                },
                {
                  question: "How secure is appCent for financial transactions?",
                  answer:
                    "appCent employs bank-level security measures including end-to-end encryption, multi-factor authentication, and continuous monitoring to ensure your transactions are secure.",
                },
                {
                  question: "Can I use appCent for transactions outside of Centace?",
                  answer:
                    "Currently, appCent is optimized for Centace investment transactions. However, we're working on expanding functionality to support external payments in the future.",
                },
                {
                  question: "What payment methods are supported?",
                  answer:
                    "appCent supports major credit and debit cards, bank transfers, and select digital wallets. The available payment methods may vary by region.",
                },
                {
                  question: "Are there any transaction limits?",
                  answer:
                    "Yes, transaction limits vary based on your account level, verification status, and local regulations. You can view your specific limits within the appCent app.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#161b22] rounded-lg p-6 border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-[#0d1117] text-gray-900 dark:text-white pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
                  C
                </div>
                <span className="font-medium">Centace</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Connecting investors with real-world projects through innovative payment solutions.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/discover"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payment"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    appCent Payment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:support@centace.com"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    support@centace.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1234567890"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-800 light:border-gray-300 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                © 2025 Centace. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
