"use client"

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyProvider } from "@/lib/context/currency-context"
import { LanguageProvider } from "@/lib/context/language-context"
import { AuthProvider } from "@/lib/context/auth-context"
import { Inter } from "next/font/google"
import { RtlProvider } from "@/components/rtl-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = "en"
  const dir = "ltr"

  useEffect(() => {
    // Add 'no-transitions' class to prevent transitions on page load
    document.documentElement.classList.add("no-transitions")

    // Remove the class after a short delay to enable transitions
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("no-transitions")
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          const storedTheme = localStorage.getItem('vite-ui-theme');
          if (storedTheme === 'light') {
            document.documentElement.classList.add('light');
            document.body.classList.add('light-theme');
          } else {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-theme');
          }
        } catch (error) {
          console.error('Error applying theme:', error);
        }
      })();
      
      // Initialize environment variables
      window.__ENV__ = {
        NEXT_PUBLIC_APP_VERSION: '0.1.0',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT: '/api/log-error'
      };
    `,
          }}
        />
        <ThemeProvider defaultTheme="dark">
          <ErrorBoundary>
            <AuthProvider>
              <LanguageProvider>
                <RtlProvider>
                  <CurrencyProvider>{children}</CurrencyProvider>
                </RtlProvider>
              </LanguageProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
