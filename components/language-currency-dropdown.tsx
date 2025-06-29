"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/hooks/use-currency"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/context/language-context"

type CurrencyOption = {
  code: string
  symbol: string
  name: string
}

const currencies: CurrencyOption[] = [
  { code: "GH₵", symbol: "GH₵", name: "Ghana Cedi" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
]

export function LanguageCurrencyDropdown({
  variant = "ghost",
  isDark = false,
}: { variant?: string; isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currency, setCurrency } = useCurrency()
  const { language, setLanguage, t, isRTL } = useTranslation()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode)
    setIsOpen(false)
  }

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode)
    setIsOpen(false)
  }

  // Determine dropdown position based on RTL
  const dropdownPosition = isRTL ? "left-0" : "right-0"

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant={variant}
        size="icon"
        className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language and currency settings"
      >
        <Globe className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className={`absolute ${dropdownPosition} mt-2 w-[480px] origin-top-right rounded-md ${
            isDark ? "bg-[#161b22] border-gray-700" : "bg-white border-gray-200"
          } border shadow-lg z-50`}
        >
          <div className={`p-4 grid grid-cols-2 gap-4 ${isRTL ? "rtl-grid" : ""}`}>
            {/* Currency Column */}
            <div>
              <h3
                className={`text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-900"
                } border-b pb-1 border-gray-700`}
              >
                {t("currency")}
              </h3>
              <div className="space-y-1">
                {currencies.map((currencyOption) => (
                  <button
                    key={currencyOption.code}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                      currency === currencyOption.code
                        ? isDark
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                        : isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleCurrencyChange(currencyOption.code)}
                  >
                    <span>
                      {currencyOption.symbol} {currencyOption.name}
                    </span>
                    {currency === currencyOption.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Column */}
            <div>
              <h3
                className={`text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-900"
                } border-b pb-1 border-gray-700`}
              >
                {t("language")}
              </h3>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                      language === lang.code
                        ? isDark
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                        : isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span>
                      {lang.flag} {lang.name}
                    </span>
                    {language === lang.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
