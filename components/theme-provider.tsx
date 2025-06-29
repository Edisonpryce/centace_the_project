"use client"

import type * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme?: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme?: Theme
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: undefined,
  setTheme: () => {},
  resolvedTheme: undefined,
})

const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

function ThemeProvider({ children, defaultTheme = "dark", storageKey = "vite-ui-theme" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | undefined>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    const initialTheme = (localStorage.getItem(storageKey) || defaultTheme) as Theme
    setTheme(initialTheme)
  }, [defaultTheme, storageKey])

  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      const root = window.document.documentElement
      const body = document.body

      // Remove all theme classes
      root.classList.remove("light", "dark")
      body.classList.remove("light-theme", "dark-theme")

      // Apply new theme
      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
        body.classList.add(`${systemTheme}-theme`)

        // Set data-theme attribute for components that use it
        root.setAttribute("data-theme", systemTheme)

        setResolvedTheme(systemTheme)
      } else {
        root.classList.add(newTheme)
        body.classList.add(`${newTheme}-theme`)

        // Set data-theme attribute for components that use it
        root.setAttribute("data-theme", newTheme)

        setResolvedTheme(newTheme)
      }
    }

    if (theme) {
      applyTheme(theme)
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        const root = window.document.documentElement

        root.classList.remove("light", "dark")
        document.body.classList.remove("light-theme", "dark-theme")

        root.classList.add(systemTheme)
        document.body.classList.add(`${systemTheme}-theme`)

        // Set data-theme attribute
        root.setAttribute("data-theme", systemTheme)

        setResolvedTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  // Initialize theme on first load
  useEffect(() => {
    // Force theme application on first load
    if (theme) {
      const root = window.document.documentElement
      if (!root.hasAttribute("data-theme")) {
        const applyTheme = (newTheme: Theme) => {
          const root = window.document.documentElement
          const body = document.body

          // Remove all theme classes
          root.classList.remove("light", "dark")
          body.classList.remove("light-theme", "dark-theme")

          // Apply new theme
          if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            root.classList.add(systemTheme)
            body.classList.add(`${systemTheme}-theme`)

            // Set data-theme attribute for components that use it
            root.setAttribute("data-theme", systemTheme)

            setResolvedTheme(systemTheme)
          } else {
            root.classList.add(newTheme)
            body.classList.add(`${newTheme}-theme`)

            // Set data-theme attribute for components that use it
            root.setAttribute("data-theme", newTheme)

            setResolvedTheme(newTheme)
          }
        }
        applyTheme(theme)
      }
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, useTheme }
