/**
 * Currency conversion service
 * Handles fetching and caching exchange rates for currency conversion
 */

// Default exchange rates as fallback if API is unavailable
const DEFAULT_EXCHANGE_RATES = {
  "GH₵": 1, // Base currency (Ghana Cedi)
  USD: 0.083, // 1 GH₵ = 0.083 USD
  EUR: 0.077, // 1 GH₵ = 0.077 EUR
  GBP: 0.066, // 1 GH₵ = 0.066 GBP
  NGN: 125.76, // 1 GH₵ = 125.76 NGN
}

// Cache duration in milliseconds (4 hours)
const CACHE_DURATION = 4 * 60 * 60 * 1000

interface ExchangeRates {
  [currency: string]: number
}

interface CacheData {
  rates: ExchangeRates
  timestamp: number
}

// In-memory cache
let ratesCache: CacheData | null = null

/**
 * Fetches exchange rates from the API
 * Uses ExchangeRate-API for real-time rates
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    // Check if we have valid cached rates
    if (ratesCache && Date.now() - ratesCache.timestamp < CACHE_DURATION) {
      return ratesCache.rates
    }

    // Fetch new rates from the API
    const response = await fetch("https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/GHS")

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates")
    }

    const data = await response.json()

    // Format the response to match our expected format
    const rates: ExchangeRates = {
      "GH₵": 1, // Base currency
      USD: data.conversion_rates.USD,
      EUR: data.conversion_rates.EUR,
      GBP: data.conversion_rates.GBP,
      NGN: data.conversion_rates.NGN,
    }

    // Update cache
    ratesCache = {
      rates,
      timestamp: Date.now(),
    }

    return rates
  } catch (error) {
    console.error("Error fetching exchange rates:", error)

    // If we have cached rates but they're expired, still use them as fallback
    if (ratesCache) {
      return ratesCache.rates
    }

    // Use default rates as last resort
    return DEFAULT_EXCHANGE_RATES
  }
}

/**
 * Converts an amount from Ghana Cedi to the target currency
 */
export async function convertCurrency(amount: number, targetCurrency: string): Promise<number> {
  try {
    const rates = await fetchExchangeRates()

    // If the target currency isn't in our rates, return the original amount
    if (!rates[targetCurrency]) {
      console.warn(`Exchange rate for ${targetCurrency} not available`)
      return amount
    }

    // Convert the amount
    const convertedAmount = amount * rates[targetCurrency]

    // Round to 2 decimal places
    return Math.round(convertedAmount * 100) / 100
  } catch (error) {
    console.error("Error converting currency:", error)

    // Fallback to default rates
    const rate = DEFAULT_EXCHANGE_RATES[targetCurrency] || 1
    return Math.round(amount * rate * 100) / 100
  }
}

/**
 * Gets the exchange rate between two currencies
 */
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    const rates = await fetchExchangeRates()

    // If either currency isn't in our rates, return 1 (no conversion)
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      console.warn(`Exchange rate between ${fromCurrency} and ${toCurrency} not available`)
      return 1
    }

    // Calculate the exchange rate
    // First convert to base currency (GH₵), then to target currency
    const baseRate = 1 / rates[fromCurrency] // Convert from currency to GH₵
    const targetRate = rates[toCurrency] // Convert from GH₵ to target currency

    return baseRate * targetRate
  } catch (error) {
    console.error("Error getting exchange rate:", error)

    // Fallback to default rates
    if (!DEFAULT_EXCHANGE_RATES[fromCurrency] || !DEFAULT_EXCHANGE_RATES[toCurrency]) {
      return 1
    }

    const baseRate = 1 / DEFAULT_EXCHANGE_RATES[fromCurrency]
    const targetRate = DEFAULT_EXCHANGE_RATES[toCurrency]

    return baseRate * targetRate
  }
}
