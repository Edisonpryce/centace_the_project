import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Centace Investment Platform",
  description: "Track your investments and see real-time updates from project sites",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      {children}
      <Footer />
    </ClientLayout>
  )
}


import './globals.css'