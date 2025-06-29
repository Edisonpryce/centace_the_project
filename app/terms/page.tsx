import Link from "next/link"

export default function TermsPage() {
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
            <h1 className="text-3xl font-bold mb-2">Centace Terms & Conditions</h1>
            <p className="text-gray-400 mb-8">Last updated: 08/05/2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By accessing or using the Centace platform ("Platform"), a service provided by Centace Limited
                  ("Centace," "we," "our," or "us"), you ("User," "you," or "Investor") agree to be bound by these Terms
                  & Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use the
                  Platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>
                    2.1 You must be at least 18 years old and possess the legal capacity to enter into binding
                    contracts.
                  </li>
                  <li>
                    2.2 By registering, you warrant that any information you provide is accurate and complete. You agree
                    to update such information promptly if it changes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Platform Overview</h2>
                <p className="text-gray-300">
                  Centace is a digital investment platform that enables Users to invest in verified business projects
                  (each a "Project") under three investment tiers—Silver, Gold, and Diamond—each carrying distinct
                  rights, risks, and rewards.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Investment & Risk Disclaimer</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>4.1 All investments carry risk. Past performance is not indicative of future results.</li>
                  <li>
                    4.2 You acknowledge that you may lose some or all of your invested capital. Centace does not
                    guarantee returns.
                  </li>
                  <li>
                    4.3 You confirm you have performed your own due diligence or sought independent professional advice
                    before investing.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. User Accounts & Security</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>
                    5.1 You are responsible for maintaining the confidentiality of your login credentials and for all
                    activities that occur under your account.
                  </li>
                  <li>5.2 Notify Centace immediately of any unauthorised use or security breach.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Fees & Charges</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>
                    6.1 Centace charges management, supervisory, or success fees as specified in each Project's
                    Disclosure Statement.
                    <ul className="list-disc pl-6 mt-2">
                      <li>Silver Tier: Up front/recurring fee as disclosed.</li>
                      <li>Gold Tier: Up front asset structuring fee and ongoing management fee.</li>
                      <li>Diamond Tier: Management/supervisory fee (currently 5.5% of net profits).</li>
                    </ul>
                  </li>
                  <li>6.2 Fees may be revised with 30 days' written notice.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Project Documentation & Disclosures</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>
                    7.1 Each Project will have a Disclosure Statement outlining key details, projected returns,
                    timelines, risks, and fee structure.
                  </li>
                  <li>
                    7.2 In case of conflict, the Project Disclosure Statement shall supersede these Terms for that
                    specific Project.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Funding & Withdrawal</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>
                    8.1 Funds are accepted via supported payment methods (e.g., mobile money, bank transfer) and are
                    held in segregated escrow until deployment.
                  </li>
                  <li>
                    8.2 Withdrawal of returns, dividends, or principal follows the schedule stated in the relevant
                    Project documentation.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Reporting & Transparency</h2>
                <p className="text-gray-300">
                  Centace provides periodic updates, financial statements, and real time dashboards showing Project
                  performance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Intellectual Property</h2>
                <p className="text-gray-300">
                  All Platform content, trademarks, and technology are owned by or licensed to Centace. Users acquire no
                  IP rights by using the Platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Prohibited Activities</h2>
                <p className="text-gray-300 mb-2">You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Violate any applicable law or regulation.</li>
                  <li>Use the Platform for money laundering or fraudulent activity.</li>
                  <li>Upload harmful code or compromise Platform security.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">12. Limitation of Liability</h2>
                <p className="text-gray-300">
                  To the maximum extent permitted by law, Centace, its directors, officers, and employees shall not be
                  liable for any indirect, consequential, or incidental damages arising out of or related to the use of
                  the Platform or any Project.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">13. Indemnification</h2>
                <p className="text-gray-300">
                  You agree to indemnify and hold Centace harmless from any claim or demand (including legal fees)
                  arising from your breach of these Terms or misuse of the Platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">14. Suspension & Termination</h2>
                <p className="text-gray-300">
                  Centace reserves the right to suspend or terminate your account at any time for violation of these
                  Terms, suspected fraudulent activity, or as required by law or regulatory directive.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">15. Privacy</h2>
                <p className="text-gray-300">
                  Centace collects and processes personal data in accordance with its Privacy Policy, which forms part
                  of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">16. Governing Law & Dispute Resolution</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>16.1 These Terms are governed by the laws of the Republic of Ghana.</li>
                  <li>
                    16.2 Any dispute shall first be referred to mediation in Accra. If unresolved within 30 days, the
                    dispute shall be submitted to arbitration under Ghana Arbitration Centre rules, and the award shall
                    be final and binding.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">17. Amendments</h2>
                <p className="text-gray-300">
                  Centace may amend these Terms by posting an updated version on the Platform. Continued use after
                  changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">18. Contact</h2>
                <p className="text-gray-300">
                  For questions or concerns, contact: centaceappt@gmail.com or +233 244-933-865.
                </p>
              </section>

              <div className="border-t border-gray-700 pt-6 mt-8">
                <p className="text-gray-300">
                  By clicking "I Agree" or continuing to use the Platform, you confirm that you have read, understood,
                  and accepted these Terms & Conditions.
                </p>
              </div>
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
