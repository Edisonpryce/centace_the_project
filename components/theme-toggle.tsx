"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        // Force the theme to change and apply immediately
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)

        // Manually update the document classes for immediate effect
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(newTheme)
        document.body.classList.remove("light-theme", "dark-theme")
        document.body.classList.add(`${newTheme}-theme`)

        // Update data-theme attribute
        root.setAttribute("data-theme", newTheme)
      }}
      className={className}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 text-yellow-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 text-blue-300" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
