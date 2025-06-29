"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TermsDialogContentProps {
  onClose: () => void
}

export default function TermsDialogContent({ onClose }: TermsDialogContentProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">Centace Terms & Conditions</DialogTitle>
      </DialogHeader>

      <div className="space-y-8 py-4">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing or using the Centace platform ("Platform"), a service provided by Centace Limited ("Centace,"
            "we," "our," or "us"), you ("User," "you," or "Investor") agree to be bound by these Terms & Conditions
            ("Terms"). If you do not agree with any part of these Terms, you must not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              2.1 You must be at least 18 years old and possess the legal capacity to enter into binding contracts.
            </li>
            <li>
              2.2 By registering, you warrant that any information you provide is accurate and complete. You agree to
              update such information promptly if it changes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Platform Overview</h2>
          <p className="text-gray-300">
            Centace is a digital investment platform that enables Users to invest in verified business projects (each a
            "Project") under three investment tiers—Silver, Gold, and Diamond—each carrying distinct rights, risks, and
            rewards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Investment & Risk Disclaimer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>4.1 All investments carry risk. Past performance is not indicative of future results.</li>
            <li>
              4.2 You acknowledge that you may lose some or all of your invested capital. Centace does not guarantee
              returns.
            </li>
            <li>
              4.3 You confirm you have performed your own due diligence or sought independent professional advice before
              investing.
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
      </div>

      <DialogFooter>
        <Button onClick={onClose} className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Close
        </Button>
      </DialogFooter>
    </>
  )
}
