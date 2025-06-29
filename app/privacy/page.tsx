import Link from "next/link"

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Last updated: May 1, 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Centace Limited ("Centace," "we," "our," or "us") is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  investment platform, website, and related services (collectively, the "Services").
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that
                  you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our
                  policies and practices, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                <h3 className="font-medium mt-4 mb-2">2.1 Personal Information</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may collect the following types of personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                  <li>
                    <strong>Identity Information:</strong> Name, date of birth, nationality, government-issued
                    identification documents, and photographs.
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Email address, telephone number, physical address, and other
                    similar contact details.
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Bank account details, payment card information, transaction
                    history, and investment preferences.
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Username, password, investment interests, preferences,
                    feedback, and survey responses.
                  </li>
                  <li>
                    <strong>KYC/AML Information:</strong> Information required to comply with Know Your Customer (KYC)
                    and Anti-Money Laundering (AML) regulations.
                  </li>
                </ul>

                <h3 className="font-medium mt-4 mb-2">2.2 Technical Information</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When you use our Services, we may automatically collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                  <li>
                    <strong>Device Information:</strong> IP address, device type, operating system, browser type, mobile
                    network information, and device identifiers.
                  </li>
                  <li>
                    <strong>Usage Information:</strong> Pages visited, time spent on pages, links clicked, and other
                    actions taken within our Services.
                  </li>
                  <li>
                    <strong>Location Information:</strong> General location based on IP address or more precise location
                    if permitted by you.
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web
                    beacons, and similar technologies. See our Cookie Policy for more details.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p className="text-gray-700 dark:text-gray-300">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                  <li>To provide, maintain, and improve our Services</li>
                  <li>To process and complete transactions, and send related information</li>
                  <li>To verify your identity and prevent fraud or other unauthorized or illegal activity</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To communicate with you about products, services, offers, and events</li>
                  <li>To personalize your experience and deliver content relevant to your interests</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To respond to your comments, questions, and requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                  <li>
                    <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                    consultants, and other service providers who need access to such information to carry out work on
                    our behalf.
                  </li>
                  <li>
                    <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or
                    in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or
                    a portion of our assets, your information may be transferred as part of that transaction.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may share your information with third parties when you have
                    given us your consent to do so.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We implement appropriate technical and organizational measures to protect the security of your
                  personal information. However, please note that no method of transmission over the Internet or method
                  of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect
                  your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Depending on your location, you may have certain rights regarding your personal information,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to rectify or update your personal information</li>
                  <li>The right to erase your personal information</li>
                  <li>The right to restrict or object to the processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  To exercise these rights, please contact us at privacy@centace.com.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an
                  updated "Last updated" date. We encourage you to review this Privacy Policy frequently to be informed
                  of how we are protecting your information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have questions or concerns about this Privacy Policy or our privacy practices, please contact
                  us at:
                </p>
                <div className="mt-3">
                  <p className="text-gray-700 dark:text-gray-300">Email: privacy@centace.com</p>
                  <p className="text-gray-700 dark:text-gray-300">Phone: +233 244-933-865</p>
                  <p className="text-gray-700 dark:text-gray-300">Address: 123 Independence Avenue, Accra, Ghana</p>
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
